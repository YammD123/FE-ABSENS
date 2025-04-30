import { createApp } from 'vue'
import './styles/global.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import VueApexCharts from "vue3-apexcharts"
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'

// createApp(App).mount('#app')

const pinia = createPinia()
const app = createApp(App)
app.use(VueSweetalert2)
app.use(VueApexCharts)
app.component("apexchart",VueApexCharts)
app.use(pinia)
app.use(router)
app.mount('#app')
