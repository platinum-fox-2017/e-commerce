Vue.component('cart',{
  template: `
  <div id="myModal" class="modal fade" role="dialog">
        <div class="modal-dialog modal-lg modal-sm">
          <!-- Modal content-->
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">Shopping Cart</h4>
            </div>
            <div class="modal-body" id ="appCart">
              <div class="container">
                <div class="row" v-for="cart in carts">
                  <div class="col-xs-8 col-md-4" >
                    <a class="thumbnail pull-left" href="#"><img class="img-responsive" v-bind:src="cart.itemId.image" alt="camera"></a>
                    <p>{{cart.itemId.title}}</p>
                  </div>
                  <div class="col-xs-4 col-md-2">
                    <p>{{cart.quantity}} @ $ {{cart.itemId.price}}</p>
                  </div>
                  <div class="col-xs-4 col-md-2">
                    <p>$ {{cart.itemId.price * cart.quantity}}</p>
                  </div>
                  <div class="col-xs-2 col-md-1">
                    <button type="button" v-on:click="removeCart(cart)" class="btn btn-danger">Remove</button>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-offset-6">
                    <p>Grand Total: $ {{grandtotal}}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-success" data-toggle="modal" data-target="#myModal">
                <span v-on:click="checkOut()" class="glyphicon glyphicon-shopping-cart"> Checkout</span>
              </button>
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
      
        </div>
      </div>
  `,
  props:['carts', 'grandtotal'],
  methods: {
    removeCart: function(cart){
      this.$emit('removecart', cart)
    },
    checkOut: function (){
      this.$emit('checkout')
    }
  }
})