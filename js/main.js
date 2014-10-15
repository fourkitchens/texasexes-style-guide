(function ($) {
  'use strict';
  $(document).ready(function() {
      $('#main-menu-toggle').on('touchstart', function (e) {
        if ($('+ .menu', this).toggle().is(':visible')) {
          $('#main-menu-toggle').addClass('active');
        } else {
          $('#main-menu-toggle').removeClass('active');
        }
        e.preventDefault();
      });
      $('#main-menu-toggle').parent().on('mouseenter', function (e) {
        $('> .menu', this).show();
        $('#main-menu-toggle').addClass('active');
        e.preventDefault();
      });
      $('#main-menu-toggle').parent().on('mouseleave', function (e) {
        $('> .menu', this).hide();
        $('#main-menu-toggle').removeClass('active');
        e.preventDefault();
      });
  });
})(jQuery);
