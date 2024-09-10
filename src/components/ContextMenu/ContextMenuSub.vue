<!--
 * Copyright ©
 * #
 * @author: zw
 * @date: 2024-08-15
 -->

<template>
  <transition name="contextmenusub" @enter="onEnter">
    <ul v-if="root ? true : visible" ref="container" :tabindex="tabindex" @contextmenu.stop.prevent>
      <template v-for="(processedItem, index) of items">
        <li
          v-if="isItemVisible(processedItem) && !getItemProp(processedItem, 'separator')"
          :id="getItemId(processedItem)"
          :style="getItemProp(processedItem, 'style')"
          :class="['contextmenu-item', getItemProp(processedItem, 'class'), isItemActive(processedItem) && 'contextmenu-item-active', isItemFocused(processedItem) && 'focus', isItemDisabled(processedItem) && 'disabled']"
          :key="getItemKey(processedItem)"
        >
          <div class="contextmenu-item-content" @click="onItemClick($event, processedItem)" @mouseenter="onItemMouseEnter($event, processedItem)" @mousemove="onItemMouseMove($event, processedItem)">
            <template v-if="!templates.item">
              <a data-section="itemlink" :href="getItemProp(processedItem, 'url')" class="contextmenu-item-link" :target="getItemProp(processedItem, 'target')" tabindex="-1">
                <component v-if="templates.itemicon" :is="templates.itemicon" :item="processedItem.item" class="contextmenu-item-icon" />

                <svg-icon v-else-if="getItemProp(processedItem, 'icon')" class-name="contextmenu-item-icon" style="font-size: 14px" :icon-class="getItemProp(processedItem, 'icon')" />

                <span :id="getItemLabelId(processedItem)" class="contextmenu-item-label">{{ getItemLabel(processedItem) }}</span>

                <el-tag v-if="getItemProp(processedItem, 'shortcut')" size="mini" type="info" class="contextmenu-item-shortcut">{{ getItemShortcut(processedItem) }}</el-tag>

                <template v-if="getItemProp(processedItem, 'items')">
                  <component v-if="templates.submenuicon" :is="templates.submenuicon" :active="isItemActive(processedItem)" class="contextmenu-submenu-icon" />

                  <svg-icon v-else icon-class="angle-right" style="margin-left: auto; font-size: 14px; color: #909399" />
                </template>
              </a>
            </template>

            <component v-else :is="templates.item" :item="processedItem.item" :hasSubmenu="getItemProp(processedItem, 'items')" :label="getItemLabel(processedItem)" :props="getMenuItemProps(processedItem, index)">dsa</component>
          </div>

          <ContextMenuSub
            v-if="isItemVisible(processedItem) && isItemGroup(processedItem)"
            :id="getItemId(processedItem) + '_list'"
            class="contextmenu-submenu"
            :menuId="menuId"
            :focusedItemId="focusedItemId"
            :items="processedItem.items"
            :templates="templates"
            :activeItemPath="activeItemPath"
            :level="level + 1"
            :visible="isItemActive(processedItem) && isItemGroup(processedItem)"
            @item-click="$emit('item-click', $event)"
            @item-mouseenter="$emit('item-mouseenter', $event)"
            @item-mousemove="$emit('item-mousemove', $event)"
          />
        </li>

        <li v-if="isItemVisible(processedItem) && getItemProp(processedItem, 'separator')" :id="getItemId(processedItem)" :style="getItemProp(processedItem, 'style')" :class="['contextmenu-separator', getItemProp(processedItem, 'class')]" :key="getItemKey(processedItem)"></li>
      </template>
    </ul>
  </transition>
</template>

<script>
import { nestedPosition } from './helpper'
import { resolve, isNotEmpty } from './helpper'
import { mergeProps } from './helpper'

