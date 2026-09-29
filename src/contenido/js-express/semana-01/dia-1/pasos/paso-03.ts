import type { Paso } from '../../../tipos'

const paso: Paso = {
  id: 'paso-03',
  titulo: 'Funciones y template literal',
  html: `
<p>Una función es un <b>bloque de código con nombre</b> que puedes usar cuando quieras:</p>
<pre><code>function doble(numero) {
  return numero * 2;
}

console.log(doble(5));   // → 10
console.log(doble(20));  // → 40</code></pre>

<p><code>numero</code> es el <b>parámetro</b>: el dato que entra. <code>return</code> es lo que <b>devuelve</b>.</p>

<div class="ojo"><b>Sin return, la función devuelve undefined.</b> Si te olvidas del <code>return</code>, la función hace el cálculo pero no entrega nada.</div>

<p>Para armar texto con datos usas <b>template literal</b> en vez de concatenar con <code>+</code>.</p>

<div class="ojo"><b>No es comilla sencilla.</b> El template literal usa un carácter diferente: el <b>acento grave</b>. Se parece a la comilla <code>'</code> pero NO es lo mismo. Para escribirlo presiona <b>Alt + 96</b> (mantén Alt, teclea 9 y 6 en el teclado numérico, suelta Alt).
<pre><code>  '  ← comilla sencilla (texto normal)
  \`  ← acento grave (template literal)</code></pre></div>

<pre><code>const nombre = 'Carlos';
const edad = 25;

// ✗ Con comillas sencillas y + (NO hagas esto):
const texto = 'Me llamo ' + nombre + ' y tengo ' + edad + ' años';

// ✓ Con acentos graves y \${} (HAZ esto):
//   ↓ acento grave                              acento grave ↓
const texto = \`Me llamo \${nombre} y tengo \${edad} años\`;
//                    ↑ \${ abre           ↑ \${ abre
//                      nombre }            edad }</code></pre>

<p>Dentro de <code>\${}</code> metes cualquier variable o cálculo:</p>
<pre><code>function presentar(nombre, edad) {
  return \`Me llamo \${nombre} y tengo \${edad} años\`;
}

console.log(presentar('Ana', 30));
// → Me llamo Ana y tengo 30 años</code></pre>

<p>Cuando un valor es <b>fijo y no debe cambiar</b>, se guarda en una constante con nombre en <b>MAYÚSCULAS</b>:</p>
<pre><code>const EDAD_MINIMA = 18;
const IVA = 0.19;
const PAIS = 'Colombia';</code></pre>
<p>Así cualquiera que lea el código sabe que ese valor no se toca. Si mañana cambia, se modifica en un solo lugar.</p>
`,
}
export default paso
