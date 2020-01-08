<template>
  <div class="logo-wrapper">
    <img :src="require('../../../assets/images/logo.svg')" alt="">
    <div class="name">陈佳兵</div>
  </div>
</template>
<style scoped>
  .logo-wrapper {
    display: flex;
  }
  .logo-wrapper .name {
    font-size: 32px;    
    font-family: 'Pacifico', cursive;
    font-weight: 700;
    white-space: nowrap;
    margin-left: 10px;
  }
</style>