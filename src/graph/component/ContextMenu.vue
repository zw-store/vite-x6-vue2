<!--
 * Copyright ©
 * #
 * @author: zw
 * @date: 2024-08-18
 -->

<template>
  <ContextMenu ref="menu" v-bind="$attrs" :model="items" @on-select="onSelect"></ContextMenu>
</template>

<script>
import ContextMenu from '@/components/ContextMenu'
import { Channel } from '../utils/transmit'
import { downloadJSON } from '../utils/download'
import { GraphContextMenuConfig, NodeContextmMenuConfig, ComboContextmMenuConfig, EdgeContextmMenuConfig } from '../types/emun_contentmenu_dispatch'
import { SWITCH_CONTEXTMENU_TYPE, NODE_CONTEXTMENU, COMBO_CONTEXTMENU, EDGE_CONTEXTMENU, HIDE_CONTEXTMENU, GRAPH_CONTEXTMENU } from '../types/emun_contentmenu_dispatch'
import { NODE_CLICK } from '../types/enum_base_event'
import { useGraph } from '../store'
import { exportData } from '../functions'
import { zoomIn, zoomOut } from '../common'
import { fullScreen } from '../utils/fullScreen'

export default {
  name: 'GraphContextMenu',
  components: { ContextMenu },
  data() {
    return {
      contentmenuSelect: null,
      contentmenuType: undefined,
      items: [],
    }
  },

  mounted() {
    Channel.listener(NODE_CONTEXTMENU, this.show)
    Channel.listener(COMBO_CONTEXTMENU, this.show)
    Channel.listener(EDGE_CONTEXTMENU, this.show)
    Channel.listener(GRAPH_CONTEXTMENU, this.show)
    Channel.listener(HIDE_CONTEXTMENU, this.hide)

    Channel.listener(SWITCH_CONTEXTMENU_TYPE, this.switchData)
    Channel.listener(NODE_CONTEXTMENU, (_, node) => (this.contentmenuSelect = node))
    Channel.listener(COMBO_CONTEXTMENU, (_, combo) => (this.contentmenuSelect = combo))
    Channel.listener(EDGE_CONTEXTMENU, (_, edge) => (this.contentmenuSelect = edge))
  },

  methods: {
    onSelect(item, _evt) {
      const { graph } = useGraph
      const node = this.contentmenuSelect

      const edge = this.contentmenuSelect

      switch (item.label) {
        case '选中':
          graph.value.select(node)
          break

        case '编辑':
          Channel.dispatch(NODE_CLICK, node)
          break

        case '复制':
          graph.value.select(node)
          graph.value.copy([node])
          break

        case '置顶':
          node.toFront({
            eventSource: this.contentmenuType,
          })
          break

        case '置底':
          node.toBack({
            eventSource: this.contentmenuType,
          })
          break

        case '粘贴':
          if (!graph.value.isClipboardEmpty()) {
            const cells = graph.value.paste({
              offset: {
                dx: _evt.pageX - 400,
                dy: _evt.offsetY,
              },
            })

            graph.value.cleanSelection()
            graph.value.select(cells)
          }
          break

        case '全屏':
          {
            const container = graph.value.container
            const parent = container.parentNode.parentNode.parentNode

            fullScreen(parent)
          }
          break

        case '撤销':
          graph.value.undo()
          break

        case '重做':
          graph.value.redo()
          break

        case '放大':
          zoomIn()
          break

        case '缩小':
          zoomOut()
          break

        case '居中此节点':
          graph.value.centerCell(node)
          break

        case '清空画布':
          graph.value.clearCells()
          break

        case '导出':
          {
            const data = exportData()
            console.log({ edges: data.edges, nodes: data.nodes })
            downloadJSON({ edges: data.edges, nodes: data.nodes })
          }
          break

        case '删除':
          graph.value.removeCell(node)
          break

        case '添加标签':
          edge.appendLabel({
            attrs: {
              text: {
                text: 'Hello Label',
              },
            },
          })
          break

        default:
          break
      }
    },
    show(event) {
      this.$refs.menu?.show(event)
    },
    hide() {
      this.$refs.menu?.hide()
    },

    switchData(type) {
      this.contentmenuType = type

      switch (type) {
        case 'graph':
          this.items = GraphContextMenuConfig
          break

        case 'node':
          this.items = NodeContextmMenuConfig
          break

        case 'combo':
          this.items = ComboContextmMenuConfig
          break

        case 'edge':
          this.items = EdgeContextmMenuConfig
          break

        default:
          break
      }
    },
  },
  //  End
}
</script>
