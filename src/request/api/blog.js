/**
 * @description blog ARI
 * @author 陈佳兵
 */

import { get, post } from '../http'

async function commitContent(url, {
  userId,
  userName,
  phone,
  title,
  content
}) {
  return post(url, {
    userId,
    userName,
    phone,
    title,
    content
  })
}

async function getBlogList(url, {
  userId,
  page,
  pageSize
}) {
  return get(url, {
    userId,
    page,
    pageSize
  })
}

async function getBlogContent(url, {blogId}) {
  return await get(url, { blogId })
}

async function updateReadNum(url, { readNum, blogId }) {
  return post(url, { readNum, blogId })
}

async function commitAppraise(url, {
  avatar,
  userName,
  userId,
  blogId,
  appraiseContent
}) {
  return post(url, {
    avatar,
    userName,
    userId,
    blogId,
    appraiseContent
  })
}

async function updateContent(url, {
  blogId,
  title,
  content
}) {
  return post(url, {
    blogId,
    title,
    content
  })
}

export {
  commitContent,
  getBlogList,
  getBlogContent,
  updateReadNum,
  commitAppraise,
  updateContent
}