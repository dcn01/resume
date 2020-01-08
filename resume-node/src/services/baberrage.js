/**
 * @description baberrage 数据库操作
 * @author 陈佳兵
 */

const { Baberrage } = require('../db/model/index')

async function createBaberrage({
  type,
  position,
  sliderValue,
  bgColor,
  textarea,
  userName,
  userId,
  avatar
}) {
  const baberrageRes = await Baberrage.create({
    type,
    position,
    time: sliderValue,
    barrageStyle: bgColor,
    msg: textarea,
    userName,
    userId,
    avatar
  })
  return baberrageRes.dataValues
}

async function findAllBaberrage(userId) {
  let whereOpt = null
  if(userId) {
    whereOpt.userId = userId
  }
  const baberrageList = await Baberrage.findAll({
    where: whereOpt,
    attributes: ['id', 'avatar', 'type', 'position', 'time', 'barrageStyle', 'msg'],
    order: [
      ['id', 'desc']
    ]
  })
  const result = baberrageList.map(baberrage => baberrage.dataValues)
  if(result) {
    return result
  }
  return null
}

async function findOneBaberrage() {
  const oneBaberrage = await Baberrage.findOne({
    attributes: ['id', 'avatar', 'type', 'position', 'time', 'barrageStyle', 'msg'],
    order: [
      ['id', 'desc']
    ]
  })
  if(oneBaberrage) {
    return oneBaberrage.dataValues
  }
  return null
}

module.exports = {
  createBaberrage,
  findAllBaberrage,
  findOneBaberrage
}