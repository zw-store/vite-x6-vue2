<template>
  <div class="toolbar" v-calcul-left v-drag>
    <el-tooltip :value="markerVisible" effect="dark" slot="prefix" content="按住此处可进行拖移" placement="right" :disabled="!markerVisible">
      <span class="marker" />
    </el-tooltip>

    <ul class="component-toolbar !z-20" v-search>
      <li class="component-toolbar-item">
        <el-button type="text" size="mini">
          <svg-icon icon-class="search" />
        </el-button>
      </li>

      <li class="input-wrap" :style="{ height: search.stack.length <= 0 ? '40px' : '65px' }">
        <el-form @submit.native.prevent>
          <el-form-item class="m-0">
            <el-input ref="ElInput" v-model="search.keywords" placeholder="请输入检索条件" clearable @keyup.enter.native="searchHandler" @clear="$data.search = $options.data().search">
              <el-tooltip effect="dark" slot="prefix" content="折叠" placement="bottom-end">
                <el-button size="mini" class="h-full" type="text" icon="el-icon-arrow-left" @click="closed" />
              </el-tooltip>

              <template #append>
                <el-button size="mini" type="primary" @click="searchHandler">搜索</el-button>
              </template>
            </el-input>

            <div class="counter">
              <p>第{{ search.step + 1 }}项，共{{ search.stack.length }}项</p>

              <p class="btn-control" v-show="search.stack.length > 1">
                <el-button type="text" size="mini" class="pt-0 pb-2" @click="selectItem('prev')">上一个</el-button>
                <el-button type="text" size="mini" class="pt-0 pb-2" @click="selectItem('next')">下一个</el-button>
              </p>
            </div>
          </el-form-item>
        </el-form>
      </li>
    </ul>

    <ul class="component-toolbar" v-for="(list, ii) in group" :key="ii">
      <li v-for="(item, index) in list" :key="index" class="component-toolbar-item">
        <el-tooltip effect="dark" :content="item.label" placement="bottom-end">
          <el-button type="text" @click="handleClick(item)" :disabled="calculDisabled(item)">
            <svg-icon :icon-class="item.icon"></svg-icon>
          </el-button>
        </el-tooltip>
      </li>
    </ul>
  </div>
</template>

<script>
import { expandAnimate, shrinkAnimate, validValueByLoop } from '../utils'
import { fullScreen } from '../utils/fullScreen'
import { useGraph } from '../store'
import { onPaste, selectAll, deleteCells } from '../events/keyboard'
import { clean, zoomIn, zoomOut } from '../functions'

