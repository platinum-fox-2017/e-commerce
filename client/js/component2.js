Vue.component('component-two', {
  template: `
  <div class="jumbotron" style="background-color: white	">
    <div class="text-center">
      <img :src="sale.urlImage" style="border-radius: 100%; width: 100px; height: 100px;" >
    </div>
    <h5 class="display-4">
      {{sale.title}} 
    </h5>
    <p class="lead">
      {{sale.message}}
    </p>
    <hr class="my-4">
    <p>
      {{sale.price}}$
    </p>
    <p class="lead">
      <button type="button" class="btn btn-primary" v-on:click="addEmit(sale)">Add to Cart</button>
    </p>
  </div>
  `,
  props: ['sale'],

  methods: {
    addEmit: function (obj) {
      this.$emit('add-to-cart', obj)
    }
  }

})
