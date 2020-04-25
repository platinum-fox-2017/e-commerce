Vue.component('FooterContent', {
  template: `
  <footer class="page-footer font-small pt-4 mt-4">

    <div class="container text-center text-md-left">

      <div class="row text-center text-md-left mt-3 pb-3">

        <hr class="w-100 clearfix d-md-none">

        <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
          <h6 class="text-uppercase mb-4 font-weight-bold">Products</h6>
          <p><a href="#!">New Products</a></p>
          <p><a href="#!">Special Offers</a></p>
          <p><a href="#!">Arduino</a></p>
        </div>

        <hr class="w-100 clearfix d-md-none">

        <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
          <h6 class="text-uppercase mb-4 font-weight-bold">Useful links</h6>
          <p><a href="#!">Sign In</a></p>
          <p><a href="#!">Contact Us</a></p>
          <p><a href="#!">About Us</a></p>
          <p><a href="#!">Help</a></p>
        </div>

        <hr class="w-100 clearfix d-md-none">

        <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
          <h6 class="text-uppercase mb-4 font-weight-bold">Contact</h6>
          <p><i class="fa fa-home mr-3"></i>Bandung, Indonesia</p>
          <p><i class="fa fa-envelope mr-3"></i> contact@faduino.com</p>
          <p><i class="fa fa-phone mr-3"></i> +62 818 09498000</p>
          <p><i class="fa fa-print mr-3"></i> +62 818 09498000</p>
        </div>
      </div>

      <hr>

      <div class="row align-items-center">
        <div class="col-md-8 col-lg-8">
          <p class="text-center text-md-left grey-text">© 2018 Copyright:<strong> fadhilmch</strong></p>

        </div>

        <div class="col-md-4 col-lg-4 ml-lg-0">

          <div class="text-center text-md-right">
            <ul id="social-medial" class="list-unstyled list-inline">
              <li class="list-inline-item"><a class="btn-floating btn-sm rgba-white-slight mx-1"><i class="fa fa-facebook"></i></a></li>
              <li class="list-inline-item"><a class="btn-floating btn-sm rgba-white-slight mx-1"><i class="fa fa-twitter"></i></a></li>
              <li class="list-inline-item"><a class="btn-floating btn-sm rgba-white-slight mx-1"><i class="fa fa-instagram"></i></a></li>
            </ul>
          </div>

        </div>

      </div>

    </div>

  </footer>
  `,
  data: function () {
    return {

    }
  },
  methods: {

  }
})
