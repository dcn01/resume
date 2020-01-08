<template>
  <el-dropdown placement="bottom" @command="handleCommand">
    <el-avatar size="large" v-if="avatarSrc" :src="require(`../../public/images/uploadImages/${avatarSrc}`)">
    </el-avatar>
    <el-avatar size="large" v-else="avatarSrc" :src="require('../assets/images/photo.jpg')"></el-avatar>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="index">首页</el-dropdown-item>
      <el-dropdown-item command="logout">退出登录</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
import { logout } from '../request/api/login'
import message from '../utils/message'
export default {
  props: {
    avatarSrc: {
      type: String
    }
  },
  methods: {
    async handleCommand(command) {
      if (command === 'index') {
        await this.$router.push('/about')
        return
      }
      if(command === 'logout') {
        const result = await logout('/api/user/logout')
        if(result.errno === 0) {
          message(true, '退出成功', 'success')
          this.$store.commit('logout')
          this.$router.push('/login')
        }else {
          message(true, result.message, 'error')
        }
      }
    }
  }
}
</script>
<style scoped>
>>> .el-avatar > img {
  width: 100%;
  cursor: pointer;
}
.el-dropdown {
  float: right;
}
</style>