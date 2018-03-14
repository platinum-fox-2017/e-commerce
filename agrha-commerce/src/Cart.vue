<template>
<div>
    <button class="btn btn-primary" data-toggle="modal" data-target="#Cart">ShowCart {{inCart.length}} Items</button>

    <div id="Cart" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">Shopping cart</h5>
            <button class="close" data-dismiss="modal">
            &times;
            </button>
        </div>
        <div class="modal-body">
            <table class="table">
            <tbody>
                <tr v-for="(item,index) in cart" :key="item.invId">
                <td>{{ item.name }}</td>
                <td>{{ item.price | rupiahs }}</td>
                <td>
                    <button class="btn btn-sm btn-danger" @click="removeFromCart(index)">x</button>
                </td>
                </tr>
                <tr>
                    <th></th>
                    <th>{{ total | rupiahs }}</th>
                    <th></th>
                </tr>
            </tbody>
            </table>
        </div>
        <div class="modal-footer">
            <button class="btn btn-secondary" data-dismiss="modal">Keep shopping</button>
            <button class="btn btn-primary">Check out</button>
        </div>
        </div>
    </div>
    </div>
</div>
</template>

<script>
import {rupiahs} from './filters'
export default {
  name: 'Cart',
  methods: {
    removeFromCart (index) {
      this.$store.dispatch('removeFromCart', index)
    }
  },
  computed: {
    inCart () { return this.$store.getters.inCart },
    numInCart () { return this.inCart.length },
    cart () {
      return this.$store.getters.inCart.map(cartItem => {
        return this.$store.getters.forSale.find((forSaleItem) => {
          return cartItem === forSaleItem.invId
        })
      })
    },
    total () {
      return this.cart.reduce((acc, cur) => acc + cur.price, 0)
    }
  },
  filters: {
    rupiahs
  }
}
</script>
