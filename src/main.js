import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../src/assets/css/reset.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { vueBaberrage } from 'vue-baberrage'
import moment from 'moment'

Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
Vue.use(ElementUI)
Vue.use(vueBaberrage)

Vue.filter('dateFormat', function (dateStr,pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dateStr).format(pattern)
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
