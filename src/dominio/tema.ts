export type Tema = 'auto' | 'claro' | 'oscuro'
const CLAVE = 'dojo-tema'

export function leerTema(): Tema {
  try {
    const v = localStorage.getItem(CLAVE)
    return v === 'claro' || v === 'oscuro' ? v : 'auto'
  } catch {
    return 'auto'
  }
}

export function aplicarTema(t: Tema): void {
  const raiz = document.documentElement
  if (t === 'auto') raiz.removeAttribute('data-tema')
  else raiz.setAttribute('data-tema', t)
  try {
    localStorage.setItem(CLAVE, t)
  } catch {
    /* sin localStorage el tema vuelve a 'auto' al recargar */
  }
}

export const siguienteTema = (t: Tema): Tema => (t === 'auto' ? 'claro' : t === 'claro' ? 'oscuro' : 'auto')
export const nombreTema = (t: Tema): string => (t === 'auto' ? 'automático' : t)
