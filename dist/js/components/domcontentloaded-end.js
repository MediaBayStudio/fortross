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