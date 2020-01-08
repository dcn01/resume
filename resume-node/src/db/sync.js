/**
 * @description sequelize 同步数据库
 * @author 陈佳兵
 */

const seq = require('./seq')
require('./model/index')

//测试连接
seq.authenticate().then(() => {
  console.log('sequelize is success')
}).catch((err) => {
  console.log('sequelize is error',err)
})

seq.sync({force: true}).then(() => {
  console.log('sync datebase is success')
  process.exit()
})
