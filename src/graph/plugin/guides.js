import Guides from '@scena/guides'
import { useGuides } from '../store'

export default ({ horizontal, vertical }) => {
  // https://daybrush.com/guides/release/latest/doc/Guides.html#.event:dragStart
  const config = {
    backgroundColor: '#3e4e5b', // guides 背景色
    direction: 'end', // 文字显示方向
    textColor: '#fff', // 刻度文字的颜色
    textOffset: [0, 0], // 文字偏移方向
    lineColor: '#999', // 刻度线的颜色
    displayDragPos: true, // 拖拽线的时候是否实时显示坐标位置
    unit: 100, // 刻度的间隔值，默认50
    segment: 10, // 刻度线段数，默认5
    guideStyle: { background: '#18a058' }, // guide 拖动结束后线的颜色，配合dragGuideStyle使用
    dragGuideStyle: { background: '#18a058' }, // guide 拖动中线的颜色 配合guideStyle使用
    guidePosStyle: { color: '#18a058' }, // 实时显示坐标的样式
    negativeRuler: true, // 是否以负方向显示标尺。
    useResizeObserver: true, // 使用resizeObserver来监听容器大小变化
    snaps: Array.from({ length: 1001 }, (_, i) => (i - 500) * 10), // 取-5000 ~ 5000吸附点
    guidesOffset: -30, // 偏移到和画布坐标一致
  }

  const guidesX = new Guides(horizontal, {
    ...config,
    type: 'horizontal',
  })

  const guidesY = new Guides(vertical, {
    ...config,
    type: 'vertical',
  })

  useGuides.setItem({ guidesX, guidesY })

  window.addEventListener('resize', () => {
    guidesY.resize()
    guidesX.resize()
  })
}
