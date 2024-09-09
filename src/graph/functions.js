import { updateNode as commonUpdateNode, getGraphJSON, graphClean, setDefaultGraphData } from './common'
import { Channel, DOUBLE_NODE_CLICK, NODE_CLICK, RUNTIME_ERR } from './exports'
export { zoomIn, zoomOut } from './common'
/**
 * 初始化画布默认数据
 * @param {any[]} nodes 节点
 * @param {any[]} edges 边
 */
export const initDefaultData = (nodes, edges) => setDefaultGraphData(nodes, edges)

/** 画布清空 */
export const clean = () => graphClean()

/**
 * 修改Node节点
 * @param {IUpdateOptions} options
 */
export const updateNode = options => commonUpdateNode(options)

/** 监听单元事件单击回调 */
export function nodeClick(cb) {
  Channel.listener(NODE_CLICK, cb)
}

/** 监听单元事件双击回调 */
export function nodeDclick(cb) {
  Channel.listener(DOUBLE_NODE_CLICK, cb)
}

/** 运行时异常回调 */
export function runtimeError(cb) {
  Channel.listener(RUNTIME_ERR, cb)
}

export const exportData = () => getGraphJSON()
