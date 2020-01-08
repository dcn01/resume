/**
 * @description sequelize 创建实例
 * @author 陈佳兵
 */

const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db.js')
const conf = {
  host: MYSQL_CONF.host,
  port: 3306,
  dialect: MYSQL_CONF.dialect
}

const seq = new Sequelize(
  MYSQL_CONF.database, 
  MYSQL_CONF.user, 
  MYSQL_CONF.password, conf
)

module.exports = seq