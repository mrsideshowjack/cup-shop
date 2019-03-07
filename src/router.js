import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: function(to, from, savedPosition) {
    // if route has a anchor link, scroll to it
    if (to.hash) {
        return {selector: to.hash}
    } else {
        return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/cups',
      name: 'cups',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/Cups.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
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
      path: '/map',
      name: 'map',
      component: () => import('./views/MapTest.vue')
    },
    {
      path: '/item/:itemId',
      name: 'item',
      component: () => import('./views/Item.vue')
    }
  ]
})
