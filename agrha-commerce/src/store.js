import Vue from 'vue'
import Vuex from 'vuex'
// link vuex yang mengelola data

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    forSale: [
      { invId: 1, name: 'Gergaji Mesin', image: '//placehold.it/200', price: 1000000, stock: 21 },
      { invId: 2, name: 'Mesin Las Listrik', image: '//placehold.it/200', price: 900000, stock: 21 },
      { invId: 3, name: 'Gerinda', image: '//placehold.it/200', price: 959000, stock: 21 },
      { invId: 4, name: 'Bor Tangan', image: '//placehold.it/200', price: 9784000, stock: 21 }
    ],
    inCart: []
  },
  getters: {
    forSale: function (state) {
      return state.forSale
    },
    inCart: function (state) {
      return state.inCart
    }
  },
  mutations: {
    ADD_TO_CART (state, id) { state.inCart.push(id) },
    REMOVE_FROM_CART (state, index) { state.inCart.splice(index, 1) }
  },
  actions: {
    addToCart (context, id) { context.commit('ADD_TO_CART', id) },
    removeFromCart (context, index) { context.commit('REMOVE_FROM_CART', index) }
  }
})
