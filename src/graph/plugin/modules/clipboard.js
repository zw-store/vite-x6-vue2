import { Clipboard } from '@antv/x6-plugin-clipboard'

/**
 * @复制粘贴
 * https://x6.antv.antgroup.com/tutorial/plugins/clipboard
 */
export default graph => {
  graph.use(
    new Clipboard({
      enabled: true,
      useLocalStorage: false, // 开启后被复制的节点/边同时被保存到 localStorage 中，浏览器刷新或者关闭后重新打开，复制/粘贴也能正常工作
    }),
  )
}
