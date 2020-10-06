import request from '@/utils/requets'

export function login (data) {
  return request({
    url: '/authorizations', // 请求地址
    method: 'post',
    data // 接收传入的data
    // axios 中body 参数放置在data中
  })
}
