<template>
  <div class="home-title">
    <!-- <el-row type="flex" justify="center" align="middle">
      <el-col :span="6">
        <img class="icon" src="~assets/img/homeIcon/icon.svg" />
      </el-col>
      <el-col :span="10">
        <div class="title">
          <h1 class="mainTitle">Happy Movies</h1>
          <p class="subtitle">
            基于 Vue2 + Axios + Element UI 的影视作品搜索工具
          </p>
        </div>
      </el-col>
    </el-row> -->
    <img class="icon" src="~assets/img/homeIcon/icon.svg" />
    <div class="title">
      <h1 class="mainTitle">Happy Movies</h1>
      <p class="subtitle">基于 Vue2 + Axios + Element UI 的影视作品搜索工具</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeTitle',
  data() {
    return {}
  },
  components: {},
}
</script>

<style scoped lang="scss">
@font-face {
  font-family: 'Ubuntu';
  src: url('assets/fonts/Ubuntu-Regular.ttf');
}

.home-title {
  margin: 100px 0 270px;
  width: 100%;
  user-select: none;
  font-family: 'Ubuntu', sans-serif;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .icon {
    flex: none;
    width: 310px;
    height: 310px;
    margin-right: 50px;
    object-fit: contain;
    object-position: center;
  }

  .title {
    flex: none;

    .mainTitle {
      font-size: 100px;
      margin: 0 0 50px;
      width: 564px;
    }

    .subtitle {
      color: #999;
      font-size: 24px;
      text-align: start;
    }
  }
}
</style>
