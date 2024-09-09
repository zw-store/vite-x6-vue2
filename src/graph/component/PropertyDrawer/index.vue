<!--
 * Copyright ©
 * #
 * @author: zw
 * @date: 2022-04-13
 -->

<template>
  <el-drawer v-drag:classList="{ head: 'el-drawer__header', wrap: 'el-drawer__container' }" :visible.sync="visible" direction="ltr" :withHeader="true" size="100%" :modal-append-to-body="true" :show-close="false" :close-on-press-escape="false" :modal="false" :wrapperClosable="false" @close="closeChange">
    <template #title>
      <el-alert v-if="visible" class="select-none" show-icon type="info" :closable="true" effect="dark" :title="panelTitle" :description="panelTip" @close="visible = false" />
    </template>

    <el-card class="h-full" :body-style="{ height: '100%' }">
      <el-form ref="form" label-width="80px" size="mini">
        <NodeContorl v-if="nodeData && nodeType === 'base-node'" v-bind="{ nodeData, form, popupper }" @property-change="propertyChange"></NodeContorl>

        <SVGContorl v-if="nodeData && nodeType === 'svg-node'" v-bind="{ nodeData, form, popupper }" @property-change="propertyChange"></SVGContorl>

        <ComboContorl v-if="nodeData && nodeType === 'combo-node'" v-bind="{ nodeData, form, popupper }" @property-change="propertyChange"></ComboContorl>
      </el-form>
    </el-card>
  </el-drawer>
</template>

<script>
import { Channel } from '../../utils/transmit'
import { ON_PROPERTY_DRAWER, OFF_PROPERTY_DRAWER } from '../../types/enum_drawer_dispatch'
import { NODE_CLICK } from '../../types/enum_base_event'
import NodeContorl from './plugins/NodeContorl'
import SVGContorl from './plugins/SVGContorl'
import ComboContorl from './plugins/ComboContorl'
import { isEmpty } from '../../utils'

