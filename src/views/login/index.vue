<template>
  <div class="container">
    <div class="center">
      <h3 class="title">欢迎来到VueAdmin管理系统</h3>

      <el-form ref="loginForms" :rules="loginRules" :model="loginForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="captcha">
          <el-input v-model="loginForm.captcha"></el-input>
          <img :src="imgcodes" @click="getcode" class="img" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleLoginSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import util from '../../utils/util'
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { setTimeStamp } from '../../utils/auth'
import UserApi from '../../api/user'

const imgcodes = ref('')
const store = useStore()
const router = useRouter()
const LoginForm = ref()

const loginForm = reactive({
  username: 'test',
  password: '',
  captcha: ''
})

const loginRules = reactive({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: '用户名为必填项'
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      message: '密码错误'
    }
  ]
})

const handleLoginSubmit = async () => {
  if (!LoginForm.value) return
  await LoginForm.value.validate(async (valid) => {
    if (valid) {
      const newLoginForm = util.deepCopy(loginForm)
      const response = await store.dispatch('user/login', newLoginForm)
      setTimeStamp()
      if (response.token) router.push('/')
    }
  })
}

const getCode = async () => {
  try {
    const res = await UserApi.imgcode()
    console.log(res)
    imgcodes.value = res.captchaImg
    loginForm.token = res.token
    console.log(loginForm.token)
    console.log(imgcodes)
  } catch (error) {}
}
getCode()
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  background: url('../../assets/稻草人.jpeg') no-repeat;
}
.center {
  height: max-content;
  position: absolute;
  left: 50%;
  top: 160px;
  margin-left: -175px;
  padding: 28px;
  color: white;
}
.title {
  font-size: 26px;
  font-weight: 700;
  text-align: center;
}
.el-form {
  margin-top: 40px;
}
.img {
  position: absolute;
  width: 100px;
  height: 50px;
  margin-left: 290px;
}
</style>
