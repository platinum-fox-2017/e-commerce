import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Notify from 'vue2-notify'

// Use Notify
Vue.use(Notify, { position: 'top-right' })

let host = 'http://localhost:3000'
if (location.hostname !== 'localhost') {
  host = 'http://ekom-api.geekosta.com'
}

const request = axios.create({ baseURL: host })

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    isLogin: false,
    products: [],
    loading: false,
    carts: [],
    total: 0
  },
  mutations: {
    loginState (state, payload) {
      state.isLogin = payload
    },
    productState (state, payload) {
      state.products = payload
    },
    cartState (state, payload) {
      state.carts = payload
    },
    loadingState (state, payload) {
      state.loading = payload
    },
    removeAllCart (state) {
      state.carts = []
    },
    deleteCart: function (state, product) {
      var index = state.carts.findIndex(cart => cart.name === product.name)
      state.carts.splice(index, 1)
      Vue.$notify.success(`Product ${product.name} deleted from cart`)
    },
    sumCart (state) {
      var total = 0
      state.carts.map(cart => {
        cart.subtotal = cart.quantity * cart.price
        return cart
      })
      for (var i = 0; i < state.carts.length; i++) {
        total += Number(state.carts[i].subtotal)
      }
      state.total = total
    },
    addCart (state, product) {
      var check = state.carts.find(cart => cart._id === product._id)
      if (check) {
        state.total = 0
        state.carts.map((cart) => {
          if (cart.name === product.name) {
            cart.quantity = Number(cart.quantity) + 1
            cart.subtotal = cart.quantity * cart.price
            state.total += cart.subtotal
            return cart
          } else {
            state.total += cart.subtotal
            return cart
          }
        })
      } else {
        state.carts.push({
          _id: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
          subtotal: product.price * 1
        })
      }
      Vue.$notify.success(`Product ${product.name} add to cart`)
      store.commit('sumCart')
    }
  },
  actions: {
    checkLogin (context) {
      const token = localStorage.token
      if (token) {
        context.commit('loginState', true)
      } else {
        context.commit('loginState', false)
      }
    },
    getProducts (context) {
      context.commit('loadingState', true)
      request.get('/api/products').then(res => {
        context.commit('productState', res.data.data)
        context.commit('loadingState', false)
      }).catch(err => {
        console.log(err)
      })
    }
  }
})
export default store
