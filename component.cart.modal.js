Vue.component('ModalCart', {
  template: `
  <div class="modal fade" id="cartModal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">

        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title">Shopping Cart</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>

        <!-- Modal body -->
        <div class="modal-body">
          <div class="container">
            <table id="cart" class="table table-hover table-condensed">
              <thead>
                <tr>
                  <th style="width:50%">Product</th>
                  <th style="width:10%">Price</th>
                  <th style="width:8%">Quantity</th>
                  <th style="width:22%" class="text-center">Subtotal</th>
                  <th style="width:10%"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="itemCart in itemscart">
                  <td data-th="Product">
                    <div class="row">
                      <div class="col-sm-4 hidden-xs d-none d-lg-block">
                        <img :src="itemCart.imageUrl" width=100; alt="imageCart" class="img-responsive" />
                      </div>
                      <div class="col-sm-8">
                        <h6 class="nomargin">{{itemCart.name}}</h6>
                      </div>
                    </div>
                  </td>
                  <td data-th="Price">{{pricePrint(itemCart.price)}}</td>
                  <td data-th="Quantity">
                    <input v-model="itemCart.quantity" type="number" class="form-control text-center" min="1" :max="findStock(itemCart._id)">
                  </td>
                  <td data-th="Subtotal" class="text-center">{{pricePrint(setSubtotal(itemCart._id, itemCart.quantity))}}</td>
                  <td class="actions" data-th="">
                    <button class="btn btn-info btn-sm"><i class="fa fa-refresh"></i></button>
                    <button @click="deleteFromCart(itemCart._id)" class="btn btn-danger btn-sm"><i class="fa fa-trash-o"></i></button>
                  </td>
                </tr>
              </tbody>
              <tfoot>

                <tr>
                  <td><a href="#" class="btn btn-warning"><i class="fa fa-angle-left"></i> Continue Shopping</a></td>
                  <td colspan="2" class="hidden-xs"></td>
                  <td class="hidden-xs text-center"><strong>Total {{pricePrint(setTotalPrice())}}</strong></td>
                  <td><a class="btn btn-success btn-block" @click="reupdateStock()">Checkout <i class="fa fa-angle-right"></i></a></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>


      </div>
    </div>
  </div>
  `,
  props: ['itemscart'],
  data: function () {
    return {
      totalPrice: 0
    }
  },
  methods: {
    pricePrint: function(price){
      return `$${price.toFixed(2)}`;
    },
    setTotalPrice: function(){
      this.totalPrice = this.itemscart.reduce((tot,val) => {
        return tot+Number(val.subtotal);
      },0)
      this.$emit('totalprice', this.totalPrice)
      return this.totalPrice;
    },
    findStock: function (id) {
      this.$emit('findstock', id);
    },
    setSubtotal: function(id, quant) {
      this.$emit('setsubtotal', {id, quant})
    }
  }
})
