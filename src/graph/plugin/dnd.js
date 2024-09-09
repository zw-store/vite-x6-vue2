import { Dnd } from '@antv/x6-plugin-dnd'
import { useDnd, useGraph } from '../store'

/**
 * @Dnd
 * https://x6.antv.antgroup.com/tutorial/plugins/dnd
 */
export default el => {
  try {
    const { graph } = useGraph

    const dnd = new Dnd({
      target: graph, // 目标画布
      // getDragNode: (sourceNode, options) => Node // 拖拽开始时，获取被拖拽的节点，默认克隆 dnd.start 传入的节点
      // getDropNode: (draggingNode, options) => Node // 拖拽结束时，获取放置到目标画布的节点，默认克隆被拖拽的节点。
      // validateNode: (droppingNode, options) => boolean | Promins // 拖拽结束时，验证放置到目标画布的节点是否合法
      dndContainer: el, // 如果设置 dndContainer，在 dndContainer 上放开鼠标不会放置节点，常用于 dnd 容器处于画布上面的场景。
      scaled: false, // 是否缩放节点
      draggingContainer: document.body, // 自定义拖拽画布容器。
    })

    useDnd.setItem(dnd)

    graph.value.use(dnd)

    return dnd
  } catch (error) {
    console.error('Dnd initialization failed:', error)
  }
}
