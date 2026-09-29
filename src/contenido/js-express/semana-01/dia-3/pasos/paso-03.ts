import type { Paso } from '../../../tipos'

const paso: Paso = {
  id: 'paso-03',
  titulo: 'Combinar condiciones',
  html: `
<p>A veces una sola condición no alcanza. Necesitas que se cumplan <b>dos o más cosas</b> al mismo tiempo, o que se cumpla <b>al menos una</b>.</p>

<p><code>&&</code> (y) — <b>ambas</b> deben ser true:</p>
<pre><code>const edad = 20;
const tieneDocumento = true;

if (edad >= 18 && tieneDocumento) {
  console.log('Puede entrar');
}
// → Puede entrar (cumple las dos condiciones)</code></pre>

<p><code>||</code> (o) — <b>al menos una</b> debe ser true:</p>
<pre><code>const esFeriado = false;
const esDomingo = true;

if (esFeriado || esDomingo) {
  console.log('No hay clases');
}
// → No hay clases (una de las dos es true)</code></pre>

<p><code>!</code> (no) — <b>invierte</b> el valor:</p>
<pre><code>const tieneCuenta = false;

if (!tieneCuenta) {
  console.log('Debe registrarse');
}
// → Debe registrarse (!false se convierte en true)</code></pre>

<p>Se pueden combinar en una función:</p>
<pre><code>const EDAD_MINIMA = 18;

function puedeViajar(edad, tieneDocumento) {
  if (edad >= EDAD_MINIMA && tieneDocumento) {
    return 'Puede viajar';
  } else {
    return 'No puede viajar';
  }
}

console.log(puedeViajar(20, true));   // → Puede viajar
console.log(puedeViajar(20, false));  // → No puede viajar
console.log(puedeViajar(15, true));   // → No puede viajar</code></pre>

<div class="tabla">
<table>
<tr><th>Operador</th><th>Significado</th><th>Ejemplo</th><th>Resultado</th></tr>
<tr><td><code>&&</code></td><td>y (ambas true)</td><td><code>true && true</code></td><td><code>true</code></td></tr>
<tr><td><code>&&</code></td><td>y (ambas true)</td><td><code>true && false</code></td><td><code>false</code></td></tr>
<tr><td><code>||</code></td><td>o (al menos una)</td><td><code>false || true</code></td><td><code>true</code></td></tr>
<tr><td><code>||</code></td><td>o (al menos una)</td><td><code>false || false</code></td><td><code>false</code></td></tr>
<tr><td><code>!</code></td><td>no (invierte)</td><td><code>!true</code></td><td><code>false</code></td></tr>
</table>
</div>
`,
}
export default paso
