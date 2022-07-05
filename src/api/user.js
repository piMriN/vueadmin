import request from '@/utils/request'

const login = (data) => {
  return request({
    url: '/login',
    method: 'POST',
    data
  })
}

const imgcode = () => {
  return request({
    url: '/captcha',
    method: 'GET'
  })
}

export default {
  login,
  imgcode
}
