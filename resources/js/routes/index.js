import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Dashboard from '../components/Dashboard.vue'
import Profile from '../components/Profile.vue'
import About from '../components/About.vue'
import Settings from '../components/Settings.vue'

import BillingRouter from '../components/billing/BillingRouter.vue'
import BillingEdit from '../components/billing/BillingEdit.vue'
import BillingList from '../components/billing/BillingList.vue'

import CustomerRouter from '../components/customers/CustomerRouter.vue'
import CustomerAdd from '../components/customers/CustomerAdd.vue'
import CustomerEdit from '../components/customers/CustomerEdit.vue'
import CustomerList from '../components/customers/CustomerList.vue'

import RoomRouter from '../components/rooms/RoomRouter.vue'
import RoomList from '../components/rooms/RoomList.vue'

import ReservationWizard from '../components/reservations/wizard/ReservationWizard.vue'
import ReservationList from '../components/reservations/ReservationList.vue'
import ReservationEdit from '../components/reservations/ReservationEdit.vue'
import ReservationRouter from '../components/reservations/ReservationRouter.vue'

import ServiceList from '../components/services/ServiceList.vue'
import ServiceRouter from '../components/services/ServiceRouter.vue'

import ItemList from '../components/inventory/ItemList.vue'
import InventoryRouter from '../components/inventory/InventoryRouter.vue'

const customerRoutes =
{
  path: '/customer', component: CustomerRouter,
  children: [
    {
      path: 'list',
      name: 'CustomerList',
      component: CustomerList
    },
    {
      path: ':id/edit',
      name: 'CustomerEdit',
      meta: {
        title: 'Customer Edit'
      },
      component: CustomerEdit
    },
  ]
}

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    customerRoutes,
    {
      path: '/room', component: RoomRouter,
      children: [
        {
          path: 'list',
          name: 'RoomList',
          component: RoomList
        },
      ]
    },
    {
      path: '/reservation', component: ReservationRouter,
      children: [
        {
          path: 'list',
          name: 'ReservationsList',
          component: ReservationList
        },
        {
          path: ':reservation_id/show',
          name: 'ReservationEdit',
          component: ReservationEdit
        },
        {
          path: ':customer_id/new',
          name: 'ReservationWizard',
          component: ReservationWizard
        }
      ]
    },
    {
      path: '/billing', component: BillingRouter,
      children: [
        {
          path: ':id/edit',
          name: 'BillingEdit',
          component: BillingEdit
        },
        {
          path: 'list',
          name: 'BillingList',
          component: BillingList
        },
      ]
    },
    {
      path: '/services', component: ServiceRouter,
      children: [
        {
          path: 'list',
          name: 'ServiceList',
          component: ServiceList
        },
      ]
    },
    {
      path: '/inventory', component: InventoryRouter,
      children: [
        {
          path: 'list',
          name: 'ItemList',
          component: ItemList
        },
      ]
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    }
  ]
})