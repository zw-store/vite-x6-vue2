import { History } from '@antv/x6-plugin-history'

/**
 * @撤销重做
 * https://x6.antv.antgroup.com/tutorial/plugins/history
 */
export default graph => {
  graph.use(
    new History({
      enabled: true,
      stackSize: 0, // stackSize 为 0 表示不限制历史记录栈的长度，如果设置为其他数字表示最多只会记录该数字长度的历史记录
      ignoreAdd: false, // ignoreAdd 如果为 true，添加元素不会被记录到历史记录
      ignoreRemove: false, // ignoreRemove 如果为 true，删除元素不会被记录到历史记录
      ignoreChange: false, // ignoreChange 如果为 true，元素属性变化是否被记录到历史记录
      beforeAddCommand: (_event, args) => {
        // 当一个命令被添加到 Undo 队列前被调用，如果该方法返回 false，那么这个命令将不会被添加到 Undo 队列中
        const { cell } = args

        if (cell.shape === 'custom-html') {
          // 禁止 tooltip 片段添加到 Undo/ Redo 队列中
          return false
        }
      },
      afterAddCommand: (event, args, cmd) => {}, // 当一个命令被添加到 Undo 队列后被调用
      executeCommand: (cmd, revert, options) => {}, // 当命令被撤销或重做时被调用，revert 为 true 表示命令被撤销，否则表示命令被重做
    }),
  )
}
