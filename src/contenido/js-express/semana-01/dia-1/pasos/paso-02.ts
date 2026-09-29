import type { Paso } from '../../../tipos'

const paso: Paso = {
  id: 'paso-02',
  titulo: 'Tipos de datos y comparaciones',
  html: `
<p>Cada dato tiene un <b>tipo</b>. Hay tres tipos básicos:</p>

<div class="tabla">
<table>
<tr><td><b>number</b></td><td>Números</td><td><code>25</code>, <code>3.14</code>, <code>-10</code></td></tr>
<tr><td><b>string</b></td><td>Texto (entre comillas)</td><td><code>'Carlos'</code>, <code>"Hola"</code></td></tr>
<tr><td><b>boolean</b></td><td>Verdadero o falso</td><td><code>true</code>, <code>false</code></td></tr>
</table>
</div>

<p><code>typeof</code> te dice qué tipo es un dato:</p>
<pre><code>typeof 25          // → 'number'
typeof 'Carlos'    // → 'string'
typeof true        // → 'boolean'

const edad = 25;
typeof edad        // → 'number'</code></pre>

<p><b>Convertir entre tipos:</b> a veces un dato llega como texto pero necesitas un número, o al revés. Para eso conviertes explícitamente:</p>
<pre><code>Number('25')       // → 25       (texto a número)
Number('hola')     // → NaN      (no se pudo convertir)
String(25)         // → '25'     (número a texto)
Boolean(1)         // → true     (número a booleano)
Boolean(0)         // → false
Boolean('hola')    // → true     (texto con contenido = true)
Boolean('')        // → false    (texto vacío = false)</code></pre>

<div class="ojo"><b>Regla:</b> si un dato puede llegar como tipo incorrecto, conviértelo con <code>Number()</code>, <code>String()</code> o <code>Boolean()</code> antes de usarlo. No confíes en que JavaScript lo haga solo.</div>

<p>Para <b>comparar</b> dos valores usas <code>===</code> (tres signos iguales):</p>
<pre><code>25 === 25          // → true   (son iguales)
25 === 30          // → false  (no son iguales)
'Carlos' === 'Ana' // → false

25 !== 30          // → true   (sí son diferentes)
25 !== 25          // → false  (no son diferentes)</code></pre>

<div class="ojo"><b>Nunca uses == ni != (dos signos). Esto se llama coerción.</b> Con <code>==</code> JavaScript convierte tipos a escondidas antes de comparar:
<pre><code>'5' == 5           // → true   (== convirtió el texto a número)
'5' === 5          // → false  (=== no convierte, texto ≠ número)

null == undefined  // → true   (== dice que son iguales)
null === undefined // → false  (=== dice que NO son iguales)

0 == ''            // → true   (== dice que 0 y texto vacío son iguales)
0 === ''           // → false  (=== dice que NO)</code></pre>
<p>Lo mismo con <code>!=</code>: usa siempre <code>!==</code> (tres signos).</p>
<p><b>Regla: usa siempre <code>===</code> y <code>!==</code>.</b> Nunca <code>==</code> ni <code>!=</code>.</p>
<p><b>Excepción:</b> <code>== null</code> y <code>!= null</code> SÍ están permitidos. Es la única coerción útil: <code>x == null</code> comprueba si <code>x</code> es <code>null</code> O <code>undefined</code> en una sola línea.</p>
<pre><code>dato == null       // → true si dato es null O undefined
dato != null       // → true si dato tiene valor (ni null ni undefined)</code></pre></div>

<p>También puedes comparar números con <code>&gt;</code>, <code>&gt;=</code>, <code>&lt;</code>, <code>&lt;=</code>:</p>
<pre><code>25 >= 18       // → true   (25 es mayor o igual que 18)
10 < 18        // → true   (10 es menor que 18)
18 >= 18       // → true   (18 es igual, entonces sí es "mayor o igual")</code></pre>
`,
}
export default paso
