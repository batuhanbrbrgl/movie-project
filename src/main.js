import { createApp } from 'vue'
import App from './App.vue'
import router from '@/plugins/router'
import '@/assets/style.scss'


createApp(App).use(router).mount('#app')
