<template>
  <div class="not-wrapper">
    <div class="title">
      您访问的页面不存在，请点击按钮进行返回。
    </div>
    <div class="btns">
      <el-button type="primary" plain @click="back">返回</el-button>
      <el-button type="primary" plain @click="goIndex">首页</el-button>
    </div>
    <img :src="require('../../../public/images/404.jpg')" alt="">
  </div>
</template>
<script>
export default {
  methods: {
    goIndex() {
      this.$router.push('/')
    },
    back() {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>
.not-wrapper {
  width: 100%;
  text-align: center;
  position: relative;
}
.not-wrapper img {
  width: 100%;
}
.title {
  position: absolute;
  top: 20px;
  text-align: center;
  width: 100%;
  color: #7dcbcd;
  font-size: 30px;
  font-weight: 900;
}
.btns {
  position: absolute;
  left: 50%;
  margin-left: -61px;
  top: 100px;
}
</style>