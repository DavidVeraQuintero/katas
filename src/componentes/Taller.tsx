import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { Dia } from '../contenido/tipos'
import { Html } from './Html'
import { EditorCodigo } from './EditorCodigo'
import { ListaPruebas } from './ListaPruebas'
import { claveKata } from '../dominio/almacen'
import { diaCompleto, kataAbierta, kataHecha, primeraPendiente } from '../dominio/cadena'
import { correrKata, type ResultadoPrueba, type Veredicto } from '../dominio/corredor'
import { useProgreso } from '../estado/ProgresoContexto'

type Props = { dia: Dia; indice: number }

export function Taller({ dia, indice }: Props) {
  const navegar = useNavigate()
  const { estado, codigos, modoRevision, cambiarModoRevision, guardarCodigo, marcarKata, marcarDia } = useProgreso()

  const kata = dia.katas[indice]
  const clave = claveKata(dia.id, kata.id)
  const guardadoInicial = codigos[clave]

  const [codigo, ponerCodigo] = useState<string>(
    typeof guardadoInicial === 'string' && guardadoInicial.trim() ? guardadoInicial : kata.plantilla,
  )
  const [resultados, ponerResultados] = useState<ResultadoPrueba[]>([])
  const [veredicto, ponerVeredicto] = useState<Veredicto | null>(null)
  const [corriendo, ponerCorriendo] = useState(false)
  const [guardado, ponerGuardado] = useState('')
  const reloj = useRef<ReturnType<typeof setTimeout>>()

  const hecha = kataHecha(estado, dia.id, kata.id)

  /* El código se guarda solo, un poco después de dejar de escribir. */
  useEffect(() => {
    if (codigo === (guardadoInicial ?? kata.plantilla)) return
    ponerGuardado('guardando…')
    clearTimeout(reloj.current)
    reloj.current = setTimeout(() => {
      guardarCodigo(clave, codigo)
      ponerGuardado('guardado en este navegador')
    }, 700)
    return () => clearTimeout(reloj.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codigo])

  const correr = async () => {
    ponerCorriendo(true)
    ponerResultados([])
    ponerVeredicto(null)
    guardarCodigo(clave, codigo)
    const v = await correrKata(kata, codigo, ponerResultados)
    ponerVeredicto(v)
    ponerCorriendo(false)
    /* Regla de evidencia: la kata solo se marca si TODAS las pruebas pasaron de
       verdad y además existen todos los nombres que la kata pide. */
    if (v.tipo === 'todas') {
      marcarKata(dia.id, kata.id)
      const faltan = dia.katas.filter((k) => k.id !== kata.id && !kataHecha(estado, dia.id, k.id))
      if (faltan.length === 0) marcarDia(dia.id)
    }
  }

  const faltanDespues = useMemo(
    () => dia.katas.filter((k, i) => i !== indice && !kataHecha(estado, dia.id, k.id)).length,
    [dia, indice, estado],
  )
  const completo = diaCompleto(estado, dia)
  const siguiente = indice < dia.katas.length - 1 ? indice + 1 : -1

  return (
    <div className="tarjeta">
      <div className="tarjeta-cabecera">
        <b>
          Día {dia.numero} · {dia.titulo}
        </b>
        <Link className="btn fantasma menudo" to={'/dia/' + dia.id}>
          Volver a la lección
        </Link>
      </div>
      <div className="tarjeta-cuerpo">
        <div className="katas-barra">
          {dia.katas.map((k, i) => {
            const kh = kataHecha(estado, dia.id, k.id)
            const abierta = kataAbierta(estado, dia.id, dia.katas, i, modoRevision)
            const clases =
              'kata-chip' + (i === indice ? ' actual' : '') + (kh ? ' hecha' : '') + (abierta ? '' : ' bloqueada')
            return (
              <button
                key={k.id}
                type="button"
                className={clases}
                disabled={!abierta}
                title={abierta ? k.titulo : 'Primero termina la kata ' + (primeraPendiente(estado, dia.id, dia.katas) + 1)}
                onClick={() => abierta && navegar('/dia/' + dia.id + '/kata/' + (i + 1))}
              >
                <span className="n">{kh ? '✓' : abierta ? String(i + 1) : '🔒'}</span>
                <span>{k.titulo}</span>
              </button>
            )
          })}
        </div>

        <label className="revision">
          <input type="checkbox" checked={modoRevision} onChange={(ev) => cambiarModoRevision(ev.target.checked)} />
          <span>
            Modo revisión: deja abrir cualquier kata para leerla. No cambia la regla de evidencia — el día sigue
            marcándose solo cuando todas las pruebas pasen de verdad.
          </span>
        </label>

        <div className="kata-cabeza">
          <h3>
            Kata {indice + 1} de {dia.katas.length} · {kata.titulo}
          </h3>
          <div className="kata-meta">
            {kata.dificultad ? (
              <span className="kata-nivel" data-nivel={kata.dificultad}>
                {kata.dificultad}
                {kata.minutos ? ' · ' + kata.minutos + ' min' : ''}
              </span>
            ) : null}
          </div>
        </div>

        <Html html={kata.enunciado} />

        <div className="editor-pruebas">
          <div className="editor-caja">
            <div className="editor-barra">
              <span className="nota">
                Debe quedar definido: <code>{kata.exporta.join(', ')}</code>
              </span>
              <span className="nota" style={{ position: 'absolute', right: '0', top: '0' }}>{guardado}</span>
            </div>
            <EditorCodigo valor={codigo} alCambiar={ponerCodigo} />
            <div className="acciones">
              <button type="button" className="btn" onClick={() => void correr()} disabled={corriendo}>
                {corriendo ? 'Corriendo…' : 'Correr pruebas'}
              </button>
              <button
                type="button"
                className="btn fantasma"
                onClick={() => {
                  ponerCodigo(kata.plantilla)
                  guardarCodigo(clave, kata.plantilla)
                }}
              >
                Borrar y empezar de nuevo
              </button>
              {siguiente >= 0 && kataHecha(estado, dia.id, kata.id) ? (
                <Link className="btn fantasma" to={'/dia/' + dia.id + '/kata/' + (siguiente + 1)}>
                  Siguiente kata
                </Link>
              ) : null}
            </div>
          </div>

          <div className="pruebas-lateral">
            <ListaPruebas pruebas={kata.pruebas} resultados={resultados} diaId={dia.id} />
            {veredicto ? (
              <VeredictoCaja veredicto={veredicto} faltanDespues={faltanDespues} completo={completo} total={kata.pruebas.length} />
            ) : !veredicto && hecha ? (
              <div className="veredicto exito">
                Kata resuelta el {estado.katas[clave]}. Para repasarla, borra el editor y reescríbela de memoria.
              </div>
            ) : !veredicto ? (
              <div className="veredicto">
                Escribe tu solución y corre las pruebas. Esta kata se marca sola cuando pasen todas.
              </div>
            ) : null}
          </div>
        </div>
      </div>

    </div>
  )
}

function VeredictoCaja({
  veredicto,
  faltanDespues,
  completo,
  total,
}: {
  veredicto: Veredicto
  faltanDespues: number
  completo: boolean
  total: number
}) {
  if (veredicto.tipo === 'error-lectura') {
    return <div className="veredicto">Tu código no se pudo leer: {veredicto.mensaje}</div>
  }
  if (veredicto.tipo === 'faltan-nombres') {
    return (
      <div className="veredicto">
        <b>Falta código.</b> Todavía no has escrito: {veredicto.faltantes.join(', ')}. Las pruebas no protestaron,
        pero la kata no está resuelta.
      </div>
    )
  }
  if (veredicto.tipo === 'todas') {
    return (
      <div className="veredicto exito">
        <b>
          {total}/{total} en verde.
        </b>{' '}
        {faltanDespues === 0 || completo
          ? 'Con esta terminas las katas del día. Día verificado y marcado. Mañana toca repasarlo de memoria.'
          : faltanDespues === 1
            ? 'Kata resuelta. Queda 1 kata.'
            : 'Kata resuelta. Quedan ' + faltanDespues + ' katas.'}
      </div>
    )
  }
  return (
    <div className="veredicto">
      <b>
        {veredicto.pasadas}/{veredicto.total}.
      </b>{' '}
      Lee el primer ✗: ahí está la pista.
      {veredicto.faltantes.length ? ' Todavía no has escrito: ' + veredicto.faltantes.join(', ') + '.' : ''}
      {veredicto.suelta
        ? ' Además, una promesa se rechazó sin que nadie la atrapara ("' +
          veredicto.suelta +
          '"): suele ser un await que falta, o un try/catch.'
        : ''}
    </div>
  )
}
