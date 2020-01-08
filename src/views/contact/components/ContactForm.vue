<template>
  <el-form
    :model="ruleForm"
    status-icon
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="姓名" prop="username">
      <el-input type="text" v-model="ruleForm.username" placeholder="请输入姓名" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="电话" prop="phone">
      <el-input
        type="text"
        v-model="ruleForm.phone"
        placeholder="请输入电话号码"
        maxlength="11"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input type="email" v-model="ruleForm.email" placeholder="请输入邮箱" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="QQ" prop="QQ">
      <el-input
        type="text"
        v-model="ruleForm.QQ"
        maxlength="12"
        placeholder="请输入QQ号码（选填）"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item label="微信" prop="wechat">
      <el-input type="text" v-model="ruleForm.wechat" placeholder="请输入微信号码（选填）" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="留言" prop="message">
      <el-input
        type="textarea"
        placeholder="请输入留言内容"
        v-model="ruleForm.message"
        maxlength="100"
        show-word-limit
      ></el-input>
    </el-form-item>
    <el-form-item style="text-align:right;">
      <el-button type="primary" @click="commit('ruleForm')">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import commitMessage from '../../../request/api/contact'
import messageFn from '../../../utils/message'
export default {
  data() {
    const checkUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入姓名'))
      }
      callback()
    }
    const checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入手机号码'))
      } else if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(value)) {
        callback(new Error('手机号码输入有误'))
      } else {
        callback()
      }
    }
    const validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else if (
        !/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g.test(
          value
        )
      ) {
        callback(new Error('邮箱输入有误'))
      } else {
        callback()
      }
    }
    const validateMessage = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('反馈信息必须填写'))
      }
      callback()
    }
    return {
      ruleForm: {
        username: '',
        email: '',
        phone: '',
        QQ: '',
        wechat: '',
        message: ''
      },
      rules: {
        username: [{ validator: checkUsername, trigger: 'blur' }],
        phone: [{ validator: checkPhone, trigger: 'blur' }],
        email: [{ validator: validateEmail, trigger: 'blur' }],
        message: [{ validator: validateMessage, trigger: 'blur' }]
      }
    }
  },
  computed: {
    userInfo() {
      if (this.$store.getters.getUserInfo) {
        return this.$store.getters.getUserInfo
      }
      return null
    }
  },
  methods: {
    commit(formName) {
      const userId = this.userInfo.id
      const username = this.ruleForm.username
      const email = this.ruleForm.email
      const phone = this.ruleForm.phone
      const QQ = this.ruleForm.QQ
      const wechat = this.ruleForm.wechat
      const message = this.ruleForm.message
      this.$refs[formName].validate(async valid => {
        if (!valid) {
          return
        }
        const result = await commitMessage('/api/contact/commitMessage', {
          userId,
          username,
          email,
          phone,
          QQ,
          wechat,
          message
        })
        if(result.errno === 0) {
          messageFn(true, '万分感谢您的反馈，我会尽快回复！', 'success')
          await this.resetForm(formName)
          return
        }
        messageFn(true, result.message, 'error')
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>