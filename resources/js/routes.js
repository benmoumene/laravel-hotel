import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Billing from './components/Billing.vue'
import Services from './components/Services.vue'

export default new VueRouter({
  routes: [
    {
      path: '/billing',
      name: 'billing',
      component: Billing
    },
    {
      path: '/services',
      name: 'Services',
      component: Services
    }
  ]
})