/**
 * @description Appraise 数据模型
 * @author 陈佳兵
 */

const seq = require('../seq')
const { STRING, TEXT, INTEGER } = require('../type')

const Appraise = seq.define('appraise', {
  userName: {
    type: STRING,
    allowNull: false,
    comment: '用户名称'
  },
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户id'
  },
  avatar: {
    type: STRING,
    allowNull: false,
    comment: '用户头像'
  },
  blogId: {
    type: INTEGER,
    allowNull: false,
    comment: '微博id'
  },
  appraiseContent: {
    type: TEXT,
    allowNull: false,
    comment: '评论内容'
  }
})

module.exports = Appraise