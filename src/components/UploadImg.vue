<template>
  <el-upload
    class="avatar-uploader"
    action="api/utils/uploadImage"
    ref="upload"
    :show-file-list="false"
    :auto-upload="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    :on-change="onChange"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>
<script>
export default {
  data() {
    return {
      imageUrl: ''
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.$emit('handleGetFilename', res.filename)
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    onChange(file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.$emit('onChange', file.raw)
    },
    upload() {
      this.$refs.upload.submit()
    }
  }
}
</script>
<style scoped>
>>> .el-upload {
  width: 80px;
  height: 80px;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  border: 1px dashed #44a0b3;
}
.avatar {
  width: 80px;
  height: 80px;
}
</style>