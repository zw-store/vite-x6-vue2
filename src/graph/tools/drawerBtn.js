import { NodeTool } from '@antv/x6/es/registry'
import { NODE_CLICK } from '../types/enum_base_event'
import { Channel } from '../utils/transmit'
const Button = NodeTool.presets.button

export default Button.define({
  markup: [
    {
      zIndex: 1000,
      tagName: 'rect',
      selector: 'button',
      attrs: {
        width: 20,
        height: 20,
        rx: 10,
        ry: 10,
        fill: '#67C23A',
        stroke: '#67C23A',
        cursor: 'pointer',
      },
    },
    {
      zIndex: 1000,
      tagName: 'use',
      attrs: {
        width: 12,
        height: 12,
        fill: '#fff',
        textAnchor: 'middle',
        pointerEvents: 'none',
        cursor: 'pointer',
        href: '#icon-edit-large',
        'xlink:href': '#icon-edit-large',
        x: 4,
        y: 4,
      },
    },
  ],
  onClick({ view }) {
    const node = view.cell
    node.removeTools()
    Channel.dispatch(NODE_CLICK, node)
  },
})
