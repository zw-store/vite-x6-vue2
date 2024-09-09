import clipboard from './modules/clipboard'
import history from './modules/history'
import keyboard from './modules/keyboard'
import scroller from './modules/scroller'
import selection from './modules/selection'
import snapline from './modules/snapline'
import transform from './modules/transform'

export { default as miniMapPlugin } from './minimap'
export { default as stencilPlugin } from './stencil'

export function plugins(graph) {
  clipboard(graph)
  history(graph)
  keyboard(graph)
  scroller(graph)
  selection(graph)
  snapline(graph)
  transform(graph)
}
