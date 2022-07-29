import { createApp } from 'vue'
import axios from 'axios'

import App from './App.vue'
import router from './router'

import './style.css'
import './assets/css/bootstrap.css'

const app = createApp(App);

axios.defaults.baseURL = "http://localhost:8080"
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
app.config.globalProperties.$http = axios

app.use(router)


app.mount('#app')


