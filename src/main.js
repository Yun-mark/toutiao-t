import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.less'
// 加载Vant组件库
import Vant from 'vant'
import './styles/icon.less'

// 加载Vant组件库样式
import 'vant/lib/index.css'
// 自动设置REM基准值（html标签字体大小）
import 'amfe-flexible'

// 全局注册Vant中的组件
Vue.use(Vant)
Vue.config.productionTip = false

// 创建Vue根实例，将router,store配置到跟实例中
// 把App根组件渲染到 #app节点
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
