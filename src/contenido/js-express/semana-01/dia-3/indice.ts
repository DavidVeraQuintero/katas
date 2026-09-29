import type { Dia } from '../../tipos'
import leccion from './leccion'
import paso01 from './pasos/paso-01'
import paso02 from './pasos/paso-02'
import paso03 from './pasos/paso-03'
import paso04 from './pasos/paso-04'
import paso05 from './pasos/paso-05'
import kata01 from './katas/kata-01'

const dia: Dia = {
  id: 'X1-d3',
  numero: 3,
  titulo: 'Tomar decisiones',
  leccion,
  pasos: [paso01, paso02, paso03, paso04, paso05],
  katas: [kata01],
}
export default dia
