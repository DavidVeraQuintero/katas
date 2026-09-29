import type { ResultadoPrueba } from '../dominio/corredor'

export function ListaResultados({ resultados }: { resultados: ResultadoPrueba[] }) {
  if (!resultados.length) return null
  return (
    <div className="resultados">
      {resultados.map((r, i) => (
        <div key={i} className={'prueba ' + (r.ok ? 'ok' : 'mal')}>
          <span className="marca-p">{r.ok ? '✓' : '✗'}</span>
          <span className="prueba-cuerpo">
            <span>{r.nombre}</span>
            {r.motivo ? <span className="prueba-motivo">{r.motivo}</span> : null}
          </span>
        </div>
      ))}
    </div>
  )
}
