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
        meta: {
          title: 'about'
        },
        component: () => import('../views/about/About.vue')
      },
      {
        path: '/message',
        name: 'message',
        meta: {
          title: 'message'
        },
        component: () => import('../views/message/Message.vue')
      },
      {
        path: '/log',
        name: 'log',
        meta: {
          title: 'blog'
        },
        component: () => import('../views/log/Log.vue')
      },
      {
        path: '/new',
        name: 'new',
        meta: {
          title: 'newBlog'
        },
        component: () => import('../views/new/New.vue')
      },
      {
        path: '/contact',
        name: 'contact',
        meta: {
          title: 'contact'
        },
        component: () => import('../views/contact/Contact.vue')
      },
      {
        path: '/content',
        name: 'blogContent',
        meta: {
          title: 'content'
        },
        component: () => import('../views/content/BlogContent.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'login'
    },
    component: () => import('../views/login/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      title: 'register'
    },
    component: () => import('../views/register/Register.vue')
  },
  {
    path: '/pdf',
    name: 'pdf',
    meta: {
      title: 'pdf'
    },
    component: () => import('../views/pdf/Pdf.vue')
  },
  {
    path: '*',
    name: 'notfound',
    meta: {
      title: '404'
    },
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

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
