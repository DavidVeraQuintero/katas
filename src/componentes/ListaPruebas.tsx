import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Prueba } from '../contenido/tipos'
import type { ResultadoPrueba } from '../dominio/corredor'

type Props = {
  pruebas: Prueba[]
  resultados: ResultadoPrueba[]
  diaId?: string
}

/* ── Parsing helpers ── */

/** Encuentra el cierre del paréntesis/llave/corchete abierto en `pos`. */
function encontrarCierre(texto: string, pos: number): number {
  let depth = 0
  let enStr: string | null = null
  let esc = false
  for (let i = pos; i < texto.length; i++) {
    const c = texto[i]
    if (esc) { esc = false; continue }
    if (c === '\\') { esc = true; continue }
    if (enStr) { if (c === enStr) enStr = null; continue }
    if (c === '"' || c === "'" || c === '`') { enStr = c; continue }
    if (c === '(' || c === '{' || c === '[') depth++
    if (c === ')' || c === '}' || c === ']') { depth--; if (depth === 0) return i }
  }
  return -1
}

/** Divide por comas al nivel superior (depth 0). */
function dividirArgs(texto: string): string[] {
  const resultado: string[] = []
  let depth = 0
  let enStr: string | null = null
  let esc = false
  let inicio = 0
  for (let i = 0; i < texto.length; i++) {
    const c = texto[i]
    if (esc) { esc = false; continue }
    if (c === '\\') { esc = true; continue }
    if (enStr) { if (c === enStr) enStr = null; continue }
    if (c === '"' || c === "'" || c === '`') { enStr = c; continue }
    if (c === '(' || c === '{' || c === '[') { depth++; continue }
    if (c === ')' || c === '}' || c === ']') { depth--; continue }
    if (c === ',' && depth === 0) {
      resultado.push(texto.slice(inicio, i))
      inicio = i + 1
    }
  }
  resultado.push(texto.slice(inicio))
  return resultado
}

/** Quita comillas simples/dobles/backticks exteriores de un string. */
function sinComillas(s: string): string {
  const t = s.trim()
  if ((t.startsWith("'") && t.endsWith("'")) ||
      (t.startsWith('"') && t.endsWith('"')) ||
      (t.startsWith('`') && t.endsWith('`'))) {
    return t.slice(1, -1)
  }
  return t
}

/* ── Detalle estructurado de una prueba ── */

type Detalle = {
  preparacion: string[]  // const dato1 = {...} etc
  llamada: string        // funcName(dato1, dato2)
  esperado: string       // true, '180 ml', etc
  pista?: string         // mensaje descriptivo del 3er argumento
  esFuncional: boolean   // true = prueba con datos de entrada/salida, false = validación de código
}

/** Extrae el cuerpo de la función de prueba (sin el wrapper). */
function obtenerCuerpo(prueba: Prueba): string {
  const src = String(prueba.correr)
  return src
    .replace(/^\s*\(?m\)?\s*=>\s*\{?\s*/m, '')
    .replace(/^\s*function\s*\([^)]*\)\s*\{?\s*/m, '')
    .replace(/\}\s*$/, '')
    .trim()
}

