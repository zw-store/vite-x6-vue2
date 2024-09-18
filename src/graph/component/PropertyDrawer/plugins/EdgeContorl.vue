<!--
 * Copyright ©
 * #
 * @author: zw
 * @date: 2024-09-10
 -->

<template>
  <ScrollPanel style="max-height: 400px">
    <el-descriptions title="标签" :column="2" :colon="false" :labelStyle="{ display: 'none' }">
      <template v-for="(item, index) in form.labels">
        <el-descriptions-item :key="index + '-text'">
          <el-form-item label="标签文字" class="my-0">
            <el-input v-model="item.attrs.text.text" @change="val => propertyLabelChange(index, 'attrs/text/text', val)" />
          </el-form-item>
        </el-descriptions-item>

        <el-descriptions-item :key="index + '-textFill'">
          <el-form-item label="字体颜色" class="my-0">
            <el-color-picker class="float-right" v-model="item.attrs.text.fill" @active-change="val => propertyLabelChange(index, 'attrs/text/fill', val)" />
          </el-form-item>
        </el-descriptions-item>
      </template>
    </el-descriptions>

    <el-descriptions title="线条" :column="2" :colon="false" :labelStyle="{ display: 'none' }">
      <el-descriptions-item>
        <el-form-item label="颜色" class="my-0">
          <el-color-picker class="float-right" v-model="form.line.stroke" @active-change="val => propertyChange('line/stroke', val)" />
        </el-form-item>
      </el-descriptions-item>

      <el-descriptions-item>
        <el-form-item label="线条宽度" class="my-0">
          <el-select class="float-right" v-model="form.line.strokeWidth" @change="val => propertyChange('line/strokeWidth', val)">
            <el-option v-for="item in StrokeWidth" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-descriptions-item>
    </el-descriptions>

    <el-descriptions title="箭头" :column="2" :colon="false" :labelStyle="{ display: 'none' }">
      <el-descriptions-item>
        <el-form-item class="my-0" label-width="0">
          <el-switch v-model="arrowMarker" active-value="targetMarker" inactive-value="sourceMarker" active-text="结束箭头" inactive-text="开始箭头" active-color="#67C23A" inactive-color="#409EFF" />
        </el-form-item>
      </el-descriptions-item>

      <el-descriptions-item>
        <el-form-item label="显示/隐藏" class="my-0">
          <el-switch v-model="markerForm.visibility" active-value="visible" inactive-value="hidden" @change="val => propertyChange('line/{targetMarker}/visibility', val)" />
        </el-form-item>
      </el-descriptions-item>

      <el-descriptions-item>
        <el-form-item label="箭头类型" class="my-0">
          <el-select class="float-right" v-model="markerForm.name" @change="val => propertyChange('line/{targetMarker}/name', val)">
            <el-option label="block" value="block"></el-option>
            <el-option label="classic" value="classic"></el-option>
            <el-option label="diamond" value="diamond"></el-option>
            <el-option label="cross" value="cross"></el-option>
            <el-option label="async" value="async"></el-option>
            <el-option label="circle" value="circle"></el-option>
            <el-option label="ellipse" value="ellipse"></el-option>
          </el-select>
        </el-form-item>
      </el-descriptions-item>

      <el-descriptions-item>
        <el-form-item label="封闭" class="my-0">
          <el-switch v-model="markerForm.open" @change="val => propertyChange('line/{targetMarker}/open', val)" />
        </el-form-item>
      </el-descriptions-item>

      <el-descriptions-item>
        <el-form-item label="颜色" class="my-0">
          <el-color-picker class="float-right" v-model="markerForm.fill" @active-change="val => propertyChange('line/{targetMarker}/fill', val)" />
        </el-form-item>
      </el-descriptions-item>

      <el-descriptions-item>
        <el-form-item label="边框颜色" class="my-0">
          <el-color-picker class="float-right" v-model="markerForm.stroke" @active-change="val => propertyChange('line/{targetMarker}/stroke', val)" />
        </el-form-item>
      </el-descriptions-item>

      <el-descriptions-item>
        <el-form-item label="宽度" class="my-0" v-if="['block', 'classic', 'diamond', 'cross', 'async'].includes(markerForm.name)">
          <el-slider class="w-36" v-model="markerForm.width" :min="0" :max="15" @input="val => propertyChange('line/{targetMarker}/width', val)" />
        </el-form-item>
      </el-descriptions-item>

      <el-descriptions-item>
        <el-form-item label="高度" class="my-0" v-if="['block', 'classic', 'diamond', 'cross', 'async'].includes(markerForm.name)">
          <el-slider class="w-36" v-model="markerForm.height" :min="0" :max="15" @input="val => propertyChange('line/{targetMarker}/height', val)" />
        </el-form-item>
      </el-descriptions-item>

      <el-descriptions-item :span="2" v-if="['classic', 'diamond', 'cross', 'block', 'async'].includes(this.markerForm.name)">
        <el-form-item label="偏移量" class="my-0">
          <el-slider class="w-36" v-model="markerForm.offset" :min="-30" :max="30" :marks="sliderMarks" @input="val => propertyChange('line/{targetMarker}/offset', val)" />
        </el-form-item>
      </el-descriptions-item>

      <el-descriptions-item :span="2" v-if="markerForm.name === 'ellipse'">
        <el-form-item label="水平半径" class="my-0">
          <el-slider class="w-36" v-model="markerForm.rx" :min="0" :max="30" :marks="sliderMarks" @input="val => propertyChange('line/{targetMarker}/rx', val)" />
        </el-form-item>
      </el-descriptions-item>

      <el-descriptions-item :span="2" v-if="markerForm.name === 'ellipse'">
        <el-form-item label="垂直半径" class="my-0">
          <el-slider class="w-36" v-model="markerForm.ry" :min="0" :max="30" :marks="sliderMarks" @input="val => propertyChange('line/{targetMarker}/ry', val)" />
        </el-form-item>
      </el-descriptions-item>

      <el-descriptions-item :span="2" v-if="markerForm.name === 'circle'">
        <el-form-item label="半径" class="my-0">
          <el-slider class="w-36" v-model="markerForm.radius" :min="0" :max="30" :marks="sliderMarks" @input="val => propertyChange('line/{targetMarker}/r', val)" />
        </el-form-item>
      </el-descriptions-item>

      <el-descriptions-item :span="2" v-if="markerForm.name === 'async'">
        <el-form-item label="翻卷" class="my-0">
          <el-switch v-model="markerForm.flip" @change="val => propertyChange('line/{targetMarker}/flip', val)" />
        </el-form-item>
      </el-descriptions-item>
    </el-descriptions>

    <el-descriptions title="路由" :column="2" :colon="false" :labelStyle="{ display: 'none' }">
      <el-descriptions-item>
        <el-form-item label="轨迹" class="my-0">
          <el-select size="mini" v-model="form.router.name" @change="val => routerChange('name', val)">
            <el-option value="normal" label="normal"></el-option>
            <el-option value="orth" label="orth"></el-option>
            <el-option value="oneSide" label="oneSide"></el-option>
            <el-option value="manhattan" label="manhattan"></el-option>
            <el-option value="metro" label="metro"></el-option>
            <el-option value="er" label="er"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="曲折弧度" class="my-0">
          <el-select v-model="form.router.args.padding" @change="val => routerChange('args/padding', val)">
            <el-option v-for="item in StrokeWidth" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-descriptions-item>
    </el-descriptions>
  </ScrollPanel>
