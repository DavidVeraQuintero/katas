import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom'
import { RUTA, buscarDia, buscarSemana, buscarSeccion } from '../contenido/ruta'
import { diaVerificado, kataAbierta, kataHecha, katasHechas } from '../dominio/cadena'
import { useProgreso } from '../estado/ProgresoContexto'

/* El menú navega en profundidad: secciones → semanas → días → pasos y katas.
   Nunca se ven todos los niveles a la vez. Siempre hay un botón de volver. */
export function BarraLateral({ alNavegar }: { alNavegar?: () => void }) {
  const { pathname } = useLocation()
  const navegar = useNavigate()
  const { estado, pasos, modoRevision } = useProgreso()

  const enDia = matchPath('/dia/:diaId/*', pathname) ?? matchPath('/dia/:diaId', pathname)
  const enSemana = matchPath('/semana/:semanaId', pathname)
  const enPaso = matchPath('/dia/:diaId/paso/:n', pathname)
  const enKata = matchPath('/dia/:diaId/kata/:n', pathname)

  const ir = (a: string) => {
    navegar(a)
    alNavegar?.()
  }

  /* ---- nivel 3: dentro de un día ---- */
  if (enDia) {
    const encontrado = buscarDia(enDia.params.diaId ?? '')
    if (encontrado) {
      const { semana, indice } = encontrado
      const dia = semana.dias[indice]
      const pasoActual = enPaso ? Number(enPaso.params.n) : 0
      const kataActual = enKata ? Number(enKata.params.n) : 0
      const vistoHasta = pasos[dia.id] ?? -1
      return (
        <>
          <button type="button" className="bl-volver" onClick={() => ir('/semana/' + semana.id)}>
            ← Semana {semana.n} · {semana.titulo}
          </button>
          <span className="bl-ubicacion">Día {dia.numero}</span>
          <span className="bl-tema">{dia.titulo}</span>

          <ul className="bl-lista">
            <li>
              <Link
                to={'/dia/' + dia.id}
                onClick={alNavegar}
                className={'bl-item' + (!enPaso && !enKata ? ' actual' : '')}
              >
                <span className="num">◆</span>
                <span className="bl-texto">Lección de entrada</span>
              </Link>
            </li>
          </ul>

          <h4>Pasos</h4>
          {dia.pasos.length ? (
            <ul className="bl-lista">
              {dia.pasos.map((p, i) => (
                <li key={p.id}>
                  <Link
                    to={'/dia/' + dia.id + '/paso/' + (i + 1)}
                    onClick={alNavegar}
                    className={
                      'bl-item' + (pasoActual === i + 1 ? ' actual' : '') + (i <= vistoHasta ? ' visto' : '')
                    }
                  >
                    <span className="num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="bl-texto">{p.titulo}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <span className="bl-vacio">Todavía sin pasos.</span>
          )}

          <h4>Katas</h4>
          {dia.katas.length ? (
            <ul className="bl-lista">
              {dia.katas.map((k, i) => {
                const hecha = kataHecha(estado, dia.id, k.id)
                const abierta = kataAbierta(estado, dia.id, dia.katas, i, modoRevision)
                const clases =
                  'bl-item' + (kataActual === i + 1 ? ' actual' : '') + (hecha ? ' hecha' : '')
                if (!abierta) {
                  return (
                    <li key={k.id}>
                      <button type="button" className={clases} disabled title="Primero termina la kata anterior">
                        <span className="num">🔒</span>
                        <span className="bl-texto">{k.titulo}</span>
                      </button>
                    </li>
                  )
                }
                return (
                  <li key={k.id}>
                    <Link to={'/dia/' + dia.id + '/kata/' + (i + 1)} onClick={alNavegar} className={clases}>
                      <span className="num">{hecha ? '✓' : String(i + 1).padStart(2, '0')}</span>
                      <span className="bl-texto">{k.titulo}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          ) : (
            <span className="bl-vacio">Todavía sin katas.</span>
          )}
        </>
      )
    }
  }

  /* ---- nivel 2: los días de una semana ---- */
  if (enSemana) {
    const semana = buscarSemana(enSemana.params.semanaId ?? '')
    if (semana) {
      const seccion = buscarSeccion(semana.id)
      return (
        <>
          <button type="button" className="bl-volver" onClick={() => ir('/')}>
            ← {seccion ? seccion.titulo : 'Todas las secciones'}
          </button>
          <span className="bl-ubicacion">Semana {semana.n}</span>
          <span className="bl-tema">{semana.titulo}</span>
          {semana.dias.length ? (
            <ul className="bl-lista">
              {semana.dias.map((d) => (
                <li key={d.id}>
                  <Link
                    to={'/dia/' + d.id}
                    onClick={alNavegar}
                    className={'bl-item' + (diaVerificado(estado, d.id) ? ' visto' : '')}
                  >
                    <span className="num">{diaVerificado(estado, d.id) ? '✓' : d.numero}</span>
                    <span className="bl-texto">{d.titulo}</span>
                    <span className="bl-cuenta">
                      {katasHechas(estado, d)}/{d.katas.length}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <span className="bl-vacio">Esta semana todavía no tiene días escritos.</span>
          )}
        </>
      )
    }
  }

  /* ---- nivel 1: secciones con sus semanas ---- */
  return (
    <>
      <p className="bl-tit">Dónde estoy</p>
      <span className="bl-tema">La ruta completa</span>
      {RUTA.map((seccion) => (
        <div key={seccion.id}>
          <h4 className="bl-seccion">{seccion.icono ? seccion.icono + ' ' : ''}{seccion.titulo}</h4>
          {seccion.semanas.length ? (
            <ul className="bl-lista">
              {seccion.semanas.map((s) => {
                const hechos = s.dias.filter((d) => diaVerificado(estado, d.id)).length
                return (
                  <li key={s.id}>
                    <Link
                      to={'/semana/' + s.id}
                      onClick={alNavegar}
                      className={
                        'bl-item' +
                        (hechos > 0 && hechos === s.dias.length ? ' visto' : '') +
                        (s.dias.length === 0 ? ' vacio-item' : '')
                      }
                    >
                      <span className="num">{String(s.n).padStart(2, '0')}</span>
                      <span className="bl-texto">{s.titulo}</span>
                      <span className="bl-cuenta">
                        {hechos}/{s.dias.length}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          ) : (
            <span className="bl-vacio">Sin contenido todavía.</span>
          )}
        </div>
      ))}
      <h4>Otros</h4>
      <ul className="bl-lista">
        <li>
          <Link to="/repaso" onClick={alNavegar} className={'bl-item' + (pathname === '/repaso' ? ' actual' : '')}>
            <span className="num">↻</span>
            <span className="bl-texto">Repaso espaciado</span>
          </Link>
        </li>
      </ul>
    </>
  )
}
