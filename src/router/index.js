import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    redirect: '/about',
    component: () => import('../views/main/Main.vue'),
    children: [
      {
        path: '/about',
        name: 'about',
        component: () => import('../views/about/About.vue')
      },
      {
        path: '/message',
        name: 'message',
        component: () => import('../views/message/Message.vue')
      },
      {
        path: '/log',
        name: 'log',
        component: () => import('../views/log/Log.vue')
      },
      {
        path: '/new',
        name: 'new',
        component: () => import('../views/new/New.vue')
      },
      {
        path: '/contact',
        name: 'contact',
        component: () => import('../views/contact/Contact.vue')
      },
      {
        path: '/content',
        name: 'blogContent',
        component: () => import('../views/content/BlogContent.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/register/Register.vue')
  },
  {
    path: '/pdf',
    name: 'pdf',
    component: () => import('../views/pdf/Pdf.vue')
  },
  {
    path: '*',
    name: 'notfound',
    component: () => import('../views/notfound/NotFound.vue')
  }
]

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes
})

export default router