</template>

<script>
import { FontSize, PredefineColors, FontFamily, PreStyle, StrokeWidth } from '../constant'
import { ORIGIN_STYLE_IN_SELECT } from '../../../types/enum_prop_properties'
import { transformInput } from '../../../utils/legacy'
import { cloneDeep } from '../../../utils'

export default {
  name: 'EdgeContorl',
  props: {
    nodeData: { required: true },
    form: { type: Object, default: () => ({}) },
    popupper: { type: Object, required: true },
  },
  model: { prop: 'popupper', event: 'input' },
  inject: ['owner', 'graph'],
  data() {
    return {
      NodeStyle: PreStyle.node,
      FontSize,
      PredefineColors,
      FontFamily,
      StrokeWidth,
      sliderMarks: { 0: { style: { color: '#1989FA' } } },
      arrowMarker: 'targetMarker',
      timer: null,
    }
  },
  mounted() {
    if (this.nodeData) {
      const property = this.nodeData.getProp(ORIGIN_STYLE_IN_SELECT)
      if (property) {
        // 边的样式还原到没有被选中的状态
        this.nodeData.attr('line', property, { overwrite: true })
        // 由于属性被重置，需要重新获取
        const attr = this.nodeData.getAttrs()
        Object.assign(this.form, attr)
      }
    }
  },

  methods: {
    propertyChange(property, value) {
      // TODO: 这里使用事务，当时从事件流程上好像没有什么用，后期再调整
      this.graph.value.startBatch('properties-update')
      const barbecue = property.replace(/\{(.*)\}/, this.arrowMarker)
      this.$emit('property-change', barbecue, value)
      this.graph.value.stopBatch('properties-update')
    },
    propertyLabelChange(index, property, value) {
      // https://github.com/antvis/X6/issues/4440
      const originLabel = cloneDeep(this.nodeData.getLabelAt(index))
      const label = Object.assign(originLabel, transformInput(property, value))
      this.nodeData.setLabelAt(index, label)
    },
    routerChange(property, value) {
      const barbecue = property.replace(/\//g, '.')

      this.nodeData.setRouter({ [barbecue]: value })
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
    markerForm() {
      return this.arrowMarker === 'targetMarker' ? this.form.line.targetMarker : this.form.line.sourceMarker
    },
  },
  //  End
}
</script>

<style lang="css" scoped></style>
