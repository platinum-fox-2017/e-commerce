import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
Vue.use(Vuex)

export const store = new Vuex.Store ({
  state: {
    products: []
  },
  getters: {
    
  },
  mutations: {
    getProduct(state, payload){
      state.products = payload
    }
  },
  actions: {
    getProduct({commit}){
      axios.get('http://localhost:3000/api/product')
      .then(({data})=>{
        commit('getProduct',data)
      })
      .catch(err=>{
        console.error(err);
      })
    }
  }
})