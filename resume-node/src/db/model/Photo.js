/**
 * @description 照片数据
 * @author 陈佳兵
 */

const seq = require('../seq')
const { STRING } = require('../type')

const Photo = seq.define('photo',{
  photoName: {
    type: STRING,
    allowNull: false,
    comment: '照片名称'
  }
})

module.exports = Photo