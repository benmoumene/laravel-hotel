import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Dashboard from './components/template/Dashboard.vue'
import Billing from './components/Billing.vue'
import Services from './components/Services.vue'
import Clients from './components/Clients.vue'
import Profile from './components/Profile.vue'
import About from './components/About.vue'
import Inventory from './components/Inventory.vue'
import Payments from './components/Payments.vue'
import Settings from './components/Settings.vue'


export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/clients',
      name: 'Clients',
      component: Clients
    },
    {
      path: '/billing',
      name: 'Billing',
      component: Billing
    },
    {
      path: '/services',
      name: 'Services',
      component: Services
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/inventory',
      name: 'Inventory',
      component: Inventory
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    },
    {
      path: '/payments',
      name: 'Payments',
      component: Payments
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    }
  ]
})