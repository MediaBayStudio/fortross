;(function() {
  let nextArrow = '<button type="button" class="arrow"></button>',
    prevArrow = '<button type="button" class="arrow"></button>',
    dot = '<button type="button" class="dot"></button>',

    // slickClass = 'slick-slider', // Для сокращения записи
    // unslickClass = 'unslick', // Для сокращения записи

// Функции slick для сокращения записи
// Чем больше слайдеров, тем актуальнее эти функции
    hasSlickClass = function($el) {
      return $el.hasClass('slick-slider');
    },
    unslick = function($el) {
      $el.slick('unslick');
    },

    // Слайдеры
    slidesSect = q('.slidesSect'),
    slides = qa('.slide', slidesSect),

    buildSlider = function() {
      let $slidesSect = $(slidesSect);
      // если ширина экрана больше 578px и слайдов меньше 4, то слайдера не будет
      if (media(mediaQueries.s) && slides.length < 4) {
        if (hasSlickClass($slidesSect)) {
          unslick($slidesSect);
        }
      // если ширина экрана больше 1440px и слайдов меньше 7, то слайдера не будет
      } else if (media(mediaQueries.xl) && slides.length < 7) {
        if (hasSlickClass($slidesSect)) {
          unslick($slidesSect);
        }
      // в других случаях делаем слайдер
      } else {
        if (hasSlickClass($slidesSect)) {
          // слайдер уже создан
          return;
        }
        if (slides.length && slides.length > 2) {
         $slidesSect.slick({
          // appendDots: $('eleme nt'),
          // appendArrows: $('element'),
          // autoplay: true,
          // autoplaySpeed: 3000,
          // adaptiveHeight: false,
          // asNavFor: $('element'),
          // centerMode: false,
          // centerPadding: '50px',
          // cssEase: 'ease',
          // draggable: true,
          // slide: 'selector',
          accessibility: false,
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          arrows: false, // true by default
          dots: true,
          dotsClass: '__dots dots',
          customPaging: function() {
            return dot;
          },
            mobileFirst: true,
            responsive: [{
              breakpoint: 575.98,
              settings: {
                slidesToScroll: 1,
                slidesToShow: 3
              }
            }, {
              breakpoint: 1439.98,
              settings: {
                slidesToScroll: 1,
                slidesToShow: 5
              }
            }]
          });
        }
      }

      onResizeFuncs[onResizeFuncs.length] = buildSlider;
    };

  // настройки grab курсора на всех слайдерах
  // $('.slick-list.draggable').on('mousedown', function() {
  //   $(this).addClass('grabbing');
  // });

  // $('.slick-list.draggable').on('beforeChange', function() {
  //   $(this).removeClass('grabbing');
  // });

  // $(document).on('mouseup', function() {
  //   $('.slick-list.draggable').removeClass('grabbing');
  // });


})();