export default {
  name: 'toolBar',
  data() {
    return {
      markerVisible: true,
      search: {
        keywords: '',
        step: 0,
        stack: [],
      },
      group: [
        [
          { code: 'undo', icon: 'undo', label: '撤销' },
          { code: 'redo', icon: 'redo', label: '重做' },
        ],
        [
          { code: 'zoomIn', icon: 'zoom-in', label: '放大' },
          { code: 'zoomOut', icon: 'zoom-out', label: '缩小' },
          { code: 'fitView', icon: 'fit-view', label: '适应画布' },
        ],
        [
          { code: 'copy', icon: 'copy', label: '复制' },
          { code: 'select-all', icon: 'select-all', label: '全选' },
        ],
        [
          { code: 'remove', icon: 'remove', label: '删除' },
          { code: 'clear', icon: 'clear', label: '清除画布' },
        ],

        [{ code: 'fullScreen', icon: 'full-screen', label: '全屏' }],
      ],
    }
  },

  props: {
    zoomSensitivity: { type: Number, default: 2 },
  },

  mounted() {
    setTimeout(() => (this.markerVisible = false), 3000)
  },

  methods: {
    handleClick(item) {
      const { graph } = useGraph

      switch (item.code) {
        case 'undo':
          graph.value.undo()
          break

        case 'redo':
          graph.value.redo()
          break

        case 'zoomIn':
          zoomIn()
          break

        case 'zoomOut':
          zoomOut()
          break

        case 'fitView':
          graph.value.centerContent()
          break

        case 'remove':
          deleteCells(graph)
          break

        case 'clear':
          clean(graph)
          break

        case 'copy':
          onPaste(graph)
          break

        case 'select-all':
          selectAll(graph)
          break

        case 'fullScreen':
          {
            const container = graph.value.container
            const parent = container.parentNode.parentNode.parentNode

            fullScreen(parent)
          }

          break

        default:
          break
      }
    },

    fitView() {},

    closed() {
      this.$refs.ElInput.clear()
      this.$emit('closed')
    },

    searchHandler() {
      const { search } = this

      search.stack = []

      if (!search.stack.length) return
      // ...other code
    },

    selectItem(action) {
      const { search } = this

      search.step = validValueByLoop(action === 'prev' ? (search.step -= 1) : (search.step += 1), 0, search.stack.length - 1)
      this.focusItem(search.stack[search.step])
    },

    focusItem(node) {},
  },

  computed: {
    calculDisabled() {
      return item => {
        const { graph } = useGraph

        if (!graph.value) return false

        // const undoStack = graph.value.getUndoStack()
        // if (item.code === 'undo') return !undoStack.length
        // const redoStack = graph.value.getRedoStack()
        // if (item.code === 'redo') return !redoStack.length

        return false
      }
    },
  },

  directives: {
    drag: {
      bind(el, _binding, _vnode) {
        const marker = el.querySelector('.marker')
        const siblings = Array.from(el.children).filter(item => item !== marker)

        let func = () => {}

        marker.addEventListener(
          'mousedown',
          ev => {
            ev.preventDefault()
            siblings.forEach(item => (item.style.pointerEvents = 'none'))
            document.addEventListener('mousemove', mousemove.call(null, ev), false)
            document.addEventListener('mouseup', mouseup, false)
          },
          false,
        )

        function mousemove(ev) {
          const disX = ev.clientX - el.offsetLeft
          const disY = ev.clientY - el.offsetTop

          func = e => {
            let dx, dy

            dx = e.clientX - disX
            if (dx <= 0) dx = 0
            if (dx >= el.parentNode.offsetWidth - (el.offsetWidth || 100)) dx = el.parentNode.offsetWidth - (el.offsetWidth || 100)
            dy = e.clientY - disY
            if (dy <= 0) dy = 0
            if (dy >= el.parentNode.offsetHeight - (el.offsetHeight || 45)) dy = el.parentNode.offsetHeight - (el.offsetHeight || 45)
            el.style.top = dy + 'px'
            el.style.left = dx + 'px'
          }

          return func
        }

        function mouseup(e) {
          siblings.forEach(item => (item.style.pointerEvents = 'auto'))
          document.removeEventListener('mousemove', func)
          document.removeEventListener('mouseup', mouseup)
        }
      },
    },
    search: {
      bind(el, binding, vnode) {
        const btn = el.querySelector('.el-button')
        const inputContainer = el.querySelector('.input-wrap')
        let isExpand = false
        let speed = false

        vnode.context.$on('closed', () => {
          if (speed) return
          speed = true
          shrinkAnimate({
            duration: 300,
            callback(rate) {
              inputContainer.style.width = `${360 * rate}px`
            },
            finish() {
              inputContainer.style.width = '0px'
              inputContainer.style.border = 'none'
              inputContainer.style.boxShadow = 'none'
              const input = vnode.context.$refs.ElInput

              input && input.blur()
              speed = false
            },
          })
          isExpand = false
        })

        btn.addEventListener(
          'click',
          e => {
            e.stopPropagation()
            if (speed) return
            isExpand = true
            speed = true
            expandAnimate({
              duration: 300,
              callback(rate) {
                inputContainer.style.width = `${360 * rate}px`
                inputContainer.style.border = '1px solid #1890ff'
                inputContainer.style.boxShadow = '0 0 2px #1890ff'
              },
              finish() {
                const input = vnode.context.$refs.ElInput

                input && input.focus()
                speed = false
              },
            })
          },
          false,
        )

        function clickoutside(e) {
          e.stopPropagation()
          const { search } = vnode.context

          if (!isExpand) return
          if (search.keywords.length > 0) return
          if (el.contains(e.target) || (e.target.classList.contains('el-input__icon') && e.target.classList.contains('el-icon-circle-close'))) return

          shrinkAnimate({
            duration: 300,
            callback(rate) {
              inputContainer.style.width = `${360 * rate}px`
            },
            finish() {
              inputContainer.style.width = '0'
              inputContainer.style.border = 'none'
              inputContainer.style.boxShadow = 'none'
            },
          })
          isExpand = false
        }

        el._clickoutside = clickoutside
        document.addEventListener('click', clickoutside, false)
      },
      unbind(el, binding, vnode) {
        vnode.context.$off('closed')
        document.removeEventListener('click', el._clickoutside, false)
      },
    },
    calculLeft: {
      bind(el, binding, vnode) {
        vnode.context.$nextTick(() => {
          const children = Array.from(el.children).filter(child => !child.classList.contains('marker'))
          const widths = children.map(bar => bar.getBoundingClientRect())

          children.forEach((bar, index) => (bar.style.left = `${widths.slice(0, index).reduce((pre, cur) => pre + cur.width + 8, 0)}px`))
        })
      },
    },
  },
  //  End
}
</script>

