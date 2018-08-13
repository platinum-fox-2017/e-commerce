import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Product from '@/components/Product'
import DetailProduct from '@/components/DetailProduct'
import Login from '@/components/Login'
import Cart from '@/components/Cart'
import Checkout from '@/components/Checkout'
import SuccessCheckout from '@/components/SuccessCheckout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/checkout',
      name: 'Checkout',
      component: Checkout
    },
    {
      path: '/checkout/success',
      name: 'SuccessCheckout',
      component: SuccessCheckout
    },
    {
      path: '/product/:id',
      name: 'DetailProduct',
      component: DetailProduct
    },
    {
      path: '/admin/login',
      name: 'Login',
      component: Login,
      beforeEnter: (to, from, next) => {
        const token = localStorage.token
        if (token) {
          next('/admin')
        } else {
          next()
        }
      }
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Product,
      beforeEnter: (to, from, next) => {
        const token = localStorage.token
        if (token) {
          next()
        } else {
          next('/admin/login')
        }
      }
    }
  ]
})
