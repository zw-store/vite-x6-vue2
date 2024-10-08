import { NodeTool } from '@antv/x6/es/registry'

const Button = NodeTool.presets.button

export default options =>
  Button.define({
    markup: [
      {
        tagName: 'rect',
        selector: 'button',
        attrs: {
          width: options?.width || 20,
          height: options?.width || 20,
          rx: '50%',
          ry: '50%',
          fill: '#ff4d4f',
          stroke: '#ff4d4f',
          cursor: 'pointer',
        },
      },
      {
        zIndex: 1000,
        tagName: 'use',
        attrs: {
          width: options?.iconWidth || 12,
          height: options?.iconHeight || 12,
          fill: '#fff',
          textAnchor: 'middle',
          pointerEvents: 'none',
          cursor: 'pointer',
          href: '#icon-delete',
          'xlink:href': '#icon-delete',
          x: 4,
          y: 4,
        },
      },
    ],
    onClick({ view }) {
      const node = view.cell
      // 删除前移除所有包含工具
      node.removeTools()
      node.remove()
    },
  })
