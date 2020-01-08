/**
 * @description login API
 * @author 陈佳兵
 */

import { post } from '../http'

export default async function login(url, { phone, password }) {
  return await post(url, { phone, password })
} 

export async function logout(url) {
  return await post(url)
}