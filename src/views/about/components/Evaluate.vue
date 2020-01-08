<template>
  <div class="evaluate-wrapper">
    <div class="warp">
      <div class="heartText">
        <div class="hearts">
          <span>
            加油!
            <br />奥利给
          </span>
        </div>
        <div style="clear:both;"></div>
      </div>
    </div>
    <pre id="heartText">
      {{message}}
    </pre>
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: `我们不管遇到什么困难，也不要怕，
        微笑着面对他，
            消除恐惧的最好办法就是面对恐惧。
        坚持，才是胜利。
            加油！
    奥利给！奥利给！奥利给！奥利给！`,
      scrollIsTrue: true
    }
  },
  mounted() {
    //window.addEventListener('scroll', this.handleScroll, true)
    this.handleLoad()
  },
  methods: {
    handleLoad() {
      if(!this.scrollIsTrue) {
        return
      }
      let timer = null
      let num = 0
      const message = this.message
      timer = setInterval(() => {
        num++
        this.message = message.substring(0, num)
        if (num > message.length) {
          clearInterval(timer)
        }
      }, 100)
    }
    // handleScroll() {
    //   //变量scrollTop是滚动条滚动时，距离顶部的距离
    //   var scrollTop =
    //     document.documentElement.scrollTop || document.body.scrollTop //变量windowHeight是可视区的高度
    //   var windowHeight =
    //     document.documentElement.clientHeight || document.body.clientHeight //变量scrollHeight是滚动条的总高度
    //   var scrollHeight =
    //     document.documentElement.scrollHeight || document.body.scrollHeight //滚动条到底部的条件
    //   if (scrollTop + windowHeight == scrollHeight) {
    //     this.handleLoad()
    //     this.scrollIsTrue = false
    //   }
    // }
  }
}
</script>
<style scoped>
.evaluate-wrapper {
  font-weight: 700;
  background: url('../../../assets/images/palm-leaf.png');
  position: relative;
  margin-bottom: 40px;
}
.hearts span {
  position: absolute;
  top: 28px;
  left: 49px;
  font-family: '华文行楷';
  z-index: 999;
  color: #fff;
  text-align: center;
}

.hearts {
  width: 200px;
  height: 200px;
  position: relative;
  float: right;
  margin-top: 90px;
  margin-right: 50px;
  animation: heart 3s linear infinite normal;
}

.hearts:before,
.hearts:after {
  position: absolute;
  content: '';
  left: 70px;
  top: 0;
  width: 70px;
  height: 115px;
  background: #f00;
  -moz-border-radius: 50px 50px 0 0;
  border-radius: 50px 50px 0 0;
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
  -webkit-transform-origin: 0 100%;
  -moz-transform-origin: 0 100%;
  -ms-transform-origin: 0 100%;
  -o-transform-origin: 0 100%;
  transform-origin: 0 100%;
}

.hearts:after {
  left: 0;
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
  -webkit-transform-origin: 100% 100%;
  -moz-transform-origin: 100% 100%;
  -ms-transform-origin: 100% 100%;
  -o-transform-origin: 100% 100%;
  transform-origin: 100% 100%;
}

@keyframes heart {
  0% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1.3);
  }
}
#heartText {
  position: absolute;
  top: 30px;
  left: 50px;
  font-size: 18px;
}
</style>