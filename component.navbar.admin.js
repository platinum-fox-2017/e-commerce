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
        <a class="nav-link" href="index.html">Home</a>
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
