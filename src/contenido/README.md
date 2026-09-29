# Contenido del Dojo

Todo lo que el estudiante lee o resuelve vive aquí. La app no sabe nada del temario:
solo consume `ruta.ts` y los tipos de `tipos.ts`.

## Contrato

`tipos.ts` es **intocable**. Los tipos son `Semana`, `Dia`, `Paso`, `Kata`, `Prueba` y `Modulo`.

## Estructura

```
src/contenido/
  tipos.ts                       el contrato (no se edita)
  ruta.ts                        las semanas en orden, con sus días
  semana-01/dia-1/indice.ts      arma el Dia importando lección, pasos y katas
  semana-01/dia-1/leccion.ts     export default: string (HTML)
  semana-01/dia-1/pasos/paso-01.ts … paso-16.ts   export default: Paso
  semana-01/dia-1/katas/kata-01.ts … kata-05.ts   export default: Kata
```

La carpeta `semana-NN` usa el **número que se muestra** (`Semana.n`), pero el `id`
del día (`'TC-d1'`) usa el **id estable de la semana**, que nunca cambia aunque la
ruta se reordene. El progreso guardado se indexa por ese id: si cambia, David pierde
los días verificados.

## Cómo se suma un día

1. Crear `semana-NN/dia-M/` con `leccion.ts`, `pasos/` y `katas/`.
2. Crear `indice.ts` que arme el `Dia` (ver `semana-01/dia-1/indice.ts`).
3. En `ruta.ts`: un `import` arriba y el nombre dentro del arreglo `dias` de su semana.
   **Nada más se toca.**

## Reglas del HTML

Los campos `leccion`, `Paso.html` y `Kata.enunciado` son HTML ya escrito. Las clases
que la app estiliza son:

| Clase | Para qué |
|---|---|
| `<pre><code>` | bloque de código |
| `<div class="salida">` | lo que imprime, con `<b>salida</b>` de etiqueta |
| `<div class="ojo">` | aviso corto, fondo mostaza |
| `<table class="tabla">` | tabla; se ve bien en pasos **y** en enunciados de katas |
| `<div class="par">` + `<div class="par-etq">` | dos bloques de código enfrentados |
| `<ul class="conceptos">` | lista de definiciones, barra jade a la izquierda |
| `<ul class="enlaces">` | enlaces externos, con `<span class="fuente">` |
| `<details><summary>` | pista plegada dentro de una kata |
| `<h4>` | subtítulo dentro de una lección |

## Reglas de las katas

- `exporta` lista los nombres que la solución debe definir. Si el estudiante pasa
  todas las pruebas pero no definió alguno, la app avisa y **no** marca la kata.
- `pruebas[].correr(m)` recibe el módulo construido con esos nombres y **lanza un
  `Error`** si falla. Ayudantes globales disponibles (no hay que importarlos):
  `igual`, `igualProfundo`, `cierto`, `lanza`, `lanzaSync`, `dormir`.
- Cada prueba tiene 6 segundos de límite.
- Un día se marca como hecho **solo** cuando todas las pruebas de todas sus katas
  pasan de verdad. No hay casilla manual.
