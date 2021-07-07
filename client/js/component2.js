Vue.component('component-two', {
  template: `
  <div class="modal-body" >
    <div class="card-body" v-for="cart in listcart">
      <div class="row">
        <div class="col-sm-2">
          <img :src="cart.itemId.image" alt="Avatar" style="border-radius: 100%; width: 100px; height: 100px" >
        </div>
        <div class="col-sm-3">
          <h5 class="card-title">{{cart.itemId.name}}</h5>
        </div>
        <div class="col-sm-3">
          <h6 class="card-title">
            <button type="button" class="btn btn-secondary" v-on:click="reduce(cart)">-</button>
            {{cart.quantity}}
            <button type="button" class="btn btn-secondary" v-on:click="add(cart)">+</button>
          </h6>
        </div>
        <div class="col-sm-2">
          <h5 class="card-title">{{cart.totalPrice}}$</h5>
        </div>
        <div class="col-sm-2">
          <button type="button" class="btn btn-danger" v-on:click="deleteData(cart)">
            <span class="oi oi-trash"></span>
          </button>
        </div>
      </div>
    </div>
  </div>
  `,
  props: ['listcart'],

  methods: {
    reduce: function (obj) {
      this.$emit('reduce-cart', obj)
    },
    add: function (obj) {
      this.$emit('add-cart', obj)
    },
    deleteData: function (obj) {
      this.$emit('delete-cart', obj)
    }
  }
})
