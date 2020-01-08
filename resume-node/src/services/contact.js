/**
 * @description contact 数据库操作
 * @author 陈佳兵
 */

const { Contact } = require('../db/model/index')

async function createMessage({
  userId,
  username,
  email,
  phone,
  QQ,
  wechat,
  message
}){
  const messageRes = await Contact.create({
    userId,
    username,
    email,
    phone,
    QQ,
    wechat,
    message
  })
  if(messageRes) {
    return messageRes.dataValues
  }  
  return null
}

module.exports = createMessage