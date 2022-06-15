<template>
  <div class="detail">
    <div class="page-header">
      <el-row>
        <el-col :span="20" :offset="2">
          <!--  content="详细介绍" -->
          <!-- <el-page-header @back="goBack"></el-page-header> -->
          <el-button
            plain
            icon="el-icon-arrow-left"
            size="medium"
            @click.native="goBack"
          >
            返回
          </el-button>
        </el-col>
      </el-row>
    </div>

    <div class="movie-info">
      <el-row>
        <el-col :span="16" :offset="4">
          <h1 class="title">{{ this.movieInfo.name }}</h1>
          <div class="main-info">
            <div class="poster-container">
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
            <div class="text">
              <span>导演：{{ this.movieInfo.director }}</span>
              <br />
              <span>编剧：{{ this.movieInfo.writer }}</span>
              <br />
              <span>主演：{{ this.movieInfo.actor }}</span>
              <br />
              <span>类型：{{ this.movieInfo.genre }}</span>
              <br />
              <span>制片国家/地区：{{ this.movieInfo.country }}</span>
              <br />
              <span>语言：{{ this.movieInfo.language }}</span>
              <br />
              <span>上映日期：{{ this.movieInfo.dateReleased }}</span>
              <br />
              <span>片长：{{ this.movieInfo.duration }}</span>
              <br />
              <span>又名：{{ this.movieInfo.alias }}</span>
              <br />
              <span>douban：{{ this.movieInfo.doubanId }}</span>
              <br />
              <span>IMDb：{{ this.movieInfo.imdbId }}</span>
              <br />
              <span>剧情简介：{{ this.movieInfo.description }}</span>
              <br />
              <span class="link">
                <span>链接：</span>
                <a :href="getDoubanUrl" target="_blank">
                  <img src="~assets/img/detail/logo_douban.png" alt="" />
                </a>
                <a :href="getImdbUrl" target="_blank">
                  <img src="~assets/img/detail/logo_IMDb.png" alt="" />
                </a>
              </span>
              <br />
            </div>
            <ul class="rate-list">
              <li class="rate-item">
                <div class="title">
                  <img src="~assets/img/detail/logo_douban.png" alt="" />
                  <span>豆瓣</span>
                </div>
                <p class="rate">{{ this.movieInfo.doubanRating }}</p>
                <p class="vote-num">
                  {{ `${this.movieInfo.doubanVotes}人评分` }}
                </p>
              </li>
              <li class="rate-item">
                <div class="title">
                  <img src="~assets/img/detail/logo_IMDb.png" alt="" />
                  <span>IMDb</span>
                </div>
                <p class="rate">{{ this.movieInfo.imdbRating }}</p>
                <p class="vote-num">
                  {{ `${this.movieInfo.imdbVotes}人评分` }}
                </p>
              </li>
              <li class="rate-item">
                <div class="title">
                  <img src="~assets/img/detail/logo_RottenTomato.png" alt="" />
                  <span>烂番茄</span>
                </div>
                <p class="rate">{{ this.movieInfo.rottenRating }}</p>
                <p class="vote-num">
                  {{ `${this.movieInfo.rottenVotes}人评分` }}
                </p>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import idSearch from 'search/idSearch.json'
// console.log(idSearch)

