Vue.config.devtools = true
const app =new Vue({
  el:"#app",
  data:{
    token: localStorage.getItem('token'),
    userId: localStorage.getItem('userId'),
    items:[],
    carts:[],
    total:0,
  },
  created: function() {
    this.showItem()
  },
  methods:{
    showItem: function(){
      let self = this
      axios({
        method: 'get',
        url: 'http://localhost:3000/items/'
      }).then(function(response){
        console.log('ini response show',response)
        self.items = response.data.listItem
      })
    },
    addCart:function(cart){
      // alert("add to cart?")
      console.log("addcart",cart)
      if(this.userId != null){
        axios({
          method: 'post',
          url: 'http://localhost:3000/transactions',
          headers:{
            userId:this.userId
          },
          data:cart
        }).then(function(response){
          console.log("respon cart",response)
        }).catch(function(err){
          console.log(err)
        })
      }else{
        alert("Login first!")
      }
      
      // let obj={
      //   title:data.title,
      //   category:data.category,
      //   description:data.description,
      //   price:data.price,
      //   imgUrl:data.imgUrl,
      //   imgAlt:data.imgAlt,
      //   sku:data.sku,
      //   qty: 1,
      //   subTotal: data.price
      //   }
      // for(let i = 0; i<this.carts.length; i++) {
      //   console.log('masuk sini')
      //   if (this.carts[i].sku === data.sku) {
      //     console.log('sama')
      //     this.carts[i].qty ++
      //     this.carts[i].subTotal = this.carts[i].price * this.carts[i].qty
      //     this.total += data.price
      //     return
      //   }
      // }
      
      // this.carts.push(obj)
      // this.total += obj.price
    },
    removeCart :function(data){
      console.log(data)
      let carts = this.carts
      for(let i = 0; i<carts.length; i++) {
        if (carts[i].sku === data.sku) {
          let check = confirm("Remove item from cart?")
          if(check === true){
            carts.splice(i,1)
            this.total -= data.subTotal
            let index = this.items.map(item => item.sku).indexOf(data.sku)
            return
          }
          
        }
      }
    },
    limitDesc: function(desc){
      if (desc.length > 100){
          desc = desc.substr(0,100) + '...'
      } else {
         desc = desc
      }
      return desc
    },
  },
  computed:{
    cartTotal : function(){
      let count = 0
      for(let i =0; i<this.carts.length;i++){
        count+= this.carts[i].qty
      }
      return count
    }
  }
})
