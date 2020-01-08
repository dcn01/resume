<template>
  <vue-baberrage 
  isShow
  loop
  :throttleGap="5000"
  :barrageList="barrageList" ></vue-baberrage>
</template>
<script>
import { MESSAGE_TYPE } from 'vue-baberrage'
export default {
  props: {
    barrageList: {
      type: Array
    }
  }
}
</script>
<style>
.baberrage-item.red {
  background: rgba(255, 0, 0, .7) !important;
  color: #fff;
  border-radius: 100px;
}
.baberrage-item.yellow {
  background: rgba(255, 255, 0, .7) !important;
  color: #fff;
  border-radius: 100px;
}
.baberrage-item.green {
  background: rgba(0, 255, 0, .7) !important;
  color: #fff;
  border-radius: 100px;
}
.baberrage-item.blue {
  background: rgba(30, 144, 255, .7) !important;
  color: #fff;
  border-radius: 100px;
}
.baberrage-item.orange {
  background: rgba(255, 165, 0, .7) !important;
  color: #fff;
  border-radius: 100px;
}
</style>