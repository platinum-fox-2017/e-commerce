<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link to="/" class="navbar-brand">Ekom</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin" class="nav-link">Admin</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/cart" class="nav-link">Cart ({{ carts.length }})</router-link>
        </li>
        <li class="nav-item" v-if="isLogin">
          <a class="nav-link" href="#" @click="logout" >Logout</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: 'hello',
  data () {
    return {
      query: ''
    }
  },
  computed: mapState(['isLogin', 'carts']),
  methods: {
    onSearch () {
      this.$emit('on-search', this.query)
    },
    logout () {
      localStorage.removeItem('token')
      this.checkLogin()
    },
    ...mapActions(['checkLogin'])
  }
}
</script>
