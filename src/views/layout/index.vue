<template>
<div class="container">
    <van-nav-bar
  v-if="showBar"
  title="黑马头条"
  right-text="搜索"
  fixed
/>
<div class="wrapper" :class="{}">
    <router-view></router-view>
</div>
</div>
</template>

<script>
export default {
  computed: {
    showBar () {
      return this.$route.path !== '/user' // 这里是判断该页面是否是用户页面,如果是用户页面的话就不需要那个导航
    }
  }
}
</script>
<style lang="less" scoped>
.container{
    width: 100%;
    height: 100%;
    position: relative;
    //要修改vant组件的样式必须加上deep 深度
/deep/  .van-nav-bar {
      background-color: #3296fa;
      .van-nav-bar__title{
          color: #fff;
      }
      .van-nav-bar__text{
          color: #fff;
      }
  }
}
</style>
