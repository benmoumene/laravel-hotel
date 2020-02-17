import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Dashboard from '../components/Dashboard.vue'
import Profile from '../components/Profile.vue'
import About from '../components/About.vue'
import Settings from '../components/Settings.vue'

import InvoiceRouter from '../components/invoices/InvoiceRouter.vue'
import InvoiceEdit from '../components/invoices/InvoiceEdit.vue'
import Invoices from '../components/invoices/Invoices.vue'

import CustomerRouter from '../components/customers/CustomerRouter.vue'
import CustomerAdd from '../components/customers/CustomerAdd.vue'
import CustomerEdit from '../components/customers/CustomerEdit.vue'
import Customers from '../components/customers/Customers.vue'

import RoomRouter from '../components/rooms/RoomRouter.vue'
import Rooms from '../components/rooms/Rooms.vue'
import RoomEdit from '../components/rooms/RoomEdit.vue'

import ReservationWizard from '../components/reservations/wizard/ReservationWizard.vue'
import Reservations from '../components/reservations/Reservations.vue'
import ReservationEdit from '../components/reservations/ReservationEdit.vue'
import ReservationRouter from '../components/reservations/ReservationRouter.vue'

import Services from '../components/services/Services.vue'
import ServiceRouter from '../components/services/ServiceRouter.vue'

import InventoryItems from '../components/inventory/InventoryItems.vue'
import InventoryRouter from '../components/inventory/InventoryRouter.vue'

const customerRoutes =
{
  path: '/customers', component: CustomerRouter,
  children: [
    {
      path: '',
      component: Customers
    },
    {
      path: ':id/edit',
      component: CustomerEdit
    },
  ]
}

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: Dashboard
    },
    customerRoutes,
    {
      path: '/rooms', component: RoomRouter,
      children: [
        {
          path: '',
          component: Rooms
        },
        {
          path: ':id/edit',
          component: RoomEdit
        },
      ]
    },
    {
      path: '/reservations', component: ReservationRouter,
      children: [
        {
          path: '',
          component: Reservations
        },
        {
          path: ':reservation_id/show',
          component: ReservationEdit
        },
        {
          path: ':customer_id/new',
          component: ReservationWizard
        }
      ]
    },
    {
      path: '/invoices', component: InvoiceRouter,
      children: [
        {
          path: '',
          component: Invoices
        },
        {
          path: ':id/edit',
          component: InvoiceEdit
        },
      ]
    },
    {
      path: '/services', component: ServiceRouter,
      children: [
        {
          path: '',
          component: Services
        },
      ]
    },
    {
      path: '/inventory', component: InventoryRouter,
      children: [
        {
          path: '',
          component: InventoryItems
        },
      ]
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/settings',
      component: Settings
    },
    {
      path: '/profile',
      component: Profile
    }
  ]
})