import type { Kata, Modulo } from '../../../tipos'

type M = Modulo & Record<string, any>
type KataDeM = Omit<Kata, 'pruebas'> & {
  pruebas: { nombre: string; correr: (m: M) => void | Promise<void>; requiere?: string[]; paso?: number }[]
}

const kata: KataDeM = {
  id: 'kata-01',
  titulo: 'Sistema de notas',
  dificultad: 'Media',
  minutos: 15,
  enunciado: `<p>Declara la constante <code>NOTA_APROBADO</code> con el valor <code>60</code>.</p>
<p>Escribe tres <b>arrow functions</b> que se reutilizan entre sí (como aprendiste en los pasos 1, 2 y 3):</p>
<ol>
<li><code>esAprobado(nota)</code> — devuelve un booleano. Si <code>nota</code> no es un numero, devuelve un texto de error.</li>
<li><code>esExcelente(nota)</code> — devuelve un booleano. <b>Debe reutilizar</b> <code>esAprobado</code>.</li>
<li><code>evaluarEstudiante(nombre, nota)</code> — devuelve un texto. <b>Debe reutilizar</b> <code>esExcelente</code> y <code>esAprobado</code>.</li>
</ol>

<p><b>Qué devuelve cada función</b></p>
<ul>
<li><code>esAprobado(nota)</code>: si <code>typeof nota !== 'number'</code> devuelve <code>'Error: la nota debe ser un numero'</code>. Si no, devuelve <code>nota >= NOTA_APROBADO</code>.</li>
<li><code>esExcelente(nota)</code>: reutiliza <code>esAprobado(nota)</code> internamente. Devuelve <code>esAprobado(nota) && nota >= 90</code>.</li>
<li><code>evaluarEstudiante(nombre, nota)</code>: valida <code>nombre == null</code> y <code>typeof nombre</code>. Convierte <code>nota</code> con <code>Number()</code>. Usa <code>esExcelente</code> y <code>esAprobado</code> para decidir el texto.</li>
</ul>

<div class="tabla">
<table>
<tr><th>Llamada</th><th>Resultado</th></tr>
<tr><td><code>esAprobado(75)</code></td><td><code>true</code></td></tr>
<tr><td><code>esAprobado(50)</code></td><td><code>false</code></td></tr>
<tr><td><code>esAprobado('75')</code></td><td><code>'Error: la nota debe ser un numero'</code></td></tr>
<tr><td><code>esExcelente(95)</code></td><td><code>true</code></td></tr>
<tr><td><code>esExcelente(75)</code></td><td><code>false</code></td></tr>
<tr><td><code>evaluarEstudiante('Ana', 95)</code></td><td><code>'Ana: excelente'</code></td></tr>
<tr><td><code>evaluarEstudiante('Pedro', 75)</code></td><td><code>'Pedro: aprobado'</code></td></tr>
<tr><td><code>evaluarEstudiante('Luis', 40)</code></td><td><code>'Luis: reprobado'</code></td></tr>
<tr><td><code>evaluarEstudiante('Maria', '85')</code></td><td><code>'Error: la nota debe ser un numero'</code></td></tr>
<tr><td><code>evaluarEstudiante('David', 'ABC')</code></td><td><code>'Error: la nota debe ser un numero'</code></td></tr>
<tr><td><code>evaluarEstudiante(null, 75)</code></td><td><code>'Error: datos incompletos'</code></td></tr>
<tr><td><code>evaluarEstudiante(123, 75)</code></td><td><code>'Error: el nombre debe ser texto'</code></td></tr>
</table>
</div>

<details><summary>Pista</summary>
<p><code>esAprobado</code>: valida con <code>typeof</code>, luego <code>return nota >= NOTA_APROBADO</code>.</p>
<p><code>esExcelente</code>: <code>return esAprobado(nota) && nota >= 90</code>.</p>
<p><code>evaluarEstudiante</code>: convierte nota con <code>Number()</code>. Si el resultado es <code>NaN</code> (no se pudo convertir), verifica con <code>isNaN()</code>. Luego usa <code>esExcelente</code> y <code>esAprobado</code>.</p>
</details>

<details><summary>Paso a paso para resolver</summary>
<ol>
<li>Declara <code>const NOTA_APROBADO = 60</code></li>
<li>Escribe <code>esAprobado</code> como arrow function. Dentro, valida con <code>typeof nota !== 'number'</code>. Si pasa, devuelve <code>nota >= NOTA_APROBADO</code></li>
<li>Escribe <code>esExcelente</code> como arrow function. Dentro, llama a <code>esAprobado(nota)</code> y combina con <code>&& nota >= 90</code></li>
<li>Escribe <code>evaluarEstudiante</code> como arrow function. Valida <code>nombre == null</code>, luego <code>typeof nombre !== 'string'</code>. Convierte nota con <code>const notaNum = Number(nota)</code>. Si <code>isNaN(notaNum)</code> devuelve <code>'Error: la nota debe ser un numero'</code>. Luego usa <code>esExcelente</code> y <code>esAprobado</code> para clasificar</li>
</ol>
</details>`,
  plantilla: `const NOTA_APROBADO = 60;

const esAprobado = (nota) => {

};

const esExcelente = (nota) => {

};

const evaluarEstudiante = (nombre, nota) => {

};`,
  exporta: ['NOTA_APROBADO', 'esAprobado', 'esExcelente', 'evaluarEstudiante'],
  pruebas: [
    /* ── constante ── */
    {
      nombre: 'NOTA_APROBADO vale 60',
      requiere: ['NOTA_APROBADO'],
      paso: 1,
      correr: (m) => {
        igual(m.NOTA_APROBADO, 60, 'NOTA_APROBADO debe valer 60');
        cierto(typeof m.NOTA_APROBADO === 'number',
          'NOTA_APROBADO debe ser un numero, no un texto');
      },
    },
    {
      nombre: 'NOTA_APROBADO debe ser const (no let)',
      paso: 1,
      correr: (m) => {
        exigeConst(m, 'NOTA_APROBADO');
      },
    },
    /* ── resultados esAprobado ── */
    {
      nombre: 'esAprobado(75) debe devolver true',
      paso: 2,
      correr: (m) => {
        igual(m.esAprobado(75), true);
      },
    },
    {
      nombre: 'esAprobado(60) debe devolver true',
      paso: 2,
      correr: (m) => {
        igual(m.esAprobado(60), true,
          '60 >= 60 es true. Revisa que uses >= y no >');
      },
    },
    {
      nombre: 'esAprobado(50) debe devolver false',
      paso: 2,
      correr: (m) => {
        igual(m.esAprobado(50), false);
      },
    },
    {
      nombre: 'esAprobado("75") debe devolver "Error: la nota debe ser un numero"',
      paso: 2,
      correr: (m) => {
        igual(m.esAprobado('75'), 'Error: la nota debe ser un numero');
      },
    },
    /* ── resultados esExcelente ── */
    {
      nombre: 'esExcelente(95) debe devolver true',
      paso: 2,
      correr: (m) => {
        igual(m.esExcelente(95), true);
      },
    },
    {
      nombre: 'esExcelente(90) debe devolver true',
      paso: 2,
      correr: (m) => {
        igual(m.esExcelente(90), true);
      },
    },
    {
      nombre: 'esExcelente(75) debe devolver false',
      paso: 2,
      correr: (m) => {
        igual(m.esExcelente(75), false);
      },
    },
    {
      nombre: 'esExcelente(50) debe devolver false',
      paso: 2,
      correr: (m) => {
        igual(m.esExcelente(50), false);
      },
    },
    /* ── resultados evaluarEstudiante ── */
    {
      nombre: 'evaluarEstudiante("Ana", 95) debe devolver "Ana: excelente"',
      paso: 3,
      correr: (m) => {
        igual(m.evaluarEstudiante('Ana', 95), 'Ana: excelente');
      },
    },
    {
      nombre: 'evaluarEstudiante("Pedro", 75) debe devolver "Pedro: aprobado"',
      paso: 3,
      correr: (m) => {
        igual(m.evaluarEstudiante('Pedro', 75), 'Pedro: aprobado');
      },
    },
    {
      nombre: 'evaluarEstudiante("Luis", 40) debe devolver "Luis: reprobado"',
      paso: 3,
      correr: (m) => {
        igual(m.evaluarEstudiante('Luis', 40), 'Luis: reprobado');
      },
    },
    {
      nombre: 'evaluarEstudiante("Maria", "85") debe devolver "Error: la nota debe ser un numero"',
      paso: 3,
      correr: (m) => {
        igual(m.evaluarEstudiante('Maria', '85'), 'Error: la nota debe ser un numero');
      },
    },
    {
      nombre: 'evaluarEstudiante("David", "ABC") debe devolver "Error: la nota debe ser un numero"',
      paso: 3,
      correr: (m) => {
        igual(m.evaluarEstudiante('David', 'ABC'), 'Error: la nota debe ser un numero');
      },
    },
    {
      nombre: 'evaluarEstudiante(null, 75) debe devolver "Error: datos incompletos"',
      paso: 3,
      correr: (m) => {
        igual(m.evaluarEstudiante(null, 75), 'Error: datos incompletos');
      },
    },
    {
      nombre: 'evaluarEstudiante(123, 75) debe devolver "Error: el nombre debe ser texto"',
      paso: 3,
      correr: (m) => {
        igual(m.evaluarEstudiante(123, 75), 'Error: el nombre debe ser texto');
      },
    },
    /* ── tipo ── */
    {
      nombre: 'esAprobado devuelve un booleano cuando la nota es valida',
      paso: 2,
      correr: (m) => {
        const resultado = m.esAprobado(75);
        cierto(typeof resultado === 'boolean',
          `se esperaba boolean y llego ${typeof resultado}`);
      },
    },
    {
      nombre: 'esExcelente devuelve un booleano cuando la nota es valida',
      paso: 2,
      correr: (m) => {
        const resultado = m.esExcelente(95);
        cierto(typeof resultado === 'boolean',
          `se esperaba boolean y llego ${typeof resultado}`);
      },
    },
    {
      nombre: 'evaluarEstudiante devuelve un texto (string)',
      paso: 3,
      correr: (m) => {
        const resultado = m.evaluarEstudiante('Ana', 95);
        cierto(typeof resultado === 'string',
          `se esperaba string y llego ${typeof resultado}`);
      },
    },
    /* ── codigo fuente: arrow functions ── */
    {
      nombre: 'esAprobado usa arrow function (=>)',
      paso: 1,
      correr: (m) => {
        const src = String(m.esAprobado);
        cierto(src.includes('=>'),
          'usa arrow function: const esAprobado = (nota) => { ... }');
      },
    },
    {
      nombre: 'esExcelente usa arrow function (=>)',
      paso: 1,
      correr: (m) => {
        const src = String(m.esExcelente);
        cierto(src.includes('=>'),
          'usa arrow function: const esExcelente = (nota) => { ... }');
      },
    },
    {
      nombre: 'evaluarEstudiante usa arrow function (=>)',
      paso: 1,
      correr: (m) => {
        const src = String(m.evaluarEstudiante);
        cierto(src.includes('=>'),
          'usa arrow function: const evaluarEstudiante = (nombre, nota) => { ... }');
      },
    },
    /* ── codigo fuente: reutilizacion ── */
    {
      nombre: 'esAprobado usa la constante NOTA_APROBADO, no el 60 escrito a mano',
      paso: 1,
      correr: (m) => {
        cierto(codigoLimpio(m.esAprobado).includes('NOTA_APROBADO'),
          'usa la constante NOTA_APROBADO en vez del numero 60 escrito directo');
      },
    },
    {
      nombre: 'esExcelente reutiliza esAprobado (no repite la logica)',
      paso: 3,
      correr: (m) => {
        cierto(codigoLimpio(m.esExcelente).includes('esAprobado'),
          'esExcelente debe llamar a esAprobado en vez de repetir nota >= 60');
      },
    },
    {
      nombre: 'evaluarEstudiante reutiliza esExcelente (no repite la logica)',
      paso: 3,
      correr: (m) => {
        cierto(codigoLimpio(m.evaluarEstudiante).includes('esExcelente'),
          'evaluarEstudiante debe llamar a esExcelente para verificar excelencia');
      },
    },
    {
      nombre: 'evaluarEstudiante reutiliza esAprobado (no repite la logica)',
      paso: 3,
      correr: (m) => {
        cierto(codigoLimpio(m.evaluarEstudiante).includes('esAprobado'),
          'evaluarEstudiante debe llamar a esAprobado para verificar aprobacion');
      },
    },
    /* ── codigo fuente: validaciones ── */
    {
      nombre: 'evaluarEstudiante usa typeof para validar nombre',
      paso: 1,
      correr: (m) => {
        cierto(codigoLimpio(m.evaluarEstudiante).includes('typeof'),
          'valida que nombre sea un string con typeof antes de operar');
      },
    },
    {
      nombre: 'evaluarEstudiante usa template literal (${}), no concatena con +',
      paso: 1,
      correr: (m) => {
        const src = String(m.evaluarEstudiante);
        cierto(src.includes('${'),
          'usa template literal con acentos graves y ${} en vez de concatenar con +');
      },
    },
    /* ── reglas universales ── */
    {
      nombre: 'no uses var',
      paso: 1,
      correr: (m) => {
        const src = [String(m.esAprobado), String(m.esExcelente), String(m.evaluarEstudiante)].join(' ');
        const limpio = src.replace(/variable/gi, '').replace(/var\w/g, '');
        cierto(!/\bvar\b/.test(limpio),
          'var ya no se usa. Usa const o let');
      },
    },
    {
      nombre: 'no uses == ni != (usa === y !==)',
      paso: 1,
      correr: (m) => {
        noUsaIgualdadSuelta(m.esAprobado);
        noUsaIgualdadSuelta(m.esExcelente);
        noUsaIgualdadSuelta(m.evaluarEstudiante);
      },
    },

    {
      nombre: 'usa const para variables que no cambian (no let)',
      paso: 1,
      correr: (m) => {
        const src = codigoLimpio(m.evaluarEstudiante);
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
