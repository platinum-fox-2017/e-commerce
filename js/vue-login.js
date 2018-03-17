new Vue({
  el: '#app',
  data: {
    username: '',
    password: ''
  },
  mounted: function(){
    this.isLogin();
  },
  methods: {
    login: function(){
      request.post('/api/token',{username: this.username,password: this.password}).then(data =>{
        console.log(data.data.token);
        localStorage.setItem('token',data.data.token);

      }).catch(err =>{
        console.log(err);
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
