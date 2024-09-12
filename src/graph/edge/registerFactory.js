import { Graph } from '@antv/x6'
import NormalEdge from './normalEdge'

export default () => {
  Graph.registerEdge('normal-edge', NormalEdge, true)
}
