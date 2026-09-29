import { Link, Navigate, useParams } from 'react-router-dom'
import { buscarDia, buscarSeccion } from '../contenido/ruta'
import { Taller } from '../componentes/Taller'
import { kataAbierta, primeraPendiente } from '../dominio/cadena'
import { useProgreso } from '../estado/ProgresoContexto'
import { NoEncontrado } from './NoEncontrado'

/* Una kata por pantalla. Aquí NUNCA se ve un paso: son páginas distintas. */
export function KataPagina() {
  const { diaId, n } = useParams()
  const { estado, modoRevision } = useProgreso()
  const encontrado = buscarDia(diaId ?? '')
  if (!encontrado) return <NoEncontrado que="Ese día todavía no está escrito." />

  const { semana, indice } = encontrado
  const dia = semana.dias[indice]
  const seccion = buscarSeccion(semana.id)
  if (!dia.katas.length) return <Navigate to={'/dia/' + dia.id} replace />

  const numero = Number(n)
  const i = numero - 1
  if (!Number.isInteger(numero) || i < 0 || i >= dia.katas.length) {
    return <Navigate to={'/dia/' + dia.id + '/kata/' + (primeraPendiente(estado, dia.id, dia.katas) + 1)} replace />
  }
  /* Katas en cadena: si intentas saltarte una, la ruta te devuelve a la que toca. */
  if (!kataAbierta(estado, dia.id, dia.katas, i, modoRevision)) {
    return <Navigate to={'/dia/' + dia.id + '/kata/' + (primeraPendiente(estado, dia.id, dia.katas) + 1)} replace />
  }

  return (
    <section>
      <div className="miga">
        <Link to="/">Inicio</Link>
        <span>/</span>
        <Link to={'/semana/' + semana.id}>{seccion ? seccion.titulo + ' · ' : ''}Semana {semana.n}</Link>
        <span>/</span>
        <Link to={'/dia/' + dia.id}>Día {dia.numero}</Link>
      </div>
      <Taller key={dia.id + ':' + dia.katas[i].id} dia={dia} indice={i} />
    </section>
  )
}
