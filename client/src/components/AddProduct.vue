<template>
  <div>
    <div class="container">
      <div class="row">
        <h2 class="text-center">Add Product</h2>
        <form class="form-horizontal">
          <div class="form-group">
            <label for="" class="control-label col-xs-2">Name</label>
            <div class="col-xs-8">
              <input type="text" class="form-control" placeholder="Product Name" v-model="product.name">
            </div>
          </div>
          <div class="form-group">
            <label for="" class="control-label col-xs-2">Price ($)</label>
            <div class="col-xs-8">
              <input type="text" class="form-control" placeholder="Product Price" v-model="product.price">
            </div>
          </div>
          <div class="form-group">
            <label for="" class="control-label col-xs-2">Stock</label>
            <div class="col-xs-8">
              <input type="text" class="form-control" placeholder="Product Stock" v-model="product.stock">
            </div>
          </div>
          <div class="form-group" >
            <label for="" class="control-label col-xs-2">Category</label>
            <div class="col-xs-8" >
              <select class="form-control" id="sel1" v-model="product.category">
                <option v-for="category in categories" :key="category._id">{{ category.name }}</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label for="" class="control-label col-xs-2">ImageURL</label>
            <div class="col-xs-8">
              <input type="text" class="form-control" placeholder="Image URL" v-model="product.imageURL">
            </div>
          </div>

          <div class="form-group">
            <div class="col-xs-offset-2 col-xs-10">
              <button type="submit" class="btn btn-primary" @click.prevent="addProduct(product)">Add Product</button>
            </div>
          </div>
        </form>
        <div class="col-md-offset-3 col-md-6">
          <img :src="product.imageURL" align="middle" height="150px">
        </div>
    
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    computed: {
      product () {
        return this.$store.getters.products
      },
      categories () {
        return this.$store.getters.categories
      }
    },
    methods: {
      addProduct(product) {
        this.$store.dispatch('addProduct', product)
      }
    }
  }

</script>

<style scoped>


</style>
