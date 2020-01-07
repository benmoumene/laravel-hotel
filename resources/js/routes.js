import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Dashboard from './components/template/Dashboard.vue'
import Billing from './components/Billing.vue'
import Profile from './components/Profile.vue'
import About from './components/About.vue'
import Inventory from './components/Inventory.vue'
import Payments from './components/Payments.vue'
import Settings from './components/Settings.vue'

import Customer from './components/customers/Customer.vue'
import CustomerAdd from './components/customers/CustomerAdd.vue'
import CustomerEdit from './components/customers/CustomerEdit.vue'
import CustomerList from './components/customers/CustomerList.vue'

import Guest from './components/guests/Guest.vue'
import GuestList from './components/guests/GuestList.vue'
import GuestAdd from './components/guests/GuestAdd.vue'
import GuestEdit from './components/guests/GuestEdit.vue'

import Room from './components/rooms/Room.vue'
import RoomAdd from './components/rooms/RoomAdd.vue'
import RoomEdit from './components/rooms/RoomEdit.vue'
import RoomList from './components/rooms/RoomList.vue'
import RoomAvailability from './components/rooms/RoomAvailability.vue'

import Reservations from './components/reservations/Reservations.vue'
import ReservationsRouter from './components/reservations/ReservationsRouter.vue'

import Services from './components/services/Services.vue'
import ServiceAdd from './components/services/ServiceAdd.vue'
import ServiceList from './components/services/ServiceList.vue'
import ServicesRouter from './components/services/ServiceRouter.vue'

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/customers', component: Customer,
      children: [
        {
          path: '',
          name: 'Customer',
          component: CustomerList
        },
        {
          path: 'list',
          name: 'CustomerList',
          component: CustomerList
        },
        {
          path: 'add',
          name: 'CustomerAdd',
          component: CustomerAdd
        },
        {
          path: ':id/edit',
          name: 'CustomerEdit',
          component: CustomerEdit
        },
      ]
    },
    {
      path: '/guest', component: Guest,
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
      path: '/rooms', component: Room,
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
      path: '/reservations', component: ReservationsRouter,
      children: [
        {
          path: '',
          name: 'Reservations',
          component: Reservations
        },
      ]
    },
    {
      path: '/billing',
      name: 'Billing',
      component: Billing
    },
    {
      path: '/services', component: ServicesRouter,
      children: [
        {
          path: '',
          name: 'Services',
          component: Services
        },
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