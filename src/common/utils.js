export function debounce(func, delay = 200) {
  let timer = null
  return function (...args) {
    timer ? clearTimeout(timer) : void 0

    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

export class MovieInfo {
  constructor(info) {
    this.dataCn = this.#getDataCn(info.data)
    this.name = this.dataCn[0].name || '暂无'
    this.poster = this.dataCn[0].poster || '暂无'
    this.genre = this.dataCn[0].genre || '暂无'
    this.country = this.dataCn[0].country || '暂无'
    this.language = this.dataCn[0].language || '暂无'
    this.description = this.dataCn[0].description || '暂无'

    this.writer = this.#getMember(info.writer)
    this.director = this.#getMember(info.director)
    this.actor = this.#getMember(info.actor)

    this.originalName = info.originalName || '暂无'
    this.alias = info.alias || '暂无'
    this.dateReleased = info.dateReleased || '暂无'
    this.doubanRating = info.doubanRating || '暂无'
    this.doubanVotes = info.doubanVotes || '暂无'
    this.doubanId = info.doubanId || '暂无'
    this.imdbRating = info.imdbRating || '暂无'
    this.imdbVotes = info.imdbVotes || '暂无'
    this.imdbId = info.imdbId || '暂无'
    this.rottenRating = info.rottenRating || '暂无'
    this.rottenVotes = info.rottenVotes || '暂无'
    this.duration = info.duration || '暂无'
    this.year = info.year || '暂无'
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