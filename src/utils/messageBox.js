/**
 * @description confirm弹出框
 * @author 陈佳兵
 */

import { MessageBox } from 'element-ui'

export default function messageBox(
  content, 
  title, 
  distinguishCancelAndClose, 
  confirmButtonText, 
  cancelButtonText) {
  return new Promise((resolve, reject) => {
    MessageBox.confirm(content, title, {
      distinguishCancelAndClose,
      confirmButtonText,
      cancelButtonText
    }).then(() => {
      resolve()
    }).catch(() => {
      reject()
    })
  })
}