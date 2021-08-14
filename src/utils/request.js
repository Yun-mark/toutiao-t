// 请求模块
import axios from 'axios'
import JSONbig from 'json-bigint'

// 在非组件模块中获取store必须通过这种方式，这里
// 单独加载store，和在组件中 this.$store 一样
import store from '@/store/'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn',
  // transformResponse 允许自定义原始的响应数据（字符串）
  transformResponse: [function (data) {
    try {
      // 如果转换成功则返回转换的数据结果
      return JSONbig.parse(data)
    } catch (err) {
      // 如果转换失败，则包装为统一数据格式并返回
      return {
        data
      }
    }
  }]
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
