<!--
 * Copyright ©
 * #
 * @author: zw
 * @date: 2024-07-11
 -->

<template>
  <div class="container">
    <el-progress type="circle" :percentage="30" :width="100"></el-progress>
  </div>
</template>

<script>
//  import {} from ''
export default {
  name: 'vue-card',
  data() {
    return {}
  },

  mounted() {},

  methods: {},
  //  End
}
</script>

<style lang="scss" scoped>
.container {
  $header-height: 34px;
  width: 100%;
  height: 100%;
  background: #c6e5ff;
  border-radius: 4px;
  overflow: hidden;
  text-align: center;
  .space {
    height: 100%;
    padding: 4px;
    box-sizing: border-box;
  }
}
</style>
