<template>
  <div class="home-carousel">
    <el-row type="flex" justify="center" align="middle">
      <h1 class="carousel-title">电影推荐</h1>
    </el-row>
    <el-row type="flex" justify="center" align="middle">
      <el-col :span="12">
        <el-carousel type="card" trigger="click" :autoplay="false">
          <el-carousel-item v-for="(item, index) in posters" :key="index">
            <img
              class="poster"
              :src="item.img"
              alt="poster"
              @click="jumpToMovie(item.link, $event)"
            />
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'HomeCarousel',
  data() {
    return {
      posters: [],
    }
  },
  methods: {
    // TODO: 点击图片，跳转到电影介绍页面
    jumpToMovie(url, event) {
      window.open(url, '_blank', 'noopener')
    },

    getPosters(imgListLength = 5) {
      // TODO: 获取当前页面下所有文件路径
      let context = require.context(
        '@/assets/img/homeCarousel',
        false,
        /(.*)\.(jpg|jpeg|png|webp)$/
      )

      // TODO: 获取文件路径
      let fileList = context.keys()

      let imgListOrigin = fileList.concat()
      let imgListOriginLength = imgListOrigin.length

      var imgList = []

      for (var i = 0; i < imgListLength; i++) {
        var ranIndex = Math.floor(Math.random() * (imgListOriginLength - i))
        imgList.push(imgListOrigin[ranIndex])
        imgListOrigin[ranIndex] = imgListOrigin[imgListOriginLength - i - 1]
      }

      // TODO: 把解析后的文件路径放到 data 的 posters 中
      this.posters = imgList.map((item, index) => {
        // TODO: 加载文件
        let img = context(item)
        return {
          img,
          link: 'https://movie.douban.com/subject/26996640/',
        }
      })
    },
  },
  components: {},
  created() {
    this.getPosters(5)
  },
}
</script>

<style scoped lang="scss">
/* 参考官方文档，为海报设置后备背景颜色 */
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

/* 设置海报样式 */
.el-carousel__item .poster {
  width: 100%;
  height: 100%;
  object-position: center top;
  object-fit: cover;
}

.home-carousel ::v-deep {
  .carousel-title {
    font-size: 50px;
  }
  .el-carousel__container {
    height: 35vw;
    min-height: 340px;
  }
}
</style>
