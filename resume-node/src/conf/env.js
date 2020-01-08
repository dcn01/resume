/**
 * @description 环境变量配置
 * @author 陈佳兵
 */

const ENV = process.env.NODE_ENV

module.exports = {
  isDev: ENV === 'dev',
  notDev: ENV !== 'dev',
  isPro: ENV === 'production',
  notPro: ENV !== 'production'
}