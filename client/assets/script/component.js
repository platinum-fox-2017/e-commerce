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
    <div class="modal-body">
            <table class="table table-responsive">
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
        }
    }
})