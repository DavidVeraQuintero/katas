import { useCallback, useMemo, useState, type ReactNode } from 'react'
import {
  guardarCodigos,
  guardarEstado,
  guardarPasos,
  guardarRevision,
  hoyISO,
  leerCodigos,
  leerEstado,
  leerPasos,
  leerRevision,
  claveKata,
  type Codigos,
  type Estado,
  type Pasos,
  type RespaldoLeido,
} from '../dominio/almacen'
import { ContextoProgreso, type Progreso } from './ProgresoContexto'

export function ProveedorProgreso({ children }: { children: ReactNode }) {
  const [estado, ponerEstado] = useState<Estado>(() => leerEstado())
  const [codigos, ponerCodigos] = useState<Codigos>(() => leerCodigos())
  const [pasos, ponerPasos] = useState<Pasos>(() => leerPasos())
  const [modoRevision, ponerModoRevision] = useState<boolean>(() => leerRevision())

  const cambiarModoRevision = useCallback((v: boolean) => {
    ponerModoRevision(v)
    guardarRevision(v)
  }, [])

  const marcarKata = useCallback((diaId: string, kataId: string) => {
    ponerEstado((previo) => {
      const clave = claveKata(diaId, kataId)
      if (previo.katas[clave]) return previo
      const siguiente: Estado = { dias: previo.dias, katas: { ...previo.katas, [clave]: hoyISO() } }
      guardarEstado(siguiente)
      return siguiente
    })
  }, [])

  const marcarDia = useCallback((diaId: string) => {
    ponerEstado((previo) => {
      if (previo.dias[diaId]) return previo
      const siguiente: Estado = { dias: { ...previo.dias, [diaId]: hoyISO() }, katas: previo.katas }
      guardarEstado(siguiente)
      return siguiente
    })
  }, [])

  const guardarCodigo = useCallback((clave: string, texto: string) => {
    ponerCodigos((previo) => {
      const siguiente = { ...previo, [clave]: texto }
      guardarCodigos(siguiente)
      return siguiente
    })
  }, [])

  const borrarCodigo = useCallback((clave: string) => {
    ponerCodigos((previo) => {
      const siguiente = { ...previo }
      delete siguiente[clave]
      guardarCodigos(siguiente)
      return siguiente
    })
  }, [])

  const recordarPaso = useCallback((diaId: string, indice: number) => {
    ponerPasos((previo) => {
      if (previo[diaId] === indice) return previo
      const siguiente: Pasos = { ...previo, [diaId]: indice }
      guardarPasos(siguiente)
      return siguiente
    })
  }, [])

  const reemplazar = useCallback((r: RespaldoLeido) => {
    ponerEstado(r.estado)
    guardarEstado(r.estado)
    ponerCodigos(r.codigos)
    guardarCodigos(r.codigos)
    ponerPasos(r.pasos)
    guardarPasos(r.pasos)
  }, [])

  const valor = useMemo<Progreso>(
    () => ({
      estado,
      codigos,
      pasos,
      modoRevision,
      cambiarModoRevision,
      marcarKata,
      marcarDia,
      guardarCodigo,
      borrarCodigo,
      recordarPaso,
      reemplazar,
    }),
    [estado, codigos, pasos, modoRevision, cambiarModoRevision, marcarKata, marcarDia, guardarCodigo, borrarCodigo, recordarPaso, reemplazar],
  )

  return <ContextoProgreso.Provider value={valor}>{children}</ContextoProgreso.Provider>
}
