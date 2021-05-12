mapBlock = id('contacts-hero-sect-map');

if (mapBlock) {
  let ymapsInit = function() {
    let tag = document.createElement('script');

    tag.setAttribute('src', 'https://api-maps.yandex.ru/2.1/?apikey=82596a7c-b060-47f9-9fb6-829f012a9f04&lang=ru_RU&onload=ymapsOnload');
    body.appendChild(tag);

    mapBlock.removeEventListener('lazyloaded', ymapsInit);

  };

  mapBlock.addEventListener('lazyloaded', ymapsInit);
}