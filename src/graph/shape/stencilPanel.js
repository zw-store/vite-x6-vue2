import { getNodeConfigByType } from '../common/transform'
import { useGraph, useStencil } from '../store'
import { shape } from './element/common'
import { SVGResource } from './element/svg'

const layoutOptions = {
  columns: 3,
  columnWidth: 'auto',
  dy: 10,
  rowHeight: 'auto',
}
const groupConfigure = [
  {
    title: '自定义图形',
    name: '自定义图形',
    collapsable: true,
    layoutOptions: { ...layoutOptions },
  },
  {
    name: '内置图形',
    title: '内置图形',
    collapsable: true,
    resizeToFit: false,
    layoutOptions: { ...layoutOptions, columns: 4, rowHeight: 70 },
  },
  {
    name: 'SVG类型',
    title: 'SVG类型',
    collapsable: true,
    resizeToFit: true,
    layoutOptions: { ...layoutOptions, columns: 5, rowHeight: 68 },
  },
  {
    name: '文本类型',
    title: '文本类型',
    collapsable: true,
    resizeToFit: false,
    layoutOptions: { ...layoutOptions, columns: 1 },
  },
  {
    name: '容器',
    title: '组/容器',
    collapsable: true,
    resizeToFit: false,
    layoutOptions: { ...layoutOptions, columns: 2 },
  },
  {
    name: '高级图形',
    title: '高级图形',
    collapsable: true,
    layoutOptions: { ...layoutOptions, columns: 1, rowHeight: 105 },
  },
]

export default () => {
  const { graph } = useGraph
  const { stencil } = useStencil

  /**
   * @Stencil 添加组
   */
  groupConfigure.forEach(stencil.value.addGroup.bind(stencil.value))

  /**
   * @Stencil 生成节点
   */
  const proportion = graph.value.createNode({
    shape: 'vue-proportion',
    width: 270,
    height: 100,
  })

  const card = graph.value.createNode({
    shape: 'vue-card',
    width: 270,
    height: 100,
  })

  const r2 = graph.value.createNode({
    shape: 'custom-rect',
    attrs: {
      body: {
        strokeWidth: 1,
        stroke: '#5F95FF',
        fill: '#EFF4FF',
        rx: 6,
        ry: 6,
      },
      label: { text: '必选过程' },
    },
  })
  const r3 = graph.value.createNode({
    shape: 'custom-rect',
    attrs: {
      body: { rx: 6, ry: 6 },
      label: { text: '可选过程' },
    },
  })
  const r4 = graph.value.createNode({
    shape: 'custom-polygon',
    attrs: {
      body: { refPoints: '0,10 10,0 20,10 10,20' },
      label: { text: '决策' },
    },
  })
  const r5 = graph.value.createNode({
    shape: 'custom-polygon',
    attrs: {
      body: { refPoints: '10,0 40,0 30,20 0,20' },
      label: { text: '数据' },
    },
  })
  const r6 = graph.value.createNode({
    shape: 'custom-circle',
    attrs: {
      body: { r: 10 },
      label: { text: '连接' },
    },
  })
  const r7 = graph.value.createNode({
    shape: 'custom-image',
  })

  const circle = shape({
    shape: 'circle',
    label: '圆形',
  })

  const polygon = shape({
    shape: 'polygon',
    label: '多边形',
    points: '0,10 10,0 20,10 10,20',
  })

  const ellipse = shape({
    shape: 'ellipse',
    label: '椭圆',
  })

  const rect = shape({
    shape: 'rect',
    label: '矩形',
  })

  const description = {
    width: 360,
    height: 120,
    shape: 'text-block',
    label: '描述',
    text: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.`,
    attrs: {
      body: {
        fill: '#efdbff',
        stroke: '#9254de',
        rx: 4,
        ry: 4,
      },
    },
  }

  const SVGNode = SVGResource.map(item => {
    const { name } = item
    return graph.value.createNode({
      shape: 'custom-svg',
      markup: [
        {
          tagName: 'circle',
          selector: 'body',
        },
        {
          tagName: 'use',
          selector: 'svg',
        },
        {
          tagName: 'text',
          selector: 'label',
        },
      ],
      attrs: {
        body: {
          stroke: '#409EFF',
          strokeWidth: 1,
        },
        label: {
          text: name,
          fill: '#000',
          textAnchor: 'middle',
          cursor: 'pointer',
          refX: 32,
          refY: 48 + 8,
        },
        svg: {
          width: 32,
          height: 24,
          fill: '#409EFF',
          textAnchor: 'middle',
          cursor: 'pointer',
          href: `#icon-${name}`,
          'xlink:href': `#icon-${name}`,
          refX: 16,
          refY: 12,
        },
      },
    })
  })

  const combo = ['combo-rect', 'combo-circle'].map(item => {
    return graph.value.createNode({
      shape: item,
      label: item,
    })
  })

  /**
   * @Stencil 组加载节点
   */
  stencil.value?.load([r2, r3, r4, r5, r6, r7], '自定义图形')
  stencil.value?.load([circle, polygon, ellipse, rect], '内置图形')
  stencil.value?.load(SVGNode, 'SVG类型')
  stencil.value?.load([description], '文本类型')
  stencil.value?.load(combo, '容器')
  stencil.value?.load([proportion, card], '高级图形')

  /**
   * @Stencil 事件重写
   */
  stencil.value.dnd.options.getDragNode = (node, _options) => {
    return node.clone()
  }

  stencil.value.dnd.options.getDropNode = (node, _options) => {
    const higherNode = getNodeConfigByType(node.shape, node.toJSON())

    if (higherNode) {
      return graph.value.createNode(higherNode)
    }

    return node.clone()
  }
}
