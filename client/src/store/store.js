import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    role: localStorage.getItem('role'),
    users: [],
    products: [],
    categories: []
  },
  getters: {
    role(state) {
      return state.role
    },
    users(state) {
      return state.users
    },
    products(state) {
      return state.products
    },
    categories(state) {
      return state.categories
    }
  },
  mutations: {
    setRole (state, payload) {
      state.role = payload
    },
    getUsers (state, payload) {
      state.users = payload
    },

    // Category
    addCategory (state, payload) {
      state.categories.push(payload)
    },
    getCategory (state, payload) {
      state.categories = payload
    },
    updateCategory(state, payload) {
      let index = state.categories.findIndex( category => { category._id == payload._id })
      state.categories[index] = payload
    },
    deleteCategory(state, payload) {
      let index = state.categories.findIndex( category => { category._id == payload._id })
      state.categories.splice(index, 1)
    },
    // End of Category

    // Product
    addProduct(state, payload) {
      state.products.push(payload)
    },
    getProduct(state, payload) {
      state.products = payload
    },
    updateProduct(state, payload) {
      let index = state.products.findIndex( product => { product._id == payload._id })
      state.products[index] = payload
    },
    deleteProduct(state, payload) {
      let index = state.products.findIndex( product => { product._id == payload._id })
      state.products.splice(index, 1)
    }
    // End of Product

  },
  actions: {
    setRole ({ commit }, payload) {
      commit('setRole', payload)
    },
    getUsers ({ commit }) {
      axios.get('http://localhost:3000/api/user')
        .then(({ data }) => {
          console.log("users data : ",data);
          commit('getUsers', data)
        })
        .catch(err => {
          console.error(err);
        })
    },

    // Category
    addCategory ({ commit }, payload) {
      let newCategory = {
        name: payload.name
      }
      axios.post('http://localhost:3000/api/category', newCategory, {
        headers: {
          tokenjwt: localStorage.getItem('tokenjwt')
        }
      })
      .then(data => {
        commit('addCategory', data)
        // window.location.href = "/"
        route.push('/')
      })
      .catch(err => {
        console.log(err)
      })
    },
    getCategory ({ commit }) {
      axios.get('http://localhost:3000/api/category')
        .then(({ data }) => {
          commit('getCategory', data)
        })
        .catch(err => {
          console.error(err);
        })
    },
    updateCategory ({ commit }, payload) {
      let updatedCategory = {
        name: payload.name
      }
      console.log("payload : ",payload);
      console.log("updatedCategory : ",updatedCategory);
      console.log("payload._id : ",payload._id);
      axios.put(`http://localhost:3000/api/category/${payload._id}`,updatedCategory,{
          headers:{
            tokenjwt:localStorage.getItem('tokenjwt')
          }
        })
          .then(({data})=>{
            console.log(data);
            commit('updateCategory', data)
            // window.location.href = "/"
            route.push('/')
          })
          .catch(err=>{
            console.error(err);
          })
    },
    deleteCategory({ commit }, payload) {
      axios.delete(`http://localhost:3000/api/category/${payload._id}`, {
          headers: {
            tokenjwt: localStorage.getItem('tokenjwt')
          }
        })
        .then(({ data }) => {
          commit('deleteCategory', data)
          // window.location.href = "/"
          route.push('/')
        })
        .catch(err => {
          console.error(err);
        })
    },
    // End of Categories

    addProduct ({commit}, payload) {
      let newProduct = {
        name: payload.name,
        price: payload.price,
        stock: payload.stock,
        category: payload.category,
        imageURL: payload.imageURL
      }
      console.log(newProduct);
      
      axios.post('http://localhost:3000/api/product',newProduct,{
        headers: {
          tokenjwt: localStorage.getItem('tokenjwt')
        }
      })
        .then(data => {
          console.log(data);
          commit('addProduct', data)
          // window.location.href = "/"
          route.push('/')
        })
        .catch(err => {
          console.log(err);
        })
    },
    getProduct ({ commit }) {
      axios.get('http://localhost:3000/api/product')
        .then(({ data }) => {
          commit('getProduct', data)
        })
        .catch(err => {
          console.error(err);
        })
    },
    updateProduct ({ commit }, payload) {
      let updatedProduct = {
        name: payload.name,
        price: payload.price,
        stock: payload.stock,
        category: payload.category,
        imageURL: payload.imageURL
      }
      console.log("payload : ",payload);
      console.log("updatedProduct : ",updatedProduct);
      console.log("payload._id : ",payload._id);
      axios.put(`http://localhost:3000/api/product/${payload._id}`,updatedProduct,{
          headers:{
            tokenjwt:localStorage.getItem('tokenjwt')
          }
        })
          .then(({data})=>{
            console.log(data);
            commit('updateProduct', data)
            // window.location.href = "/"
            route.push('/')
          })
          .catch(err=>{
            console.error(err);
          })
    },
    deleteProduct({ commit }, payload) {
      axios.delete(`http://localhost:3000/api/product/${payload._id}`, {
          headers: {
            tokenjwt: localStorage.getItem('tokenjwt')
          }
        })
        .then(({ data }) => {
          commit('deleteProduct', data)
          // window.location.href = "/"
          route.push('/')
        })
        .catch(err => {
          console.error(err);
        })
    }
  }
})
