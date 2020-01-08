<template>
  <div class="progress">
    <el-progress 
    type="circle" 
    :percentage="percentage"
    :color="color"
    :width="width"
    ></el-progress>
    <div class="label">{{ label }}</div>
  </div>
</template>
<script>
export default {
  props: {
    percentage: {
      type: Number,
      default: 0
    },
    color: {
      type: String
    },
    label: {
      type: String
    },
    width: {
      type: Number
    }
  }
}
</script>
<style scoped>
.progress {
  text-align: center;
}
.label {
  font-weight: 700;
  font-size: 20px;
}
</style>