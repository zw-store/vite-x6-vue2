import { getTargetByNode } from '../shape/element/html'
import { DOUBLE_NODE_CLICK } from '../types/enum_base_event'
import { OFF_PROPERTY_DRAWER } from '../types/enum_drawer_dispatch'
import { Channel } from '../utils/transmit'

export default graph => {
  graph.on('node:click', ({}) => {
    // Channel.dispatch(NODE_CLICK, detail)
  })

  graph.on('node:dblclick', ({ node }) => {
    const cells = graph.getSelectedCells()

    if (Array.isArray(cells) && cells.length === 1) {
      const detail = getTargetByNode(node)

      Channel.dispatch(DOUBLE_NODE_CLICK, detail)
    }
  })

  graph.on('blank:click', _ => {
    Channel.dispatch(OFF_PROPERTY_DRAWER)
  })
}
