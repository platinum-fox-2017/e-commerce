Vue.component('admin-nav',{
    template:`
    <nav class="navbar navbar-expand-md fixed-top navbar-top">
    <div class="container">
      <a class="navbar-brand" href="index.html" style="color:white;">Hijabana</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsDropdown" aria-controls="navbarsDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"><i class="fa fa-bars"></i></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarsDropdown">
        <ul class="navbar-nav mr-auto">
          <li>
            <form class="form-inline my-2 my-lg-0">
              <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
              <button class="btn btn-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li><button class="btn btn-info" @click="signout" >Sign Out</button></li>
        </ul>
      </div>
      </div>
  </nav>
    `,
   methods:{
    signout(){
        this.$emit('signout')
    }
   }
})
