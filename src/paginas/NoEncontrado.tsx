import { Link } from 'react-router-dom'

export function NoEncontrado({ que }: { que?: string }) {
  return (
    <section>
      <div className="titulo-seccion">
        <h2>Nada por aquí</h2>
        <span className="regla" />
      </div>
      <div className="vacio">{que ?? 'Esta dirección no lleva a ningún sitio del dojo.'}</div>
      <p style={{ marginTop: 16 }}>
        <Link className="btn fantasma menudo" to="/">
          Volver al inicio
        </Link>
      </p>
    </section>
  )
}
