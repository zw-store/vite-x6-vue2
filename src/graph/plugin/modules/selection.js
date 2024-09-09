import { Selection } from '@antv/x6-plugin-selection'

/**
 * @框选
 * https://x6.antv.antgroup.com/tutorial/plugins/selection
 */
export default graph => {
  graph.use(
    new Selection({
      // className: 'x6-selection', // 附加样式名，用于定制样式
      enabled: true,
      multiple: true, // 是否启用点击多选，启用后按住 ctrl 或 command 键点击节点实现多选
      // multipleSelectionModifiers: ['ctrl', 'meta'], // 用于设置上面点击多选配套的修饰键
      rubberband: true, // 是否启用框选节点功能
      modifiers: ['shift'], // 用于设置上面框选配套的修饰键
      strict: false, // 选框是否需要完全包围节点时才选中节点
      movable: true, // 拖动选框时框选的节点是否一起移动
      // content: '', // 设置附加显示的内容
      // filter: '', // 节点过滤器
      showNodeSelectionBox: true, // 是否显示节点的选择框
      showEdgeSelectionBox: true, // 是否显示边的选择框
      pointerEvents: 'auto', // 如果打开 showNodeSelectionBox 时，会在节点上方盖一层元素，导致节点的事件无法响应，此时可以配置 pointerEvents: none 来解决，默认值是 auto
      eventTypes: ['leftMouseDown', 'mouseWheelDown'], // 用于设置框选的触发事件类型
    }),
  )
}
