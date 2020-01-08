<template>
  <div class="login-wrapper">
    <login-form />
  </div>
</template>
<script>
import LoginForm from './components/LoginForm'
export default {
  components: {
    LoginForm
  }
}
</script>
<style scoped>
.login-wrapper {
  position: relative;
  height: 100%;
  font-size: 14px;
  font-weight: 400;
}
</style>