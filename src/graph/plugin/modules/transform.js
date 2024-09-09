import { Transform } from '@antv/x6-plugin-transform'

/**
 * @图形变换
 * https://x6.antv.antgroup.com/tutorial/plugins/transform
 */
export default graph => {
  graph.use(
    new Transform({
      resizing: {
        enabled: true, // 是否支持调整节点大小
        minWidth: 1, // 最小的调整宽度
        maxWidth: 200, // 最大的调整宽度
        minHeight: 1, // 最小的调整高度
        maxHeight: 150, // 最大的调整高度
        orthogonal: false, // 是否显示中间调整点
        restrict: false, // 调整大小边界是否可以超出画布边缘
        autoScroll: true, // 拖动位置超过画布时是否自动滚动画布
        preserveAspectRatio: false, // 调整大小过程中是否保持节点的宽高比例
        allowReverse: true, // 到达最小宽度或者高度时是否允许控制点反向拖动
      },
      rotating: {
        enabled: true, // 是否支持调整节点角度
        grid: 15, // 每次旋转的角度
      },
    }),
  )
}
