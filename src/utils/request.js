import axios from 'axios'
import store from '../store'
import router from '../router'
import { ElMessage } from 'element-plus'

// 创建axios实例对象
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // TODO 将token 通过请求头发送给后台
    const token = store.getters.token
    if (token) config.headers.Authorization = 'Bearer ' + token

    // if (token) {
    //   if (isCheckTimeout()) {
    //     store.dispatch('user/logout')
    //     router.push('/login')
    //   }
    // }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { code, data, msg } = response.data

    // TODO 全局响应处理
    if (code) {
      return data
    } else {
      _showError(msg)
      return Promise.reject(new Error(msg))
    }
  },
  (error) => {
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      store.dispatch('user/lgout')
      router.push('/login')
    }

    // 响应失败进行信息提示
    _showError(error.message)
    return Promise.reject(error)
  }
)

// 响应提示信息
const _showError = (message) => {
  const info = message || '发生未知错误'
  ElMessage.error(info)
}

// 统一了传参处理
const request = (options) => {
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data || {}
  }
  return service(options)
}

export default request
