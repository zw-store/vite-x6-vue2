import Guides from '@scena/guides'

export default ({ horizontal, vertical }) => {
  const config = {
    direction: 'start', // 标尺的位置，默认是end
    backgroundColor: 'transparent', // ruler 的背景色
    textColor: '#333', // 刻度文字的颜色
    textOffset: [-2, 0], // 刻度文字的偏移值
    displayDragPos: true, // 拖拽线的时候是否实时显示坐标位置
    unit: 100, // 刻度的间隔值，默认50
    segment: 1,
    guideStyle: { background: '#18a058' }, // guide 拖动结束后线的颜色，配合dragGuideStyle使用
    dragGuideStyle: { background: '#18a058' }, // guide 拖动中线的颜色 配合guideStyle使用
    guidePosStyle: { color: '#18a058' }, // 实时显示坐标的样式
    negativeRuler: false, // 是否以负方向显示标尺。
  }

  // https://daybrush.com/guides/release/latest/doc/Guides.html#.event:dragStart
  const guidesX = new Guides(horizontal, {
    ...config,
    type: 'horizontal',
    textOffset: [0, -18],
    guidesOffset: -14,
  }).on('changeGuides', e => {
    // eyeDisabled.value = e.guides.length == 0
  })

  const guidesY = new Guides(vertical, {
    ...config,
    type: 'vertical',
    textOffset: [-18, 0],
    guidesOffset: -14,
  }).on('changeGuides', e => {
    // eyeDisabled.value = e.guides.length == 0
  })

  window.addEventListener('resize', () => {
    guidesY.resize()
    guidesX.resize()
  })
}
