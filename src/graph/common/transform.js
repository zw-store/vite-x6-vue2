import { properties as vueCard } from '../shape/component/vue-card'
import { properties as vueProportion } from '../shape/component/vue-proportion'
import { RUNTIME_ERR } from '../types/enum_dispatch_event'
import { isArray, isObject, isString } from '../utils'
import { fmtJSON, fmtLabelOverflow } from '../utils/legacy'
import { Channel } from '../utils/transmit'
import ErrorClass from './errorClass'

/**
 * 获取默认配置选项
 * 兼容x6/g6
 */
export function getBaseConfig(node) {
  const { type, shape, tooltip, attrs, position, x, y, size, id, data, template, initialization } = node

  let _width
  let _height
  let _x = x
  let _y = y
  let _shape = shape
  let _tooltip = tooltip
  let _template = template

  if (data && data.template) {
    _template = data.template
  }

  if (size) {
    // G6
    if (isArray(size)) {
      _width = size[0]
      _height = size[1]
    } else if (isObject(size)) {
      // x6
      _width = size.width
      _height = size.height
    }
  }

  if (isObject(position)) {
    _x = position.x
    _y = position.y
  }

  // 形状转义
  // G6
  if (isString(type)) {
    _shape = type
    if (type === 'diamond') _shape = 'rect'
  }

  if (isObject(attrs)) {
    _tooltip = attrs.label.text
  }

  const cutLabel = fmtLabelOverflow(_tooltip)

  return {
    id,
    x: _x,
    y: _y,
    width: _width,
    height: _height,
    type: _shape,
    label: cutLabel,
    template: _template,
    data: {
      template: _template,
      initialization,
      tooltip: _tooltip,
    },
  }
}

export const getNodeConfigByType = (shape, conf) => {
  switch (shape) {
    case 'vue-proportion':
      return vueProportion(conf)

    case 'vue-card':
      return vueCard(conf)

    default:
      return conf
  }
}

function getNodeJSON(nodes) {
  const nodeList = []

  for (const node of nodes) {
    const nodeJSON = fmtJSON(node)
    const template = nodeJSON.data?.template

    const nodejson = getNodeConfigByType(template, nodeJSON)

    nodejson && nodeList.push(nodejson)
  }

  return nodeList
}

/**
 * 反序列化
 * 按照指定的 JSON 数据渲染节点和边。
 */
export function fromJSON(graph, nodes, edges) {
  if (!isArray(nodes) || !isArray(edges)) {
    Channel.dispatch(RUNTIME_ERR, ErrorClass.InvalidParameters('节点或者边数据格式不正确'))
    throw new ErrorClass.InvalidParameters('节点或者边数据格式不正确')
  }

  graph.fromJSON({
    nodes: getNodeJSON(nodes),
    edges: fmtJSON(edges),
  })
}

/**
 * 序列化
 */
export function toJSON(graph) {
  const edges = []
  const nodes = []
  const edgesJSON = []
  const nodesJSON = []

  const cells = graph.getCells()

  if (cells.length) {
    for (const cell of cells) {
      const json = cell.toJSON()

      if (cell.isEdge()) {
        edgesJSON.push(json)
        edges.push(JSON.stringify(json))
      }

      if (cell.isNode()) {
        // 把省略符号去掉
        // json.attrs.label.text = json.data?.tooltip || ''
        nodesJSON.push(json)
        nodes.push(JSON.stringify(json))
      }
    }
  }

  return { nodes, edges, nodesJSON, edgesJSON }
}
