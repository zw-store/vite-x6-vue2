<!--
 * Copyright ©
 * #
 * @author: zw
 * @date: 2024-04-19
 -->

<template>
  <div class="layout">
    <div class="stencil" ref="stencil"></div>

    <PropertyDrawer></PropertyDrawer>
    <ContextMenu ref="contextmenu"> </ContextMenu>

    <div class="main">
      <div ref="horizontal" style="position: absolute; insert: 0; z-index: 9999; height: 14px; width: 100%"></div>
      <div ref="vertical" style="position: absolute; z-index: 9999; insert: 0; height: 100%; width: 14px"></div>

      <ToolBar></ToolBar>

      <div ref="graph-x6" class="graph-main-container" />

      <div class="graph-area-map-panel">
        <div ref="minimap"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { initGraph, initDefaultData } from '@/graph'
import { ContextMenu, ToolBar, PropertyDrawer } from '@/graph/component'

export default {
  name: 'x6',
  components: { ToolBar, PropertyDrawer, ContextMenu },
  mounted() {
    initGraph({
      el: this.$refs['graph-x6'],
      stencil: this.$refs.stencil,
      minimap: this.$refs.minimap,
      contextmenu: this.$refs.contextmenu,
      horizontal: this.$refs.horizontal,
      vertical: this.$refs.vertical,
    })
    initDefaultData(
      [
        {
          position: {
            x: 140,
            y: 280,
          },
          size: {
            width: 60,
            height: 45,
          },
          attrs: {
            body: {
              stroke: '#72cc4a',
              fill: '#31d0c6',
              rx: 10,
              ry: 10,
            },
            label: {
              fontSize: 14,
              fill: '#fff',
              refX: 30,
              refY: 22.5,
              text: '矩形',
            },
          },
          visible: true,
          shape: 'rect',
          id: 'dc1f1137-6224-497f-b9bb-c5f61e00277a',
          nodeType: 'base-node',
          markup: [
            {
              tagName: 'rect',
              selector: 'body',
            },
            {
              tagName: 'text',
              selector: 'label',
            },
          ],
          tools: {
            items: [
              {
                name: 'node-editor',
                args: {
                  attrs: {
                    backgroundColor: '#EFF4FF',
                  },
                },
              },
            ],
          },
          ports: {
            groups: {
              top: {
                position: 'top',
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#5F95FF',
                    strokeWidth: 1,
                    fill: '#fff',
                    style: {
                      visibility: 'hidden',
                    },
                  },
                },
              },
              right: {
                position: 'right',
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#5F95FF',
                    strokeWidth: 1,
                    fill: '#fff',
                    style: {
                      visibility: 'hidden',
                    },
                  },
                },
              },
              bottom: {
                position: 'bottom',
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#5F95FF',
                    strokeWidth: 1,
                    fill: '#fff',
                    style: {
                      visibility: 'hidden',
                    },
                  },
                },
              },
              left: {
                position: 'left',
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#5F95FF',
                    strokeWidth: 1,
                    fill: '#fff',
                    style: {
                      visibility: 'hidden',
                    },
                  },
                },
              },
            },
            items: [
              {
                group: 'top',
                id: '0339a144-c990-419e-8294-23f906383b50',
              },
              {
                group: 'right',
                id: '454c2192-2549-4440-a4eb-59b305644590',
              },
              {
                group: 'bottom',
                id: 'd5d48d02-cd57-4398-baec-2f67579107f5',
              },
              {
                group: 'left',
                id: 'b28f051f-bacf-45d5-bfc5-e19b84d71963',
              },
            ],
          },
          zIndex: 1,
        },
        {
          position: {
            x: 376,
            y: 283,
          },
          size: {
            width: 80,
            height: 40,
          },
          attrs: {
            body: {
              stroke: '#72cc4a',
              fill: '#31d0c6',
              rx: 10,
              ry: 10,
            },
            label: {
              fontSize: 14,
              fill: '#fff',
              refX: 40,
              refY: 20,
              text: '椭圆',
            },
          },
          visible: true,
          shape: 'ellipse',
          id: 'e169f372-ec61-43f1-8390-c769c2aecf84',
          nodeType: 'base-node',
          markup: [
            {
              tagName: 'ellipse',
              selector: 'body',
            },
            {
              tagName: 'text',
              selector: 'label',
            },
          ],
          tools: {
            items: [
              {
                name: 'node-editor',
                args: {
                  attrs: {
                    backgroundColor: '#EFF4FF',
                  },
                },
              },
            ],
          },
          ports: {
            groups: {
              top: {
                position: 'top',
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#5F95FF',
                    strokeWidth: 1,
                    fill: '#fff',
                    style: {
                      visibility: 'hidden',
                    },
                  },
                },
              },
              right: {
                position: 'right',
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#5F95FF',
                    strokeWidth: 1,
                    fill: '#fff',
                    style: {
                      visibility: 'hidden',
                    },
                  },
                },
              },
              bottom: {
                position: 'bottom',
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#5F95FF',
                    strokeWidth: 1,
                    fill: '#fff',
                    style: {
                      visibility: 'hidden',
                    },
                  },
                },
              },
              left: {
                position: 'left',
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#5F95FF',
                    strokeWidth: 1,
                    fill: '#fff',
                    style: {
                      visibility: 'hidden',
                    },
                  },
                },
              },
            },
            items: [
              {
                group: 'top',
                id: 'f83df98e-8d62-4890-9b7e-7a32d9dce846',
              },
              {
                group: 'right',
                id: '2c4083ca-f060-4b23-85d1-d6ea6fa712bf',
              },
              {
                group: 'bottom',
                id: 'c80666c5-e7ea-482a-9eb9-7db78f0aef05',
              },
              {
                group: 'left',
                id: '622e55be-3459-4d40-8bf5-f7fbeecdc118',
              },
            ],
          },
          zIndex: 2,
        },
      ],
      [
        {
          shape: 'normal-edge',
          attrs: {
            line: {
              targetMarker: {
                name: 'block',
                width: 15,
                height: 10,
                offset: 0,
                visibility: 'visible',
              },
              sourceMarker: {
                name: 'block',
                width: 0,
                height: 0,
                offset: 0,
                visibility: 'hidden',
              },
            },
          },
          nodeType: 'edge-node',
          router: {
            name: 'orth',
            args: {
              padding: 10,
            },
          },
          id: 'e5efa256-8e2f-45e5-8c4f-98a36ae0d2b8',
          source: {
            cell: 'dc1f1137-6224-497f-b9bb-c5f61e00277a',
            port: '454c2192-2549-4440-a4eb-59b305644590',
          },
          target: {
            cell: 'e169f372-ec61-43f1-8390-c769c2aecf84',
            port: '622e55be-3459-4d40-8bf5-f7fbeecdc118',
          },
          zIndex: 3,
          labels: [
            {
              attrs: {
                text: {
                  text: 'Hello Label',
                  fill: '#000',
                },
              },
              position: {
                distance: 0.1,
                offset: [0, 0],
              },
            },
            {
              attrs: {
                text: {
                  text: 'Hello Label2',
                  fill: '#409033',
                },
              },
              position: {
                distance: 1,
                offset: [0, 0],
              },
            },
          ],
        },
      ],
    )
  },
  methods: {},

  //  End
}
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 380px 1fr;
  grid-auto-rows: 1fr;
  position: relative;
  .stencil {
    position: relative;
    background: #fff;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  }
  .main {
    position: relative;
    .graph-main-container {
      width: 100%;
      height: 100%;
    }
    .graph-area-map-panel {
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
}
</style>
