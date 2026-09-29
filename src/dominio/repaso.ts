/* Repaso espaciado: cada día verificado vuelve a +1, +3, +7 y +21 días. */
import type { Estado } from './almacen'
import { hoyISO } from './almacen'

export const INTERVALOS = [1, 3, 7, 21] as const
export const DIA_MS = 86400000

export type Pendiente = { diaId: string; n: number; diasAtraso: number }

/**
 * Cola de repasos vencidos hoy. Para cada día verificado se toma el primer
 * intervalo que ya venció; los más atrasados van primero.
 */
export function colaDeRepaso(estado: Estado): Pendiente[] {
  const hoy = Date.parse(hoyISO())
  const cola: Pendiente[] = []
  for (const [diaId, fecha] of Object.entries(estado.dias)) {
    const base = Date.parse(fecha)
    if (Number.isNaN(base)) continue
    for (const n of INTERVALOS) {
      const vence = base + n * DIA_MS
      if (vence <= hoy) {
        cola.push({ diaId, n, diasAtraso: Math.round((hoy - vence) / DIA_MS) })
        break
      }
    }
  }
  return cola.sort((a, b) => b.diasAtraso - a.diasAtraso)
}

/** Las fechas de los cuatro repasos de un día, para mostrarlas en la ficha. */
export function agendaDe(fecha: string): { n: number; cuando: string }[] {
  const base = Date.parse(fecha)
  if (Number.isNaN(base)) return []
  return INTERVALOS.map((n) => ({ n, cuando: new Date(base + n * DIA_MS).toISOString().slice(0, 10) }))
}
