import type { Dia } from '../../tipos'
import leccion from './leccion'
import paso01 from './pasos/paso-01'
import paso02 from './pasos/paso-02'
import paso03 from './pasos/paso-03'
import paso04 from './pasos/paso-04'
import kata01 from './katas/kata-01'

const dia: Dia = {
  id: 'X1-d5',
  numero: 5,
  titulo: 'Bucles',
  leccion,
  pasos: [paso01, paso02, paso03, paso04],
  katas: [kata01],
}
export default dia
