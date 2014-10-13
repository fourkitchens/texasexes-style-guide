(function ($) {
  'use strict';
  $(document).ready(function () {

    $('.posts').children().hover(function() {
      $(this).siblings().stop().fadeTo(500,0.6);
    }, function() {
      $(this).siblings().stop().fadeTo(500,1);
    });
    $('.fade ul').children().hover(function() {
      $(this).siblings().stop().fadeTo(500,0.6);
    }, function() {
      $(this).siblings().stop().fadeTo(500,1);
    });
    var trigger             = $('.toggle'),
      toggleItem            = $('.toggle-it'),
      toggler               = function(a){
        $(this).toggleClass('active');
        a.data.toggled.slideToggle(200);
      };
      trigger.click({toggled : toggleItem}, toggler);
  });
})(jQuery);

