import { Keyboard } from '@antv/x6-plugin-keyboard'
import { HIDE_CONTEXTMENU } from '../../types/emun_contentmenu_dispatch'
import { Channel } from '../../utils/transmit'

/**
 * @快捷键
 * https://x6.antv.antgroup.com/tutorial/plugins/keyboard
 */
export default graph => {
  graph.use(
    new Keyboard({
      enabled: true,
      global: true, // 是否为全局键盘事件，设置为 true 时键盘事件绑定在 document 上，否则绑定在画布容器上。当绑定在画布容器上时，需要容器获得焦点才能触发键盘事件
      // format: (_this, key) => {}, // 绑定或解绑键盘事件时，格式化按键字符串
      // 判断一个键盘事件是否应该被处理，返回 false 时对应的键盘事件被忽略
      guard(keyboard) {
        const { metaKey } = keyboard

        if (metaKey) {
          Channel.dispatch(HIDE_CONTEXTMENU)
        }

        keyboard.stopPropagation() // 阻止事件冒泡
        keyboard.preventDefault() // 阻止默认行为

        return true
      },
    }),
  )
}
