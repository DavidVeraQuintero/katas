import type { Paso } from '../../../tipos'

const paso: Paso = {
  id: 'paso-01',
  titulo: 'Hacer cuentas',
  html: `
<p>JavaScript sabe hacer cuentas. Estos son los operadores:</p>

<div class="tabla">
<table>
<tr><td><b>+</b></td><td>Suma</td><td><code>10 + 3</code> → <code>13</code></td></tr>
<tr><td><b>-</b></td><td>Resta</td><td><code>10 - 3</code> → <code>7</code></td></tr>
<tr><td><b>*</b></td><td>Multiplicación</td><td><code>10 * 3</code> → <code>30</code></td></tr>
<tr><td><b>/</b></td><td>División</td><td><code>10 / 3</code> → <code>3.333...</code></td></tr>
<tr><td><b>%</b></td><td>Resto (lo que sobra al dividir)</td><td><code>10 % 3</code> → <code>1</code></td></tr>
</table>
</div>

<p>Ejemplo: dividir una cuenta de restaurante con propina del 10%:</p>
<pre><code>const PROPINA = 0.1;
const cuenta = 50000;
const personas = 3;

const conPropina = cuenta + cuenta * PROPINA;  // 55000
const cadaUno = conPropina / personas;         // 18333.33...</code></pre>

<p>El resultado tiene decimales. Para redondear usas <code>Math</code>:</p>

<div class="tabla">
<table>
<tr><td><b>Math.round()</b></td><td>Al más cercano</td><td><code>Math.round(18333.33)</code> → <code>18333</code></td></tr>
<tr><td><b>Math.ceil()</b></td><td>Hacia arriba</td><td><code>Math.ceil(18333.33)</code> → <code>18334</code></td></tr>
<tr><td><b>Math.floor()</b></td><td>Hacia abajo</td><td><code>Math.floor(18333.33)</code> → <code>18333</code></td></tr>
</table>
</div>

<p>Con plata conviene <code>Math.ceil</code> para que no falte:</p>
<pre><code>const porPersona = Math.ceil(conPropina / personas);  // 18334
console.log(\`Cada persona paga \${porPersona} pesos\`);
// → Cada persona paga 18334 pesos</code></pre>

<p>El <b>resto</b> (<code>%</code>) te dice lo que sobra al dividir. Sirve para saber si un número es par:</p>
<pre><code>10 % 2   // → 0  (par, no sobra nada)
7 % 2    // → 1  (impar, sobra 1)
10 % 3   // → 1  (sobra 1)</code></pre>
`,
}
export default paso
