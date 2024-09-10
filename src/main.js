import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './assets/css/index.css'
import "@mdi/font/css/materialdesignicons.css"
import router from "./router"
import store from "./store"
import axios from "axios"
import { Collapse } from 'vue-collapsed'


axios.defaults.headers.common['vhc_token'] = store.getters['token/details']

createApp(App).use(store).use(router).component("Collapse", Collapse).mount('#app')
