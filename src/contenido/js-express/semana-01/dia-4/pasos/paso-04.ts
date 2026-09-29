import type { Paso } from '../../../tipos'

const paso: Paso = {
  id: 'paso-04',
  titulo: 'Resumen del día',
  html: `
<div class="tabla">
<table>
<tr><td><b>Arrow function</b></td><td>Forma corta: <code>const doble = (n) => n * 2</code>. Un parámetro puede ir sin paréntesis.</td></tr>
<tr><td><b>Varias líneas</b></td><td>Con <code>{}</code> y <code>return</code>: <code>const f = (n) => { ... return r; }</code>.</td></tr>
<tr><td><b>Funciones boolean</b></td><td>La comparación ya devuelve <code>true</code>/<code>false</code>: <code>const esPar = (n) => n % 2 === 0</code>.</td></tr>
<tr><td><b>Nombres de pregunta</b></td><td>Prefijos <code>es</code>, <code>tiene</code>, <code>puede</code>: <code>esPar</code>, <code>esPositivo</code>.</td></tr>
<tr><td><b>Reutilizar funciones</b></td><td>No repetir lógica: <code>precioFinal</code> llama a <code>calcularIva</code>, no repite la fórmula.</td></tr>
</table>
</div>
`,
}
export default paso
