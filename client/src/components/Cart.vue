<template >
  <div class="row">
    <div class="col-md-8">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/">Home</router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">Cart</li>
        </ol>
      </nav>
       <h4>Troli Belanja Saya</h4>
        <h5 class="text-center card" v-if="!carts.length">Troli Belanja Kosong</h5>
       <ul class="list-group">
        <li class="list-group-item" v-for="product in carts" :key="product._id">
          <div class="row">
            <div class="col-md-2">
                <img class="img-fluid" :src="product.image" alt="" />
              </div>
              <div class="col-md-4">
                <div class="parent">
                  <div class="child">
                    <h5 class="cart-text">{{ product.name }}</h5>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="parent">
                  <div class="child">
                    <h5 class="cart-text">RP {{ product.price }}</h5>
                  </div>
                </div>
              </div>
              <div class="col-md-2">
                <div class="parent">
                  <div class="child">
                    <h5 class="float-left">
                      <input type="text" v-model="product.quantity" class="form-control" />
                    </h5>
                  </div>
                </div>
              </div>
              <div class="col-md-1">
                <div class="parent">
                  <div class="child">
                    <button class="btn btn-danger float-left" @click="deleteCart(product)"> <i class="fas fa-trash"></i></button>
                  </div>
                </div>
              </div>
          </div>
          <!-- end row product -->
        </li> </ul>
    </div>
    <div class="col-md-4">
       <ul class="list-group">
        <li class="list-group-item">Rincian Pesanan</li>
        <li class="list-group-item">
          <p>Total : RP. {{ total }}</p>
        </li>
        <li class="list-group-item">
          <router-link to="/checkout" class="btn btn-primary">Lanjut ke Pembayaran</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script charset="utf-8">
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'Cart',
  computed: mapState(['carts', 'total']),
  watch: {
    carts: {
      handler () {
        this.sumCart()
      },
      deep: true
    }
  },
  methods: {
    ...mapMutations(['deleteCart', 'sumCart'])
  }
}
</script>
<style >
.child {
  width: 100%;
  height: 100%;
  display: table-cell;
  vertical-align: middle;
}
.parent {
  width: 100%;
  height: 100%;
  display: table;
}
</style>
