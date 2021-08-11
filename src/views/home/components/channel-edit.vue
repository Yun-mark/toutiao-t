<template>
    <div class="channel-edit">
        <van-cell center :border="false">
            <div slot="title" class="channel-title">我的频道</div>
            <van-button @click="isEdit = !isEdit" type="danger" plain round size="mini">{{ isEdit ? '完成' : '编辑'}}</van-button>
        </van-cell>
        <van-grid :gutter="10">
            <van-grid-item @click="onUserChannelClick(channel ,index)" class="grid-item" :class="{ active: index === active}" v-for="(channel, index) in userChannels" :key="index" :text="channel.name"
             :icon="(isEdit && index !== 0 )? 'clear' : ''"></van-grid-item>
        </van-grid>
        <van-cell center :border="false">
            <div slot="title" class="channel-title">频道推荐</div>
        </van-cell>
        <van-grid :gutter="10" >
            <van-grid-item @click="onAdd(channel)" class="grid-item"  v-for="(channel, index) in recommendChannels" :key="index" :text="channel.name"></van-grid-item>
        </van-grid>
    </div>
</template>

<script>
import { getAllChannels, addUserChannel, deleteUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  data () {
    return {
      allChannels: [], // 所有频道数据列表
      isEdit: false // 控制编辑的显示状态
    }
  },
  computed: {
    // 推荐的频道列表
    ...mapState(['user']),
    // 计算属性会观测内部依赖数据的变化而重新求值
    recommendChannels () {
      return this.allChannels.filter(channel => {
        return !this.userChannels.find(userChannel => {
          return userChannel.id === channel.id
        })
      })
    }
  },
  created () {
    this.loadAllChannels()
  },
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  methods: {
    async loadAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },
    async onAdd (channel) {
      try {
        if (this.user) {
          await addUserChannel({
            id: channel.id,
            seq: this.userChannels.length
          })
        } else {
          setItem('user-channels', this.userChannels)
        }
        this.userChannels.push(channel)
      } catch (err) {
        console.log(err)
        this.$toast('添加失败，请稍后重试')
      }
    },
    onUserChannelClick (channel, index) {
      if (this.isEdit && index !== 0) {
      // 编辑状态，删除频道
        this.deleteChannel(channel, index)
      } else {
        // 非编辑状态，切换频道
        this.switchChannel(index)
      }
    },

    async deleteChannel (channel, index) {
      if (index <= this.active) {
        this.$emit('update-active', this.active - 1)
      }
      this.userChannels.splice(index, 1)

      // 数据持久化
      if (this.user) {
        await deleteUserChannel(channel.id)
      } else {
        setItem('user-channels', this.userChannels)
      }
    },
    switchChannel (index) {
      this.$emit('update-active', index)
      this.$emit('close')
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
             margin-top: 0;
         }
     }
     /deep/ .van-grid-item__icon {
       position: absolute;
       right: -5px;
       top: -5px;
       font-size: 20px;
       color: #ccc;
     }
    }

    .active {
      /deep/ .van-grid-item__text {
        color: red !important;
      }
    }
}
</style>
