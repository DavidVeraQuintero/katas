import { Link, useParams } from 'react-router-dom'
import { buscarDia, buscarSeccion } from '../contenido/ruta'
import { Html } from '../componentes/Html'
import { diaVerificado, kataAbierta, kataHecha, primeraPendiente } from '../dominio/cadena'
import { agendaDe } from '../dominio/repaso'
import { useProgreso } from '../estado/ProgresoContexto'
import { NoEncontrado } from './NoEncontrado'

export function DiaPagina() {
  const { diaId } = useParams()
  const { estado, pasos, modoRevision } = useProgreso()
  const encontrado = buscarDia(diaId ?? '')
  if (!encontrado) return <NoEncontrado que="Ese día todavía no está escrito." />

  const { semana, indice } = encontrado
  const dia = semana.dias[indice]
  const seccion = buscarSeccion(semana.id)
  const hecho = diaVerificado(estado, dia.id)
  const pasoGuardado = Math.min(pasos[dia.id] ?? 0, Math.max(0, dia.pasos.length - 1))
  const siguienteKata = dia.katas.length ? primeraPendiente(estado, dia.id, dia.katas) : 0
  const puedeKata = dia.katas.length > 0 && kataAbierta(estado, dia.id, dia.katas, siguienteKata, modoRevision)
  const agenda = hecho ? agendaDe(estado.dias[dia.id]) : []

  return (
    <>
      <header className="cabecera">
        <div className="marca">
          <span className="eyebrow">
            {seccion ? seccion.titulo + ' · ' : ''}Semana {String(semana.n).padStart(2, '0')} · Día {dia.numero}
          </span>
          <h1>{dia.titulo}</h1>
        </div>
        <div className="marcador">
          <div className="cifra">
            <b>{dia.pasos.length}</b>
            <span>pasos</span>
          </div>
          <div className="cifra">
            <b>
              {dia.katas.filter((k) => kataHecha(estado, dia.id, k.id)).length}/{dia.katas.length}
            </b>
            <span>katas</span>
          </div>
        </div>
      </header>

      <section>
        <div className="miga">
          <Link to="/">Inicio</Link>
          <span>/</span>
          <Link to={'/semana/' + semana.id}>{seccion ? seccion.titulo + ' · ' : ''}Semana {semana.n}</Link>
          <span>/</span>
          <span>Día {dia.numero}</span>
        </div>

        {hecho ? (
          <div className="veredicto exito" style={{ marginBottom: 18 }}>
            <b>Día verificado el {estado.dias[dia.id]}.</b> Toca repasarlo el{' '}
            {agenda.map((a) => a.cuando).join(', ')}. Repasar es reescribirlo de memoria, no releerlo.
          </div>
        ) : null}

        <div className="tarjeta">
          <div className="tarjeta-cabecera">
            <b>Lección de entrada</b>
            <span className="nota">Léela una vez y pasa a los pasos.</span>
          </div>
          <div className="tarjeta-cuerpo">
            <Html html={dia.leccion} />
            <div className="acciones">
              {dia.pasos.length ? (
                <Link className="btn" to={'/dia/' + dia.id + '/paso/' + (pasoGuardado + 1)}>
                  {pasoGuardado > 0 ? 'Seguir en el paso ' + (pasoGuardado + 1) : 'Empezar los pasos'}
                </Link>
              ) : null}
              {puedeKata ? (
                <Link className="btn fantasma" to={'/dia/' + dia.id + '/kata/' + (siguienteKata + 1)}>
                  Ir a la kata {siguienteKata + 1}
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
