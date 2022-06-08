<template>
  <div class="home-title">
    <h1>电影搜索</h1>
    <p class="subtitle">基于 Vue2.x + axios + Element UI 的影视作品搜索工具</p>
  </div>
</template>

<script>
export default {
  name: 'HomeTitle',
  data() {
    return {}
  },
  components: {},
}
</script>

<style scoped>
.home-title {
  margin-bottom: 20px;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.subtitle {
  color: #999;
  font-size: 14px;
  text-align: center;
}
</style>
