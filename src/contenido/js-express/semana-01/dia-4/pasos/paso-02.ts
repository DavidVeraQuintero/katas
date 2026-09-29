import type { Paso } from '../../../tipos'

const paso: Paso = {
  id: 'paso-02',
  titulo: 'Funciones que devuelven booleanos',
  html: `
<p>Muchas veces necesitas una función que responda <b>sí o no</b>. Esas funciones devuelven <code>true</code> o <code>false</code>:</p>
<pre><code>const esPar = (n) => n % 2 === 0;

esPar(4);   // → true
esPar(3);   // → false</code></pre>

<p>La comparación <code>n % 2 === 0</code> <b>ya devuelve</b> <code>true</code> o <code>false</code>. No necesitas un <code>if</code>:</p>

<pre><code>// ✗ Innecesario: el if no aporta nada
const esPar = (n) => {
  if (n % 2 === 0) {
    return true;
  } else {
    return false;
  }
};

// ✓ Correcto: la comparación ya es el resultado
const esPar = (n) => n % 2 === 0;</code></pre>

<p>Otro ejemplo:</p>
<pre><code>const esPositivo = (n) => n > 0;

esPositivo(5);    // → true
esPositivo(-3);   // → false
esPositivo(0);    // → false</code></pre>

<div class="ojo"><b>Nombra estas funciones como preguntas:</b> usa prefijos como <code>es</code>, <code>tiene</code>, <code>puede</code>. Así se leen como pregunta: <code>esPar(4)</code> → "¿es par 4?" → <code>true</code>.</div>
`,
}
export default paso
