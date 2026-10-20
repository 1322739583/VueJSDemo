import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//这里会把App.vue注入到index.html
createApp(App).use(store).use(router).mount('#app')
