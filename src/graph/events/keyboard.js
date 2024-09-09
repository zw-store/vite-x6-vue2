import { zoomIn, zoomOut } from '../common'
import { HIDE_CONTEXTMENU } from '../types/emun_contentmenu_dispatch'
import { FREEZE_GRAPH, HELP } from '../types/enum_dispatch_event'
import { Channel } from '../utils/transmit'
// 可操作事件

let contextmenuTarget = null

export default graph => {
  bindKey(graph)
  graph.on('node:contextmenu', e => {
    const { node } = e

    if (node.isCell && node.isCell()) {
      contextmenuTarget = node
    }
  })

  Channel.listener(HIDE_CONTEXTMENU, () => {
    setTimeout(() => {
      contextmenuTarget = null
    }, 800)
  })
}

const State = {
  offset: 30,
  useLocalStorage: true,
}

// https://x6.antv.antgroup.com/tutorial/plugins/keyboard#bindkey
/**
 * 绑定键盘事件
 * @param {Graph} graph
 */
function bindKey(graph) {
  // 复制
  graph.bindKey(['ctrl+c', 'command+c'], _ => {
    const cells = (contextmenuTarget && [contextmenuTarget]) || graph.getSelectedCells()

    if (cells.length) {
      graph.copy(cells)
    }

    // 判断一个键盘事件是否应该被处理，返回 false 时对应的键盘事件被忽略。
    return false
  })
  // 粘贴
  graph.bindKey(['ctrl+v', 'command+v'], () => {
    if (!graph.isClipboardEmpty()) {
      const cells = graph.paste({ offset: 32 })

      graph.cleanSelection()
      graph.select(cells)
    }

    return false
  })
  // 全选
  graph.bindKey(['ctrl+a', 'command+a'], () => {
    const cells = graph.getCells()

    if (cells.length) {
      graph.select(cells)
    }

    Channel.dispatch('SELECT_ALL', cells)

    return false
  })
  // 删除
  graph.bindKey(
    ['command+delete', 'command+backspace'],
    () => {
      const cells = (contextmenuTarget && [contextmenuTarget]) || graph.getSelectedCells()

      if (cells.length) {
        // 删除前移除所有包含工具
        cells.forEach(currentCell => {
          currentCell.removeTools()
        })
        graph.removeCells(cells)
      }

      return false
    },
    'keydown',
  )
  // 删除全部
  graph.bindKey(['ctrl+shift+delete', 'command+shift+backspace'], () => {
    graph.clearCells()

    return false
  })

  // 撤销
  graph.bindKey(['ctrl+z', 'command+z'], () => {
    graph?.history?.undo()

    return false
  })
  // 重做
  graph.bindKey(['ctrl+y', 'shift+command+z'], () => {
    graph?.history?.redo()

    return false
  })
  // Esc 取消所有选中单元 & 关闭提示
  graph.bindKey('esc', () => {
    graph.cleanSelection()
    Channel.dispatch(HELP, 'close')

    return false
  })
  // help
  graph.bindKey(['alt+h', 'option+h'], () => {
    Channel.dispatch(HELP)

    return false
  })
  // 居中
  graph.bindKey(['alt+f', 'option+f'], () => {
    graph.centerContent()

    return false
  })

  graph.bindKey(['+'], () => {
    zoomIn()
    return false
  })

  graph.bindKey(['shift+-'], () => {
    zoomOut()
    return false
  })
}

// https://x6.antv.antgroup.com/tutorial/plugins/keyboard#triggerKey
// 粘贴
export function onPaste(graph) {
  const cells = graph.value?.getSelectedCells()

  if (cells && cells.length) {
    graph.value.copy(cells, State)
  }

  if (!graph.value.isClipboardEmpty()) {
    const cells = graph.value.paste(State)

    graph.value.cleanSelection()
    graph.value.select(cells)
  }
}

export function deleteCells(graph) {
  const cells = graph.value.getSelectedCells()

  if (cells.length) {
    // 删除前移除所有包含工具
    cells.forEach(currentCell => {
      currentCell.removeTools()
    })
    graph.value.removeCells(cells)
  }
}

// 全选
export function selectAll(graph) {
  const cells = graph.value.getCells()

  if (cells.length) {
    graph.value.select(cells)
  }
}

/**
 * 冻结画布
 */
export function freezeGraph(graph) {
  const cells = graph.value.getCells()

  if (cells.length) {
    cells.forEach(cell => {
      cell.removeTools()
      cell.setData({ disableMove: true })
    })
  }

  // 移除连接桩子会导致 边 移除
  // const nodes = graph.getNodes()
  // for (const node of nodes) {
  //     // 禁用所有连接桩
  //     node.removePorts()
  // }
  graph.value
    .freeze()
    // 单选框
    .disableSelection()
    // 多选框
    .disableMultipleSelection()
    // 清空选区
    .cleanSelection()
    // 剪切板
    .disableClipboard()
    // 历史记录
    .disableHistory()
    // 对齐线
    .disableSnapline()
    // 快捷键
    .disableKeyboard()
  Channel.dispatch(FREEZE_GRAPH, true)
}

/**
 * 解冻
 */
export function unfreezeGraph(graph) {
  const cells = graph.value.getCells()

  if (cells.length) {
    cells.forEach(cell => {
      cell.setData({ disableMove: false })
    })
  }

  graph.value.unfreeze().enableSelection().enableMultipleSelection().enableClipboard().enableHistory().enableSnapline().enableKeyboard()
  Channel.dispatch(FREEZE_GRAPH, false)
}
