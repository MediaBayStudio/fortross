;
(function() {
  // let setCatalogueItemsHeight = function() {
    // let items = qa('.catalogue-items .catalogue-item__img'),
      // width = items[0].offsetWidth;
    // items.forEach(item => item.style.height = width / item.getAttribute('data-intristicwidth') * item.getAttribute('data-intristicheight') + 'px');
  // };
  // setCatalogueItemsHeight();
  // window.addEventListener('resize', setCatalogueItemsHeight);


  // let itemsBLocks = qa('.catalogue-items');

  // itemsBLocks.forEach(function(item) {
  //   let heightCol1 = 0,
  //     heightCol2 = 0,
  //     heightCol3 = 0,
  //     childs = item.children;

  //   childs.forEach(function(child, i) {
  //     console.log(childs[i]);
  //     console.log(i);

  //     if (i === 0 || i % 3 === 0) {
  //       heightCol1 += childs[i].offsetHeight;
  //     } else {
  //       if (i === 1 || (i - 1) % 3 === 0) {
  //         heightCol2 += childs[i].offsetHeight;
  //       }
  //       if (i === 2 || (i + 1) % 3 === 0) {
  //         heightCol3 += childs[i].offsetHeight;
  //       }
  //     }
  //   });

  //   item.style.height = Math.max(heightCol1, heightCol2, heightCol3) + 'px';
  //   // console.log('heightCol1 ', heightCol1);
  //   // console.log('heightCol2 ', heightCol2);
  //   // console.log('heightCol3 ', heightCol3);

  // });


  // return;
  let sliders = qa('.catalogue-items.slider-view'),

    loadmoreBlocks = qa('.catalogue-items.loadmore-view'),

    catalogueHero = q('.catalogue-items-sect');

  // slidersLength = sliders.length,
  // loadmoreBlocksLength = loadmoreBlocks.length;

  //   checkColumns = function() {
  //     if (media('(min-width:767.98px) and (max-width:1023.98px)')) {
  //       return 2;
  //     } else if (media('(min-width:1023.98px)')) {
  //       return 3;
  //     }
  //   }

  // if (slidersLength && slidersLength > 0) {
  //   for (let i = 0; i < slidersLength; i++) {
  //     // Создаем слайдер только тогда, когда секция попала в область видимости
  //     sliders[i].addEventListener('lazyloaded', function() {
  //       let $slidesSect = $(sliders[i]),
  //         slides = qa('.catalogue-items__item', sliders[i]),
  //         sliderParent = sliders[i] && sliders[i].parentElement || this.parentElement,
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
  //               appendArrows: $('.catalogue-items-sect__nav', sliderParent),
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

  // if (loadmoreBlocksLength && loadmoreBlocksLength > 0) {
  //   for (let i = 0; i < loadmoreBlocksLength; i++) {
  //     let items = qa('.catalogue-items__item'),
  //       itemsLen = items.length;

  //     items.forEach(function(item, i) {

  //     });

  //   } // end for loadmoreBlicksLength
  // }

  if (catalogueHero) {
    let catalogueItems = q('.catalogue-items', catalogueHero),
      catalogueRight = q('.catalogue-items__right', catalogueItems),
      catalogueLeft = q('.catalogue-items__left', catalogueItems),
      buttons = qa('.catalogue-items__category', catalogueItems),
      line = q('.catalogue-items__left-line', catalogueItems),
      switchTab = function(e) {
        let target = e && e.target || q('.catalogue-items__category.active', catalogueItems);

        if (target.classList.contains('catalogue-items__category')) {
          e && e.preventDefault();
          let termID = target.getAttribute('data-term-id'),
            activeButton = q('.catalogue-items__category.active', catalogueItems),
            rightTarget = q('.catalogue-items__right-item[data-term-id="' + termID + '"]'),
            rightActive = q('.catalogue-items__right-item.active');

          if (target === activeButton) return;

          catalogueItems.classList.add('loading');

          setTimeout(function() {
            [activeButton, rightActive].forEach(el => el.classList.remove('active'));
            catalogueItems.classList.remove('loading');
            [target, rightTarget].forEach(el => el.classList.add('active'));
          }, 500);

          moveLine(target);
        }
      },
      moveLine = function(target) {
        target = target || q('.catalogue-items__category.active', catalogueItems);
        line.style.transform = 'translateY(' + (target.offsetHeight / 2 + target.offsetTop - 1) + 'px)';
      };

    if (catalogueRight && catalogueLeft) {
      catalogueItems.addEventListener('click', switchTab);
      moveLine();
      switchTab();
    }
  }

  if (q('[data-id="category-sale"]')) {
      let catalogue = qa('[data-id="category-sale"] .catalogue-items__item'),
        productNameInput = id('product-name-inp'),
        arrow = '<svg class="arrow__svg" width="58" height="8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M57.354 4.354a.5.5 0 000-.708L54.172.464a.5.5 0 10-.707.708L56.293 4l-2.828 2.828a.5.5 0 10.707.708l3.182-3.182zM0 4.5h57v-1H0v1z" fill="currentColor"/></svg>',
        productPopup = new Popup('.product-popup', {
          openButtons: '.catalogue-item__btn',
          closeButtons: '.product-popup__close'
        });


      productPopup.addEventListener('popupbeforeopen', function() {
        let caller = this.caller;

        if (caller) {
          let parent = caller.closest('.catalogue-items__item'),
            title = q('.catalogue-item__title', parent);
          productNameInput.value = title.textContent;
        }
      });

      for (let i = 0, len = catalogue.length; i < len; i++) {
        $catalogue = $(catalogue[i]);
        let slides = qa('.catalogue-item__fancybox-link', catalogue[i]);

        $('[data-fancybox="gallery-' + i + '"]').fancybox({
          beforeClose: function(e, instance, slide) {
            if (slides.length && slides.length > 1) {
              $('[data-slick="slider-' + i + '"]', $catalogue).slick('slickGoTo', e.currIndex);
            }
          }
        });

        if (qa('.catalogue-item__fancybox-link').length > 1) {
          let counter = q('.catalogue-item__counter', catalogue[i]);

          $('[data-slick="slider-' + i + '"]').on('init reInit afterChange', function(e, slick, currentSlide, nextSlide) {
            let number = (currentSlide ? currentSlide : 0) + 1;
            counter.textContent = number + '/' + (slick.slideCount - slick.options.slidesToShow + slick.options.slidesToScroll);
          });

          $('[data-slick="slider-' + i + '"]').slick({
            infinite: false,
            draggable: false,
            // slide: '.catalogue-item__fancybox-link',
            appendArrows: $('.catalogue-item__nav', $(catalogue[i])),
            prevArrow: SLIDER.createArrow('catalogue-item__prev', arrow),
            nextArrow: SLIDER.createArrow('catalogue-item__next', arrow)
          });
        }
      }

      console.log(catalogue);
    }
})();