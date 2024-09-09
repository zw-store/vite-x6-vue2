import * as shared from '@vue/shared'
import { isFunction } from 'lodash-es'

export function isElement(element) {
  return typeof HTMLElement === 'object' ? element instanceof HTMLElement : element && typeof element === 'object' && element !== null && element.nodeType === 1 && typeof element.nodeName === 'string'
}

function handler() {
  let zIndexes = []

  const generateZIndex = (key, autoZIndex, baseZIndex = 999) => {
    const lastZIndex = getLastZIndex(key, autoZIndex, baseZIndex)
    const newZIndex = lastZIndex.value + (lastZIndex.key === key ? 0 : baseZIndex) + 1

    zIndexes.push({ key, value: newZIndex })

    return newZIndex
  }

  const revertZIndex = zIndex => {
    zIndexes = zIndexes.filter(obj => obj.value !== zIndex)
  }

  const getCurrentZIndex = (key, autoZIndex) => {
    return getLastZIndex(key, autoZIndex).value
  }

  const getLastZIndex = (key, autoZIndex, baseZIndex = 0) => {
    return [...zIndexes].reverse().find(obj => (autoZIndex ? true : obj.key === key)) || { key, value: baseZIndex }
  }

  const getZIndex = element => {
    return element ? parseInt(element.style.zIndex, 10) || 0 : 0
  }

  return {
    get: getZIndex,
    set: (key, element, baseZIndex) => {
      if (element) {
        element.style.zIndex = String(generateZIndex(key, true, baseZIndex))
      }
    },
    clear: element => {
      if (element) {
        revertZIndex(getZIndex(element))
        element.style.zIndex = ''
      }
    },
    getCurrent: key => getCurrentZIndex(key, true),
  }
}

export function resolve(obj, ...params) {
  return isFunction(obj) ? obj(...params) : obj
}

export const isEmpty = value => value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0) || (!(value instanceof Date) && typeof value === 'object' && Object.keys(value).length === 0)

export const isNotEmpty = value => !isEmpty(value)

export function isPrintableCharacter(char = '') {
  return isNotEmpty(char) && char.length === 1 && !!char.match(/\S| /)
}

export const ZIndex = handler()

const lastIds = {}

export function UniqueComponentId(prefix = '_id_') {
  // eslint-disable-next-line no-prototype-builtins
  if (!lastIds.hasOwnProperty(prefix)) {
    lastIds[prefix] = 0
  }

  lastIds[prefix]++

  return `${prefix}${lastIds[prefix]}`
}

export function focus(element, options) {
  element && document.activeElement !== element && element.focus(options)
}

export function getViewport() {
  const { innerWidth, innerHeight } = window
  const { clientWidth, clientHeight } = document.documentElement
  const body = document.getElementsByTagName('body')[0]
  const width = innerWidth || clientWidth || body.clientWidth
  const height = innerHeight || clientHeight || body.clientHeight

  return { width, height }
}

function getOffset(element) {
  if (element) {
    const rect = element.getBoundingClientRect()

    return {
      top: rect.top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0),
      left: rect.left + (window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0),
    }
  }

  return {
    top: 'auto',
    left: 'auto',
  }
}

function getOuterWidth(element, margin) {
  if (element instanceof HTMLElement) {
    let width = element.offsetWidth

    if (margin) {
      const style = getComputedStyle(element)

      width += parseFloat(style.marginLeft) + parseFloat(style.marginRight)
    }

    return width
  }

  return 0
}

let calculatedScrollbarWidth

export function addStyle(element, style) {
  if (element) {
    if (typeof style === 'string') {
      element.style.cssText = style
    } else {
      Object.entries(style || {}).forEach(([key, value]) => (element.style[key] = value))
    }
  }
}

function calculateScrollbarWidth(element) {
  if (element) {
    const style = getComputedStyle(element)

    return element.offsetWidth - element.clientWidth - parseFloat(style.borderLeftWidth) - parseFloat(style.borderRightWidth)
  } else {
    if (calculatedScrollbarWidth != null) return calculatedScrollbarWidth
    const scrollDiv = document.createElement('div')

    addStyle(scrollDiv, {
      width: '100px',
      height: '100px',
      overflow: 'scroll',
      position: 'absolute',
      top: '-9999px',
    })
    document.body.appendChild(scrollDiv)
    const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth

    document.body.removeChild(scrollDiv)
    calculatedScrollbarWidth = scrollbarWidth

    return scrollbarWidth
  }
}

export function nestedPosition(element, level) {
  let _a

  if (element) {
    const parentItem = element.parentElement
    const elementOffset = getOffset(parentItem)
    const viewport = getViewport()
    const sublistWidth = element.offsetParent ? element.offsetWidth : getHiddenElementOuterWidth(element)
    const itemOuterWidth = getOuterWidth((_a = parentItem == null ? undefined : parentItem.children) == null ? undefined : _a[0])
    let left = ''

    if (elementOffset.left + itemOuterWidth + sublistWidth > viewport.width - calculateScrollbarWidth()) {
      if (elementOffset.left < sublistWidth) {
        if (level % 2 === 1) {
          left = elementOffset.left ? '-' + elementOffset.left + 'px' : '100%'
        } else if (level % 2 === 0) {
          left = viewport.width - sublistWidth - calculateScrollbarWidth() + 'px'
        }
      } else {
        left = '-100%'
      }
    } else {
      left = '100%'
    }

    element.style.top = '0px'
    element.style.left = left
  }
}

export function getHiddenElementOuterWidth(element) {
  if (element) {
    element.style.visibility = 'hidden'
    element.style.display = 'block'
    const elementWidth = element.offsetWidth

    element.style.display = 'none'
    element.style.visibility = 'visible'

    return elementWidth
  }

  return 0
}

export function getHiddenElementOuterHeight(element) {
  if (element) {
    element.style.visibility = 'hidden'
    element.style.display = 'block'
    const elementHeight = element.offsetHeight

    element.style.display = 'none'
    element.style.visibility = 'visible'

    return elementHeight
  }

  return 0
}

export function mergeProps(...args) {
  const ret = {}

  for (let i = 0; i < args.length; i++) {
    const toMerge = args[i]

    for (const key in toMerge) {
      if (key === 'class') {
        if (ret.class !== toMerge.class) {
          ret.class = shared.normalizeClass([ret.class, toMerge.class])
        }
      } else if (key === 'style') {
        ret.style = shared.normalizeStyle([ret.style, toMerge.style])
      } else if (shared.isOn(key)) {
        const existing = ret[key]
        const incoming = toMerge[key]

        if (incoming && existing !== incoming && !(shared.isArray(existing) && existing.includes(incoming))) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming
        }
      } else if (key !== '') {
        ret[key] = toMerge[key]
      }
    }
  }

  return ret
}

export function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
}

export function findLastIndex(arr, callback) {
  let index = -1

  if (isNotEmpty(arr)) {
    try {
      index = arr.findLastIndex(callback)
    } catch (e) {
      index = arr.lastIndexOf([...arr].reverse().find(callback))
    }
  }

  return index
}

export function findSingle(element, selector) {
  return isElement(element) ? (element.matches(selector) ? element : element.querySelector(selector)) : null
}
