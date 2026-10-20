import Vue from 'vue'
import App from './App.vue'

import { createPinia, PiniaVuePlugin } from 'pinia'
import VueCompositionAPI from '@vue/composition-api'

Vue.use(PiniaVuePlugin)
const pinia = createPinia()
Vue.use(VueCompositionAPI)

Vue.use(PiniaVuePlugin)
const pinia = createPinia()
Vue.use(VueCompositionAPI)

Vue.config.productionTip = false

new Vue({
  pinia,
  render: h => h(App)
}).$mount('#app')

// createApp(App).use(pinia).mount('#app')