export default {
  name: 'Detail',
  data() {
    return {
      // movieInfo: {
      //   name: this.info.data[0].name,
      //   originalName: this.info.originalName,
      //   alias: this.info.alias,
      //   genre: this.info.data[0].genre,
      //   country: this.info.data[0].country,
      //   poster: this.info.data[0].poster,
      //   dateReleased: this.info.dateReleased,
      //   doubanRating: this.info.doubanRating,
      //   doubanVotes: this.info.doubanVotes,
      //   imdbRating: this.info.imdbRating,
      //   imdbVotes: this.info.imdbVotes,
      //   id: this.info.id,
      // },
      // movieInfo: {
      //   name: '',
      //   originalName: '',
      //   alias: '',
      //   genre: '',
      //   country: '',
      //   poster: '',
      //   language: '',
      //   dateReleased: '',
      //   doubanRating: '',
      //   doubanVotes: '',
      //   doubanId: '',
      //   imdbRating: '',
      //   imdbVotes: '',
      //   imdbId: '',
      //   rottenRating: '',
      //   rottenVotes: '',
      //   duration: '',
      //   writer: '',
      //   director: '',
      // },
      movieInfo: {},
    }
  },
  computed: {
    getPoster() {
      if (this.movieInfo.poster) {
        let modUrl = `https://imageserver.querydata.org/api?url=${this.movieInfo.poster}&width=200&format=webp`
        return modUrl
      } else {
        return require('assets/img/common/placeholder.png')
      }
    },
    getDoubanUrl() {
      return `https://movie.douban.com/subject/${this.movieInfo.doubanId}`
    },
    getImdbUrl() {
      return `https://www.imdb.com/title/${this.movieInfo.imdbId}`
    },
  },
  methods: {
    goBack() {
      history.back()
    },
    getMovieInfo() {
      class MovieInfo {
        constructor(info) {
          this.dataCn = this.getDataCn(info.data)
          this.name = this.dataCn[0].name || '暂无'
          this.poster = this.dataCn[0].poster || '暂无'
          this.genre = this.dataCn[0].genre || '暂无'
          this.country = this.dataCn[0].country || '暂无'
          this.language = this.dataCn[0].language || '暂无'
          this.description = this.dataCn[0].description || '暂无'
          this.writer = (info.writer && this.getWriter(info.writer)) || '暂无'
          this.director =
            (info.director && this.getDirector(info.director)) || '暂无'
          this.actor = (info.actor && this.getActor(info.actor)) || '暂无'
          this.originalName = info.originalName || '暂无'
          this.alias = info.alias || '暂无'
          this.dateReleased = info.dateReleased || '暂无'
          this.doubanRating = info.doubanRating || '暂无'
          this.doubanVotes = info.doubanVotes || '暂无'
          this.doubanId = info.doubanId || '暂无'
          this.imdbRating = info.imdbRating || '暂无'
          this.imdbVotes = info.imdbVotes || '暂无'
          this.imdbId = info.imdbId || '暂无'
          this.rottenRating = info.rottenRating || '暂无'
          this.rottenVotes = info.rottenVotes || '暂无'
          this.duration = info.duration || '暂无'
        }
        getWriter(writerList) {
          return writerList
            .map((element) => {
              return element.data[0].name
            })
            .join(' / ')
        }
        getDirector(directorList) {
          return directorList
            .map((element) => {
              return element.data[0].name
            })
            .join(' / ')
        }
        getActor(actorList) {
          return actorList
            .map((element) => {
              return element.data[0].name
            })
            .join(' / ')
        }
        getDataCn(data) {
          return data.filter((element) => element.lang.toLowerCase() === 'cn')
        }
      }
      this.movieInfo = new MovieInfo(idSearch)
      console.log(this.movieInfo)
    },
  },
  created() {
    this.getMovieInfo()
  },
  components: {},
}
</script>

<style scoped>
.detail {
  padding: 30px 0 60px;
}

.detail .page-header {
  margin-bottom: 20px;
}

.detail .movie-info .title {
  margin: 0 0 15px;
  color: #000;
}

.detail .movie-info .main-info {
  margin-bottom: 30px;
  display: flex;
  align-items: flex-start;
}

.detail .movie-info .main-info .poster-container {
  width: 300px;
  margin-right: 20px;

  flex: none;
}

.detail .movie-info .main-info .poster-container .el-image {
  border-radius: 8px;
}

.detail .movie-info .main-info .poster-container .poster,
.detail .movie-info .main-info .poster-container .poster .loading,
.detail .movie-info .main-info .poster-container .poster .error {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.detail .movie-info .main-info .text {
  margin-right: 20px;
  padding-right: 20px;
  border-right: 1px dashed #ccc;
  flex: 1;
}

.detail .movie-info .main-info .text > span {
  /* margin-bottom: 10px; */
  line-height: 1.6;
  font-size: 18px;
}

.detail .movie-info .main-info .text .link {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.detail .movie-info .main-info .text .link a {
  width: 25px;
  height: 25px;
  margin-right: 15px;
}

.detail .movie-info .main-info .text .link img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.detail .movie-info .main-info .rate-list {
  padding-right: 20px;
  flex: none;
}

.detail .movie-info .main-info .rate-list .rate-item {
  font-size: 24px;
  margin-bottom: 40px;
}

.detail .movie-info .main-info .rate-list .rate-item .title {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.detail .movie-info .main-info .rate-list .rate-item .title > img {
  height: 30px;
  width: auto;
  margin-right: 5px;
  object-fit: contain;
}

.detail .movie-info .main-info .rate-list .rate-item .rate {
  /* width: 100%; */
  margin-bottom: 10px;
  /* text-align: center; */
  font-weight: 700;
  color: #000;
}

.detail .movie-info .main-info .rate-list .rate-item .vote-num {
  font-size: 16px;
}
</style>
