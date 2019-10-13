<template>
<div class="login">
    <!-- 导航栏 -->
    <van-nav-bar
    title="标题"
    />
    <!-- 登录表单 -->
    <ValidationObserver ref="loginForm">
          <van-cell-group>
            <ValidationProvider name='手机号' rules='required|phone' v-slot='{errors}'>
                <van-field
                  required
                  v-model="user.mobile"
                  clearable
                  label="手机号"
                  placeholder="请输入手机号"
                  :error-message='errors[0]'
                />
            </ValidationProvider>

            <ValidationProvider name='验证码' rules='required|max:6' v-slot='{errors}'>
              <van-field
              v-model="user.code"
                label="验证码"
                placeholder="请输入验证码"
                required
                :error-message='errors[0]'
              />
            </ValidationProvider>

          </van-cell-group>
    </ValidationObserver>
    <!-- 登录按钮 -->
    <div class="btn-wrap">
      <van-button type="info" class="btn" @click="onLogin">登录</van-button>
    </div>
</div>
</template>

<script>
import { login } from '@/api/user.js'
import { setItem } from '@/utils/storage.js'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    async onLogin () {
      // 表单验证
      const isValid = await this.$refs.loginForm.validate()
      if (!isValid) {
        return
      }
      const toast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '登录中'
      })
      try {
        // 请求提交表单数据
        // const { data } = await request({
        //   method: 'POST',
        //   url: '/app/v1_0/authorizations',
        //   data: this.user
        // })

        const { data } = await login(this.user)
        this.$store.commit('setUser', data.data)
        // 为了防止页面刷新数据丢失，将数据存储到本地存储
        setItem('user', data.data)
        toast.clear()
        this.$toast.success('登录成功')
      } catch (err) {
        if (err.response && err.response.status === 400) {
          toast.clear()
          this.$toast.fail('登录失败，手机号或验证码错误')
        }
      }
    }
  }
}
</script>

<style lang='less' scoped>
  .login {
    .btn-wrap {
      padding: 20px;
      .btn {
        width: 100%;
        background-color: #6db4fb;
        color: #fff;
      }
  }
  }
</style>
