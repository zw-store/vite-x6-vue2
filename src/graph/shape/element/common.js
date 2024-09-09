import { Anchor } from '../../constant'
import { isEmpty } from '../../utils'

const theme = {
  default: {
    fill: '#31d0c6',
    stroke: '#72cc4a',
  },
}

const sizes = s => {
  return {
    rect: { width: 60, height: 45 },
    circle: { width: 60, height: 60 },
    ellipse: { width: 80, height: 40 },
    path: { width: 120, height: 60 },
    polygon: { width: 60, height: 60 },
    polyline: { width: 60, height: 60 },
    image: { width: 48, height: 48 },
    'text-block': { width: 160, height: 30 },
  }[s]
}

export const returnsMarkup = (customMarkup = []) => {
  return customMarkup.length
    ? customMarkup
    : [
        { tagName: 'rect', selector: 'body' },
        { tagName: 'text', selector: 'label' },
      ]
}

export const returnsAttrs = ({ shape, body, label }) => {
  const { stroke, fill } = theme.default
  const size = sizes(shape)

  return {
    body: {
      stroke,
      fill,
      rx: 10,
      ry: 10,
      ...body,
    },
    label: {
      fontSize: 14,
      fill: '#fff',
      refX: size.width / 2,
      refY: size.height / 2,
      ...label,
    },
  }
}

export const returnsPorts = (customPort = {}) => {
  return !isEmpty(customPort)
    ? customPort
    : {
        groups: {
          top: { position: 'top', ...Anchor.circle },
          right: { position: 'right', ...Anchor.circle },
          bottom: { position: 'bottom', ...Anchor.circle },
          left: { position: 'left', ...Anchor.circle },
        },
        items: [{ group: 'top' }, { group: 'right' }, { group: 'bottom' }, { group: 'left' }],
      }
}

export const tools = () => {
  return [
    {
      name: 'node-editor',
      args: {
        attrs: {
          backgroundColor: '#EFF4FF',
        },
      },
    },
    // {
    //   name: 'boundary',
    //   args: {
    //     padding: 5,
    //     attrs: {
    //       fill: '#7c68fc',
    //       stroke: '#9254de',
    //       strokeWidth: 1,
    //       fillOpacity: 0.2,
    //     },
    //   },
    // },
  ]
}

export const shape = (options = {}) => {
  const { label, shape = 'rect', markup, attrs = {}, ports, ...otherParams } = options

  return {
    ...sizes(shape),
    shape,
    nodeType: 'base-node',
    attrs: { ...returnsAttrs({ shape, label: { text: label }, ...attrs }) },
    ports: { ...returnsPorts(ports) },
    tools: [...tools()],
    markup: [
      { tagName: shape, selector: 'body' },
      { tagName: 'text', selector: 'label' },
    ],
    ...otherParams,
  }
}
