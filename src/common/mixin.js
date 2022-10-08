import { MovieInfo } from 'common/utils'
import { CHANGE_ISJUMPING } from 'store/mutation-types'

// 混入到搜索结果展示的 MovieCard 中
export const movieInfoMixin = {
  data() {
    return {
      movieInfo: {},
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
      if (this.movieInfo.poster) {
        let modUrl = `https://imageserver.querydata.org/api?url=${this.movieInfo.poster}&width=200&format=webp`
        return modUrl
      } else {
        return require('assets/img/common/placeholder.png')
      }
    },
  },
  methods: {
    toDetail() {
      this.$store.commit(CHANGE_ISJUMPING, { isJumping: true })

      this.$router
        .push({ path: `/detail/${this.movieInfo.doubanId}` })
        .then(success => {
          this.$store.commit(CHANGE_ISJUMPING, { isJumping: false })
        })
        .catch(error => {
          console.error(error)
          this.$store.commit(CHANGE_ISJUMPING, { isJumping: false })
          this.$message({
            message: '点击太快了，休息一下吧！ヾ(•ω•`)o',
            type: 'warning',
            showClose: true,
          })
        })
    },
  },

  created() {
    this.movieInfo = new MovieInfo(this.info)
  },
}