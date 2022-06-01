# douban-movie-search
基于 Vue2.x+axios+ElementUI 的电影搜索工具。
现阶段主要功能为：每日推荐、电影搜索、电影Top250

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


# 电影搜索
1. 输入豆瓣电影中的电影ID进行搜索
2. 输入电影名称进行搜索


# 更新日志

## v1.1.1(2022.6.1)

#### :recycle: 重构

- 用 Element UI 中的加载效果替代骨架屏效果
- 在 `public` 中新增 `server.js` 作为本地服务器



## v1.1.0(2022.5.31)

#### :sparkles: 新功能

- 初步搜索功能：请求本地静态资源
- 分页展示搜索结果
- “回到顶部”按钮



## v1.0.0 (2022.5.25)

#### :sparkles: 新功能

- 完成主要组件的显示与路由

- 切换菜单项后仍然保持原来子标签选中的效果

- 支持通过浏览器地址栏对菜单项和子标签进行选择

  比如：在地址栏输入 `localhost:8080/top250/imdb` 能定位到菜单项“TOP250”下的子标签“IMDb”