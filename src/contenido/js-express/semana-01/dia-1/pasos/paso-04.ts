import type { Paso } from '../../../tipos'

const paso: Paso = {
  id: 'paso-04',
  titulo: 'Resumen del día',
  html: `
<div class="tabla">
<table>
<tr><td><b>console.log()</b></td><td>Muestra un valor en pantalla para ver qué hace el código.</td></tr>
<tr><td><b>const</b></td><td>Variable que NO cambia: <code>const pais = 'Colombia'</code>.</td></tr>
<tr><td><b>let</b></td><td>Variable que SÍ cambia: <code>let edad = 25</code>.</td></tr>
<tr><td><b>var</b></td><td>Ya no se usa. Solo <code>const</code> y <code>let</code>.</td></tr>
<tr><td><b>camelCase</b></td><td>Forma de nombrar: <code>nombreCompleto</code>, <code>precioFinal</code>.</td></tr>
<tr><td><b>number</b></td><td>Tipo numérico: <code>25</code>, <code>3.14</code>.</td></tr>
<tr><td><b>string</b></td><td>Tipo texto: <code>'Carlos'</code>.</td></tr>
<tr><td><b>boolean</b></td><td>Verdadero o falso: <code>true</code>, <code>false</code>.</td></tr>
<tr><td><b>typeof</b></td><td>Dice el tipo: <code>typeof 25</code> → <code>'number'</code>.</td></tr>
<tr><td><b>=== / !==</b></td><td>Compara valores. Siempre tres signos, nunca <code>==</code> ni <code>!=</code>.</td></tr>
<tr><td><b>Coerción</b></td><td><code>==</code> convierte tipos a escondidas: <code>'5' == 5</code> da <code>true</code>, <code>null == undefined</code> da <code>true</code>. Por eso se usa <code>===</code>.</td></tr>
<tr><td><b>>= &lt;= > &lt;</b></td><td>Compara números: mayor, menor, mayor o igual, menor o igual.</td></tr>
<tr><td><b>function</b></td><td>Bloque con nombre: recibe parámetros, devuelve con <code>return</code>.</td></tr>
<tr><td><b>return</b></td><td>Entrega el resultado. Sin él la función devuelve <code>undefined</code>.</td></tr>
<tr><td><b>Template literal</b></td><td>Texto con acentos graves y <code>\${}</code>: <code>\`Hola \${nombre}\`</code>.</td></tr>
<tr><td><b>MAYÚSCULAS</b></td><td>Para valores fijos: <code>const EDAD_MINIMA = 18</code>.</td></tr>
</table>
</div>
`,
}
export default paso
