<template >
  <div class="row">
    <div class="col-md-8">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/">Home</router-link>
          </li>
          <li class="breadcrumb-item">
            <router-link to="/cart">Cart</router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">Checkout</li>
        </ol>
      </nav>
     <form action="/success-checkout.html">
      <div class="form-group">
        <label for="alamat">Nama Penerima:</label>
        <input type="text" v-validate="'required'" class="form-control" name="name" id="" value="" placeholder="Tuliskan Nama Penerima" />
        <span v-show="errors.has('name')" style="color:red">{{ errors.first('name') }}</span>
      </div>
      <div class="form-group">
        <label for="alamat">Alamat Pengiriman:</label>
        <textarea name="alamat" v-validate="'required'" rows="3" cols="40" class="form-control"></textarea>
        <span v-show="errors.has('alamat')" style="color:red">{{ errors.first('alamat') }}</span>
      </div>
      <div class="form-group">
        <label for="rekening">Pilih Rekening Transfer:</label>
        <select name="rekening" id="rekening"  class="form-control">
          <option value="">-- Rekeing Transfer --</option>
          <option>BNI</option>
          <option>BCA</option>
          <option>BRI</option>
        </select>
        <span v-show="errors.has('rekening')" style="color:red">{{ errors.first('rekening') }}</span>
      </div>
      <button type="button" @click="submitCheckout" class="btn btn-primary">Konfirmasi Pesanan</button>
    </form>
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
            <tr v-for="product in carts" :key="product._id">
              <td>{{ product.name }}</td>
              <td> {{ product.quantity }}</td>
              <td>RP {{ product.price }}</td>
            </tr>
          </tbody>
        </table>
        </li>
        <li class="list-group-item">
          <p>Total : RP. {{ total }}</p>
        </li>
      </ul>
    </div>
  </div>

</template>
<script charset="utf-8">
import {mapState} from 'vuex'
export default {
  name: 'Checkout',
  computed: mapState(['carts', 'total']),
  methods: {
    submitCheckout () {
      this.validateBeforeSubmit()
    },
    validateBeforeSubmit () {
      const app = this
      this.$validator.validateAll().then((result) => {
        if (result) {
          return app.$router.push('/checkout/success')
        }
      })
    }
  }
}
</script>
