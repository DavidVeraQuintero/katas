import type { Paso } from '../../../tipos'

const paso: Paso = {
  id: 'paso-03',
  titulo: 'Atajos para operar',
  html: `
<p>Cuando quieres cambiar una variable con una operación, hay atajos:</p>

<div class="tabla">
<table>
<tr><th>Largo</th><th>Atajo</th><th>Qué hace</th></tr>
<tr><td><code>puntos = puntos + 10</code></td><td><code>puntos += 10</code></td><td>Suma 10</td></tr>
<tr><td><code>puntos = puntos - 5</code></td><td><code>puntos -= 5</code></td><td>Resta 5</td></tr>
<tr><td><code>precio = precio * 2</code></td><td><code>precio *= 2</code></td><td>Multiplica por 2</td></tr>
<tr><td><code>total = total / 4</code></td><td><code>total /= 4</code></td><td>Divide entre 4</td></tr>
</table>
</div>

<p>Para sumar o restar <b>uno</b> hay atajos todavía más cortos:</p>

<div class="tabla">
<table>
<tr><th>Largo</th><th>Atajo</th><th>Qué hace</th></tr>
<tr><td><code>contador = contador + 1</code></td><td><code>contador++</code></td><td>Suma 1</td></tr>
<tr><td><code>contador = contador - 1</code></td><td><code>contador--</code></td><td>Resta 1</td></tr>
</table>
</div>

<pre><code>let contador = 0;
contador++;          // ahora vale 1
contador++;          // ahora vale 2
contador--;          // ahora vale 1

let precio = 1000;
precio *= 2;         // ahora vale 2000
precio += 500;       // ahora vale 2500</code></pre>

<div class="ojo"><b>Solo con let.</b> Estos atajos cambian el valor, así que la variable debe ser <code>let</code>, no <code>const</code>. Si intentas <code>const x = 5; x++</code> da error.</div>
`,
}
export default paso
