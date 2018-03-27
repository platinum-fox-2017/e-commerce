Vue.component('NavbarAdmin', {
  template: `
  <nav class="navbar fixed-top navbar-expand-md">
    <!-- LOGO ON NAVIGATION BAR -->
    <a class="navbar-brand" href="#">
    <img id="title-image2" src="Assets/arudinoLogo White.png" class="d-inline-block align-top" alt="">
  </a>

    <ul class="navbar-nav ml-auto">
      <li>
        <a class="nav-link d-md-none" href="#" data-toggle="modal" data-target="#cartModal"><i class="fa fa-shopping-cart"></i> <span class="badge">{{totalitems}}</span></a>

      </li>
      <li class="nav-item active">
        <a class="nav-link" href="#">Home</a>
      </li>
      <li id="dropdown2" class="nav-item dropdown">

        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown2" role="button" data-toggle="dropdown">
       Products
      </a>

        <div id="dropdown-content2" class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">New Products</a>
          <a class="dropdown-item" href="#">Special Offers</a>
          <a class="dropdown-item" href="#">Arduino</a>
        </div>
      </li>


    </ul>



      <ul class="nav navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="#">Admin</a>
        </li>
      </ul>

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
