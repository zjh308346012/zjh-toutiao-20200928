/****
 *
 * premisstion 是做路由守卫
 *
 * create by gooly 2020/10/02
 */

import router from '@/router' // 引入路由

import store from '@/store' // 引入Vuex内容

// 前置守卫
//  每当路由发生变化时 前置守卫就会执行
router.beforeEach((to, from, next) => {
  //   需要判断你的请求地址 和你的token
// 如果是 /user为起始 说明 需要进行token的判断
  if (to.path.startsWith('/user') && !store.state.user.token) {
    //   需要拦截请求 让它去登录
  //  next('/login')  如果你想去A  被 拦截了 去了登录, 登录成功应该回到你想去的A
    next({
      path: '/login', // 需要跳转的地址
      query: {
        // fullpath 和 path  的区别是 fullPath 会带 ?后面的参数 是一个完整的路径
        redirect: to.fullPath
        // 告诉登录页 我没有完成 访问 你登录之后 一定要帮我完成
      }
    })
  } else {
    // 一种是 地址不是 /user起始  一种是 /user起始 并且token存在
    next() // 直接放行
  }
})
