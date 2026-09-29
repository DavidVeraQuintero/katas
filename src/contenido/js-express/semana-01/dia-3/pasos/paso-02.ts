import type { Paso } from '../../../tipos'

const paso: Paso = {
  id: 'paso-02',
  titulo: 'else if: más de dos caminos',
  html: `
<p>A veces no basta con dos caminos. Si necesitas <b>tres o más opciones</b>, usas <code>else if</code>:</p>

<pre><code>function clasificarNota(nota) {
  if (nota >= 90) {
    return 'A';
  } else if (nota >= 80) {
    return 'B';
  } else if (nota >= 70) {
    return 'C';
  } else if (nota >= 60) {
    return 'D';
  } else {
    return 'F';
  }
}

console.log(clasificarNota(95));  // → A
console.log(clasificarNota(85));  // → B
console.log(clasificarNota(50));  // → F</code></pre>

<p><code>else if</code> funciona como una cadena: JavaScript revisa cada condición <b>de arriba a abajo</b> y ejecuta el primer bloque que se cumple. Los demás los ignora.</p>

<div class="ojo"><b>No uses ifs sueltos.</b> Si pones cada condición como un <code>if</code> separado (sin <code>else</code>), el programa revisa TODOS:

<pre><code>// ✗ MAL: ifs sueltos
function clasificarMal(nota) {
  if (nota >= 90) { return 'A'; }
  if (nota >= 80) { return 'B'; }  // nota 95 también entra aquí
  if (nota >= 70) { return 'C'; }  // y aquí
  if (nota >= 60) { return 'D'; }  // y aquí
  return 'F';
}

// ✓ BIEN: cadena else if
function clasificarBien(nota) {
  if (nota >= 90) { return 'A'; }
  else if (nota >= 80) { return 'B'; }  // solo si NO entró arriba
  else if (nota >= 70) { return 'C'; }
  else if (nota >= 60) { return 'D'; }
  else { return 'F'; }
}</code></pre>

Con ifs sueltos, una nota de 95 entra en el primer <code>if</code> y devuelve 'A'. ¿Funciona? Sí, porque <code>return</code> sale de la función. Pero si en vez de <code>return</code> usas otra cosa (guardar en variable, imprimir), nota 95 entraría en TODOS los ifs. Con <code>else if</code> solo entra en el primero que cumple.</div>

<div class="ojo"><b>Retorno temprano: if + return no necesita else.</b> Cuando un <code>if</code> tiene <code>return</code>, la función se detiene ahí. Lo que viene después solo se ejecuta si NO entró al <code>if</code>. Esto es útil para <b>validaciones al inicio</b>:
<pre><code>function procesar(dato) {
  // validaciones con retorno temprano (no necesitan else)
  if (dato == null) return 'Error: dato vacío';
  if (typeof dato !== 'number') return 'Error: debe ser número';

  // lógica principal con else if (sí necesita else if)
  if (dato >= 90) return 'excelente';
  else if (dato >= 60) return 'aprobado';
  else return 'reprobado';
}</code></pre>
<p>Las validaciones al inicio usan <code>if + return</code> sin <code>else</code>. La clasificación al final usa <code>else if</code> porque son caminos excluyentes del mismo nivel.</p></div>
`,
}
export default paso
