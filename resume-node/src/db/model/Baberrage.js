/**
 * @description Baberrage 数据模型
 * @author 陈佳兵
 */

const seq = require('../seq')
const { STRING, TEXT, INTEGER } = require('../type')

const Baberrage = seq.define('baberrage', {
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
  type: {
    type: STRING,
    allowNull: false,
    comment: '弹幕类型'
  },
  position: {
    type: STRING,
    comment: '弹幕位置'
  },
  time: {
    type: INTEGER,
    allowNull: false,
    comment: '弹幕速度'
  },
  barrageStyle: {
    type: STRING,
    allowNull: false,
    comment: '弹幕背景颜色'
  },
  msg: {
    type: TEXT,
    allowNull: false,
    comment: '弹幕内容'
  }
})

module.exports = Baberrage