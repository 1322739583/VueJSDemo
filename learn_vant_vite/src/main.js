import { createApp } from 'vue'
import App from './组件使用/tabs/TestTabs.vue'
const app=createApp(App)
createApp(App).mount('#app')
app.config.warnHandler = (msg, instance, trace) => {}