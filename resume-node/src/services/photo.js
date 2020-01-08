/**
 * @description 照片数据操作
 * @author 陈佳兵
 */

const { Photo, Com } = require('../db/model/index')

async function findAllPhotos({ page, pageSize}) {
  const photoList = await Photo.findAndCountAll({
    limit: parseInt(pageSize),
    offset: (parseInt(page) - 1) * parseInt(pageSize),
    attributes: ['id', 'photoName'],
    include: [
      {
        model: Com,
        attributes: ['commentContent', 'createdAt', 'rateValue', 'userName']
      }
    ],
    distinct: true
  })
  return {
    count: photoList.count,
    photoList: photoList.rows.map(photo => {
      const photoVal = photo.dataValues
      photoVal.coms = photo.dataValues.coms.map(com => com.dataValues)
      return photoVal
    })
  }
  
}

async function createComment({
  commentContent,
  photoId,
  userId,
  userName,
  rateValue
}) {
  const commentRes = await Com.create({
    commentContent,
    photoId,
    userId,
    userName,
    rateValue
  })
  return commentRes.dataValues
}

async function createPhoto({ filename }) {
  const photoRes = await Photo.create({
    photoName: filename
  })
  return photoRes.dataValues
}

module.exports = {
  findAllPhotos,
  createComment,
  createPhoto
}