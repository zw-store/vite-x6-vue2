import { Graph } from '@antv/x6'
import { PROPERTIES_BUTTON, REMOVE_BUTTON } from '../types/enum_utilily'
import editBtn from './editBtn'
import removeBtn from './removeBtn'

export default () => {
  // 节点
  // button 在指定位置处渲染一个按钮，支持自定义按钮的点击交互。
  // button-remove 在指定的位置处，渲染一个删除按钮，点击时删除对应的节点。
  // boundary 根据节点的包围盒渲染一个包围节点的矩形。注意，该工具仅仅渲染一个矩形，不带任何交互。

  // 边
  // vertices 路径点工具，在路径点位置渲染一个小圆点，拖动小圆点修改路径点位置，双击小圆点删除路径点，在边上单击添加路径点。
  // segments 线段工具。在边的每条线段的中心渲染一个工具条，可以拖动工具条调整线段两端的路径点的位置。
  // boundary 根据边的包围盒渲染一个包围边的矩形。注意，该工具仅仅渲染一个矩形，不带任何交互。
  // button 在指定位置处渲染一个按钮，支持自定义按钮的点击交互。
  // button-remove 在指定的位置处，渲染一个删除按钮，点击时删除对应的边。
  // source-arrowhead-和-target-arrowhead 在边的起点或终点渲染一个图形(默认是箭头)，拖动该图形来修改边的起点或终点。
  const nodeBtnByRemove = removeBtn()
  const nodeBtnByEdit = editBtn()
  Graph.registerNodeTool(REMOVE_BUTTON, nodeBtnByRemove, true)
  Graph.registerNodeTool(PROPERTIES_BUTTON, nodeBtnByEdit, true)

  const edgeBtnByRemove = removeBtn()
  const edgeBtnByEdit = editBtn()
  Graph.registerEdgeTool(REMOVE_BUTTON, edgeBtnByRemove, true)
  Graph.registerEdgeTool(PROPERTIES_BUTTON, edgeBtnByEdit, true)
}
