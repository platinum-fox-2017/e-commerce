var vid = Vue.component('vid' , {
  template: `
  <div class="container" id="video-contain">
      <video autoplay muted loop class="video-responsive" object-fit= "cover" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen type="video/mp4" src="./assets/images/hp-video.one-shot-ellen.mp4" ></video>    
      <div class="video-text">
          <div class="heading">
              <h1>One shot.</h1>
              <h1>Make it count.</h1>
          </div>
          <div class="sub-heading">
              <h5>The Polaroid OneStep 2 is a new instant camera</h5>
              <h5>anyone can use to make every day stand out.</h5>
          </div>
      </div>
  </div>
  `
})