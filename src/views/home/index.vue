<template>

  <div class="container">
    <van-tabs color="#3296fa">
        <!-- 内部需要放置子 标签  title值为当前显示的内容-->
         <!-- van-tab是vant组件的样式  -->
  <van-tab v-for="item in channels" :title="item.name " :key="item.id">

    <!-- <div class="scroll-wrapper">
      <van-cell-group>
  <van-cell title="单元格" value="内容" v-for="item in 15 " :key="item"/>
</van-cell-group> -->
 <!-- 这里注意 这个div设置了滚动条 目的是 给后面做 阅读记忆 留下伏笔 -->
        <!-- 阅读记忆 => 看文章看到一半 滑到中部 去了别的页面 当你回来时 文章还在你看的位置 -->
    <!-- </div> -->
    <ArticleList/>
  </van-tab>
</van-tabs>
  <!-- 在tabs下放置图标  编辑频道的图标 -->
      <span class="bar_btn">
        <!-- 放入图标 vant图标 -->
         <van-icon name='wap-nav'></van-icon>
      </span>
  </div>

</template>

<script>
import ArticleList from './components/article-list'
import { getMyChannels } from '@/api/channels.js'
export default {
  components: {
    ArticleList
  },
  data () {
    return {
      channels: []
    }
  },
  methods: {
    async  getMyChannels () {
      const data = await getMyChannels() // 接收返回的数据结果
      this.channels = data.channels
      console.log(this.channels)
    }
  },
  created () {
    this.getMyChannels()
  }
}
</script>

<style lang="less" scoped>
.van-tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
  /deep/ .van-tabs__wrap {
    height: 36px;
    padding-right: 36px;
    .van-tab {
      line-height: 36px;
    }
    .van-tabs__line {
      background-color: #3296fa;
      height: 2px;
    }
  }
  /deep/ .van-tabs__content{
    flex: 1;
    overflow: hidden;
  }
  /deep/ .van-tab__pane{
    height: 100%;
    .scroll-wrapper{
      height: 100%;
      overflow-y: auto;
    }
  }

}
.bar_btn {
  width: 36px;
  height: 35px;
  position: absolute;
  top: 0;
  right: 0;
  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 999;
    box-shadow: 0 0 10px #999;
    transform: scale(1, 0.6);
  }
  .van-icon-wap-nav {
    width: 100%;
    height: 100%;
    background: #fff;
    text-align: center;
    line-height: 35px;
    position: relative;
    z-index: 1000;
    &::before {
      font-size: 20px;
    }
  }
}
</style>
