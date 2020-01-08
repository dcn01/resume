/**
 * @description 所有数据库表集合
 * @author 陈佳兵
 */

const User = require('./User')
const Photo = require('./Photo')
const Com = require('./Com')
const Baberrage = require('./Baberrage')
const Contact = require('./Contact')
const Blog = require('./Blog')
const Appraise = require('./Appraise')

Photo.hasMany(Com)
Blog.belongsTo(User, {
  foreignKey: 'userId'
})
Blog.hasMany(Appraise, {
  foreignKey: 'blogId'
})
module.exports = {
  User,
  Photo,
  Com,
  Baberrage,
  Contact,
  Blog,
  Appraise
}