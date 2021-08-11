<template>
    <div class="user-profile">
        <van-nav-bar
      class="app-nav-bar"
      title="个人中心"
      left-arrow
      @click-left="$router.back()"
    />
    <!--导航栏-->
    <van-cell title="头像" is-link center>
        <van-image width="30" height="30" round fit="cover" :src="user.photo" />
    </van-cell>
    <van-cell title="昵称" @click="isEditNameShow = true" is-link :value="user.name"></van-cell>
    <van-cell title="性别" is-link :value="user.gender === 0 ? '男' : '女'"></van-cell>
    <van-cell title="生日" is-link :value="user.birthday"></van-cell>
    <van-popup v-model="isEditNameShow" position="bottom" :style="{ height: '100%'}">
      <update-name @close="isEditNameShow = false"
       @update-name="user.name = $event"
       :name="user.name" />
    </van-popup>
    </div>
</template>
<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/update-name'
export default {
  name: 'UserProfile',
  data () {
    return {
      user: {}, // 用户数据
      isEditNameShow: false// 编辑昵称的显示状态
    }
  },
  components: {
    UpdateName
  },
  created (
    UpdataName) {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile () {
      const { data } = await getUserProfile()
      this.user = data.data
    }
  }
}
</script>
<style lang="less" scoped>
.van-popup {
    background-color: #f5f7f9;
}
</style>
