Vue.component('product',{
  template:`
  <div class="container product">
      <h2>Cameras</h2>
      <div class="row">
        <div class="col-xs-6 col-md-3" v-for="data in items">
          <div class="thumbnail">
            <img class="img-responsive" v-bind:src="data.imgUrl" v-bind:alt="data.imgAlt">
            <h3>{{data.title}}</h3>
            <p> {{limitDesc(data.description)}}</p> 
            <p class="itemPrice">$ {{data.price}}</p>
            <p class="itemStock">Stock: {{data.stock}}</p>
            <button type="button" class="btn btn-primary" v-on:click="addCart(data)">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  `,
  props:['items'],
  methods:{
    limitDesc: function(desc){
      if (desc.length > 100){
          desc = desc.substr(0,100) + '...'
      } else {
         desc = desc
      }
      return desc
    },
    addCart: function(){
      this.$emit('addCart')
    }
  }
})