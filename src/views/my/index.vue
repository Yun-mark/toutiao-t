<template>
    <div class="my-container">
      <van-cell-group class="my-info">
        <van-cell :border="false" class="base-info" title="单元格" value="内容" center>
        <van-image slot="icon" width="50" height="50" round fit="cover" src="https://liyun-oss1.oss-cn-beijing.aliyuncs.com/superb-class/image/img/15.jfif?versionId=CAEQDxiBgMDE6OKC2BciIDFkNjhkMDA3YmNkZTQyZThiZjVhYzJlMzkxYTU1NjQ1"></van-image>
        <div slot="title">昵称</div>
        <van-button size="small" round>编辑资料</van-button>
        </van-cell>
        <van-grid :border="false">
          <van-grid-item>
            <div slot="text">
              <div class="span">123</div>
              <div class="text">头条</div>
            </div>
          </van-grid-item>
           <van-grid-item>
            <div slot="text">
              <div class="span">123</div>
              <div class="text">关注</div>
            </div>
          </van-grid-item>
           <van-grid-item>
            <div slot="text">
              <div class="span">123</div>
              <div class="text">粉丝</div>
            </div>
          </van-grid-item>
           <van-grid-item>
            <div slot="text">
              <div class="span">123</div>
              <div class="text">获赞</div>
            </div>
          </van-grid-item>
        </van-grid>

        <van-grid :column-num="2">
         <van-grid-item icon-prefix="toutiao" text="收藏" icon="shoucang"></van-grid-item>
         <van-grid-item icon-prefix="toutiao" text="历史" icon="lishi"></van-grid-item>
        </van-grid>

        <van-cell title="消息通知" is-link to="/" />
        <van-cell title="小邮同学" is-link to="/" />
        <van-cell title="退出登录"/>
      </van-cell-group>
    </div>
</template>

<script>
export default {
  name: 'MyIndex'
}
</script>

<style scoped lang="less">
    .my-container {
      .my-info {
        background-color: #2ebf91;
        background-size: cover;
        .base-info {
          background-color: unset;
        }
        /deep/ .van-grid-item__content {
          background-color: unset;
        }
      }
    }
</style>
