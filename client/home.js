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
    this.showCart()
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
    showCart: function(){
      let self = this
      axios({
        method: 'get',
        url: 'http://localhost:3000/transactions/',
        headers:{
          token:self.token,
          userid: self.userId
        }
      }).then(function(response){
        console.log('ini response carts',response.data.listTransaction)
        console.log(self.userId)
        self.carts= response.data.listTransaction
      })
    },
    addCart:function(cart){
      let self = this
      // alert("add to cart?")
      console.log("addcart",cart)
      if(this.userId != null){
        axios({
          method: 'post',
          url: 'http://localhost:3000/transactions',
          headers:{
            userid:self.userId
          },
          data:cart
        }).then(function(response){
          console.log("respon cart",response)
          self.showCart()
        }).catch(function(err){
          console.log(err)
        })
      }else{
        alert("Login first!")
      }
    },
    removeCart :function(data){
      console.log(data)
      let self =this
        let check = confirm("Remove item from cart?")
        if(check === true){
          axios({
            method: 'delete',
            url: `http://localhost:3000/transactions/${data._id}`,
            headers:{
              userid:self.userId
            },
            data:data
          }).then(function(response){
            console.log("respon cart",response)
            // location.reload()
            self.showCart()
          }).catch(function(err){
            console.log(err)
          })
        }
    },
    checkOut: function(){
      let self = this
      console.log("checkout",self.carts)
      for(let i =0;i<self.carts.length;i++){
        console.log(self.carts[i]._id)
      axios({
        method:'put',
        url:`http://localhost:3000/transactions/${self.carts[i]._id}`,
        data:self.carts[i]
      }).then(function(response){
        console.log("res check",response)
        self.showCart()
      }).catch(function(err){
        console.log(err)
      })
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
      console.log("length cart",this.carts.length)
      let count = 0
      for(let i =0; i<this.carts.length;i++){
        count+= this.carts[i].quantity
      }
      console.log(count,"count")
      return count
    },
    grandTotal: function (){
      let total  = 0
      for(let i =0; i<this.carts.length;i++){
        total+= (this.carts[i].quantity * this.carts[i].price)
      }
      console.log(total,"count")
      return total
    }
  }
})
