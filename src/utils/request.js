// 请求模块
import axios from 'axios'

// 在非组件模块中获取store必须通过这种方式，这里
// 单独加载store，和在组件中 this.$store 一样
import store from '@/store/'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})
// 请求拦截器

// 响应拦截器
// 导出
request.interceptors.request.use(
  function (config) {
    const user = store.state.user
    if (user) {
      config.headers.Authorization = `Bearer ${user.data.token}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default request
