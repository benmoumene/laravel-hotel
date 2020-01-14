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

import GuestRouter from '../components/guests/GuestRouter.vue'
import GuestList from '../components/guests/GuestList.vue'
import GuestAdd from '../components/guests/GuestAdd.vue'
import GuestEdit from '../components/guests/GuestEdit.vue'

import RoomRouter from '../components/rooms/RoomRouter.vue'
import RoomAdd from '../components/rooms/RoomAdd.vue'
import RoomEdit from '../components/rooms/RoomEdit.vue'
import RoomList from '../components/rooms/RoomList.vue'
import RoomAvailability from '../components/rooms/RoomAvailability.vue'

import Reservations from '../components/reservations/Reservations.vue'
import ReservationRouter from '../components/reservations/ReservationRouter.vue'

import ServiceAdd from '../components/services/ServiceAdd.vue'
import ServiceList from '../components/services/ServiceList.vue'
import ServiceRouter from '../components/services/ServiceRouter.vue'

import InventoryItemAdd from '../components/inventory/InventoryItemAdd.vue'
import InventoryItemList from '../components/inventory/InventoryItemList.vue'
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
      path: 'add',
      name: 'CustomerAdd',
      meta: {
        title: 'Customer Add'
      },
      component: CustomerAdd
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
      path: '/guest', component: GuestRouter,
      children: [
        {
          path: 'list',
          name: 'GuestList',
          component: GuestList
        },
        {
          path: 'add',
          name: 'GuestAdd',
          component: GuestAdd
        },
        {
          path: ':id/edit',
          name: 'GuestEdit',
          component: GuestEdit
        },
      ]
    },
    {
      path: '/room', component: RoomRouter,
      children: [
        {
          path: '',
          name: 'Room',
          component: RoomList
        },
        {
          path: 'availability',
          name: 'RoomAvailability',
          component: RoomAvailability
        },
        {
          path: 'list',
          name: 'RoomList',
          component: RoomList
        },
        {
          path: 'add',
          name: 'RoomAdd',
          component: RoomAdd
        },
        {
          path: ':id/edit',
          name: 'RoomEdit',
          component: RoomEdit
        },
      ]
    },
    {
      path: '/reservations', component: ReservationRouter,
      children: [
        {
          path: '',
          name: 'Reservations',
          component: Reservations
        },
      ]
    },
    {
      path: '/billing', component: BillingRouter,
      children: [
        {
          path: 'edit',
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
          path: 'add',
          name: 'ServiceAdd',
          component: ServiceAdd
        },
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
          path: 'add',
          name: 'InventoryItemAdd',
          component: InventoryItemAdd
        },
        {
          path: 'list',
          name: 'InventoryItemList',
          component: InventoryItemList
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