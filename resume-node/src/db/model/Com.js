/**
 * @description 照片评论评分模型
 * @author 陈佳兵
 */

const seq = require('../seq')
const { STRING, TEXT, INTEGER } = require('../type')

const Com = seq.define('com', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户id'
  },
  userName: {
    type: STRING,
    allowNull: false,
    comment: '用户姓名'
  },
  commentContent: {
    type: TEXT,
    allowNull: false,
    comment: '评论内容'
  },
  rateValue: {
    type: INTEGER,
    allowNull: false,
    comment: '评分'
  }
})

module.exports = Com