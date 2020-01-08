/**
 * @description user controller
 * @author 陈佳兵
 */

const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createUser, findOneUser } = require('../services/user')
const { 
  createUserError, 
  phoneIsExist,
  loginError,
  logoutError
} = require('../model/ErrorInfo')
const doCrypto = require('../utils/cryp')

async function register({username, password, phone, filename}) {
  const result = await createUser({
    username, 
    password: doCrypto(password), 
    phone, 
    filename
  })
  if(!result) {
    return new ErrorModel(createUserError)
  }
  return new SuccessModel()
}

async function isExist({phone}) {
  const result = await findOneUser({phone})
  if(!result) {
    return new SuccessModel()
  }
  return new ErrorModel(phoneIsExist)
}

async function login(ctx, { phone, password }) {
  const result = await findOneUser({ 
    phone, 
    password: doCrypto(password)
  })
  if(ctx.session.userInfo == null) {
    ctx.session.userInfo = result
  }
  if(result) {
    return new SuccessModel(result)
  }
  return new ErrorModel(loginError)
}

async function logout(ctx) {
  const result = await delete ctx.session.userInfo
  if(result) {
    return new SuccessModel()
  }
  return new ErrorModel(logoutError)
} 

module.exports = {
  register,
  isExist,
  login,
  logout
}