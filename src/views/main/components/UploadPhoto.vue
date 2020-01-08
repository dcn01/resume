<template>
  <div class="upload-wrapper">
    <el-scrollbar style="height: 500px;">
      <el-upload
        ref="upload"
        action="api/utils/uploadPhoto"
        list-type="picture-card"
        :auto-upload="false"
        :on-success="handleSuccess"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :before-upload="beforeUpload"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <br />
      <el-dialog
        :visible.sync="dialogVisible"
        :modal-append-to-body="false"
        top="5vh"
        append-to-body
        center
      >
        <img width="50%" :src="dialogImageUrl" alt />
      </el-dialog>
    </el-scrollbar>
  </div>
</template>
<script>
import message from '../../../utils/message'
export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      beforeUploadFileList: []
    }
  },
  methods: {
    beforeUpload(file) {
      this.beforeUploadFileList.push(file)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleSuccess(file, res) {
      console.log(res)
      this.fileList.push(file)
      if (this.fileList.length === this.beforeUploadFileList.length) {
        if(res.response.errno === 0) {
          message(true, '图片上传成功', 'success')
          this.$emit('handleSuccess')
        }
      }
    },
    upload() {
      this.$refs.upload.submit()
    }
  }
}
</script>
<style scoped>
.upload-wrapper {
  padding: 20px;
  max-height: 500px;
  overflow: auto;
}
>>> .el-dialog__body {
  text-align: center;
}
>>> .el-dialog__wrapper {
  overflow: hidden;
}
</style>