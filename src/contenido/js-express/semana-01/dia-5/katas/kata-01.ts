import type { Kata, Modulo } from '../../../tipos'

type M = Modulo & Record<string, any>
type KataDeM = Omit<Kata, 'pruebas'> & {
  pruebas: { nombre: string; correr: (m: M) => void | Promise<void>; requiere?: string[]; paso?: number }[]
}

const kata: KataDeM = {
  id: 'kata-01',
  titulo: 'Tabla de ahorro',
  dificultad: 'Media',
  minutos: 20,
  enunciado: `<p>Quieres saber cuánto dinero ahorras si guardas una cantidad fija cada mes durante varios meses.</p>

<p>Declara la constante <code>META_AHORRO</code> con el valor <code>1000000</code>.</p>
<p>Escribe la función <code>tablaAhorro(mensual, meses)</code>.</p>

<p><b>Qué recibe</b></p>
<ul>
<li><code>mensual</code> — cuánto ahorras cada mes (número)</li>
<li><code>meses</code> — durante cuántos meses (número)</li>
</ul>

<p><b>Qué devuelve</b></p>
<ul>
<li>Si <code>mensual</code> o <code>meses</code> es null/undefined → <code>'Error: datos incompletos'</code></li>
<li>Si <code>typeof mensual !== 'number'</code> o <code>typeof meses !== 'number'</code> → <code>'Error: los datos deben ser numeros'</code></li>
<li>Si los datos son válidos → usa un <code>for</code> para sumar mes a mes con un acumulador, cuenta los meses con un contador, y devuelve el resumen</li>
</ul>

<div class="tabla">
<table>
<tr><th>Llamada</th><th>Resultado</th></tr>
<tr><td><code>tablaAhorro(100000, 5)</code></td><td><code>'Meses: 5, Total: 500000, Meta: false'</code></td></tr>
<tr><td><code>tablaAhorro(200000, 6)</code></td><td><code>'Meses: 6, Total: 1200000, Meta: true'</code></td></tr>
<tr><td><code>tablaAhorro(500000, 2)</code></td><td><code>'Meses: 2, Total: 1000000, Meta: true'</code></td></tr>
<tr><td><code>tablaAhorro(50000, 3)</code></td><td><code>'Meses: 3, Total: 150000, Meta: false'</code></td></tr>
<tr><td><code>tablaAhorro(null, 5)</code></td><td><code>'Error: datos incompletos'</code></td></tr>
<tr><td><code>tablaAhorro(100000, undefined)</code></td><td><code>'Error: datos incompletos'</code></td></tr>
<tr><td><code>tablaAhorro('100000', 5)</code></td><td><code>'Error: los datos deben ser numeros'</code></td></tr>
</table>
</div>

<details><summary>Pista</summary>
<p>Crea <code>let total = 0</code> y <code>let cuenta = 0</code>. Recorre con <code>for</code> de 1 hasta meses, sumando <code>total += mensual</code> y contando <code>cuenta++</code>. Compara <code>total >= META_AHORRO</code>.</p>
</details>

<details><summary>Paso a paso para resolver</summary>
<ol>
<li>Declara <code>const META_AHORRO = 1000000</code></li>
<li>Si <code>mensual == null || meses == null</code>, devuelve el error</li>
<li>Si <code>typeof mensual !== 'number' || typeof meses !== 'number'</code>, devuelve el error</li>
<li>Crea el acumulador: <code>let total = 0</code></li>
<li>Crea el contador: <code>let cuenta = 0</code></li>
<li>Recorre con <code>for (let i = 1; i <= meses; i++)</code></li>
<li>Dentro del for: <code>total += mensual</code> y <code>cuenta++</code></li>
<li>Devuelve el template literal con <code>cuenta</code>, <code>total</code> y <code>total >= META_AHORRO</code></li>
</ol>
</details>`,
  plantilla: `const META_AHORRO = 0;

function tablaAhorro(mensual, meses) {

}`,
  exporta: ['META_AHORRO', 'tablaAhorro'],
  pruebas: [
    /* ── constante ── */
    {
      nombre: 'META_AHORRO vale 1000000',
      paso: 3,
      correr: (m) => {
        igual(m.META_AHORRO, 1000000, 'META_AHORRO debe valer 1000000');
      },
    },
    {
      nombre: 'META_AHORRO debe ser const (no let)',
      paso: 1,
      correr: (m) => {
        exigeConst(m, 'META_AHORRO');
      },
    },
    /* ── validacion null ── */
    {
      nombre: 'tablaAhorro(null, 5) debe devolver "Error: datos incompletos"',
      paso: 1,
      correr: (m) => {
        igual(m.tablaAhorro(null, 5), 'Error: datos incompletos');
      },
    },
    {
      nombre: 'tablaAhorro(100000, undefined) debe devolver "Error: datos incompletos"',
      paso: 1,
      correr: (m) => {
        igual(m.tablaAhorro(100000, undefined), 'Error: datos incompletos');
      },
    },
    /* ── validacion typeof ── */
    {
      nombre: 'tablaAhorro("100000", 5) debe devolver "Error: los datos deben ser numeros"',
      paso: 2,
      correr: (m) => {
        igual(m.tablaAhorro('100000', 5), 'Error: los datos deben ser numeros');
      },
    },
    /* ── resultados ── */
    {
      nombre: 'debe devolver "Meses: 5, Total: 500000, Meta: false"',
      paso: 3,
      correr: (m) => {
        igual(m.tablaAhorro(100000, 5),
          'Meses: 5, Total: 500000, Meta: false');
      },
    },
    {
      nombre: 'debe devolver "Meses: 6, Total: 1200000, Meta: true"',
      paso: 3,
      correr: (m) => {
        igual(m.tablaAhorro(200000, 6),
          'Meses: 6, Total: 1200000, Meta: true');
      },
    },
    {
      nombre: 'debe devolver "Meses: 2, Total: 1000000, Meta: true" (justo 1000000 si cuenta)',
      paso: 2,
      correr: (m) => {
        igual(m.tablaAhorro(500000, 2),
          'Meses: 2, Total: 1000000, Meta: true');
      },
    },
    {
      nombre: 'debe devolver "Meses: 3, Total: 150000, Meta: false"',
      paso: 3,
      correr: (m) => {
        igual(m.tablaAhorro(50000, 3),
          'Meses: 3, Total: 150000, Meta: false');
      },
    },
    /* ── tipo ── */
    {
      nombre: 'devuelve un texto (string)',
      paso: 2,
      correr: (m) => {
        cierto(typeof m.tablaAhorro(100000, 1) === 'string',
          `se esperaba string y llego ${typeof m.tablaAhorro(100000, 1)}`);
      },
    },
    /* ── codigo fuente ── */
    {
      nombre: 'usa un bucle for (no mensual * meses)',
      requiere: ['for'],
      paso: 1,
      correr: (m) => {
        const src = codigoLimpio(m.tablaAhorro);
        cierto(src.includes('for'),
          'usa for para recorrer mes a mes (paso 1)');
        cierto(!src.includes('mensual * meses') && !src.includes('meses * mensual')
          && !src.includes('mensual*meses') && !src.includes('meses*mensual'),
          'no uses mensual * meses directo. Usa un for con += para sumar mes a mes');
      },
    },
    {
      nombre: 'usa += para acumular el total',
      requiere: ['+='],
      paso: 3,
      correr: (m) => {
        cierto(codigoLimpio(m.tablaAhorro).includes('+='),
          'usa += para sumar cada mes al total (paso 3)');
      },
    },
    {
      nombre: 'usa ++ para contar los meses',
      requiere: ['++'],
      paso: 3,
      correr: (m) => {
        cierto(codigoLimpio(m.tablaAhorro).includes('++'),
          'usa ++ para contar los meses (paso 3)');
      },
    },
    {
      nombre: 'usa >= para comparar con META_AHORRO',
      requiere: ['>='],
      paso: 2,
      correr: (m) => {
        cierto(codigoLimpio(m.tablaAhorro).includes('>='),
          'usa >= para saber si alcanzo la meta');
      },
    },
    {
      nombre: 'usa la constante META_AHORRO',
      requiere: ['META_AHORRO'],
      paso: 3,
      correr: (m) => {
        cierto(codigoLimpio(m.tablaAhorro).includes('META_AHORRO'),
          'usa la constante META_AHORRO en vez del 1000000 directo');
      },
    },
    {
      nombre: 'usa typeof para validar los datos',
      requiere: ['typeof'],
      paso: 2,
      correr: (m) => {
        cierto(codigoLimpio(m.tablaAhorro).includes('typeof'),
          'usa typeof para verificar que los datos sean numeros');
      },
    },
    {
      nombre: 'usa template literal (${})',
      requiere: ['${'],
      paso: 3,
      correr: (m) => {
        cierto(codigoLimpio(m.tablaAhorro).includes('${'),
          'usa template literal con acentos graves y ${}');
      },
    },
    /* ── reglas universales ── */
    {
      nombre: 'no uses var',
      paso: 1,
      correr: (m) => {
        const limpio = codigoLimpio(m.tablaAhorro).replace(/variable/gi, '');
        cierto(!/\bvar\b/.test(limpio), 'var ya no se usa. Usa const o let');
      },
    },
    {
      nombre: 'usa const para variables que no cambian (no let)',
      paso: 1,
      correr: (m) => {
        const src = codigoLimpio(m.tablaAhorro);
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
