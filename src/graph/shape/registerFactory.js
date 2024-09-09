import { Graph } from '@antv/x6'
import RegisterVueComponents from './component'
import { returnsPorts } from './element/common'
import CustomHtmlFragment from './element/html'
import CustomSVGFragment from './element/svg'
import CustomCombeFragment from './element/combo'

export default () => {
  RegisterVueComponents()
  CustomHtmlFragment()
  CustomSVGFragment()
  CustomCombeFragment()

  Graph.registerNode(
    'custom-rect',
    {
      inherit: 'rect',
      nodeType: 'base-node',
      width: 66,
      height: 36,
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: '#5f95ff',
          fill: '#eff4ff',
        },
        label: {
          fontSize: 12,
          fill: '#262626',
          refX: 33,
          refY: 18,
        },
      },
      ports: { ...returnsPorts() },
    },
    true,
  )

  Graph.registerNode(
    'custom-polygon',
    {
      inherit: 'polygon',
      nodeType: 'base-node',
      width: 66,
      height: 36,
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: '#5F95FF',
          fill: '#EFF4FF',
        },
        label: {
          fontSize: 12,
          fill: '#262626',
          refX: 33,
          refY: 18,
        },
      },
      ports: {
        ...returnsPorts(),
        items: [
          {
            group: 'top',
          },
          {
            group: 'bottom',
          },
        ],
      },
    },
    true,
  )

  Graph.registerNode(
    'custom-circle',
    {
      inherit: 'circle',
      nodeType: 'base-node',
      width: 45,
      height: 45,
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: '#5F95FF',
          fill: '#EFF4FF',
        },
        label: {
          fontSize: 12,
          fill: '#262626',
        },
      },
      ports: { ...returnsPorts() },
    },
    true,
  )

  Graph.registerNode(
    'custom-image',
    {
      inherit: 'rect',
      nodeType: 'base-node',
      width: 52,
      height: 52,
      markup: [
        {
          tagName: 'rect',
          selector: 'body',
        },
        {
          tagName: 'image',
        },
        {
          tagName: 'text',
          selector: 'label',
        },
      ],
      attrs: {
        body: {
          stroke: '#5F95FF',
          fill: '#5F95FF',
        },
        image: {
          width: 26,
          height: 26,
          refX: 13,
          refY: 16,
        },
        label: {
          refX: 3,
          refY: 2,
          textAnchor: 'left',
          textVerticalAnchor: 'top',
          fontSize: 12,
          fill: '#fff',
        },
      },
      ports: { ...returnsPorts() },
    },
    true,
  )
}
