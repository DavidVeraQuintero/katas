import type { Paso } from '../../../tipos'

const paso: Paso = {
  id: 'paso-04',
  titulo: 'Validar con typeof antes de operar',
  html: `
<p>Cuando tu función recibe datos de afuera, no sabes si te van a pasar un número, un texto o cualquier cosa. Si alguien llama <code>calcularDoble('hola')</code>, tu código podría romperse o dar resultados raros.</p>

<p>La solución: <b>validar el tipo en la primera línea</b> de la función con <code>typeof</code>:</p>
<pre><code>function calcularDoble(numero) {
  if (typeof numero !== 'number') {
    return 'Error: se esperaba un número';
  }
  return numero * 2;
}

console.log(calcularDoble(5));      // → 10
console.log(calcularDoble('5'));    // → Error: se esperaba un número
console.log(calcularDoble(true));   // → Error: se esperaba un número</code></pre>

<p>El patrón es siempre el mismo:</p>
<pre><code>function miFuncion(dato) {
  // 1. Primero: validar el tipo
  if (typeof dato !== 'number') {
    return 'Error: se esperaba un número';
  }
  // 2. Después: operar con el dato (ya sabes que es un número)
  return dato * 2;
}</code></pre>

<p>Si la función recibe <b>más de un parámetro</b>, valida todos:</p>
<pre><code>function sumar(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    return 'Error: ambos datos deben ser números';
  }
  return a + b;
}

console.log(sumar(3, 5));       // → 8
console.log(sumar('3', 5));     // → Error: ambos datos deben ser números</code></pre>

<div class="ojo"><b>Siempre valida primero, opera después.</b> El <code>typeof</code> va en la primera línea de la función, antes de cualquier cálculo. Así tu función nunca se rompe aunque le pasen datos incorrectos.</div>
`,
}
export default paso
