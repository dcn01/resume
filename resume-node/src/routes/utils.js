/**
 * @description 上传文件
 * @author 陈佳兵
 */

const router = require('koa-router')()
router.prefix('/api/utils')
const upload = require('../utils/upload')
const { savePhoto } = require('../controller/photo')

router.post('/uploadImage', upload.single('file'), async (ctx, next) => {
  const { filename, destination } = ctx.req.file
  ctx.body = {
    filename,
    destination
  }
})
router.post('/uploadPhoto', upload.single('file'), async (ctx, next) => {
  const { filename } = ctx.req.file
  ctx.body = await savePhoto({ filename })
})

module.exports = router