import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '@/utils/auth.js' // 引入工具箱里面的auth.js auth作为他们的对象可以取得他们里面的方法
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 专门用来防止共享的状态
    userToken: auth.getToken()
    // 我们要做持久化的话,就必须使用vuex来存储,因为在浏览器中它是有时效的,但是在vuex中 它是永远存在的
  },
  mutations: {
    updateUserToken (state, payload) {
      state.userToken = payload.user // 因为传入的payload其实是一个对象,如果你想改变userToken的状态的话就需要在user对象里面取到相应的token

      // 更新vuex的时候 也应该 将最新的数据 存入本地缓存
      auth.setToken(payload.user) // 相当于 保持 vuex和 本地存储的同步
    },

    delUerToken (state) {
      // 将vuex中的token设置为空对象
      state.userToken = {}
      // 缓存数据也需要更新
      auth.removeToken()
      // 删除本地缓存中的token
    }
  },
  actions: {
  },
  modules: {
  }
})
