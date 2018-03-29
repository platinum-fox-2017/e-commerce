Vue.component('component-one', {
  template: `

  <div class="card" style="width: 18rem;" >
    <img class="card-img-top" :src="item.image" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">{{item.name}}</h5>
      <p class="card-text">{{item.description}}</p>
      <p class="card-text">{{item.price}}$</p>
      <button type="button" class="btn btn-primary" v-on:click="addEmit(item)" v-if="token">Add to Cart</button>
      <span v-else class="d-inline-block" data-toggle="popover" data-content="Login to continue shopping">
        <button class="btn btn-primary" style="pointer-events: none;" type="button" disabled>Add to Cart</button>
      </span>
    </div>
  </div>
  `,
  props: ['item','token'],

  methods: {
    addEmit: function (obj) {
      this.$emit('add-to-cart', obj)
    }
  }
})
