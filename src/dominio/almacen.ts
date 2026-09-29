/* Guardado en localStorage. Se conservan las claves y el formato de la versión
   vieja del dojo para que el progreso de David no se pierda al pasar a React. */

export type Estado = { dias: Record<string, string>; katas: Record<string, string> }
export type Codigos = Record<string, string>
export type Pasos = Record<string, number>

export const CLAVE_ESTADO = 'dojo-estado-v2'
export const CLAVE_CODIGOS = 'dojo-codigos'
export const CLAVE_PASOS = 'dojo-pasos'
export const CLAVE_REVISION = 'dojo-revision'

export const estadoVacio = (): Estado => ({ dias: {}, katas: {} })

/** La clave de una kata dentro de un día: 'TC-d1:kata-01'. */
export const claveKata = (diaId: string, kataId: string) => diaId + ':' + kataId

export const hoyISO = () => new Date().toISOString().slice(0, 10)

/* ---------- migración de claves de kata ---------- */

/* El dojo viejo numeraba las katas `k1`…`k5`, así que guardaba `TC-d1:k1`.
   Esta versión usa `kata-01`…`kata-05` y la clave queda `TC-d1:kata-01`.
   Para no perder lo que David ya resolvió, al leer se renombran las claves
   viejas. No se renombran los archivos de contenido: el arreglo vive aquí. */

const RE_CLAVE_VIEJA = /^(.+):k(\d+)$/

/** `TC-d1:k3` → `TC-d1:kata-03`. Una clave ya nueva se devuelve igual. */
export function migrarClaveKata(clave: string): string {
  const m = RE_CLAVE_VIEJA.exec(clave)
  if (!m) return clave
  const n = Number(m[2])
  if (!Number.isInteger(n) || n <= 0) return clave
  return m[1] + ':kata-' + String(n).padStart(2, '0')
}

/**
 * Renombra las claves de kata de un mapa (progreso o códigos guardados).
 * Es idempotente —pasarlo dos veces da lo mismo— y nunca pisa una clave
 * nueva que ya exista: si están la vieja y la nueva, gana la nueva.
 * `cambios` dice cuántas claves viejas se encontraron.
 */
export function migrarClavesKata<T>(mapa: Record<string, T>): { datos: Record<string, T>; cambios: number } {
  const datos: Record<string, T> = {}
  let cambios = 0
  // primero las que ya están en el formato nuevo, para que ninguna vieja las pise
  for (const [clave, valor] of Object.entries(mapa)) {
    if (migrarClaveKata(clave) === clave) datos[clave] = valor
  }
  for (const [clave, valor] of Object.entries(mapa)) {
    const nueva = migrarClaveKata(clave)
    if (nueva === clave) continue
    cambios++
    if (!(nueva in datos)) datos[nueva] = valor
  }
  return { datos, cambios }
}

function leerJSON<T>(clave: string, porDefecto: T): T {
  try {
    const crudo = localStorage.getItem(clave)
    if (!crudo) return porDefecto
    const v = JSON.parse(crudo) as T
    return v ?? porDefecto
  } catch {
    return porDefecto
  }
}

function escribirJSON(clave: string, valor: unknown): void {
  try {
    localStorage.setItem(clave, JSON.stringify(valor))
  } catch {
    /* modo privado o cuota llena: seguimos sin guardar */
  }
}

export function leerEstado(): Estado {
  const v = leerJSON<Partial<Estado>>(CLAVE_ESTADO, {})
  const katas = migrarClavesKata(v.katas ?? {})
  const estado: Estado = { dias: v.dias ?? {}, katas: katas.datos }
  if (katas.cambios) guardarEstado(estado) // deja el localStorage ya migrado
  return estado
}
export const guardarEstado = (e: Estado) => escribirJSON(CLAVE_ESTADO, e)

export function leerCodigos(): Codigos {
  const c = migrarClavesKata(leerJSON<Codigos>(CLAVE_CODIGOS, {}))
  if (c.cambios) guardarCodigos(c.datos)
  return c.datos
}
export const guardarCodigos = (c: Codigos) => escribirJSON(CLAVE_CODIGOS, c)

export const leerPasos = (): Pasos => leerJSON<Pasos>(CLAVE_PASOS, {})
export const guardarPasos = (p: Pasos) => escribirJSON(CLAVE_PASOS, p)

export function leerRevision(): boolean {
  try {
    return localStorage.getItem(CLAVE_REVISION) === '1'
  } catch {
    return false
  }
}
export function guardarRevision(v: boolean): void {
  try {
    localStorage.setItem(CLAVE_REVISION, v ? '1' : '0')
  } catch {
    /* sin localStorage el modo revisión simplemente no sobrevive a la recarga */
  }
}

/* ---------- exportar / importar ---------- */

export type Respaldo = {
  app: 'dojo-devskills'
  version: 2
  exportado: string
  estado: Estado
  codigos: Codigos
  pasos: Pasos
}

export function armarRespaldo(estado: Estado, codigos: Codigos, pasos: Pasos): Respaldo {
  return { app: 'dojo-devskills', version: 2, exportado: new Date().toISOString(), estado, codigos, pasos }
}

export type RespaldoLeido = { estado: Estado; codigos: Codigos; pasos: Pasos }

/**
 * Entiende el JSON nuevo y también el viejo: un volcado suelto de
 * `dojo-estado-v2`, o un objeto con las claves de localStorage tal cual.
 */
export function leerRespaldo(texto: string): RespaldoLeido {
  const crudo = JSON.parse(texto) as Record<string, unknown>
  if (!crudo || typeof crudo !== 'object') throw new Error('El archivo no es un JSON de progreso.')

  const objeto = (v: unknown): Record<string, string> =>
    v && typeof v === 'object' ? (v as Record<string, string>) : {}
  const numeros = (v: unknown): Record<string, number> =>
    v && typeof v === 'object' ? (v as Record<string, number>) : {}

  /* Un JSON de la versión vieja trae `TC-d1:k1`; se renombra al entrar. */
  const migrado = (r: RespaldoLeido): RespaldoLeido => ({
    estado: { dias: r.estado.dias, katas: migrarClavesKata(r.estado.katas).datos },
    codigos: migrarClavesKata(r.codigos).datos,
    pasos: r.pasos,
  })

  // formato nuevo
  if (crudo.estado && typeof crudo.estado === 'object') {
    const e = crudo.estado as Partial<Estado>
    return migrado({
      estado: { dias: objeto(e.dias), katas: objeto(e.katas) },
      codigos: objeto(crudo.codigos),
      pasos: numeros(crudo.pasos),
    })
  }
  // volcado de localStorage con las claves originales
  if (crudo[CLAVE_ESTADO]) {
    const bruto = crudo[CLAVE_ESTADO]
    const e = (typeof bruto === 'string' ? JSON.parse(bruto) : bruto) as Partial<Estado>
    const c = crudo[CLAVE_CODIGOS]
    const p = crudo[CLAVE_PASOS]
    return migrado({
      estado: { dias: objeto(e.dias), katas: objeto(e.katas) },
      codigos: objeto(typeof c === 'string' ? JSON.parse(c) : c),
      pasos: numeros(typeof p === 'string' ? JSON.parse(p) : p),
    })
  }
  // el estado viejo, suelto: { dias: {...}, katas: {...} }
  if (crudo.dias || crudo.katas) {
    return migrado({ estado: { dias: objeto(crudo.dias), katas: objeto(crudo.katas) }, codigos: {}, pasos: {} })
  }
  throw new Error('No reconozco este archivo de progreso.')
}
