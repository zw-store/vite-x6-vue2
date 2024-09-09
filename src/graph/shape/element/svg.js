import { Graph } from '@antv/x6'
import { returnSVGResource } from '../../utils'

export const SVGResource = returnSVGResource(import.meta.glob('@/assets/svg/*.svg'))

const circle = {
  r: 4,
  magnet: true,
  stroke: '#5F95FF',
  strokeWidth: 1,
  fill: '#fff',
  style: {
    visibility: 'hidden',
  },
}
export default () => {
  Graph.registerNode(
    'custom-svg',
    {
      inherit: 'circle',
      name: 'custom-svg',
      nodeType: 'svg-node',
      width: 64,
      height: 48,
      markup: [
        {
          tagName: 'circle',
          selector: 'body',
        },
        {
          selector: 'label',
          tagName: 'use',
        },
      ],
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: '#409EFF',
          fill: '#EFF4FF',
        },
        label: {
          fontSize: 12,
          fill: '#606266',
        },
      },
      ports: {
        groups: {
          top: { position: 'top', attrs: { circle } },
          right: { position: 'right', attrs: { circle: { ...circle, refX: -8 } } },
          bottom: { position: 'bottom', attrs: { circle } },
          left: { position: 'left', attrs: { circle: { ...circle, refX: 8 } } },
        },
        items: [{ group: 'top' }, { group: 'right' }, { group: 'bottom' }, { group: 'left' }],
      },
    },
    true,
  )
}