export default {
  name: 'PropertyDrawer',
  components: { NodeContorl, SVGContorl, ComboContorl },
  data() {
    return {
      visible: false,
      panelTitle: '',
      panelTip: '',
      nodeType: '',
      nodeData: null,
      form: {},
      popupper: {
        fontSize: false,
      },
    }
  },
  provide: {
    owner: this,
  },

  mounted() {
    Channel.listener(OFF_PROPERTY_DRAWER, _ => (this.visible = false))
    Channel.listener(ON_PROPERTY_DRAWER, _ => (this.visible = true))

    Channel.listener(NODE_CLICK, node => {
      this.nodeType = node.getProp('nodeType')
      this.form = node.getAttrs()
      this.nodeData = node
      this.visible = true
    })
  },

  methods: {
    closeChange() {
      this.nodeData = null
      this.$data.form = this.$options.data().form
    },
    resetpopup() {
      this.$data.popupper = this.$options.data().popupper
    },
    propertyChange(property, value) {
      if (isEmpty(this.nodeData)) return

      switch (property) {
        case 'label/text':
          this.nodeData.attr('label/text', value)
          break

        case 'label/fontSize':
          this.nodeData.attr('label/fontSize', value)
          this.form.label.fontSize = value
          this.resetpopup()
          break

        case 'label/fill':
          this.nodeData.attr('label/fill', value)
          this.form.label.fill = value
          break

        case 'label/fontFamily':
          this.nodeData.attr('label/fontFamily', value)
          this.form.label.fontFamily = value
          break

        case 'label/textAnchor':
          this.nodeData.attr('label/textAnchor', value)
          this.form.label.textAnchor = value
          break

        case 'label/textVerticalAnchor':
          this.nodeData.attr('label/textVerticalAnchor', value)
          this.form.label.textVerticalAnchor = value
          break

        case 'label/refX':
          this.nodeData.attr('label/refX', value)
          this.form.label.refX = value
          break

        case 'label/refY':
          this.nodeData.attr('label/refY', value)
          this.form.label.refY = value
          break

        case 'label/visibility':
          this.nodeData.attr('label/visibility', value)
          this.form.label.visibility = value
          break

        case 'body/fill':
          this.nodeData.attr('body/fill', value)
          this.form.body.fill = value
          break

        case 'body/stroke':
          this.nodeData.attr('body/stroke', value)
          this.form.body.stroke = value
          break

        case 'body/strokeWidth':
          this.nodeData.attr('body/strokeWidth', value)
          this.form.body.strokeWidth = value
          this.resetpopup()
          break

        case 'body/visibility':
          this.nodeData.attr('body/visibility', value)
          this.form.body.visibility = value
          this.resetpopup()
          break

        case 'svg/href':
          this.nodeData.setAttrs({
            'svg/href': value,
            'svg/xlink:href': value,
          })
          this.form.svg.href = value
          break

        case 'svg/fill':
          this.nodeData.attr('svg/fill', value)
          this.form.svg.fill = value
          break

        case 'svg/refX':
          this.nodeData.attr('svg/refX', value)
          this.form.svg.refX = value
          break

        case 'svg/refY':
          this.nodeData.attr('svg/refY', value)
          this.form.svg.refY = value
          break

        case 'svg/visibility':
          this.nodeData.attr('svg/visibility', value)
          this.form.svg.visibility = value
          break

        default:
          break
      }
    },
  },

  directives: {
    drag: {
      bind(el, binding, vnode, oldVnode) {
        vnode.context.$nextTick(() => {
          const { direction = 'rtl' } = el.__vue__ || {}

          let { head, wrap } = binding.value || {}

          !head && (head = 'el-dialog__header')
          !wrap && (wrap = 'el-dialog')

          const HeaderEl = el.querySelector('.' + head)
          const dragDom = el.querySelector('.' + wrap)

          if (!HeaderEl && !dragDom) throw new Error('DOM not found')
          HeaderEl.style.cursor = 'move'
          HeaderEl.style.userSelect = 'none'
          // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
          const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null)
          let width = dragDom.style.width

          if (width.includes('%')) {
            width = +document.body.clientWidth * (parseInt(width, 10) / 100)
          } else {
            width = parseInt(width || 0, 10) || el.querySelector('.el-drawer').getBoundingClientRect().width
          }

          dragDom.style.position = 'absolute'

          const directions = {
            rtl: { right: '0%', top: '5%' },
            ltr: { left: '0%', top: '5%' },
            ttb: { top: '0%', left: '50%' },
            btt: { bottom: '0%', left: '50%' },
          }

          for (const key in directions) {
            if (direction !== key) continue
            const item = directions[key]

            for (const k in item) {
              dragDom.style[k] = `calc(${item[k]} + 10px)`
            }
          }
          // dragDom.style.top = `150px`
          // dragDom.style.left = 1285 + 'px'

          // if (head.includes('dialog')) {
          //   dragDom.style.marginTop = 0
          //   dragDom.style.left = `${(document.body.clientWidth - width) / 2}px`
          // }

          HeaderEl.onmousedown = e => {
            // 鼠标按下，计算当前元素距离可视区的距离 (鼠标点击位置距离可视窗口的距离)
            const disX = e.clientX - HeaderEl.offsetLeft
            const disY = e.clientY - HeaderEl.offsetTop

            let styL, styT // 获取到的值带px 正则匹配替换

            if (sty.left.includes('%')) {
              // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
              styL = +document.body.clientWidth * (parseInt(sty.left, 10) / 100)
              styT = +document.body.clientHeight * (parseInt(sty.top, 10) / 100)
            } else {
              styL = parseInt(sty.left, 10)
              styT = parseInt(sty.top, 10)
            }

            document.onmousemove = ev => {
              // 通过事件委托，计算移动的距离 （开始拖拽至结束拖拽的距离）
              const l = ev.clientX - disX
              const t = ev.clientY - disY
              let finallyL = l + styL
              let finallyT = t + styT
              const left = -(dragDom.clientWidth - dragDom.clientWidth / 10)
              const right = document.body.clientWidth - dragDom.clientWidth / 10
              const bottom = document.body.clientHeight - dragDom.clientWidth / 10

              finallyL = finallyL < left ? left : finallyL
              finallyL = finallyL > right ? right : finallyL
              finallyT = finallyT < 0 ? 0 : finallyT
              finallyT = finallyT > bottom ? bottom : finallyT
              // 移动当前元素
              dragDom.style.left = `${finallyL}px`
              dragDom.style.top = `${finallyT}px`
            }

            document.onmouseup = function (e) {
              document.onmousemove = null
              document.onmouseup = null
            }
          }
        })
      },
    },
  },
  //  End
}
</script>

<style lang="scss" scoped>
.el-drawer__wrapper {
  user-select: none;
  pointer-events: none;
  ::v-deep {
    .el-drawer__container {
      pointer-events: auto;
      width: 30%;
      left: unset;
      right: unset;
      bottom: unset;
      height: unset;
      .el-drawer {
        height: unset;
        bottom: unset;
        .el-drawer__header {
          margin-bottom: 16px;
        }
      }
      .el-alert__description {
        line-height: 25px;
        margin: 0;
      }
    }
  }
}
</style>
