<template>
  <li class="movie-rank">
    <div class="rank">{{ rank }}</div>
    <!-- src="/api.webp" -->
    <!-- :src="getPoster" -->
    <!-- 'assets/img/common/placeholder.png' -->
    <div class="poster-container" @click="toDetail">
      <el-image
        :src="getPoster"
        :alt="movieInfo.name"
        lazy
        :fit="'contain'"
        class="poster"
      >
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
    </div>
    <div class="movie-info">
      <h3 class="title" @click="toDetail">
        <span href="javascript:;">
          <span>{{ getName || '暂无' }}</span>
          <span class="alias">{{ getAlias }}</span>
        </span>
      </h3>
      <p class="detail">
        <span>类型：{{ movieInfo.genre || '暂无' }}</span>
        <br />
        <span>制片国家/地区：{{ movieInfo.country || '暂无' }}</span>
        <br />
        <span>上映时间：{{ movieInfo.dateReleased || '暂无' }}</span>
        <br />
        <span style="color: #00b51d">
          豆瓣：
          {{
            (movieInfo.doubanRating || '暂无') +
            ' / ' +
            (movieInfo.doubanVotes || '暂无') +
            '人评分'
          }}
        </span>
        <br />
        <!-- #FF9900
        #f5c518 -->
        <span style="color: #ff9900">
          IMDb：
          {{
            (movieInfo.imdbRating || '暂无') +
            ' / ' +
            (movieInfo.imdbVotes || '暂无') +
            '人评分'
          }}
        </span>
      </p>
    </div>
  </li>
</template>

<script>
export default {
  name: 'MovieRank',
  data() {
    return {
      movieInfo: {
        name: this.info.data[0].name,
        originalName: this.info.originalName,
        alias: this.info.alias,
        genre: this.info.data[0].genre,
        country: this.info.data[0].country,
        poster: this.info.data[0].poster,
        dateReleased: this.info.dateReleased,
        doubanRating: this.info.doubanRating,
        doubanVotes: this.info.doubanVotes,
        imdbRating: this.info.imdbRating,
        imdbVotes: this.info.imdbVotes,
        id: this.info.id,
      },
      // info: {},
      // movieInfo: {
      //   name: '',
      //   originalName: '',
      //   alias: '',
      //   genre: '',
      //   country: '',
      //   dateReleased: '',
      //   doubanRating: '',
      //   doubanVotes: '',
      // },
    }
  },
  props: {
    info: {
      type: Object,
      default() {
        return {}
      },
    },
    rank: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    getPoster() {
      // this.movieInfo.poster
      if (false) {
        let modUrl = `https://imageserver.querydata.org/api?url=${this.movieInfo.poster}&width=200&format=webp`
        return modUrl
      } else {
        return require('assets/img/common/placeholder.png')
      }
    },
    getName() {
      if (this.movieInfo.name === this.movieInfo.originalName) {
        return this.movieInfo.name
      } else {
        return this.movieInfo.name + ' / ' + this.movieInfo.originalName
      }
    },
    getAlias() {
      if (this.movieInfo.alias) {
        return ' / ' + this.movieInfo.alias
      } else {
        return ''
      }
    },
  },
  methods: {
    toDetail() {
      this.$router.push({ path: `/detail/${this.movieInfo.id}` })
    },
  },
  components: {},
}
</script>

<style scoped>
.movie-rank {
  height: 220px;
  padding: 15px 10px;
  border-bottom: 1px dashed #ccc;

  display: flex;
}

.movie-rank:last-child {
  border-bottom: none;
}

.movie-rank .rank {
  width: 26px;
  margin-right: 10px;

  flex: none;
}

.movie-rank .poster-container {
  width: 190px;
  height: 100%;
  margin-right: 25px;
  cursor: pointer;

  flex: none;
}

.movie-rank .poster-container .poster,
.movie-rank .poster-container .poster .loading,
.movie-rank .poster-container .poster .error {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.movie-info {
  padding-top: 2px;

  word-wrap: break-word;
  overflow-wrap: break-word;
}

.movie-info .title {
  /* font-size: 16px; */
  margin-bottom: 10px;
  line-height: 1.55;
}

.movie-info .title > span {
  cursor: pointer;
  transition: 0.3s;
}

.movie-info .title > span:hover {
  color: var(--color-high-text);
  background-color: var(--color-tint);
}

.movie-info .title .alias {
  font-weight: 400;
  font-size: 14px;
}

/* .movie-info .detail {
  font-size: 13px;
} */

.movie-info .detail {
  line-height: 1.5;
}
</style>
