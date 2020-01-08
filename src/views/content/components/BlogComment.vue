<template>
  <el-row>
    <el-col :span="2">
      <el-avatar 
        v-if="userInfo"
       :size="40" 
       :src="require(`../../../../public/images/uploadImages/${userInfo.avatar}`)"
       fit="fit"
       ></el-avatar>
      <el-avatar 
        v-else
       :size="40" 
       :src="require('../../../assets/images/photo.jpg')"
       fit="fit"
       ></el-avatar>
    </el-col>
    <el-col :span="22">
      <el-input
        type="textarea"
        placeholder="想对作者说点什么..."
        v-model="textarea"
        :autosize="{ minRows: 6, maxRows: 10}"
        maxlength="100"
        show-word-limit
        clearable
      >
      </el-input>
      <div class="btns">
        <el-button v-if="textarea" @click="textarea = '' ">清空评论</el-button>
        <el-button type="primary" @click="commitAppraise">发表评论</el-button>
      </div>
      <div class="comments">
        <ul>
          <li v-for="(item, index) in appraises" :key="index">
            <div class="title">
              <el-avatar 
              :size="20" 
              :src="require(`../../../../public/images/uploadImages/${item.avatar}`)"
              fit="fit"
              ></el-avatar>
              <span class="item name">{{item.userName}}</span>
              <span class="item">{{item.createdAt | dateFormat}}</span>
              <span class="item" style="float: right;margin-top: 5px;">{{index + 1}}楼</span>
            </div>
            <div class="content">{{item.appraiseContent}}</div>
          </li>
        </ul>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import { commitAppraise } from '../../../request/api/blog'
import message from '../../../utils/message'
import messageBox from '../../../utils/messageBox'
export default {
  props: {
    appraises: {
      type: Array
    }
  },
  data() {
    return {
      textarea: ''
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
    async commitAppraise() {
       if(!this.userInfo) {
        await messageBox('系统检测当前未登录，是否前往登录？', '当前未登录', {
          distinguishCancelAndClose: true,
          confirmButtonText: '登录',
          cancelButtonText: '取消'
        }).then(() => {
          const blogId = this.$route.query.blogId
          const userId = this.$route.query.userId
          const pathname = window.location.hash.substr(2)
          this.$router.push({
            path: '/login',
            query: {
              pathname,
              blogId,
              userId
            }
          })
        }).catch(() => false)
        return
      }
      if(!this.textarea) {
        message(true, '请输入评论', 'error')
      }
      const { avatar, userName, id } = this.userInfo
      const userId = id
      const blogId = this.$route.query.blogId
      const appraiseContent = this.textarea.trim()
      const result = await commitAppraise(
        '/api/blog/commitAppraise',
        {
          avatar,
          userName,
          userId,
          blogId,
          appraiseContent
        }
      )
      if(result.errno === 0) {
        this.$emit('handleLoadBlog')
        this.textarea = ''
      }
    }
  }
}
</script>
<style scoped>
>>>.el-avatar>img {
  width: 100%;
}
.btns {
  margin: 10px 0;
  text-align: right;
}
.comments ul li {
  margin: 10px 0;
}
ul li div.title span{
  vertical-align: text-bottom;
}
ul li div.title span.item {
  margin-left: 14px;
  font-size: 12px;
  color: #999;
}
ul li div.title span.name {
  font-size: 14px;
  font-weight: bold;
  color: #2e2e2e;
}
ul li div.content {
  padding-left: 33px;
  font-size: 14px;
  color: #4d4d4d;
  margin-top: 10px;
}
</style>