Vue.component("items-component",{
  template: `
  <div class="container pt-2">
    <div class="row">
      <div class="col-lg-3 pb-4" v-for="item in items">
          <div class="card">
              <img class="card-img-top" :src="item.image" alt="Card image cap">
              <div class="card-body">
                  <h5 class="card-title">{{ item.name }}</h5>
                  <p class="card-text">{{ item.price }}</p>
                  <a href="#" class="btn btn-primary" v-on:click='addToCart(item)'>Add to cart</a>
              </div>
          </div>
      </div>
    </div>
  </div>
  `,
  props: ["items"],
  methods: {
    addToCart: function(item){
      this.$emit("add-item", item)
    }
  }
})