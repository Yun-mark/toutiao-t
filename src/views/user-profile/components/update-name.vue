<template>
  <div>
    <van-nav-bar title="修改昵称" left-text="取消" right-text="完成"
    @click-left="$emit('close')" @click-right="onConfirm"></van-nav-bar>
    <div class="name-field-wrap">
      <van-field v-model="localName" rows="2" autosize type="textarea" maxlength="7" placeholder="请输入昵称" show-word-limit />
    </div>
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'UpdateName',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      localName: this.name
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true // 禁止背景点击
      })

      try {
        // 请求提交更新用户昵称
        await updateUserProfile({
          name: this.localName
        })

        this.$toast.success('保存成功')

        // 更新成功，修改父组件，关闭弹出层
        this.$emit('update-name', this.localName)
        this.$emit('close')
      } catch (err) {
        if (err && err.response && err.response.status === 409) {
          this.$toast.fail('昵称已存在')
        }
      }
    }
  }
}
</script>

<style>
 .name-field-wrap{
   padding: 10px;
 }
</style>
