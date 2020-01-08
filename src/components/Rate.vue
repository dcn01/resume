<template>
  <el-rate
    class="rate"
    v-model="rateValue"
    show-score
    :allow-half="allowHalf"
    :disabled="isDisabled"
    :style="{height, lineHeight}"
    @change="handleChangeRate"
    text-color="#ff9900"
    score-template="{value}"
  >></el-rate>
</template>
<script>
export default {
  props: {
    isDisabled: {
      type: Boolean,
      default: true
    },
    height: {
      type: String
    },
    lineHeight: {
      type: String
    },
    rateValue: {
      type: Number,
      default: 5
    },
    allowHalf: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleChangeRate(val) {
      this.$emit('handleChangeRate', val)
    }
  }
}
</script>
<style scoped>
  >>> .el-rate__item {
    font-size: 16px;
  }
</style>