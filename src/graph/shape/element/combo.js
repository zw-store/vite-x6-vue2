import { Graph } from '@antv/x6'
import { returnsPorts } from './common'

export default () => {
  Graph.registerNode(
    'combo-rect',
    {
      inherit: 'rect',
      nodeType: 'combo-node',
      width: 200,
      height: 100,
      markup: [
        { tagName: 'rect', selector: 'body' },
        { tagName: 'text', selector: 'label' },
      ],
      attrs: {
        body: {
          fill: '#fffbe6',
          stroke: '#ffe7ba',
          strokeWidth: 1,
          rx: 2,
          ry: 2,
        },
        label: {
          fontSize: 12,
          textAnchor: 'middle',
          refX: 100,
          refY: 50,
        },
      },
      ports: { ...returnsPorts() },
      data: {
        parent: true,
      },
    },
    true,
  )

  Graph.registerNode(
    'combo-circle',
    {
      inherit: 'circle',
      nodeType: 'combo-node',
      width: 100,
      height: 100,
      markup: [
        { tagName: 'circle', selector: 'body' },
        { tagName: 'text', selector: 'label' },
      ],
      attrs: {
        body: {
          fill: '#fffbe6',
          stroke: '#ffe7ba',
          strokeWidth: 1,
        },
        label: {
          fontSize: 12,
          textAnchor: 'middle',
          textVerticalAnchor: 'middle',
          refX: 50,
          refY: 50,
        },
      },
      ports: { ...returnsPorts() },
      data: {
        parent: true,
      },
    },
    true,
  )
}
