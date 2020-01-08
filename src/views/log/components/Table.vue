<template>
  <div class="table-wrapper">
    <el-table :data="blogList" border style="width: 100%">
      <el-table-column prop="title" label="微博标题"></el-table-column>
      <el-table-column prop="userName" label="作者"></el-table-column>
      <el-table-column prop="readNum" label="访问量"></el-table-column>
      <el-table-column prop="createdAt" label="创建时间"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button 
          v-if="userInfo && userInfo.id==scope.row.userId"
          @click="handleEdit(scope.row)"
          type="text" size="small"
          >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="count > 0"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 30]"
      :page-size="pageSize"
      :current-page="page"
      layout="total, sizes, prev, pager, next, jumper"
      :total="count">
    </el-pagination>
  </div>
</template>
<script>
export default {
  props: {
    blogList: {
      type: Array
    },
    count: {
      type: Number,
      default: 0
    },
    page: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
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
    handleSizeChange(val) {
      this.$emit('handleSizeChange', val)
    },
    handleCurrentChange(val) {
      this.$emit('handleCurrentChange', val)
    },
    handleClick(row) {
      const blogId = row.id
      this.$router.push({
        path: '/content',
        query: {
          blogId,
          userId: this.userInfo && this.userInfo.id || ''
        }
      })
    },
    handleEdit(row) {
      const blogId = row.id
      this.$router.push({
        path: '/new',
        query: {
          blogId
        }
      })
    }
  }
}
</script>
<style scoped>
.table-wrappe {
  width: 100%;
}
.el-pagination {
  text-align: center;
}
</style>