/* Resaltado de sintaxis sin librerías,
   con soporte para template literals con interpolación ${} */
function crearPatron() {
  return new RegExp(
    [
      '(\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)',
      '(`(?:\\\\.|[^`\\\\])*`|\'(?:\\\\.|[^\'\\\\\\n])*\'|"(?:\\\\.|[^"\\\\\\n])*")',
      '\\b(0[xX][0-9a-fA-F]+|\\d+\\.?\\d*)\\b',
      '\\b(async|await|function|return|const|let|var|if|else|for|of|in|while|do|switch|case|break|continue|new|class|extends|try|catch|finally|throw|typeof|instanceof|delete|void|yield|import|export|from|default|this|super|static)\\b',
      '\\b(true|false|null|undefined|NaN|Infinity)\\b',
      '\\b(Promise|Array|Object|Math|JSON|Map|Set|Date|Error|String|Number|Boolean|Symbol|console|setTimeout|clearTimeout|setInterval|clearInterval|fetch|window|document)\\b',
      '([A-Za-z_$][\\w$]*)(?=\\s*\\()',
      '(=>|\\.{3}|[{}()\\[\\];,.]|[+\\-*/%<>=!&|?:]+)',
    ].join('|'),
    'g',
  )
}

const CLASES = ['c-com', 'c-str', 'c-num', 'c-key', 'c-lit', 'c-glob', 'c-fn', 'c-op']

export function escapar(t: string): string {
  return t.replace(/[&<>]/g, (c) => (c === '&' ? '&amp;' : c === '<' ? '&lt;' : '&gt;'))
}

/** Resalta un template literal separando texto estático de interpolaciones ${} */
function resaltarTemplate(tl: string): string {
  let resultado = '<span class="c-interp">`</span>'
  let i = 1
  const fin = tl.length - 1
  let textoAcum = ''

  while (i < fin) {
    if (tl[i] === '\\' && i + 1 < fin) {
      textoAcum += tl[i] + tl[i + 1]
      i += 2
    } else if (tl[i] === '$' && i + 1 < fin && tl[i + 1] === '{') {
      if (textoAcum) {
        resultado += '<span class="c-str">' + escapar(textoAcum) + '</span>'
        textoAcum = ''
      }
      i += 2
      let profundidad = 1
      let expr = ''
      while (i < fin && profundidad > 0) {
        if (tl[i] === '{') profundidad++
        else if (tl[i] === '}') {
          profundidad--
          if (profundidad === 0) break
        }
        expr += tl[i]
        i++
      }
      resultado += '<span class="c-interp">${</span>'
      resultado += resaltar(expr)
      resultado += '<span class="c-interp">}</span>'
      i++
    } else {
      textoAcum += tl[i]
      i++
    }
  }

  if (textoAcum) {
    resultado += '<span class="c-str">' + escapar(textoAcum) + '</span>'
  }
  resultado += '<span class="c-interp">`</span>'
  return resultado
}

export function resaltar(codigo: string): string {
  const patron = crearPatron()
  let salida = ''
  let ultimo = 0
  let m: RegExpExecArray | null
  while ((m = patron.exec(codigo)) !== null) {
    if (m[0] === '') {
      patron.lastIndex++
      continue
    }
    salida += escapar(codigo.slice(ultimo, m.index))
    let clase = 'c-op'
    for (let i = 1; i <= 8; i++) {
      if (m[i] !== undefined) {
        clase = CLASES[i - 1]
        break
      }
    }
    if (clase === 'c-str' && m[0][0] === '`') {
      salida += resaltarTemplate(m[0])
    } else {
      salida += '<span class="' + clase + '">' + escapar(m[0]) + '</span>'
    }
    ultimo = m.index + m[0].length
  }
  return salida + escapar(codigo.slice(ultimo))
}
