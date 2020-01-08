<template>
  <div class="conent-wrapper">
    <header-title></header-title>
    <el-row class="row">
      <el-col :span="24" class="right">
       <blog-card-content 
       :blogInfo="blogInfo" 
       :userInfo="userInfo" 
       :appraises="appraises"
       @handleLoadBlog="getBlogContent"
       />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import HeaderTitle from '../../../src/components/HeaderTitle'
import BlogCardContent from './components/BlogCardContent'
import { getBlogContent, updateReadNum } from '../../request/api/blog'
export default {
  name: 'blogContent',
  components: {
    HeaderTitle,
    BlogCardContent
  },
  data() {
    return {
      blogInfo: {},
      userInfo: {},
      appraises: []
    }
  },
  async mounted() {
    await this.getBlogContent()
  },
  methods: {
    async getBlogContent() {
      const list = document.querySelectorAll('.menu-wrapper ul li a.item')
      list[2].setAttribute('class', 'item router-link-exact-active router-link-active')
      const blogId = this.$route.query.blogId
      const result = await getBlogContent(
        '/api/blog/getBlogContent',
        { blogId }
      )
      if(result.errno === 0) {
        this.blogInfo = result.data
        this.userInfo = result.data.user
        this.appraises = result.data.appraises
        this.readNum = result.data.readNum
        await this.updateReadNum(result.data.readNum)
      }
    },
    async updateReadNum(readNum) {
      const blogId = this.$route.query.blogId
      await updateReadNum(
        '/api/blog/updateReadNum',
        { readNum, blogId }
      )
    }
  },
  beforeRouteLeave(to, from, next) {
    const list = document.querySelectorAll('.menu-wrapper ul li a.item')
    list[2].setAttribute('class', 'item')
    next()
  }
}
</script>
<style scoped>
.conent-wrapper {
  margin: 0 24px 40px 24px;
  background: url('../../assets/images/palm-leaf.png');
  box-shadow: 0 5px 20px #666;
}
.row {
  padding: 20px;
}
.row .right {
  float: right;
}
</style>