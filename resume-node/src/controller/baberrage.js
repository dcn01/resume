/**
 * @description baberrage controller
 * @author 陈佳兵
 */

const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { 
  createBaberrageError,
  findBaberrageListError,
  findOneBaberrageError 
} = require('../model/ErrorInfo')
const { 
  createBaberrage, 
  findAllBaberrage,
  findOneBaberrage
} = require('../services/baberrage')

async function sendBaberage({
  type,
  position,
  sliderValue,
  bgColor,
  textarea,
  userName,
  userId,
  avatar
}) {
  const result = await createBaberrage({
    type,
    position,
    sliderValue,
    bgColor,
    textarea,
    userName,
    userId,
    avatar
  })
  if(result) {
    return new SuccessModel()
  }
  return new ErrorModel(createBaberrageError)
}

async function getBaberrageList(userId) {
  const result = await findAllBaberrage(userId)
  if(result) {
    return new SuccessModel(result)
  }
  return new ErrorModel(findBaberrageListError)
} 

async function getOneBaberrage() {
  const result = await findOneBaberrage()
  if(result) {
    return new SuccessModel(result)
  }
  return new ErrorModel(findOneBaberrageError)
}

module.exports = {
  sendBaberage,
  getBaberrageList,
  getOneBaberrage
}