import type { Paso } from '../../../tipos'

const paso: Paso = {
  id: 'paso-04',
  titulo: 'Resumen del día',
  html: `
<div class="tabla">
<table>
<tr><td><b>for</b></td><td>Repite N veces: <code>for (let i = 1; i &lt;= 10; i++) { ... }</code>. Tres partes: inicio, condición, incremento.</td></tr>
<tr><td><b>while</b></td><td>Repite mientras la condición sea true: <code>while (saldo > 0) { ... }</code>. Para cuando no sabes cuántas veces.</td></tr>
<tr><td><b>Acumulador</b></td><td>Variable que suma valores: <code>let total = 0; total += valor;</code></td></tr>
<tr><td><b>Contador</b></td><td>Variable que cuenta cuántos: <code>let cuenta = 0; cuenta++;</code></td></tr>
<tr><td><b>Bucle infinito</b></td><td>Si la condición del while nunca es false, el programa se cuelga. Siempre cambia algo dentro.</td></tr>
<tr><td><b>i++</b></td><td>Es lo mismo que <code>i = i + 1</code>. Incrementa en 1.</td></tr>
</table>
</div>
`,
}
export default paso
