/**
 * @cname 比例
 * @name Proportion
 * @description 独立的Vue节点
 */

import { getBaseConfig } from '../../../common/transform'
import component from './template'
export { default as component } from './template'

export function properties(node) {
  component
  const { label, width, x, y, height, id, data } = getBaseConfig(node)

  return {
    id,
    width,
    height,
    shape: component.name,
    nodeType: 'vue-component-node',
    component: component.name,
    label,
    x,
    y,
    zIndex: 100,
    data,
    ports: {
      items: [
        { group: 'port-top', id: 'p_top', connected: true },
        { group: 'port-bottom', id: 'p_bottom' },
      ],
      groups: {
        'port-top': { position: 'top', zIndex: 20, attrs: { circle: { dataClass: 'choice-point', r: 6, magnet: true, stroke: '#5b8ffa', strokeWidth: 1, fill: '#fff' } } },
        'port-bottom': {
          position: 'bottom',
          zIndex: 20,
          attrs: {
            circle: {
              dataClass: 'choice-point',
              r: 6,
              magnet: true,
              stroke: '#5b8ffa',
              strokeWidth: 1,
              fill: '#fff',
            },
          },
        },
      },
    },
  }
}
