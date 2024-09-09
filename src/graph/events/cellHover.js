const changePortsVisible = (node, visible) => {
  const ports = document.querySelectorAll(`g[data-cell-id="${node.id}"] .x6-port-body`)

  ports.forEach(port => {
    port.style.visibility = visible ? 'visible' : 'hidden'
  })
}

// 节点元素 内容详情
function showTips(graph, tooltips, x, y) {
  graph.addNode({
    x,
    y: y - 15,
    width: 350,
    height: 40,
    shape: 'custom-html',
    data: {
      msg: tooltips,
    },
  })
}

export default graph => {
  graph.on('node:mouseenter', ({ node }) => {
    const data = node.getData()
    /*
      const { x, y } = graph.localToGraph(node.store.data.position.x, node.store.data.position.y)
     */
    const { x, y } = node.store.data.position

    if (data && data.disableMove) {
      changePortsVisible(node, false)
    } else {
      changePortsVisible(node, true)
    }

    if (node.data && !node.data.initialization) {
      // 此处做变通, 添加html模板定制化
      showTips(graph, node.data.tooltip, x + 100, y - 50)
    }
  })

  graph.on('node:mouseleave', ({ node }) => {
    changePortsVisible(node, false)
    // 清理tooltips
    graph.getNodes()?.forEach(node => {
      if (node.shape === 'custom-html') graph.removeNode(node)
    })
  })

  graph.on('cell:unselected', () => {
    graph.getNodes()?.forEach(node => {
      if (node.shape === 'custom-html') graph.removeNode(node)
    })
  })

  graph.on('cell:removed', () => {
    graph.getNodes()?.forEach(node => {
      if (node.shape === 'custom-html') graph.removeNode(node)
    })
  })
}
