let indexHeroSlider = q('.index-hero-sect__slider');

if (indexHeroSlider) {
  let $slidesSect = $(indexHeroSlider),
    makeSlideVisible = function(parent) {
      let pictures = qa('picture', parent);

      for (let i = 0, len = pictures.length; i < len; i++) {
        pictures[i].removeAttribute('style');
      }
    },
    buildHeroSlider = function() {

      if (SLIDER.hasSlickClass($slidesSect)) {
        // слайдер уже создан
        return;
      }
      $slidesSect.slick({
        appendDots: $('.index-hero-sect__dots'),
        autoplay: true,
        autoplaySpeed: 7000,
        pauseOnFocus: false,
        pauseOnHover: false,
        fade: true,
        draggable: false,
        swipe: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        customPaging: function() {
          return '<button type="button" class="dot"></button>';
        },
      });
    };

  $slidesSect.on('init', function(event, slick) {
    if (media('(min-width:767.98px)')) {
      makeSlideVisible(slick.$slides[0]);
    }
  });

  $slidesSect.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
    if (currentSlide !== nextSlide) {
      makeSlideVisible(slick.$slides[nextSlide]);
    }
  });

  windowFuncs.resize.push(buildHeroSlider);
}