import type { Kata, Modulo } from '../contenido/tipos'

export type ResultadoPrueba = { nombre: string; ok: boolean; motivo?: string; advertencia?: string }

export type Veredicto =
  | { tipo: 'error-lectura'; mensaje: string }
  | { tipo: 'faltan-nombres'; faltantes: string[]; resultados: ResultadoPrueba[] }
  | { tipo: 'todas'; resultados: ResultadoPrueba[] }
  | { tipo: 'algunas'; pasadas: number; total: number; faltantes: string[]; suelta?: string; resultados: ResultadoPrueba[] }

const LIMITE_MS = 6000

/* Evalúa el código del estudiante y recoge los nombres que la kata pide.
   Un nombre que no exista sale como undefined en vez de romper la evaluación. */
export function construir(codigo: string, exporta: string[]): Modulo {
  const devuelve = exporta
    .map((n) => n + ': (typeof ' + n + ' !== "undefined" ? ' + n + ' : undefined)')
    .join(', ')
  // eslint-disable-next-line no-new-func
  const fn = new Function('"use strict";\n' + codigo + '\n;return { ' + devuelve + ' };') as () => Modulo
  const modulo = fn()
  modulo.__src__ = codigo
  return modulo
}

async function conLimite<T>(promesa: Promise<T>, ms: number, nombre: string): Promise<T> {
  let id: ReturnType<typeof setTimeout>
  const reloj = new Promise<never>((_, rej) => {
    id = setTimeout(
      () => rej(new Error('la prueba "' + nombre + '" se demoró más de ' + ms + 'ms (¿un await que nunca resuelve?)')),
      ms,
    )
  })
  try {
    return await Promise.race([promesa, reloj])
  } finally {
    clearTimeout(id!)
  }
}

/**
 * Corre las pruebas de una kata contra el código del estudiante.
 * `alAvanzar` se llama con la lista parcial de resultados para pintar en vivo.
 */
export async function correrKata(
  kata: Kata,
  codigo: string,
  alAvanzar?: (parciales: ResultadoPrueba[]) => void,
): Promise<Veredicto> {
  let m: Modulo
  try {
    m = construir(codigo, kata.exporta)
  } catch (e) {
    return { tipo: 'error-lectura', mensaje: (e as Error).message }
  }

  const faltantes = kata.exporta.filter((n) => typeof m[n] === 'undefined')
  const resultados: ResultadoPrueba[] = []
  let pasadas = 0

  /* Si el código deja una promesa rechazada sin atrapar, el navegador lo reporta
     por su cuenta. Lo recogemos aquí para convertirlo en una pista. */
  const sueltas: unknown[] = []
  const cazarSueltas = (ev: PromiseRejectionEvent) => {
    ev.preventDefault()
    sueltas.push(ev.reason)
  }
  window.addEventListener('unhandledrejection', cazarSueltas)

  try {
    for (const prueba of kata.pruebas) {
      try {
        await conLimite(Promise.resolve().then(() => prueba.correr(m)), LIMITE_MS, prueba.nombre)
        /* La prueba pasó funcionalmente. Si tiene requiere[], verificar que el código
           contenga esos patrones. Si falta alguno → ok pero con advertencia naranja. */
        const faltanPatrones = (prueba.requiere ?? []).filter((p) => !codigo.includes(p))
        if (faltanPatrones.length) {
          resultados.push({
            nombre: prueba.nombre, ok: true,
            advertencia: 'El resultado es correcto, pero no usaste: ' + faltanPatrones.join(', '),
          })
        } else {
          resultados.push({ nombre: prueba.nombre, ok: true })
        }
        pasadas++
      } catch (e) {
        const err = e as Error
        resultados.push({ nombre: prueba.nombre, ok: false, motivo: err && err.message ? err.message : String(e) })
      }
      alAvanzar?.([...resultados])
    }
    /* Un respiro para que lleguen los rechazos sueltos antes de juzgar. */
    await new Promise((r) => setTimeout(r, 30))
  } finally {
    window.removeEventListener('unhandledrejection', cazarSueltas)
  }

  const total = kata.pruebas.length
  if (pasadas === total && faltantes.length) return { tipo: 'faltan-nombres', faltantes, resultados }
  if (pasadas === total) return { tipo: 'todas', resultados }

  const primera = sueltas[0]
  const suelta = sueltas.length ? String((primera as Error)?.message ?? primera) : undefined
  return { tipo: 'algunas', pasadas, total, faltantes, suelta, resultados }
}
