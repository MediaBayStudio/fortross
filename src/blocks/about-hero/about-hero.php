<section class="about-hero-sect container"<?php echo $section_id ?>>
  <div class="about-hero-sect__top has-decor-text" data-decor-text="<?php echo $section['decor_text'] ?>">
    <h1 class="about-hero-sect__title sect-decor-title">fortross</h1>
    <div class="about-hero-sect__pictures"> <?php
      cretae_picture_form_img_field( 'about-hero-sect', $section['img_1'], false );
      cretae_picture_form_img_field( 'about-hero-sect', $section['img_2'], false ) ?>
    </div>
    <p class="about-hero-sect__descr"><?php echo $section['descr'] ?></p>
  </div>
  <div class="about-hero-sect__bottom"> <?php
    cretae_picture_form_img_field( 'about-hero-sect', $section['img_3'], false ) ?>
    <div class="about-hero-sect__text lazy" data-src="#"> <?php
      foreach ( $section['text'] as $p ) : ?>
        <p class="about-hero-sect__p"><?php echo $p['p'] ?></p> <?php
      endforeach ?>
    </div>
  </div>
</section>