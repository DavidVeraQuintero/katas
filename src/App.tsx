import { Navigate, Route, Routes } from 'react-router-dom'
import { Disposicion } from './componentes/Disposicion'
import { Inicio } from './paginas/Inicio'
import { SemanaPagina } from './paginas/SemanaPagina'
import { DiaPagina } from './paginas/DiaPagina'
import { PasoPagina } from './paginas/PasoPagina'
import { KataPagina } from './paginas/KataPagina'
import { RepasoPagina } from './paginas/RepasoPagina'
import { NoEncontrado } from './paginas/NoEncontrado'

export function App() {
  return (
    <Routes>
      <Route element={<Disposicion />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/semana/:semanaId" element={<SemanaPagina />} />
        <Route path="/dia/:diaId" element={<DiaPagina />} />
        <Route path="/dia/:diaId/paso/:n" element={<PasoPagina />} />
        <Route path="/dia/:diaId/kata/:n" element={<KataPagina />} />
        <Route path="/repaso" element={<RepasoPagina />} />
        <Route path="/index.html" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NoEncontrado />} />
      </Route>
    </Routes>
  )
}
