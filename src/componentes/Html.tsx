/* El contenido llega como HTML ya escrito por el autor del temario (no viene de
   fuera ni del estudiante), así que se inyecta tal cual. */
export function Html({ html, className }: { html: string; className?: string }) {
  return <div className={className ?? 'rico'} dangerouslySetInnerHTML={{ __html: html }} />
}
