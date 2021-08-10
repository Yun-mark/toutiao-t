<template>
    <div class="channel-edit">
        <van-cell center :border="false">
            <div slot="title" class="channel-title">我的频道</div>
            <van-button type="danger" plain round size="mini">编辑</van-button>
        </van-cell>
        <van-grid :gutter="10">
            <van-grid-item class="grid-item" v-for="(channel, index) in userChannels" :key="index" :text="channel.name"></van-grid-item>
        </van-grid>
        <van-cell center :border="false">
            <div slot="title" class="channel-title">频道推荐</div>
        </van-cell>
        <van-grid :gutter="10" >
            <van-grid-item  class="grid-item" v-for="(channel, index) in userChannels" :key="index" :text="channel.name"></van-grid-item>
        </van-grid>
    </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'
export default {
  name: 'ChannelEdit',
  data () {
    return {
      allChannels: []// 所有频道数据列表
    }
  },
  created () {
    this.loadAllChannels()
  },
  props: {
    userChannels: {
      type: Array,
      required: true
    }
  },
  methods: {
    async loadAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    }
  }
}
</script>
<style lang="less" scoped>
.channel-edit {
    padding-top: 54px ;
    .channel-title {
        font-size: 16px;
        color: #333333;
    }
    .grid-item {
        width: 80px;
        height: 43px;
     /deep/ .van-grid-item__content {
         background-color: #f4f5f6;
         .van-grid-item__text {
             font-size: 14px;
             color: #222;
         }
     }
    }
}
</style>
