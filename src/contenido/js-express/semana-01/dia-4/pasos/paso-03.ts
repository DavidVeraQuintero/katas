import type { Paso } from '../../../tipos'

const paso: Paso = {
  id: 'paso-03',
  titulo: 'Reutilizar funciones',
  html: `
<p>Una regla clave: <b>no reescribas lógica que ya existe</b>. Si ya tienes una función que hace algo, úsala.</p>

<p>Ejemplo: calcular el precio con IVA.</p>
<pre><code>const IVA = 0.19;

const calcularIva = (precio) => precio * IVA;

// ✗ Mal: repite la multiplicación
const precioFinal = (precio) => precio + precio * IVA;

// ✓ Bien: reutiliza calcularIva
const precioFinal = (precio) => precio + calcularIva(precio);</code></pre>

<p><code>precioFinal</code> <b>llama</b> a <code>calcularIva</code> en vez de repetir <code>precio * IVA</code>. Si mañana el cálculo del IVA cambia, solo se arregla en un lugar.</p>

<p>Otro ejemplo con booleanos:</p>
<pre><code>const esPar = (n) => n % 2 === 0;

// ✗ Mal: repite la lógica de esPar
const esImpar = (n) => n % 2 !== 0;

// ✓ Bien: reutiliza esPar
const esImpar = (n) => !esPar(n);</code></pre>

<p><code>esImpar</code> es lo contrario de <code>esPar</code>. Si ya sabes si es par, lo niego con <code>!</code> y listo.</p>

<div class="ojo"><b>Regla:</b> si una función ya calcula lo que necesitas, llámala. No copies ni repitas la fórmula.</div>
`,
}
export default paso
