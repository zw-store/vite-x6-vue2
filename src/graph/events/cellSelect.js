import { CELL_CLICK } from '../types/enum_base_event'
import { SELECTED, UN_SELECTED } from '../types/enum_selected_event'
import { PROPERTIES_BUTTON, REMOVE_BUTTON } from '../types/enum_utilily'
import { ORIGIN_STYLE_IN_SELECT } from '../types/enum_prop_properties'
import { Channel } from '../utils/transmit'
import { selectedStyle } from '../constant'

export default graph => {
  graph.on('cell:selected', ({ cell }) => {
    let removeBtnConf
    let editBtnConf

    if (cell.isEdge()) {
      cell.prop(ORIGIN_STYLE_IN_SELECT, cell.getAttrs().line)
      cell.attr('line', selectedStyle.edgeSelected)
      removeBtnConf = { distance: '30%' }
      editBtnConf = { distance: '30%', offset: { x: -30 } }
    }

    if (cell.isNode()) {
      const cellView = graph.findView(cell)
      cellView.addClass(`${cell.shape}-selected`)
      // https://x6.antv.vision/zh/docs/api/registry/node-tool#button-remove
      removeBtnConf = { x: '100%', y: 0, offset: { x: 10, y: -20 } }
      editBtnConf = { x: '100%', y: 25, offset: { x: 10, y: -20 } }
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
        { name: PROPERTIES_BUTTON, args: editBtnConf },
      ])
    }
  })

  graph.on('cell:unselected', ({ cell }) => {
    if (cell.isEdge()) {
      const originStyleInSelect = cell.getProp(ORIGIN_STYLE_IN_SELECT)
      cell.attr('line', originStyleInSelect, { overwrite: true })
      cell.removeProp(ORIGIN_STYLE_IN_SELECT, { silent: true })
    } else {
      const cellView = graph.findView(cell)
      cellView && cellView.removeClass(`${cell.shape}-selected`)
    }
    cell.removeTools()

    Channel.dispatch(CELL_CLICK, UN_SELECTED)
  })
}
