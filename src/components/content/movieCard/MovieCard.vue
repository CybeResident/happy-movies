<template>
  <div class="movie-card" @click="toDetail">
    <el-card :body-style="{ padding: '0px' }" shadow="hover">
      <el-image :src="getPoster" :fit="'contain'" :alt="movieInfo.name" lazy>
        <img
          slot="placeholder"
          src="~assets/img/common/placeholder.png"
          alt="加载中..."
          class="loading"
        />
        <img
          slot="error"
          src="~assets/img/common/placeholder.png"
          alt="加载中..."
          class="error"
        />
      </el-image>
      <div class="movie-info">
        <h3 class="title">{{ movieInfo.name }}</h3>
        <p class="detail">
          <span>类型：{{ movieInfo.genre }}</span>
          <br />
          <span>制片国家/地区：{{ movieInfo.country }}</span>
          <br />
          <span>上映时间：{{ movieInfo.dateReleased }}</span>
          <br />
          <span>豆瓣评分：{{ movieInfo.doubanRating }}</span>
          <br />
        </p>
      </div>
    </el-card>
  </div>
</template>

<script>
// import { MovieInfo } from 'common/utils'
import { movieInfoMixin } from 'common/mixin'

export default {
  name: 'MovieCard',
  mixins: [movieInfoMixin],
  data() {
    return {}
  },
  props: {},
  computed: {},
  methods: {},
  created() {},
  components: {},
}
</script>

<style scoped lang="scss">
.el-card {
  width: 100%;
  height: 100%;
  cursor: pointer;

  &.is-hover-shadow:hover {
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.3);
  }
}

.el-image {
  width: 100%;

  .loading,
  .error {
    width: 100%;
    object-fit: contain;
  }
}

.movie-info {
  padding: 5px;

  word-wrap: break-word;
  overflow-wrap: break-word;

  .title {
    margin-bottom: 5px;
    text-align: center;
  }

  .detail {
    font-size: 13px;
    line-height: 1.5;
  }
}
</style>
