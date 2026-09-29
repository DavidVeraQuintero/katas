import type { Paso } from '../../../tipos'

const paso: Paso = {
  id: 'paso-02',
  titulo: 'while: repetir mientras se cumpla',
  html: `
<p>El <code>while</code> repite un bloque <b>mientras la condición sea true</b>:</p>

<pre><code>let saldo = 1000;
while (saldo > 0) {
  saldo -= 200;
  console.log(\`Saldo: \${saldo}\`);
}
// → Saldo: 800
// → Saldo: 600
// → Saldo: 400
// → Saldo: 200
// → Saldo: 0</code></pre>

<p>¿Cuándo usar <code>for</code> y cuándo <code>while</code>?</p>

<div class="tabla">
<table>
<tr><td><b>for</b></td><td>Sabes cuántas veces: del 1 al 10, recorrer 5 elementos.</td></tr>
<tr><td><b>while</b></td><td>No sabes cuántas veces: hasta que el saldo llegue a 0, hasta que el usuario diga "salir".</td></tr>
</table>
</div>

<div class="ojo"><b>Cuidado con el bucle infinito.</b> Si la condición del <code>while</code> nunca se vuelve <code>false</code>, el programa se cuelga. Siempre asegúrate de que algo dentro del bloque cambie la condición:
<pre><code>// MAL — bucle infinito:
let x = 5;
while (x > 0) {
  console.log(x);  // nunca cambia x → nunca termina
}

// BIEN:
let x = 5;
while (x > 0) {
  console.log(x);
  x--;              // x disminuye → eventualmente llega a 0
}</code></pre></div>
`,
}
export default paso
