<template>
  <div class="home">
    <el-row>
      <el-col :span="14" :offset="5">
        <home-title></home-title>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import HomeTitle from './childComps/HomeTitle.vue'

export default {
  name: 'Home',
  data() {
    return {
      result: [
        {
          data: [
            {
              createdAt: 1604966873814,
              updatedAt: 1604966873814,
              id: '5fa9d9d97c34497277511f79',
              poster:
                'https://wmdb.querydata.org/movie/poster/1604966872612-g2g8a9.jpg',
              name: '英雄本色',
              genre: '剧情/动作/犯罪',
              description:
                '香港某个国际伪钞集团重要分子宋子豪（狄龙 饰）和Mark（周润发 饰）情同手足，某次宋子豪带手下谭成（李子雄 饰）去台北交易时被其出卖受枪伤被捕入狱，为替好兄弟报仇，Mark孤身赴台，结果被人打成瘸子...',
              language: '粤语,汉语普通话,英语',
              country: '中国香港',
              lang: 'Cn',
              movie: '5fa9d9d77c34497277511f56',
            },
          ],
          createdAt: 1604966873981,
          updatedAt: 1604966873981,
          id: '5fa9d9d77c34497277511f56',
          originalName: '英雄本色',
          imdbVotes: 20335,
          imdbRating: '7.5',
          rottenRating: '93',
          rottenVotes: 14,
          year: '1986',
          imdbId: 'tt0092263',
          alias: 'A Better Tomorrow / Gangland Boss',
          doubanId: '1297574',
          type: 'Movie',
          doubanRating: '8.7',
          doubanVotes: 386762,
          duration: 5700,
          dateReleased: '1986-08-02',
        },
      ],
    }
  },
  methods: {},
  mounted() {},
  components: {
    HomeTitle,
  },
}
</script>

<style scoped>
.home {
  margin-top: 50px;
}
</style>
