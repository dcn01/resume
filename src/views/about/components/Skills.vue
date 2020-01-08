<template>
  <div class="skills-wrapper">
    <el-tabs type="border-card">
      <el-tab-pane 
        v-for="(item, index) in tabs" 
        :key="index">
        <span slot="label">
          <i :class="item.icon" :style="{'color': item.color}"></i> 
          {{item.label}}
        </span>
        <div v-if="item.label==='Html'">
          <skills-progress 
          :percentage="90" 
          color="red" 
          :width="200" 
          :label="item.label"
          ></skills-progress>
        </div>
        <div class="progress-list" v-if="item.label==='Css'">
          <skills-progress :percentage="90" :width="200" color="#e7ea0c" :label="item.label"></skills-progress>
          <skills-progress :percentage="80" :width="200" color="#cdc0e7" label="Elementui"></skills-progress>
          <skills-progress :percentage="70" :width="200" color="#0cead6" label="Bootstrap"></skills-progress>
        </div>
        <div class="progress-list" v-if="item.label==='Javascript'">
          <skills-progress :percentage="90" color="#e7ea0c" :width="200" :label="item.label"></skills-progress>
          <skills-progress :percentage="90" color="#cdc0e7" :width="200" label="ES6"></skills-progress>
        </div>
        <div v-if="item.label==='Vue'">
           <skills-progress :percentage="90" color="#3eaf7c" :width="200" label="Vue全家桶"></skills-progress>
        </div>
        <div v-if="item.label==='React'">
          <skills-progress :percentage="50" color="#9eeafd" :width="200" label="React全家桶"></skills-progress>
        </div>
        <div v-if="item.label==='Webpack'">
          <skills-progress :percentage="70" color="#1c78c0" :width="200" label="Webpack"></skills-progress>
        </div>
        <div class="progress-list" v-if="item.label==='Nodejs'">
          <skills-progress :percentage="80" color="#026e00" :width="200" label="Koa2"></skills-progress>
          <skills-progress :percentage="50" color="#026e00" :width="200" label="Express"></skills-progress>
        </div>
        <div v-if="item.label==='Mysql'">
          <skills-progress :percentage="50" color="#1c78c0" :width="200" label="Mysql"></skills-progress>
        </div>
        <div v-if="item.label==='Git'">
           <skills-progress :percentage="80" color="orange" :width="200" label="Git"></skills-progress>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import SkillsProgress from './Progress'
export default {
  components: {
    SkillsProgress
  },
  data() {
    return {
      tabs: [
        {label: 'Html', icon: 'iconfont icon-html', color: 'red'},
        {label: 'Css', icon: 'iconfont icon-CSS', color: 'Yellow'},
        {label: 'Javascript', icon: 'iconfont icon-js', color: 'blue'},
        {label: 'Vue', icon: 'iconfont icon-Vue', color: 'green'},
        {label: 'React', icon: 'iconfont icon-React', color: '#9eeafd'},
        {label: 'Webpack', icon: 'iconfont icon-webpack', color: '#1c78c0'},
        {label: 'Nodejs', icon: 'iconfont icon-Nodejs', color: '#026e00'},
        {label: 'Mysql', icon: 'iconfont icon-shujukuleixingtubiao-kuozhan-', color: 'purple'},
        {label: 'Git', icon: 'iconfont icon-git', color: 'orange'}
      ]
    }
  }
}
</script>
<style scoped>
.progress-list {
  display: flex;
}
.progress-list .progress {
  flex: 1;
}
>>>.el-tabs__content {
  background: url('../../../assets/images/palm-leaf.png');
}
</style>