import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Auth from '@/components/Auth'
import CustomerList from "@/components/CustomerList"
import CustomerCreate from "@/components/CustomerCreate"
import StockList from "@/components/StockList"
import StockCreate from "@/components/StockCreate"
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/customer-list',
      name: 'CustomerList',
      component: CustomerList
    },
    {
      path: '/customer-create',
      name: 'CustomerCreate',
      component: CustomerCreate
    },
    {
      path: '/customer-update/:pk',
      name: 'CustomerCreate',
      component: CustomerCreate
    },
    {
      path: '/stock-list',
      name: 'StockList',
      component: StockList
    },
    {
      path: '/stock-create',
      name: 'StockCreate',
      component: StockCreate
    },
    {
      path: '/stock-update/:pk',
      name: 'StockCreate',
      component: StockCreate
    },
  ]
})
