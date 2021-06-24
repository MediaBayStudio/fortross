<section class="contacts-sect lazy"<?php echo $section_id ?> data-src="#">
  <div class="contacts-sect__left container">
    <div class="contacts-sect__form-wrap has-decor-text" data-decor-text="<?php echo $section['decor_text'] ?>">
      <h2 class="contacts-sect__title"><?php echo $section['title'] ?></h2> <?php
      if ( is_single() ) {
        $value = $post->post_title;
      } else {
        $value = 'Нет';
      } ?>
      <input type="text" name="product" form="contacts-sect-form" value="<?php echo $value ?>" class="cf7-form-field"> <?php
      echo do_shortcode( '[contact-form-7 id="' . $section['form']->ID . '" html_class="contacts-sect__form" html_id="contacts-sect-form"]' ) ?>
    </div>
  </div>
  <div class="contacts-sect__right container">
    <div class="contacts-sect__contacts-wrap">
      <div class="contacts-block contacts-sect__contacts-block">
        <span class="contacts-block__title">Телефон</span>
        <a href="tel:<?php echo $tel_1_dry ?>" class="contacts-block__link"><?php echo $tel_1 ?></a>
        <a href="tel:<?php echo $tel_2_dry ?>" class="contacts-block__link"><?php echo $tel_2 ?></a>
      </div>
      <div class="contacts-block contacts-sect__contacts-block">
        <span class="contacts-block__title">E-mail</span>
        <a href="mailto:<?php echo $email ?>" class="contacts-block__link"><?php echo $email ?></a>
      </div>
      <div class="contacts-block contacts-sect__contacts-block">
        <span class="contacts-block__title">Адрес</span>
        <a href="<?php echo $address_link ?>" class="contacts-block__link"><?php echo $address ?></a>
      </div>
      <div class="contacts-sect__social-networking-links"> <?php
        if ( $facebook ) : ?>
          <a href="<?php echo $facebook ?>" target="_blank" rel="nofollow noopener" class="contacts-sect__social-networking-link"><img src="#" alt="Facebook" class="lazy" data-src="<?php echo $template_directory ?>/img/icon-facebook.svg"></a> <?php
        endif;
        if ( $instagram ) : ?>
          <a href="<?php echo $instagram ?>" target="_blank" rel="nofollow noopener" class="contacts-sect__social-networking-link"><img src="#" alt="Instagram" class="lazy" data-src="<?php echo $template_directory ?>/img/icon-instagram.svg"></a> <?php
        endif ?>
      </div>
    </div>
  </div>
</section> <?php
unset( $section_id ) ?>