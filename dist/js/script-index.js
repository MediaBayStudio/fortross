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
document.addEventListener('DOMContentLoaded', function() {
(function() {
  mobileMenu = function(_) {
    let setMenuStyles = function(trf, trs) {
        let args = [trf, trs],
          props = ['transform', 'transition'],
          values = ['translate3d(' + trf + ', 0px, 0px)', 'transform ' + trs];

        for (let i = args.length - 1; i >= 0; i--) {
          if (args[i] !== 0) {
            if (args[i] === '') {
              args[i] = '';
            } else {
              args[i] = values[i];
            }
            menuCnt.style[props[i]] = args[i];
          }
        }
      },
      checkForString = function(variable) {
        return variable.constructor === String ? q(variable) : variable;
      },
      openMenu = function() {
        if (!opened) {
          if (menu.hasAttribute('style')) {
            menu.removeAttribute('style');
            menu.offsetHeight;
          }
          menu.classList.add('active');
          openBtn.classList.add('active');
          menuCnt.scrollTop = 0;

          if (!fade) {
            setMenuStyles('0px', '.5s');
            menuWidth = menuCnt.offsetWidth;
          }
          if (!allowPageScroll) {
            pageScroll(true);
          }
        }
      },
      closeMenu = function(e, forSwipe) {
        if (opened) {
          let target = e && e.target;
          // Если меню открыто и произошел свайп или нет события (закрыто вызовом функции close()) или есть евент и его св-ва
          if (forSwipe || !e || (e.type === 'keyup' && e.keyCode === 27 || target === menu || target === closeBtn)) {
            menu.classList.remove('active');
            openBtn.classList.remove('active');

            if (!fade) {
              setMenuStyles(initialTransformX, '.5s');
            }
          }
        }
      },
      swipeStart = function(e) {
        if (allowSwipe) {
          let evt = e.touches[0] || window.e.touches[0];

          isSwipe = isScroll = false;
          posInitX = posX1 = evt.clientX;
          posInitY = posY1 = evt.clientY;
          swipeStartTime = Date.now();

          menuCnt.addEventListener('touchend', swipeEnd);
          menuCnt.addEventListener('touchmove', swipeAction);
          setMenuStyles(0, '');
        }
      },
      swipeAction = function(e) {
        if (allowSwipe) {
          let evt = e.touches[0] || window.e.touches[0],
            style = menuCnt.style.transform,
            transform = +style.match(trfRegExp)[0];

          posX2 = posX1 - evt.clientX;
          posX1 = evt.clientX;

          posY2 = posY1 - evt.clientY;
          posY1 = evt.clientY;

          // Если еще не определено свайп или скролл (двигаемся в бок или вверх/вниз)
          if (!isSwipe && !isScroll) {
            let posY = Math.abs(posY2),
              posX = Math.abs(posX2);

            if (posY > 7 || posX2 === 0) {
              isScroll = true;
            } else if (posY < 7) {
              isSwipe = true;
            }
          }

          if (isSwipe) {
            // Если двигаемся влево или вправо при уже открытом меню, фиксируем позицию
            if ((toLeft && posInitX > posX1) || (toRight && posInitX < posX1)) {
              setMenuStyles('0px', 0);
              return;
            }
            setMenuStyles(transform - posX2 + 'px', 0);
          }
        }
      },
      swipeEnd = function(e) {
        posFinal = posInitX - posX1;

        let absPosFinal = Math.abs(posFinal);

        swipeEndTime = Date.now();

        if (absPosFinal > 1 && isSwipe) {
          if (toLeft && posFinal < 0 || toRight && posFinal > 0) {
            if (absPosFinal >= menuWidth * swipeThreshold || swipeEndTime - swipeStartTime < 300) {
              closeMenu(e, true);
            } else {
              opened = false;
              openMenu(e, true);
            }
          }
          allowSwipe = false;
        }

        menu.removeEventListener('touchend', swipeEnd);
        menu.removeEventListener('touchmove', swipeAction);

      },
      transitionEnd = function(e) {
        if (e.target !== menu || e.pseudoElement) {
          return;
        }
        if (fade) {
          if (/*e.propertyName === 'opacity' || */e.propertyName === 'width') {
            transitionEndEvents();
          }
        } else {
          if (e.propertyName === 'transform') {
            transitionEndEvents();
          }
        }
        allowSwipe = true;
      },
      transitionEndEvents = function() {
        console.log('transitionEndEvents');
        if (opened) {
          menu.isOpened = opened = false;
          openBtn.addEventListener('click', openMenu);
          closeBtn.removeEventListener('click', closeMenu);
          if (!allowPageScroll) {
            pageScroll(false);
          }
          sticky(hdr);

          menu.classList.add('closed');
          menu.classList.remove('opened');
        } else {
          menu.isOpened = opened = true;
          openBtn.removeEventListener('click', openMenu);
          closeBtn.addEventListener('click', closeMenu);

          menu.classList.add('opened');
          menu.classList.remove('closed');
        }
      },
      init = function() {
        menu = checkForString(_.menu);
        menuCnt = checkForString(_.menuCnt);
        openBtn = checkForString(_.openBtn);
        closeBtn = checkForString(_.closeBtn);
        allowPageScroll = options.allowPageScroll;
        toRight = options.toRight;
        toLeft = options.toLeft;
        initialTransformX = toLeft ? '100%' : toRight ? '-100%' : 0;
        fade = options.fade;

        setListeners('add');

        if (fade) {
          toRight = toLeft = false;
        } else {
          setMenuStyles(initialTransformX, 0);
          menu.addEventListener('touchstart', swipeStart);
        }
        menu.isOpened = false;
      },
      setListeners = function(action) {
        openBtn[action + 'EventListener']('click', openMenu);
        menu[action + 'EventListener']('click', closeMenu);
        menu[action + 'EventListener']('transitionend', transitionEnd);
        document[action + 'EventListener']('keyup', closeMenu);
      },
      destroy = function() {
        if (opened) {
          closeMenu();
        }

        if (fade) {
          toRight = toLeft = false;
        } else {
          setMenuStyles('', '');
          menu.removeEventListener('touchstart', swipeStart);
        }

        setListeners('remove');
        menu = null;
        menuCnt = null;
        openBtn = null;
        closeBtn = null;
      },
      applyMediaParams = function() {
        // console.log('applyMediaParams');
        if (targetMediaQuery) {
          // console.log('set ' + targetMediaQuery + ' params');
          for (let option in responsive[targetMediaQuery]) {
            options[option] = responsive[targetMediaQuery][option];
          }
          currentMediaQuery = targetMediaQuery;
        } else { // set initial params
          for (let option in initialOptions) {
            options[option] = initialOptions[option];
          }
          currentMediaQuery = null;
        }
        if (menu) {
          destroy();
          init();
        }
      },
      checkMedia = function() {
        if (responsive) {
          targetMediaQuery = null;
          for (let mediaQuery in responsive) {
            if (media(mediaQuery)) {
              targetMediaQuery = mediaQuery;
            }
          }
          if (targetMediaQuery !== currentMediaQuery) {
            applyMediaParams();
          }
        }
        if (!menu) {
          init();
        }
      },
      options = JSON.parse(JSON.stringify(_)),
      initialOptions = JSON.parse(JSON.stringify(_)),
      responsive = _.responsive,
      targetMediaQuery = null,
      currentMediaQuery = null,
      menu,
      menuCnt,
      openBtn,
      closeBtn,
      swipeStartTime,
      swipeEndTime,
      allowPageScroll,
      swipeThreshold = 0.5,
      toRight,
      toLeft,
      initialTransformX,
      fade,
      startPageY = pageYOffset,
      trfRegExp = /([-0-9.]+(?=px))/,
      isSwipe = false,
      isScroll = false,
      allowSwipe = false,
      opened = false,
      posX1 = 0,
      posX2 = 0,
      posY1 = 0,
      posY2 = 0,
      posInitX = 0,
      posInitY = 0,
      posFinal = 0,
      menuWidth = 0;

    if (_.menu) {
      // Элементы не изменяются через responsive
      checkMedia();

      windowFuncs.resize.push(checkMedia);

      // Если разрешена прокрутка, то закрываем при прокрутке
      // if (allowPageScroll) {
      //   windowFuncs.scroll.push(closeMenu);
      // }

      return {
        options: options,
        menu: menu,
        menuCnt: menuCnt,
        openBtn: openBtn,
        closeBtn: closeBtn,
        open: openMenu,
        close: closeMenu,
        destroy: destroy,
        opened: opened
      };
    }
  };
})();

body = document.body;
// templateDir = body.getAttribute('data-template-directory-uri');
// siteUrl = body.getAttribute('data-site-url');
;(function() {
  let setCursorPosition = function(pos, inputElement) {
    inputElement.focus();
    if (inputElement.setSelectionRange) {
      inputElement.setSelectionRange(pos, pos);
    } else if (inputElement.createTextRange) {
      let range = inputElement.createTextRange();

      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  };

  mask = function() {
    let pattern = '+7(___)___-__-__',
      i = 0,
      def = pattern.replace(/\D/g, ''),
      val = this.value.replace(/\D/g, '');

    if (def.length >= val.length) {
      val = def;
    }

    this.value = pattern.replace(/./g, function(match) {
      return /[_\d]/.test(match) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : match;
    });

    if (event.type === 'blur') {
      if (this.value.length === 2) {
        this.value = '';
        this.classList.remove('filled');
      }
    } else {
      setCursorPosition(this.value.length, this);
    }
  };

  let input = qa('[name=tel]');

  for (let i = 0; i < input.length; i++) {
    input[i].addEventListener('input', mask);
    input[i].addEventListener('focus', mask);
    input[i].addEventListener('blur', mask);
  }

})();
;
(function() {
  // Массив форм, на которые будет добавлена валидация
  // let $forms = [
  //   id('contacts-form')
  // ];

  let $forms = qa('.contacts-sect__form, .contacts-us-sect__form');

  let formValidator = function(params) {
    let $form = params.form,
      $formBtn = params.formBtn,
      $uploadFilesBlock = params.uploadFilesBlock,
      errorsClass = 'invalid',
      $filesInput = params.filesInput,
      // Правила проверки форм, аналогично jquery.validate
      rules = {
        name: {
          required: true
        },
        tel: {
          required: true,
          pattern: /\+7\([0-9]{3}\)[0-9]{3}\-[0-9]{2}\-[0-9]{2}/,
          or: 'email'
        },
        email: {
          required: true,
          pattern: /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z])+$/,
          or: 'tel'
        },
        msg: {
          required: true,
          pattern: /[^\<\>\[\]%\&'`]+$/
        },
        policy: {
          required: true
        }
      },
      messages = {
        tel: {
          required: 'Введите ваш телефон или E-mail',
          pattern: 'Укажите верный телефон'
        },
        name: {
          required: 'Введите ваше имя',
        },
        email: {
          required: 'Введите ваш E-mail или телефон',
          pattern: 'Введите верный E-mail'
        },
        msg: {
          required: 'Введите ваше сообщение',
          pattern: 'Введены недопустимые символы'
        },
        policy: {
          required: 'Согласитель с политикой обработки персональных данных'
        }
      },
      /*
        Функция получения значения полей у текущей формы.
        Ищет только те элементы формы, именя которых указаны в rules.
        Возвращает объект: 
        {название-поля: значение-поля}
        Например:
        {'user-email': 'mail@mail.ru'}
      */
      getFormData = function($form) {
        let formElements = $form.elements,
          values = {};

        for (let rule in rules) {
          let formElement = formElements[rule];

          if (formElement) {
            values[rule] = formElement.value;
          }
        }

        return values;
      },
      /*
        Функция проверки правильности заполнения формы.
      */
      validationForm = function(event) {
        let errors = {},
          thisForm = $form,
          values = getFormData(thisForm);

        for (let elementName in values) {
          let rule = rules[elementName],
            $formElement = thisForm[elementName],
            elementValue = values[elementName],
            or = rule.or,
            $orFormElement = thisForm[or];

          if (rule) {
            if ($formElement.hasAttribute('required') || rule.required === true) {
              let elementType = $formElement.type,
                pattern = rule.pattern;

              // Если элемент не чекнут или пустой
              if (((elementType === 'checkbox' || elementType === 'radio') && !$formElement.checked) ||
                elementValue === '') {

                if (or && $orFormElement) {
                  if ($orFormElement.value === '') {
                    errors[elementName] = messages[elementName].required;
                    continue;
                  }
                } else {
                  errors[elementName] = messages[elementName].required;
                  continue;
                }
              }

              // Если текстовый элемент, у которого есть щаблон для заполнения
              if (elementType !== 'cehckbox' && elementType !== 'radio' && pattern) {
                if (elementValue !== '' && pattern.test(elementValue) === false) {
                  errors[elementName] = messages[elementName].pattern;
                  continue;
                }
              }

              hideError($formElement);
            }
          }
        }

        if (Object.keys(errors).length == 0) {
          thisForm.removeEventListener('change', validationForm);
          thisForm.removeEventListener('input', validationForm);
          $form.validatie = true;
        } else {
          thisForm.addEventListener('change', validationForm);
          thisForm.addEventListener('input', validationForm);
          showErrors(thisForm, errors);
          $form.validatie = false;
        }

      },
      showErrors = function($form, errors) {
        let $formElements = $form.elements;

        for (let elementName in errors) {
          let errorText = errors[elementName],
            $errorElement = '<label class="' + errorsClass + '">' + errorText + '</label>',
            $formElement = $formElements[elementName],
            $nextElement = $formElement.nextElementSibling;

          if ($nextElement && $nextElement.classList.contains(errorsClass)) {
            if ($nextElement.textContent !== errorText) {
              $nextElement.textContent = errorText;
            }
            continue;
          } else {
            $formElement.insertAdjacentHTML('afterend', $errorElement);
          }

          $formElement.classList.add(errorsClass);
        }

      },
      hideError = function($formElement) {
        let $nextElement = $formElement.nextElementSibling;
        $formElement.classList.remove(errorsClass);
        if ($nextElement && $nextElement.classList.contains(errorsClass)) {
          $nextElement.parentElement.removeChild($nextElement);
        }
      },
      submitHandler = function(event) {
        let $form = q('#' + event.detail.id + '>form'),
          eventType = event.type;

        if (eventType === 'wpcf7mailsent') {
          let $formElements = $form.elements;

          for (let i = 0; i < $formElements.length; i++) {
            hideError($formElements[i]);
            $formElements[i].classList.remove('filled');
          }

          $form.reset();
          if ($uploadFilesBlock) {
            $uploadFilesBlock.innerHTML = '';
          }
          // if ($form === $quizForm) {
          //   id('quiz').resetQuiz();
          // }
          console.log('отправлено');
        }
        /* else if (eventType === 'wpcf7mailfailed') {
                console.log('отправка не удалась');
              }*/

        $form.classList.remove('loading');

        setTimeout(function(){
          $form.classList.remove('sent');
        }, 3000);

        thanksPopup.openPopup();
        thanksPopupTimer = setTimeout(function() {
          thanksPopup.closePopup();
        }, 3000);


      },
      toggleInputsClass = function() {
        let $input = event.target,
          type = $input.type,
          files = $input.files,
          classList = $input.classList,
          value = $input.value;

        if (type === 'text' || $input.tagName === 'TEXTAREA') {
          if (value === '') {
            classList.remove('filled');
          } else {
            classList.add('filled');
          }
        } else if (type === 'file') {
          // $input.filesArray = [];

          let uploadedFiles = '';
          for (let i = 0, len = files.length; i < len; i++) {
            // $input.filesArray[i] = files[i];
            uploadedFiles += '<span class="uploadedfiles__file"><span class="uploadedfiles__file-text">' + files[i].name + '</span></span>';
          }
          $uploadFilesBlock.innerHTML = uploadedFiles;
        }
      };

    $form.setAttribute('novalidate', '');
    $form.validatie = false;
    $formBtn.addEventListener('click', function() {
      validationForm();
      if ($form.validatie === false) {
        event.preventDefault();
      } else {
        $form.classList.add('loading');
      }
    });
    if (!document.wpcf7mailsent) {
      document.addEventListener('wpcf7mailsent', submitHandler);
      document.wpcf7mailsent = true;
    }
    $form.addEventListener('input', toggleInputsClass);
  };

  for (var i = $forms.length - 1; i >= 0; i--) {
    if ($forms[i]) {
      formValidator({
        form: $forms[i],
        formBtn: q('button', $forms[i]),
        uploadFilesBlock: q('.uploadedfiles', $forms[i]),
        filesInput: q('input[type="file"]', $forms[i])
      });
    }
  }
})();
// setPolyfills();

// В основном для IE
if (!NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

if (!HTMLCollection.prototype.forEach) {
  HTMLCollection.prototype.forEach = Array.prototype.forEach;
}

fakeScrollbar = id('fake-scrollbar');

burger = q('.hdr__burger');

hdr = q('.hdr');

menu = mobileMenu({
  menu: q('.menu'),
  menuCnt: q('.menu__cnt'),
  openBtn: burger,
  closeBtn: burger,
  fade: true,
  allowPageScroll: false
});

sticky(hdr);

thanksPopup = new Popup('.thanks-popup', {
  closeButtons: '.thanks-popup__close'
});

//=include ../blocks/header/header.js

//=include ../blocks/mobile-menu/mobile-menu.js

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

//=include ../blocks/index-quality/index-quality.js

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

(function() {
  let indexCatalogueClassName = '.index-catalogue',
    indexCatalogue = q(indexCatalogueClassName);

  if (indexCatalogue) {
    let activeButtonClassName = indexCatalogueClassName + '__category.active',
      fig1 = q(indexCatalogueClassName + '__fig > img:first-of-type', indexCatalogue),
      fig2 = q(indexCatalogueClassName + '__fig > img:last-of-type', indexCatalogue),
      buttons = qa(indexCatalogueClassName + '__category', indexCatalogue),
      initialActiveButton = q(activeButtonClassName, indexCatalogue),
      figcaption = q(indexCatalogueClassName + '__figcaption', indexCatalogue),
      pic = q(indexCatalogueClassName + '__pic > img', indexCatalogue),
      line = q(indexCatalogueClassName + '__left-line', indexCatalogue),
      link = q('.index-catalogue__right', indexCatalogue),
      cache = {
        [initialActiveButton.getAttribute('data-term-id')]: {
          'fig1': fig1.getAttribute('data-src') || fig1.src,
          'fig2': fig2.getAttribute('data-src') || fig2.src,
          'pic': pic.getAttribute('data-src') || pic.src,
          'url': link.href,
          'figcaption': figcaption.innerHTML
        }
      },
      setData = function(from) {
        fig1.src = from.fig1;
        fig2.src = from.fig2;
        pic.src = from.pic;
        link.href = from.url;
        fig1.lazyObject = null;
        fig2.lazyObject = null;
        pic.lazyObject = null;
        figcaption.innerHTML = from.figcaption;
      };

    indexCatalogue.addEventListener('click', function(e) {
      let target = e.target;
      if (target.tagName === 'BUTTON' && !target.classList.contains('active')) {
         target.blur();
         target.setAttribute('tabindex', '-1');

        let termID = target.getAttribute('data-term-id'),
          targetHeight = target.offsetHeight,
          activeButton = q(activeButtonClassName, indexCatalogue),
          url = siteUrl + '/wp-admin/admin-ajax.php',
          data = 'action=getcatalogueterm&term_id=' + termID;

        if (activeButton) {
          activeButton.removeAttribute('tabindex');
          activeButton.classList.remove('active');
        }

        indexCatalogue.classList.add('loading');
        target.classList.add('active');
        line.style.transform = 'translateY(' + (targetHeight / 2 + target.offsetTop - 1) + 'px)';

        if (cache[termID]) {
          setTimeout(function() {
            setData(cache[termID]);
            indexCatalogue.classList.remove('loading');
          }, 500);
        } else {
          let xhr = new XMLHttpRequest();
          xhr.open('POST', url);
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          xhr.send(data);

          xhr.addEventListener('readystatechange', function() {
            if (xhr.status === 200 && xhr.readyState === 4) {
              let response = JSON.parse(xhr.response),
                onloadCount = 0;

              [response.fig1, response.fig2, response.pic].forEach(function(src, i) {
                img = new Image();

                img.onload = function() {
                  onloadCount++;
                  if (onloadCount === 2) {
                    indexCatalogue.classList.remove('loading');
                  }
                }

                img.src = src;
              });

              setData(response);
              cache[termID] = {
                'fig1': response.fig1,
                'fig2': response.fig2,
                'pic': response.pic,
                'url': response.url,
                'figcaption': response.figcaption
              };
            } // end addeventlistener readystatechange
          });
        } // endif cache[TermID]
      } // endif target.tagName === 'BUTTON'
    }); // end addeventlistener click
  } // endif indexCatalogue
})()

//=include ../blocks/index-about/index-about.js

//=include ../blocks/index-contacts/index-contacts.js

//=include ../blocks/footer/footer.js

// Инициализация lazyload
lazy = new lazyload({
  clearSrc: true,
  clearMedia: true
});

// Добавление расчета vh на ресайз окна
windowFuncs.resize.push(setVh);

// Сбор событий resize, load, scroll и установка на window
for (let eventType in windowFuncs) {
  if (eventType !== 'call') {
    let funcsArray = windowFuncs[eventType];
    if (funcsArray.length > 0) {
      windowFuncs.call(funcsArray);
      window.addEventListener(eventType, windowFuncs.call);
    }
  }
}

// настройки grab курсора на всех слайдерах
$('.slick-list.draggable').on('mousedown', function() {
  $(this).addClass('grabbing');
});

$('.slick-list.draggable').on('beforeChange', function() {
  $(this).removeClass('grabbing');
});

$(document).on('mouseup', function() {
  $('.slick-list.draggable').removeClass('grabbing');
});
});