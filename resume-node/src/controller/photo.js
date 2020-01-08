/**
 * @description 照片controller
 * @author 陈佳兵
 */

const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { findPhotoListError, createCommentError, createPhotoError } = require('../model/ErrorInfo')
const { findAllPhotos, createComment, createPhoto } = require('../services/photo')

async function getPhotoList({ page, pageSize }) {
  const result = await findAllPhotos({ page, pageSize })
  if(result) {
    return new SuccessModel(result)
  }
  return new ErrorModel(findPhotoListError)
}

async function comment({
  commentContent,
  photoId,
  userId,
  userName,
  rateValue
}) {
  const result = await createComment({
    commentContent,
    photoId,
    userId,
    userName,
    rateValue
  })
  if(result) {
    return new SuccessModel()
  }
  return new ErrorModel(createCommentError)
}

async function savePhoto({ filename }) {
  const result = await createPhoto({ filename })
  if(result) {
    return new SuccessModel()
  }
  return new ErrorModel(createPhotoError)
}

module.exports = {
  getPhotoList,
  comment,
  savePhoto
}