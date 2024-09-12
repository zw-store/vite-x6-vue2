import { Shape } from '@antv/x6'

export default Shape.Edge.define(
  {
    nodeType: 'edge-node',
    markup: [
      {
        tagName: 'path',
        selector: 'wrap',
        attrs: {
          fill: 'none',
          cursor: 'pointer',
          stroke: 'transparent',
          strokeLinecap: 'round',
        },
      },
      {
        tagName: 'path',
        selector: 'line',
        attrs: {
          fill: 'none',
          pointerEvents: 'none',
        },
      },
    ],
    attrs: {
      wrap: {
        connection: true,
        strokeWidth: 15,
        strokeLinejoin: 'round',
      },
      line: {
        connection: true,
        stroke: '#909399',
        strokeWidth: 2,
        strokeLinejoin: 'round',
        targetMarker: {
          tagName: 'path',
          d: 'M 10 -5 0 0 10 5 z',
        },
      },
    },
    router: {
      name: 'orth',
      args: {
        padding: 10,
      },
    },
  },
  true,
)
