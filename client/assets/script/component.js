Vue.component('new-item',{
    template:`
        <div class="img-thumbnail">
            <center>
            <img :src="item.image" class="img-responsive img-body" > 
            <div class="caption">
                <p class="item">{{item.name}}</p>
                <p class="item">tersedia : {{item.stock}}</p>
                <p class="price"> Rp {{currencyFormat(item.price)}}</p>
            </div>
            <div class="col-sm-12">
                <button class="btn btn-sm btn-xs btn-info btn-block" @click="addToCart(item)">tambahkan</button>
            </div>
            </center>
        </div>
    `,
    props:['item'],
    methods:{
        currencyFormat: function (price) {
            return price.toLocaleString()
        },
         addToCart: function (objItem) {
            this.$emit('order', objItem);
        },
    }
})

Vue.component('modal',{
    template:`
    <div class="modal fade" id="cartModal" tabindex="-1" role="dialog" aria-labelledby="cartModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="cartModalLabel">Keranjang Belanja</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
          <div v-if="cart.length==0" class="text-center">keranjang belanja anda kosong</div>
                  <table class="table table-responsive" v-else >
                    <thead>
                      <th></th>
                      <th>Produk</th>
                      <th>Qty</th>
                      <th>Harga Satuan</th>
                      <th>Subtotal</th>
                      <th></th>                
                    </thead>
                    <tbody>
                      <tr v-for="data in cart">
                        <td><img class="media-object" :src="data.image" style="width: 50px; height: 50px;"></td>
                        <td>{{data.name}}</td>
                        <td>{{data.quantity}}</td>
                        <td>{{currencyFormat(data.price)}}</td>
                        <td>{{currencyFormat(data.subtotal)}}</td>
                        <td>
                          <button type="button" class="btn btn-danger btn-xs" @click="substractItem(data)"><span class="fa fa-minus"></span></button>
                          <button type="button" class="btn btn-info btn-xs" @click="addItem(data)"><span class="fa fa-plus"></span></button>
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><b>Total Pembelian</b></td>
                        <td><b>{{currencyFormat(getTotal())}}</b></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-info" data-dismiss="modal" v-show="cart.length !=0">belanja lagi</button>
            <button type="button" class="btn btn-primary" @click="process()" v-show="cart.length !=0">lanjutkan pembayaran</button>
          </div>
        </div>
      </div>
    </div>
    `,
    props:['cart'],
    methods:{
         getTotal: function () {
            let total = 0;
            this.cart.map(data => {
                total += data.subtotal
            })
            return total
        },
        currencyFormat: function (price) {
            return price.toLocaleString()
        },
        addItem: function (objItem){
            this.$emit('add', objItem);
        },
        substractItem: function (objItem){
            this.$emit('reduce', objItem);
        },
        process:function(){
            this.$emit('process')
        }
    }
})