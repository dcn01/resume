/**
 * @description axios 封装
 * @author 陈佳兵
 */

import axios from 'axios'

function get (url, params = {}) {
  const promise = new Promise((resolve, reject) => {
    axios.get(url, {
      params
    }).then(response => {
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  })
  return promise
}


function post (url, params = {}) {
  const promise = new Promise((resolve, reject) => {
    axios.post(url, params).then((response) => {
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  })
  return promise
}

export {
  get,
  post
}