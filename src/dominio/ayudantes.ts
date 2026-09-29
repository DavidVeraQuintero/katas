/* Ayudantes globales que usan las pruebas de las katas.
   Son globales a propósito: el contenido los llama sin importarlos, igual que
   en la versión vieja del dojo. */

function profundo(a: unknown, b: unknown): boolean {
  if (Object.is(a, b)) return true
  if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') return false
  if (Array.isArray(a) !== Array.isArray(b)) return false
  const oa = a as Record<string, unknown>
  const ob = b as Record<string, unknown>
  const ka = Object.keys(oa)
  const kb = Object.keys(ob)
  if (ka.length !== kb.length) return false
  return ka.every((k) => Object.prototype.hasOwnProperty.call(ob, k) && profundo(oa[k], ob[k]))
}

export function fmt(v: unknown): string {
  if (typeof v === 'string') return '"' + v + '"'
  if (typeof v === 'function') return 'una función'
  if (v instanceof Promise) return 'una Promise (¿te faltó await?)'
  try {
    return JSON.stringify(v) ?? String(v)
  } catch {
    return String(v)
  }
}

export const dormir = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms))

export function cierto(cond: unknown, mensaje?: string): void {
  if (!cond) throw new Error(mensaje || 'se esperaba que fuera verdadero')
}

export function igual(a: unknown, b: unknown, mensaje?: string): void {
  if (!Object.is(a, b)) {
    let detalle = ''
    if (typeof a === 'string' && typeof b === 'string') {
      const max = Math.max(a.length, b.length)
      let pos = -1
      for (let i = 0; i < max; i++) {
        if (a[i] !== b[i]) { pos = i; break }
      }
      if (pos >= 0 && pos >= 3) {
        const charA = pos < a.length ? a[pos] : '(falta)'
        const charB = pos < b.length ? b[pos] : '(falta)'
        detalle = '\n⚠ diferencia en posición ' + pos + ': esperaba "' + charB + '" y llegó "' + charA + '"'
        if (charA !== '(falta)' && charB !== '(falta)' &&
            (charA.toLowerCase() === charB.toLowerCase() || charA.normalize('NFD')[0] === charB.normalize('NFD')[0])) {
          detalle += ' (se parecen pero NO son el mismo carácter)'
        }
      } else if (pos < 0 && a.length !== b.length) {
        detalle = '\n⚠ el texto tiene ' + a.length + ' caracteres pero se esperaban ' + b.length
      }
    }
    throw new Error((mensaje ? mensaje + '\n' : '') + 'esperaba:\n' + fmt(b) + '\nllegó:\n' + fmt(a) + detalle)
  }
}

export function igualProfundo(a: unknown, b: unknown, mensaje?: string): void {
  if (!profundo(a, b)) {
    throw new Error((mensaje ? mensaje + ' — ' : '') + 'se esperaba ' + fmt(b) + ' y llegó ' + fmt(a))
  }
}

export async function lanza(fn: () => unknown, mensajeEsperado?: string): Promise<void> {
  let lanzo = false
  try {
    await fn()
  } catch (e) {
    lanzo = true
    const err = e as Error
    if (mensajeEsperado && err && err.message !== mensajeEsperado) {
      throw new Error('lanzó "' + (err && err.message) + '" y se esperaba "' + mensajeEsperado + '"')
    }
    if (!(e instanceof Error)) throw new Error('debe rechazar con un Error, no con ' + fmt(e))
  }
  if (!lanzo) throw new Error('se esperaba que fallara y no falló')
}

export function lanzaSync(fn: () => unknown, mensajeEsperado?: string): void {
  let lanzo = false
  try {
    fn()
  } catch (e) {
    lanzo = true
    const err = e as Error
    if (mensajeEsperado && err && err.message !== mensajeEsperado) {
      throw new Error('lanzó "' + (err && err.message) + '" y se esperaba "' + mensajeEsperado + '"')
    }
  }
  if (!lanzo) throw new Error('se esperaba que lanzara un error y no lo hizo')
}

/** Devuelve el código fuente de una función sin comentarios (para verificar patrones). */
export function codigoLimpio(fn: unknown): string {
  return String(fn).replace(/\/\/[^\n]*/g, '').replace(/\/\*[\s\S]*?\*\//g, '')
}

/** Verifica que el código NO use == ni != (excepto == null y != null que sí están permitidos). */
export function noUsaIgualdadSuelta(fn: unknown, mensaje?: string): void {
  const src = codigoLimpio(fn)
  const sinEstrictos = src.replace(/!==/g, '').replace(/===/g, '').replace(/[!=]=\s*null\b/g, '').replace(/[!=]=\s*undefined\b/g, '')
  cierto(!sinEstrictos.includes('!=') && !sinEstrictos.includes('=='),
    mensaje || 'usa === y !== (tres signos). Excepción: == null y != null sí están permitidos')
}

/** Verifica que una variable en MAYÚSCULAS esté declarada con const, no con let.
 *  Recibe el módulo completo (que tiene __src__) y el nombre de la constante. */
export function exigeConst(modulo: Record<string, unknown>, nombre: string): void {
  const src = String(modulo.__src__ || '')
  const limpio = src.replace(/\/\/[^\n]*/g, '').replace(/\/\*[\s\S]*?\*\//g, '')
  const tieneConst = new RegExp('\\bconst\\s+' + nombre + '\\b').test(limpio)
  const tieneLet = new RegExp('\\blet\\s+' + nombre + '\\b').test(limpio)
  if (tieneLet) {
    throw new Error(nombre + ' está declarada con let, pero es un valor que no cambia. Usa const')
  }
  if (!tieneConst) {
    throw new Error(nombre + ' debe estar declarada con const (no let ni var)')
  }
}

/** Cuelga los ayudantes del objeto global para que el contenido los use sin importar. */
export function instalarAyudantes(): void {
  const g = globalThis as unknown as Record<string, unknown>
  g.dormir = dormir
  g.cierto = cierto
  g.igual = igual
  g.igualProfundo = igualProfundo
  g.lanza = lanza
  g.lanzaSync = lanzaSync
  g.codigoLimpio = codigoLimpio
  g.noUsaIgualdadSuelta = noUsaIgualdadSuelta
  g.exigeConst = exigeConst
}
