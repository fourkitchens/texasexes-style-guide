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
      
        // We can skip this whole setup if there is no sidebar nav:
        if ($('.pane-menu-block-txex-menus-1, .pane-og-menu-og-single-menu-block').length === 0) {
          $('#menu-sidenav-collapse').remove();
          return;
        }

        // If the menu isn't visible, mark the button as active and add the
        // minimize class on the sidebar. This is confusingly worded, but checks
        // for existence _and_ visibility of the main _or_ chapter menu because
        // .is(':visible') will return false for a nonexistent element.
        if (($('.pane-menu-block-txex-menus-1').length && $('.pane-menu-block-txex-menus-1').is(':visible') === false) || ($('.pane-og-menu-og-single-menu-block').length && $('.pane-og-menu-og-single-menu-block').is(':visible') === false)) {
          $('#menu-sidenav-collapse').removeClass('active').closest('.sidebar').addClass('minimized');
        }

        // Add a click trigger to toggle the menu and classes on the button/sidebar
        $('#menu-sidenav-collapse').on('click', function (e) {
          if ($('+ .pane-menu-block-txex-menus-1, + .pane-og-menu-og-single-menu-block', this).toggle().is(':visible')) {
            $(this).addClass('active').closest('.sidebar').removeClass('minimized');
          } else {
            $(this).removeClass('active').closest('.sidebar').addClass('minimized');
          }
          e.preventDefault();
        });

  });
})(jQuery);
