// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import Spinner from 'vue-simple-spinner'
import Notify from 'vue2-notify'
import VeeValidate from 'vee-validate'

// Use Notify
Vue.use(Notify)
Vue.use(VeeValidate)

Vue.config.productionTip = false
let host = 'http://localhost:3000'
if (location.hostname !== 'localhost') {
  host = 'http://ekom-api.geekosta.com'
}
Vue.prototype.$http = axios.create({ baseURL: host })

Vue.component('spinner', Spinner)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
