import { useGuides } from '../store'
import { throttleCache } from '../utils'

export default graph => {
  const { guidesX, guidesY } = useGuides
  const scroller = graph.getPlugin('scroller')
  let scale = 1

  graph.on('scale', e => {
    const { sx, sy, _ox, _oy } = e
    scale = sx / sy
    guidesX.value.zoomTo(sx)
    guidesY.value.zoomTo(sy)
    // TODO: 画布缩放是以中心为基准，当缩放时 scroll 值需要重新计算，当时没有参照物，暂时不处理
  })

  graph.on('blank:mousedown', _ => {
    const mousemove = e => {
      const { pageX, pageY } = e
      const { x: rx, y: ry } = throttleCache('containerBoundingRect', () => scroller.container.getBoundingClientRect())
      const { x, y } = graph.pageToLocal(pageX, pageY)

      const scrollX = -(pageX - x - rx)
      const scrollY = -(pageY - y - ry)

      guidesX.value.scroll(scrollX)
      guidesX.value.scrollGuides(scrollY)

      guidesY.value.scroll(scrollY)
      guidesY.value.scrollGuides(scrollX)
    }

    const mouseup = () => {
      document.body.removeEventListener('mousemove', mousemove)
      document.body.removeEventListener('mouseup', mouseup)
    }

    document.body.addEventListener('mousemove', mousemove)
    document.body.addEventListener('mouseup', mouseup)
  })
}
