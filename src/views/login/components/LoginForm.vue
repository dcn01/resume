<template>
  <div class="login-form-wrapper">
    <login-image />
    <p class="title">Sign in to continue</p>
    <el-form
      :model="ruleForm"
      status-icon
      label-position="top"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="帐号" prop="phone">
        <el-input 
        type="text" 
        v-model="ruleForm.phone" 
        autocomplete="off"
        placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="password">
        <el-input 
        type="password" 
        v-model="ruleForm.password" 
        autocomplete="off"
        placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login('ruleForm')">登录</el-button>
      </el-form-item>
    </el-form>
    <div class="footer">
      <span>还没有帐号？</span>
      <router-link class="register" to="/register">注册</router-link>
    </div>
  </div>
</template>
<script>
import LoginImage from '../../../components/Logo'
import login from '../../../request/api/login'
import message from '../../../utils/message'
export default {
  components: {
    LoginImage
  },
  data() {
    const validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入您的注册手机号码'))
      } else if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(value)) {
        callback(new Error('手机号码输入有误'))
      } else {
        callback()
      }
    }
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        phone: '',
        password: ''
      },
      rules: {
        phone: [{ validator: validatePhone, trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }]
      }
    }
  },
  methods: {
    login(formName) {
      const phone = this.ruleForm.phone
      const password = this.ruleForm.password
      const pathname = this.$route.query.pathname
      const blogId = this.$route.query.blogId
      this.$refs[formName].validate(async valid => {
        if (!valid) {
          return
        } 
        const result = await login(
          '/api/user/login',
          { phone, password }
        )
        if(result.errno === 0) {
          message(true, '登陆成功', 'success')
          this.$store.commit('setUserInfo', result.data)
          if(pathname) {
            if(blogId) {
              this.$router.push({
                path: `/${pathname}`,
                query: {
                  blogId
                }
              })
            }else {
              this.$router.push(`/${pathname}`)
            }
          }else {
            this.$router.push('/')
          }
        }else {
          message(true, result.message, 'error')
        }
      })
    }
  }
}
</script>
<style scoped>
.login-form-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -220px;
  margin-left: -180px;
  padding: 0 20px;
  width: 360px;
  height: 440px;
  box-sizing: border-box;
  background-color: #fff;
  -webkit-box-shadow: 0 7px 25px rgba(0, 0, 0, 0.08);
  box-shadow: 0 7px 25px rgba(0, 0, 0, 0.08);
  text-align: left;
  border-radius: 3px;
}
.login-form-wrapper .title,
.footer,
.register {
  margin-top: 80px;
  margin-bottom: 20px;
  color: #44a0b3;
  font-weight: 700;
  text-align: center;
}
>>> .el-form-item__label {
  color: #44a0b3;
  font-weight: 700;
  opacity: 0.7;
  line-height: 20px;
}
>>> .el-input__inner {
  height: 48px;
  line-height: 48px;
  background: rgba(68, 160, 179, 0.1);
  color: #44a0b3;
}
>>> .el-form-item--small.el-form-item {
  margin-bottom: 25px;
}
>>> .el-form-item__content {
  text-align: center;
}
>>> .el-button {
  width: 94%;
  height: 40px;
  background: rgb(68, 160, 179);
}
.footer,
.register {
  margin: 0;
}
</style>