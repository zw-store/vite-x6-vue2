export { isArray, isEmpty, isNil, isObject, isString } from 'lodash-es'

export const raf = fn => requestAnimationFrame.call(window, fn)
export const doubleRaf = fn => raf(() => raf(fn))

/**
 * @description 返回0-1的 rate
 * @param {duration} duration 动画时长
 * @param {callback} callback 动画帧回调函数
 * @param {finish} finish 动画完成回调函数
 * @returns {void}
 */
export function expandAnimate({ duration, callback, finish }) {
  const startTime = performance.now()
  const endTime = startTime + duration

  function step(rate) {
    callback instanceof Function && callback(rate)
    const currentTime = performance.now()
    const progress = (currentTime - startTime) / +duration

    if (currentTime <= endTime) {
      raf(step.bind(null, progress))
    } else {
      finish instanceof Function && finish()
    }
  }

  step()
}

/**
 * @description 返回1-0的 rate
 * @param {Number} params
 * @param {Number} params.duration 动画时长
 * @param {Function} params.callback 动画帧回调函数
 * @param {Function} params.finish 动画完成回调函数
 * @returns {void}
 */
export function shrinkAnimate({ duration, callback, finish }) {
  const startTime = performance.now()
  const endTime = startTime + duration

  function step(rate) {
    callback instanceof Function && callback(rate)
    const currentTime = performance.now()
    const progress = (endTime - currentTime) / +duration

    if (currentTime <= endTime) {
      raf(step.bind(null, progress))
    } else {
      finish instanceof Function && finish()
    }
  }

  step()
}

export const validValue = (value, min, max) => Math.min(Math.max(value, min), max)

export const validValueByLoop = (value, min, max) => (value < min ? max : value > max ? min : value)

export const returnSVGResource = (modules, regex = /(?<=svg\/)(.*)(?=\.svg)/) => {
  if (!modules || !(regex instanceof RegExp)) {
    console.error('Invalid modules or regex')
    return []
  }

  try {
    return Object.entries(modules).map(([key, value]) => {
      regex.lastIndex = 0
      const match = regex.exec(key) || []
      return {
        name: match[0] || 'Unnamed',
        svg: value.default,
      }
    })
  } catch (error) {
    console.error('Error importing SVG resources:', error)
  }
}
