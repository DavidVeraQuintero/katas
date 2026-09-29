import type { Paso } from '../../../tipos'

const paso: Paso = {
  id: 'paso-01',
  titulo: 'Guardar datos: variables',
  html: `
<p><code>console.log()</code> sirve para <b>ver en pantalla</b> lo que hace tu código:</p>
<pre><code>console.log('Hola mundo');     // → Hola mundo
console.log(10 + 5);           // → 15</code></pre>

<p>Para <b>guardar un dato</b> y usarlo después, usas una variable. Hay dos formas:</p>

<p><code>const</code> → el dato <b>NO cambia</b>:</p>
<pre><code>const pais = 'Colombia';
const nombre = 'Carlos';
console.log(nombre);  // → Carlos</code></pre>
<p>Tu país no cambia. Tu nombre no cambia. Eso es <code>const</code>.</p>

<p><code>let</code> → el dato <b>SÍ cambia</b>:</p>
<pre><code>let edad = 25;
edad = edad + 1;      // cumpliste años
console.log(edad);    // → 26</code></pre>

<div class="ojo"><b>var ya no se usa.</b> Antes existía <code>var edad = 25</code> pero tiene problemas: deja redeclarar sin avisar y el valor se escapa de donde lo creaste. Solo usa <code>const</code> y <code>let</code>.</div>

<p>Los nombres se escriben en <b>camelCase</b>: primera palabra en minúscula, las siguientes empiezan con mayúscula:</p>
<pre><code>const nombreCompleto = 'Carlos Pérez';    // ✓ camelCase
const x = 'Carlos';                       // ✗ nadie sabe qué es x</code></pre>
`,
}
export default paso
