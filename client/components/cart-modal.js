Vue.component('cart-modal', {
    props: ['cart'],
    template: `
    <div class="modal fade" id="cartModal">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Cart</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
            
                <div class="modal-body">
                    <table id="cart" class="table table-hover table-condensed">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th width="150px">Price</th>
                                <th width="30px">Quantity</th>
                                <th width="150px" class="text-center">Subtotal</th>
                                <th width="100px"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in mergeCart(cart)">
                                <td data-th="Product">
                                    <div class="row">
                                        <div class="col-sm-10">
                                            <h4 class="nomargin">{{ item.title }}</h4>
                                            <p>{{ item.description }}</p>
                                        </div>
                                    </div>
                                </td>
                                <td data-th="Price">Rp. {{ item.price }}</td>
                                <td data-th="Quantity">
                                    <input type="number" class="form-control text-center" :value="item.quantity" min="1" :max="item.stock">
                                </td>
                                <td data-th="Subtotal" class="text-center">{{ item.price * item.quantity }}</td>
                                <td class="actions" data-th="">
                                    <button class="btn btn-info btn-sm"><i class="fa fa-refresh"></i></button>
                                    <button class="btn btn-danger btn-sm" @click="removeItem(mergeCart(cart), item._id)"><i class="fa fa-trash-o"></i></button>								
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td><a href="#" class="btn btn-warning" data-dismiss="modal"><i class="fa fa-angle-left"></i> Continue Shopping</a></td>
                                <td colspan="2" class="hidden-xs"></td>
                                <td class="hidden-xs text-center"><strong>Total Rp {{ totalPrice(cart) }}</strong></td>
                                <td><a class="btn btn-success btn-block" @click="checkout" data-dismiss="modal">Checkout <i class="fa fa-angle-right"></i></a></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    </div>
    `,
    methods: {
        mergeCart: function(cart) {
            let items = [];

            cart.forEach(element => {
                let existing = items.filter(item => {
                    return item._id == element._id
                });
                
                if (existing.length) {
                    let existingIndex = items.indexOf(existing[0]);
                    items[existingIndex].quantity += 1;
                } else {
                    items.push({
                        ...element, quantity: 1
                    });
                }
            });
            
            return items;
        },

        totalPrice: function(cart) {
            let sum = 0;
            this.mergeCart(cart).forEach(element => {
                sum += (element.price * element.quantity);
            });

            return sum;
        },

        removeItem: function(items, id) {
            let quantity = 0;
            items.forEach(item => {
                if (item._id == id) quantity = item.quantity;
            })

            this.$emit('remove-item-from-cart', { id, quantity });
        },

        checkout: function() {
            this.$emit('checkout');
        }
    }
});