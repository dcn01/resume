/**
 * @description blog controller
 * @author 陈佳兵
 */

const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { 
  createBlogError, 
  findBlogListError,
  updateBlogReadNumError,
  createAppraiseError,
  updateBlogError
} = require('../model/ErrorInfo')
const { 
  createContent, 
  findAllBlogList,
  findOneBlogWithUser,
  updateBlogReadNumber,
  createAppraise,
  updateBlog
} = require('../services/blog')

async function commitContent({
  userId,
  userName,
  phone,
  title,
  content
}) {
  const result = await createContent({
    userId,
    userName,
    phone,
    title,
    content
  })
  if(result) {
    return new SuccessModel()
  }
  return new ErrorModel(createBlogError)
}

async function getBlogList({userId, page, pageSize}) {
  const result = await findAllBlogList({userId, page, pageSize})
  if(result) {
    return new SuccessModel(result)
  }
  return new ErrorModel(findBlogListError)
} 

async function getBlogContent({ blogId }) {
  const result = await findOneBlogWithUser({ blogId })
  if(result) {
    return new SuccessModel(result)
  }
  return new ErrorModel(findBlogListError)
}

async function updateReadNum({ readNum, blogId }) {
  const result = await updateBlogReadNumber({ readNum, blogId })
  if(result) {
    return new SuccessModel()
  }
  return new ErrorModel(updateBlogReadNumError)
}

async function commitAppraise({
  avatar,
  userName,
  userId,
  blogId,
  appraiseContent
}) {
  const result = await createAppraise({
    avatar,
    userName,
    userId,
    blogId,
    appraiseContent
  })
  if(result) {
    return new SuccessModel()
  }
  return new ErrorModel(createAppraiseError)
}

async function updateContent({
  blogId,
  title,
  content
}) {
  const result = await updateBlog({
    blogId,
    title,
    content
  })
  if(result) {
    return new SuccessModel()
  }
  return new ErrorModel(updateBlogError)
}

module.exports = {
  commitContent,
  getBlogList,
  getBlogContent,
  updateReadNum,
  commitAppraise,
  updateContent
}