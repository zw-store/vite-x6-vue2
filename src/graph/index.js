import { Graph } from '@antv/x6'
import registerEvent from './events'
import { miniMapPlugin, plugins, stencilPlugin } from './plugin'
import guidesPlugin from './plugin/guides'
import registerNode from './shape'
import registerEdge from './edge'
import { useGraph } from './store'
import { isHTMLElement, verifyElementParams } from './utils/legacy'
import { opacity } from '@antv/x6/lib/registry/highlighter/opacity'

export function initGraph(opts) {
  const _option = verifyElementParams(opts)

  const graph = new Graph({
    container: _option.el,
    autoResize: true,
    preventDefaultContextMenu: true,
    preventDefaultBlankAction: false,
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
            fill: '#fff',
            stroke: '#A4DEB1',
            strokeWidth: 4,
          },
        },
      },
      // 连线过程中，自动吸附到链接桩时被使用
      magnetAdsorbed: {
        name: 'stroke',
        args: {
          padding: 4,
          attrs: {
            stroke: '#31d0c6',
            strokeWidth: 4,
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

        return this.getNodes().filter(_node => {
          const data = _node.getData()
          if (data && data.parent) {
            const targetBBox = _node.getBBox()
            _node.getChildren()?.forEach(child => child.toFront()) // 拖拽 combo 时，保持子元素置顶
            return bbox.isIntersectWithRect(targetBBox)
          }
          return false
        })
      },
    },
    mousewheel: {
      enabled: true,
      zoomAtMousePosition: true,
      modifiers: 'ctrl',
      minScale: 0.5,
      maxScale: 3,
    },
    // https://x6.antv.antgroup.com/api/registry/connector
    connecting: {
      // 路由 router 将对 vertices 进一步处理，并在必要时添加额外的点，然后返回处理后的点。例如，经过 orth 路由处理后，边的每一条链接线段都是水平或垂直的。
      router: 'orth', // 路由方式: normal | orth | oneSide | manhattan | metro | er
      // 连接器 connector 将路由 router 返回的点加工成渲染边所需要的 pathData。例如，rounded 连接器将连线之间的倒角处理为圆弧倒角。
      connector: {
        name: 'rounded', // 连接器: normal | rounded | smooth | jumpover
        args: {
          radius: 8,
        },
      },
      anchor: 'center',
      connectionPoint: 'anchor',
      allowBlank: false, // 是否允许连接到画布空白位置的点，默认为 true。
      allowLoop: true, // 是否允许创建循环连线，即边的起始节点和终止节点为同一节点，默认为 true。
      allowNode: true, // 是否允许边连接到节点（非节点上的连接桩），默认为 true。
      allowEdge: true, // 是否允许边连接到另一个边，默认为 true。
      allowPort: true, // 是否允许边连接到连接桩，默认为 true。
      allowMulti: true, // 是否允许在相同的起始节点和终止之间创建多条边，默认为 true
      snap: {
        radius: 20,
      },
      createEdge() {
        // https://x6.antv.antgroup.com/tutorial/basic/edge#router
        return this.createEdge({
          shape: 'normal-edge',
          attrs: {
            line: {
              sourceMarker: {
                name: 'block',
                width: 0,
                height: 0,
                offset: 0,
                visibility: 'hidden',
              },
              targetMarker: {
                name: 'block',
                width: 15,
                height: 10,
                offset: 0,
                visibility: 'visible',
              },
            },
          },
        })
      },
      validateConnection({ sourceCell, targetCell, targetMagnet }) {
        // 不能连接自身
        if (sourceCell === targetCell) {
          return false
        }

        // 不能重复连线
        const edges = this.getEdges()
        const portId = targetMagnet?.getAttribute('port')
        if (edges.find(edge => edge.getTargetPortId() === portId)) {
          return false
        }

        return true
      },
    },
    async: true,
  })

  useGraph.setItem(graph)

  isHTMLElement(_option.stencil) && stencilPlugin(_option.stencil)
  isHTMLElement(_option.minimap) && miniMapPlugin(_option.minimap)

  if (isHTMLElement(_option.horizontal) && isHTMLElement(_option.vertical)) {
    guidesPlugin({
      horizontal: _option.horizontal,
      vertical: _option.vertical,
    })
  }

  plugins(graph)
  registerNode(graph)
  registerEdge(graph)
  registerEvent(graph)

  return graph
}

export { initDefaultData } from './functions'
