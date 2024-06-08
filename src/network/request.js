import axios from 'axios'

export function request(config, type = 'fuzzy') {

  // baseURL: 'http://localhost:8000/server',

  let baseURL = ''
  if (type === 'fuzzy') {
    baseURL = 'https://api.wmdb.tv/api/v1/movie/search'
  } else if (type === 'id') {
    baseURL = 'https://api.wmdb.tv/movie/api'
    // baseURL = '/api/search'
  } else {
    throw new Error('request: wrong type')
  }

  const instance = axios.create({
    baseURL,
    timeout: 3000,
    withCredentials: false
  })

  instance.interceptors.request.use(config => {
    console.log('request config: ', config);
    return config
  }, error => {
    console.log('发送请求失败');
    return Promise.reject(error)
  })

  instance.interceptors.response.use(response => {
    return response.data
  }, error => {
    console.log('接收响应失败');
    return Promise.reject(error)
  })

  return instance(config)
}