/**
 * @description Contact 路由
 * @author 陈佳兵
 */
const router = require('koa-router')()
router.prefix('/api/contact')
const commitMessage = require('../controller/contact')

router.post('/commitMessage', async(ctx, next) => {
  const {
    userId,
    username,
    email,
    phone,
    QQ,
    wechat,
    message
  } = ctx.request.body
  ctx.body = await commitMessage({
    userId,
    username,
    email,
    phone,
    QQ,
    wechat,
    message
  })
})

module.exports = router