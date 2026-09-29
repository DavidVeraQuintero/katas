import { useEffect } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { buscarDia, buscarSeccion } from '../contenido/ruta'
import { Html } from '../componentes/Html'
import { kataAbierta, primeraPendiente } from '../dominio/cadena'
import { useProgreso } from '../estado/ProgresoContexto'
import { NoEncontrado } from './NoEncontrado'

/* Un paso por pantalla. Aquí NUNCA se ve la kata: son páginas distintas. */
export function PasoPagina() {
  const { diaId, n } = useParams()
  const navegar = useNavigate()
  const { estado, recordarPaso, modoRevision } = useProgreso()
  const encontrado = buscarDia(diaId ?? '')
  const numero = Number(n)
  const dia = encontrado?.semana.dias[encontrado.indice]
  const valido = Boolean(dia && Number.isInteger(numero) && numero >= 1 && numero <= dia.pasos.length)

  useEffect(() => {
    if (dia && valido) recordarPaso(dia.id, numero - 1)
  }, [dia, valido, numero, recordarPaso])

  if (!encontrado || !dia) return <NoEncontrado que="Ese día todavía no está escrito." />
  if (!dia.pasos.length) return <Navigate to={'/dia/' + dia.id} replace />
  if (!valido) return <Navigate to={'/dia/' + dia.id + '/paso/1'} replace />

  const { semana } = encontrado
  const seccion = buscarSeccion(semana.id)
  const i = numero - 1
  const paso = dia.pasos[i]
  const ultimo = i === dia.pasos.length - 1
  const kataSiguiente = dia.katas.length ? primeraPendiente(estado, dia.id, dia.katas) : -1
  const puedeKata = kataSiguiente >= 0 && kataAbierta(estado, dia.id, dia.katas, kataSiguiente, modoRevision)

  const irA = (j: number) => navegar('/dia/' + dia.id + '/paso/' + (j + 1))

  return (
    <>
      <section>
        <div className="miga">
          <Link to="/">Inicio</Link>
          <span>/</span>
          <Link to={'/semana/' + semana.id}>{seccion ? seccion.titulo + ' · ' : ''}Semana {semana.n}</Link>
          <span>/</span>
          <Link to={'/dia/' + dia.id}>Día {dia.numero}</Link>
        </div>

        <div className="tarjeta">
          <div className="tarjeta-cabecera">
            <b>{dia.titulo}</b>
            <Link className="btn fantasma menudo" to={'/dia/' + dia.id}>
              Volver a la lección
            </Link>
          </div>
          <div className="tarjeta-cuerpo">
            <div className="pasos">
              <div className="pasos-barra">
                <span className="pasos-cuenta">
                  Paso {numero} de {dia.pasos.length}
                </span>
                <div className="pasos-puntos">
                  {dia.pasos.map((p, j) => (
                    <button
                      key={p.id}
                      type="button"
                      className={j === i ? 'actual' : j < i ? 'visto' : ''}
                      title={j + 1 + '. ' + p.titulo}
                      aria-label={'Ir al paso ' + (j + 1)}
                      onClick={() => irA(j)}
                    />
                  ))}
                </div>
              </div>

              <h2 className="paso-titulo">{paso.titulo}</h2>
              <Html html={paso.html} />

              <div className="pasos-nav">
                <button type="button" className="btn fantasma" disabled={i === 0} onClick={() => irA(i - 1)}>
                  Anterior
                </button>
                {ultimo ? (
                  puedeKata ? (
                    <Link className="btn" to={'/dia/' + dia.id + '/kata/' + (kataSiguiente + 1)}>
                      Ahora la kata
                    </Link>
                  ) : (
                    <Link className="btn fantasma" to={'/dia/' + dia.id}>
                      Terminaste los pasos
                    </Link>
                  )
                ) : (
                  <button type="button" className="btn" onClick={() => irA(i + 1)}>
                    Siguiente
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
