<template>
  <div class="scroll-wrapper">
    <!-- 文章列表 -->
    <!-- van-list组件 如果不加干涉, 初始化完毕 就会检测 自己距离底部的长度,如果超过了限定 ,就会执行 load事件  自动把
       绑定的 loading 变成true
      -->
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      loading-text="加载中"
      :success-text="successText"
    >
      <van-list
        v-model="upLoading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell-group>
          <van-cell v-for="item in articles" :key="item">
            <!-- 放置图片元素 ,有三图, 单图,无图 -->

            <!-- 三图模式,因为下面的模块都一样,所以我们把三个模式合起来 -->
            <div class="article_item">
              <h3 class="van-ellipsis">
                PullRefresh下拉刷新PullRefresh下拉刷新下拉刷新下拉刷新
              </h3>
              <div class="img_box">
                <van-image
                  class="w33"
                  fit="cover"
                  src="https://img.yzcdn.cn/vant/cat.jpeg"
                />
                <van-image
                  class="w33"
                  fit="cover"
                  src="https://img.yzcdn.cn/vant/cat.jpeg"
                />
                <van-image
                  class="w33"
                  fit="cover"
                  src="https://img.yzcdn.cn/vant/cat.jpeg"
                />
              </div>
               <div class="img_box">
                <van-image
                  class="w100"
                  fit="cover"
                  src="https://img.yzcdn.cn/vant/cat.jpeg"
                />
              </div>
              <div class="info_box">
                <span>你像一阵风</span>
                <span>8评论</span>
                <span>10分钟前</span>
                <span class="close"><van-icon name="cross"></van-icon></span>
              </div>
            </div>

          </van-cell>
        </van-cell-group>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data () {
    return {
      successText: '', // 加载成功的文案
      upLoading: false, // 表示是否开启了上拉加载 默认值false
      finished: false, // 表示 是否已经完成所有数据的加载
      isLoading: false, // 下载刷新状态,表示是否在下拉刷新
      articles: [] // 定义一个数组
    }
  },
  methods: {
    onLoad () {
      console.log('开始加载数据')
      // 下面这么写 依然不能关掉加载状态 为什么 ? 因为关掉之后  检测机制  高度还是不够 还是会开启
      // 如果你有数据 你应该 把数据到加到list中
      // 如果想关掉
      // 如果你的数据已经加载完毕 你应该把finished 设置为true 表示一切结束了 不再请求
      // 此时强制的判断总条数 如果超过100条 就直接关闭
      // vant-list组件 第一次加载 需要让 list组件出现滚动条 如果没有滚动条 就没有办法 继续往下拉

      if (this.articles.length > 50) {
        // 如果此时记录已经大于100
        this.finished = true // 关闭加载
      } else {
        const arr = Array.from(
          Array(15),
          (value, index) => this.articles.length + index + 1
        )
        // 上拉加载 不是覆盖之前的数据  应该把数据追加到数组的队尾
        this.articles.push(...arr)
        // 添加完数据 需要手动的关掉 loading
        this.upLoading = false
      }
      // setTimeout(() => {
      //   this.finished = true// 表示 数据已经全部加载完毕 没有数据了
      // }, 1000)
    },
    onRefresh () {
      setTimeout(() => {
        const arr = Array.from(
          Array(5),
          (value, index) => '天台排队' + (index + 1)
        )
        this.articles.unshift(...arr)
        this.successText = `更新了${arr.length}条数据`
        this.isLoading = false
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.article_item {
  h3 {
    font-weight: normal;
    line-height: 2;
  }
  .img_box {
    display: flex;
    justify-content: space-between;
    .w33 {
      width: 33%;
      height: 90px;
    }
    .w100 {
      width: 100%;
      height: 180px;
    }
  }
  .info_box {
    color: #999;
    line-height: 2;
    position: relative;
    font-size: 12px;
    span {
      padding-right: 10px;
      &.close {
        border: 1px solid #ddd;
        border-radius: 2px;
        line-height: 15px;
        height: 12px;
        width: 16px;
        text-align: center;
        padding-right: 0;
        font-size: 8px;
        position: absolute;
        right: 0;
        top: 7px;
      }
    }
  }
}
</style>
