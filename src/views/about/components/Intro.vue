<template>
  <div class="intro-wrapper">
    <p class="sub-title">大家好，我叫陈佳兵！</p>
    <p>来自河北省张家口市怀来县，现居住于北京市海淀区。</p>
    <p>我是一名从事2年的web前端工程师。</p>
    <p>这个网站前端采用vue 3.0 + element-ui，后端采用nodejs + koa2，数据库采用mysql + orm框架（sequelize）完成开发。</p>
    <p>这也是我自己独立完成的网站，希望大家多多支持！</p>
    <p>GitHub地址：
      <a href="https://github.com/chenfalse/uploadImage" target="_blank">项目地址</a>
    </p>
    <p>喜欢的话记得帮忙点下star！！！</p>
    <div class="signature">
      <img :src="require('../../../assets/images/signature.png')" alt="">
    </div>
  </div>
</template>
<style scoped>
.intro-wrapper {
  padding: 20px 40px;
  font-weight: 700;
  background: url('../../../assets/images/palm-leaf.png');
}
.signature {
  text-align: right;
}
.sub-title {
  font-size: 20px;
  font-weight: 700;
}
</style>