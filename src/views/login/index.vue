<template>
    <div class="login-container">
      <!--导航栏-->
      <van-nav-bar
      class="app-nav-bar"
      title="注册/登录"
      left-arrow
      @click-left="$router.back()"
    />
    <!--登录表单-->
      <van-form @click="onLogin" :show-error="false" :show-error-message="false"
      @failed="onFailed" validate-first ref="login-form"
      >
        <van-field
          v-model="user.mobile"
          icon-prefix="toutiao"
          left-icon="shouji"
          center
          placeholder="请输入手机号"
          :rules="formRules.mobile"
          name="mobile"
        />
        <van-field
          v-model="user.code"
          clearable
          center
          icon-prefix="toutiao"
          left-icon="yanzhengma"
          placeholder="请输入验证码"
          :rules="formRules.code"
          name="code"
        >
        <template #button>
           <van-count-down :time="1000 * 60" format="ss s"
           @finish="isCountDownShow = false"
           v-if="isCountDownShow" />
           <van-button v-else size="small" round type="primary" @click.prevent="onSendSms"
           :loading="isSendSmsLoading" >发送验证码</van-button>
        </template>
        </van-field>
        <div class="login-btn-wrap">
        <van-button class="login-btn" type="info" block >登录</van-button>
      </div>
      </van-form>
    </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
import { Toast } from 'vant'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      formRules: {
        mobile: [{ required: true, message: '请填写手机号' },
          { pattern: /^1[3|5|7|9]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [{ required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      isCountDownShow: false, // 控制倒计时和发送按钮的显示状态
      isSendSmsLoading: false // 发送验证码按钮的状态
    }
  },
  methods: {
    async onLogin () {
      Toast.loading({
        message: '登录中~',
        forbidClick: true,
        duration: 0
      })
      // 1.找到数据接口
      // 2.封装请求方法
      // 3.请求调用登录
      try {
        const res = await login(this.user)
        console.log(res)
        Toast.success('登录成功')
      } catch (err) {
        console.log(err)
        Toast.fail('登录失败,手机号或验证码错误')
      }
    },
    onFailed (error) {
      if (error.errors[0]) {
        this.$toast({
          message: error.errors[0].message,
          position: 'top'
        })
      }
    },
    async onSendSms () {
      try {
        await this.$refs['login-form'].validate('mobile')
        // 验证通过，请求发送验证码
        this.isSendSmsLoading = true // 展示按钮的loading，防止网络慢用户多次点击触发发送行为
        await sendSms(this.user.mobile)
        this.isCountDownShow = true
      } catch (err) {
        let message = ''
        if (err && err.response && err.response.status === 429) {
          // 发送短信失败的错误提示
          message = '发送太频繁了，请稍后重试'
        } else if (err.name === 'mobile') {
          // 表单验证失败的错误提示
          message = err.message
        } else {
          // 未知错误
          message = '发送失败，请稍后重试'
        }
        // 提示用户
        this.$toast({
          message,
          position: 'top'
        })
      }

      // 关闭loading
      this.isSendSmsLoading = false
    }
  }
}

</script>

<style scoped lang="less">
.login-container{
  .login-btn-wrap{
    padding: 26px 16px;
    .login-btn {
      background-color: #2ebf91;
      border: none;
      .van-button__text {
        font-size: 20px;
      }
    }
  }
  .toutiao-shouji{
    font-size: 15px !important;
  }
}
</style>
