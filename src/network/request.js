import axios from 'axios'

// let count = 0

export function request(config) {
  // count++
  const instance = axios.create({
    // baseURL: 'https://api.wmdb.tv/api/v1/movie/search'
    baseURL: 'http://localhost:8000',
    timeout: 3000,
  })

  instance.interceptors.request.use(config => {
    // if (count % 5 !== 0) {
    return config
    // }
  }, err => {
    // console.log(err);
    return Promise.reject(err)
  })

  instance.interceptors.response.use(res => {
    // if (count % 2 === 0) {
    return res.data
    // } else {
    //   return 'Too many requests'
    // }
  }, err => {
    // console.log(err);
    return Promise.reject(err)
  })

  return instance(config)
}