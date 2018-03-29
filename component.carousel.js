Vue.component('Carousel', {
  template: `
  <div id="carouselHeader" class="carousel slide" data-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img class="header d-block w-100" src="Assets/carousel1.jpg" alt="First slide">
      </div>
      <div class="carousel-item">
        <img class="header d-block w-100" src="Assets/carousel2.jpg" alt="Second slide">
      </div>
      <div class="carousel-item">
        <img class="header d-block w-100" src="Assets/carousel3.jpg" alt="Third slide">
      </div>
    </div>
    <a class="carousel-control-prev" href="#carouselHeader" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
    <a class="carousel-control-next" href="#carouselHeader" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
   </a>
  </div>
  `,
  data: function () {
    return {

    }
  },
  methods: {

  }
})
