<section class="contacts-hero-sect container"<?php echo $section_id ?>>
  <div class="contacts-hero-sect__wrap has-decor-text" data-decor-text="<?php echo $section['decor_text'] ?>">
    <h1 class="contacts-hero-sect__title sect-decor-title">fortross</h1>
    <div class="contacts-hero-sect__contacts">
      <div class="contacts-block">
        <span class="contacts-block__title">Телефон</span>
        <a href="tel:<?php echo $tel_1_dry ?>" class="contacts-block__link"><?php echo $tel_1 ?></a>
        <a href="tel:<?php echo $tel_2_dry ?>" class="contacts-block__link"><?php echo $tel_2 ?></a>
      </div>
      <div class="contacts-block">
        <span class="contacts-block__title">E-mail</span>
        <a href="mailto:<?php echo $email ?>" class="contacts-block__link"><?php echo $email ?></a>
      </div>
      <div class="contacts-block">
        <span class="contacts-block__title">Адрес</span>
        <a href="<?php echo $address_link ?>" target="_blank" class="contacts-block__link" id="address-text"><?php echo $address ?></a>
      </div>
      <div class="contacts-hero-sect__social-networking-links"> <?php
        if ( $facebook ) : ?>
          <a href="<?php echo $facebook ?>" target="_blank" rel="nofollow noopener" class="contacts-hero-sect__social-networking-link"><img src="<?php echo $template_directory ?>/img/icon-facebook.svg" alt="Facebook"></a> <?php
        endif;
        if ( $instagram ) : ?>
          <a href="<?php echo $instagram ?>" target="_blank" rel="nofollow noopener" class="contacts-hero-sect__social-networking-link"><img src="<?php echo $template_directory ?>/img/icon-instagram.svg" alt="Instagram"></a> <?php
        endif ?>
      </div>
    </div>
    <div id="contacts-hero-sect-map" class="lazy" data-src="#" data-zoom="<?php echo $zoom ?>" data-coords="<?php echo $coords ?>"></div>
  </div>
</section>
<script>
  var contactsMap;

  function ymapsOnload() {
    let mapBlockId = 'contacts-hero-sect-map',
      mapBlock = q('#' + mapBlockId),
      mapAddress = q('#address-text', mapBlock.parentElement).textContent,
      mapZoom = mapBlock.getAttribute('data-zoom'),
      dataCoords = mapBlock.getAttribute('data-coords').split(/, |,/),
      mapCoords = {
        a: dataCoords[0],
        b: dataCoords[1]
      }

    ymaps.ready(function() {
      contactsMap = new ymaps.Map(mapBlockId, {
        center: [mapCoords.a, mapCoords.b],
        zoom: mapZoom,
        controls: []
      }, {
        searchControlProvider: 'yandex#search'
      });
      
      let geoIcon = new ymaps.Placemark(contactsMap.getCenter(), {
        iconCaption: 'Fortross',
        hintContent: 'Fortross',
        balloonContent: mapAddress
      }, {
        iconLayout: 'default#image',
        iconImageHref: document.body.getAttribute('data-template-directory-uri') + '/img/icon-geo.svg',
        iconImageSize: [38, 46]
      });

      contactsMap.geoObjects.add(geoIcon);
    });
  }
</script>