<template>
  <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
    <el-tab-pane name="all">
      <span slot="label"><i class="el-icon-s-order"></i> 全部</span>
      <tab-table 
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
        :blogList="blogList"
        :count="count"
        :page="page"
        :pageSize="pageSize"
      />
    </el-tab-pane>
    <el-tab-pane name="me">
      <span slot="label"><i class="el-icon-user"></i> 我</span>
      <tab-table 
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
        :blogList="blogList"
        :count="count"
        :page="page"
        :pageSize="pageSize"
      />
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import TabTable from './Table'
import { getBlogList } from '../../../request/api/blog'
import moment from 'moment'
import messageBox from '../../../utils/messageBox'
export default {
  components: {
    TabTable
  },
  data() {
    return {
      activeName: 'all',
      userId: '',
      page: 1,
      pageSize: 10,
      count: 0,
      blogList: []
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
  async mounted() {
    await this.getBlogList()
  },
  methods: {
    async handleClick(tab, event) {
      this.page = 1
      if(tab.name === 'me') {
        if(!this.userInfo) {
          await messageBox('系统检测当前未登录，是否前往登录？', '当前未登录', {
            distinguishCancelAndClose: true,
            confirmButtonText: '登录',
            cancelButtonText: '取消'
          }).then(() => {
            const pathname = window.location.hash.substr(2)
            this.$router.push({
              path: '/login',
              query: {
                pathname
              }
            })
          }).catch(() => false)
          this.activeName = 'all'
          return
        }
        this.userId = this.userInfo.id
      }else {
        this.userId = ""
      }
      await this.getBlogList()
    },
    async handleCurrentChange(val) {
      this.page = val
      await this.getBlogList()
    },
    async handleSizeChange(val) {
      this.pageSize = val
      await this.getBlogList()
    },
    async getBlogList() {
      const userId = this.userId || ''
      const page = this.page
      const pageSize = this.pageSize
      const result = await getBlogList(
        '/api/blog/getBlogList',
        {userId, page, pageSize}
      )
      if(result.errno === 0) {
        this.blogList = result.data.blogList
        this.blogList.map(blog => {
          const pattern = "YYYY-MM-DD HH:mm:ss"
          blog.createdAt = moment(blog.createdAt).format(pattern)
        })
        this.count = result.data.count
        return
      }
    }
  }
}
</script>