<style lang="scss" scoped>
.\!z-20 {
  z-index: 20 !important;
}
.toolbar {
  position: absolute;
  top: 5%;
  left: 5%;
  .marker {
    position: absolute;
    top: -6px;
    left: -1px;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px dashed #ccc;
    z-index: 21;
    transform: rotate(45deg);
    shape-outside: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    cursor: move;
  }
  .component-toolbar {
    position: absolute;
    list-style-type: none;
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    font-size: 12px;
    color: #545454;
    margin: 0;

    box-shadow: 1px 1px 5px #ccc;
    z-index: 10;
    padding: 0 5px;
    display: flex;
    flex-wrap: nowrap;
    background: #fff;
    border-right: 1px solid #ccc;

    .input-wrap {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
      width: 0;
      height: 40px;
      border-radius: 4px;
      overflow: hidden;
      background-color: #fff;

      .el-input {
        padding-right: 3px;
      }

      .counter {
        font-size: 12px;
        display: flex;
        color: #999;
        font-weight: 400;
        line-height: 1.5;
        text-align: left;
        text-indent: 1em;
        .btn-control {
          ::v-deep(.el-button > span:hover) {
            background-color: #eee;
            padding-bottom: 2px;
          }
        }
      }

      ::v-deep {
        .el-input__inner {
          border-right: 0px;
          &:focus {
            border-color: transparent;
          }
        }

        .el-input__prefix {
          &:hover {
            background: #eee;
          }
        }

        .el-input-group__append {
          margin-right: 2px;
          .el-button {
            background-color: #409eff;
            color: #fff;
          }
        }
      }
    }
    .component-toolbar-item {
      position: relative;
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
        background: #eee;
        .el-button {
          color: #1890ff;
        }
      }
      .el-button {
        width: 100%;
        height: 100%;
        padding: 0;
        font-size: 20px;
        color: #666;
        ::v-deep(span) {
          display: inline-block;
          text-align: center;
        }
      }
      &::after {
        content: '';
        position: absolute;
        top: 5%;
        left: 100%;
        height: 90%;
        width: 1px;
        background-color: #ebeef5;
        z-index: 1;
      }
      &:first-child::after {
        display: none;
      }
      &:last-child::after {
        background-color: unset;
      }
    }
  }
}
</style>
