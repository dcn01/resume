/**
 * @description 用户表模型
 * @author 陈佳兵
 */

const seq = require('../seq')
const { STRING } = require('../type')

const User = seq.define('user', {
  userName: {
    type: STRING,
    alllowNull: false,
    comment: '用户名'
  },
  password: {
    type: STRING,
    alllowNull: false,
    comment: '密码'
  },
  phone: {
    type: STRING,
    alllowNull: false,
    comment: '手机号码'
  },
  avatar: {
    type: STRING,
    alllowNull: false,
    comment: '用户头像'
  }
})

module.exports = User