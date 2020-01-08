/**
 * @description contact controller
 * @author 陈佳兵
 */

const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createMessageError } = require('../model/ErrorInfo')
const createMessage = require('../services/contact')

async function commitMessage({
  userId,
  username,
  email,
  phone,
  QQ,
  wechat,
  message
}) {
  const result = await createMessage({
    userId,
    username,
    email,
    phone,
    QQ,
    wechat,
    message
  })
  if(result) {
    return new SuccessModel()
  }
  return new ErrorModel(createMessageError)
}

module.exports = commitMessage