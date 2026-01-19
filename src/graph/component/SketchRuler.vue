<!--
 * Sketch Ruler Component
 * 基于 vue-sketch-ruler 封装的标尺组件
 * 支持画布缩放和滚动同步
 -->
<template>
  <div class="sketch-ruler-wrapper">
    <SketchRule :thick="thick" :scale="scale" :width="canvasWidth" :height="canvasHeight" :startX="startX" :startY="startY" :lines="lines" :palette="palette" @handleLine="handleLine" @onCornerClick="handleCornerClick" />
  </div>
</template>

<script>
import SketchRule from 'vue-sketch-ruler'

export default {
  name: 'SketchRuler',
  components: { SketchRule },
  props: {
    // 标尺厚度
    thick: {
      type: Number,
      default: 30,
    },
    // 画布宽度
    canvasWidth: {
      type: Number,
      default: 1920,
    },
    // 画布高度
    canvasHeight: {
      type: Number,
      default: 1080,
    },
    // 缩放比例
    scale: {
      type: Number,
      default: 1,
    },
    // 起始 X 坐标
    startX: {
      type: Number,
      default: 0,
    },
    // 起始 Y 坐标
    startY: {
      type: Number,
      default: 0,
    },
    // 参考线数据
    lines: {
      type: Object,
      default: () => ({
        h: [], // 水平参考线
        v: [], // 垂直参考线
      }),
    },
    // 调色板配置
    palette: {
      type: Object,
      default: () => ({
        bgColor: '#3e4e5b', // 标尺背景颜色
        longfgColor: '#999', // 长刻度线颜色
        shortfgColor: '#777', // 短刻度线颜色
        fontColor: '#fff', // 文字颜色
        shadowColor: '#18a058', // 参考线阴影颜色
        lineColor: '#18a058', // 参考线颜色
        borderColor: '#3e4e5b', // 边框颜色
        cornerActiveColor: '#fff', // 角落激活颜色
      }),
    },
  },
  methods: {
    // 参考线变化回调
    handleLine(lines) {
      this.$emit('update:lines', lines)
      this.$emit('handleLine', lines)
    },
    // 角落点击回调
    handleCornerClick() {
      this.$emit('onCornerClick')
    },
  },
}
</script>

<style scoped>
/* 标尺容器样式 - 绝对定位覆盖在画布上方 */
.sketch-ruler-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
}

/* 只允许标尺区域（水平和垂直标尺条）接收鼠标事件 */
.sketch-ruler-wrapper >>> .ruler,
.sketch-ruler-wrapper >>> .h-container,
.sketch-ruler-wrapper >>> .v-container,
.sketch-ruler-wrapper >>> .corner,
.sketch-ruler-wrapper >>> .lines {
  pointer-events: auto;
}
</style>
