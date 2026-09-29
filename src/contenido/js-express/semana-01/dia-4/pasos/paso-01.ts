import type { Paso } from '../../../tipos'

const paso: Paso = {
  id: 'paso-01',
  titulo: 'Arrow functions',
  html: `
<p>Hasta ahora escribiste funciones así:</p>
<pre><code>function doble(n) {
  return n * 2;
}</code></pre>

<p>Existe una forma más corta llamada <b>arrow function</b> (función flecha). Se escribe con <code>=></code>:</p>
<pre><code>const doble = (n) => n * 2;</code></pre>

<p>Las dos hacen exactamente lo mismo. La arrow function es más corta cuando el cuerpo es <b>una sola expresión</b>: no necesitas llaves ni <code>return</code>.</p>

<p><b>Un solo parámetro:</b> los paréntesis son opcionales:</p>
<pre><code>const doble = n => n * 2;         // sin paréntesis, también vale
const doble = (n) => n * 2;       // con paréntesis, también vale</code></pre>

<p><b>Varios parámetros:</b> los paréntesis son obligatorios:</p>
<pre><code>const sumar = (a, b) => a + b;</code></pre>

<p><b>Varias líneas:</b> necesitan <code>{}</code> y <code>return</code>:</p>
<pre><code>const saludar = (nombre) => {
  const msg = \`Hola \${nombre}\`;
  return msg;
};</code></pre>

<div class="ojo"><b>Cuándo usarla:</b> las arrow functions son ideales para funciones cortas de una línea. Si tu función tiene muchas líneas o es la función principal de un archivo, <code>function</code> también está bien.</div>
`,
}
export default paso
