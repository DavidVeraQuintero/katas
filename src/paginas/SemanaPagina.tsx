import { Link, useParams } from 'react-router-dom'
import { buscarSemana, buscarSeccion } from '../contenido/ruta'
import { diaVerificado, katasHechas } from '../dominio/cadena'
import { useProgreso } from '../estado/ProgresoContexto'
import { NoEncontrado } from './NoEncontrado'

export function SemanaPagina() {
  const { semanaId } = useParams()
  const { estado } = useProgreso()
  const semana = buscarSemana(semanaId ?? '')
  if (!semana) return <NoEncontrado que="Esa semana no existe en la ruta." />
  const seccion = buscarSeccion(semana.id)

  return (
    <>
      <header className="cabecera">
        <div className="marca">
          <span className="eyebrow">{seccion ? seccion.titulo + ' · ' : ''}Semana {String(semana.n).padStart(2, '0')}</span>
          <h1>{semana.titulo}</h1>
          {semana.subtitulo ? <span className="nota">{semana.subtitulo}</span> : null}
        </div>
      </header>

      <section>
        <div className="miga">
          <Link to="/">Inicio</Link>
          <span>/</span>
          <span>{seccion ? seccion.titulo + ' · ' : ''}Semana {semana.n}</span>
        </div>
        {semana.dias.length ? (
          <div className="lista-dias">
            {semana.dias.map((d) => {
              const hecho = diaVerificado(estado, d.id)
              return (
                <Link className={'dia' + (hecho ? ' hecho' : '')} to={'/dia/' + d.id} key={d.id}>
                  <span className="sello">{hecho ? '✓' : ''}</span>
                  <span className="dia-cuerpo">
                    <span className="dia-etq">Día {d.numero}</span>
                    <span className="dia-txt">{d.titulo}</span>
                  </span>
                  <span className="dia-accion">
                    {d.pasos.length} pasos · {katasHechas(estado, d)}/{d.katas.length} katas
                  </span>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="vacio">Esta semana todavía no tiene días escritos.</div>
        )}
      </section>
    </>
  )
}
