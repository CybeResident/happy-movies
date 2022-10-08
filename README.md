# douban-movie-search
基于 Vue2.x+axios+ElementUI 的电影搜索工具。
主要功能：电影搜索、电影Top250



## 相关API
> https://github.com/iiiiiii1/douban-imdb-api



# 安装
```
npm install
```



## 编译与开发时热加载
```
npm run serve
```



## 生成dist文件夹
```
npm run build
```



# 项目文件夹结构
```
├─node_modules
├─public                     // 存放静态资源   
│  └─api                     // 存放与 电影搜索API 相关的响应数据
│      ├─search        
│      └─top250        
└─src        
    ├─assets        
    │  ├─css        
    │  └─img        
    │      ├─common          // 存放公共图片
    │      └─detail          // 存放 Detail.vue 专用的图片
    ├─common                 // 存放公共 JS 文件，如公共方法、常量、混入等
    ├─components        
    │  ├─common              // 存放其他项目也可使用的通用组件
    │  │  └─navBar        
    │  └─content             // 存放仅限当前项目使用的通用组件
    │      ├─movieCard
    │      └─topRank
    │          └─childComps
    ├─network                // 存放与网络请求相关的 JS 文件
    ├─router                 // 存放与 Vue Router 相关的 JS 文件
    ├─store                  // 存放与 Vuex 相关的 JS 文件
    └─views                  // 存放除 App.vue 之外的主要视图组件
        ├─detail
        ├─home
        │  └─childComps
        ├─search
        │  └─childComps
        │      └─searchResult
        │          └─childComps
        └─top250
            └─childComps
```



# 使用

输入电影名称进行搜索，还可以配合年份进行更精确的搜索。

**格式**：电影名（必选） + 空格 + 年份（可选）



## 演示





# 更新日志

## v1.4.2

#### :recycle: 重构

- 优化部分代码
- 将 CSS 语法更换为 SCSS 语法



## v1.4.1 (2022.06.16)

#### :sparkles: 新功能

- 点击搜索结果的某张卡片或 Top250 中的一项，可跳转至详情页
  - 等待跳转和跳转失败时，有相应提示

#### :recycle: 重构

- 将处理电影信息的代码提取为一个类，并存放到 `common/utils.js` 
- 组件 `MovieRank` 和 `MovieCard` 的公共代码提取为 `mixins `，并存放到 `common/mixin.js`

#### :memo: 文档
- `README.md`
  - 修改章节“更新日志”内容
  - 增加章节“项目文件夹结构”



## v1.4.0 (2022.06.15)

#### :sparkles: 新功能

- 新板块：详情页



## v1.3.1 (2022.06.15)

#### :sparkles: 新功能

- Top250：可按照“评分人数”排序



## v1.3.0 (2022.06.14)

#### :sparkles: 新功能

- 新板块：IMDb Top250
- Top250：可实现带防抖效果的结果排序，包括默认排序



## v1.2.1 (2022.06.13)

#### :sparkles: 新功能

- Top250：带有防抖效果的条件筛选



## v1.2.0 (2022.06.11)

#### :sparkles: 新功能

- 新板块：豆瓣Top250



## v1.1.3 (2022.06.08)

#### :sparkles: 新功能

- 可按照“评分”或“上映时间”给搜索结果排序
- 在搜索结果中进一步搜索

#### :recycle: 重构

- 优化组件 `SearchResult` 中有关分页功能的代码



## v1.1.2 (2022.06.06)

#### :sparkles: 新功能

- 当搜索失败或搜索频繁时，出现提示

#### :bug: 修复

- 修复：提示搜索失败或搜索频繁后，无法再次搜索同一个关键词



## v1.1.1 (2022.06.01)

#### :recycle: 重构

- 用 Element UI 中的加载效果替代骨架屏效果
- 在 `public` 中新增 `server.js` 作为本地服务器



## v1.1.0 (2022.05.31)

#### :sparkles: 新功能

- 初步搜索功能：请求本地静态资源
- 分页展示搜索结果
- “回到顶部”按钮



## v1.0.0 (2022.05.25)

#### :sparkles: 新功能

- 完成主要组件的显示与路由

- 切换菜单项后仍然保持原来子标签选中的效果

- 支持通过浏览器地址栏对菜单项和子标签进行选择

  比如：在地址栏输入 `localhost:8080/top250/imdb` 能定位到菜单项“TOP250”下的子标签“IMDb”