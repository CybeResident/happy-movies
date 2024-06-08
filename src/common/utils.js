// 封装防抖功能
export function debounce(func, delay = 200) {
  let timer = null
  return function (...args) {
    timer ? clearTimeout(timer) : void 0

    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

// TODO: 导出类 MovieInfo，用于从响应数据中获取电影信息
export class MovieInfo {
  constructor(info) {

    this.dataCn = this.#getDataCn(info.data)

    const infoItemList =
    {
      mainItemList: ['name', 'poster', 'genre', 'country', 'language', 'description',],
      subItemList: ['originalName', 'alias', 'dateReleased', 'doubanRating', 'doubanVotes',
        'doubanId', 'imdbRating', 'imdbVotes', 'imdbId', 'rottenRating', 'rottenVotes',
        'duration', 'year'],
      arrItemList: ['writer', 'director', 'actor'],
    }

    const defaultVal = '暂无'

    // TODO：用数组分类存放对象属性名，根据不同类别的属性名进行不同的取值操作
    infoItemList.mainItemList.forEach((element, index, arr) => {
      this[element] = this.dataCn[0][element] || defaultVal
    })
    infoItemList.subItemList.forEach((element, index, arr) => {
      this[element] = info[element] || defaultVal
    })
    infoItemList.arrItemList.forEach((element, index, arr) => {
      this[element] = this.#getMember(info[element])
    })

    // this.name = this.dataCn[0].name || '暂无'
    // this.poster = this.dataCn[0].poster || '暂无'
    // this.genre = this.dataCn[0].genre || '暂无'
    // this.country = this.dataCn[0].country || '暂无'
    // this.language = this.dataCn[0].language || '暂无'
    // this.description = this.dataCn[0].description || '暂无'

    // this.writer = this.#getMember(info.writer)
    // this.director = this.#getMember(info.director)
    // this.actor = this.#getMember(info.actor)

    // this.originalName = info.originalName || '暂无'
    // this.alias = info.alias || '暂无'
    // this.dateReleased = info.dateReleased || '暂无'
    // this.doubanRating = info.doubanRating || '暂无'
    // this.doubanVotes = info.doubanVotes || '暂无'
    // this.doubanId = info.doubanId || '暂无'
    // this.imdbRating = info.imdbRating || '暂无'
    // this.imdbVotes = info.imdbVotes || '暂无'
    // this.imdbId = info.imdbId || '暂无'
    // this.rottenRating = info.rottenRating || '暂无'
    // this.rottenVotes = info.rottenVotes || '暂无'
    // this.duration = info.duration || '暂无'
    // this.year = info.year || '暂无'

    console.log('THIS: \n', this);
  }
  // 获取成员名单
  #getMember(memberList) {
    return (memberList && this.#getMemberStr(memberList)) || '暂无'
  }
  // 将成员从数组转换成字符串，用特定间隔符隔开
  #getMemberStr(memberList) {
    return memberList
      .map((element) => {
        return element.data[0].name
      })
      .join(' / ')
  }
  // 获取中文数据
  #getDataCn(data) {
    return data.filter((element) => element.lang.toLowerCase() === 'cn')
  }
}