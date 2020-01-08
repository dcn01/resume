<template>
  <div class="drawer-wrapper">
    <div class="drawer" @click="load">
      <img :src="require('./menu.svg')" />
    </div>
    <el-drawer :visible.sync="drawer" :with-header="false">
      <div class="drawer-title">
        <el-button type="primary" @click="handleUploadClick">
          图片上传
          <i style="margin-left: 6px;" class="el-icon-upload"></i>
        </el-button>
      </div>
      <div v-if="photos && photos.length > 0">
        <ul class="list">
          <li class="list-item" v-for="(item, index) in photos" :key="index">
            <div class="list-item-photo">
              <el-image :src="item.photoPath" :preview-src-list="photoList"></el-image>
            </div>
            <div v-if="item.coms.length > 0">
              <el-row>
                <el-col :span="12">评分：</el-col>
                <el-col :span="12">
                  <rate
                    :isDisabled="true"
                    :rateValue="reteValueShow"
                    :allowHalf="true"
                    height="60px"
                    lineHeight="60px"
                  ></rate>
                </el-col>
              </el-row>
              <el-scrollbar :style="{'height': scrollHeight + 'px'}">
                <el-card class="box-card">
                  <div v-for="(com, index) in item.coms" :key="index">
                    <div :title="com.commentContent" class="com left">
                      <span>{{com.commentContent}}</span>
                    </div>
                    <div class="com right">
                      <span :title="com.userName">{{com.userName}}</span>
                      &nbsp;&nbsp;&nbsp;
                      <span :title="com.createdAt">{{com.createdAt | dateFormat}}</span>
                    </div>
                    <el-divider content-position="right">
                      <i class="el-icon-chat-dot-square"></i>
                    </el-divider>
                  </div>
                </el-card>
              </el-scrollbar>
            </div>
            <div v-else>暂无评论，点击按钮成为第一个评论的人吧！</div>
            <div style="text-align:right;margin-right: 20px;">
              <el-button type="primary" @click="commentHandleIsShow(item)">评论</el-button>
            </div>
          </li>
        </ul>
        <p v-if="loading">
          <i class="el-icon-loading"></i>
        </p>
        <el-backtop target=".el-drawer__body" :bottom="300">
          <div class="up">
            <i class="el-icon-top"></i>
          </div>
        </el-backtop>
        <pagination 
        v-if="count > 0" 
        :total="count" 
        @handleCurrentChange="handleCurrentChange" />
      </div>
      <div class="nodata" v-else>
        <img :src="require('../../../../public/images/nodata.png')" alt="">
      </div>
    </el-drawer>
    <el-dialog title="照片评论"  :visible.sync="commentDialog" width="30%" center>
      <div>
        <el-image v-if="photoInfo" :src="photoInfo.photoPath" style="width: 50%;" fit="fill"></el-image>
        <rate
          :isDisabled="false"
          height="20px"
          lineHeight="20px"
          @handleChangeRate="handleChangeRate"
        />
        <comment @handleCommentClick="handleCommentClick" ref="commentChild"/>
      </div>
    </el-dialog>
    <el-dialog title="图片上传" 
    :visible.sync="uploadDialog" 
    custom-class="uploadDialog"
    :fullscreen="true"
    top="0"
    append-to-body
    width="100%" center>
      <upload-photo ref="upload" @handleSuccess="handleSuccess"/>
      <div class="dialog-footer">
        <el-button type="info" @click="uploadDialog = false">取消</el-button>
        <el-button type="success" @click="upload">上传</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Rate from '../../../components/Rate'
