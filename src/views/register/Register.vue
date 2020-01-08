<template>
  <div class="register-wrapper">
    <register-form />
  </div>
</template>
<script>
import RegisterForm from './components/RegisterForm'
export default {
  components: {
    RegisterForm
  }
}
</script>
<style scoped>
.register-wrapper {
  position: relative;
  height: 100%;
  font-size: 14px;
  font-weight: 400;
}
</style>