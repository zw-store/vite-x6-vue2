import { isArray, isObject, isString } from '.'
import ErrorClass from '../common/errorClass'
import { RUNTIME_ERR } from '../types/enum_dispatch_event'
import { Channel } from './transmit'

/** json格式化 */
export function fmtJSON(target) {
  try {
    if (isString(target)) return JSON.parse(target)
    if (isObject(target)) return target

    if (isArray(target)) {
      return target.map(item => {
        if (isObject(item)) return item

        return JSON.parse(item)
      })
    } else {
      Channel.dispatch(RUNTIME_ERR, ErrorClass.InvalidFormatData('nodes or edges error'))
      throw ErrorClass.InvalidFormatData('nodes or edges error')
    }
  } catch (error) {
    return {}
  }
}

/** 文字溢出格式化 */
export function fmtLabelOverflow(label) {
  if (!isString(label)) return label
  if (label.length <= 9) return label
  const cutLabel = label.slice(0, 6) + '...'

  return cutLabel
}

export const verifyElementParams = opts => {
  const _option = {
    el: null,
    stencil: null,
    minimap: null,
    contextmenu: null,
  }

  if (!opts) {
    throw new Error('options params is required')
  }

  if (isString(opts)) {
    _option.el = document.querySelector(opts)
  }

  if (opts instanceof HTMLElement) {
    return { el: opts }
  }

  return Object.assign(_option, opts)
}

export function isVueComponent(component) {
  return typeof component === 'object' && component !== null && component._isVue === true
}

export function isHTMLElement(element) {
  return typeof element === 'object' && element !== null && element.nodeType === 1
}

/**
 * 用于属性修改时保存原始键值对
 * 将 cellB 的有的属性，按 key 从 cellA 中取出。
 */
export function getOverrideOriginKeys(cellA, cellB) {
  return Object.keys(cellA)
    .filter(key => cellB[key])
    .reduce((acc, prev) => ((acc[prev] = cellA[prev]), acc), {})
}
