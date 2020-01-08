<template>
  <div class="tiplist">
    <el-tooltip
      v-for="(item, index) in tooltips" 
      :key="index"
      effect="dark" 
      :content="item.content" 
      class="item"
      placement="bottom-start">
      <div v-if="item.class==='iconfont icon-qq'" slot="content">
        <img :src="qrcode_qq" alt="qrcode_qq" class="qrcode_qq">
      </div>
      <div v-if="item.class==='iconfont icon-weixin'" slot="content">
        <img :src="qrcode_wechat" alt="qrcode_wechat" class="qrcode_wechat">
      </div>
      <div v-if="item.class==='iconfont icon-github'" slot="content">
        <a href='https://github.com/chenfalse/resume' target="_blank" class="project_name">项目地址（点击跳转）</a>
      </div>
      <i :class="item.class"></i>
    </el-tooltip>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tooltips: [
        {class: 'iconfont icon-huabanfuben',content: '13933762163'},
        {class: 'iconfont icon-qq'},
        {class: 'iconfont icon-weixin'},
        {class: 'iconfont icon-youjian',content: '1014984541@qq.com'},
        {class: 'iconfont icon-github'}
      ],
      qrcode_qq: require('../../../../public/images/QRcode/qrcode_qq.jpg'),
      qrcode_wechat: require('../../../../public/images/QRcode/qrcode_wechat.png')
    }
  }
}
</script>
<style scoped>
  .tiplist {
    display: flex;
    margin: 30px 0 10px 0!important;
  }
  .tiplist .item {
    cursor: pointer;
    text-align: center;
    font-size: 24px;
    flex: 1;
  }
  .tiplist .item:first-child {
    color: #d4237a;
  }
  .tiplist .item:nth-child(2) {
    color: #1296db;
  }
  .tiplist .item:nth-child(3) {
    color: #1afa29;
  }
  .tiplist .item:nth-child(4) {
    color: rgb(47, 119, 241);
  }
  .tiplist .item:nth-child(5) {
    color: #13227a;
  }
  .tiplist .item:hover {
    opacity: .5;
  }
  .project_name {
    color: #fff;
  }
  .qrcode_qq {
    width: 150px;
    height: 200px;
  }
  .qrcode_wechat {
    width: 150px;
    height: 150px;
  }
</style>