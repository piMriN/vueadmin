import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Antd from 'ant-design-vue'

const app = createApp(App)
app.use(Antd).use(ElementPlus).use(store).use(router).mount('#app')
