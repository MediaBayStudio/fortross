var
  // Размреы экранов для медиазапросов
  mediaQueries = {
    's': '(min-width:575.98px)',
    'm': '(min-width:767.98px)',
    'lg': '(min-width:1023.98px)',
    'xl': '(min-width:1439.98px)'
  },
  SLIDER = {
    nextArrow: '<button type="button" class="arrow"></button>',
    prevArrow: '<button type="button" class="arrow"></button>',
    dot: '<button type="button" class="dot"></button>',
    hasSlickClass: function($el) {
      return $el.hasClass('slick-slider');
    },
    unslick: function($el) {
      $el.slick('unslick');
    },
    createArrow: function(className, inside) {
      className = (className.indexOf('prev') === -1 ? 'next ' : 'prev ') + className;
      return '<button type="button" class="arrow arrow_' + className + '">' + inside + '</button>';
    },
    setImages: function(slides) {
      for (let i = 0, len = slides.length; i < len; i++) {
        let img = q('img', slides[i]);
        // Если элемент найден и он без display:none
        if (img && img.offsetParent) {
          img.src = img.getAttribute('data-lazy') || img.getAttribute('data-src');
        }
      }
    }
  },
  // // Определяем бразуер пользователя
  // browser = {
  //   // Opera 8.0+
  //   isOpera: (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0,
  //   // Firefox 1.0+
  //   isFirefox: typeof InstallTrigger !== 'undefined',
  //   // Safari 3.0+ "[object HTMLElementConstructor]"
  //   isSafari: /constructor/i.test(window.HTMLElement) || (function(p) {
  //     return p.toString() === "[object SafariRemoteNotification]";
  //   })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification)),
  //   // Internet Explorer 6-11
  //   isIE: /*@cc_on!@*/ false || !!document.documentMode,
  //   // Edge 20+
  //   isEdge: !( /*@cc_on!@*/ false || !!document.documentMode) && !!window.StyleMedia,
  //   // Chrome 1+
  //   isChrome: !!window.chrome && !!window.chrome.webstore,
  //   isYandex: !!window.yandex,
  //   isMac: window.navigator.platform.toUpperCase().indexOf('MAC') >= 0
  // },
  /*
Объединение слушателей для window на события 'load', 'resize', 'scroll'
Все слушатели на окно следует задавать через него, например:
  window.resize.push(functionName)
Все ф-ии, добавленные в [] window.resize, будут заданы одним слушателем
*/
  windowFuncs = {
    load: [],
    resize: [],
    scroll: [],
    call: function(event) {
      let funcs = windowFuncs[event.type] || event;
      for (let i = funcs.length - 1; i >= 0; i--) {
        console.log(funcs[i].name);
        funcs[i]();
      }
    }
  },

  mask, // ф-я маски телефонов в поля ввода (в файле telMask.js)
  lazy,
  menu,
  burger,
  hdr,
  overlay,
  body,
  // templateDir,
  // siteUrl,
  fakeScrollbar,
  // Сокращение записи querySelector
  q = function(selector, element) {
    element = element || document.body;
    return element.querySelector(selector);
  },
  // Сокращение записи querySelectorAll + перевод в массив
  qa = function(selectors, element, toArray) {
    element = element || document.body;
    return toArray ? Array.prototype.slice.call(element.querySelectorAll(selectors)) : element.querySelectorAll(selectors);
  },
  // Сокращение записи getElementById
  id = function(selector) {
    return document.getElementById(selector);
  },
  // Фикс 100% высоты экрана для моб. браузеров
  setVh = function() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
  },
  // Сокращение записи window.matchMedia('query').matches
  media = function(media) {
    return window.matchMedia(media).matches;
  },
  // Функция создания мобильного меню
  mobileMenu,
  // Прокрутка до элемента при помощи requestAnimationFrame
  scrollToTarget = function(e, target) {
    e.preventDefault();

    if (this === window) {
      _ = e.target;
    } else {
      _ = this;
    }

    if (target == 0) {
      target = body;
    } else {
      target = target || _.getAttribute('data-scroll-target');
    }

    if (!target && _.tagName === 'A') {
      target = q(_.getAttribute('href'));
    }

    if (target.constructor === String) {
      target = q(target);
    }

    if (!target) {
      console.warn('Scroll target not found');
      return;
    }

    menu && menu.close();

    let wndwY = window.pageYOffset,
      targetStyles = getComputedStyle(target),
      targetTop = target.getBoundingClientRect().top - +(targetStyles.paddingTop).slice(0, -2) - +(targetStyles.marginTop).slice(0, -2),
      start = null,
      V = .35,
      step = function(time) {
        if (start === null) {
          start = time;
        }
        let progress = time - start,
          r = (targetTop < 0 ? Math.max(wndwY - progress / V, wndwY + targetTop) : Math.min(wndwY + progress / V, wndwY + targetTop));

        window.scrollTo(0, r);

        if (r != wndwY + targetTop) {
          requestAnimationFrame(step);
        }
      }

    requestAnimationFrame(step);
  },
  // Функция запрета/разрешения прокрутки страницы
  pageScroll = function(disallow) {
    fakeScrollbar.classList.toggle('active', disallow);
    document.body.classList.toggle('no-scroll', disallow);
    document.body.style.paddingRight = disallow ? fakeScrollbar.offsetWidth - fakeScrollbar.clientWidth + 'px' : '';
  },
  // Функция липкого элемента средствами js
  sticky = function($el, fixThresholdDir, className) {
    $el = typeof $el === 'string' ? q($el) : $el;
    className = className || 'fixed';
    fixThresholdDir = fixThresholdDir || 'bottom';

    let fixThreshold = $el.getBoundingClientRect()[fixThresholdDir] + pageYOffset,
      $elClone = $el.cloneNode(true),
      $elParent = $el.parentElement,
      fixElement = function() {
        if (!$el.classList.contains(className) && pageYOffset >= fixThreshold) {
          $elParent.appendChild($elParent.replaceChild($elClone, $el));
          $el.classList.add(className);

          window.removeEventListener('scroll', fixElement);
          window.addEventListener('scroll', unfixElement);
        }
      },
      unfixElement = function() {
        if ($el.classList.contains(className) && pageYOffset <= fixThreshold) {
          $elParent.replaceChild($el, $elClone);
          $el.classList.remove(className);

          window.removeEventListener('scroll', unfixElement);
          window.addEventListener('scroll', fixElement);
        }
      };

    $elClone.classList.add('clone');
    fixElement();
    window.addEventListener('scroll', fixElement);
  };
  // Подключение полифиллов
  // setPolyfills = function() {
  //   // Название полифилла : условие
  //   let polyfills = {
  //       'custom-events': typeof window.CustomEvent !== 'function',
  //       'intersection-observer': 'IntersectionObserver' in window === false,
  //       'closest': !Element.prototype.closest,
  //       'svg4everybody': browser.isIE,
  //       'picturefill': !window.HTMLPictureElement
  //     },
  //     scriptText = '',
  //     url = templateDir + '/js-polyfills.php',
  //     getParams = [],
  //     okEvent = function() {
  //       document.head.dispatchEvent(new CustomEvent('loadpolyfills'));
  //     };

  //   document.head.addEventListener('loadpolyfills', function() {
  //     console.log('Все полифиллы загружены');
  //     lazy = new lazyload({
  //       // clearSrc: true,
  //       // clearMedia: true
  //     });
  //     window.svg4everybody && svg4everybody();
  //   });

  //   for (let name in polyfills) {
  //     // Проверяем услвоие
  //     if (polyfills[name]) {
  //       getParams[getParams.length] = name + '.min.js';
  //       console.log('Будет загружен ' + name);
  //     }
  //   }

  //   if (getParams.length > 0) {
  //     let xhr = new XMLHttpRequest();

  //     xhr.open('GET', url + '?polyfills=' + getParams.join('|'));
  //     xhr.send();

  //     xhr.addEventListener('readystatechange', function() {
  //       if (xhr.readyState === 4 && xhr.status === 200) {
  //         scriptText = xhr.response;

  //         let script = document.createElement('script');

  //         script.text = scriptText;

  //         document.head.appendChild(script).parentNode.removeChild(script);
  //         // document.head.appendChild(script);

  //         okEvent();
  //       }
  //     });
  //   } else {
  //     okEvent();
  //   }
  // };