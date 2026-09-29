import type { Paso } from '../../../tipos'

const paso: Paso = {
  id: 'paso-05',
  titulo: 'Resumen del día',
  html: `
<div class="tabla">
<table>
<tr><td><b>if / else</b></td><td>Dos caminos: si se cumple la condición, haz esto; si no, haz lo otro.</td></tr>
<tr><td><b>else if</b></td><td>Más de dos caminos: revisa cada condición de arriba a abajo y ejecuta el primer bloque que se cumple.</td></tr>
<tr><td><b>Cadena else if</b></td><td>Usa <code>else if</code>, no ifs sueltos. Con ifs sueltos, un dato podría entrar en varios bloques.</td></tr>
<tr><td><b>&& (y)</b></td><td>Ambas condiciones deben ser true: <code>edad >= 18 && tieneDocumento</code>.</td></tr>
<tr><td><b>|| (o)</b></td><td>Al menos una condición debe ser true: <code>esFeriado || esDomingo</code>.</td></tr>
<tr><td><b>! (no)</b></td><td>Invierte el valor: <code>!false</code> da <code>true</code>.</td></tr>
<tr><td><b>typeof para validar</b></td><td>Valida el tipo en la primera línea de la función: <code>if (typeof dato !== 'number')</code>.</td></tr>
<tr><td><b>Validar primero</b></td><td>Primero <code>typeof</code>, después operar. Así la función nunca se rompe con datos incorrectos.</td></tr>
</table>
</div>
`,
}
export default paso
