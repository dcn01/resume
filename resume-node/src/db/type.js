/**
 * @description sequelize 数据类型
 * @author 陈佳兵
 */

const Sequelize = require('sequelize')

module.exports = {
  STRING: Sequelize.STRING,
  DECIMAL: Sequelize.DECIMAL,
  TEXT: Sequelize.TEXT('medium'),
  INTEGER: Sequelize.INTEGER,
  BOOLEAN: Sequelize.BOOLEAN,
  BIGINT: Sequelize.BIGINT
}