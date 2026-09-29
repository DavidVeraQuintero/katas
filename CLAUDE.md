# Reglas del Dojo DevSkills

## Reglas primarias del contenido (NUNCA se deben romper)

### 1. Nunca asumir conocimiento previo
- Si un concepto no se enseñó en un paso anterior, NO se puede usar en una kata ni en un paso posterior.
- Si es la primera vez que aparece algo (objetos, arrays, métodos), se enseña desde cero en un paso dedicado.

### 2. Las katas acumulan reglas de días anteriores
Las katas de cada día deben validar con pruebas de código fuente TODAS las reglas enseñadas hasta ese punto. Las reglas se acumulan:

**Desde el Día 1:**
- Bloquear `var`. NO se exige `const` / `let`: el estudiante puede resolver una kata sin declarar variables. Nada de `requiere: ['const']` / `['let']` ni pruebas que obliguen a declararlas
- Comparar con `===` / `!==` (tres signos), nunca `==` / `!=`
- Armar texto con template literal `${}`, nunca concatenar con `+`
- Verificar tipo de datos de entrada con `typeof` cuando la función recibe datos que podrían ser de tipo incorrecto
- Usar `if` para validar antes de operar
- Usar constantes en MAYÚSCULAS, no hardcodear valores fijos
- Reutilizar funciones existentes (no reescribir lógica que ya existe)

**Desde el Día 2:**
- Convertir datos con `Number()` o `String()` explícitamente, no depender de coerción implícita
- Usar `Number()` en la primera línea que toca el dato
- Acceder campos de objetos con notación de punto (`objeto.campo`)

**Desde el Día 3 en adelante:**
- Las reglas de los días anteriores siguen vigentes y se siguen validando

### 3. Cada día cierra con "Resumen del día"
- El último paso de cada día SIEMPRE es "Resumen del día"
- El resumen debe incluir TODOS los conceptos enseñados ese día, incluidos los que se agregaron en pasos intermedios
- Cuando se modifica un paso de un día, se debe actualizar su resumen

### 4. El paso enseña, la kata practica
- Los pasos explican conceptos con ejemplos completos
- Las katas referencian los pasos ("como aprendiste en el paso X") pero NO re-enseñan
- La pista de la kata puede mostrar sintaxis pero no debe ser una lección

### 5. Estructura de validación en katas
Cada kata debe tener estas secciones de pruebas:
1. **Pruebas funcionales**: verifican que el resultado es correcto
2. **Pruebas de tipo**: verifican que el tipo devuelto es el esperado (`typeof`)
3. **Pruebas de código fuente**: verifican que se usan las prácticas correctas (template literal, ===, const/let, etc.)
4. **Reglas universales**: `var` bloqueado, `==`/`!=` bloqueado, etc.

### 6. Coherencia entre paso, lección, resumen Y katas
- Si un paso enseña un concepto, ese concepto debe aparecer en:
  - La tabla de "Conceptos clave" de la lección del día
  - El "Resumen del día" del último paso
- Si se modifica un paso, se actualizan lección, resumen Y las katas que dependan de ese contenido
- Si se agrega, quita o cambia un concepto en un paso, las katas deben reflejar ese cambio: ajustar enunciados, pruebas y validaciones de código fuente para que sean coherentes con lo que se enseñó
- Cuando se repara o modifica un tema, las katas del mismo día Y de los días posteriores deben actualizarse para mantener coherencia

## Estructura del proyecto

- Contenido: `src/contenido/semana-XX/dia-X/`
- Pasos: `src/contenido/semana-XX/dia-X/pasos/paso-XX.ts`
- Katas: `src/contenido/semana-XX/dia-X/katas/kata-XX.ts`
- Lección: `src/contenido/semana-XX/dia-X/leccion.ts`
- Índice: `src/contenido/semana-XX/dia-X/indice.ts`
- Tipos: `src/contenido/tipos.ts`
- Test runner: `src/dominio/corredor.ts`
- Helpers de pruebas: `src/dominio/ayudantes.ts`
