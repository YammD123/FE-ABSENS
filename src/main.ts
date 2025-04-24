import { createApp } from 'vue'
import './styles/global.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

// createApp(App).mount('#app')

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
