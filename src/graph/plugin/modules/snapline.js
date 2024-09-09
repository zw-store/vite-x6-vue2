import { Snapline } from '@antv/x6-plugin-snapline'

/**
 * @对齐线
 * https://x6.antv.antgroup.com/tutorial/plugins/snapline
 */
export default graph => {
  graph.use(
    new Snapline({
      enabled: true,
      // className: 'x6-snapline', // 附加样式名，用于定制对齐线样式
      tolerance: 10, // 对齐精度，即移动节点时与目标位置的距离小于 tolerance 时触发显示对齐线
      sharp: true, // 是否显示截断的对齐线
      resizing: false, // 改变节点大小时是否触发对齐线
      clean: false, // 如果为 true，则在 3s 后清除对齐线，为 false，不会清除，如果为数字(ms)，则在指定时间后清除对齐线
    }),
  )
}
