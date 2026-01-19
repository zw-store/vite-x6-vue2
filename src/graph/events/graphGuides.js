import { useRuler } from '../store'

export default graph => {
  const scroller = graph.getPlugin('scroller')

  // 标尺厚度
  const RULER_THICK = 30

  // 获取设备像素比
  const dpr = window.devicePixelRatio || 1

  // 记录画布初始中心位置
  let initialScrollLeft = null
  let initialScrollTop = null

  // 获取画布左上角（标尺右下角）在画布坐标系中的位置
  const getCanvasOffset = () => {
    // 获取变换矩阵
    const matrix = graph.transform.getMatrix()
    const scale = matrix[0] || 1
    const tx = matrix[4] || 0
    const ty = matrix[5] || 0

    // 如果有 scroller，获取滚动偏移
    let scrollLeft = 0
    let scrollTop = 0

    if (scroller?.container) {
      const currentScrollLeft = scroller.container.scrollLeft || 0
      const currentScrollTop = scroller.container.scrollTop || 0

      // 初始化时记录中心位置
      if (initialScrollLeft === null) {
        initialScrollLeft = currentScrollLeft
        initialScrollTop = currentScrollTop
        console.log('[标尺初始化] scroll 中心点:', initialScrollLeft, initialScrollTop)
      }

      // 计算相对于初始位置的滚动偏移
      scrollLeft = currentScrollLeft - initialScrollLeft
      scrollTop = currentScrollTop - initialScrollTop
    }

    // 画布左上角坐标 = -滚动偏移 / 缩放
    // scroller 模式下，向右滚动（scrollLeft 增加）会看到右边的内容（更大的坐标）
    const canvasX = scrollLeft / scale
    const canvasY = scrollTop / scale

    console.log('[画布坐标] scale:', scale.toFixed(2), 'scroll:', scrollLeft.toFixed(2), scrollTop.toFixed(2), 'tx:', tx.toFixed(2), 'ty:', ty.toFixed(2), '→ canvas:', canvasX.toFixed(2), canvasY.toFixed(2))

    return {
      x: canvasX,
      y: canvasY,
    }
  }

  // 更新标尺位置
  const updateRulerPosition = () => {
    const offset = getCanvasOffset()
    console.log('[更新标尺]', offset)
    useRuler.updateScroll(offset.x, offset.y)
  }

  // 初始化：同步当前画布状态
  const initRulerPosition = () => {
    const transform = graph.transform.getMatrix()
    const scale = transform[0] || 1

    // 初始化缩放
    useRuler.updateScale(scale)

    // 初始化位置
    updateRulerPosition()
  }

  // 延迟初始化，确保画布已经完全加载
  setTimeout(() => {
    initRulerPosition()
  }, 100)

  // 监听画布缩放
  graph.on('scale', e => {
    const { sx } = e
    useRuler.updateScale(sx)
  })

  // 监听画布平移（如果没用 scroller）
  graph.on('translate', () => {
    updateRulerPosition()
  })

  // 监听 scroller 滚动（主要方式）
  if (scroller?.container) {
    console.log('[标尺] scroller 容器已找到，添加滚动监听')

    const handleScroll = () => {
      console.log('[标尺] scroll 事件触发')
      updateRulerPosition()
    }

    scroller.container.addEventListener('scroll', handleScroll, { passive: true })

    // 定时轮询作为备用方案
    let lastScrollLeft = scroller.container.scrollLeft
    let lastScrollTop = scroller.container.scrollTop

    setInterval(() => {
      const currentScrollLeft = scroller.container.scrollLeft
      const currentScrollTop = scroller.container.scrollTop

      if (currentScrollLeft !== lastScrollLeft || currentScrollTop !== lastScrollTop) {
        console.log('[标尺] 检测到滚动变化（轮询）', {
          from: { x: lastScrollLeft, y: lastScrollTop },
          to: { x: currentScrollLeft, y: currentScrollTop },
        })
        lastScrollLeft = currentScrollLeft
        lastScrollTop = currentScrollTop
        updateRulerPosition()
      }
    }, 100)
  } else {
    console.log('[标尺] 未找到 scroller 容器')
  }

  // 监听鼠标拖拽画布（备用方案）
  let isDragging = false
  let rafId = null

  graph.on('blank:mousedown', () => {
    console.log('[标尺] 开始拖拽画布')
    isDragging = true

    // 使用 requestAnimationFrame 持续更新
    const update = () => {
      if (isDragging) {
        updateRulerPosition()
        rafId = requestAnimationFrame(update)
      }
    }
    rafId = requestAnimationFrame(update)
  })

  const handleMouseUp = () => {
    if (isDragging) {
      console.log('[标尺] 结束拖拽画布')
      isDragging = false
      if (rafId) {
        cancelAnimationFrame(rafId)
        rafId = null
      }
      // 最后更新一次确保准确
      updateRulerPosition()
    }
  }

  document.addEventListener('mouseup', handleMouseUp)

  // 监听画布resize
  graph.on('resize', () => {
    updateRulerPosition()
  })

  // 监听节点移动（可能触发画布自动扩展）
  graph.on('node:moved', () => {
    setTimeout(updateRulerPosition, 50)
  })
}
