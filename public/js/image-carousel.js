// Carousel it
$(document).ready(function(){
  $('.slick').slick({
    autoplay: true,
    infinite: true,
    speed: 300
  });
});

function slickLowStress() {
  $('.slick').slickPlay();
  // $('.slick').slickSetOption(autoplay, true, refresh);
};

function slickModerateStress() {
  $('.slick').slickFilter(':even');
};

function slickSevereStress() {
  $('.slick').slickGoTo(0).slickPause();
  navigator.vibrate([1000, 500, 1000, 500, 1000, 500]); // vibrate, pause...
};