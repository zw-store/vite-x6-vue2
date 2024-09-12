export const Anchor = {
  circle: {
    attrs: {
      circle: {
        r: 4,
        magnet: true,
        stroke: '#5F95FF',
        strokeWidth: 1,
        fill: '#fff',
        style: {
          visibility: 'hidden',
        },
      },
    },
  },
  rect: {
    attrs: {
      rect: {
        width: 10,
        height: 10,
        magnet: true,
        stroke: '#5F95FF',
        strokeWidth: 1,
        fill: '#fff',
        style: {
          visibility: 'hidden',
        },
      },
    },
  },
}

export const selectedStyle = {
  // 节点选中样式
  nodeSelected: {},
  // 边选中样式
  edgeSelected: {
    stroke: '#409EFF',
    strokeWidth: 3,
  },
}
