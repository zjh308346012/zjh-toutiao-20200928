<template>
<div class="container">
    <van-nav-bar
  v-if="showBar"
  title="黑马头条"
  right-text="搜索"
  fixed
  @click-right="$router.push('/search')"
/>
<!-- 这里需要用一个容器来承接路由,还要给这个容器设置宽高,因为这样可以避免上面的组件标签遮住下面的样式路由 -->
<div class="wrapper" :class="{notop:!showBar}">
  <!-- 如果是user界面的话 内容就不需要有46px的距离了,因为在这个组件中 并没有van-nav-bar -->
    <router-view></router-view>
</div>
<!-- 底部用Tabbar标签 -->
<van-tabbar fixed route>
  <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
  <van-tabbar-item icon="question-o" to="/question">问答</van-tabbar-item>
  <van-tabbar-item icon="play-circle-o" to="/video">视频</van-tabbar-item>
  <van-tabbar-item icon="friends-o" to="/user">我的</van-tabbar-item>
</van-tabbar>
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

  //控制二级路由容器的高宽
  .wrapper{
      width: 100%;
      height: 100%;
      overflow: hidden;
      padding-top: 46px;
      padding-bottom: 50px;
      box-sizing: border-box;
     &.notop{
        padding-top: 0;
      }

  }
}
</style>
