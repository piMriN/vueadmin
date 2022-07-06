import { createStore } from 'vuex'
import user from './modules/user'
import permission from '@/store/modules/permission'
import tags from '@/store/modules/tags'

export default createStore({
  getters: {
    token: state => state.user.token,
    hasuserInfo: state => {
      return JSON.stringify(state.user.userInfo) === '{}'
    },
    userInfo: state => state.user.userInfo,
    tags: state => state.tags.tagsArray

  },
  modules: {
    user,
    permission,
    tags
  }

})
