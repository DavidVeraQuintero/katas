import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { BarraLateral } from './BarraLateral'

export function Disposicion() {
  const [abierta, ponerAbierta] = useState(false)
  const [colapsada, ponerColapsada] = useState(() => localStorage.getItem('sidebar-colapsada') === '1')
  const { pathname } = useLocation()

  /* Cambiar de página siempre sube al principio: si no, al abrir un paso
     quedas a mitad del anterior y parece que no pasó nada. */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])

  function alternarColapso() {
    ponerColapsada((v) => {
      localStorage.setItem('sidebar-colapsada', v ? '0' : '1')
      return !v
    })
  }

  return (
    <>
      <div className={'app' + (colapsada ? ' sidebar-colapsada' : '')}>
        <aside className={'barra-lado' + (abierta ? ' abierta' : '') + (colapsada ? ' colapsada' : '')} aria-label="Navegación del dojo">
          <BarraLateral alNavegar={() => ponerAbierta(false)} />
        </aside>
        <div className="zona">
          <Outlet />
        </div>
      </div>
      <button
        type="button"
        className="bl-colapsar"
        aria-label={colapsada ? 'Mostrar barra lateral' : 'Ocultar barra lateral'}
        onClick={alternarColapso}
      >
        {colapsada ? '»' : '«'}
      </button>
      <button
        type="button"
        className={'bl-velo' + (abierta ? ' visible' : '')}
        aria-label="Cerrar el menú"
        onClick={() => ponerAbierta(false)}
      />
      <button type="button" className="bl-abrir" onClick={() => ponerAbierta((v) => !v)} aria-expanded={abierta}>
        ☰ Dónde estoy
      </button>
    </>
  )
}
