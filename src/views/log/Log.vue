<template>
  <div class="blog-wrapper">
    <header-title></header-title>
    <tabs />
  </div>
</template>
<script>
import HeaderTitle from '../../../src/components/HeaderTitle'
import Tabs from './components/Tabs'
export default {
  components: {
    HeaderTitle,
    Tabs
  }
}
</script>
<style scoped>
.blog-wrapper {
  margin: 0 24px 24px 24px;
  background: url('../../assets/images/palm-leaf.png');
  box-shadow: 0 5px 20px #666;
}
</style>
