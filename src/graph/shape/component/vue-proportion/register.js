import { register } from '@antv/x6-vue-shape'
import { component } from '.'

export default _ => {
  register({
    shape: component.name,
    component,
  })
}
