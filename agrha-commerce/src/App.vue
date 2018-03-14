<template>
  <div id="app" class="container my-5">
    <Header :total="inCart.length"/>
    <Cart/>
    <br>
    <div class="row">
      <Item
        v-for="item in forSale"
        :key="item.invId"
        :id="item.invId"
        :name="item.name"
        :image="item.image"
        :price="item.price"
        :stock="item.stock"/>
    </div>
  </div>
</template>

<script>
import Item from '@/components/Item.vue'
import Header from '@/components/Header.vue'
import Cart from './Cart.vue'
export default {
  name: 'app',
  computed: {
    forSale () { return this.$store.getters.forSale }, // menujukkan status dari getter yang dipasang di store
    inCart () { return this.$store.getters.inCart } // menunjukkan status dari inCart di store.js
  },
  components: {
    Item, Header, Cart // components yang dikirim ke index.html
  }
}
</script>

<style>
  /* Nothing for now */
</style>
