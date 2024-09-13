<!--
 * Copyright ©
 * #
 * @author: zw
 * @date: 2024-09-06
 -->

<template>
  <ScrollPanel style="max-height: 400px">
    <el-descriptions title="字体" :column="2" :colon="false" :labelStyle="{ display: 'none' }">
      <el-descriptions-item :span="2">
        <el-form-item label="文本内容" class="my-0">
          <el-input class="!w-96" v-model="form.label.text" size="mini" @blur="val => propertyChange('label/text', form.label.text)" />
        </el-form-item>
      </el-descriptions-item>

      <el-descriptions-item>
        <el-form-item label="字体大小" class="my-0">
          <el-popover v-model="ownerPopupper.fontSize" trigger="manual" placement="bottom">
            <template #reference>
              <p class="text-center float-right color-picker" @click="ownerPopupper.fontSize = true">{{ form.label.fontSize }}</p>
            </template>

            <template #default>
              <ul>
                <template v-for="item in FontSize">
                  <li class="text-xs font-semibold px-1 hover:bg-gray-400 hover:text-white cursor-pointer" :key="item.value" @click="propertyChange('label/fontSize', item.value)">字号：{{ item.label }}</li>
                </template>
              </ul>
            </template>
          </el-popover>
        </el-form-item>
      </el-descriptions-item>

      <el-descriptions-item>
        <el-form-item label="文本颜色" class="my-0">
          <el-color-picker class="float-right" v-model="form.label.fill" @active-change="val => propertyChange('label/fill', val)"></el-color-picker>
        </el-form-item>
      </el-descriptions-item>

      <el-descriptions-item :span="2">
        <el-form-item label="字体位置" class="my-0">
          <div class="float-right text-center">
            <svg-icon class-name="color-picker ml-1 cursor-pointer" :class="{ active: form.label.textAnchor === 'start' }" icon-class="arrow-right" @click.native="propertyChange('label/textAnchor', 'start')"></svg-icon>
            <svg-icon class-name="color-picker ml-1 cursor-pointer" :class="{ active: form.label.textAnchor === 'end' }" icon-class="arrow-left" @click.native="propertyChange('label/textAnchor', 'end')"></svg-icon>
            <svg-icon class-name="color-picker ml-1 cursor-pointer" :class="{ active: form.label.textAnchor === 'middle' }" icon-class="arrow-middle" @click.native="propertyChange('label/textAnchor', 'middle'), propertyChange('label/textVerticalAnchor', 'middle')"></svg-icon>
            <svg-icon class-name="color-picker ml-1 cursor-pointer" :class="{ active: form.label.textVerticalAnchor === 'top' }" icon-class="arrow-top" @click.native="propertyChange('label/textVerticalAnchor', 'top')"></svg-icon>
            <svg-icon class-name="color-picker ml-1 cursor-pointer" :class="{ active: form.label.textVerticalAnchor === 'bottom' }" icon-class="arrow-bottom" @click.native="propertyChange('label/textVerticalAnchor', 'bottom')"></svg-icon>
          </div>
        </el-form-item>
      </el-descriptions-item>

      <el-descriptions-item :span="2">
        <el-form-item label="字体样式" class="my-0">
          <el-select class="w-96" v-model="form.label.fontFamily" @change="val => propertyChange('label/fontFamily', val)" placeholder="请选择字体" clearable>
            <el-option v-for="item in FontFamily" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
      </el-descriptions-item>

      <el-descriptions-item>
        <el-form-item label="refX" class="my-0">
          <el-slider class="w-36" v-model="form.label.refX" :min="-100" :max="100" :marks="sliderMarks" @input="val => propertyChange('label/refX', val)" />
        </el-form-item>
      </el-descriptions-item>

      <el-descriptions-item>
        <el-form-item label="refY" class="my-0">
          <el-slider class="w-36" v-model="form.label.refY" :min="-100" :max="100" :marks="sliderMarks" @input="val => propertyChange('label/refY', val)" />
        </el-form-item>
      </el-descriptions-item>

      <el-descriptions-item :span="2">
        <el-form-item label="文字显示" class="my-0">
          <el-switch v-model="form.label.visible" active-value="hidden" inactive-value="visible" @change="val => propertyChange('label/visibility', val)"></el-switch>
        </el-form-item>
      </el-descriptions-item>
    </el-descriptions>

    <el-descriptions title="形状" :column="2" :colon="false" :labelStyle="{ display: 'none' }">
      <el-descriptions-item>
        <el-form-item label="填充颜色" class="my-0">
          <el-color-picker class="float-right" v-model="form.body.fill" @active-change="val => propertyChange('body/fill', val)"></el-color-picker>
        </el-form-item>
      </el-descriptions-item>

      <el-descriptions-item>
        <el-form-item label="边框颜色" class="my-0">
          <el-color-picker class="float-right" color-format="hex" v-model="form.body.stroke" @active-change="val => propertyChange('body/stroke', val)"></el-color-picker>
        </el-form-item>
      </el-descriptions-item>

      <el-descriptions-item :span="2">
        <el-form-item label="边框宽度" class="my-0">
          <el-select v-model="form.body.strokeWidth" placeholder="描边宽度" @change="val => propertyChange('body/strokeWidth', val)">
            <el-option v-for="item in StrokeWidth" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-descriptions-item>

      <el-descriptions-item :span="2">
        <el-form-item label="背景显示" class="my-0">
          <el-switch v-model="form.body.visible" active-value="hidden" inactive-value="visible" @change="val => propertyChange('body/visibility', val)"></el-switch>
        </el-form-item>
      </el-descriptions-item>
    </el-descriptions>

    <el-descriptions title="图标" :column="2" :colon="false" :labelStyle="{ display: 'none' }">
      <el-descriptions-item>
        <el-form-item label="图标" class="my-0">
          <el-select v-model="form.svg.href" placeholder="请选择图标" @change="val => propertyChange('svg/href', val)">
            <el-option v-for="item in SVGResource" :key="item.value" :label="item.label" :value="item.value">
              <svg-icon :icon-class="item.label" />
              <span class="ml-2">{{ item.label }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-descriptions-item>

      <el-descriptions-item>
        <el-form-item label="颜色" class="my-0">
          <el-color-picker class="float-right" v-model="form.svg.fill" @active-change="val => propertyChange('svg/fill', val)"></el-color-picker>
        </el-form-item>
      </el-descriptions-item>

      <el-descriptions-item>
        <el-form-item label="refX" class="my-0">
          <el-slider class="w-36" v-model="form.svg.refX" :min="-100" :max="100" :marks="sliderMarks" @input="val => propertyChange('svg/refX', val)" />
        </el-form-item>
      </el-descriptions-item>

      <el-descriptions-item>
        <el-form-item label="refY" class="my-0">
          <el-slider class="w-36" v-model="form.svg.refY" :min="-100" :max="100" :marks="sliderMarks" @input="val => propertyChange('svg/refY', val)" />
        </el-form-item>
      </el-descriptions-item>

      <el-descriptions-item :span="2">
        <el-form-item label="图标显示" class="my-0">
          <el-switch v-model="form.svg.visible" active-value="hidden" inactive-value="visible" @change="val => propertyChange('svg/visibility', val)"></el-switch>
        </el-form-item>
      </el-descriptions-item>
    </el-descriptions>

    <el-descriptions title="预设样式" :column="6" :colon="false" :labelStyle="{ display: 'none' }">
      <template v-for="(item, index) in NodeStyle">
        <el-descriptions-item :key="index" contentClassName="mx-4">
          <el-tooltip :content="item.fill" placement="left-end">
            <div class="w-12 h-5 cursor-pointer" :style="{ backgroundColor: item.fill, 'border-color': item.stroke }" @click="propertyChange('body/fill', item.fill), propertyChange('body/stroke', item.stroke), propertyChange('label/fill', item.textFill), propertyChange('body/strokeWidth', item.strokeWidth)"></div>
          </el-tooltip>
        </el-descriptions-item>
      </template>
    </el-descriptions>
  </ScrollPanel>
</template>

<script>
import { FontSize, PredefineColors, FontFamily, PreStyle, StrokeWidth } from '../constant'
import { SVGResource } from '../../../shape/element/svg'

export default {
  name: 'SVGContorl',
  props: {
    nodeData: { required: true },
    form: { type: Object, default: () => ({}) },
    popupper: { type: Object, required: true },
  },
  model: { prop: 'popupper', event: 'input' },
  inject: ['owner', 'graph'],
  data() {
    return {
      SVGResource: SVGResource.map(item => ({ label: item.name, value: `#icon-${item.name}` })),
      NodeStyle: PreStyle.node,
      FontSize,
      PredefineColors,
      FontFamily,
      StrokeWidth,
      sliderMarks: { 0: { style: { color: '#1989FA' } } },
    }
  },

  methods: {
    propertyChange(property, value) {
      // TODO: 这里使用事务，当时从事件流程上好像没有什么用，后期再调整
      this.graph.value.startBatch('properties-update')
      this.$emit('property-change', property, value)
      this.graph.value.stopBatch('properties-update')
    },
  },
  computed: {
    ownerPopupper: {
      get() {
        return this.popupper
      },
      set(val) {
        this.owner.resetpopup()
        this.$emit('input', val)
      },
    },
  },

  //  End
}
</script>

<style lang="scss" scoped>
.color-picker {
  display: inline-block;
  width: 28px;
  height: 28px;
  border: 1px solid #e6e6e6;
  line-height: 28px;
}
.active {
  background-color: #f0f0f0;
  color: #409eff !important;
}
</style>
