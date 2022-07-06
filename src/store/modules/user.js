import { getItem, setItem } from '@/utils/storage'
import { getUserInfo } from '@/api/user'
import router from '@/router'
import { message } from 'ant-design-vue'
import { getNav } from '@/api/nav'

export default {
  namespaced: true,
  state: {
    token: getItem('token') || null,
    userInfo: {},
    menus: []
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      setItem('token', state.token)
    },
    setUserInfo (state, info) {
      state.userInfo = info
    },
    logout (state) {
      state.token = ''
      state.userInfo = {}
      setItem('token', '')
      router.push('/login')
      message.success('退出成功！')
    },
    setMenu (state, payload) {
      state.menus = payload
    }
  },
  actions: {
    async getUserInfo ({ commit }) {
      const res = await getUserInfo()
      const navs = await getNav()
      console.log(navs)
      commit('setUserInfo', res)
      commit('setMenu', navs)
      return navs
    }
  }
}
