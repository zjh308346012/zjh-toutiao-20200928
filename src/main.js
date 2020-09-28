import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant' // 引入vant插件
import 'vant/lib/index.css' // 引入vant样式
import 'amfe-flexible' // 引入根据当前屏幕的变化而变化的font-size插件

Vue.use(Vant) // 全局注册  实际上调用了 Vant导出的对象的方法  install方法

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
