import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

const USER_KEY = 'toutiao-user'

export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY)
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // 为了防止页面刷新数据丢失，我们需要把数据存放到本地存储中，这里为了持久化数据
      setItem(USER_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
