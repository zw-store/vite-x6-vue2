<!--
 * Copyright ©
 * #
 * @author: zw
 * @date: 2024-04-25
 -->

<template>
  <div class="container">
    <div class="space">
      <div class="header">
        <svg-icon icon-class="secure" />
        <div class="ml-5 text-sm line-clamp-2" style="color: #fff">安审接入平台信息</div>
      </div>

      <div class="body">
        <div class="filler">
          <div class="divide-left">
            <div class="label">成功率</div>
            <div class="value">12%</div>
          </div>

          <div class="divide-middle">
            <div class="label">耗时</div>
            <div class="value">112</div>
          </div>

          <div class="divide-right">
            <div class="label">错误量</div>
            <div class="value">112</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//  import {} from ''
export default {
  name: 'vue-proportion',
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
  .space {
    height: 100%;
    padding: 4px;
    box-sizing: border-box;
    .header {
      height: #{$header-height};
      background: #5b8ff9;
      border-radius: 4px 4px 0 0;
      display: flex;
      align-items: center;
      padding-left: 1em;
    }
    .body {
      width: 100%;
      height: calc(100% - #{$header-height});
      border: 1px solid #5b8ff9;
      border-radius: 0 0 4px 4px;
      box-sizing: border-box;
      .filler {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        padding: 2px 4px;
        box-sizing: border-box;
        background: #c6e5ff;
        .divide-left,
        .divide-middle,
        .divide-right {
          flex: 1;
          text-align: center;
          margin: auto 0;
          .label {
            font-size: 12px;
            color: #5b8ff9;
          }
          .value {
            font-size: 16px;
            color: #5b8ff9;
          }
        }
      }
    }
  }
}
</style>
