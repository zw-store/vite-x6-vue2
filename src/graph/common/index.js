import { freezeGraph, unfreezeGraph } from '../events/keyboard'
import { useGraph } from '../store'
import { isNil } from '../utils'
import { fmtLabelOverflow } from '../utils/legacy'
import { fromJSON, toJSON } from './transform'

/** 初始化画布默认数据 */
export function setDefaultGraphData(nodes, edges) {
  const { graph } = useGraph

  fromJSON(graph.value, nodes, edges)
}

/** 清理画布 */
export function graphClean() {
  const { graph } = useGraph
  const cells = graph.value.getCells()

  if (cells.length) {
    // 删除前移除所有包含工具
    cells.forEach(currentCell => {
      currentCell.removeTools()
    })
    graph.value.removeCells(cells)
  }
}

/** 冻结画布 */
export function disableGraph(bool) {
  const { graph } = useGraph

  if (bool) freezeGraph(graph)
  else unfreezeGraph(graph)
}

/** 修改Node节点 */
export function updateNode(data) {
  const { graph } = useGraph
  const cells = graph.value.getSelectedCells()

  if (Array.isArray(cells) && cells.length === 1) {
    const cell = cells[0]
    const { label, ...otherParams } = data

    if (label) {
      const cutLabel = fmtLabelOverflow(label)

      cell.setData({ tooltip: label, initialization: false })
      cell.setAttrs({ label: { text: cutLabel } })
    }

    for (const key in otherParams) {
      if (Object.hasOwnProperty.call(otherParams, key)) {
        const value = otherParams[key]

        if (!isNil(value)) {
          cell.setData({ [key]: value, initialization: false })
        }
      }
    }

    graph.value.cleanSelection()
  }
}

/** 获取画布数据 */
export function getGraphJSON() {
  const { graph } = useGraph
  return toJSON(graph.value)
}

export function zoomIn() {
  const { graph } = useGraph
  graph.value.zoom(0.1)
}

export function zoomOut() {
  const { graph } = useGraph
  graph.value.zoom(-0.1)
}
