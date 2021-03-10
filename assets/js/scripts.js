var __c = function (selector) {
  return document.querySelector(selector);
};
var __id = function (selector) {
  return document.getElementById(selector);
};

/*****************************
  Homepage banner
******************************/ 
// Adjust Height
function autoHeight() {
  $winHeight = window.innerHeight;
  
  var autoHeight = document.querySelectorAll('.auto_height');

  if($winHeight > 520){
    // alert($winHeight)
    for (i = 0; i < autoHeight.length; i++) {
      autoHeight[i].style.minHeight = $winHeight - 1 + "px";
    }
  }
  else{
    for (i = 0; i < autoHeight.length; i++) {
      autoHeight[i].style.minHeight = "520px"
    }
  }
}
autoHeight();

// Window Resize
window.onresize = autoHeight;


// Jquery Staff
$('.testimonial__list').slick({
  slidesToShow: 1,
  arrows: false,
  dots: true,
  autoplay: true,
  autoplaySpeed: 7000,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 3
      }
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1
      }
    }
  ]
});

$('.single-item').slick({
  dots: true,
  arrows: false,
  infinite: false
});

$('.video').parent().click(function() {
  if($(this).children(".video").get(0).paused) { 
    $(this).children(".video").get(0).play();  
    $(this).children(".playpause").fadeOut('fast');
    $('.video').attr("controls", "");
  } else {       
    $(this).children(".video").get(0).pause();
    $(this).children(".playpause").fadeIn('fast');
    $('.video').removeAttr("controls", "");
  }
});



/***********************************************
  Scroll Horizontal in Project detail page
************************************************/ 
var $hs = $('.horizontal_scroll');
var $sLeft = 0;
var $hsw = $hs.outerWidth(true);

$( window ).resize(function() {
  $hsw = $hs.outerWidth(true);
});

function scrollMap($sLeft) {
  $hs.scrollLeft($sLeft);
}

$hs.on('mousewheel', function(e) {
  var $max = $hsw * 2 + (-e.originalEvent.wheelDeltaY);
  
  if ($sLeft > -1){
    $sLeft = $sLeft + (-e.originalEvent.wheelDeltaY);
  } else {
    $sLeft = 0;
  }

  if ($sLeft > $max) {
    $sLeft = $max;
  }
  
  if(($sLeft > 0) && ($sLeft < $max)) {
    e.preventDefault();
    e.stopPropagation(); 
  }
  scrollMap($sLeft);
});


// Scroll horizontal progress bar 
var horizontal_scroll = __c('.horizontal_scroll')
if(horizontal_scroll) {
  horizontal_scroll.addEventListener("scroll", () => {
    var scrollerWrapper = horizontal_scroll;
    scrollPercent = (scrollerWrapper.scrollLeft / (scrollerWrapper.scrollWidth - scrollerWrapper.clientWidth)) * 100;
    __id("scroll-progress").style.width = scrollPercent + "%";
  });
}

// Scroll drag horizontal
const slider = __c('.horizontal_scroll');
let isDown = false;
let startX;
let scrollLeft;

if(slider) {
  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
  });
  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
  });
  slider.addEventListener('mousemove', (e) => {
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 3; //scroll-fast
    slider.scrollLeft = scrollLeft - walk;
    // console.log(walk);
  });
}

var err = baguetteBox.run('.project_img_lists');


var App = (function () {
  //=== Use Strict ===//
  'use strict';
  //=== Private Variables ===//
  var gallery = $('#product_gallery');
  var zoomimg = $('.gallery__hero').zoom();
  
  //=== Gallery Object ===//
  var Gallery = {
    switch: function(trigger) {
      var src = trigger.attr('href'),
      thumbs = trigger.siblings(),
			img = trigger.parent().prev().children();
      
      // Add active class to thumb
      trigger.addClass('is-active');
      
      // Remove active class from thumbs
      thumbs.each(function() {
        if( $(this).hasClass('is-active') ) {
          $(this).removeClass('is-active');
        }
      });

      // Switch image source
      img.attr('src', src);
    }
  };

  //=== Public Methods ===//
  function init() {

   // Listen for clicks on anchors within gallery
    gallery.delegate('a', 'click', function(event) {
      var trigger = $(this);
      var triggerData = trigger.data("gallery");

      if ( triggerData === 'zoom') {
        var imgContainer = trigger.parent(),
        img = trigger.siblings();
        Gallery.zoom(imgContainer, img);
      } else if ( triggerData === 'thumb') {
        var imgContainer = trigger.parent().siblings();
        Gallery.switch(trigger, imgContainer);
      } else {
        return;
      }

      event.preventDefault();
    });
  }

  //=== Make Methods Public ===//
  return { init: init }

})();

App.init();