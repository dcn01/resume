<template>
  <el-row class="row-wrapper">
    <el-col :span="22">
      <h1 class="title">{{title}}</h1>
    </el-col>
    <el-col :span="2" style="float:right;">
      <avatar v-if="avatarShow" :avatarSrc="getUserInfoAvatar"/>
    </el-col>
  </el-row>
</template>
<script>
import Avatar from './Avatar'
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    avatarShow: {
      type: Boolean,
      default: true
    }
  },
  components: {
    Avatar
  },
  computed: {
    getUserInfoAvatar() {
      if(this.$store.getters.getUserInfo) {
        return this.$store.getters.getUserInfo.avatar
      }
    }
  },
}
</script>
<style scoped>
.row-wrapper {
  padding: 20px 40px;
  background: #c0e3e7;
  background: url('../assets/images/tt.gif');
  background-position-y: 200px;
}
.title {
  font-size: 24px;
}
</style>