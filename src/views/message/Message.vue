<template>
  <div class="message-wrapper">
    <header-title></header-title>
    <div class="baberrage">
      <baberrage :barrageList="baberrageList" />
    </div>
    <div class="divider">
      <el-divider>
        <i class="el-icon-loading">我是华丽的分割线</i>
      </el-divider>
    </div>
    <message-board 
    @handleGetBaberrageList="handleGetBaberrageList" 
    />
  </div>
</template>
<script>
import HeaderTitle from '../../../src/components/HeaderTitle'
import Baberrage from './components/Baberrage'
import MessageBoard from './components/MessageBoard'
import message from '../../utils/message'
export default {
  components: {
    Baberrage,
    HeaderTitle,
    MessageBoard
  },
  data() {
    return {
      baberrageList: []
    }
  },
  methods: {
    async handleGetBaberrageList(result) {
      if (!result) {
        message(true, '呵呵，服务器出了点故障', 'error')
        return
      }
      this.baberrageList = result
    }
  }
}
</script>
<style scoped>
.message-wrapper {
  margin: 0 24px 40px 24px;
  background: url('../../assets/images/palm-leaf.png');
  box-shadow: 0 5px 20px #666;
}
.baberrage {
  width: 100%;
  height: 300px;
  position: relative;
}
.divider {
  margin: 100px 0 20px 0;
}
</style>