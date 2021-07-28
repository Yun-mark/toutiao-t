<template>
  <div id="app">
    <h2>科技头条</h2>
    <router-view/>
    <van-button type="primary">你好</van-button>
   <div class="box"></div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="less">
.box{
  width: 200px;
  height:200px;
  background-color: pink;
}

</style>
