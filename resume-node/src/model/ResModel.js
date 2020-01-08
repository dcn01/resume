/**
 * @description res 数据模型
 */

/**
 *  基础模块
 */
class BasModel {
  constructor({errno, data, message}) {
    this.errno = errno
    if(data) {
      this.data = data
    }
    if(message) {
      this.message = message
    }
  }
}


/**
 * 成功的模型
 */
class SuccessModel extends BasModel {
  constructor (data) {
    super({
      errno: 0,
      data
    })
  }
}

/**
 * 失败的模型
 */
class ErrorModel extends BasModel {
  constructor({errno, message }) {
    super({
      errno,
      message
    })
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
}