var products = Vue.component('products', {
  template:`
  <div class="product-container">
      <div class="product-headings">
          <h1>Our Most Wanted Products</h1>
      </div>
      <div class="container">
          <div class="columns">
      <div class="column col-2 col-md-6 col-sm-12" v-for="item in allitems">
          <div class="column col-1 col-md-12 col-sm-12"></div>
              <div class="card">
                  <div class="card-image" id="sizing">
                      <img v-if="showStock(item.type) == 0" :src="item.imageUrl" class="img-responsive" style="opacity: 0.5">
                      <img v-else :src="item.imageUrl" class="img-responsive" :title="item.type">
                  </div>
                  <div class="card-header">
                      <div class="card-title h5">{{item.name}}</div>
                      <div class="card-subtitle text-gray">{{item.type}}</div>
                      <div class="card-subtitle text-gray">{{dollarSign(item.price)}}</div>
                      <p v-model="">Items left in Stock: {{showStock(item.type)}}</p>
                  </div>
                  <div class="card-body">{{limitDesc(item.description)}}</div>
                  <div class="card-footer">
                      <button v-if="showStock(item.type) > 0"class="btn btn-primary animate pulse" @click="addToCart(item.name, item.type, item.price, item.imageUrl)">Buy</button>
                      <button v-else class="btn btn-error">Sold Out</button>
                  </div>
              </div>
          <div class="column col-1 col-sm-12"></div>
      </div>
  </div>
  `,
  props:['addToCart', 'limitDesc', 'showStock', 'dollarSign', 'allitems']
})