Vue.component('component-one', {
  template: `

  <div class="card" style="width: 18rem;" >
    <img class="card-img-top" :src="item.image" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">{{item.name}}</h5>
      <p class="card-text">{{item.description}}</p>
      <p class="card-text">{{item.price}}$</p>
      <button type="button" class="btn btn-primary" v-on:click="addEmit(item)">Add to Cart</button>
    </div>
  </div>
  `,
  props: ['item'],

  methods: {
    addEmit: function (obj) {
      this.$emit('add-to-cart', obj)
    }
  }
})
