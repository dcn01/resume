/**
 * @description contact API
 * @author 陈佳兵
 */

const { post } = require('../http')

export default async function commitMessage(url, {
  userId,
  username,
  email,
  phone,
  QQ,
  wechat,
  message
}) {
  return post(url,{
    userId,
    username,
    email,
    phone,
    QQ,
    wechat,
    message
  })
}