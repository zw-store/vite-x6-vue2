import { Graph } from '@antv/x6'
import { PROPERTIES_BUTTON, REMOVE_BUTTON } from '../types/enum_utilily'
import drawerBtn from './drawerBtn'
import removeBtn from './removeBtn'

export default () => {
  // 注册删除元素
  Graph.registerNodeTool(REMOVE_BUTTON, removeBtn, true)
  Graph.registerNodeTool(PROPERTIES_BUTTON, drawerBtn, true)
  Graph.registerEdgeTool(REMOVE_BUTTON, removeBtn, true)
}
