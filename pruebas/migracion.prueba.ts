/* Prueba de la migración de claves de kata (`TC-d1:k1` → `TC-d1:kata-01`).
   Se corre con:  node --experimental-strip-types pruebas/migracion.prueba.ts   */

import assert from 'node:assert/strict'
import test from 'node:test'

/* localStorage de mentiras, porque almacen.ts lo usa al importarse */
const memoria = new Map<string, string>()
;(globalThis as unknown as { localStorage: Storage }).localStorage = {
  getItem: (k: string) => (memoria.has(k) ? memoria.get(k)! : null),
  setItem: (k: string, v: string) => void memoria.set(k, String(v)),
  removeItem: (k: string) => void memoria.delete(k),
  clear: () => memoria.clear(),
  key: (i: number) => [...memoria.keys()][i] ?? null,
  get length() {
    return memoria.size
  },
} as Storage

const {
  migrarClaveKata,
  migrarClavesKata,
  leerEstado,
  leerCodigos,
  leerRespaldo,
  CLAVE_ESTADO,
  CLAVE_CODIGOS,
} = await import('../src/dominio/almacen.ts')

test('una clave vieja se renombra con cero a la izquierda', () => {
  assert.equal(migrarClaveKata('TC-d1:k1'), 'TC-d1:kata-01')
  assert.equal(migrarClaveKata('TC-d1:k5'), 'TC-d1:kata-05')
  assert.equal(migrarClaveKata('TC-d1:k9'), 'TC-d1:kata-09')
})

test('a partir de 10 no se le pone cero', () => {
  assert.equal(migrarClaveKata('TC-d1:k10'), 'TC-d1:kata-10')
  assert.equal(migrarClaveKata('S7-d1:k12'), 'S7-d1:kata-12')
})

test('una clave nueva se queda igual: la migración es idempotente', () => {
  assert.equal(migrarClaveKata('TC-d1:kata-01'), 'TC-d1:kata-01')
  const una = migrarClavesKata({ 'TC-d1:k1': 'a' }).datos
  const dos = migrarClavesKata(una).datos
  const tres = migrarClavesKata(dos).datos
  assert.deepEqual(una, { 'TC-d1:kata-01': 'a' })
  assert.deepEqual(dos, una)
  assert.deepEqual(tres, una)
})

test('lo que no es clave de kata no se toca', () => {
  assert.equal(migrarClaveKata('TC-d1'), 'TC-d1')
  assert.equal(migrarClaveKata('TC-d1:paso-3'), 'TC-d1:paso-3')
  assert.equal(migrarClaveKata('TC-d1:k'), 'TC-d1:k')
  assert.equal(migrarClaveKata('TC-d1:k0'), 'TC-d1:k0')
})

test('no pisa una clave nueva que ya exista: gana la nueva', () => {
  const { datos, cambios } = migrarClavesKata({
    'TC-d1:k1': 'vieja',
    'TC-d1:kata-01': 'nueva',
    'TC-d1:k2': 'suelta',
  })
  assert.equal(datos['TC-d1:kata-01'], 'nueva')
  assert.equal(datos['TC-d1:kata-02'], 'suelta')
  assert.equal(datos['TC-d1:k1'], undefined)
  assert.equal(cambios, 2)
})

test('leerEstado migra lo guardado y deja el localStorage ya migrado', () => {
  localStorage.clear()
  localStorage.setItem(
    CLAVE_ESTADO,
    JSON.stringify({ dias: { 'TC-d1': '2026-09-01' }, katas: { 'TC-d1:k1': '2026-09-01', 'TC-d1:k3': '2026-09-02' } }),
  )
  const e = leerEstado()
  assert.deepEqual(e.katas, { 'TC-d1:kata-01': '2026-09-01', 'TC-d1:kata-03': '2026-09-02' })
  assert.deepEqual(e.dias, { 'TC-d1': '2026-09-01' })
  // ya quedó reescrito, así que una segunda lectura da lo mismo
  assert.deepEqual(JSON.parse(localStorage.getItem(CLAVE_ESTADO)!).katas, e.katas)
  assert.deepEqual(leerEstado().katas, e.katas)
})

test('leerCodigos migra el código guardado de cada kata', () => {
  localStorage.clear()
  localStorage.setItem(CLAVE_CODIGOS, JSON.stringify({ 'TC-d2:k4': 'const x = 1', 'TC-d2:kata-05': 'ya nuevo' }))
  assert.deepEqual(leerCodigos(), { 'TC-d2:kata-05': 'ya nuevo', 'TC-d2:kata-04': 'const x = 1' })
})

test('importar un JSON viejo también migra (los tres formatos)', () => {
  const esperado = { 'TC-d1:kata-01': '2026-09-01' }

  const nuevo = leerRespaldo(
    JSON.stringify({ estado: { dias: {}, katas: { 'TC-d1:k1': '2026-09-01' } }, codigos: { 'TC-d1:k1': 'código' }, pasos: { 'TC-d1': 3 } }),
  )
  assert.deepEqual(nuevo.estado.katas, esperado)
  assert.deepEqual(nuevo.codigos, { 'TC-d1:kata-01': 'código' })
  assert.deepEqual(nuevo.pasos, { 'TC-d1': 3 })

  const volcado = leerRespaldo(
    JSON.stringify({
      'dojo-estado-v2': JSON.stringify({ dias: {}, katas: { 'TC-d1:k1': '2026-09-01' } }),
      'dojo-codigos': JSON.stringify({ 'TC-d1:k1': 'código' }),
    }),
  )
  assert.deepEqual(volcado.estado.katas, esperado)
  assert.deepEqual(volcado.codigos, { 'TC-d1:kata-01': 'código' })

  const suelto = leerRespaldo(JSON.stringify({ dias: {}, katas: { 'TC-d1:k1': '2026-09-01' } }))
  assert.deepEqual(suelto.estado.katas, esperado)
})
