<template>
    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
          <label for="alamat">Name:</label>
          <input type="text" name="name" id="name" v-model="product.name" value="" class="form-control" />
        </div>
        <div class="form-group">
          <label for="price">Price:</label>
          <input type="text" name="price" id="price" v-model="product.price" value="" class="form-control" />
        </div>
        <div class="form-group">
          <label for="image">Image:</label>
          <input type="file" name="image" id="image" value="" class="form-control" />
        </div>
        <button type="button" @click="addProduct" class="btn btn-primary" v-if="!isEdit">Create Product</button>
        <button type="button" @click="updateProduct" class="btn btn-warning" v-if="isEdit">Edit Product</button>
        <button type="button" @click="cancelEdit" class="btn btn-danger" v-if="isEdit">Cancel Edit</button>
      </div>
      <div class="col-md-8">
          <table class="table">
            <thead>
              <th>Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Action</th>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product._id">
                <td>{{product.name}}</td>
                <td>{{product.price}}</td>
                <td>{{product.image}}</td>
                <td>
                  <button class="btn btn-danger btn-sm" @click="deleteProduct(product._id)"  >Delete</button>
                  <button class="btn btn-warning btn-sm" @click="editProduct(product)"  >Edit</button></td>
              </tr>
            </tbody>
          </table>
          <spinner v-if="loading"></spinner>
      </div>
    </div>
</template>
<script >
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  data () {
    return {
      product: {
        name: '',
        price: '',
        image: ''
      },
      isEdit: false
    }
  },
  computed: mapState(['loading', 'products']),
  mounted: function () {
    this.getProducts()
  },
  methods: {
    ...mapMutations(['loadingState']),
    ...mapActions(['getProducts']),
    addProduct: function () {
      const fileInput = document.querySelector('#image')
      const formData = new FormData()
      this.loadingState(true)
      formData.append('image', fileInput.files[0])
      formData.append('name', this.product.name)
      formData.append('price', this.product.price)
      this.$http.post('/api/products', formData, { headers: { token: localStorage.token } }).then(res => {
        this.getProducts()
        this.loadingState(false)
        this.clearForm()
        fileInput.value = ''
      }).catch(err => {
        console.log(err)
      })
    },
    deleteProduct: function (id) {
      this.$http.delete(`/api/products/${id}`, { headers: { token: localStorage.token } }).then(res => {
        this.getProducts()
        this.clearForm()
      }).catch(err => {
        console.log(err)
      })
    },
    updateProduct: function () {
      this.$http.put(`/api/products/${this.product._id}/edit`, this.product, { headers: { token: localStorage.token } }).then(res => {
        this.getProducts()
        this.clearForm()
      }).catch(err => {
        console.log(err)
      })
    },
    editProduct: function (product) {
      this.product = product
      this.isEdit = true
    },
    cancelEdit: function () {
      this.isEdit = false
      this.clearForm()
    },
    clearForm: function () {
      this.product = {
        name: '',
        price: '',
        image: ''
      }
    }
  }
}
</script>
