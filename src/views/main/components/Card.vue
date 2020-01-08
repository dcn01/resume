<template>
  <el-card class="card-wrapper" shadow="hover" :body-style="{ padding: '0px' }">
    <div class="card-header">
      <img 
      :src="require('../../../assets/images/photo.jpg')" class="image">
      <div class="name">陈佳兵</div>
      <div>Web 前端工程师</div>
      <!-- <div>北京市海淀区六里屯山水小区</div>
      <div>河北科技学院（本科）</div> -->
      <card-tooltip />
    </div>
    <div class="card-footer">
      <el-button type="primary" round @click="pdfShow">简历预览</el-button>
      <br />
      <a 
        class="download-btn"
        @click="download($event)"
       >简历下载</a>
    </div>
  </el-card>
</template>
<script>
import CardTooltip from './Tooltip'
import messageBox from '../../../utils/messageBox'
export default {
  components: {
    CardTooltip
  },
  data() {
    return {
      href: require('../../../../public/resume/resume.pdf')
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
    pdfShow() {
      this.$router.push('/pdf')
    },
    async download(event) {
      if(!this.userInfo) {
        await messageBox('系统检测当前未登录，是否前往登录？', '当前未登录', {
          distinguishCancelAndClose: true,
          confirmButtonText: '登录',
          cancelButtonText: '取消'
        }).then(() => {
          this.$router.push('/login')
        }).catch(() => false)
        return
      }else {
        const downloadElem = event.target
        downloadElem.setAttribute('href', this.href)
        downloadElem.setAttribute('download', '陈佳兵-web前端工程师')
      }
    }
  }
}
</script>
<style scoped>
  .card-wrapper {
    border: none;
  }
  .card-wrapper:hover {
    box-shadow: 0  5px 20px #666;
  }
  .card-header {
    background: #c0e3e7;
    text-align: center;
    padding: 10px;
  }
  .card-header img {
    width: 190px;
    height: 190px;
    border-radius: 50%;
  }
  .card-header > div {
    margin-top: 10px;
    color: #000000;
    font-size: 16px;
    font-weight: 700; 
  }
  .card-header > div.name {
    font-size: 22px;   
    text-transform: uppercase;
    color: #000000;
  }
  .card-footer {
    padding: 20px 0;
    text-align: center;
  }
  .card-footer button {
    width: 80%;
    height: 40px;
  }
  .card-footer .download-btn {
    display: block;
    width: 80%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin: 10px auto;
    font-size: 14px;
    text-decoration: none;
    background: #000;
    color: #fff;
    border-radius: 20px;
  }
  .card-footer .download-btn:hover {
    opacity: .9;
  }
</style>