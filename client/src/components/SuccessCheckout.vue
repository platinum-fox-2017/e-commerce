<template id="">
  <div class="row">
    <div class="col-md-8">
      <div class="jumbotron">
        <h2>Pesanan Sudah Terkonfirmasi</h2>
        <h5>Cara Pembayaran</h5>
        <ol>
          <li>Pilih Bank Yang Di Tuju</li>
          <li>Masukkan Sejumlah {{ lastTotal }}</li>
          <li>Masukkan Password</li>
          <li>Kirim</li>
          <li>Pesanan Berhasil</li>
        </ol>
        <router-link to="/" class="btn btn-danger">Belanja Kembali</router-link>
      </div>
    </div>
    <div class="col-md-4">
       <ul class="list-group">
        <li class="list-group-item">Rincian Pesanan</li>
        <li class="list-group-item">
        <table class="table">
          <thead>
            <th>Produk</th>
            <th>Kuantitas</th>
            <th>Harga</th>
          </thead>
          <tbody>
            <tr v-for="product in lastCart" :key="product._id">
              <td>{{ product.name }}</td>
              <td>{{ product.quantity }}</td>
              <td>RP {{product.price}}</td>
            </tr>
          </tbody>
        </table>
        </li>
        <li class="list-group-item">
          <p>Total : RP. {{lastTotal}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script charset="utf-8">
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'SuccessCheckout',
  data () {
    return {
      lastCart: [],
      lastTotal: 0
    }
  },
  computed: mapState(['carts', 'total']),
  created () {
    this.setLastData()
    this.removeAllCart()
  },
  methods: {
    ...mapMutations(['removeAllCart']),
    setLastData () {
      const app = this
      this.carts.forEach(cart => {
        app.lastCart.push(cart)
      })
      app.lastTotal = this.total
    }
  }
}
</script>
