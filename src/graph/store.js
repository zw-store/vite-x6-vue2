import { computed, reactive } from '@vue/composition-api'

const state = reactive({
  graph: null,
  stencil: null,
  minimap: null,
  dnd: null,
  // 标尺状态
  rulerState: {
    scale: 1,
    startX: 0,
    startY: 0,
    lines: {
      h: [],
      v: [],
    },
    canvasWidth: 1920,
    canvasHeight: 1080,
  },
})

class UseGraph {
  constructor() {
    this.graph = computed(() => state.graph)
  }

  setItem(graph) {
    state.graph = graph
  }
}

class UseStencil {
  constructor() {
    this.stencil = computed(() => state.stencil)
  }

  setItem(stencil) {
    state.stencil = stencil
  }
}

class UseMiniMap {
  constructor() {
    this.minimap = computed(() => state.minimap)
  }

  setItem(minimap) {
    state.minimap = minimap
  }
}

class UseDnd {
  constructor() {
    this.dnd = computed(() => state.dnd)
  }

  setItem(dnd) {
    state.dnd = dnd
  }
}

class UseRuler {
  constructor() {
    this.rulerState = computed(() => state.rulerState)
  }

  updateScale(scale) {
    state.rulerState.scale = scale
  }

  updateScroll(startX, startY) {
    state.rulerState.startX = startX
    state.rulerState.startY = startY
  }

  updateLines(lines) {
    state.rulerState.lines = lines
  }

  updateCanvasSize(width, height) {
    state.rulerState.canvasWidth = width
    state.rulerState.canvasHeight = height
  }
}

export const useGraph = new UseGraph()
export const useStencil = new UseStencil()
export const useMiniMap = new UseMiniMap()
export const useDnd = new UseDnd()
export const useRuler = new UseRuler()
