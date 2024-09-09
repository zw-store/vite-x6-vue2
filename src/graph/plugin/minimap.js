import { MiniMap } from '@antv/x6-plugin-minimap'
import { useMiniMap, useGraph } from '../store'

/**
 * @小地图
 * https://x6.antv.antgroup.com/tutorial/plugins/minimap
 */
export default el => {
  try {
    const { graph } = useGraph

    const miniMap = new MiniMap({
      container: el, // 挂载小地图的容器
      width: 300, // 小地图的宽度
      height: 200, // 小地图的高度
      padding: 40, // 小地图容器的 padding 边距
      scalable: true, // 是否可缩放
      minScale: 0.01, // 最小缩放比例
      maxScale: 16, // 最大缩放比例
      // graphOptions: Graph.Options
    })

    useMiniMap.setItem(miniMap)

    graph.value.use(miniMap)

    return miniMap
  } catch (error) {
    console.error('MiniMap initialization failed:', error)
  }
}
