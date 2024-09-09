import { NodeTool } from '@antv/x6/es/registry'

const Button = NodeTool.presets.button

export default Button.define({
  markup: [
    {
      tagName: 'rect',
      selector: 'button',
      attrs: {
        width: 20,
        height: 20,
        rx: 10,
        ry: 10,
        fill: '#ff4d4f',
        stroke: '#ff4d4f',
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
        href: '#icon-delete',
        'xlink:href': '#icon-delete',
        x: 4,
        y: 4,
      },
    },
    // {
    //   tagName: 'text',
    //   selector: 'text',
    //   textContent: '-',
    //   attrs: {
    //     fill: '#fff',
    //     fontSize: 40,
    //     textAnchor: 'middle',
    //     pointerEvents: 'none',
    //     x: 10,
    //     y: 21,
    //   },
    //   style: {
    //     userSelect: 'none',
    //   },
    // },
  ],
  onClick({ view }) {
    const node = view.cell
    // 删除前移除所有包含工具
    node.removeTools()
    node.remove()
  },
})
