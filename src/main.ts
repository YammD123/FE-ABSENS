import { createApp } from 'vue'
import './styles/global.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import VueApexCharts from "vue3-apexcharts"

// createApp(App).mount('#app')

const pinia = createPinia()
const app = createApp(App)
app.use(VueApexCharts)
app.component("apexchart",VueApexCharts)
app.use(pinia)
app.use(router)
app.mount('#app')
