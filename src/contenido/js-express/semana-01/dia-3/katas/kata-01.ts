import type { Kata, Modulo } from '../../../tipos'

type M = Modulo & Record<string, any>
type KataDeM = Omit<Kata, 'pruebas'> & {
  pruebas: { nombre: string; correr: (m: M) => void | Promise<void>; requiere?: string[]; paso?: number }[]
}

const kata: KataDeM = {
  id: 'kata-01',
  titulo: 'Clasificar cliente',
  dificultad: 'Media',
  minutos: 15,
  enunciado: `<p>Declara las constantes <code>COMPRA_MINIMA_VIP</code> con el valor <code>100000</code> y <code>COMPRA_MINIMA_REGULAR</code> con el valor <code>10000</code>.</p>
<p>Escribe la función <code>clasificarCliente(nombre, totalCompras, activo)</code>.</p>

<p><b>Qué recibe</b></p>
<ul>
<li><code>nombre</code> — un texto (puede llegar <code>null</code>)</li>
<li><code>totalCompras</code> — un número (puede llegar como string, hay que convertir con <code>Number()</code>; puede llegar <code>null</code>)</li>
<li><code>activo</code> — puede llegar como boolean, 1/0, string (hay que convertir con <code>Boolean()</code>)</li>
</ul>

<p><b>Qué devuelve</b></p>
<ol>
<li>Si <code>nombre == null</code> o <code>totalCompras == null</code> &rarr; <code>'Error: datos incompletos'</code></li>
<li>Si <code>typeof nombre !== 'string'</code> &rarr; <code>'Error: el nombre debe ser texto'</code></li>
<li>Convierte <code>totalCompras</code> con <code>Number()</code> y <code>activo</code> con <code>Boolean()</code></li>
<li>Si <code>!activo</code> &rarr; <code>\`\${nombre}: cliente inactivo\`</code></li>
<li>Si <code>totalCompras >= COMPRA_MINIMA_VIP</code> &rarr; <code>\`\${nombre}: cliente VIP\`</code></li>
<li>Sino si <code>totalCompras >= COMPRA_MINIMA_REGULAR</code> &rarr; <code>\`\${nombre}: cliente regular\`</code></li>
<li>Sino &rarr; <code>\`\${nombre}: cliente nuevo\`</code></li>
</ol>

<div class="tabla">
<table>
<tr><th>Llamada</th><th>Resultado</th></tr>
<tr><td><code>clasificarCliente('Ana', 150000, true)</code></td><td><code>'Ana: cliente VIP'</code></td></tr>
<tr><td><code>clasificarCliente('Pedro', 50000, 1)</code></td><td><code>'Pedro: cliente regular'</code></td></tr>
<tr><td><code>clasificarCliente('Luis', 5000, 'si')</code></td><td><code>'Luis: cliente nuevo'</code></td></tr>
<tr><td><code>clasificarCliente('Mar\u00eda', 200000, 0)</code></td><td><code>'Mar\u00eda: cliente inactivo'</code></td></tr>
<tr><td><code>clasificarCliente('Carlos', '80000', false)</code></td><td><code>'Carlos: cliente inactivo'</code></td></tr>
<tr><td><code>clasificarCliente(null, 50000, true)</code></td><td><code>'Error: datos incompletos'</code></td></tr>
<tr><td><code>clasificarCliente(123, 50000, true)</code></td><td><code>'Error: el nombre debe ser texto'</code></td></tr>
<tr><td><code>clasificarCliente(true, 50000, true)</code></td><td><code>'Error: el nombre debe ser texto'</code></td></tr>
<tr><td><code>clasificarCliente('Ana', null, true)</code></td><td><code>'Error: datos incompletos'</code></td></tr>
<tr><td><code>clasificarCliente('Ana', 100000, true)</code></td><td><code>'Ana: cliente VIP'</code></td></tr>
<tr><td><code>clasificarCliente('Ana', 10000, true)</code></td><td><code>'Ana: cliente regular'</code></td></tr>
</table>
</div>

<details><summary>Pista</summary>
<p>Valida primero los <code>null</code> con <code>||</code>, luego el tipo con <code>typeof</code>. Convierte con <code>Number()</code> y <code>Boolean()</code>. Usa <code>!</code> para verificar si no est\u00e1 activo. Despu\u00e9s usa <code>if / else if / else</code> para las categor\u00edas.</p>
<pre><code>if (nombre == null || totalCompras == null) {
  return 'Error: datos incompletos';
}
if (typeof nombre !== 'string') {
  return 'Error: el nombre debe ser texto';
}
totalCompras = Number(totalCompras);
activo = Boolean(activo);</code></pre>
</details>

<details><summary>Paso a paso para resolver</summary>
<ol>
<li>Declara las constantes <code>COMPRA_MINIMA_VIP = 100000</code> y <code>COMPRA_MINIMA_REGULAR = 10000</code>.</li>
<li>Dentro de la funci\u00f3n, primero verifica si <code>nombre == null || totalCompras == null</code>. Si alguno es null, devuelve <code>'Error: datos incompletos'</code>.</li>
<li>Verifica con <code>typeof</code> que <code>nombre</code> sea un string. Si no lo es, devuelve <code>'Error: el nombre debe ser texto'</code>.</li>
<li>Convierte <code>totalCompras</code> con <code>Number(totalCompras)</code> y <code>activo</code> con <code>Boolean(activo)</code>.</li>
<li>Si <code>!activo</code> (el cliente no est\u00e1 activo), devuelve <code>\`\${nombre}: cliente inactivo\`</code>.</li>
<li>Usa <code>if / else if / else</code> para comparar <code>totalCompras</code> con las constantes: primero <code>COMPRA_MINIMA_VIP</code>, luego <code>COMPRA_MINIMA_REGULAR</code>, y el <code>else</code> final para cliente nuevo.</li>
</ol>
</details>`,
  plantilla: `const COMPRA_MINIMA_VIP = 0;
const COMPRA_MINIMA_REGULAR = 0;

function clasificarCliente(nombre, totalCompras, activo) {

}`,
  exporta: ['COMPRA_MINIMA_VIP', 'COMPRA_MINIMA_REGULAR', 'clasificarCliente'],
  pruebas: [
    /* ── constantes ── */
    {
      nombre: 'COMPRA_MINIMA_VIP vale 100000',
      requiere: ['COMPRA_MINIMA_VIP'],
      paso: 1,
      correr: (m) => {
        igual(m.COMPRA_MINIMA_VIP, 100000, 'COMPRA_MINIMA_VIP debe valer 100000');
        cierto(typeof m.COMPRA_MINIMA_VIP === 'number',
          'COMPRA_MINIMA_VIP debe ser un número, no un texto');
      },
    },
    {
      nombre: 'COMPRA_MINIMA_REGULAR vale 10000',
      requiere: ['COMPRA_MINIMA_REGULAR'],
      paso: 1,
      correr: (m) => {
        igual(m.COMPRA_MINIMA_REGULAR, 10000, 'COMPRA_MINIMA_REGULAR debe valer 10000');
        cierto(typeof m.COMPRA_MINIMA_REGULAR === 'number',
          'COMPRA_MINIMA_REGULAR debe ser un número, no un texto');
      },
    },
    {
      nombre: 'COMPRA_MINIMA_VIP debe ser const (no let)',
      paso: 1,
      correr: (m) => {
        exigeConst(m, 'COMPRA_MINIMA_VIP');
      },
    },
    {
      nombre: 'COMPRA_MINIMA_REGULAR debe ser const (no let)',
      paso: 1,
      correr: (m) => {
        exigeConst(m, 'COMPRA_MINIMA_REGULAR');
      },
    },
    /* ── pruebas funcionales ── */
    {
      nombre: 'debe retornar "Ana: cliente VIP"',
      paso: 2,
      correr: (m) => {
        igual(m.clasificarCliente('Ana', 150000, true), 'Ana: cliente VIP');
      },
    },
    {
      nombre: 'debe retornar "Pedro: cliente regular"',
      paso: 2,
      correr: (m) => {
        igual(m.clasificarCliente('Pedro', 50000, 1), 'Pedro: cliente regular');
      },
    },
    {
      nombre: 'debe retornar "Luis: cliente nuevo"',
      paso: 2,
      correr: (m) => {
        igual(m.clasificarCliente('Luis', 5000, 'si'), 'Luis: cliente nuevo');
      },
    },
    {
      nombre: 'debe retornar "María: cliente inactivo"',
      paso: 3,
      correr: (m) => {
        igual(m.clasificarCliente('María', 200000, 0), 'María: cliente inactivo');
      },
    },
    {
      nombre: 'debe retornar "Carlos: cliente inactivo"',
      paso: 3,
      correr: (m) => {
        igual(m.clasificarCliente('Carlos', '80000', false), 'Carlos: cliente inactivo');
      },
    },
    {
      nombre: 'debe retornar "Ana: cliente VIP" (justo el límite)',
      paso: 2,
      correr: (m) => {
        igual(m.clasificarCliente('Ana', 100000, true), 'Ana: cliente VIP',
          '100000 >= 100000 es true. Revisa que uses >= y no >');
      },
    },
    {
      nombre: 'debe retornar "Ana: cliente regular" (justo el límite)',
      paso: 2,
      correr: (m) => {
        igual(m.clasificarCliente('Ana', 10000, true), 'Ana: cliente regular',
          '10000 >= 10000 es true. Revisa que uses >= y no >');
      },
    },
    /* ── validación de null ── */
    {
      nombre: 'cuando nombre es null, debe retornar "Error: datos incompletos"',
      paso: 1,
      correr: (m) => {
        igual(m.clasificarCliente(null, 50000, true), 'Error: datos incompletos');
      },
    },
    {
      nombre: 'cuando totalCompras es null, debe retornar "Error: datos incompletos"',
      paso: 1,
      correr: (m) => {
        igual(m.clasificarCliente('Ana', null, true), 'Error: datos incompletos');
      },
    },
    /* ── validación de typeof ── */
    {
      nombre: 'cuando nombre es un numero, debe retornar "Error: el nombre debe ser texto"',
      paso: 4,
      correr: (m) => {
        igual(m.clasificarCliente(123, 50000, true), 'Error: el nombre debe ser texto');
      },
    },
    {
      nombre: 'cuando nombre es un boolean, debe retornar "Error: el nombre debe ser texto"',
      paso: 4,
      correr: (m) => {
        igual(m.clasificarCliente(true, 50000, true), 'Error: el nombre debe ser texto');
      },
    },
    /* ── pruebas de tipo ── */
    {
      nombre: 'devuelve un texto (string)',
      paso: 1,
      correr: (m) => {
        const resultado = m.clasificarCliente('Ana', 150000, true);
        cierto(typeof resultado === 'string',
          `se esperaba un string y llegó ${typeof resultado}`);
      },
    },
    /* ── pruebas de código fuente ── */
    {
      nombre: 'usa typeof para validar el nombre',
      paso: 4,
      correr: (m) => {
        cierto(codigoLimpio(m.clasificarCliente).includes('typeof'),
          'usa typeof para validar que nombre sea un string antes de operar');
      },
    },
    {
      nombre: 'usa else if o ternario para clasificar VIP/regular/nuevo',
      paso: 2,
      correr: (m) => {
        const src = codigoLimpio(m.clasificarCliente);
        cierto(src.includes('else if') || src.includes('?'),
          'usa else if o el ternario ? : para clasificar las categorías de cliente');
      },
    },
    {
      nombre: 'usa && o || para combinar condiciones',
      paso: 3,
      correr: (m) => {
        const src = codigoLimpio(m.clasificarCliente);
        cierto(src.includes('||') || src.includes('&&'),
          'usa || para unir las validaciones de null (como aprendiste en el paso 3)');
      },
    },
    {
      nombre: 'usa Number() para convertir totalCompras',
      paso: 4,
      correr: (m) => {
        cierto(codigoLimpio(m.clasificarCliente).includes('Number('),
          'usa Number() para convertir totalCompras a número');
      },
    },
    {
      nombre: 'usa Boolean() para convertir activo',
      paso: 4,
      correr: (m) => {
        cierto(codigoLimpio(m.clasificarCliente).includes('Boolean('),
          'usa Boolean() para convertir activo a booleano');
      },
    },
    {
      nombre: 'usa ! para verificar que el cliente no está activo',
      paso: 3,
      correr: (m) => {
        const src = codigoLimpio(m.clasificarCliente);
        cierto(src.includes('!activo') || src.includes('! activo'),
          'usa !activo para verificar si el cliente no está activo (como aprendiste en el paso 3)');
      },
    },
    {
      nombre: 'la función usa la constante COMPRA_MINIMA_VIP, no el 100000 escrito a mano',
      requiere: ['COMPRA_MINIMA_VIP'],
      paso: 1,
      correr: (m) => {
        cierto(codigoLimpio(m.clasificarCliente).includes('COMPRA_MINIMA_VIP'),
          'usa la constante COMPRA_MINIMA_VIP en vez del número 100000 escrito directo');
      },
    },
    {
      nombre: 'la función usa la constante COMPRA_MINIMA_REGULAR, no el 10000 escrito a mano',
      requiere: ['COMPRA_MINIMA_REGULAR'],
      paso: 1,
      correr: (m) => {
        cierto(codigoLimpio(m.clasificarCliente).includes('COMPRA_MINIMA_REGULAR'),
          'usa la constante COMPRA_MINIMA_REGULAR en vez del número 10000 escrito directo');
      },
    },
    {
      nombre: 'usa template literal con ${} para armar el texto',
      paso: 1,
      correr: (m) => {
        const src = codigoLimpio(m.clasificarCliente);
        cierto(src.includes('${'),
          'usa template literal `${nombre}: cliente ...` para armar el texto, no concatenes con +');
      },
    },
    /* ── reglas universales ── */
    {
      nombre: 'no uses var',
      paso: 1,
      correr: (m) => {
        const src = codigoLimpio(m.clasificarCliente);
        const limpio = src.replace(/variable/gi, '').replace(/var\w/g, '');
        cierto(!/\bvar\b/.test(limpio),
          'var ya no se usa. Usa const o let');
      },
    },
    {
      nombre: 'no uses == ni != (excepto == null)',
      paso: 1,
      correr: (m) => {
        noUsaIgualdadSuelta(m.clasificarCliente);
      },
    },

    {
      nombre: 'usa const para variables que no cambian (no let)',
      paso: 1,
      correr: (m) => {
        const src = codigoLimpio(m.clasificarCliente);
        const lets = src.match(/\blet\s+(\w+)/g) || [];
        for (const decl of lets) {
          const nombre = decl.replace(/^let\s+/, '');
          const resto = src.slice(src.indexOf(decl) + decl.length);
          const reasignada = new RegExp('\\b' + nombre + '\\s*[+\\-*/]?=(?!=)').test(resto)
            || new RegExp('\\b' + nombre + '\\s*(\\+\\+|--)').test(resto);
          cierto(reasignada,
            `"${nombre}" no cambia en todo el código, debería ser const en vez de let`);
        }
      },
    },
  ],
}
export default kata as Kata
