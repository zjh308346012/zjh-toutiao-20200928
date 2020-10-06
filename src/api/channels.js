/**
 *
 * 负责处理频道数据
 */

import requets from '@/utils/requets'

/**
 * 获取我的频道数据,没有参数
 */
export function getMyChannels () {
  // 返回一个promise axios默认是get
  return requets({
    url: '/user/channels'
  })
}
