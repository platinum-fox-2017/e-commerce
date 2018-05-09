var cart = Vue.component('cart', {
  template:`
  <div class="modal" id="modal-id">
      <a href="#close" class="modal-overlay" aria-label="Close" @click="closemodal()"></a>
      <div class="modal-container">
          <div class="modal-header">
          <a href="#close" class="btn btn-clear float-right" aria-label="Close" @click="closemodal()"></a>
          <div class="modal-title h5">Your Cart</div>
          </div>
          <div class="modal-body">
          <div class="content">
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
                          <tr v-if='carts.length == 0'>
                              <td colspan="4">
                                  <p style="font-family:Helvetica; font-size:20px; color:darkgrey;text-align:center;padding-top:20px;"> Your cart is empty </p>
                              </td>
                          </tr>
                          <tr v-else v-for="items in carts">
                              <td data-th="Product">
                                  <div class="row">
                                      <div class="col-sm-2 hidden-sm" id="img-sizing"><img :src="items.picture" alt="..." class="img-responsive"/></div>
                                      <div class="col-sm-10">
                                          <h4 class="nomargin">{{items.name}}</h4>
                                          <p>{{items.type}}</p>
                                      </div>
                                  </div>
                              </td>
                              <td data-th="Price">$ {{items.price}} </td>
                              <td data-th="Quantity">
                                  <input type="number" min='1' v-model="items.quantity" class="form-control text-center" :value="items.quantity">
                              </td>
                              <td data-th="Subtotal" class="text-center">{{dollarSign(setSubtotal(items.type, items.quantity))}}</td>
                              <td class="actions" data-th="">
                                  <button class="btn btn-danger btn-sm" @click='removeItem(items.type, items.quantity)'><i class="fa fa-trash-o"></i></button>								
                              </td>
                          </tr>
                      </tbody>
                      <tfoot>
                          <tr class="visible-xs">
                              <td class="text-center"><strong>Total</strong></td>
                          </tr>
                          <tr>
                              <td><a href="#" class="btn btn-warning" @click="closemodal()"><i class="fa fa-angle-left"></i> Continue Shopping</a></td>
                              <td colspan="2" class="hidden-xs"></td>
                              <td class="hidden-xs text-center"><strong>Total {{dollarSign(total())}}</strong></td>
                              <td v-if="carts.length > 0"><a @click="checkout()" class="btn btn-success btn-block">Checkout <i class="fa fa-angle-right"></i></a></td>
                          </tr>
                      </tfoot>
                  </table>
              </div>
          </div>
      </div>
  </div>`,
  props: ['closemodal', 'checkout', 'removeItem', 'dollarSign', 'setSubtotal', 'carts', 'total']
})