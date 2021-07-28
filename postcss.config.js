// postcss的配置文件
// postcss.config.js
module.exports = {
  // 自动添加浏览器厂商声明前缀，用来兼容不同的浏览器
  // vuecli已经在内部默认配置了 autoprefixer
  plugins: {
    'postcss-pxtorem': {
      // 转换的根元素基准值
      // 正常情况下，根据设计稿： 750/10 = 75
      // 移动端页面一般都是以 iphone6/7/8 为原型设计的
      // vant组件库是基于逻辑像素375写的
      rootValue: 37.5,
      // 需要转换的css属性。*代表所有的属性
      propList: ['*']
    }
  }
}
