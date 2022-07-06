<template>
  <div class="navbox">
    <h1>VueAdmin后台管理系统</h1>
    <div class="right">
      <a-avatar :src="$store.getters.userInfo.avatar" />
      <span class="dropdown">
        <a-dropdown :trigger="['click']">
          <a class="ant-dropdown-link" @click.prevent>
            {{ $store.getters.userInfo.username }}
            <DownOutlined />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <a href="javascript:;" @click="$router.push('/')" class="tc"
                  >个人中心</a
                >
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;" @click="showConfirm" class="tc"
                  >退出登录</a
                >
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </span>
    </div>
  </div>
</template>

<script setup>
import { DownOutlined } from '@ant-design/icons-vue'
import { useStore } from 'vuex'

const store = useStore()
const showConfirm = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 500)
  }).then(() => {
    store.commit('user/logout')
  })
}
</script>
<style lang="scss" scoped>
.navbox {
  display: flex;
  padding: 0 40px;
  justify-content: space-between;
  align-items: center;
  h1 {
    padding-left: 400px;
  }
}

.dropdown {
  margin: 0 10px;
}
.tc {
  position: relative;
  padding-left: 1450px;
}
</style>
