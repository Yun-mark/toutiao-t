<template>
    <div class="my-container">
      <van-cell-group v-if="user" class="my-info">
        <van-cell :border="false" class="base-info" title="单元格" value="内容" center>
        <van-image class="avatar" slot="icon" width="50" height="50" round fit="cover" src="https://liyun-oss1.oss-cn-beijing.aliyuncs.com/superb-class/image/img/15.jfif?versionId=CAEQDxiBgMDE6OKC2BciIDFkNjhkMDA3YmNkZTQyZThiZjVhYzJlMzkxYTU1NjQ1"></van-image>
        <div slot="title" class="name">昵称</div>
        <van-button size="small" round class="update-btn">编辑资料</van-button>
        </van-cell>
        <van-grid :border="false" class="data-info">
          <van-grid-item class="data-info-item">
            <div slot="text" class="text-wrap">
              <div class="count">123</div>
              <div class="text">头条</div>
            </div>
          </van-grid-item>
           <van-grid-item class="data-info-item">
            <div slot="text" class="text-wrap">
              <div class="count">123</div>
              <div class="text">关注</div>
            </div>
          </van-grid-item>
           <van-grid-item class="data-info-item">
            <div slot="text" class="text-wrap">
              <div class="count">123</div>
              <div class="text">粉丝</div>
            </div>
          </van-grid-item>
           <van-grid-item class="data-info-item">
            <div slot="text" class="text-wrap">
              <div class="count">123</div>
              <div class="text">获赞</div>
            </div>
          </van-grid-item>
        </van-grid>
       </van-cell-group>

        <div v-else class="not-login">
          <div @click="$router.push('/login')">
            <img src="../../assets/phone.jpeg" class="mobile">
          </div>
          <div class="text">登录 / 注册</div>
        </div>

        <van-grid :column-num="2" class="nav-grid mb-4">
         <van-grid-item class="nav-grid-item" icon-prefix="toutiao" text="我的收藏" icon="shoucang"></van-grid-item>
         <van-grid-item class="nav-grid-item" icon-prefix="toutiao" text="历史记录" icon="lishi"></van-grid-item>
        </van-grid>

        <van-cell title="消息通知" is-link to="/" />
        <van-cell class="mb-4" title="智能小珂" is-link to="/" />
        <van-cell @click="onLogout" v-if="user" class="logout-cell" title="退出登录"/>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MyIndex',
  computed: {
    ...mapState(['user'])
  },
  methods: {
    onLogout () {
      this.$dialog.confirm({
        title: '退出提示',
        message: '确认退出吗？'
      })
        .then(() => {
        // 清除用户登录状态
          this.$store.commit('setUser', null)
        })
        .catch(() => {
        // on cancel
        })
    }
  }
}
</script>

<style scoped lang="less">
     .layout-container{
       background-color: #666666;
     }
    .my-container {
      .my-info {
        background:url("../../assets/qian.jpeg") no-repeat;
        background-size: cover;
        .base-info {
          background-color: unset;
          box-sizing: border-box;
          height: 115px;
          padding-top: 38px;
          padding-bottom: 11px;
          .avatar {
             box-sizing: border-box;
             width: 80px!important;
             height: 80px!important;
             border: 1px solid #fff;
             margin-right: 18px;
          }
          .name{
            font-size: 20px;
            color: #fff;
          }
          .update-btn {
            height: 25px;
            font-size: 18px;
            color: #666666;
          }
        }
        .data-info{
          .data-info-item{
            height: 65px;
            color:#fff;
            .text-wrap {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              .count {
                            font-size: 20px;
                          }
                .text{
                            font-size: 14px;
                          }
            }
          }
        }
        /deep/ .van-grid-item__content {
          background-color: unset;
        }
      }
      .not-login {
        height: 180px;
        background: url('../../assets/lan.jpeg') no-repeat;
        background-size: cover;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .mobile {
          width: 66px;
          height: 66px;
          border-radius: 50%;
        }
        .text {
          font-size: 20px;
          color: #fff;
        }
      }
    /deep/  .nav-grid{
        .nav-grid-item {
          height: 70px;
           .toutiao {
            font-size: 22px;
          }
          .toutiao-shoucang {
            color: #eb5253;
          }
          .toutiao-lishi {
            color: #ff9d1d;
          }
          .van-grid-item__text {
            font-size: 15px;
            color: #333333;
          }
         }
        }
     .logout-cell {
       text-align: center;
       color: #d86262;
       font-size: 15px;
     }
     .mb-4 {
       margin-bottom: 8px;
     }
    }
</style>
