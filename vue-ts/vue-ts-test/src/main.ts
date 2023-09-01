import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {LoadingPlugin} from 'vue-loading-overlay';


const app = createApp(App)

app.use(router)
app.use(LoadingPlugin);
app.mount('#app')
