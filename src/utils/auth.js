/**
 * auth.js 专门用来存放token的写入以及删除
 */

const USER_TOKEN = 'zjh-toutiao-20200928'// 专门用来存储用户信息

// 设置用户的token信息
export function setToken (user) {
  // user应该是一个对象
  window.localStorage.setItem(USER_TOKEN, JSON.stringify(user))
  // 传进localStorage需要转换成JSON字符串
}

// 获取用户的token信息
export function getToken () {
  // 获取到的信息需要转换为JSON对象返回
  return JSON.parse(window.localStorage.getItem(USER_TOKEN) || '{}')
  // 如果前面为true  后面不执行 如果前面为false 后面才执行
}

// 删除用户在localStorage中的token信息

export function removeToken () {
  // 删除token信息
  window.localStorage.removeItem(USER_TOKEN)
}
