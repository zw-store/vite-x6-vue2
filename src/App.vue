<!--
 * Copyright ©
 * #
 * @author: zw
 * @date: 2024-04-19
 -->

<template>
  <div class="layout">
    <div class="stencil" ref="stencil"></div>

    <PropertyDrawer></PropertyDrawer>
    <ContextMenu ref="contextmenu"> </ContextMenu>

    <div class="main">
      <ToolBar></ToolBar>

      <div ref="graph-x6" class="graph-main-container" />

      <div class="graph-area-map-panel">
        <div ref="minimap"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { initGraph, initDefaultData } from '@/graph'
import { ContextMenu, ToolBar, PropertyDrawer } from '@/graph/component'

export default {
  name: 'x6',
  components: { ToolBar, PropertyDrawer, ContextMenu },
  mounted() {
    initGraph({
      el: this.$refs['graph-x6'],
      stencil: this.$refs.stencil,
      minimap: this.$refs.minimap,
      contextmenu: this.$refs.contextmenu,
    })
    initDefaultData([], [])
  },
  methods: {},

  //  End
}
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 380px 1fr;
  grid-auto-rows: 1fr;
  position: relative;
  .stencil {
    position: relative;
    background: #fff;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  }
  .main {
    position: relative;
    .graph-main-container {
      width: 100%;
      height: 100%;
    }
    .graph-area-map-panel {
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
}
</style>
