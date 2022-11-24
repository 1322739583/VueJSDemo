import { createApp } from 'vue'
import App from './05使用action/App.vue'
import {createPinia} from "pinia";

const pinia=createPinia()
createApp(App).use(pinia).mount('#app')
