<template>
  <el-card>
    <h1 class="title">{{blogInfo.title}}</h1>
    <div class="info">
      <el-avatar 
        :src="require(`../../../../public/images/uploadImages/${userInfo.avatar}`)"
        :size="40" 
        fit="fill"></el-avatar>
      <span class="name">{{userInfo.userName}}</span>
      <span>发布与{{blogInfo.createdAt | dateFormat}}</span>
      <span>阅读数&nbsp;&nbsp;&nbsp;{{blogInfo.readNum}}</span>
      <el-button 
      type="primary"
      v-if="$route.query.userId && $route.query.userId==userInfo.id"
      @click="handleEdit(blogInfo.id)"
      >编辑</el-button>
    </div>
    <el-divider content-position="left">
      <i class="el-icon-tickets"></i>
    </el-divider>
    <div class="quill-editor">
      <div class="ql-container ql-snow">
        <div class="ql-editor">
          <div v-html="blogInfo.content">
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="btn">
      <button :class="{'active': buttonActive}" @click="handleClickPraise">
        <span>👍</span>
        <span style="margin: 0 10px;">点赞</span>
        <span>{{blogInfo.pariseNum}}</span>
      </button>
    </div> -->
    <div class="comment-list">
      <blog-comment :appraises="appraises" @handleLoadBlog="handleLoadBlog"/>
    </div>
  </el-card>
</template>
<script>
import 'quill/dist/quill.snow.css'
import BlogComment from './BlogComment'
export default {
  props: {
    blogInfo: {
      type: Object
    },
    userInfo: {
      type: Object
    },
    appraises: {
      type: Array
    }
  },
  components: {
    BlogComment
  },
  data() {
    return {
      buttonActive: false
    }
  },
  methods: {
    handleLoadBlog() {
      this.$emit('handleLoadBlog')
    },
    handleEdit(blogId) {
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
h1.title {
  font-size: 28px;
  word-wrap: break-word;
  color: #000;
}
.info {
  font-size: 14px;
  margin-top: 20px;
}
.info span {
  margin-right: 20px;
  vertical-align: middle;
  font-size: 12px;
}
.info span.name {
  color: blue;
}
.info button {
  float: right;
}
.quill-editor,.comment-list {
  margin: 20px 0;
}
.ql-container.ql-snow {
  border: none;
}
.btn {
  text-align: right;
}
.btn button {
  padding: 10px;
  border: none;
  background: #f5f6f7;
  cursor: pointer;
}
.btn button.active {
  color: #409eff;
  background-color: #ecf5ff;
}
.btn button:hover {
  color: #409eff;
  background-color: #ecf5ff;
}
</style>