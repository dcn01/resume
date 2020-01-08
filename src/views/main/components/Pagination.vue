<template>
  <el-pagination
    @current-change="handleCurrentChange"
    :page-sizes="[1]"
    :pager-count="5"
    layout="total, sizes, prev, pager, next"
    :total="total">
  </el-pagination>
</template>
<script>
export default {
  props: {
    total: {
      type: Number
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit('handleCurrentChange', val)
    }
  }
}
</script>
<style scoped>
>>>.el-pagination__sizes {
  display: none!important;
}
</style>