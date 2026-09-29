import type { Paso } from '../../../tipos'

const paso: Paso = {
  id: 'paso-01',
  titulo: 'for: repetir N veces',
  html: `
<p>Hasta ahora, cada instrucción se ejecuta una sola vez. Si quieres mostrar los números del 1 al 10, ¿vas a escribir diez <code>console.log</code>? No. Para eso existe el <b>bucle for</b>:</p>

<pre><code>for (let i = 1; i <= 10; i++) {
  console.log(i);
}
// → 1, 2, 3, 4, 5, 6, 7, 8, 9, 10</code></pre>

<p>El <code>for</code> tiene <b>tres partes</b> separadas por punto y coma:</p>

<div class="tabla">
<table>
<tr><td><b>Inicio</b></td><td><code>let i = 1</code></td><td>Se ejecuta una sola vez antes de empezar. Crea la variable del contador.</td></tr>
<tr><td><b>Condición</b></td><td><code>i &lt;= 10</code></td><td>Se revisa antes de cada vuelta. Si es <code>true</code>, entra al bloque. Si es <code>false</code>, se detiene.</td></tr>
<tr><td><b>Incremento</b></td><td><code>i++</code></td><td>Se ejecuta al final de cada vuelta. <code>i++</code> es lo mismo que <code>i = i + 1</code>.</td></tr>
</table>
</div>

<p><b>Ejemplo: tabla de multiplicar del 5</b></p>
<pre><code>for (let i = 1; i <= 10; i++) {
  console.log(\`5 x \${i} = \${5 * i}\`);
}
// → 5 x 1 = 5
// → 5 x 2 = 10
// → 5 x 3 = 15
// ... hasta 5 x 10 = 50</code></pre>

<p>El <code>for</code> se usa cuando <b>sabes cuántas veces</b> vas a repetir: del 1 al 10, del 0 al 99, etc.</p>
`,
}
export default paso
