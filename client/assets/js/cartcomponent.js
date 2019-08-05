Vue.component('carts',{
  template:`
  <div class="row">
    <div class="col-sm-12 col-md-4">
      <div class="col-md-12">
        <img :src="listcart.itemid.picture" class="card-img-top img-responsive">
      </div>
      <div align="center">
        <h4>{{listcart.itemid.title}}</h4>
      </div>
    </div>
    <div class="col-sm-12 col-md-3" style="padding-top:50px;" >
      <button type="button" class="btn btn-secondary" v-on:click="deletetotal(listcart._id)">- </button><span> {{listcart.qty}} </span><button type="button" class="btn btn-secondary" v-on:click="addtotal(listcart._id)"> +</button>
    </div>
    <div class="col-sm-12 col-md-2" style="padding-top:50px;">
      <span>Rp.{{listcart.totalbiaya}}</span>
    </div>
    <div class="col-sm-12 col-md-3" style="padding-top:45px;">
      <button type="button" class="btn btn-danger" v-on:click="deletelistcart(listcart)"><span class="oi oi-circle-x"></span></button>
      <button type="button" class="btn btn-success" v-on:click="buylistcart(listcart)"><span class="oi oi-check"></span></button>
    </div>
  </div>`,
  props:['listcart'],
  methods :{
    deletelistcart:function(item){
      this.$emit('deleteitem',item)
    },
    deletetotal:function(item){
      this.$emit('deletetotal',item)
    },
    addtotal:function(item){
      this.$emit('addtotal',item)
    },
    buylistcart:function(item){
      console.log('jaha');
      this.$emit('buylistcart',item)
    }
  }
})
