<template>
  <div class="home-search-box">
    <el-form size="large" @submit.native.prevent>
      <el-form-item class="input">
        <el-input
          type="text"
          v-model.trim="searchVal"
          placeholder="请输入电影名"
          clearable
          maxlength="50"
          @keyup.enter.native="submit"
        ></el-input>
      </el-form-item>
      <el-form-item class="submit-btn">
        <el-button
          type="primary"
          :autofocus="true"
          icon="el-icon-search"
          @click="submit"
        ></el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'HomeSearchBox',
  data() {
    return {
      searchVal: '',
    }
  },
  methods: {
    submit() {
      void 0
    },
  },
  mounted() {},
  components: {},
}
</script>

<style scoped>
.home-search-box {
  width: 100%;
  margin-bottom: 40px;
}

.el-form {
  width: 100%;

  display: flex;
}

.el-form-item {
  margin: 0;
}

.el-form-item.input {
  margin-right: 10px;
  flex: 1;
}

.el-form-item.input .el-form-item__content {
  width: 100%;
}

.el-form-item.submit-btn {
  flex: none;
}
</style>
