/**
 * @description user 路由
 * @author 陈佳兵
 */

const router = require('koa-router')()
router.prefix('/api/user')
const { register, isExist, login, logout } = require('../controller/user')

router.post('/register', async (ctx, next) => {
  const { username, password, phone, filename} = ctx.request.body
  ctx.body = await register({ username, password, phone, filename})
})

router.get('/isExist', async(ctx, next) => {
  const { phone } = ctx.request.query
  ctx.body = await isExist({ phone })
})

router.post('/login', async(ctx, next) => {
  const { phone, password } = ctx.request.body
  ctx.body = await login(ctx, { phone, password })
})

router.post('/logout', async(ctx, next) => {
  ctx.body = await logout(ctx)
})

module.exports = router