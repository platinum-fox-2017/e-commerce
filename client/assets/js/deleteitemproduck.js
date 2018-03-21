Vue.component('items',{
  template:`<div class="card">
    <img class="card-img-top" :src='item.picture' style="height:200px;">
    <div class="card-body">
      <h5 class="card-title">{{item.title}}</h5>
      <p class="card-text">{{item.descripsi}}</p>
      <h6 class="card-title">Rp.{{item.harga}}</h6>
      <h6 class="card-title">stock:{{item.stock}}</h6>
      <div class="col-md-12 column" style="padding:0px; margin:0px;">
          <button class="btn btn-danger col-sm-12 col-md-5 column" v-on:click="deleteitem(item._id)">delete</button>
          <button class="btn btn-warning col-sm-12 col-md-5 column" data-target="#editmodalitem" data-toggle="modal" v-on:click="showupdateitem(item)">update</button>
      </div>
    </div>
  </div>`,
  props:['item'],
  methods :{
    deleteitem:function(item){
      this.$emit('deleteitem',item)
    },
    showupdateitem:function(item){
      this.$emit('showupdateitem',item)
    }
  }
})
