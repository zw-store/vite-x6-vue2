import { Scroller } from '@antv/x6-plugin-scroller'

/**
 * @滚动画布
 * https://x6.antv.antgroup.com/tutorial/plugins/scroller
 */
export default graph => {
  graph.use(
    new Scroller({
      enabled: false, // 是否启用 Scroller 插件
      pannable: true, // 是否启用画布平移能力（在空白位置按下鼠标后拖动平移画布）
      // className: '', // 附加样式名，用于定制样式
      // width: 200, // Scroller 的宽度，默认为画布容器宽度
      // height: 200, // Scroller 的高度，默认为画布容器高度
      modifiers: [], // 设置修饰键后需要点击鼠标并按下修饰键才能触发画布拖拽 type ModifierKey = string | ('alt' | 'ctrl' | 'meta' | 'shift')[] | null
      // pageWidth: '', // 每一页的宽度，默认为画布容器宽度
      // pageHeight: '', // 每一页的高度，默认为画布容器高度
      pageVisible: true, // 是否分页
      pageBreak: true, // 是否显示分页符
      autoResize: true, // 是否自动扩充/缩小画布。开启后，移动节点/边时将自动计算需要的画布大小，当超出当前画布大小时，按照 pageWidth 和 pageHeight 自动扩充画布。反之，则自动缩小画布
      // minVisibleWidth: 0, // 当 padding 为空时有效，设置画布滚动时画布的最小可见宽度
      // minVisibleHeight: 0, // 当 padding 为空时有效，设置画布滚动时画布的最小可见高度
      // padding: [0], 设置画布四周的 padding 边距。默认根据 minVisibleWidth 和 minVisibleHeight 自动计算得到，保证画布滚动时，在宽度和高度方向至少有 minVisibleWidth 和 minVisibleHeight 大小的画布可见
    }),
  )
}
