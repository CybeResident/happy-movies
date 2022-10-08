<template>
  <div class="local-search">
    <el-form @submit.native.prevent>
      <el-form-item>
        <!-- @select="handleSelect" -->
        <el-autocomplete
          placeholder="结果中搜索"
          v-model="localSearchVal"
          clearable
          size="small"
          :maxlength="50"
          @keyup.enter.native="submit"
          :fetch-suggestions="preciseSearch"
          :trigger-on-focus="false"
        >
          <el-select v-model="searchScope" slot="prepend" placeholder="请选择">
            <el-option label="标题" value="titles"></el-option>
            <el-option label="国家/地区" value="places"></el-option>
            <el-option label="上映日期" value="dates"></el-option>
          </el-select>
          <el-button
            slot="append"
            icon="el-icon-search"
            title="点击搜索"
            @click="submit"
          ></el-button>
        </el-autocomplete>
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
      searchScope: 'titles',
      originalMsg: {
        titles: [],
        places: [],
        dates: [],
      },
      localSearchKey: {
        newKey: '',
        oldKey: '',
      },
    }
  },
  props: {
    localSearchMsg: {
      type: Object,
      default() {
        return {
          titles: [],
          places: [],
          dates: [],
        }
      },
    },
    isLocalPending: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    submit() {
      console.log('本地搜索')
      // 因为此处 el-button 是作为 el-autocomplete 的后缀插槽内容，在样式上与单独按钮不同，所以无需强制失去焦点操作

      if (!this.isLocalPending) {
        this.localSearchKey.oldKey = this.localSearchKey.newKey
        // 删除本地关键词的两端空白字符
        this.localSearchKey.newKey = this.localSearchVal.trim()

        // 如果 newKey 和 oldKey 相同，则不进行搜索（因为上一次的搜索结果和本次的相同）
        this.localSearchKey.oldKey !== this.localSearchKey.newKey
          ? this.$emit('local-search', this.localSearchVal, this.searchScope)
          : void 0
      }
    },
    preciseSearch(queryStr, returnFn) {
      let msgScoped = this.originalMsg[this.searchScope]
      console.log(this.originalMsg)
      // console.log('输入建议')

      // 数组去重
      let msgSimplified = msgScoped.filter(
        (element, index) => msgScoped.indexOf(element) === index
      )

      let sugList = queryStr
        ? msgSimplified.filter(this.createFilter(queryStr))
        : msgSimplified

      sugList = sugList.map((element) => {
        element = { value: element }
        return element
      })
      // console.log(sugList)
      returnFn(sugList)
    },
    createFilter(queryStr) {
      return (item) => {
        return item.toLowerCase().includes(queryStr.toLowerCase())
      }
    },
    handleSelect() {
      // console.log('el-autocomplete')
    },
  },
  watch: {
    // 监听传入的本地搜索词条的 titles，如果发生变化，就代表词条传入成功，然后执行深拷贝
    'localSearchMsg.titles'() {
      this.originalMsg = JSON.parse(JSON.stringify(this.localSearchMsg))
      // console.log(this.originalMsg)
    },
  },
  components: {},
}
</script>

<style scoped>
.el-select {
  width: 105px;
  /* background-color: #fff; */
}
</style>