export default {
  name: 'ContextMenuSub',
  props: {
    items: { type: Array, default: null },
    menuId: { type: String, default: null },
    focusedItemId: { type: String, default: null },
    root: { type: Boolean, default: false },
    visible: { type: Boolean, default: false },
    level: { type: Number, default: 0 },
    templates: { type: Object, default: null },
    activeItemPath: { type: Array, default: null },
    tabindex: { type: Number, default: 0 },
  },

  mounted() {},

  methods: {
    getItemId(processedItem) {
      return `${this.menuId}_${processedItem.key}`
    },
    getItemKey(processedItem) {
      return this.getItemId(processedItem)
    },
    getItemProp(processedItem, name, params) {
      return processedItem && processedItem.item ? resolve(processedItem.item[name], params) : undefined
    },
    getItemLabel(processedItem) {
      return this.getItemProp(processedItem, 'label')
    },
    getItemShortcut(processedItem) {
      const shortcut = this.getItemProp(processedItem, 'shortcut')
      return shortcut
    },
    getItemLabelId(processedItem) {
      return `${this.menuId}_${processedItem.key}_label`
    },
    isItemActive(processedItem) {
      return this.activeItemPath.some(path => path.key === processedItem.key)
    },
    isItemVisible(processedItem) {
      return this.getItemProp(processedItem, 'visible') !== false
    },
    isItemDisabled(processedItem) {
      return this.getItemProp(processedItem, 'disabled')
    },
    isItemFocused(processedItem) {
      return this.focusedItemId === this.getItemId(processedItem)
    },
    isItemGroup(processedItem) {
      return isNotEmpty(processedItem.items)
    },
    onItemClick(event, processedItem) {
      this.getItemProp(processedItem, 'command', { originalEvent: event, item: processedItem.item })
      this.$emit('item-click', { originalEvent: event, processedItem, isFocus: true })
    },
    onItemMouseEnter(event, processedItem) {
      this.$emit('item-mouseenter', { originalEvent: event, processedItem })
    },
    onItemMouseMove(event, processedItem) {
      this.$emit('item-mousemove', { originalEvent: event, processedItem, isFocus: true })
    },
    getAriaSetSize() {
      return this.items.filter(processedItem => this.isItemVisible(processedItem) && !this.getItemProp(processedItem, 'separator')).length
    },
    getAriaPosInset(index) {
      return index - this.items.slice(0, index).filter(processedItem => this.isItemVisible(processedItem) && this.getItemProp(processedItem, 'separator')).length + 1
    },
    onEnter() {
      nestedPosition(this.$refs.container, this.level)
    },
    getMenuItemProps(processedItem, _index) {
      return {
        action: mergeProps({
          class: 'contextmenu-item-link',
          tabindex: -1,
        }),
        icon: mergeProps({
          class: ['contextmenu-item-icon', this.getItemProp(processedItem, 'icon')],
        }),
        label: mergeProps({
          class: 'contextmenu-item-label',
        }),
        submenuicon: mergeProps({
          class: 'contextmenu-submenu-icon',
        }),
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.contextmenu-submenu {
  margin: 0;
  padding: 3.5px;
  list-style: none;
  outline: 0 none;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.contextmenu-submenu {
  position: absolute;
  display: flex;
  flex-direction: column;
  min-width: 100%;
  z-index: 1;
  background: #fff;
  color: #334155;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  box-shadow:
    0px 4px 6px -1px rgba(0, 0, 0, 0.1),
    0px 2px 4px -2px rgba(0, 0, 0, 0.1);
}

.contextmenu-item {
  position: relative;
}

.contextmenu-item-content {
  transition:
    background 0.2s,
    color 0.2s;
  border-radius: 4px;
  color: #334155;
}

.contextmenu-item-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  text-decoration: none;
  overflow: hidden;
  position: relative;
  color: inherit;
  padding: 7px 10.5px;
  gap: 7px;
  user-select: none;
}

.contextmenu-item-label {
  line-height: 1;
  font-weight: 400;
  font-size: 14px;
}

.contextmenu-item-icon {
  color: #94a3b8;
}

.contextmenu-item-shortcut {
  margin-left: auto;
  transform: scale(0.95);
}

.contextmenu-submenu-icon {
  color: #94a3b8;
  margin-left: auto;
  font-size: 12.5px;
  width: 12.5px;
  height: 12.5px;
}

.contextmenu-item.focus > .contextmenu-item-content {
  color: #1e293b;
  background: #f1f5f9;
}

.contextmenu-item.focus > .contextmenu-item-content .contextmenu-item-icon {
  color: #64748b;
}

.contextmenu-item.focus > .contextmenu-item-content .contextmenu-submenu-icon {
  color: #64748b;
}

.contextmenu-item:not(.disabled) > .contextmenu-item-content:hover {
  color: #1e293b;
  background: #f1f5f9;
}

.contextmenu-item:not(.disabled) > .contextmenu-item-content:hover .contextmenu-item-icon {
  color: #64748b;
}

.contextmenu-item:not(.disabled) > .contextmenu-item-content:hover .contextmenu-submenu-icon {
  color: #64748b;
}

.contextmenu-item-active > .contextmenu-item-content {
  color: #1e293b;
  background: #f1f5f9;
}

.contextmenu-item-active > .contextmenu-item-content .contextmenu-item-icon {
  color: #64748b;
}

.contextmenu-item-active > .contextmenu-item-content .contextmenu-submenu-icon {
  color: #64748b;
}

.contextmenu-separator {
  border-top: 1px solid #e2e8f0;
}
</style>
