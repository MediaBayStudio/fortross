
let indexBrandsItems = qa('.catalogue-items-sect[data-id=brands] > .catalogue-items, .catalogue-items-sect[data-id=related-items] > .catalogue-items'),
  catalogueHero = q('.catalogue-items-sect'),
  indexBrandsItemsLength = indexBrandsItems.length;

if (indexBrandsItemsLength && indexBrandsItemsLength > 0) {
  for (let i = 0; i < indexBrandsItemsLength; i++) {
    // Создаем слайдер только тогда, когда секция попала в область видимости
    indexBrandsItems[i].addEventListener('lazyloaded', function() {
      let $slidesSect = $(indexBrandsItems[i]),
        slides = qa('.catalogue-items__item', indexBrandsItems[i]),
        sliderParent = indexBrandsItems[i] && indexBrandsItems[i].parentElement || this.parentElement,
        counter = q('.catalogue-items-sect__counter', sliderParent),
        arrowSvg = '<svg class="arrow__svg" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M34.3536 4.35355c.1952-.19526.1952-.51184 0-.70711L31.1716.464463c-.1953-.195262-.5119-.195262-.7071 0-.1953.195263-.1953.511845 0 .707107L33.2929 4l-2.8284 2.82842c-.1953.19527-.1953.51185 0 .70711.1952.19526.5118.19526.7071 0l3.182-3.18198zM4e-8 4.5H34v-1H-4e-8l8e-8 1z" fill="currentColor"/></svg>',
        buildBrandsSlider = function() {
          if (media('(min-width:575.98px) and (max-width:1023.98px)') && slides.length < 5 || media('(min-width:1023.98px)') && slides.length < 4 || media('(max-width:575.98px)')) {
            counter.style.display = 'none';
            if (SLIDER.hasSlickClass($slidesSect)) {
              SLIDER.unslick($slidesSect)
            }
            // в других случаях делаем слайдер
          } else {
            counter.style.display = 'flex';
            if (SLIDER.hasSlickClass($slidesSect)) {
              // слайдер уже создан
              return;
            }
            $slidesSect.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
              let number = (currentSlide ? currentSlide : 0) + 1;
              counter.textContent = number + '/' + (slick.slideCount - slick.options.slidesToShow + slick.options.slidesToScroll);
            });

            $slidesSect.slick({
              appendArrows: $('.catalogue-items-sect__nav', sliderParent),
              prevArrow: SLIDER.createArrow('catalogue-items-sect__prev', arrowSvg),
              nextArrow: SLIDER.createArrow('catalogue-items-sect__next', arrowSvg),
              infinite: false,
              rows: 2,
              slidesPerRow: 2,
              variableWidth: true,
              mobileFirst: true,
              responsive: [{
                breakpoint: 1023.98,
                settings: {
                  slidesToShow: 3,
                  rows: 1,
                  slidesPerRow: 1
                }
              }]
            });
          }
        };

      buildBrandsSlider();
      window.addEventListener('resize', buildBrandsSlider);
    });
  }
}

if (catalogueHero) {
  let catalogueRight = q('.catalogue-items__right', catalogueHero),
    catalogueLeft = q('.catalogue-items__left', catalogueHero),
    buttons = qa('.catalogue-items__category', catalogueHero),
    line = q('.catalogue-items__left-line', catalogueHero),
    switchTab = function(e) {
      let target = e && e.target || q('.catalogue-items__category.active', catalogueHero);
      if (target.classList.contains('catalogue-items__category')) {
        e && e.preventDefault();
        let termID = target.getAttribute('data-term-id'),
          targetHeight = target.offsetHeight,
          activeButton = q('.catalogue-items__category.active', catalogueHero),
          rightTarget = q('.catalogue-items__right-item[data-term-id="' + termID + '"]'),
          rightActive = q('.catalogue-items__right-item.active');

        [activeButton, rightActive].forEach(el => el.classList.remove('active'));

        [target, rightTarget].forEach(el => el.classList.add('active'));

        line.style.transform = 'translateY(' + (targetHeight / 2 + target.offsetTop - 1) + 'px)';

        history.pushState('', target.textContent, target.href);

      }
    };

  if (catalogueRight && catalogueLeft) {
    catalogueHero.addEventListener('click', switchTab);

    switchTab();
  }
}

// if (relatedItemsLength && relatedItemsLength > 0) {
//   for (let i = 0; i < relatedItemsLength; i++) {
//     // Создаем слайдер только тогда, когда секция попала в область видимости
//     relatedItems[i].addEventListener('lazyloaded', function() {
//       let $slidesSect = $(relatedItems[i]),
//         slides = qa('.catalogue-items__item', relatedItems[i]),
//         sliderParent = relatedItems[i] && relatedItems[i].parentElement || this.parentElement,
//         counter = q('.catalogue-items-sect__counter', sliderParent),
//         arrowSvg = '<svg class="arrow__svg" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M34.3536 4.35355c.1952-.19526.1952-.51184 0-.70711L31.1716.464463c-.1953-.195262-.5119-.195262-.7071 0-.1953.195263-.1953.511845 0 .707107L33.2929 4l-2.8284 2.82842c-.1953.19527-.1953.51185 0 .70711.1952.19526.5118.19526.7071 0l3.182-3.18198zM4e-8 4.5H34v-1H-4e-8l8e-8 1z" fill="currentColor"/></svg>',
//         buildBrandsSlider = function() {
//           if (media('(min-width:575.98px) and (max-width:1023.98px)') && slides.length < 5 || media('(min-width:1023.98px)') && slides.length < 4 || media('(max-width:575.98px)')) {
//             counter.style.display = 'none';
//             if (SLIDER.hasSlickClass($slidesSect)) {
//               SLIDER.unslick($slidesSect)
//             }
//             // в других случаях делаем слайдер
//           } else {
//             counter.style.display = 'flex';
//             if (SLIDER.hasSlickClass($slidesSect)) {
//               // слайдер уже создан
//               return;
//             }
//             $slidesSect.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
//               let number = (currentSlide ? currentSlide : 0) + 1;
//               counter.textContent = number + '/' + (slick.slideCount - slick.options.slidesToShow + slick.options.slidesToScroll);
//             });

//             $slidesSect.slick({
//               appendArrows: $(sliderParent),
//               prevArrow: SLIDER.createArrow('catalogue-items-sect__prev', arrowSvg),
//               nextArrow: SLIDER.createArrow('catalogue-items-sect__next', arrowSvg),
//               infinite: false,
//               rows: 2,
//               slidesPerRow: 2,
//               variableWidth: true,
//               mobileFirst: true,
//               responsive: [{
//                 breakpoint: 1023.98,
//                 settings: {
//                   slidesToShow: 3,
//                   rows: 1,
//                   slidesPerRow: 1
//                 }
//               }]
//             });
//           }
//         };

//       buildBrandsSlider();
//       window.addEventListener('resize', buildBrandsSlider);
//     });
//   }
// }
