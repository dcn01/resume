<template>
  <div class="main-wrapper">
    <div class="music">
      <music />
    </div>
    <el-row class="main-wrapper-header">
      <el-col :span="4">
        <main-logo />
      </el-col>
      <el-col :span="16">
        <main-menu />
      </el-col>
      <el-col :span="4">
        <main-drawer />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5">
        <main-card />
      </el-col>
      <el-col :span="19">
        <router-view />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import MainMenu from './components/Menu'
import MainLogo from './components/Logo'
import MainDrawer from './components/Drawer'
import MainCard from './components/Card'
import Music from '../../components/Music'
export default {
  components: {
    MainMenu,
    MainLogo,
    MainDrawer,
    MainCard,
    Music
  }
}
</script>
<style scoped>
.main-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}
.main-wrapper-header {
  padding: 20px 20px;  
  margin-left: 288px;
  line-height: 60px;
}
.music {
  position: absolute;
  left: 100px;
  top: 20px;
}
.main-wrapper-header .el-col {
  text-align: center;
}
</style>