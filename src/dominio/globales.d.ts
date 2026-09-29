/* Los ayudantes de las pruebas viven en el objeto global: el contenido de las
   katas los llama directamente, sin importarlos. */
declare function dormir(ms: number): Promise<void>
declare function cierto(cond: unknown, mensaje?: string): void
declare function igual(a: unknown, b: unknown, mensaje?: string): void
declare function igualProfundo(a: unknown, b: unknown, mensaje?: string): void
declare function lanza(fn: () => unknown, mensajeEsperado?: string): Promise<void>
declare function lanzaSync(fn: () => unknown, mensajeEsperado?: string): void
