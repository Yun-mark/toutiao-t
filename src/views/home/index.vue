<template>
    <div class="home-container">
      <van-nav-bar class="app-nav-bar">
        <van-button slot="title" class="search-btn" icon="search" type="info" round>搜索</van-button>
      </van-nav-bar>

      <van-tabs class="channel-tabs" v-model="active" swipeable>
        <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id">
          <article-list :channel="channel"/></van-tab>

      <div slot="nav-right" class="wap-nav-placeholder"></div>
      <div slot="nav-right" @click="isShow = true" class="wap-nav-wrap">
      <van-icon name="wap-nav"/>
      </div>
      </van-tabs>
     <van-popup
      v-model="isShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      get-container="body"
      :style="{ height: '90%' }"
    >
    <channel-edit :user-channels="channels"
    @close="isShow = false"
    :active="active"
    @update-active= "active = $event" />
    </van-popup>
    </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/art_list'
import ChannelEdit from './components/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      active: 2, // 控制被激活的标签
      channels: [], // 频道列表
      isShow: true
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      // 请求获取频道数据
      let channels = []
      if (this.user) {
        const { data } = await getUserChannels()
        channels = data.data.channels
      } else {
        const localChannels = getItem('user-channels')
        if (localChannels) {
          channels = localChannels
        } else {
          const { data } = await getUserChannels()
          channels = data.data.channels
        }
      }
      this.channels = channels
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
   .channel-tabs {
     /deep/ .van-tab {
       border-right: 1px solid #edeff3;
       border-bottom: 1px solid #edeff3;
       font-size: 15px;
     }
     /deep/ .van-tabs__line {
       bottom: 20px;
       width: 15px !important;
       height: 3px;
       background: #2ebf91;
     }
   }

   .wap-nav-wrap {
     position: fixed;
     right: 0;
     width: 33px;
     height: 43px;
     background-color: #fff;
     display: flex;
     justify-self: center;
     align-items: center;
     opacity: .9;
     .van-icon {
       font-size: 24px;
     }
   }
   .wap-nav-placeholder {
     width: 33px;
     flex-shrink: 0;
   }
 }
</style>
