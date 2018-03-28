window.onload = function () {
const app =new Vue({
  el:"#admin",
  data:{
    token: localStorage.getItem('token'),
    // userId: localStorage.getItem('userId'),
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
    objUser: {
      name: '',
      email: '',
      password: ''
    },
  },
  created: function() {
  },
  methods:{
    addNewItem:function(){
      let self = this
      // alert(self.newItem)
      console.log("additem",this.newItem)
        axios({
          method: 'post',
          url: 'http://localhost:3000/items',
          data:this.newItem
        }).then(function(response){
          console.log("respon item",response)
        }).catch(function(err){
          console.log(err)
        })
    },
    test: function (){
      alert('test')
    },
    loginUser : function(){
      console.log("login user===",this.userLogin)
      axios({
        method : 'post',
        url : 'http://localhost:3000/login/admin/signin',
        data:this.userLogin
      })
      .then(function (resSignIn) {
        console.log("resLogin",resSignIn);
        localStorage.setItem('token',resSignIn.data.admin.token)
        // localStorage.setItem('userId',resSignIn.data.data.id)
        location.reload();

      })
      .catch(function (error) {
        console.log(error);
      });
    },
    logOutButtonClick : function (){
      console.log('user log out')
      localStorage.clear()
      // location.reload();
    },
    createUser : function(){
      // alert("sign up")
      console.log("ini form input===",this.objUser)
      // alert(this.objUser)
      axios({
        method : 'post',
        url : 'http://localhost:3000/login/admin/signup',
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
  }
})
}