$(document).ready(function(){
  var scrollTop = 0;
  $(window).scroll(function(){
    scrollTop = $(window).scrollTop();
     $('.counter').html(scrollTop);

    if (scrollTop >= 100) {
      $('#global-nav').addClass('scrolled-nav');
      $("#title-image").attr("src","Assets/arduino logo only white.png");
    } else if (scrollTop < 100) {
      $('#global-nav').removeClass('scrolled-nav');
      $("#title-image").attr("src","Assets/arudinoLogo White.png");
    }

  });

});

$('.search').hover(function () {
   $('#search-bar').show();
}, function () {
   $('#search-bar').hide();
});

$('#search-bar').hide();
