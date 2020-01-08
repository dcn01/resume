/**
 * @description 数据库配置文件
 * @author 陈佳兵
 */

const { isPro, isDev } = require('./env')
let MYSQL_CONF
let REDIS_CONF

MYSQL_CONF = {
  host: 'localhost',
  dialect: 'mysql',
  database: 'resume',
  user: 'root',
  password: 'c101498'
}
REDIS_CONF = {
  host: '127.0.0.1',
  port: 6379
}

if(isPro) {
  MYSQL_CONF = {
    host: '127.0.0.1',
    dialect: 'mysql',
    database: 'resume',
    user: 'root',
    password: 'c101498'
  }
  REDIS_CONF = {
    host: '127.0.0.1',
    port: 6379
  }
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF
}


