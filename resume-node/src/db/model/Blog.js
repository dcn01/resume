/**
 * @description Blog 数据模型
 * @author 陈佳兵
 */

const seq = require('../seq')
const { STRING, TEXT, INTEGER, BIGINT } = require('../type')

const Blog = seq.define("blog", {
  userId: {
    type: INTEGER,
    allowNull: false,
    commnet: '用户id'
  },
  userName: {
    type: STRING,
    allowNull: false,
    commnet: '用户名称'
  },
  phone: {
    type: BIGINT,
    allowNull: false,
    commnet: '用户手机号码'
  },
  title: {
    type: STRING,
    allowNull: false,
    commnet: '博客标题'
  },
  content: {
    type: TEXT,
    allowNull: false,
    commnet: '博客内容'
  },
  readNum: {
    type: BIGINT,
    allowNull: false,
    defaultValue: 0,
    commnet: '阅读数'
  }
})

module.exports = Blog