/** Parser principal: extrae datos estructurados de una prueba. */
function parsearPrueba(prueba: Prueba): Detalle | null {
  const raw = obtenerCuerpo(prueba)
  // Normalizar a una sola línea
  const texto = raw.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim()

  // Si usa exigeConst, noUsaIgualdadSuelta o codigoLimpio → es regla, no mostrar "?"
  if (/\b(exigeConst|noUsaIgualdadSuelta|codigoLimpio)\b/.test(texto)) return null

  // Buscar la aserción principal: igual, igualProfundo, cierto, lanzaSync
  const igualIdx = texto.search(/\b(igual|igualProfundo)\(/)
  if (igualIdx >= 0) return parsearIgual(texto, igualIdx)

  const ciertoIdx = texto.search(/\bcierto\(/)
  if (ciertoIdx >= 0) return parsearCierto(texto, ciertoIdx)

  const lanzaIdx = texto.search(/\b(lanzaSync|lanza)\(/)
  if (lanzaIdx >= 0) return parsearLanza(texto, lanzaIdx)

  return null
}

/** Parsea igual(m.func(args), expected[, msg]) */
function parsearIgual(texto: string, idx: number): Detalle | null {
  // Detectar si es prueba de código fuente (usa String(m.func) o src.includes)
  const esValidacionCodigo = /String\(m\./.test(texto) || /\bsrc\b/.test(texto.slice(0, idx))

  // Recoger const/let antes de la aserción
  const preparacion: string[] = []
  const antes = texto.slice(0, idx).trim()
  if (!esValidacionCodigo && antes) {
    antes.split(';').forEach((s) => {
      const t = s.trim().replace(/\bm\./g, '')
      if (t) preparacion.push(t)
    })
  }

  // Encontrar el paréntesis de igual(
  const match = texto.slice(idx).match(/^(igual|igualProfundo)\(/)!
  const parenPos = idx + match[0].length - 1
  const cierrePos = encontrarCierre(texto, parenPos)
  if (cierrePos < 0) return null

  const argsStr = texto.slice(parenPos + 1, cierrePos)
  const args = dividirArgs(argsStr)
  if (args.length < 2) return null

  const primerArg = args[0].trim()
  const esperado = args[1].trim()
  const pista = args.length >= 3 ? sinComillas(args.slice(2).join(',').trim()) : undefined

  // Si es validación de código, solo devolver la pista
  if (esValidacionCodigo) {
    return { preparacion: [], llamada: '', esperado: '', pista, esFuncional: false }
  }

  // ¿Es una llamada m.funcName(...)?
  const funcMatch = primerArg.match(/^m\.(\w+)\(/)
  if (funcMatch) {
    const funcName = funcMatch[1]
    const innerParenPos = primerArg.indexOf('(', funcMatch[1].length + 2)
    const innerCierre = encontrarCierre(primerArg, innerParenPos)
    if (innerCierre < 0) {
      return { preparacion, llamada: primerArg.replace(/\bm\./g, ''), esperado, pista, esFuncional: true }
    }
    const innerArgsStr = primerArg.slice(innerParenPos + 1, innerCierre)
    const innerArgs = dividirArgs(innerArgsStr)

    // Extraer objetos/arrays complejos como variables
    const argNames: string[] = []
    let n = 1
    const complejos = innerArgs.filter((a) => {
      const t = a.trim()
      return t.startsWith('{') || t.startsWith('[')
    }).length
    for (const arg of innerArgs) {
      const t = arg.trim()
      if (t.startsWith('{') || t.startsWith('[')) {
        const nombre = complejos === 1 ? 'dato' : 'dato' + n
        preparacion.push('const ' + nombre + ' = ' + t)
        argNames.push(nombre)
        n++
      } else {
        argNames.push(t.replace(/\bm\./g, ''))
      }
    }

    return { preparacion, llamada: funcName + '(' + argNames.join(', ') + ')', esperado, pista, esFuncional: true }
  }

  // ¿Es un acceso a propiedad simple? (constante) → no mostrar detalle
  const esPropiedad = /^m\.\w+$/.test(primerArg.trim())
  if (esPropiedad) return null
  return { preparacion, llamada: primerArg.replace(/\bm\./g, ''), esperado, pista, esFuncional: true }
}

/** Parsea cierto(condicion[, msg]) */
function parsearCierto(texto: string, idx: number): Detalle | null {
  // Los cierto() son casi siempre validaciones de código fuente (src.includes etc.)
  const esValidacionCodigo = /String\(m\./.test(texto) || /\bsrc\b/.test(texto.slice(0, idx))

  const parenPos = idx + 'cierto'.length
  const cierrePos = encontrarCierre(texto, parenPos)
  if (cierrePos < 0) return null

  const argsStr = texto.slice(parenPos + 1, cierrePos)
  const args = dividirArgs(argsStr)
  const condicion = args[0]?.trim().replace(/\bm\./g, '') ?? ''
  const pista = args.length >= 2 ? sinComillas(args.slice(1).join(',').trim()) : undefined

  // cierto() nunca muestra "?" — son validaciones de reglas, no pruebas funcionales
  return { preparacion: [], llamada: '', esperado: '', pista, esFuncional: false }
}

/** Parsea lanzaSync(() => m.func(args), msg) */
function parsearLanza(texto: string, idx: number): Detalle | null {
  const match = texto.slice(idx).match(/^(lanzaSync|lanza)\(/)!
  const parenPos = idx + match[0].length - 1
  const cierrePos = encontrarCierre(texto, parenPos)
  if (cierrePos < 0) return null

  const argsStr = texto.slice(parenPos + 1, cierrePos)
  const args = dividirArgs(argsStr)

  // Primer arg: () => expr o arrow function
  let expr = args[0]?.trim() ?? ''
  expr = expr.replace(/^\(\)\s*=>\s*/, '').replace(/\bm\./g, '')
  const msgError = args.length >= 2 ? sinComillas(args[1].trim()) : undefined

  return { preparacion: [], llamada: expr, esperado: 'debe lanzar error' + (msgError ? ': ' + msgError : ''), pista: undefined, esFuncional: true }
}

/* ── Componente de detalle ── */

function DetalleFormateado({ detalle }: { detalle: Detalle }) {
  return (
    <div className="prueba-detalle-parseado">
      {detalle.preparacion.length > 0 ? (
        <div className="prueba-io">
          <span className="prueba-etq">Datos</span>
          <pre className="prueba-codigo">{detalle.preparacion.join('\n')}</pre>
        </div>
      ) : null}
      <div className="prueba-io">
        <div className="prueba-io-fila">
          <span className="prueba-etq">Llamada</span>
          <code>{detalle.llamada}</code>
        </div>
      </div>
      <div className="prueba-io">
        <div className="prueba-io-fila">
          <span className="prueba-etq esperado">Esperado</span>
          <code>{detalle.esperado}</code>
        </div>
      </div>
    </div>
  )
}

/* ── Componente principal ── */

export function ListaPruebas({ pruebas, resultados, diaId }: Props) {
  const mapaResultados = new Map(resultados.map((r) => [r.nombre, r]))
  const [abierto, setAbierto] = useState<number | null>(null)
  const [pistaAbierta, setPistaAbierta] = useState<number | null>(null)

  return (
    <div className="resultados">
      <div className="resultados-titulo">
        Pruebas que debe pasar tu código ({pruebas.length}):
      </div>
      {pruebas.map((p, i) => {
        const resultado = mapaResultados.get(p.nombre)
        const tieneAdv = resultado?.ok && resultado.advertencia
        const clase = resultado
          ? (resultado.ok ? (tieneAdv ? 'adv' : 'ok') : 'mal')
          : 'pendiente'
        const marca = resultado
          ? (resultado.ok ? (tieneAdv ? '⚠' : '✓') : '✗')
          : '○'
        const expandido = abierto === i
        const pistaVisible = pistaAbierta === i
        const detalle = parsearPrueba(p)
        const esFuncional = detalle?.esFuncional ?? true
        const textoPista = detalle?.pista
        const tienePista = Boolean(textoPista || p.requiere?.length || p.paso)

        return (
          <div key={i} className={'prueba ' + clase}>
            <span className="marca-p">{marca}</span>
            <span className="prueba-cuerpo">
              <span className="prueba-fila">
                <span className="prueba-nombre">{p.nombre}</span>
                <span className="prueba-botones">
                  {tienePista ? (
                    <button
                      type="button"
                      className={'prueba-ver pista' + (pistaVisible ? ' activo' : '')}
                      title="¿Qué necesito para resolver este test?"
                      onClick={() => setPistaAbierta(pistaVisible ? null : i)}
                      aria-expanded={pistaVisible}
                    >
                      💡
                    </button>
                  ) : null}
                  {esFuncional && detalle?.llamada?.includes('(') ? (
                    <button
                      type="button"
                      className={'prueba-ver' + (expandido ? ' activo' : '')}
                      title="Ver datos de entrada y resultado esperado"
                      onClick={() => setAbierto(expandido ? null : i)}
                      aria-expanded={expandido}
                    >
                      ?
                    </button>
                  ) : null}
                </span>
              </span>
              {pistaVisible && tienePista ? (
                <div className="prueba-pista">
                  {textoPista ? <span className="prueba-pista-texto">{textoPista}</span> : null}
                  {p.requiere?.length ? (
                    <div className="prueba-pista-req">
                      <span className="prueba-pista-label">Este test espera que uses:</span>
                      <span className="prueba-tags">
                        {p.requiere.map((r) => (
                          <code key={r} className="prueba-tag">{r}</code>
                        ))}
                      </span>
                    </div>
                  ) : null}
                  {p.paso && diaId ? (
                    <Link className="prueba-pista-link" to={'/dia/' + diaId + '/paso/' + p.paso}>
                      Si tienes dudas, repasa el paso {p.paso} →
                    </Link>
                  ) : null}
                </div>
              ) : null}
              {tieneAdv ? (
                <span className="prueba-advertencia">{resultado.advertencia}</span>
              ) : null}
              {resultado && resultado.motivo ? (
                <span className="prueba-motivo">{resultado.motivo}</span>
              ) : null}
              {expandido && detalle ? <DetalleFormateado detalle={detalle} /> : null}
            </span>
          </div>
        )
      })}
    </div>
  )
}
