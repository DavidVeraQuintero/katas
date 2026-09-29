/* La regla de evidencia y las katas en cadena, en un solo sitio. */
import type { Dia, Kata } from '../contenido/tipos'
import { claveKata, type Estado } from './almacen'

export const kataHecha = (estado: Estado, diaId: string, kataId: string): boolean =>
  Boolean(estado.katas[claveKata(diaId, kataId)])

export const fechaKata = (estado: Estado, diaId: string, kataId: string): string | undefined =>
  estado.katas[claveKata(diaId, kataId)]

/** Índice de la primera kata sin resolver; la última si ya están todas. */
export function primeraPendiente(estado: Estado, diaId: string, katas: Kata[]): number {
  for (let i = 0; i < katas.length; i++) if (!kataHecha(estado, diaId, katas[i].id)) return i
  return Math.max(0, katas.length - 1)
}

/**
 * Solo se puede abrir una kata ya resuelta, o la primera pendiente.
 * El modo revisión deja abrir cualquiera para leerla: no toca la regla de
 * evidencia, que sigue exigiendo que las pruebas pasen de verdad.
 */
export function kataAbierta(estado: Estado, diaId: string, katas: Kata[], i: number, modoRevision: boolean): boolean {
  if (modoRevision) return true
  if (i < 0 || i >= katas.length) return false
  if (kataHecha(estado, diaId, katas[i].id)) return true
  return i === primeraPendiente(estado, diaId, katas)
}

/** Un día está hecho cuando TODAS las katas de TODAS sus pruebas pasaron. */
export const diaCompleto = (estado: Estado, dia: Dia): boolean =>
  dia.katas.length > 0 && dia.katas.every((k) => kataHecha(estado, dia.id, k.id))

export const diaVerificado = (estado: Estado, diaId: string): boolean => Boolean(estado.dias[diaId])

export const katasHechas = (estado: Estado, dia: Dia): number =>
  dia.katas.filter((k) => kataHecha(estado, dia.id, k.id)).length
