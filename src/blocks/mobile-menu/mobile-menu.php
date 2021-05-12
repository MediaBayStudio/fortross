<?php
  global
  $template_directory,
  $site_url,
  $logo_url,
  $instagram,
  $facebook,
  $address,
  $address_link,
  $tel_1,
  $tel_1_dry,
  $tel_2,
  $tel_2_dry ?>
<aside class="menu" style="display:none">
  <div class="menu__cnt"> <?php
    wp_nav_menu( [
      'theme_location'  => 'header_menu',
      'container'       => 'nav',
      'container_class' => 'menu__nav',
      'menu_class'      => 'menu__nav-list',
      'items_wrap'      => '<ul class="%2$s">%3$s</ul>'
    ] ) ?>
    <div class="contacts-block menu__contacts-block">
      <span class="contacts-block__title">Телефон</span>
      <a href="tel:<?php echo $tel_1_dry ?>" class="contacts-block__link"><?php echo $tel_1 ?></a>
      <a href="tel:<?php echo $tel_2_dry ?>" class="contacts-block__link"><?php echo $tel_2 ?></a>
    </div>
    <div class="contacts-block menu__contacts-block">
      <span class="contacts-block__title">Адрес</span>
      <a href="<?php echo $address_link ?>" target="_blank" class="contacts-block__link"><?php echo $address ?></a>
    </div>
    <div class="menu__social-networking-links"> <?php
      if ( $facebook ) : ?>
        <a href="<?php echo $facebook ?>" target="_blank" rel="nofollow noopener" class="menu__social-networking-link"><img src="#" alt="Facebook" class="lazy" data-src="<?php echo $template_directory ?>/img/icon-facebook.svg"></a> <?php
      endif;
      if ( $instagram ) : ?>
        <a href="<?php echo $instagram ?>" target="_blank" rel="nofollow noopener" class="menu__social-networking-link"><img src="#" alt="Instagram" class="lazy" data-src="<?php echo $template_directory ?>/img/icon-instagram.svg"></a> <?php
      endif ?>
    </div>
  </div>
</aside>