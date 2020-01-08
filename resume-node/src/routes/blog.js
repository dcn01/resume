/**
 * @description blog 路由
 * @author 陈佳兵
 */

const router = require('koa-router')()
router.prefix('/api/blog')
const { 
  commitContent, 
  getBlogList, 
  getBlogContent,
  updateReadNum,
  commitAppraise,
  updateContent
} = require('../controller/blog')

router.post('/commitContent', async(ctx, next) => {
  const {
    userId,
    userName,
    phone,
    title,
    content
  } = ctx.request.body
  ctx.body = await commitContent({
    userId,
    userName,
    phone,
    title,
    content
  })
})

router.get('/getBlogList', async(ctx, next) => {
  const {userId, page, pageSize} = ctx.request.query
  ctx.body = await getBlogList({userId, page, pageSize})
})

router.get('/getBlogContent', async(ctx, next) => {
  const { blogId } = ctx.request.query
  ctx.body = await getBlogContent({ blogId })
})

router.post('/updateReadNum', async(ctx, next) => {
  const { readNum, blogId } = ctx.request.body
  ctx.body = await updateReadNum({ readNum, blogId })
})

router.post('/commitAppraise', async(ctx, next) => {
  const {
    avatar,
    userName,
    userId,
    blogId,
    appraiseContent
  } = ctx.request.body
  ctx.body = await commitAppraise({
    avatar,
    userName,
    userId,
    blogId,
    appraiseContent
  })
})

router.post('/updateContent', async(ctx, next) => {
  const {
    blogId,
    title,
    content
  } = ctx.request.body
  ctx.body = await updateContent({
    blogId,
    title,
    content
  })
})

module.exports = router