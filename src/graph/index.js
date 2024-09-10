import { Graph, Shape } from '@antv/x6'
import registerEvent from './events'
import { miniMapPlugin, plugins, stencilPlugin } from './plugin'
import registerNode from './shape'
import { useGraph } from './store'
import { GRAPH_CONTEXTMENU, HIDE_CONTEXTMENU, NODE_CONTEXTMENU } from './types/emun_contentmenu_dispatch'
import { isVueComponent, verifyElementParams } from './utils/legacy'
import { Channel } from './utils/transmit'

export function initGraph(opts) {
  const _option = verifyElementParams(opts)

  const graph = new Graph({
    container: _option.el,
    autoResize: true,
    // https://x6.antv.antgroup.com/api/graph/grid
    grid: {
      size: 10, // 网格大小 10px
      visible: true, // 渲染网格背景
      type: 'doubleMesh',
      args: [
        {
          color: '#DCDFE6', // 主网格线颜色
          thickness: 1, // 主网格线宽度
        },
        {
          color: '#C0C4CC', // 次网格线颜色
          thickness: 1, // 次网格线宽度
          factor: 5, // 主次网格线间隔
        },
      ],
    },
    // https://x6.antv.antgroup.com/api/graph/background
    background: {
      color: '#f0f1f9',
    },
    // https://x6.antv.antgroup.com/api/graph/mousewheel
    // mousewheel: {
    //   enabled: true,
    //   modifiers: ['ctrl', 'meta'],
    // },
    // https://x6.antv.antgroup.com/api/graph/transform
    scaling: {
      min: 0.05, // 默认值为 0.01
      max: 12, // 默认值为 16
    },
    highlighting: {
      // 当链接桩可以被链接时，在链接桩外围渲染一个 2px 宽的红色矩形框
      magnetAvailable: {
        name: 'stroke',
        args: {
          padding: 4,
          attrs: {
            'stroke-width': 4,
            stroke: 'skyblue',
          },
        },
      },
      // 连线过程中，自动吸附到链接桩时被使用
      magnetAdsorbed: {
        name: 'stroke',
        args: {
          padding: 4,
          attrs: {
            'stroke-width': 8,
            stroke: 'skyblue',
          },
        },
      },
      embedding: {
        name: 'stroke',
        args: {
          padding: -1,
          attrs: {
            stroke: '#73d13d',
          },
        },
      },
    },
    // 定制节点和边的交互行为
    // https://x6.antv.vision/zh/docs/tutorial/basic/interacting/#%E5%AE%9A%E5%88%B6%E4%BA%A4%E4%BA%92%E8%A1%8C%E4%B8%BA
    interacting: function (cellView) {
      if (cellView.cell.getData()?.disableMove) {
        return { nodeMovable: false }
      }

      return true
    },
    // 组合 combo 命名沿用 G6
    // https://x6.antv.antgroup.com/tutorial/intermediate/group
    embedding: {
      enabled: true,
      findParent({ node }) {
        const bbox = node.getBBox()

        return this.getNodes().filter(node => {
          const data = node.getData()
          if (data && data.parent) {
            const targetBBox = node.getBBox()
            const pass = bbox.isIntersectWithRect(targetBBox)
            pass && node.toFront()
            return pass
          }
          return false
        })
      },
    },
    preventDefaultContextMenu: true,
    preventDefaultBlankAction: false,
    mousewheel: {
      enabled: true,
      zoomAtMousePosition: true,
      modifiers: 'ctrl',
      minScale: 0.5,
      maxScale: 3,
    },
    connecting: {
      router: 'orth',
      connector: {
        name: 'rounded',
        args: {
          radius: 8,
        },
      },
      anchor: 'center',
      connectionPoint: 'anchor',
      allowBlank: false,
      snap: {
        radius: 20,
      },
      createEdge() {
        return new Shape.Edge({
          attrs: {
            line: {
              stroke: '#A2B1C3',
              strokeWidth: 2,
              targetMarker: {
                name: 'block',
                width: 12,
                height: 8,
              },
            },
          },
          zIndex: 0,
        })
      },
      validateConnection({ targetMagnet }) {
        return !!targetMagnet
      },
    },
  })

  useGraph.setItem(graph)

  _option.stencil instanceof HTMLElement && stencilPlugin(_option.stencil)
  _option.minimap instanceof HTMLElement && miniMapPlugin(_option.minimap)

  if (isVueComponent(_option.contextmenu)) {
    Channel.listener(NODE_CONTEXTMENU, _option.contextmenu.show)
    Channel.listener(GRAPH_CONTEXTMENU, _option.contextmenu.show)
    Channel.listener(HIDE_CONTEXTMENU, _option.contextmenu.hide)
  }

  plugins(graph)
  registerNode(graph)
  registerEvent(graph)

  return graph
}

export { initDefaultData } from './functions'
