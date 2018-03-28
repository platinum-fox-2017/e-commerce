Vue.component(
    'component-checkout',
    {
        props : ['carts','objactiveuser'],
        template : 
        `
        <div class="col-md-8 col-md-offset-2" style="margin-top:40px">
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
                    <td>
                    </td>
                </tr>
            </tbody>

            <div class="form-group col-md-8">
                <label>Alamat Pengiriman</label>
                <textarea row="5" cols="50" v-model="address_ship"></textarea>
            </div>

            <div class="form-group col-md-8">
                <label>Choose your bank for payment</label>
                <select class="form-control" v-model="payment">
                    <option disabled value="">Please select one</option>
                    <option>BNI</option>
                    <option>BRI</option>
                    <option>Mandiri</option>
                </select>
            </div>

            <tfoot>
                <tr class="visible-xs">
                    <td class="text-center">
                        <strong>Total {{ formatUang(totalPrice()) }}</strong>
                    </td>
                </tr>
                <tr>
                    <td>
                        <a @click="backToHome" href="#" class="btn btn-warning">
                            <i class="fa fa-angle-left"></i> Continue Shopping</a>
                    </td>
                    <td colspan="2" class="hidden-xs"></td>
                    <td class="hidden-xs text-center">
                        <strong>Total {{ formatUang(totalPrice()) }}</strong>
                    </td>
                    <td>
                        <a @click="saveTransaction()" class="btn btn-success btn-block">
                            Confirm
                            <i class="fa fa-angle-right"></i>
                        </a>
                    </td>
                </tr>
            </tfoot>
            </table>
        </div>
        `,
        data: function () {
            return {
                address_ship: ``,
                payment: ``
            }
        }
        ,
        methods : {
            saveTransaction: function() {
                axios.post('http://localhost:3000/api/transactions', {
                    userId: this.objactiveuser.userid,
                    carts: this.carts,
                    address_ship: this.address_ship,
                    payment: this.payment
                })
                .then((response) => {
                    if(response.status == 200) {
                        this.$emit('success-transaction')
                    } else {
                        alert('Login Failed, please check your username or password')
                    }
                })
                .catch(err => {
                    console.log(err)
                })
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

            backToHome: function () {
                this.$emit('back-home')
            }
        }
    }
)