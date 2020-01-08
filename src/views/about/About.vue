<template>
  <div class="about-wrapper">
    <header-title></header-title>
    <intro />
    <!-- <header-title title="个人简介" :avatarShow="false"></header-title>
    <personal-info />
    <header-title title="个人技能" :avatarShow="false"></header-title>
    <skills /> -->
    <header-title title="." :avatarShow="false"></header-title>
    <evaluate />
  </div>
</template>
<script>
import HeaderTitle from '../../../src/components/HeaderTitle'
import Intro from './components/Intro'
import PersonalInfo from './components/PersonalInfo'
import Skills from './components/Skills'
import Evaluate from './components/Evaluate'
export default {
  components: {
    HeaderTitle,
    Intro,
    PersonalInfo,
    Skills,
    Evaluate
  }
}
</script>
<style scoped>
.about-wrapper {
  margin: 0 24px;
  background: #fff;
  box-shadow: 0  5px 20px #666;
}
</style>