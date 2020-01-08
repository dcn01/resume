/**
 * @description 弹幕API
 * @author 陈佳兵
 */

import { get, post } from '../http'

async function createMessage(
  url,
  {
    type,
    position,
    sliderValue,
    bgColor,
    textarea,
    userName,
    userId,
    avatar
  }
) {
  return await post(
    url, 
    {
      type,
      position,
      sliderValue,
      bgColor,
      textarea,
      userName,
      userId,
      avatar
    }
  )
}

async function getOneBaberrage(url) {
  return get(url)
}

async function getBaberrageList(url, { userId }) {
  return get(url, { userId })
}

export {
  createMessage,
  getBaberrageList,
  getOneBaberrage
}