import { Link } from 'react-router-dom'
import { buscarDia } from '../contenido/ruta'
import { INTERVALOS, colaDeRepaso } from '../dominio/repaso'
import { useProgreso } from '../estado/ProgresoContexto'

export function RepasoPagina() {
  const { estado } = useProgreso()
  const cola = colaDeRepaso(estado)
  const verificados = Object.keys(estado.dias).length

  return (
    <>
      <header className="cabecera">
        <div className="marca">
          <span className="eyebrow">Mantenimiento</span>
          <h1>Repaso espaciado</h1>
        </div>
        <div className="marcador">
          <div className="cifra">
            <b>{cola.length}</b>
            <span>por repasar hoy</span>
          </div>
          <div className="cifra">
            <b>{verificados}</b>
            <span>días verificados</span>
          </div>
        </div>
      </header>

      <section>
        <div className="miga">
          <Link to="/">Inicio</Link>
          <span>/</span>
          <span>Repaso</span>
        </div>

        <div className="caja" style={{ marginBottom: 18 }}>
          <span className="kicker">Cómo funciona</span>
          <p>
            Cada día verificado vuelve a los {INTERVALOS.join(', ')} días. Repasar es reescribir la kata de memoria:
            releer la solución no cuenta.
          </p>
          <div className="intervalos">
            {INTERVALOS.map((n) => (
              <span className="chip" key={n}>
                +{n}
              </span>
            ))}
          </div>
        </div>

        <div className="pendientes">
          {cola.length ? (
            cola.map((p) => {
              const enc = buscarDia(p.diaId)
              const titulo = enc ? enc.semana.dias[enc.indice].titulo : p.diaId
              return (
                <Link className={'pendiente' + (p.diasAtraso > 1 ? ' atrasado' : '')} to={'/dia/' + p.diaId} key={p.diaId}>
                  <span>{titulo}</span>
                  <code>
                    {p.diaId} · repaso +{p.n}
                    {p.diasAtraso > 0 ? ' · ' + p.diasAtraso + 'd atrasado' : ' · hoy'}
                  </code>
                </Link>
              )
            })
          ) : (
            <div className="vacio">
              {verificados
                ? 'Nada pendiente hoy. El primer repaso aparece mañana.'
                : 'Verifica tu primer día y aquí aparece la cola de repasos.'}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
