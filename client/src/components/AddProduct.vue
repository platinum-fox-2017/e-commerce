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
          <div class="form-group">
            <label for="" class="control-label col-xs-2">Category</label>
            <div class="col-xs-8">
              <select class="form-control" id="sel1" v-model="product.category">
                <option>Coupe</option>
                <option>Sedan</option>
                <option>SUV</option>
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
              <button type="submit" class="btn btn-primary" @click.prevent="addProduct">Add Product</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        product: {
          name: '',
          price: '',
          stock: '',
          category: '',
          imageURL: ''
        }
      }
    },
    methods: {
      addProduct() {
        let newProduct = {
          name: this.product.name,
          price: this.product.price,
          stock: this.product.stock,
          category: this.product.category,
          imageURL: this.product.imageURL
        }
        console.log(newProduct);
        
        axios.post('http://localhost:3000/api/product',newProduct,{
          headers: {
            tokenjwt: localStorage.getItem('tokenjwt')
          }
        })
          .then(response => {
            console.log(response);
          })
          .catch(err => {
            console.log(err);
          })
      }
    }
  }

</script>

<style scoped>


</style>
