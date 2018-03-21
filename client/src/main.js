// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import { store } from './store/store'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import axios from 'axios'

Vue.use(Vuex)
Vue.prototype.$axios = axios

Vue.component('app-navbar', Navbar)
Vue.component('app-footer', Footer)

Vue.config.productionTip = false

/* eslint-disable no-new */ 
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
