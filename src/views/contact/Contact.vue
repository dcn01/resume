<template>
  <div class="contact-wrapper">
    <header-title></header-title>
    <div class="contact-wrapper-content">
      <contact-title />
    </div>
    <el-row class="contact-wrapper-content">
      <el-col :span="10" class="item">
        <div class="item-info">
          请给我发送一些问题或意见，谢谢！
        </div>
        <div class="item-info">
          <i class="el-icon-user-solid icon0"></i>
          陈佳兵
        </div>
        <div class="item-info">
          <i class="iconfont icon-huabanfuben icon1"></i>
          13933762163
        </div>
        <div class="item-info">
          <i class="iconfont icon-youjian icon2"></i>
          1014984541@qq.com
        </div>
        <div class="item-info">
          <i class="iconfont icon-qq icon3"></i>
          1014984541
        </div>
        <div class="item-info">
          <i class="iconfont icon-weixin icon4"></i>
          13933762163
        </div>
      </el-col>
      <el-col :span="14" class="item">
        <contact-form />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import HeaderTitle from '../../../src/components/HeaderTitle'
import ContactTitle from './components/Title'
import ContactForm from './components/ContactForm'
export default {
  components: {
    HeaderTitle,
    ContactTitle,
    ContactForm
  }
}
</script>
<style scoped>
.contact-wrapper {
  margin: 0 24px 24px 24px;
  background: #fff;
  box-shadow: 0  5px 20px #666;
}
.contact-wrapper-content {
  padding: 20px 40px;
  font-weight: 700;
  background: url('../../assets/images/palm-leaf.png');
}
.item {
  background: #fff;
  padding: 10px;
  box-sizing: border-box;
  height: 400px;
  box-shadow: 0  5px 20px #666;
}
.item .item-info {
  margin: 10px 0;
}
.icon0 {
  color: #13227a;
}
.icon1 {
  color: #d4237a;
}
.icon2 {
  color: rgb(47, 119, 241);
}
.icon3 {
  color: #1296db;
}
.icon4 {
  color: #1afa29;
}
</style>