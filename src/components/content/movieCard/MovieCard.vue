<template>
  <el-card :body-style="{ padding: '0px' }" shadow="hover">
    <!-- /api.webp -->
    <el-image src="/api.webp" :fit="'contain'" :alt="movieInfo.name" lazy>
      <img
        slot="placeholder"
        src="~assets/img/common/placeholder.png"
        alt="加载中..."
        class="loading"
      />
    </el-image>
    <!-- <img src="~assets/img/api.webp" :alt="movieInfo.name" /> -->
    <div class="movie-info">
      <h3 class="title">{{ movieInfo.name }}</h3>
      <p class="detail">
        <span>类型：{{ movieInfo.genre || '暂无' }}</span>
        <br />
        <span>制片国家/地区：{{ movieInfo.country || '暂无' }}</span>
        <br />
        <span>上映时间：{{ movieInfo.dateReleased || '暂无' }}</span>
        <br />
        <span>豆瓣评分：{{ movieInfo.doubanRating || '暂无' }}</span>
        <br />
      </p>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'MovieCard',
  data() {
    return {
      movieInfo: {
        name: this.info.data[0].name,
        genre: this.info.data[0].genre,
        country: this.info.data[0].country,
        // poster: this.poster,
        dateReleased: this.info.dateReleased,
        doubanRating: this.info.doubanRating,
      },
    }
  },
  props: {
    info: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  computed: {
    getPoster() {
      if (this.info.data[0].poster) {
        let modUrl = `https://imageserver.querydata.org/api?url=${this.info.data[0].poster}&width=200&format=webp`
        return modUrl
      } else {
        return 'assets/img/common/placeholder.png'
      }
    },
  },
  methods: {},
  components: {},
}
</script>

<style scoped>
.el-card {
  cursor: pointer;
}

/* .el-card img {
  width: 100%;
  object-fit: contain;
} */

.el-card.is-hover-shadow:hover {
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.3);
}

.el-image {
  width: 100%;
  /* height: auto; */
}

.el-image .loading {
  width: 100%;
  object-fit: contain;
}

.movie-info {
  padding: 5px;

  word-wrap: break-word;
  overflow-wrap: break-word;
}

.movie-info .title {
  margin-bottom: 5px;
  text-align: center;
}

.movie-info .detail {
  font-size: 13px;
}

.movie-info .detail > span {
  line-height: 1.5;
}
</style>
