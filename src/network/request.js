import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    timeout: 2000
  })

  instance.interceptors.request.use(config => {
    return config
  }, err => {
    throw new Error(err)
    // console.log(err);
  })

  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    throw new Error(err)
    // console.log(err);
  })

  return instance(config)
}