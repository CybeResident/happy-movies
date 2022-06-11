import axios from 'axios'

// let count = 0

export function request(config) {
  // count++
  const instance = axios.create({
    baseURL: 'https://api.wmdb.tv/api/v1/movie/search',
    // baseURL: 'http://localhost:8000/server',
    timeout: 3000,
    // validateStatus(status) {
    //   console.log(status);
    //   return status >= 200 && status < 300 || status === 429;
    // },
    withCredentials: false
  })

  instance.interceptors.request.use(config => {
    // if (count % 5 !== 0) {
    // console.log(config);
    // setTimeout(() => {
    //   return config
    // }, 3500);
    return config
    // }
  }, error => {
    console.log('发送请求失败');
    return Promise.reject(error)
  })

  instance.interceptors.response.use(response => {
    // console.dir(response)
    // setTimeout(() => {
    //   return response.data
    // }, 3500);
    // return Promise.reject(error)
    // if (response.status >= 200 && response.status < 300) 
    return response.data

  }, error => {
    console.log('接收响应失败');
    return Promise.reject(error)
  })

  return instance(config)
}