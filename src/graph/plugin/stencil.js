import { Stencil } from '@antv/x6-plugin-stencil'
import { useStencil, useGraph } from '../store'
import insertCss from 'insert-css'

/**
 * @Stencil
 * https://x6.antv.antgroup.com/tutorial/plugins/stencil
 */
export default el => {
  const { graph } = useGraph

  try {
    const stencil = new Stencil({
      target: graph.value,
      title: '流程图',
      groups: [],
      // 分组信息
      // search(cell, keyword) {
      //   return cell.shape.indexOf(keyword) !== -1
      // },
      // placeholder: 'Search by shape name',
      // notFoundText: 'Not Found',
      collapsable: false, // 是否显示全局折叠/展开按钮
      // layout: (this: Stencil, model: Model, group?: Group | null) => {}, 模板画布中节点的布局方法。
      stencilGraphWidth: 400, // 模板画布宽度
      stencilGraphHeight: 0, // 模板画布高度。设置为 0 时高度会自适应
      stencilGraphPadding: 30, // 模板画布边距
      // stencilGraphOptions: '', // 模板画布配置项
      layoutOptions: {
        // 布局选项
        columns: 1,
        resizeToFit: false,
        columnWidth: 135,
        center: false,
        marginY: 10,
        dy: 10,
        rowHeight: 'auto',
      },
      // getDragNode: (node, options) => node.clone(), // 获取拖拽节点的回调函数
      // getDropNode: (node, options) => node.clone(), // 获取拖拽节点的回调函数
    })

    el.appendChild(stencil.container)
    useStencil.setItem(stencil)

    return stencil
  } catch (error) {
    console.error('Stencil initialization failed:', error)

    return null
  }
}

insertCss(`
  .x6-widget-stencil-content {
    top: 32px;
  }
`)
