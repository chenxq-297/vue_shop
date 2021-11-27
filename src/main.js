import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import installElementPlus from './plugins/element.js'
import './assets/icon/iconfont.css'

import axios from 'axios'



//样式表
import './assets/css/global.css'

const app = createApp(App)
installElementPlus(app)
app.use(router).mount('#app')

//设置默认路径，把axios挂载到原型对象上
axios.defaults.baseURL='http://127.0.0.1:8888/api/private/v1/'
app.config.globalProperties.$http=axios
