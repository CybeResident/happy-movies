<template>
  <div class="local-search">
    <el-form @submit.native.prevent>
      <el-form-item>
        <el-input
          placeholder="结果中搜索"
          v-model="localSearchVal"
          clearable
          size="small"
          maxlength="50"
          @keyup.enter.native="submit"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            title="点击搜索"
            @click="submit"
          ></el-button>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'LocalSearch',
  data() {
    return {
      localSearchVal: '',
    }
  },
  methods: {
    submit() {},
  },
  components: {},
}
</script>

<style scoped>
</style>
