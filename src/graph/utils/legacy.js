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
  const _option = {}

  if (!opts) {
    throw new Error('options params is required')
  }

  if (isString(opts)) {
    _option.el = document.querySelector(opts)
  }

  if (opts instanceof HTMLElement) {
    _option.el = opts
  }

  if (isObject(opts) && opts.el instanceof HTMLElement) {
    _option.el = opts.el
    _option.stencil = opts.stencil
    _option.minimap = opts.minimap
    _option.contextmenu = opts.contextmenu
  }

  return _option
}

export function isVueComponent(component) {
  return typeof component === 'object' && component !== null && component._isVue === true
}
