/**
 * @description user 数据库操作
 * @author 陈佳兵
 */

const User = require('../db/model/User')

async function createUser({username, password, phone, filename}) {
  const userResult = await User.create({
    userName:username, 
    password, 
    phone, 
    avatar: filename
  })
  return userResult.dataValues 
}

async function findOneUser({ username, password, phone }) {
  if(!phone) {
    return null
  }
  let whereOpt = {}
  if(username) {
    whereOpt.userName = username
  }
  if(password) {
    whereOpt.password = password
  }
  if(phone) {
    whereOpt.phone = phone
  }
  const result = await User.findOne({
    where: whereOpt
  })
  if(!result) {
    return result
  }
  return result.dataValues
}

module.exports = {
  createUser,
  findOneUser
}