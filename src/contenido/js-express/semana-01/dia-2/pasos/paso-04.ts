import type { Paso } from '../../../tipos'

const paso: Paso = {
  id: 'paso-04',
  titulo: 'Resumen del día',
  html: `
<div class="tabla">
<table>
<tr><td><b>+ - * / %</b></td><td>Operadores: suma, resta, multiplicación, división, resto.</td></tr>
<tr><td><b>%</b></td><td>Resto de la división: <code>10 % 3</code> → <code>1</code>.</td></tr>
<tr><td><b>Math.round()</b></td><td>Redondea al más cercano: <code>Math.round(3.7)</code> → <code>4</code>.</td></tr>
<tr><td><b>Math.ceil()</b></td><td>Redondea hacia arriba: <code>Math.ceil(3.1)</code> → <code>4</code>.</td></tr>
<tr><td><b>Math.floor()</b></td><td>Redondea hacia abajo: <code>Math.floor(3.9)</code> → <code>3</code>.</td></tr>
<tr><td><b>Number()</b></td><td>Convierte a número: <code>Number('25')</code> → <code>25</code>.</td></tr>
<tr><td><b>String()</b></td><td>Convierte a texto: <code>String(25)</code> → <code>'25'</code>.</td></tr>
<tr><td><b>NaN</b></td><td>Not a Number: <code>Number('hola')</code> → <code>NaN</code>.</td></tr>
<tr><td><b>Trampa del +</b></td><td><code>'5' + 3</code> da <code>'53'</code> (pega). Convierte siempre con <code>Number()</code>.</td></tr>
<tr><td><b>+= -= *= /=</b></td><td>Atajos para operar: <code>puntos += 10</code> suma 10 a puntos.</td></tr>
<tr><td><b>++ --</b></td><td>Suma o resta 1: <code>contador++</code>.</td></tr>
</table>
</div>
`,
}
export default paso
