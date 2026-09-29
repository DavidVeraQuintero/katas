export type Modulo = Record<string, unknown>

export type Paso = {
  id: string            // 'paso-01'
  titulo: string
  html: string          // HTML del paso, ya escrito (usa <p>, <pre><code>, <div class="salida">, <div class="ojo">, <table class="tabla">)
}

export type Prueba = {
  nombre: string
  correr: (m: Modulo) => void | Promise<void>   // lanza Error si falla
  requiere?: string[]   // patrones que el código debe contener (ej: '===', '${', 'Number(')
  paso?: number         // número de paso del día donde se enseñó este tema (para enlace de repaso)
}

export type Kata = {
  id: string            // 'kata-01'
  titulo: string
  dificultad?: 'Fácil' | 'Media' | 'Difícil'
  minutos?: number
  enunciado: string     // HTML
  plantilla: string     // código inicial que ve el estudiante
  exporta: string[]     // nombres que la solución debe definir
  pruebas: Prueba[]
}

export type Dia = {
  id: string            // 'TC-d1'
  numero: number        // 1..5 dentro de la semana
  titulo: string
  leccion: string       // HTML de la lección de entrada del día
  pasos: Paso[]
  katas: Kata[]
}

export type Semana = {
  id: string            // 'TC', '01', 'S0'… id estable, NUNCA cambia
  n: number             // número que se muestra, puede cambiar si se reordena
  titulo: string
  subtitulo?: string
  fase?: string
  dias: Dia[]
}

export type Seccion = {
  id: string            // 'js', 'react', 'csharp', 'linq'
  titulo: string        // 'JavaScript', 'React', 'C#', 'LINQ'
  icono?: string        // opcional para el sidebar
  semanas: Semana[]
}
