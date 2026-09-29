import type { Kata, Modulo } from '../../../tipos'

type M = Modulo & Record<string, any>
type KataDeM = Omit<Kata, 'pruebas'> & {
  pruebas: { nombre: string; correr: (m: M) => void | Promise<void>; requiere?: string[]; paso?: number }[]
}

const kata: KataDeM = {
  id: 'kata-01',
  titulo: 'Caja registradora',
  dificultad: 'Media',
  minutos: 15,
  enunciado: `<p>Declara la constante <code>IVA</code> con el valor <code>0.19</code> (19%).</p>
<p>Escribe la función <code>cobrar(precio, cantidad, descuento)</code>.</p>

<p><b>Qué recibe</b></p>
<ul>
<li><code>precio</code> — puede llegar como número o como texto. Convertir con <code>Number()</code></li>
<li><code>cantidad</code> — número de unidades</li>
<li><code>descuento</code> — porcentaje de descuento (ej: 10 significa 10%)</li>
</ul>

<p><b>Qué devuelve</b></p>

<div class="tabla">
<table>
<tr><th>Llamada</th><th>Resultado</th></tr>
<tr><td><code>cobrar(10000, 2, 0)</code></td><td><code>'Subtotal: 20000, IVA: 3800, Total: 23800, por persona: 11900'</code></td></tr>
<tr><td><code>cobrar('5000', 3, 10)</code></td><td><code>'Subtotal: 15000, IVA: 2850, Total: 16065, por persona: 5355'</code></td></tr>
<tr><td><code>cobrar(7500, 4, 5)</code></td><td><code>'Subtotal: 30000, IVA: 5700, Total: 33915, por persona: 8479'</code></td></tr>
<tr><td><code>cobrar(null, 2, 0)</code></td><td><code>'Error: el precio esta vacio'</code></td></tr>
</table>
</div>

<details><summary>Pista</summary>
<p>Usa <code>== null</code> para validar, <code>Number()</code> para convertir, los operadores <code>*</code>, <code>+</code>, <code>-</code>, <code>/</code> para las cuentas, <code>Math.ceil()</code> para redondear hacia arriba y un template literal para armar el texto.</p>
</details>

<details><summary>Paso a paso para resolver</summary>
<ol>
<li>Declara <code>const IVA = 0.19</code> fuera de la función</li>
<li>Si <code>precio == null</code>, devuelve el error</li>
<li>Convierte: <code>const precioNum = Number(precio)</code></li>
<li>Calcula subtotal: <code>precioNum * cantidad</code></li>
<li>Calcula iva: <code>subtotal * IVA</code></li>
<li>Calcula total sin descuento: <code>subtotal + iva</code></li>
<li>Calcula monto del descuento: <code>totalSinDescuento * descuento / 100</code></li>
<li>Calcula total final: <code>totalSinDescuento - descuentoMonto</code></li>
<li>Calcula por persona: <code>Math.ceil(total / cantidad)</code></li>
<li>Arma el template literal</li>
</ol>
</details>`,
  plantilla: `const IVA = 0.19;

function cobrar(precio, cantidad, descuento) {

}`,
  exporta: ['IVA', 'cobrar'],
  pruebas: [
    /* ── constante ── */
    {
      nombre: 'IVA vale 0.19',
      requiere: ['IVA'],
      paso: 1,
      correr: (m) => {
        igual(m.IVA, 0.19, 'IVA debe valer 0.19');
        cierto(typeof m.IVA === 'number', 'IVA debe ser un número');
      },
    },
    {
      nombre: 'IVA debe ser const (no let)',
      correr: (m) => {
        exigeConst(m, 'IVA');
      },
    },
    /* ── resultados ── */
    {
      nombre: 'debe retornar "Subtotal: 20000, IVA: 3800, Total: 23800, por persona: 11900"',
      paso: 1,
      correr: (m) => {
        igual(m.cobrar(10000, 2, 0),
          'Subtotal: 20000, IVA: 3800, Total: 23800, por persona: 11900');
      },
    },
    {
      nombre: 'debe retornar "Subtotal: 15000, IVA: 2850, Total: 16065, por persona: 5355"',
      paso: 2,
      correr: (m) => {
        igual(m.cobrar('5000', 3, 10),
          'Subtotal: 15000, IVA: 2850, Total: 16065, por persona: 5355');
      },
    },
    {
      nombre: 'debe retornar "Subtotal: 30000, IVA: 5700, Total: 33915, por persona: 8479"',
      paso: 1,
      correr: (m) => {
        igual(m.cobrar(7500, 4, 5),
          'Subtotal: 30000, IVA: 5700, Total: 33915, por persona: 8479');
      },
    },
    {
      nombre: 'debe retornar "Error: el precio esta vacio"',
      correr: (m) => {
        igual(m.cobrar(null, 2, 0),
          'Error: el precio esta vacio');
      },
    },
    /* ── tipo ── */
    {
      nombre: 'devuelve un texto (string)',
      correr: (m) => {
        cierto(typeof m.cobrar(10000, 2, 0) === 'string',
          `se esperaba string y llegó ${typeof m.cobrar(10000, 2, 0)}`);
      },
    },
    /* ── código fuente ── */
    {
      nombre: 'usa Number() para convertir el precio',
      requiere: ['Number('],
      paso: 2,
      correr: (m) => {
        cierto(codigoLimpio(m.cobrar).includes('Number('),
          'convierte precio con Number() antes de operar');
      },
    },
    {
      nombre: 'usa Math.ceil para redondear hacia arriba',
      requiere: ['Math.ceil'],
      paso: 1,
      correr: (m) => {
        cierto(codigoLimpio(m.cobrar).includes('Math.ceil'),
          'usa Math.ceil() para redondear el monto por persona');
      },
    },
    {
      nombre: 'usa la constante IVA, no el 0.19 a mano',
      requiere: ['IVA'],
      paso: 1,
      correr: (m) => {
        cierto(codigoLimpio(m.cobrar).includes('IVA'),
          'usa la constante IVA en vez del número 0.19 directo');
      },
    },
    {
      nombre: 'usa template literal (${})',
      requiere: ['${'],
      correr: (m) => {
        cierto(codigoLimpio(m.cobrar).includes('${'),
          'usa template literal con acentos graves y ${}');
      },
    },
    /* ── reglas universales ── */
    {
      nombre: 'no uses var',
      correr: (m) => {
        const limpio = codigoLimpio(m.cobrar).replace(/variable/gi, '');
        cierto(!/\bvar\b/.test(limpio), 'var ya no se usa. Usa const o let');
      },
    },
    {
      nombre: 'usa const para variables que no cambian (no let)',
      paso: 1,
      correr: (m) => {
        const src = codigoLimpio(m.cobrar);
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
