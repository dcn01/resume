/**
 * @description 照片路由
 * @author 陈佳兵
 */

const router = require('koa-router')()
router.prefix('/api/photo')
const { getPhotoList, comment } = require('../controller/photo')

router.get('/getPhotoList', async(ctx, next) => {
  const { page, pageSize } = ctx.request.query
  ctx.body = await getPhotoList({ page, pageSize })
})

router.post('/comment', async(ctx, next) => {
  const {
    commentContent,
    photoId,
    userId,
    userName,
    rateValue
  } = ctx.request.body
  ctx.body = await comment({
    commentContent,
    photoId,
    userId,
    userName,
    rateValue
  })
})


module.exports = router