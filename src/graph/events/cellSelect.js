import { CELL_CLICK } from '../types/enum_base_event'
import { SELECTED, UN_SELECTED } from '../types/enum_selected_event'
import { PROPERTIES_BUTTON, REMOVE_BUTTON } from '../types/enum_utilily'
import { Channel } from '../utils/transmit'

export default graph => {
  graph.on('cell:selected', ({ cell }) => {
    let removeBtnConf
    const editorConf = { x: '100%', y: 25, offset: { x: 10, y: -20 } }
    if (cell.isEdge()) {
      cell.attr('line', { stroke: 'skyblue', strokeWidth: 3 })
      removeBtnConf = { distance: '30%' }
    }

    if (cell.isNode()) {
      const cellView = graph.findView(cell)
      cellView.addClass(`${cell.shape}-selected`)
      // https://x6.antv.vision/zh/docs/api/registry/node-tool#button-remove
      removeBtnConf = { x: '100%', y: 0, offset: { x: 10, y: -20 } }
    }

    Channel.dispatch(CELL_CLICK, SELECTED)

    // 多单选选中时，移除删除
    const cells = graph.getSelectedCells()
    if (cells.length > 1) {
      cells.forEach(currentCell => {
        currentCell.removeTools()
      })
    } else {
      cell.addTools([
        { name: REMOVE_BUTTON, args: removeBtnConf }, // x6默认提供 button-remove, icon比较小, 交互体验不友好
        { name: PROPERTIES_BUTTON, args: editorConf },
      ])
    }
  })

  graph.on('cell:unselected', ({ cell }) => {
    if (cell.isEdge()) {
      cell.attr('line', { stroke: '#7c68fc', strokeWidth: 2 })
    } else {
      const cellView = graph.findView(cell)
      cellView && cellView.removeClass(`${cell.shape}-selected`)
    }
    cell.removeTools()

    Channel.dispatch(CELL_CLICK, UN_SELECTED)
  })
}
