<template>
<div class="container">
    <van-nav-bar
  title="登录"
  left-text=""
  left-arrow
  @click-left="$router.back()"
/>
<van-cell-group>
  <!-- 手机号 -->
  <van-field v-model="loginForm.mobile" label="手机号" placeholder="请输入手机号" @blur="checkMoblie" :error-message="errorMessage.mobile"/>
  <!-- 验证码 -->
  <van-field
  v-model="loginForm.code"
   center
  clearable
  label="短信验证码"
  placeholder="请输入短信验证码"
  @blur="checkCode"
  :error-message="errorMessage.code"
>
  <template #button>
    <van-button size="small" type="primary">发送验证码</van-button>
  </template>
</van-field>
</van-cell-group>
<div class="login">
  <van-button type="info" size="small" round block @click="login">登录</van-button>
</div>
</div>
</template>

<script>
import { login } from '@/api/user'
import { mapMutations } from 'vuex'
const validateMobile = this.checkMoblie()
const validateCode = this.checkCode()
export default {

  data () {
    return {
      // 表单数据,
      loginForm: {
        mobile: '13911111111', // 手机号
        code: '246810' // 状态码
      },
      errorMessage: {
        mobile: '', // 手机的错误信息
        code: '' // 验证码的错误信息
      }
    }
  },
  methods: {
    ...mapMutations(['updateUserToken']), // 可以导入需要的方法,直接把updateUser方法映射到当前的methods方法中
    // 验证手机号的方法
    checkMoblie () {
      if (!this.loginForm.mobile) {
        // 判断手机判断是否为空,满不满足手机号的格式
        this.errorMessage.mobile = '手机号不能为空'
        return false
      }
      if (!/^1[3-9]\d{9}$/.test(this.loginForm.mobile)) {
        // 利用正则的test 去验证手机号码
        this.errorMessage.mobile = '请输入正确的手机号码'
        return false
      }

      // this.loginForm.mobile = '' // 如果到这个位置说明校验通过了, 因为通过了就不需要任何提示消息了
      return true
    },
    // 验证验证码的方法
    checkCode () {
      if (!this.loginForm.code) {
        this.errorMessage.code = '验证码不能为空'
        return false
      }
      if (!/^\d{6}$/.test(this.loginForm.code)) {
        this.errorMessage.code = '验证码必须是6位'
        return false
      }
      // this.loginForm.code = '' // 这里指的就是通过了
      return true
    },
    async login () {
      //        上面的代码 用了  this.checkMobile()  && this.checkCode()

      // 导致了一个问题, 当手机号校验没有通过的时候. 验证码也不再校验
      if (validateMobile && validateCode) {
        console.log(13)
        // 如果两个检查都是true 就表示通过了校验
        // 校验通过之后就要去调接口 看看用户名密码正确与否
        // axios 不管你成功还是失败 返回都是200状态码
        try {
          const result = await login(this.loginForm)
          // 现在认为所有的手机 号都是成功的
          // console.log(result) 打印结果
          // 拿到token之后 应该把token设置vuex中的state
          // 要去修改vuex中的state必须通过Mutations
          // this.$store.commit() 原始方式
          console.log(result)

          this.updateUserToken({ user: result }) // 相当于更新当前的token 和refresh_token
          // 应该跳转到主页 but 如果此时你这个登录时从别人401之后跳转过来的.你就应该回到那个跳转的页面
          // 判断是否有需要跳转的页面,如果有,就跳转,如果没有 不用管 直接跳到主页

          const { redirectUrl } = this.$route.query // query是查询参数 也就是?后面的参数表
          // redirectUrl 有值得话就跳到这个地址 没值就跳到主页

          this.$router.push(redirectUrl || '/')
        } catch (error) {
          // 告诉用户登录失败了
          this.$notify({ message: '用户名或者验证码错误', duration: 800 })
          console.log(error)
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.login{
  padding: 20px;
}
</style>
