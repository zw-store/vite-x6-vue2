import registerTools from '../tools'
import registerFactory from './registerFactory'
import stencilPanel from './stencilPanel'

export default () => {
  registerTools()
  registerFactory()
  stencilPanel()
}
