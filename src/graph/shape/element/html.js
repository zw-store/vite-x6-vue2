import { Shape } from '@antv/x6'

export function getTargetByNode(node) {
  const { data = {} } = node
  const label = node.data?.tooltip || null
  const { actionType } = data

  return { node, label, nodeId: node.id, actionType }
}

export default () => {
  Shape.HTML.register({
    shape: 'custom-html',
    width: 160,
    height: 80,
    effect: ['data', 'position', 'x', 'y'],
    html(cell) {
      const odiv = document.createElement('div')

      odiv.className = 'html-tooltips'
      odiv.style.border = '1px solid #e2e2e2'
      odiv.style.borderRadius = '4px'
      odiv.style.fontSize = '12px'
      odiv.style.color = '#545454'
      odiv.style.width = '350px'
      odiv.style.wordBreak = 'break-all'
      odiv.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'
      odiv.style.boxShadow = 'rgb(174, 174, 174) 0px 0px 10px'
      odiv.style.padding = '10px'

      odiv.innerText = cell.getData().msg

      return odiv
    },
  })
}
