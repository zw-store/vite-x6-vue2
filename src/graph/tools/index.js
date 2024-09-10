import { Graph } from '@antv/x6'
import { PROPERTIES_BUTTON, REMOVE_BUTTON } from '../types/enum_utilily'
import editBtn from './editBtn'
import removeBtn from './removeBtn'

export default () => {
  // 注册删除元素
  const nodeBtnByRemove = removeBtn()
  const nodeBtnByEdit = editBtn()
  Graph.registerNodeTool(REMOVE_BUTTON, nodeBtnByRemove, true)
  Graph.registerNodeTool(PROPERTIES_BUTTON, nodeBtnByEdit, true)

  const edgeBtnByRemove = removeBtn()
  const edgeBtnByEdit = editBtn()
  Graph.registerEdgeTool(REMOVE_BUTTON, edgeBtnByRemove, true)
  Graph.registerEdgeTool(PROPERTIES_BUTTON, edgeBtnByEdit, true)
}
