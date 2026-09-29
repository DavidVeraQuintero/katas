import type { Seccion, Semana } from './tipos'
import diaX1d1 from './js-express/semana-01/dia-1/indice'
import diaX1d2 from './js-express/semana-01/dia-2/indice'
import diaX1d3 from './js-express/semana-01/dia-3/indice'
import diaX1d4 from './js-express/semana-01/dia-4/indice'
import diaX1d5 from './js-express/semana-01/dia-5/indice'

export const RUTA: Seccion[] = [
  {
    id: 'jx', titulo: 'JavaScript Express', icono: 'JX',
    semanas: [
      { id: 'X1', n: 1, titulo: 'Los cimientos', subtitulo: 'variables, tipos, funciones, condicionales y bucles', fase: 'jx', dias: [diaX1d1, diaX1d2, diaX1d3, diaX1d4, diaX1d5] },
    ],
  },
]

/** Todas las semanas de todas las secciones, en orden. */
export function todasLasSemanas(): Semana[] {
  return RUTA.flatMap((s) => s.semanas)
}

/** Busca un día por su id estable ('X1-d1'), junto con la semana que lo contiene. */
export function buscarDia(diaId: string): { semana: Semana; indice: number } | null {
  for (const seccion of RUTA) {
    for (const semana of seccion.semanas) {
      const indice = semana.dias.findIndex((d) => d.id === diaId)
      if (indice >= 0) return { semana, indice }
    }
  }
  return null
}

/** Busca una semana por su id estable. */
export function buscarSemana(semanaId: string): Semana | null {
  for (const seccion of RUTA) {
    const semana = seccion.semanas.find((s) => s.id === semanaId)
    if (semana) return semana
  }
  return null
}

/** Busca la sección que contiene una semana. */
export function buscarSeccion(semanaId: string): Seccion | null {
  return RUTA.find((sec) => sec.semanas.some((s) => s.id === semanaId)) ?? null
}

/** Busca la sección de un día. */
export function buscarSeccionDeDia(diaId: string): Seccion | null {
  for (const seccion of RUTA) {
    for (const semana of seccion.semanas) {
      if (semana.dias.some((d) => d.id === diaId)) return seccion
    }
  }
  return null
}

/** Todos los días de la ruta, en orden. */
export function todosLosDias() {
  return RUTA.flatMap((seccion) =>
    seccion.semanas.flatMap((semana) => semana.dias.map((dia) => ({ semana, dia })))
  )
}
