import cellHover from './cellHover'
import cellRemove from './cellRemove'
import cellSelect from './cellSelect'
import contextmenu from './contextmenu'
import drawer from './drawer'
import KeyTrigger from './keyboard'
import comboEvent from './combo'
// import connectEdge from './connectEdge'

// 统一注册 事件系统
export default function (graph) {
  cellHover(graph)
  cellRemove(graph)
  cellSelect(graph)
  // connectEdge(graph)
  drawer(graph)
  contextmenu(graph)
  KeyTrigger(graph)
  comboEvent(graph)
}
