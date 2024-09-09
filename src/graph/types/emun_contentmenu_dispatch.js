import { Platform } from '@antv/x6'
const { IS_MAC } = Platform
/**
 * @type emun_contentmenu_dispatch
 * @desc 右键派发事件
 * @enum
 */

/** @type {String} node 右键 */
export const NODE_CONTEXTMENU = '__node_contextmenu_event__'

/** @type {String} edge 右键 */
export const EDGE_CONTEXTMENU = '__edge_contextmenu_event__'

/** @type {String} cell 右键 */
export const CELL_CONTEXTMENU = '__cell_contextmenu_event__'

/** @type {String} port 右键 */
export const PORT_CONTEXTMENU = '__port_contextmenu_event__'

/** @type {String} group 右键 */
export const GROUP_CONTEXTMENU = '__group_contextmenu_event__'

/** @type {String} graph 右键 */
export const GRAPH_CONTEXTMENU = '__graph_contextmenu_event__'

/** @type {String} canvas 右键 */
export const CANVAS_CONTEXTMENU = '__canvas_contextmenu_event__'

/** @type {String} stencil 右键 */
export const STENCIL_CONTEXTMENU = '__stencil_contextmenu_event__'

/** @type {String} minimap 右键 */
export const MINIMAP_CONTEXTMENU = '__minimap_contextmenu_event__'

/** @type {String} toolbar 右键 */
export const TOOLBAR_CONTEXTMENU = '__toolbar_contextmenu_event__'

/** @type {String} global 右键 */
export const GLOBAL_CONTEXTMENU = '__global_contextmenu__'

/** @type {String} 当前选中状态 */
export const SWITCH_CONTEXTMENU_TYPE = '__switch_contextmenu_type__'

/** @type {String} 关闭右键面板 */
export const HIDE_CONTEXTMENU = '__hide_contextmenu__'

/**
  fn : function
  ⌘ : command键(之前的 ) （缩写:cmd）；
  ⌃ : control键 （缩写:ctrl）；
  ⌥ : alt/option（缩写:opt）；
  ⇧ ：shift键（缩写:shft）；
  ⇪ : caps lock；
  ⌫ : delete键（缩写del）；
  ⌦ : forward delete（操作:fn+delete）；
  ⏎ : return（操作:fn+enter）；
  ⌅ : enter；
  ⇥ : tab； ⇤ : back-tab（操作:shift+tab）；
  ⎋ : esc键；
  ⇞ : PageUp（操作:fn+↑）； ⇟ : PageDown（操作:fn+↓）；
  ↖︎ : home（操作:fn+←）；
  ↘︎ : end（操作:fn+→）；
  */

const ctrl = IS_MAC ? '⌘ ' : 'ctrl '

/** GROUP_CONTEXTMENU 右键类型的属性 */
export const GraphContextMenuConfig = [
  { label: '搜索', icon: 'search' },
  { separator: true },
  { label: '粘贴', icon: 'paste', shortcut: `${ctrl}V` },
  { label: '撤销', icon: 'undo', shortcut: `${ctrl}Z` },
  { label: '重做', icon: 'redo', shortcut: `${ctrl}R` },
  { separator: true },
  { label: '全选', icon: 'select-all', shortcut: `${ctrl}A` },
  { label: '适应视图', icon: 'fit-view' },
  { label: '全屏', icon: 'full-screen' },
  { separator: true },
  {
    label: '缩放',
    icon: 'zoom-in',
    items: [
      { label: '放大', icon: 'zoom-in', shortcut: '⇧+' },
      { label: '缩小', icon: 'zoom-out', shortcut: '⇧-' },
    ],
  },
  { label: '清空画布', icon: 'clear', shortcut: `${ctrl}⇧ ⌫` },
  { separator: true },
  { label: '导出', icon: 'export', shortcut: `${ctrl}P` },
]

export const NodeContextmMenuConfig = [
  { label: '选中', icon: 'select' },
  { label: '复制', icon: 'copy', shortcut: `${ctrl}C` },
  { label: '编辑', icon: 'edit' },
  { separator: true },
  { label: '删除', icon: 'delete', shortcut: `${ctrl}⌫` },
  { separator: true },
  { label: '居中此节点', icon: 'fit-view' },
  {
    label: '缩放',
    icon: 'zoom-in',
    items: [
      { label: '放大', icon: 'zoom-in', shortcut: '⇧+' },
      { label: '缩小', icon: 'zoom-out', shortcut: '⇧-' },
    ],
  },
  { separator: true },
  { label: 'Add', icon: 'search', shortcut: `${ctrl}A` },
  { label: '导出', icon: 'export', shortcut: `${ctrl}P` },
]
