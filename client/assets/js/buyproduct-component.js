var buyproduct = Vue.component('buyproduct', {
  template:`
  <div class="product-list">
      <div class="product-title">
          <div></div>
          <div>
              <h4>Item</h4>
          </div>
          <div>
              <h4>Price</h4>
          </div>
          <div>
              <h4>Quantity</h4>
          </div>
          <div></div>
      </div>
      <div class="product-detail">
          <div v-if="checkoutItems.length === 0" style="padding: 50px;">
              <p style="font-size:30px; text-align:center;">
                  Your bag is empty
              </p>
          </div>
          <div v-else class="item-card"  v-for="check in displayItems">   
              <div class="item-image">
                  <img :src="check.picture" width="auto" height="90px" alt="" srcset="">
              </div>
              <div class="product-desc">
                  <div>
                      <h5>{{ check.name }}</h5>
                  </div>
                      <h6>{{ check.type }}</h6>
                  <div>

                  </div>
              </div>
              <div class="price">
                  <h5>{{ dollarSign(check.price) }}</h5>
              </div>
              <div class="quantity">
                  <h5>{{ check.quantity }}</h5>
              </div>
              <div class="remove">
                  &times;
              </div>
          </div>
      </div>
  </div>
  `,
  props: ['displayItems', 'dollarSign', 'checkoutItems']
})