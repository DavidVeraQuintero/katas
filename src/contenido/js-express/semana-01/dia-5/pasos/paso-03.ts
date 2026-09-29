import type { Paso } from '../../../tipos'

const paso: Paso = {
  id: 'paso-03',
  titulo: 'Acumuladores y contadores',
  html: `
<p>Dentro de un bucle, muchas veces necesitas <b>ir sumando</b> o <b>ir contando</b>. Para eso usas dos patrones:</p>

<p><b>Acumulador</b> — una variable que va sumando valores:</p>
<pre><code>let total = 0;
for (let i = 1; i <= 5; i++) {
  total += i;
}
console.log(total);  // → 15 (1 + 2 + 3 + 4 + 5)</code></pre>

<p>El truco es declarar la variable <b>antes</b> del bucle con valor inicial <code>0</code>, y dentro del bucle ir sumando con <code>+=</code>.</p>

<p><b>Contador</b> — una variable que cuenta cuántos elementos cumplen algo:</p>
<pre><code>let pares = 0;
for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) {
    pares++;
  }
}
console.log(pares);  // → 5 (2, 4, 6, 8, 10)</code></pre>

<p><code>pares++</code> es lo mismo que <code>pares = pares + 1</code>. Cada vez que la condición se cumple, el contador sube.</p>

<div class="tabla">
<table>
<tr><td><b>Acumulador</b></td><td><code>let total = 0; total += valor;</code></td><td>Suma valores: total de ventas, suma de notas.</td></tr>
<tr><td><b>Contador</b></td><td><code>let cuenta = 0; cuenta++;</code></td><td>Cuenta cuántos: pares, aprobados, mayores de edad.</td></tr>
</table>
</div>
`,
}
export default paso
