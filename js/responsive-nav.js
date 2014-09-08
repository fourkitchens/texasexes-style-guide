/* globals jQuery */

// Small handheld collpased navigation

(function ($) {
    'use strict';
    $(document).ready(function () {

    var pullNav                   = $('.pull-nav'),
        menu                      = $('.menu'), 
        pullSearch                = $('.pull-search'),
        search                    = $('.search'),
        toggler                   = function(a){
          $(this).toggleClass('active');
          a.data.toggled.animate({
            height: 'toggle',
            opacity: 'toggle'
            }, '500');
        };      
        pullNav.click({toggled : menu}, toggler);
        pullSearch.click({toggled : search}, toggler);
       });
})(jQuery);
