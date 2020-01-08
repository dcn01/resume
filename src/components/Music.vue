<template>
  <aplayer 
    autoplay
    float
    mini
    repeat="repeat-all"
    :volume="0.4"
    :music="{
      title: '奥里给',
      artist: 'Silent Siren',
      src: require('../../public/music/aoligei.mp3'),
      pic: require('../../public/music/tt-avatar.jpg')
    }"
  />
</template>
<script>
import Aplayer from 'vue-aplayer'
export default {
  components: {
    Aplayer
  }
}
</script>