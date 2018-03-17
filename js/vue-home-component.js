Vue.component('card-product',{
  template: `
      <div class="card"  >
        <img class="card-img-top" :src="product.image" alt="Card image">
        <div class="card-body">
          <h4 class="card-title">{{ product.name }}</h4>
          <p class="card-text">RP {{ product.price }}</p>
          <button type="button" href="#" class="btn btn-danger btn-sm btn-block" @click="addToCart"><i class="fa fa-shopping-cart"></i> Buy Now</button>
          <a href="/detail.html" class="btn btn-warning btn-sm btn-block">Detail</a>
        </div>
      </div>

  `,
  props: ['product'],
  methods: {
    addToCart: function(){
      this.$emit('add-to-cart');
    }
  }

})
