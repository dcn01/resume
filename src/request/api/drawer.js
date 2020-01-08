/**
 * @description 关于抽屉照片的API
 * @author 陈佳兵
 */

import { get, post } from '../http'

async function getPhotoList (url, {page, pageSize}) {
  return await get(url, {page, pageSize})
}

async function sendComment (url, {
  commentContent,
  photoId,
  userId,
  userName,
  rateValue
}) {
  return await post(
    url,
    {
      commentContent,
      photoId,
      userId,
      userName,
      rateValue
    }
  )
}

export {
  getPhotoList,
  sendComment
}
