import Vue from 'vue'
import './composition-api'
import App from '@/App.vue'
import '@/assets/styles/common.scss'
import '@/assets/styles/tailwind.css'
import SvgIcon from '@/components/SvgIcon'
import ScrollPanel from '@/components/ScrollPanel'
import 'animate.css'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'virtual:svg-icons-register'

Vue.config.productionTip = false

Vue.component('SvgIcon', SvgIcon)
Vue.component('ScrollPanel', ScrollPanel)
Vue.use(ElementUi)

new Vue({
  render: h => h(App),
}).$mount('#app')
