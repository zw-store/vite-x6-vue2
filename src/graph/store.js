import { computed, reactive } from '@vue/composition-api'

const state = reactive({
  graph: null,
  stencil: null,
  minimap: null,
  dnd: null,
  guidesX: null,
  guidesY: null,
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

class UseGuides {
  constructor() {
    this.guidesX = computed(() => state.guidesX)
    this.guidesY = computed(() => state.guidesY)
  }

  setItem({ guidesX, guidesY }) {
    state.guidesX = guidesX
    state.guidesY = guidesY
  }
}

export const useGraph = new UseGraph()
export const useStencil = new UseStencil()
export const useMiniMap = new UseMiniMap()
export const useDnd = new UseDnd()
export const useGuides = new UseGuides()
