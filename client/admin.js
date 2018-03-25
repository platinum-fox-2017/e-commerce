
const app =new Vue({
  el:"#admin",
  data:{
    token: localStorage.getItem('token'),
    userId: localStorage.getItem('userId'),
    objUser: {
      name: '',
      email: '',
      password: ''
    },
    userLogin:{
      email:'',
      password:''
    },
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
        url: 'http://localhost:3000/transactions',
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
    createUser : function(){
      // alert("sign up")
      console.log("ini form input===",this.objUser)
      // alert(this.objUser)
      axios({
        method : 'post',
        url : 'http://localhost:3000/users/signup',
        data:this.objUser,
      })
      .then(function (resSignUp) {
        console.log("resLogin",JSON.stringify(resSignUp));
        // location.reload()
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    loginUser : function(){
      console.log("login user===",this.userLogin)
      axios({
        method : 'post',
        url : 'http://localhost:3000/users/signin',
        data:this.userLogin
      })
      .then(function (resSignIn) {
        console.log("resLogin",resSignIn.data.data.id);
        localStorage.setItem('token',resSignIn.data.data.token)
        localStorage.setItem('userId',resSignIn.data.data.id)
        // location.reload();

      })
      .catch(function (error) {
        alert('wrong email/password')
        console.log(error);
      });
    },
    logOutButtonClick : function (){
      console.log('user log out')
      localStorage.clear()
      // location.reload();
      
    }
  },
  computed:{
  }
})
