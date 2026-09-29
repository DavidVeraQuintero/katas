import { useState } from 'react'
import { Link } from 'react-router-dom'
import { RUTA, todosLosDias } from '../contenido/ruta'
import { diaVerificado } from '../dominio/cadena'
import { colaDeRepaso } from '../dominio/repaso'
import { aplicarTema, leerTema, nombreTema, siguienteTema } from '../dominio/tema'
import { Respaldo } from '../componentes/Respaldo'
import { useProgreso } from '../estado/ProgresoContexto'

export function Inicio() {
  const { estado } = useProgreso()
  const [tema, ponerTema] = useState(() => leerTema())

  const dias = todosLosDias()
  const escritos = dias.length
  const hechos = dias.filter(({ dia }) => diaVerificado(estado, dia.id)).length
  const katasHechas = Object.keys(estado.katas).length
  const pct = escritos ? Math.round((hechos / escritos) * 100) : 0
  const siguiente = dias.find(({ dia }) => !diaVerificado(estado, dia.id))
  const cola = colaDeRepaso(estado)

  return (
    <>
      <header className="cabecera">
        <div className="marca">
          <span className="eyebrow">JavaScript · React · C# · LINQ</span>
          <h1>Dojo DevSkills</h1>
        </div>
        <div className="marcador">
          <div className="cifra">
            <b>{hechos}</b>
            <span>días verificados</span>
          </div>
          <div className="cifra">
            <b>{katasHechas}</b>
            <span>katas resueltas</span>
          </div>
          <div className="cifra">
            <b>{pct}%</b>
            <span>de lo escrito</span>
          </div>
        </div>
      </header>

      <div className="hoy">
        <div className="hoy-texto">
          <span className="eyebrow">Siguiente sesión</span>
          <span className="hoy-titulo">
            {siguiente
              ? 'Semana ' + siguiente.semana.n + ' · Día ' + siguiente.dia.numero + ' — ' + siguiente.dia.titulo
              : escritos
                ? 'Terminaste todo lo escrito. Ahora toca mantener: un repaso al día.'
                : 'Todavía no hay días escritos en la ruta.'}
          </span>
          <span className="nota">
            {cola.length
              ? cola.length === 1
                ? 'Además tienes 1 repaso pendiente.'
                : 'Además tienes ' + cola.length + ' repasos pendientes.'
              : 'Un día solo se marca cuando todas las pruebas de todas sus katas pasan de verdad.'}
          </span>
        </div>
        {siguiente ? (
          <Link className="btn" to={'/dia/' + siguiente.dia.id}>
            Abrir la clase
          </Link>
        ) : (
          <Link className="btn" to="/repaso">
            Ver repasos
          </Link>
        )}
      </div>

      {RUTA.map((seccion) => (
        <section key={seccion.id}>
          <div className="titulo-seccion">
            <h2>{seccion.icono ? seccion.icono + ' ' : ''}{seccion.titulo}</h2>
            <span className="regla" />
            <span className="nota">
              {seccion.semanas.reduce((acc, s) => acc + s.dias.filter((d) => diaVerificado(estado, d.id)).length, 0)}/
              {seccion.semanas.reduce((acc, s) => acc + s.dias.length, 0)} días
            </span>
          </div>
          {seccion.semanas.length ? (
            seccion.semanas.map((s) => {
              const listos = s.dias.filter((d) => diaVerificado(estado, d.id)).length
              return (
                <div className="semana" data-fase={s.fase} key={s.id}>
                  <Link className="semana-cabeza" to={'/semana/' + s.id}>
                    <span className="num-semana">S{String(s.n).padStart(2, '0')}</span>
                    <span className="semana-tit">
                      <b>{s.titulo}</b>
                      <span>{s.subtitulo}</span>
                    </span>
                    <span className="avance">
                      <span className="puntos">
                        {s.dias.map((d) => (
                          <span className={'punto' + (diaVerificado(estado, d.id) ? ' listo' : '')} key={d.id} />
                        ))}
                      </span>
                      {s.dias.length ? listos + '/' + s.dias.length : 'sin escribir'}
                    </span>
                  </Link>
                </div>
              )
            })
          ) : (
            <div className="vacio">Sin contenido todavía.</div>
          )}
        </section>
      ))}

      <section>
        <div className="titulo-seccion">
          <h2>Mantenimiento</h2>
          <span className="regla" />
        </div>
        <div className="rejilla">
          <div className="caja">
            <span className="kicker">Repaso espaciado</span>
            <p>Cada día verificado vuelve a los 1, 3, 7 y 21 días. Repasar es reescribir de memoria.</p>
            <div className="intervalos">
              <span className="chip">+1</span>
              <span className="chip">+3</span>
              <span className="chip">+7</span>
              <span className="chip">+21</span>
            </div>
            <div className="acciones">
              <Link className="btn fantasma menudo" to="/repaso">
                {cola.length ? cola.length + ' por repasar' : 'Ver la cola'}
              </Link>
            </div>
          </div>
          <Respaldo />
          <div className="caja">
            <span className="kicker">Apariencia</span>
            <p>El tema sigue al sistema, pero lo puedes fijar.</p>
            <div className="acciones">
              <button
                type="button"
                className="btn fantasma menudo"
                onClick={() => {
                  const t = siguienteTema(tema)
                  aplicarTema(t)
                  ponerTema(t)
                }}
              >
                Tema: {nombreTema(tema)}
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="pie">
        <span>Dojo DevSkills · React + Vite</span>
        <span>El progreso se guarda en este navegador</span>
      </div>
    </>
  )
}
