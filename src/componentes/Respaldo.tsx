import { useRef, useState } from 'react'
import { armarRespaldo, leerRespaldo } from '../dominio/almacen'
import { useProgreso } from '../estado/ProgresoContexto'

/** Exportar e importar el progreso como un archivo JSON. */
export function Respaldo() {
  const { estado, codigos, pasos, reemplazar } = useProgreso()
  const entrada = useRef<HTMLInputElement>(null)
  const [aviso, ponerAviso] = useState('')

  const exportar = () => {
    const datos = armarRespaldo(estado, codigos, pasos)
    const url = URL.createObjectURL(new Blob([JSON.stringify(datos, null, 2)], { type: 'application/json' }))
    const a = document.createElement('a')
    a.href = url
    a.download = 'dojo-progreso-' + new Date().toISOString().slice(0, 10) + '.json'
    a.click()
    URL.revokeObjectURL(url)
    ponerAviso('Progreso exportado.')
  }

  const importar = async (archivo: File) => {
    try {
      const leido = leerRespaldo(await archivo.text())
      reemplazar(leido)
      const n = Object.keys(leido.estado.dias).length
      ponerAviso('Progreso importado: ' + n + (n === 1 ? ' día verificado.' : ' días verificados.'))
    } catch (e) {
      ponerAviso('No se pudo importar: ' + (e as Error).message)
    }
  }

  return (
    <div className="caja">
      <span className="kicker">Tu progreso</span>
      <p>
        Vive en este navegador. Expórtalo antes de cambiar de máquina; el importador también entiende el JSON del
        dojo viejo.
      </p>
      <div className="acciones">
        <button type="button" className="btn fantasma menudo" onClick={exportar}>
          Exportar JSON
        </button>
        <button type="button" className="btn fantasma menudo" onClick={() => entrada.current?.click()}>
          Importar JSON
        </button>
        <input
          ref={entrada}
          type="file"
          accept="application/json,.json"
          hidden
          onChange={(ev) => {
            const f = ev.target.files?.[0]
            if (f) void importar(f)
            ev.target.value = ''
          }}
        />
      </div>
      {aviso ? <p className="nota">{aviso}</p> : null}
    </div>
  )
}
