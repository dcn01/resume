/**
 * @description Contact 数据模型
 * @author 陈佳兵
 */

const seq = require('../seq')
const { STRING, TEXT, INTEGER, BIGINT } = require('../type')

const Contact = seq.define('contact', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户Id'
  },
  username: {
    type: STRING,
    allowNull: false,
    comment: '用户名称'
  },
  email: {
    type: STRING,
    allowNull: false,
    comment: '邮箱'
  },
  phone: {
    type: BIGINT,
    allowNull: false,
    comment: '电话号码'
  },
  QQ: {
    type: BIGINT,
    comment: 'qq号码'
  },
  wechat: {
    type: STRING,
    comment: 'wechart号码'
  },
  message: {
    type: TEXT,
    allowNull: false,
    comment: '留言'
  }
})

module.exports = Contact