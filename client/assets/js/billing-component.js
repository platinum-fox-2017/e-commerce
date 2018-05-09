var billing = Vue.component('billing', {
  template:`
  <div class="total-purchase">
      <div class="order-content">
          <div class="order-title">
              <h1>ORDER SUMMARY</h1>
          </div>
          <div class="total-item">
              <div> Total sub-item: </div>
              <div> {{ checkoutItems.length }} </div>
              <div> Total:</div>
              <div> {{ dollarSign(totalCheckout) }} </div>
          </div>
          <div class="order-button">
              <button @click="placeOrder()" class="rad-button good flat">Place Order</button>
          </div>
      </div>
  </div>
  `,
  props: ['checkoutItems', 'dollarSign', 'placeOrder', 'totalCheckout']
})