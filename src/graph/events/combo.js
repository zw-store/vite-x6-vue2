// import {  } from "module"

export default graph => {
  let ctrlPressed = false
  const embedPadding = 20

  graph.on('node:embedding', ({ e }) => {
    ctrlPressed = e.metaKey || e.ctrlKey
  })

  graph.on('node:embedded', () => {
    ctrlPressed = false
  })

  graph.on('node:change:size', ({ node, options }) => {
    if (options.skipParentHandler) {
      return
    }

    const children = node.getChildren()
    if (children && children.length) {
      node.prop('originSize', node.getSize())
    }
  })

  graph.on('node:change:position', ({ node, options }) => {
    if (options.skipParentHandler || ctrlPressed) {
      return
    }

    const nodeChildren = node.getChildren()
    if (nodeChildren?.length) {
      node.prop('originPosition', node.getPosition())
    }

    const parent = node.getParent()
    if (!parent?.isNode()) return

    let originSize = parent.prop('originSize')
    if (originSize == null) {
      originSize = parent.getSize()
      parent.prop('originSize', originSize)
    }

    let originPosition = parent.prop('originPosition')
    if (originPosition == null) {
      originPosition = parent.getPosition()
      parent.prop('originPosition', originPosition)
    }

    let x = originPosition.x
    let y = originPosition.y
    let cornerX = originPosition.x + originSize.width
    let cornerY = originPosition.y + originSize.height
    let hasChange = false

    const children = parent.getChildren()
    if (children) {
      children.forEach(child => {
        const bbox = child.getBBox().inflate(embedPadding)
        const corner = bbox.getCorner()

        if (bbox.x < x) {
          x = bbox.x
          hasChange = true
        }

        if (bbox.y < y) {
          y = bbox.y
          hasChange = true
        }

        if (corner.x > cornerX) {
          cornerX = corner.x
          hasChange = true
        }

        if (corner.y > cornerY) {
          cornerY = corner.y
          hasChange = true
        }
      })
    }

    if (hasChange) {
      parent.prop(
        {
          position: { x, y },
          size: { width: cornerX - x, height: cornerY - y },
        },
        { skipParentHandler: true },
      )
    }
  })
}
