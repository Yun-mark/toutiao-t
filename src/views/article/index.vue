<template>
  <div class="article-container page-container" ref="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-navbar"
      fixed
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <!-- 加载中：loading -->
    <loading-page v-if="loading" />
    <!-- /加载中：loading -->

    <!-- 加载完成：文章详情 -->
    <template v-else-if="article.title">
      <div class="detail">
        <h3>{{ article.title }}</h3>
        <article-auth :article="article" />
        <div
          class="markdown-body"
          v-html="article.content"
          ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>
      </div>

      <van-cell ref="comment-area-tip" title="全部评论" :border="false" />

      <!-- 文章评论列表 -->
      <comment-list
        v-model="articleComments"
        :source="articleId"
        :total-count.sync="commentCount"
        @click-reply="onReplyShow"
      />
      <!-- /文章评论列表 -->

      <!-- 底部区域 -->
      <article-footer
        :article="article"
        :comment-count="commentCount"
        @click-write="isPostCommentShow = true"
        @click-comment="onCommentClick"
      />
      <!-- /底部区域 -->
    </template>
    <!-- /加载完成：文章详情 -->

    <!-- 加载失败：错误页面 -->
    <error-page v-else @btn-click="loadArticle" />
    <!-- /加载失败：错误页面 -->

    <!-- 发布文章评论 -->
    <van-popup
      v-model="isPostCommentShow"
      position="bottom"
      get-container="body"
    >
      <post-comment :target="articleId" @post-success="onPostSuccess" />
    </van-popup>
    <!-- /发布文章评论 -->

    <!-- 评论回复 -->
    <van-popup
      v-model="isReplyShow"
      position="bottom"
      get-container="body"
      :style="{ height: '90%' }"
    >
      <comment-reply
        v-if="isReplyShow"
        :article-id="articleId"
        :comment="currentReplyComment"
        @click-close="isReplyShow = false"
      />
    </van-popup>
    <!-- 评论回复 -->
  </div>
</template>

<script>

export default {
  name: 'ArticlePage',
  props: {
    articleId: {
      type: [String, Number],
      required: true
    }
  },
  components: {
  },
  data () {
    return {
      loading: true, // 控制加载中的 loading 状态
      article: {}, // 文章详情
      currentReplyComment: {},
      isReplyShow: false,
      isPostCommentShow: false,
      articleComments: [],
      commentCount: 0
    }
  }
}
</script>

<style scoped lang="less">
</style>
