/**
 * @description message 消息提示
 * @author 陈佳兵
 */

import { Message } from 'element-ui'

export default function message(showClose, message, type, duration = 1000){
  Message({
    showClose,
    message,
    type,
    duration
  })
}