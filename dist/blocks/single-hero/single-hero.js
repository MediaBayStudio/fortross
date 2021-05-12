(function() {
  let slider = q('.single-hero-sect__slider'),
    $slider = $(slider),
    pictures = qa('.single-hero-sect__pic', slider),
    images = qa('.single-hero-sect__pic > img', slider),
    arrow = '<svg class="arrow__svg" width="58" height="8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M57.354 4.354a.5.5 0 000-.708L54.172.464a.5.5 0 10-.707.708L56.293 4l-2.828 2.828a.5.5 0 10.707.708l3.182-3.182zM0 4.5h57v-1H0v1z" fill="currentColor"/></svg>',
    counter = q('.single-hero-sect__counter', slider.parentElement);

  for (let i = 0, len = images.length; i < len; i++) {
    if (images[i].parentElement.tagName === 'PICTURE') {
      let a = document.createElement('a');

      if (images[i].hasAttribute('data-fancybox-href')) {
        a.href = images[i].getAttribute('data-fancybox-href')  
      } else {
        if (images[i].hasAttribute('data-src')) {
          a.href = images[i].getAttribute('data-src');
        } else {
          a.href = images[i].currentSrc || images[i].src;
        }
      }

      a.classList.add('single-hero-sect__a');
      a.setAttribute('data-fancybox', 'single-gallery');
      slider.insertAdjacentElement('beforeend', a);
      a.appendChild(images[i].parentElement);
    }
  }

  if (pictures.length > 1) {
    $slider.on('init reInit afterChange', function(e, slick, currentSlide, nextSlide) {
      let number = (currentSlide ? currentSlide : 0) + 1;
      counter.textContent = number + '/' + (slick.slideCount - slick.options.slidesToShow + slick.options.slidesToScroll);
    });

    $slider.on('beforeChange', function(e, slick, currentSlide, nextSlide) {
      if (pictures[nextSlide].hasAttribute('style')) {
        pictures[nextSlide].removeAttribute('style');
        if (images[nextSlide].src === '#' && images[nextSlide].hasAttribute('data-src')) {
          images[nextSlide].src = images[nextSlide].getAttribute('data-src');
        }
      }
    });

    // $slider.on('init reInit afterChange', function(e, slick, currentSlide) {
    //   console.log(slick.$slides[currentSlide]);
    //   // slider.style.width = slick.$slides[currentSlide].offsetWidth + 'px';
    // });

    $slider.slick({
      infinite: false,
      fade: true,
      adaptiveHeight: true,
      // variableWidth: true,
      // slide: 'a.single-hero-sect__a',
      appendArrows: $('.single-hero-sect__nav'),
      prevArrow: SLIDER.createArrow('single-hero-sect__prev', arrow),
      nextArrow: SLIDER.createArrow('single-hero-sect__next', arrow)
    });
  }


})()