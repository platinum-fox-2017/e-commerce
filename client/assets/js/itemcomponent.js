Vue.component('items',{
  template:`<div class="card">
    <img class="card-img-top" :src='item.picture' style="height:200px;">
    <div class="card-body">
      <h5 class="card-title">{{item.title}}</h5>
      <p class="card-text">{{item.descripsi}}</p>
      <h6 class="card-title">Rp.{{item.harga}}</h6>
      <h6 class="card-title">stock:{{item.stock}}</h6>
      <button class="btn btn-primary col-md-12" v-on:click="addtocart(item)">Add to Cart</button>
    </div>
  </div>`,
  props:['item'],
  methods :{
    addtocart:function(item){
      this.$emit('tambahitem',item)
    }
  }
})
