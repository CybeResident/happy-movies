<template>
  <li class="movie-rank">
    <div class="rank">{{ rank }}</div>
    <div class="poster-container" @click="toDetail">
      <!-- :src="getPoster" -->
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
      <h3 class="title">
        <span @click="toDetail">
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
import { movieInfoMixin } from 'common/mixin'

export default {
  name: 'MovieRank',
  mixins: [movieInfoMixin],
  data() {
    return {}
  },
  props: {
    rank: {
      type: Number,
      default: 1,
    },
  },
  computed: {
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
  methods: {},
  created() {},
  components: {},
}
</script>

<style scoped lang="scss">
.movie-rank {
  height: 220px;
  padding: 15px 10px;
  border-bottom: 1px dashed #ccc;

  display: flex;

  &:last-child {
    border-bottom: none;
  }

  .rank {
    width: 26px;
    margin-right: 10px;

    flex: none;
  }

  .poster-container {
    width: 190px;
    height: 100%;
    margin-right: 25px;
    cursor: pointer;

    flex: none;

    .poster {
      &,
      // 因为占位内容是<img>，而组件 el-image 的属性 fit 的作用范围是不包含展位内容的，所以需要
      .loading,
      .error {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      // width: 100%;
      // height: 100%;
    }
  }
}

.movie-info {
  padding-top: 2px;

  word-wrap: break-word;
  overflow-wrap: break-word;

  .title {
    /* font-size: 16px; */
    margin-bottom: 10px;
    line-height: 1.55;

    /* 限制标题显示行数为2行 */
    display: -webkit-box;
    -webkit-box-orient: vertical;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;

    > span {
      cursor: pointer;
      transition: 0.3s;

      &:hover {
        color: var(--color-high-text);
        background-color: var(--color-tint);
      }
    }

    .alias {
      font-weight: 400;
      font-size: 14px;
    }
  }

  .detail {
    line-height: 1.5;
  }
}

.movie-info .title {
  /* font-size: 16px; */
  margin-bottom: 10px;
  line-height: 1.55;

  /* 限制标题显示行数为2行 */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
