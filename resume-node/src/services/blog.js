/**
 * @description blog 数据库操作
 * @author 陈佳兵
 */

const { Blog, User, Appraise } = require('../db/model/index')

async function createContent({
  userId,
  userName,
  phone,
  title,
  content
}) {
  const result = await Blog.create({
    userId,
    userName,
    phone,
    title,
    content
  })
  return result.dataValues
}

async function findAllBlogList({userId, page, pageSize}) {
  let whereOpt = {}
  if(userId) {
    whereOpt.userId = userId
  }
  const blogList = await Blog.findAndCountAll({
    where: whereOpt,
    limit: parseInt(pageSize),
    offset: (parseInt(page) - 1) * parseInt(pageSize),
    attributes: ['id', 'userId', 'userName', 'title', 'readNum', 'createdAt'],
    order: [
      ['createdAt', 'desc'],
      ['readNum', 'desc']
    ]
  })
  if(blogList) {
    return {
      count: blogList.count,
      blogList: blogList.rows.map(blog => blog.dataValues)
    }
  }
  return null
}

async function findOneBlogWithUser({ blogId }) {
  const blog = await Blog.findOne({
    where: {
      id: blogId
    },
    attributes: ['id', 'title', 'content', 'readNum', 'createdAt'],
    include: [
      {
        model: User,
        attributes: ['id', 'avatar', 'userName']
      },
      {
        model: Appraise
      }
    ]
  })
  return blog.dataValues
}

async function updateBlogReadNumber({ readNum, blogId }) {
  const result = await Blog.update({readNum: readNum + 1}, {
    where: {
      id: blogId
    }
  })
  return result[0] > 0
}

async function updateBlog({
  blogId,
  title,
  content
}) {
  const result = await Blog.update({
    title,
    content
  },{
    where: {
      id: blogId
    }
  })
  return result[0] > 0
}

async function createAppraise({
  avatar,
  userName,
  userId,
  blogId,
  appraiseContent
}) {
  const appraiseRes = await Appraise.create({
    avatar,
    userName,
    userId,
    blogId,
    appraiseContent
  })
  if(appraiseRes) {
    return appraiseRes.dataValues
  }
  return null
}

module.exports = {
  createContent,
  findAllBlogList,
  findOneBlogWithUser,
  updateBlogReadNumber,
  createAppraise,
  updateBlog
}