<template>
    <div class="home-container">
      <van-nav-bar class="app-nav-bar">
        <van-button slot="title" class="search-btn" icon="search" type="info" round>搜索</van-button>
      </van-nav-bar>

      <!--文章频道列表-->
      <van-tabs v-model="active" swipeable>
        <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id">
          <article-list :channel="channel"/></van-tab>
      </van-tabs>
    </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/art_list'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList
  },
  data () {
    return {
      active: 2, // 控制被激活的标签
      channels: [] // 频道列表
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      // 请求获取频道数据
      const { data } = await getUserChannels()
      this.channels = data.data.channels
    }
  }
}
</script>

<style scoped lang="less">
 .home-container{
   /deep/ .van-nav-bar__title {
     max-width: none;
   }
   .search-btn{
       width: 277px;
       height: 32px;
       border: none;
       background: #c2e2d1;
       .van-icon {
         font-size: 22px;
       }
       .van-button__text {
         font-size: 18px;
       }
   }
 }
</style>
