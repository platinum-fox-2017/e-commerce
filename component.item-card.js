Vue.component('item-card', {
  template:`
    <div class="card text-center">

      <div class="card-image">
        <img class="card-img-top" :src="item.imageUrl" alt="Card image cap">
        <p id="stock-empty" v-if="item.stock==0" class=" btn btn-default card-text text-md-right small">SOLD OUT</p>
        <p id="stocks" v-if="item.stock>0" class=" btn btn-default card-text text-md-right small">Stocks: {{item.stock}}</p>


        <div class="overlay d-none d-md-block">
          <div class="text">
            <h5>{{item.name}}</h5><br>
            <p>
              {{item.description}}
            </p>
            <a id="btn-buy" @click="addToCart(item)" class="btn btn-default" v-bind:class="checkStock(item.stock)">Buy Now</a>
          </div>

        </div>
      </div>

      <div class="card-body">
        <p class="card-text">{{pricePrint(item.price)}}</p>
        <h5 class="card-title">{{item.name}}</h5>

        <a id="btn-buy" @click="addToCart(item)" class="btn btn-default d-md-none" v-bind:class="checkStock(item.stock)">Buy Now</a>
      </div>

    </div>
  `,
  props:['item'],
  data: function () {
    return {}
  },
  methods: {
    addToCart: function(obj){
      console.log(this.item)
      console.log(obj)
      this.$emit('addtocart', obj);
    },
    checkStock: function(stock){
      if (stock==0){
        return "disabled"
      };
    },
    pricePrint: function(price){
      return `$${price.toFixed(2)}`;
    },
  }
})
