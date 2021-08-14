<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="app-nav-bar"
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    ></van-nav-bar>
    <h1 class="title">{{ article.title}}</h1>
    <van-cell center class="user-info">
      <div slot="title" class="name">{{ article.aut_name}}</div>
      <van-image slot="icon" class="avatar" round fit="cover" :src="article.aut_photo"/>
      <div slot="label" class="pubdate">{{ article.pubdate | relativeTime}}</div>
      <van-button
      :type="article.is_followed ? 'default' : 'info'"
      :icon="article.is_followed ? '' : 'plus' "
       round size="small"  class="follow-btn"
       :loading="isFollowLoading"
       @click="onFollow()">
       {{ article.is_followed ? '已关注' : '关注' }}
       </van-button>
    </van-cell>
    <div class="markdown-body" v-html="article.content"
    ref="article-content">
    </div>
    <!--底部区域-->
    <div class="article-bottom">
      <van-button class="comment-btn" type="default" round size="small">
        写评论
      </van-button>
      <van-icon name="comment-o" info="13" color="#777" />
      <van-icon
       :name="article.is_collected ? 'star' : 'star-o'"
       :color="article.is_collected ? 'orange' : '#777'"
       @click="onCollect()"
       />
      <van-icon name="good-job-o" color="#777" />
      <van-icon name="share" color="#777"></van-icon>
    </div>
  </div>
</template>

<script>
import './github-markdown.css'
import { getAriticleById, addCollect, deleteCollect } from '@/api/article'
import { ImagePreview } from 'vant'
import { addFollow, deleteFollow } from '@/api/user'
export default {
  name: 'ArticlePage',
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  components: {
  },
  data () {
    return {
      article: {}, // 文章数据对象
      isFollowLoading: false, // 关注用户按钮的loading状态
      isCollectLoading: false // 收藏
    }
  },
  created () {
    this.loadArticle()
  },
  mounted () {},
  methods: {
    async loadArticle () {
      const { data } = await getAriticleById(this.articleId)
      this.article = data.data
      this.$nextTick(() => {
        this.hanldePreviewImage()
      })
    },
    hanldePreviewImage () {
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      const imgPaths = []
      // 循环img列表，注册点击事件
      imgs.forEach((img, index) => {
        imgPaths.push(img.src)
        img.onclick = function () {
          ImagePreview({
            images: imgPaths, // 预览图片路径列表
            startPosition: index // 起始位置
          })
        }
      })
    },
    async onFollow () {
      this.isFollowLoading = true
      if (this.article.is_followed) {
        // 已经关注了。取消关注
        await deleteFollow(this.article.aut_id)
      } else {
        await addFollow(this.article.aut_id)
      }
      this.article.is_followed = !this.article.is_followed
      this.isFollowLoading = false
    },
    async onCollect () {
      this.$toast.loading({
        message: '收藏ing',
        forbidClick: true // 禁止背景点击
      })
      if (this.article.is_collected) {
        // 已经关注了。取消关注
        await deleteCollect(this.articleId)
      } else {
        await addCollect(this.articleId)
      }
      this.article.is_collected = !this.article.is_collected
      this.$toast.success(`${this.article.is_collected ? '' : '取消'}收藏成功`)
    }
  }
}
</script>

<style scoped lang="less">
.title {
  font-size: 20px;
  color: #3a3a3a;
  padding: 14px;
  margin: 0;
  background-color: #fff;
}
.user-info {
  .avatar {
    width: 35px;
    height: 35px;
    margin-right: 8px;
  }
  .name {
    font-size: 12px;
    color: #333333;
  }
  .pubdate {
    font-size: 11px;
    color: #b4b4b4;
  }
  .follow-btn {
    width: 85px;
    height: 29px;
  }
}
.markdown-body {
  padding: 14px;
  background-color: #fff;
}
</style>
