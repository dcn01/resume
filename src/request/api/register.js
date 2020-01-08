/**
 * @description 注册页面 API
 * @author 陈佳兵
 */

import { get, post } from '../http'

async function register(url, { username, password, checkPassword, phone, filename }) {
  return await post(url, { username, password, checkPassword, phone, filename }) 
}
async function isExist(url, { phone }) {
  return await get(url, { phone })
}
export {
  register,
  isExist
}