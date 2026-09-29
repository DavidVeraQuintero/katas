import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import { ProveedorProgreso } from './estado/ProveedorProgreso'
import { instalarAyudantes } from './dominio/ayudantes'
import { aplicarTema, leerTema } from './dominio/tema'
import './estilos.css'

/* Los ayudantes de las pruebas tienen que existir antes de que corra una kata. */
instalarAyudantes()
aplicarTema(leerTema())

const raiz = document.getElementById('raiz')
if (!raiz) throw new Error('falta el nodo #raiz')

createRoot(raiz).render(
  <StrictMode>
    <BrowserRouter>
      <ProveedorProgreso>
        <App />
      </ProveedorProgreso>
    </BrowserRouter>
  </StrictMode>,
)
