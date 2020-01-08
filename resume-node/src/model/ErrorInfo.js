/**
 * @description 失败信息
 * @author 陈佳兵
 */

module.exports = {
  createUserError: {
    errno: 10001,
    message: '用户注册失败'
  },
  phoneIsExist: {
    errno: 10002,
    message: '该手机号已经被注册'
  },
  loginError: {
    errno: 10003,
    message: '登陆失败，账号或密码错误'
  },
  logoutError: {
    errno: 10004,
    message: '登陆失败'
  },
  findPhotoListError: {
    errno: 10005,
    message: '查询照片失败'
  },
  createCommentError: {
    errno: 10006,
    message: '评论失败'
  },
  createBaberrageError: {
    errno: 10007,
    message: '弹幕发送失败'
  },
  findBaberrageListError: {
    errno: 10008,
    message: '查询弹幕列表失败'
  },
  findOneBaberrageError: {
    errno: 10009,
    message: '查询弹幕失败'
  },
  createMessageError: {
    errno: 10010,
    message: '创建留言失败'
  },
  createBlogError: {
    errno: 10011,
    message: '创建博客失败'
  },
  findBlogListError: {
    errno: 10012,
    message: '查询博客失败'
  },
  updateBlogReadNumError: {
    errno: 10013,
    message: '更新微博阅读数失败'
  },
  createAppraiseError: {
    errno: 10014,
    message: '微博评论失败'
  },
  updateBlogError: {
    errno: 10015,
    message: '更新微博失败'
  },
  createPhotoError: {
    errno: 10016,
    message: '创建照片失败'
  },
}