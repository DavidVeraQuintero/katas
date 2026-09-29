import { createContext, useContext } from 'react'
import type { Codigos, Estado, Pasos, RespaldoLeido } from '../dominio/almacen'

export type Progreso = {
  estado: Estado
  codigos: Codigos
  pasos: Pasos
  modoRevision: boolean
  cambiarModoRevision: (v: boolean) => void
  marcarKata: (diaId: string, kataId: string) => void
  marcarDia: (diaId: string) => void
  guardarCodigo: (clave: string, texto: string) => void
  borrarCodigo: (clave: string) => void
  recordarPaso: (diaId: string, indice: number) => void
  reemplazar: (r: RespaldoLeido) => void
}

export const ContextoProgreso = createContext<Progreso | null>(null)

export function useProgreso(): Progreso {
  const v = useContext(ContextoProgreso)
  if (!v) throw new Error('useProgreso necesita estar dentro de <ProveedorProgreso>')
  return v
}
