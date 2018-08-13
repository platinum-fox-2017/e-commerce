new Vue({
  el: '#app',
  data: {
    username: '',
    password: '',
    loginFail: false,
  },
 created: function(){
    this.isLogin();
  },
  methods: {
    login: function(){
      let app = this;
      request.post('/api/token',{username: this.username,password: this.password}).then(data =>{
        localStorage.setItem('token',data.data.token);
        window.location = '/admin/product.html'

      }).catch(err =>{
        console.log(err);
        app.loginFail = true;
        app.password = '';
      })
    },
    isLogin: function(){
      var token = localStorage.getItem("token");
      if(token != undefined){
        window.location = "/admin/product.html";
      }

    },
  }

})
