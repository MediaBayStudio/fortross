(function() {
  let catalogueHero = q('.catalogue-hero-sect');

  if (catalogueHero) {
    let catalogueItems = q('.catalogue-hero-sect__catalogue-wrap', catalogueHero),
      catalogueRight = q('.catalogue-hero-sect__catalogue-right', catalogueItems),
      catalogueLeft = q('.catalogue-hero-sect__catalogue-left', catalogueItems),
      buttons = qa('.catalogue-hero-sect__category', catalogueItems),
      line = q('.catalogue-hero-sect__catalogue-left-line', catalogueItems),
      arrow = '<svg class="arrow__svg" width="58" height="8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M57.354 4.354a.5.5 0 000-.708L54.172.464a.5.5 0 10-.707.708L56.293 4l-2.828 2.828a.5.5 0 10.707.708l3.182-3.182zM0 4.5h57v-1H0v1z" fill="currentColor"/></svg>',
      switchTab = function(e) {
        let target = e && e.target || q('a.active', catalogueItems);
        if (target.classList.contains('catalogue-hero-sect__category')) {
          e && e.preventDefault();
          let termID = target.getAttribute('data-term-id'),
            activeButton = q('.catalogue-hero-sect__category.active', catalogueItems),
            rightTarget = q('.catalogue-hero-sect__right-item[data-term-id="' + termID + '"]'),
            rightActive = q('.catalogue-hero-sect__right-item.active');

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
        target = target || q('.catalogue-hero-sect__category.active', catalogueItems);
        line.style.transform = 'translateY(' + (target.offsetHeight / 2 + target.offsetTop - 1) + 'px)';
      };

    if (catalogueRight && catalogueLeft) {
      catalogueItems.addEventListener('click', switchTab);
      moveLine();
      switchTab();
    }

    if (document.body.classList.contains('category-sale')) {
      let catalogue = qa('.catalogue-items__item', catalogueHero),
        productNameInput = id('product-name-inp'),
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
            // slide: '.catalogue-item__fancybox-link',
            appendArrows: $('.catalogue-item__nav', $(catalogue[i])),
            prevArrow: SLIDER.createArrow('catalogue-item__prev', arrow),
            nextArrow: SLIDER.createArrow('catalogue-item__next', arrow)
          });
        }
      }

      console.log(catalogue);
    }
  }
}())