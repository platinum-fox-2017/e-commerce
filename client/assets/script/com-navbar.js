Vue.component('navbar',{
    template:`
    <nav class="navbar navbar-expand-md fixed-top navbar-top">
      <div class="container">
        <a class="navbar-brand" href="index.html" style="color:white;">Hijabana</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsDropdown" aria-controls="navbarsDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"><i class="fa fa-bars"></i></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarsDropdown">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="http://example.com" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Category</a>
              <div class="dropdown-menu" aria-labelledby="dropdown01">
                <a class="dropdown-item" href="#">Jilbab</a>
                <a class="dropdown-item" href="#">Pakaian Wanita</a>
                <a class="dropdown-item" href="#">Produk Beauty</a>
                <a class="dropdown-item" href="#">Tas & Sepatu</a>
              </div>
            </li>
            <li>
              <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
                <button class="btn btn-success my-2 my-sm-0" type="submit">Search</button>
              </form>
            </li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li>
              <button class="btn btn-sm btn-outline-info" data-toggle="modal" data-target="#cartModal" ><span class="fa fa-shopping-cart fa-2x"></span></button>
            </li>
            <li v-if="!token">
                <div class="fb-login-button" data-max-rows="1" data-size="large" 
                data-button-type="login_with" data-show-faces="false" data-auto-logout-link="true" 
                data-use-continue-as="false"
                onlogin="checkLoginState()"></div>
            </li>
            <li v-if="token"><a href="#" style="color:white;"><button class="btn btn-info" @click="logout()">Sign Out</button></a></li>
          </ul>
        </div>
      </div>
    </nav>
    `,
    data () {
      return {
        token: localStorage.fbToken
      }
    },
    methods:{
      logout(){
          this.$emit('signout')
      }
    }
})