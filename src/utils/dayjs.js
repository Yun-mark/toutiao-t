import Vue from 'vue'
import dayjs from 'dayjs'

import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
// 配置中文语言
dayjs.locale('zh-cn')
// 日期格式化
Vue.filter('relativeTime', value => {
  return dayjs(value).from(dayjs())
})
