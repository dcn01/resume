const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const { REDIS_CONF } = require('./conf/db')
const { SESSION_SERRET_KEY } = require('./conf/constant')

const index = require('./routes/index')
const userRouter = require('./routes/user')
const utilRouter = require('./routes/utils')
const photoRouter = require('./routes/photo')
const baberrageRouter = require('./routes/baberrage')
const contactRouter = require('./routes/contact')
const blogRouter = require('./routes/blog')

// error handler
onerror(app)

// session 配置
app.keys = [SESSION_SERRET_KEY]
app.use(session({
  key: 'resume.sid', //cookie name 默认 'koa.sid'
  prefix: 'resume:sess:', //Redis key 的前缀 默认 'koa:sess:'
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // ms
  },
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// routes
app.use(index.routes(), index.allowedMethods())
app.use(userRouter.routes(), userRouter.allowedMethods())
app.use(utilRouter.routes(), utilRouter.allowedMethods())
app.use(photoRouter.routes(), photoRouter.allowedMethods())
app.use(baberrageRouter.routes(), baberrageRouter.allowedMethods())
app.use(contactRouter.routes(), contactRouter.allowedMethods())
app.use(blogRouter.routes(), blogRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
