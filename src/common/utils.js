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
    this.dataCn = this.getDataCn(info.data)
    this.name = this.dataCn[0].name || '暂无'
    this.poster = this.dataCn[0].poster || '暂无'
    this.genre = this.dataCn[0].genre || '暂无'
    this.country = this.dataCn[0].country || '暂无'
    this.language = this.dataCn[0].language || '暂无'
    this.description = this.dataCn[0].description || '暂无'
    this.writer = (info.writer && this.getWriter(info.writer)) || '暂无'
    this.director =
      (info.director && this.getDirector(info.director)) || '暂无'
    this.actor = (info.actor && this.getActor(info.actor)) || '暂无'
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
  getWriter(writerList) {
    return writerList
      .map((element) => {
        return element.data[0].name
      })
      .join(' / ')
  }
  getDirector(directorList) {
    return directorList
      .map((element) => {
        return element.data[0].name
      })
      .join(' / ')
  }
  getActor(actorList) {
    return actorList
      .map((element) => {
        return element.data[0].name
      })
      .join(' / ')
  }
  getDataCn(data) {
    return data.filter((element) => element.lang.toLowerCase() === 'cn')
  }
}