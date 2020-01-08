<template>
  <div class="pdf">
    <div class="pdf-header">
      <h1>
        Web前端工程师-陈佳兵
        <el-button type="info" @click="back">返回至首页</el-button>
      </h1>
    </div>
    <p class="arrow">
      <el-button type="primary" @click="changePdfPage(0)">上一页</el-button>
      {{currentPage}} / {{pageCount}}
      <el-button type="primary" @click="changePdfPage(1)">下一页</el-button>
    </p>
    <pdf
      class="pdf-wrapper"
      :src="pdfSrc"
      :page="currentPage"
      @num-pages="pageCount=$event"
      @page-loaded="currentPage=$event"
      @loaded="loadPdfHandler"
    ></pdf>
  </div>
</template>

<script>
import pdf from 'vue-pdf'

export default {
  components: {
    pdf
  },
  created() {
    this.pdfSrc = pdf.createLoadingTask(this.pdfSrc)
  },
  data() {
    return {
      pdfSrc: require('../../../public/resume/resume.pdf'),
      currentPage: 0, // pdf文件页码
      pageCount: 0, // pdf文件总页数
      fileType: 'pdf' // 文件类型
    }
  },
  methods: {
    // 改变PDF页码,val传过来区分上一页下一页的值,0上一页,1下一页
    changePdfPage(val) {
      // console.log(val)
      if (val === 0 && this.currentPage > 1) {
        this.currentPage--
        // console.log(this.currentPage)
      }
      if (val === 1 && this.currentPage < this.pageCount) {
        this.currentPage++
        // console.log(this.currentPage)
      }
    },
    // pdf加载时
    loadPdfHandler(e) {
      this.currentPage = 1 // 加载的时候先加载第一页
    },
    back() {
      this.$router.push('/')
    }
  }
}
</script>
<style scoped>
  .pdf {
    width: 100%;
    height: 100%;
    overflow: auto;
    background: url('../../../public/images/bg.png');
  }
  .pdf-header {
    text-align: center;
    font-size: 50px;
  }
  .arrow {
    text-align: center;
  }
  .pdf-wrapper {
    padding: 20px 0;
    box-sizing: border-box;
    width: 800px;
    left: 50%;
    margin-left: -400px;
  }
</style>