Vue.component(
    'component-chart',
    {
        props : ['carts', 'signInActive', 'checkoutIsActive'],
        template: 
        `
        <div id="myModal" class="modal fade" role="dialog">
            <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Modal Header</h4>
                    </div>

                    <div class="modal-body">

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
                        <tr v-for="cart in carts">
                            <td data-th="Product">
                                <div class="row">
                                    <div class="col-sm-5 hidden-xs">
                                        <img :src="cart.item_image" alt="..." class="img-responsive" />
                                    </div>
                                    <div class="col-sm-10">
                                        <h4 class="nomargin">{{ cart.item_name}}</h4>
                                        <p>{{cart.item_description}}</p>
                                    </div>
                                </div>
                            </td>
                            <td data-th="Price">@ {{formatUang(cart.item_price)}}</td>
                            <td data-th="Quantity">
                                <!-- :value="cart.quantity" -->
                                <input type="number" class="form-control text-center" v-model="cart.quantity" min="1" disabled>
                            </td>
                            <td data-th="Subtotal" class="text-center">{{ formatUang(setPrice(cart.quantity, cart.item_id))}}</td>
                            <td class="actions" data-th="">
                                <button class="btn btn-danger btn-sm" @click="deleteItem(cart.item_id)">
                                    <i class="fa fa-trash-o"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                    
                    <tfoot>
                        <tr class="visible-xs">
                            <td class="text-center">
                                <strong>Total {{ formatUang(totalPrice()) }}</strong>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" class="hidden-xs"></td>
                            <td class="hidden-xs text-center">
                                <strong>Total {{ formatUang(totalPrice()) }}</strong>
                            </td>
                            <td v-if="carts.length > 0">
                                <a class="btn btn-success btn-block" @click="checkCheckout">Checkout
                                    <i class="fa fa-angle-right"></i>
                                </a>
                            </td>
                        </tr>
                    </tfoot>
                    </table>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        `,
        methods : {
            checkCheckout: function() {
                this.$emit('checkout-click')
            },

            deleteItem: function (id) {
                this.$emit('delete-item', id)
            },
            formatUang: function(money) {
                return 'Rp. '+ parseInt(money).toLocaleString();    
            },
    
            setPrice: function(quantity,id) {
                let newPrice = 0;
                for (let i = 0; i < this.carts.length; i++) {
                    if (id == this.carts[i].item_id) {
                       this.carts[i].item_totalPrice = this.carts[i].item_price * this.carts[i].quantity
                       newPrice = this.carts[i].item_totalPrice
                    }
                }
                return newPrice;
            },

            totalPrice: function() {
                let totalPrice = 0;
                for (let i = 0; i < this.carts.length; i++) {
                    totalPrice = totalPrice + this.carts[i].item_totalPrice 
                }
                if(totalPrice) {
                    return totalPrice
                } else {
                    return 0
                }
    
            },
        }
    }
)