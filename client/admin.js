window.onload = function () {
const app =new Vue({
  el:"#admin",
  data:{
    token: localStorage.getItem('token'),
    userId: localStorage.getItem('userId'),
    newItem: {
      sku:'',
      title: '',
      category: '',
      description: '',
      price: '',
      image: ''
    },
    userLogin:{
      email:'',
      password:''
    },
  },
  created: function() {
  },
  methods:{
    addNewItem:function(){
      alert(this.newItem)
      let self = this
      console.log("additem",this.newItem)
      // if(this.userId != null){
        axios({
          method: 'post',
          url: 'http://localhost:3000/items',
          data:this.newItem
        }).then(function(response){
          console.log("respon item",response)
        }).catch(function(err){
          console.log(err)
        })
      // }else{
      //   alert("Login first!")
      // }
    },
    test: function (){
      alert('test')
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
  }
})
}