import Comment from '../../../components/Comment'
import Pagination from './Pagination'
import UploadPhoto from './UploadPhoto'
import { getPhotoList, sendComment } from '../../../request/api/drawer'
import message from '../../../utils/message'
import messageBox from '../../../utils/messageBox'
export default {
  components: {
    Rate,
    Comment,
    Pagination,
    UploadPhoto
  },
  data() {
    return {
      drawer: false,
      loading: false,
      rateValue: 5,
      reteValueShow: 0,
      photos: [],
      photoList: [],
      commentDialog: false,
      uploadDialog: false,
      photoInfo: null,
      comments: [],
      count: 0,
      page: 1,
      scrollHeight: 0
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
    async load() {
      this.drawer = true
      const page = this.page
      const pageSize = 1
      const result = await getPhotoList('/api/photo/getPhotoList', {
        page,
        pageSize
      })
      if (result.errno === 0) {
        this.loading = true
        let photoList = result.data.photoList
        this.photos = []
        photoList.map(photo => {
          photo.photoPath = require(`../../../../public/images/uploadImages/${photo.photoName}`)
          this.photoList.push(
            require(`../../../../public/images/uploadImages/${photo.photoName}`)
          )
        })
        this.loading = false
        this.photos = photoList
        this.count = result.data.count
        this.comments = photoList[0].coms
        let rate = 0
        this.comments.forEach(com => {
          rate += parseInt(com.rateValue)
        })
        this.reteValueShow = +(rate / this.comments.length).toFixed(1)
        this.comments.length > 3 ? this.scrollHeight = 350 : this.scrollHeight = 90 * this.comments.length
        return
      }
      message(true, '加载出错了，不好意思', 'error')
    },
    async commentHandleIsShow(photoInfo) {
       if(!this.userInfo) {
        await messageBox('系统检测当前未登录，是否前往登录？', '当前未登录', {
          distinguishCancelAndClose: true,
          confirmButtonText: '登录',
          cancelButtonText: '取消'
        }).then(() => {
          this.$router.push('/login')
        }).catch(() => false)
        return
      }
      this.commentDialog = true
      this.photoInfo = photoInfo
    },
    async handleCommentClick(comment) {
      if (!comment) {
        message(true, '请填写评论之后再发送', 'error')
        return
      }
      const userInfo = this.userInfo
      const commentContent = comment
      const photoId = this.photoInfo.id
      const userId = this.userInfo.id
      const userName = this.userInfo.userName
      const rateValue = this.rateValue
      const result = await sendComment('/api/photo/comment', {
        commentContent,
        photoId,
        userId,
        userName,
        rateValue
      })
      if (result.errno === 0) {
        message(true, '非常感谢您的评论，谢谢', 'success')
        await this.load()
        await this.$refs.commentChild.clearTextarea()
        this.commentDialog = false
      }
    },
    handleChangeRate(val) {
      this.rateValue = val
    },
    handleCurrentChange(val) {
      this.page = val
      this.load()
    },
    handleUploadClick() {
      this.uploadDialog = true
    },
    upload() {
      this.$refs.upload.upload()
    },
    async handleSuccess() {
      this.uploadDialog = false
      await this.load()
    }
  }
}
</script>
<style scoped>
.drawer {
  width: 60px;
  height: 60px;
  text-align: center;
  border-radius: 50%;
  color: #000000;
  background: #fff;
  cursor: pointer;
}

.drawer:hover {
  box-shadow: 0px 2px 20px #666;
}
.drawer img {
  width: 40%;
}
.drawer-title {
  /* background: #c0e3e7; */
  background: url('../../../assets/images/palm-leaf.png');
  color: #000;
  font-size: 26px;
  font-weight: 700;
}
/* .infinite-list-wrapper ul li.list-item {
  padding: 20px;
} */
ul.list li.list-item {
  margin: 10px 0;
}
ul.list li.list-item .list-item-photo {
  padding: 20px;
  background: url('../../../assets/images/photo-bg.png');
}
>>> .el-drawer__body {
  overflow: auto;
}
>>>.el-dialog.is-fullscreen {
  overflow: hidden;
}
.box-card {
  font-size: 14px;
}
.box-card .el-col {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}
.drawer-wrapper {
  float: right;
}
.up {
  height: 100%;
  width: 100%;
  box-shadow: 0px 2px 20px #666;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  background: #1989fa;
  color: #fff;
}
.up:hover {
  background-color: #fff;
  color: #1989fa;
}
>>> .el-dialog__body {
  text-align: center;
  height: 100%;
  overflow: hidden;
}
>>> .el-dialog--center .el-dialog__body,
>>> .el-dialog__header {
  padding: 0 10px;
  background: url('../../../../public/images/bg.png');
}
>>> .el-scrollbar__wrap {
  overflow-x: hidden;
}
.com {
  line-height: 24px !important;
  margin: 5px 0;
}
.com.left {
  text-align: left;
  color: #000;
}
.com.right {
  text-align: right;
  color: #999;
  font-size: 12px;
}
.nodata {
  width: 100%;
  text-align: center;
}
.nodata img {
  width: 100%;
}
</style>