<template>
  <div class="row">
    <div class="col-md-2">
    </div>
    <div class="col-md-7">
      <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img class="d-block w-100" src="/static/images/slide1.jpg" alt="First slide">
            <div class="carousel-caption d-none d-md-block">
              <h5>Lorem ipsum dolor sit amet </h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor in.</p>
            </div>
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" src="/static/images/slide2.jpg" alt="Second slide">
            <div class="carousel-caption d-none d-md-block">
              <h5>Lorem ipsum dolor sit amet </h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor in.</p>
            </div>
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" src="/static/images/slide3.jpg" alt="Third slide">
            <div class="carousel-caption d-none d-md-block">
              <h5>Lorem ipsum dolor sit amet </h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor in.</p>
            </div>
          </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    <!-- end of carousel -->
    <br>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1"><i class="fa fa-search"></i></span>
        </div>
        <input type="text" class="form-control" v-model="search" placeholder="Search Product Here" aria-label="Search" aria-describedby="basic-addon1">
      </div>
      <spinner v-if="loading"></spinner>
      <div class="row">
        <div class="col-md-4" v-for="product in products" v-if="search == ''" :key="product._id">
          <card-product :product="product" v-on:add-to-cart="addCart(product)"></card-product>
        </div>
        <!-- end card product -->
        <div class="col-md-4" v-for="product in searchData" v-if="search != ''" :key="product._id">
          <card-product :product="product" v-on:add-to-cart="addProductCart(product)"></card-product>
        </div>
        <!-- end card product -->
        <div class="col-md-12"  v-if="search != '' && searchData.length == 0">
          <div class="alert alert-warning">
            <b>"{{ search }}"</b> is not found
          </div>
        </div>
        <!-- end card product -->
      </div>
      <!-- end row  list product-->
    </div>
    <div class="col-md-3">
    </div>
  </div>
</template>

<script>
import CardProduct from './CardProduct'
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  name: 'Home',
  components: {
    CardProduct
  },
  data () {
    return {
      cartProducts: [],
      search: '',
      searchData: []
    }
  },
  watch: {
    cartProducts: {
      handler () {
        var total = 0
        this.cartProducts.map(cart => {
          cart.subtotal = cart.quantity * cart.price
          return cart
        })
        for (var i = 0; i < this.cartProducts.length; i++) {
          total += Number(this.cartProducts[i].subtotal)
        }
        this.total = total
      },
      deep: true
    },
    search: function (newValue) {
      this.searchingProduct()
    }
  },
  mounted () {
    this.getProducts()
  },
  computed: mapState(['products', 'loading', 'carts', 'total']),
  methods: {
    ...mapActions(['getProducts']),
    ...mapMutations(['addCart']),
    searchingProduct: function () {
      this.searchData = []
      for (var i = 0; i < this.products.length; i++) {
        var check = this.products[i].name.toLowerCase().search(this.search)
        if (check >= 0) {
          this.searchData.push(this.products[i])
        }
      }
    }
  }
}
</script>
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
