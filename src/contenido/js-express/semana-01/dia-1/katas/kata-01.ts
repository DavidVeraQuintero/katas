import type { Kata, Modulo } from '../../../tipos'

type M = Modulo & Record<string, any>
type KataDeM = Omit<Kata, 'pruebas'> & {
  pruebas: { nombre: string; correr: (m: M) => void | Promise<void>; requiere?: string[]; paso?: number }[]
}

const kata: KataDeM = {
  id: 'kata-01',
  titulo: 'Etiqueta de producto',
  dificultad: 'Media',
  minutos: 20,
  enunciado: `<p>En una tienda online cada producto tiene una etiqueta. Pero antes de armarla hay que validar los datos.</p>

<p>Declara la constante <code>ENVIO_GRATIS_DESDE</code> con el valor <code>50000</code>.</p>
<p>Escribe la función <code>etiqueta(producto, precio, disponible)</code>.</p>

<p><b>Qué recibe</b></p>
<ul>
<li><code>producto</code> — nombre del producto (texto)</li>
<li><code>precio</code> — puede ser number, string, null, undefined o cualquier cosa</li>
<li><code>disponible</code> — puede ser boolean, number (1/0), string o cualquier cosa</li>
</ul>

<p><b>Qué devuelve</b></p>

<div class="tabla">
<table>
<tr><th>Llamada</th><th>Resultado</th></tr>
<tr><td><code>etiqueta('Zapatos', null, 1)</code></td><td><code>'Error: el precio esta vacio'</code></td></tr>
<tr><td><code>etiqueta('Zapatos', undefined, 1)</code></td><td><code>'Error: el precio esta vacio'</code></td></tr>
<tr><td><code>etiqueta('Zapatos', true, 1)</code></td><td><code>'Error: el precio debe ser number o string, llego boolean'</code></td></tr>
<tr><td><code>etiqueta('Zapatos', 80000, 1)</code></td><td><code>'Zapatos: 80000 pesos, disponible: true, envío gratis: true'</code></td></tr>
<tr><td><code>etiqueta('Café', '5000', 0)</code></td><td><code>'Café: 5000 pesos, disponible: false, envío gratis: false'</code></td></tr>
<tr><td><code>etiqueta('Libro', '50000', '')</code></td><td><code>'Libro: 50000 pesos, disponible: false, envío gratis: true'</code></td></tr>
<tr><td><code>etiqueta('Promo', 15000, 'si')</code></td><td><code>'Promo: 15000 pesos, disponible: true, envío gratis: false'</code></td></tr>
</table>
</div>

<details><summary>Pista</summary>
<p>Usa <code>if (precio == null)</code> para detectar null y undefined. Usa <code>typeof precio !== 'number'</code> para verificar el tipo. Convierte con <code>Number()</code> y <code>Boolean()</code>.</p>
</details>
<details><summary>Paso a paso para resolver</summary>
<ol>
<li>Declara <code>const ENVIO_GRATIS_DESDE = 50000</code></li>
<li>Si <code>precio == null</code>, devuelve <code>'Error: el precio esta vacio'</code></li>
<li>Si <code>typeof precio !== 'number' &amp;&amp; typeof precio !== 'string'</code>, devuelve <code>'Error: el precio debe ser number o string, llego ' + typeof precio</code> (este con template literal)</li>
<li>Convierte: <code>const precioNum = Number(precio)</code></li>
<li>Convierte: <code>const hayStock = Boolean(disponible)</code></li>
<li>Arma el template literal con <code>precioNum</code>, <code>hayStock</code> y <code>precioNum >= ENVIO_GRATIS_DESDE</code></li>
</ol>
</details>`,
  plantilla: `const ENVIO_GRATIS_DESDE = 0;

function etiqueta(producto, precio, disponible) {

}`,
  exporta: ['ENVIO_GRATIS_DESDE', 'etiqueta'],
  pruebas: [
    /* ── constante ── */
    {
      nombre: 'ENVIO_GRATIS_DESDE vale 50000',
      paso: 3,
      correr: (m) => {
        igual(m.ENVIO_GRATIS_DESDE, 50000, 'ENVIO_GRATIS_DESDE debe valer 50000');
      },
    },
    {
      nombre: 'ENVIO_GRATIS_DESDE debe ser const (no let)',
      paso: 1,
      correr: (m) => {
        exigeConst(m, 'ENVIO_GRATIS_DESDE');
      },
    },
    /* ── validacion null/undefined ── */
    {
      nombre: 'debe retornar "Error: el precio esta vacio"',
      paso: 2,
      correr: (m) => {
        igual(m.etiqueta('Zapatos', null, 1),
          'Error: el precio esta vacio');
      },
    },
    {
      nombre: 'debe retornar "Error: el precio esta vacio" (con undefined)',
      paso: 2,
      correr: (m) => {
        igual(m.etiqueta('Zapatos', undefined, 1),
          'Error: el precio esta vacio');
      },
    },
    /* ── validacion de tipo ── */
    {
      nombre: 'debe retornar "Error: el precio debe ser number o string, llego boolean"',
      paso: 2,
      correr: (m) => {
        igual(m.etiqueta('Zapatos', true, 1),
          'Error: el precio debe ser number o string, llego boolean');
      },
    },
    /* ── resultados exitosos ── */
    {
      nombre: 'debe retornar "Zapatos: 80000 pesos, disponible: true, envío gratis: true"',
      paso: 3,
      correr: (m) => {
        igual(m.etiqueta('Zapatos', 80000, 1),
          'Zapatos: 80000 pesos, disponible: true, envío gratis: true');
      },
    },
    {
      nombre: 'debe retornar "Café: 5000 pesos, disponible: false, envío gratis: false"',
      paso: 3,
      correr: (m) => {
        igual(m.etiqueta('Café', '5000', 0),
          'Café: 5000 pesos, disponible: false, envío gratis: false');
      },
    },
    {
      nombre: 'debe retornar "Libro: 50000 pesos, disponible: false, envío gratis: true"',
      paso: 2,
      correr: (m) => {
        igual(m.etiqueta('Libro', '50000', ''),
          'Libro: 50000 pesos, disponible: false, envío gratis: true');
      },
    },
    {
      nombre: 'debe retornar "Promo: 15000 pesos, disponible: true, envío gratis: false"',
      paso: 2,
      correr: (m) => {
        igual(m.etiqueta('Promo', 15000, 'si'),
          'Promo: 15000 pesos, disponible: true, envío gratis: false');
      },
    },
    /* ── tipo ── */
    {
      nombre: 'devuelve un texto (string)',
      paso: 2,
      correr: (m) => {
        cierto(typeof m.etiqueta('X', 1, 1) === 'string',
          `se esperaba string y llego ${typeof m.etiqueta('X', 1, 1)}`);
      },
    },
    /* ── codigo fuente ── */
    {
      nombre: 'usa == null para detectar precio vacio',
      paso: 2,
      correr: (m) => {
        const src = codigoLimpio(m.etiqueta);
        cierto(src.includes('== null') || src.includes('!= null'),
          'usa == null o != null para detectar null y undefined juntos');
      },
    },
    {
      nombre: 'usa typeof para verificar el tipo del precio',
      requiere: ['typeof'],
      paso: 2,
      correr: (m) => {
        cierto(codigoLimpio(m.etiqueta).includes('typeof'),
          'necesitas typeof para verificar que el precio sea number o string');
      },
    },
    {
      nombre: 'usa !== o === para comparar tipos (== y != solo son validos para null)',
      paso: 2,
      correr: (m) => {
        const src = codigoLimpio(m.etiqueta);
        cierto(src.includes('!==') || src.includes('==='),
          'compara los tipos con === o !== (tres signos). == y != solo son validos para comparar con null');
      },
    },
    {
      nombre: 'usa Number() para convertir el precio',
      requiere: ['Number('],
      paso: 2,
      correr: (m) => {
        cierto(codigoLimpio(m.etiqueta).includes('Number('),
          'convierte precio con Number() despues de validarlo');
      },
    },
    {
      nombre: 'usa Boolean() para convertir la disponibilidad',
      requiere: ['Boolean('],
      paso: 2,
      correr: (m) => {
        cierto(codigoLimpio(m.etiqueta).includes('Boolean('),
          'convierte disponible con Boolean()');
      },
    },
    {
      nombre: 'usa >= para comparar con ENVIO_GRATIS_DESDE',
      requiere: ['>='],
      paso: 2,
      correr: (m) => {
        cierto(codigoLimpio(m.etiqueta).includes('>='),
          'necesitas >= para saber si tiene envío gratis');
      },
    },
    {
      nombre: 'usa la constante ENVIO_GRATIS_DESDE',
      requiere: ['ENVIO_GRATIS_DESDE'],
      paso: 3,
      correr: (m) => {
        cierto(codigoLimpio(m.etiqueta).includes('ENVIO_GRATIS_DESDE'),
          'usa la constante ENVIO_GRATIS_DESDE en vez del 50000 directo');
      },
    },
    {
      nombre: 'usa template literal (${})',
      requiere: ['${'],
      paso: 3,
      correr: (m) => {
        cierto(codigoLimpio(m.etiqueta).includes('${'),
          'usa template literal con acentos graves y ${}');
      },
    },
    /* ── reglas universales ── */
    {
      nombre: 'no uses var',
      paso: 1,
      correr: (m) => {
        const limpio = codigoLimpio(m.etiqueta).replace(/variable/gi, '');
        cierto(!/\bvar\b/.test(limpio), 'var ya no se usa. Usa const o let');
      },
    },

    {
      nombre: 'usa const para variables que no cambian (no let)',
      paso: 1,
      correr: (m) => {
        const src = codigoLimpio(m.etiqueta);
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
