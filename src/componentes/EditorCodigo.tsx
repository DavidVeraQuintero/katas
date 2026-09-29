import { useEffect, useMemo, useRef, type ChangeEvent, type KeyboardEvent, type UIEvent } from 'react'
import { resaltar } from '../dominio/resaltado'

type Props = {
  valor: string
  alCambiar: (texto: string) => void
}

/** Textarea transparente encima de un <pre> resaltado: sin librerías. */
export function EditorCodigo({ valor, alCambiar }: Props) {
  const areaRef = useRef<HTMLTextAreaElement>(null)
  const preRef = useRef<HTMLPreElement>(null)
  const numsRef = useRef<HTMLDivElement>(null)

  /* El salto final hace que el <pre> crezca con la última línea. */
  const pintado = useMemo(() => resaltar(valor) + '\n', [valor])
  const lineas = useMemo(() => valor.split('\n').length, [valor])

  const ajustarAltura = () => {
    const ta = areaRef.current
    if (!ta) return
    ta.style.height = 'auto'
    ta.style.height = `${ta.scrollHeight}px`
  }

  const sincronizar = () => {
    const ta = areaRef.current
    if (!ta) return
    if (preRef.current) {
      preRef.current.scrollTop = ta.scrollTop
      preRef.current.scrollLeft = ta.scrollLeft
    }
    if (numsRef.current) numsRef.current.scrollTop = ta.scrollTop
  }

  useEffect(() => { ajustarAltura(); sincronizar() }, [valor])

  /* Re-ajustar cuando el layout cambia (sidebar colapsa, ventana cambia) */
  useEffect(() => {
    const ro = new ResizeObserver(() => ajustarAltura())
    const campo = areaRef.current?.parentElement
    if (campo) ro.observe(campo)
    return () => ro.disconnect()
  }, [])

  const alTeclear = (ev: KeyboardEvent<HTMLTextAreaElement>) => {
    const ta = ev.currentTarget
    if (ev.key === 'Tab') {
      ev.preventDefault()
      const i = ta.selectionStart
      const texto = ta.value.slice(0, i) + '  ' + ta.value.slice(ta.selectionEnd)
      alCambiar(texto)
      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = i + 2
      })
    }
  }

  return (
    <div className="editor-js">
      <div className="editor-numeros" ref={numsRef} aria-hidden="true">
        {Array.from({ length: lineas }, (_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div>
      <div className="editor-campo">
        <pre className="editor-resaltado" ref={preRef} aria-hidden="true" dangerouslySetInnerHTML={{ __html: pintado }} />
        <textarea
          className="editor"
          ref={areaRef}
          value={valor}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          aria-label="Tu solución"
          onChange={(ev: ChangeEvent<HTMLTextAreaElement>) => alCambiar(ev.target.value)}
          onScroll={(_: UIEvent<HTMLTextAreaElement>) => sincronizar()}
          onKeyDown={alTeclear}
        />
      </div>
    </div>
  )
}
