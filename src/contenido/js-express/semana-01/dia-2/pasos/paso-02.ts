import type { Paso } from '../../../tipos'

const paso: Paso = {
  id: 'paso-02',
  titulo: 'Convertir tipos',
  html: `
<p>A veces un dato llega como texto pero necesitas que sea número, o al revés. Para eso conviertes <b>explícitamente</b>:</p>

<div class="tabla">
<table>
<tr><td><b>Number()</b></td><td>Convierte a número</td><td><code>Number('25')</code> → <code>25</code></td></tr>
<tr><td><b>String()</b></td><td>Convierte a texto</td><td><code>String(25)</code> → <code>'25'</code></td></tr>
</table>
</div>

<pre><code>Number('25')     // → 25       (número)
Number('hola')   // → NaN      (Not a Number: no se pudo convertir)
String(25)       // → '25'     (texto)</code></pre>

<p><b>Regla:</b> si una función recibe un dato que puede llegar como texto, conviértelo con <code>Number()</code> en la <b>primera línea</b>:</p>
<pre><code>function doble(valor) {
  const numero = Number(valor);  // primera línea: convierte
  return numero * 2;
}

doble(5);     // → 10
doble('5');   // → 10  (llegó como texto, pero lo convertimos)</code></pre>

<div class="ojo"><b>JavaScript convierte a escondidas (coerción implícita). No confíes en eso.</b>
<pre><code>'5' + 3    // → '53'   (pegó texto, NO sumó)
'5' - 3    // → 2      (restó bien... por suerte)
'5' * 3    // → 15     (multiplicó bien... por suerte)
'abc' * 3  // → NaN    (¡reventó sin avisar!)</code></pre>
<p>La resta y multiplicación con texto <b>a veces funcionan</b>, pero es una trampa: dependen de que el texto tenga un número adentro. Si no, dan <code>NaN</code> sin error.</p>
<p><b>Regla: convierte SIEMPRE con <code>Number()</code>.</b> Nunca hagas <code>texto * numero</code> directo. Así atrapas los errores desde el inicio.</p></div>

`,
}
export default paso
