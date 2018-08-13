<template >
  <div>
  <h2>{{ product.name }}</h2>
  <hr>
  <div class="row">
    <div class="col-md-4">
      <img class="img-fluid" :src="product.image" alt="" />
    </div>
    <div class="col-md-4">
      <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pulvinar neque laoreet suspendisse interdum. Pulvinar proin gravida hendrerit lectus a. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis. Vitae turpis massa sed elementum.
      </p>
      <a href="/cart.html" class="btn btn-danger">Buy Now</a>
    </div>
    <div class="col-md-4">
       <ul class="list-group">
          <li class="list-group-item">
          <p>Pilihan Pengiriman</p>
          <p>Dikirm Ke <br><b>Jakarta </b></p>
          </li>
          <li class="list-group-item">
          <p>Bayar Di Tempat Berlaku<br> 7 Hari Pengembalian <br>Tidak Ada Garansi </p>
          </li>
          <li class="list-group-item">
            <p>Dijual oleh: <b>Ekom Shop</b></p>
          </li>
          <li class="list-group-item">
            <p>Total : RP. {{ product.price }}</p>
          </li>
       </ul>
    </div>
 </div>
 </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'DetailProduct',
  data () {
    return {
      product: null
    }
  },
  computed: mapState(['products']),
  created () {
    this.getProduct()
  },
  methods: {
    getProduct () {
      const id = this.$route.params.id
      const app = this
      this.products.forEach(product => {
        if (product._id === id) {
          app.product = product
        }
      })
    }
  }
}

</script>
