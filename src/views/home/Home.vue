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
    return {}
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
