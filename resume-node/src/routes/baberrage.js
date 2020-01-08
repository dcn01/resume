/**
 * @description baberrage 路由
 * @author 陈佳兵
 */

const router = require('koa-router')()
router.prefix('/api/baberrage')
const { 
  sendBaberage, 
  getBaberrageList, 
  getOneBaberrage 
} = require('../controller/baberrage')

router.post('/sendBaberage', async(ctx, next) => {
  const {
    type,
    position,
    sliderValue,
    bgColor,
    textarea,
    userName,
    userId,
    avatar
  } = ctx.request.body

  ctx.body = await sendBaberage({
    type,
    position,
    sliderValue,
    bgColor,
    textarea,
    userName,
    userId,
    avatar
  })
})

router.get('/getBaberrageList', async(ctx, next) => {
  const userId = ctx.request.query.userId
  ctx.body = await getBaberrageList(userId)
})

router.get('/getOneBaberrage', async(ctx, next) => {
  ctx.body = await getOneBaberrage()
})

module.exports = router