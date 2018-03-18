<template>
  <div>
    <!-- Navbar -->
    <section id="navbar">
      <nav class="navbar navbar-default">
        <div class="container">
          <!-- Brand and toggle get grouped for better mobile display -->
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
              aria-expanded="false">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <router-link to="/">
              <a class="navbar-brand">Mercedes Benz</a>
            </router-link>
          </div>

          <div class="navbar-right" style="margin-top: 8px">
            <div class="btn-group" id="action"  v-if="token">
              <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Action
                <span class="caret"></span>
              </button>
              <ul class="dropdown-menu">
                <li>
                  <router-link to="/add-product">
                    <a href="#">Add Product</a>
                  </router-link>
                </li>
              </ul>
            </div>
            <!-- Login -->
            <button id="fb-btn" class="btn btn-primary" @click="login()" v-if="!token">Login with Facebook</button>
            <button id="fb-btn" class="btn btn-primary" @click="logoutFunc()" v-else>Logout</button>
            <!-- End of Login -->
          </div>

        </div>
        <!-- /.container-fluid -->
      </nav>
    </section>
    <!-- End of Navbar -->
  </div>
</template>

<script>

  window.fbAsyncInit = function () {
    FB.init({
      appId: '218559235391265',
      cookie: true,
      xfbml: true,
      version: 'v2.12'
    });

    FB.getLoginStatus(function (response) {
      console.log(response);
    });
  };

  (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  export default {
    data(){
      return {
        token: null
      }
    },
    created(){
      this.start()
    },
    methods: {
      start(){
        this.token = localStorage.getItem('tokenjwt')
      },
      login() {
        let self = this
        FB.login((response) => {
          if(response.authResponse.accessToken){
            self.$axios.get('http://localhost:3000/api/user/login',{
              headers:{
                fbtoken : response.authResponse.accessToken
              }
            })
            .then(({data})=>{
              self.token=data.token
              localStorage.setItem('tokenjwt',data.token)
              console.log(data);
            })
            .catch(err=>{
              console.error(err);
              
            })
          }else{
            console.log('not login');
          }
        }, {
          scope: 'public_profile,email'
        })
      },
      logoutFunc() {
        let self = this
        FB.logout(function (response) {
          self.token = null
          localStorage.clear()
        })
      }
    }
  }

</script>
