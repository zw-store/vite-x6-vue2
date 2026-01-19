import { useRuler } from '../store'

export default ({ containerWidth, containerHeight }) => {
  // 初始化标尺画布尺寸
  // 可以根据实际容器大小动态计算
  const width = containerWidth || 1920
  const height = containerHeight || 1080

  useRuler.updateCanvasSize(width, height)

  // 监听窗口resize
  window.addEventListener('resize', () => {
    // 如果需要动态更新画布尺寸，可以在这里更新
    // useRuler.updateCanvasSize(newWidth, newHeight)
  })
}
