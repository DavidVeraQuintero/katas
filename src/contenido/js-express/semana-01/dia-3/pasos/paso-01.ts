import type { Paso } from '../../../tipos'

const paso: Paso = {
  id: 'paso-01',
  titulo: 'if y else',
  html: `
<p>Hasta ahora tu código hace lo mismo siempre. Pero en la vida real hay que <b>tomar decisiones</b>: si se cumple una condición, haz esto; si no, haz lo otro.</p>

<p>Para eso existe <code>if</code> y <code>else</code>:</p>
<pre><code>const edad = 20;

if (edad >= 18) {
  console.log('Puede entrar');
} else {
  console.log('No puede entrar');
}
// → Puede entrar</code></pre>

<p>Clave: la condición va entre <b>paréntesis</b> <code>()</code> y el código va entre <b>llaves</b> <code>{}</code>.</p>

<p>Dentro de una función funciona igual:</p>
<pre><code>const EDAD_MINIMA = 18;

function puedeEntrar(edad) {
  if (edad >= EDAD_MINIMA) {
    return 'Sí puede entrar';
  } else {
    return 'No puede entrar';
  }
}

console.log(puedeEntrar(20));  // → Sí puede entrar
console.log(puedeEntrar(15));  // → No puede entrar</code></pre>

<div class="ojo"><b>No olvides las llaves {}.</b> Aunque el código sea de una sola línea, siempre ponlas. Sin llaves es fácil meter errores cuando agregas más líneas después.</div>

<p>Si solo necesitas el camino del <code>if</code> y no hay nada que hacer en el <code>else</code>, puedes omitirlo:</p>
<pre><code>function saludar(nombre) {
  if (nombre === 'Admin') {
    return 'Bienvenido, administrador';
  }
  return \`Hola \${nombre}\`;
}</code></pre>
`,
}
export default paso
