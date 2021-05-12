<section class="contacts-us-sect lazy"<?php echo $section_id ?> data-src="#">
  <div class="contacts-us-sect__form-wrap has-decor-text container" data-decor-text="<?php echo $section['decor_text'] ?>">
    <h2 class="contacts-us-sect__title"><span class="contacts-us-sect__title-text"><?php echo $section['title'] ?></span></h2> <?php
    echo do_shortcode( '[contact-form-7 id="' . $section['form']->ID . '" html_class="contacts-us-sect__form"]' ) ?>
  </div>
</section> <?php
unset( $section_id ) ?>