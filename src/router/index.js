import Vue from 'vue'
import VueRouter from 'vue-router'

// 2级路由引入
const Layout = () => import('@/views/layout') // 按需引入layout

const Home = () => import('@/views/home') // 按需引入二级路由

const Question = () => import('@/views/question') // 按需引入question路由

const Video = () => import('@/views/video') // 按需引入video路由

const User = () => import('@/views/user') // 按需引入user路由

// 1级路由引入

const Login = () => import('@/views/login') // 按需引入登录路由

const chat = () => import('@/views/user/chat') // 按需引入小智同学

const profile = () => import('@/views/user/profile') // 编辑资料

const search = () => import('@/views/search') // 搜索中心

const searchResult = () => import('@/views/search/searchResult') // 搜索结果

const article = () => import('@/views/article') // 文章中心

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Layout, // 布局组件,一级路由
    children: [{
      path: '', // 如果不写, 默认就是二级路由的默认组件
      component: Home
    },
    {
      path: '/question',
      name: 'Question',
      component: Question // 问答组件
    },
    {
      path: '/video',
      name: 'Video',
      component: Video // 视频组件
    },
    {
      path: '/user',
      name: 'User',
      component: User // 用户组件
    }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login // 登录路由
  },
  {
    path: '/user/chat',
    name: 'Chat',
    component: chat // 小智同学路由
  },
  {
    path: '/user/profile',
    name: 'Profile',
    component: profile // 编辑资料路由
  },
  {
    path: '/search',
    name: 'Search',
    component: search // 搜索路由
  },
  {
    path: '/searchResult',
    name: 'SearchResult',
    component: searchResult // 搜索结果路由
  },
  {
    path: '/article',
    name: 'Article',
    component: article // 文章详情路由
  }

]

const router = new VueRouter({
  routes
})

export default router
