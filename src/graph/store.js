import { computed, reactive } from '@vue/composition-api'

const state = reactive({
  graph: null,
  stencil: null,
  minimap: null,
  dnd: null,
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

export const useGraph = new UseGraph()
export const useStencil = new UseStencil()
export const useMiniMap = new UseMiniMap()
export const useDnd = new UseDnd()
