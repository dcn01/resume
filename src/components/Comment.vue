<template>
  <div>
    <el-input
      type="textarea"
      placeholder="不要吝啬你的赞美"
      v-model="textarea"
      maxlength="100"
      :clearable="true"
      resize="none"
      autocomplete="off"
      show-word-limit
    ></el-input>
    <div class="comment-btns">
      <el-button v-if="textarea" @click="textarea=''">清空评论</el-button>
      <el-button type="primary" @click="handleCommentClick">发表评论</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      textarea: ''
    }
  },
  methods: {
    handleCommentClick() {
      this.$emit('handleCommentClick', this.textarea)
    },
    clearTextarea() {
      this.textarea = ""
    }
  }
}
</script>
<style scoped>
.comment-btns {
  text-align: right;
  margin: 10px 0;
}
>>>.el-textarea .el-input__count {
  background: transparent;
  display: inline-block;
  height: 100%;
  bottom: -6px;
}
</style>