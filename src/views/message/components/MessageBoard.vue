<template>
  <div class="message-board-wrapper">
    <el-row>
      <el-col :span="24">弹幕设置</el-col>
    </el-row>
    <el-row class="row">
      <el-col :span="12">是否滚动</el-col>
      <el-col :span="12">
        <el-switch
          v-model="type"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-value="MESSAGE_TYPE.NORMAL"
          inactive-value="MESSAGE_TYPE.FROM_TOP"
          @change="changeSwitch"
        ></el-switch>
      </el-col>
    </el-row>
    <el-row class="row">
      <el-col :span="12">滚动速度</el-col>
      <el-col :span="12">
        <el-slider v-model="sliderValue" :min="1" :max="10" :step="1"></el-slider>
      </el-col>
    </el-row>
    <el-row class="row">
      <el-col :span="4">背景颜色</el-col>
      <el-col :span="14" class="bg-list">
        <div
          class="bg-list-item"
          v-for="(item, index) in bgList"
          :key="index"
          :id="item.color"
          :style="{'background':item.color}"
          @click="handleBgClick(item)"
        ></div>
      </el-col>
      <el-col :span="6" style="margin-top: -8px;">
        <div class="baberrage" :style="{'background': baberrageBg}">
          <img :src="require('../../../assets/images/photo.jpg')" alt />
          <span>我是一条弹幕</span>
        </div>
      </el-col>
    </el-row>
    <el-row class="row">
      <el-col :span="4">弹幕内容</el-col>
      <el-col :span="20">
        <el-input
          type="text"
          placeholder="不要吝啬你的赞美，请开始吧！"
          v-model="textarea"
          maxlength="30"
          show-word-limit
        ></el-input>
      </el-col>
    </el-row>
    <el-row class="row">
      <el-col :span="24" style="text-align:right;">
        <el-button type="info" v-if="textarea" @click="clearMessage">清空</el-button>
        <el-button type="primary" @click="sendMessage">发送</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import xss from 'xss'
import { 
  createMessage, 
  getBaberrageList,
  getOneBaberrage
} from '../../../request/api/baberrage'
import message from '../../../utils/message'
import messageBox from '../../../utils/messageBox'
import { MESSAGE_TYPE } from 'vue-baberrage'
export default {
  data() {
    return {
      type: 'MESSAGE_TYPE.NORMAL',
      position: null,
      sliderValue: 5,
      textarea: '',
      bgColor: 'normal',
      baberrageBg: '',
      bgList: [
        { name: 'normal', color: 'rgba(0, 0, 0, .7)' },
        { name: 'red', color: 'rgba(255, 0, 0, .7)' },
        { name: 'yellow', color: 'rgba(255, 255, 0, .7)' },
        { name: 'green', color: 'rgba(0, 255, 0, .7)' },
        { name: 'blue', color: 'rgba(30, 144, 255, .7)' },
        { name: 'orange', color: 'rgba(255, 165, 0, .7)' }
      ],
      baberrageList: []
    }
  },
  computed: {
    userInfo() {
      if (this.$store.getters.getUserInfo) {
        return this.$store.getters.getUserInfo
      }
      return null
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll(), true)
    this.getBaberrageList()
  },
  methods: {
    handleBgClick(item) {
      this.bgColor = item.name
      this.baberrageBg = item.color
    },
    clearMessage() {
      this.textarea = ''
    },
    async sendMessage() {
      if(!this.userInfo) {
        await messageBox('系统检测当前未登录，是否前往登录？', '当前未登录', {
          distinguishCancelAndClose: true,
          confirmButtonText: '登录',
          cancelButtonText: '取消'
        }).then(() => {
          const pathname = window.location.hash.substr(2)
          this.$router.push({
            path: '/login',
            query: {
              pathname
            }
          })
        }).catch(() => false)
        return
      }
      if(!this.textarea) {
        message(true, '请输入弹幕内容', 'error')
        return 
      }
      const type = this.type
      const position = this.position
      const sliderValue = this.sliderValue
      const bgColor = this.bgColor
      const textarea = xss(this.textarea)
      const userName = this.userInfo.userName
      const userId = this.userInfo.id
      const avatar = this.userInfo.avatar
      const result = await createMessage(
        '/api/baberrage/sendBaberage',
        {
          type,
          position,
          sliderValue,
          bgColor,
          textarea,
          userName,
          userId,
          avatar
        }
      )
      if(result.errno === 0) {
        message(true, '弹幕发送成功', 'success')
        this.textarea = ""
        await this.handleScroll()
        await this.getOneBaberrage()
        return
      }
      message(true, result.message, 'error')
    },
    async handleScroll() {
      let timer = null
      let scroll_top = document.documentElement.scrollTop || document.body.scrollTop
      let scrollheight = document.body.scrollHeight
      timer = setInterval(() => {
        var speed = (0 - scroll_top) / 15
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)
        scroll_top = scroll_top + speed
        document.documentElement.scrollTop = scroll_top
        if (scroll_top <= 0) {
          clearInterval(timer)
        }
      }, 20)
    },
    async getBaberrageList() {
      const userId = this.userId
      const result = await getBaberrageList(
        '/api/baberrage/getBaberrageList',
        { userId }
      )
      if(result.errno === 0) {
        const res =  result.data
        if(res.length > 0) {
          this.baberrageList = []
          res.map(item => {
            item.avatar= require(`../../../../public/images/uploadImages/${item.avatar}`)
            if(item.type === 'MESSAGE_TYPE.NORMAL') {
              item.type = MESSAGE_TYPE.NORMAL
            }else {
              item.type = MESSAGE_TYPE.FROM_TOP
            }
            this.baberrageList.push(item)
          })
        }
        this.$emit('handleGetBaberrageList', this.baberrageList)
        return
      }
      return null
    },
    async getOneBaberrage() {
      const result = await getOneBaberrage(
        '/api/baberrage/getOneBaberrage'
      )
      let baberrage = result.data
      baberrage.avatar= require(`../../../../public/images/uploadImages/${baberrage.avatar}`)
      if(baberrage.type === 'MESSAGE_TYPE.NORMAL') {
        baberrage.type = MESSAGE_TYPE.NORMAL
      }else {
        baberrage.type = MESSAGE_TYPE.FROM_TOP
      }
      this.baberrageList.push(baberrage)
    },
    changeSwitch(val) {
      if(val === 'MESSAGE_TYPE.FROM_TOP') {
        this.position = 'top'
      }else {
        this.position = null
      }
    }
  }
}
</script>
<style scoped>
.message-board-wrapper {
  padding: 20px 40px;
  font-weight: 700;
}
.row {
  margin-top: 20px;
}
.bg-list {
  display: flex;
}
.bg-list .bg-list-item {
  flex: 1;
  cursor: pointer;
  width: 15px;
  height: 25px;
  border-radius: 15px;
  border: 1px solid #f5f5f5;
  margin: 0 10px;
}
.baberrage {
  display: flex;
  padding: 5px;
  text-align: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  width: 70%;
  font-weight: 400;
  border-radius: 20px;
  margin: 0 auto;
}
.baberrage img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 20px;
}
</style>