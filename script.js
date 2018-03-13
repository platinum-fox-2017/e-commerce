$(document).ready(function(){
  var scrollTop = 0;
  $(window).scroll(function(){
    scrollTop = $(window).scrollTop();

    if (scrollTop >= 100) {
      $('#global-nav').addClass('scrolled-nav');
      $("#title-image").attr("src","Assets/arduino logo only white.png");
    } else if (scrollTop < 100) {
      $('#global-nav').removeClass('scrolled-nav');
      $("#title-image").attr("src","Assets/arudinoLogo White.png");
    }

  });

});

var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        itemsList: [
            {
                name:'Arduino Uno Rev3',
                description:'The UNO is the best board to get started with electronics and coding. If this is your first experience tinkering with the platform, the UNO is the most robust board you can start playing with.',
                price:25,
                imageUrl:'Assets/Catalog/a000066_featured.jpg'
            },
            {
                name:'Arduino Mega 2560 Rev3',
                description:'The MEGA 2560 is designed for more complex projects. With 54 digital I/O pins, 16 analog inputs and a larger space for your sketch it is the recommended board for 3D printers and robotics projects.',
                price:38.5,
                imageUrl:'Assets/Catalog/a000067_front_2_1.jpg'
            },
            {
                name:'Arduino MKR1000 WIFI with Headers Mounted',
                description:'Arduino MKR1000 is a powerful board that combines the functionality of the Zero and the Wi-Fi Shield. It is the ideal solution for makers wanting to design IoT projects with minimal previous experience in networking.',
                price:36.99,
                imageUrl:'Assets/Catalog/abx00011_featured.jpg'
            },
            {
                name:'Arduino MKR IoT Bundle',
                description:'The MKR IoT Bundle is a great way to get started with the Internet of Things!',
                price:69,
                imageUrl:'Assets/Catalog/akx00006_featured_1.jpg'
            },
            {
                name:'Arduino Starter Kit Multi-language',
                description:'The UNO is the best board to get started with electronics and coding. If this is your first experience tinkering with the platform, the UNO is the most robust board you can start playing with.',
                price:87.99,
                imageUrl:'Assets/Catalog/k000007_featured_3.jpg'
            },
            {
                name:'Arduino MKR ZERO (I2S bus & SD for sound, music & digital audio data)',
                description:'The Starter Kit is a great way to get started with Arduino, coding and electronics! The Starter Kit includes the components you need to make 15 fun projects following the step-by-step tutorials on the Project Book.',
                price:21.9,
                imageUrl:'Assets/Catalog/ABX00012_featured_2.jpg'
            },
        ]
    },
    computed: {
        pricePrint: () => {
            return `$${this.price.toFixed(2)}`
        }
    },

})
