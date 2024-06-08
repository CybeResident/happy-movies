<template>
  <div class="detail">
    <div class="page-header">
      <el-row>
        <el-col :span="20" :offset="2">
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
              <!-- :src="getPoster" -->
              <el-image
                :src="require('@/assets/img/common/placeholder.png')"
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
                  alt="加载失败"
                  class="error"
                />
              </el-image>
            </div>
            <div class="text">
              <p>
                导演：<span class="content">{{ this.movieInfo.director }}</span>
              </p>

              <p>
                编剧：<span class="content">{{ this.movieInfo.writer }}</span>
              </p>

              <p>
                主演：<span class="content">{{ this.movieInfo.actor }}</span>
              </p>

              <p>
                类型：<span class="content">{{ this.movieInfo.genre }}</span>
              </p>

              <p>
                制片国家/地区：<span class="content">{{
                  this.movieInfo.country
                }}</span>
              </p>

              <p>
                语言：<span class="content">{{ this.movieInfo.language }}</span>
              </p>

              <p>
                上映日期：<span class="content">{{
                  this.movieInfo.dateReleased
                }}</span>
              </p>

              <p>
                片长：<span class="content">{{ this.movieInfo.duration }}</span>
              </p>

              <p>
                又名：<span class="content">{{ this.movieInfo.alias }}</span>
              </p>

              <p>
                douban：<span class="content">{{
                  this.movieInfo.doubanId
                }}</span>
              </p>

              <p>
                IMDb：<span class="content">{{ this.movieInfo.imdbId }}</span>
              </p>

              <p>
                剧情简介：<span class="content">{{
                  this.movieInfo.description
                }}</span>
              </p>

              <p class="link">
                <span>链接：</span>
                <a :href="getDoubanUrl" target="_blank">
                  <img src="~assets/img/detail/logo_douban.png" alt="" />
                </a>
                <a :href="getImdbUrl" target="_blank">
                  <img src="~assets/img/detail/logo_IMDb.png" alt="" />
                </a>
              </p>
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
// import idSearch from 'search/idSearch.json'
// console.log(idSearch)
import { MovieInfo } from 'common/utils'

import { getDetailInfo } from 'network/detail.js'

export default {
  name: 'Detail',
  data() {
    return {
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
  },
  created() {},
  beforeRouteEnter(to, from, next) {
    getDetailInfo(to.params.doubanId)
      .then((response) => {
        next((vm) => {
          vm.movieInfo = new MovieInfo(response)
          console.log(vm.movieInfo.a)
        })
      })
      .catch((error) => {
        console.log(error)
        next(false)
      })
  },
  components: {},
}
</script>

<style scoped lang="scss">
.detail {
  padding: 30px 0 60px;

  .page-header {
    margin-bottom: 20px;
  }

  .movie-info {
    .title {
      margin: 0 0 15px;
      color: #000;
    }

    .main-info {
      margin-bottom: 30px;
      display: flex;
      align-items: flex-start;

      .poster-container {
        width: 300px;
        margin-right: 20px;

        flex: none;

        .el-image {
          border-radius: 8px;
          background-color: #a4a4a4;
          font-size: 0;
          img {
            width: 100%;
            object-fit: cover;
            object-position: center;
          }
        }
      }

      .text {
        margin-right: 20px;
        padding-right: 20px;
        border-right: 1px dashed #ccc;
        flex: 1;

        > p {
          margin-bottom: 10px;
          line-height: 1.5;
          font-size: 18px;

          .content {
            color: #000;
          }
        }

        .link {
          display: flex;
          justify-content: flex-start;
          align-items: center;

          a {
            width: 25px;
            height: 25px;
            margin-right: 15px;
          }

          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            // object-position: center;
          }
        }
      }

      .rate-list {
        padding-right: 20px;
        flex: none;

        .rate-item {
          font-size: 24px;
          margin-bottom: 40px;

          .title {
            margin-bottom: 15px;
            display: flex;
            align-items: center;

            > img {
              height: 30px;
              width: auto;
              margin-right: 5px;
              object-fit: contain;
            }
          }

          .rate {
            /* width: 100%; */
            margin-bottom: 10px;
            /* text-align: center; */
            font-weight: 700;
            color: #000;
          }

          .vote-num {
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>
