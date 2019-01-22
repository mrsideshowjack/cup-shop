import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('./views/Checkout.vue')
    },
    {
      path: '/consent-dashboard',
      name: 'consent-dashboard',
      component: () => import('./views/ConsentDashboard.vue')
    },
    {
      path: '/consentua-test',
      name: 'consentua-test',
      component: () => import('./views/ConsentuaTest.vue')
    },
    {
      path: '/item/:itemId',
      name: 'item',
      component: () => import('./views/Item.vue')
    }
  ]
})
