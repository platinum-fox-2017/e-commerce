import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Checkout from '@/components/Checkout'
import AddProduct from '@/components/AddProduct'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/checkout',
      name: 'Checkout',
      component: Checkout
    },
    {
      path: '/add-product',
      name: 'AddProduct',
      component: AddProduct
    }
  ]
})
