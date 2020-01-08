<template>
  <div class="register-form-wrapper">
    <register-image />
    <p class="title">Let's create your account</p>
    <el-form
      :model="ruleForm"
      status-icon
      label-position="top"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="头像" class="avatar">
       <upload-img 
       ref="upload" 
       @handleGetFilename="handleGetFilename"
       @onChange="onChange"
       />
      </el-form-item>
      <el-form-item label="账户名称" prop="username">
        <el-input type="text" placeholder="账户名称" v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input type="text" 
        v-model="ruleForm.phone" 
        placeholder="手机号码"
        maxlength="11" 
        @change="isExist"
        autocomplete="off"></el-input>
      </el-form-item>
      <!-- <el-form-item label="邮箱" prop="email">
        <el-input type="email" v-model="ruleForm.email" autocomplete="off"></el-input>
      </el-form-item> -->
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          placeholder="密码"
          v-model="ruleForm.password"
          minlength="3"
          maxlength="11"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPassword">
        <el-input
          type="password"
          placeholder="确认密码"
          v-model="ruleForm.checkPassword"
          minlength="3"
          maxlength="11"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <div style="clear:both;"></div>
      <el-form-item class="register-btn">
        <el-button type="primary" @click="register('ruleForm')">注册</el-button>
      </el-form-item>
    </el-form>
    <div class="footer">
      <span>已有帐号？</span>
      <router-link class="login" to="/login">登录</router-link>
    </div>
  </div>
</template>
<script>
import RegisterImage from '../../../components/Logo'
import UploadImg from '../../../components/UploadImg'
import { register, isExist } from '../../../request/api/register'
import message from '../../../utils/message'
export default {
  components: {
    RegisterImage,
    UploadImg
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账户名称'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 3) {
        callback(new Error('密码不能少于3位'))
      } else {
        if (this.ruleForm.checkPassword !== '') {
          this.$refs.ruleForm.validateField('checkPassword')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value.length < 3) {
        callback(new Error('密码不能少于3位'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    const validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(value)) {
        callback(new Error('手机号码输入有误'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        username: '',
        password: '',
        checkPassword: '',
        phone: ''
      },
      filename: '',
      rules: {
        username: [{ validator: validateUsername, trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }],
        checkPassword: [{ validator: validatePass2, trigger: 'blur' }],
        phone: [{ validator: validatePhone, trigger: 'change' }]
      },
      file: null
    }
  },
  methods: {
    async register(formName) {
      const username = this.ruleForm.username
      const password = this.ruleForm.password
      const phone = this.ruleForm.phone
      const filename = this.filename
      const isExist = await this.isExist()
      if(!this.file) {
        message(true, '请上传头像', 'error')
        return
      }
      if(!isExist) {
        return
      }
      this.$refs[formName].validate(async valid => {
        if(!valid) {
          return
        } 
        await this.$refs.upload.upload()
        const result = await register(
          '/api/user/register',
          {username, password, phone, filename}
        )
        if(result.errno === 0) {
          message(true, '恭喜您已成功注册账号', 'success')
          this.$router.push('/login')
          return
        }else {
          message(true, result.message, 'error')
        }
      })
    },
    handleGetFilename(filename) {
      this.filename = filename
    },
    async isExist() {
      const phone = this.ruleForm.phone
      const result = await isExist(
        '/api/user/isExist',
        { phone }
      )
      if(result.errno === 10002) {
        message(true, result.message, 'error')
        return false
      }
      return true
    },
    onChange(file) {
     this.file = file
    }
  }
}
</script>
<style scoped>
.register-form-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -250px;
  margin-left: -250px;
  padding: 0 20px;
  width: 500px;
  box-sizing: border-box;
  background-color: #fff;
  -webkit-box-shadow: 0 7px 25px rgba(0, 0, 0, 0.08);
  box-shadow: 0 7px 25px rgba(0, 0, 0, 0.08);
  text-align: left;
  border-radius: 3px;
}
.register-form-wrapper .title,
.footer,
.login {
  margin-top: 60px;
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
  height: 38px;
  line-height: 38px;
  background: rgba(68, 160, 179, 0.1);
  color: #44a0b3;
}
>>> .el-form-item--small.el-form-item {
  margin: 10px 10px 15px;
  float: left;
}
>>> .register-btn {
  text-align: center;
  width: 100%;
}
>>> .avatar {
  width: 100%;
  text-align: center;
  margin: 0 !important;
}
>>> .el-button {
  width: 94%;
  height: 40px;
  background: rgb(68, 160, 179);
}
.footer,
.login {
  margin: 0;
}
.footer {
  margin-bottom: 20px;
}
</style>