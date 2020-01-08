<template>
  <div>
    <el-image
      class="logo-image"
      :src="require('../assets/images/kodinger.jpg')"
      fit="scale-down"
    ></el-image>
  </div>
</template>
<style scoped>
  .logo-image {
    position: absolute;
    top: -50px;
    left: 50%;
    margin-left: -50px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    box-shadow: 0 4px 40px rgba(0, 0, 0, .07);
  }
</style>