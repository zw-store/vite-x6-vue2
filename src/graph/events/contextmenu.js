import { COMBO_CONTEXTMENU, EDGE_CONTEXTMENU, GRAPH_CONTEXTMENU, HIDE_CONTEXTMENU, NODE_CONTEXTMENU, SWITCH_CONTEXTMENU_TYPE } from '../types/emun_contentmenu_dispatch'
import { Channel } from '../utils/transmit'

export default graph => {
  graph.on('cell:move', _ => {
    Channel.dispatch(HIDE_CONTEXTMENU)
  })

  graph.on('blank:contextmenu', e => {
    Channel.dispatch(SWITCH_CONTEXTMENU_TYPE, 'graph')
    Channel.dispatch(GRAPH_CONTEXTMENU, e.e)
  })

  graph.on('node:contextmenu', e => {
    const nodeType = e.node.getProp('nodeType') || 'base-node'

    switch (nodeType) {
      case 'combo-node':
        Channel.dispatch(SWITCH_CONTEXTMENU_TYPE, 'combo')
        Channel.dispatch(COMBO_CONTEXTMENU, e.e, e.node)
        break

      default:
        Channel.dispatch(SWITCH_CONTEXTMENU_TYPE, 'node')
        Channel.dispatch(NODE_CONTEXTMENU, e.e, e.node)
        break
    }
  })

  graph.on('edge:contextmenu', e => {
    const nodeType = e.edge.getProp('nodeType')

    switch (nodeType) {
      default:
        Channel.dispatch(SWITCH_CONTEXTMENU_TYPE, 'edge')
        Channel.dispatch(EDGE_CONTEXTMENU, e.e, e.edge)
        break
    }
  })

  graph.on('scale', _ => {
    Channel.dispatch(HIDE_CONTEXTMENU)
  })

  graph.on('blank:mousemove', _ => {
    Channel.dispatch(HIDE_CONTEXTMENU)
  })

  graph.on('translate', _ => {
    Channel.dispatch(HIDE_CONTEXTMENU)
  })

  graph.on('resize', _ => {
    Channel.dispatch(HIDE_CONTEXTMENU)
  })

  graph.on('graph:mousewheel', _ => {
    Channel.dispatch(HIDE_CONTEXTMENU)
  })
}
