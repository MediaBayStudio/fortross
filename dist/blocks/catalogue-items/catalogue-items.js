;
(function() {
  let sliders = qa('.catalogue-items.slider-view'),

    loadmoreBlocks = qa('.catalogue-items.loadmore-view'),

    catalogueHero = q('.catalogue-items-sect'),

    slidersLength = sliders.length,
    loadmoreBlocksLength = loadmoreBlocks.length;

  if (slidersLength && slidersLength > 0) {
    for (let i = 0; i < slidersLength; i++) {
      // Создаем слайдер только тогда, когда секция попала в область видимости
      sliders[i].addEventListener('lazyloaded', function() {
        let $slidesSect = $(sliders[i]),
          slides = qa('.catalogue-items__item', sliders[i]),
          sliderParent = sliders[i] && sliders[i].parentElement || this.parentElement,
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

  // console.log(loadmoreBlocksLength);

  // setTimeout(function() {
  // if (loadmoreBlocksLength && loadmoreBlocksLength > 0) {
  //   for (let i = 0; i < loadmoreBlocksLength; i++) {
  //     loadmoreBlocks[i].addEventListener('lazyloaded', function() {
  //       let childs = qa('.catalogue-items__item:not([style])', loadmoreBlocks[i]),
  //         targetHeight = 0,
  //         imagesCounter = 0;

  //       childs.forEach(function(child, j) {
  //         let childImg = q('.catalogue-item__img', child),
  //           src = childImg.getAttribute('data-src'),
  //           newImg = new Image();

  //         newImg.onload = function() {
  //           if (imagesCounter === 4) {
  //             loadmoreBlocks[i].style.maxHeight = targetHeight + 'px';
  //           }

  //           imagesCounter++;
  //           childImg.src = src;
  //           targetHeight += child.offsetHeight;
  //         };

  //         newImg.src = src;
  //       });
  //     });

  //     loadmoreBlocks[i].parentElement.addEventListener('click', function(e) {
  //       let target = e.target;
  //       if (target.classList.contains('catalogue-items-sect__loadmore')) {
  //         let visibleChilds = qa('.catalogue-items__item:not([style])', loadmoreBlocks[i]),
  //           hiddenChilds = qa('.catalogue-items__item[style]', loadmoreBlocks[i]),
  //           targetHeight = 0;

  //         for (let j = 0; j < 6; j++) {
  //           hiddenChilds[j].removeAttribute('style');
  //         }

  //         for (let k = 0, len = visibleChilds.length; k < len; k++) {
  //           targetHeight += visibleChilds[k].offsetHeight;
  //         }

  //         loadmoreBlocks[i].style.maxHeight = targetHeight + 'px';

  //       }
  //     });
  //   }
  // }
  // }, 2000);

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
})();