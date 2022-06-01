import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    // baseURL: 'https://api.wmdb.tv/api/v1/movie/search'
    baseURL: 'http://localhost:8000',
    timeout: 5000,
  })

  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err);
    return Promise.reject(err)
  })

  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
    return Promise.reject(err)
  })

  return instance(config)
}