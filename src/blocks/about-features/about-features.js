let aboutFeaturesSlider = q('.about-features');

if (aboutFeaturesSlider) {
  let $slidesSect = $(aboutFeaturesSlider),
    slidesSelector = '.about-feat',
    slides = qa(slidesSelector, aboutFeaturesSlider),
    counterCurrent = q('.about-features__counter-current', aboutFeaturesSlider.parentElement),
    counterTotal = q('.about-features__counter-total', aboutFeaturesSlider.parentElement),
    arrowSvg = '<svg class="arrow__svg" width="35" height="8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M34.354 3.646a.5.5 0 010 .708l-3.182 3.182a.5.5 0 11-.707-.708L33.293 4l-2.828-2.828a.5.5 0 11.707-.708l3.182 3.182zM0 3.5h34v1H0v-1z" fill="currentColor"/></svg>',
    buildAboutFeaturesSLider = function() {
      if (SLIDER.hasSlickClass($slidesSect)) {
        // слайдер уже создан
        return;
      }
      $slidesSect.slick({
        appendArrows: $('.about-features__arrows'),
        nextArrow: SLIDER.createArrow('about-features__next', arrowSvg),
        prevArrow: SLIDER.createArrow('about-features__prev', arrowSvg),
        infinite: false,
        mobileFirst: true,
        responsive: [{
          breakpoint: 575.98,
          settings: 'unslick'
        }]
      });
      // $slidesSect.slick({
      //   appendArrows: $('.about-features__arrows'),
      //   nextArrow: SLIDER.createArrow('about-features__next', arrowSvg),
      //   prevArrow: SLIDER.createArrow('about-features__prev', arrowSvg),
      //   slide: slidesSelector,
      //   infinite: false,
      //   // mobileFirst: true,
      //   // responsive: [{
      //   //   breakpoint: 575.98,
      //   //   settings: {
      //   //     slidesToShow: 4
      //   //   }
      //   // }]
      // });
    };

    console.log(buildAboutFeaturesSLider);

  $slidesSect.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
    counterCurrent.textContent = 1 + nextSlide;
  });

  counterCurrent.textContent = 1;
  counterTotal.textContent = slides.length;

  windowFuncs.resize.push(buildAboutFeaturesSLider);
}