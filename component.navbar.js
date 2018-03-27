Vue.component('Navbar', {
  template: `
  <nav id="global-nav" class="navbar fixed-top navbar-expand-md">
    <!-- LOGO ON NAVIGATION BAR -->
    <a id="site-title" class="navbar-brand" href="#">
    <img id="title-image" src="Assets/arudinoLogo White.png" class="d-inline-block align-top" alt="">
  </a>

    <ul class="navbar-nav ml-auto">
      <li>
        <a class="nav-link d-md-none" href="#" data-toggle="modal" data-target="#cartModal"><i class="fa fa-shopping-cart"></i> <span class="badge">{{totalitems}}</span></a>

      </li>

    </ul>
    <button id="btn-collapse" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-collapse">
    <span class="navbar-toggler-icon">&#9776;</span>
  </button>

    <div class="collapse navbar-collapse" id="navbar-collapse">
      <ul id="navbar-header" class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="#">Home</a>
        </li>
        <li id="dropdown" class="nav-item dropdown">

          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown">
         Products
        </a>

          <div id="dropdown-content" class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#">New Products</a>
            <a class="dropdown-item" href="#">Special Offers</a>
            <a class="dropdown-item" href="#">Arduino</a>
          </div>
        </li>


      </ul>

      <form class="form-inline">
        <input id="search-bar" class="form-control" type="search" placeholder="Search.." aria-label="Search">
        <button class="btn btn-search" type="submit"><i class="fa fa-search"></i></button>
      </form>

      <ul class="nav navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="#">Sign In</a>
        </li>
        <li>
          <a class="nav-link d-none d-md-block" href="#" data-toggle="modal" data-target="#cartModal"><i class="fa fa-shopping-cart"></i> Cart <span class="badge">{{totalitems}}</span></a>
        </li>
      </ul>
    </div>
  </nav>
  `,
  props: ['totalitems'],
  data: function () {
    return {

    }
  },
  methods: {

  }
})
