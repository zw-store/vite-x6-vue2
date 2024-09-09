import { Export } from '@antv/x6-plugin-export'

/**
 * @导出
 * https://x6.antv.antgroup.com/tutorial/plugins/export
 */
export default graph => {
  graph.use(
    new Export({
      enabled: true,
      // preserveDimensions: boolean | Size // preserveDimensions 用来控制导出 svg 的尺寸, 如果不设置，width 和 height 默认为 100%；如果设置为 true, width 和 height 会自动计算为图形区域的实际大小
      // viewBox: Rectangle.RectangleLike // 设置导出 svg 的 viewBox
      copyStyles: true, // 是否复制外部样式表中的样式，默认是 true。开启 copyStyles 后，在导出过程中因为需要禁用所有样式表，所以页面可能会出现短暂的样式丢失现象。如果效果特别差，可以将 copyStyles 设置为 false
      // stylesheet: '', // 自定义样式表
      serializeImages: true, // 是否将 image 元素的 xlink:href 链接转化为 dataUri 格式
      // beforeSerialize: (this, svg) => any // 可以在导出 svg 字符串之前调用 beforeSerialize 来修改它
    }),
  )
}
