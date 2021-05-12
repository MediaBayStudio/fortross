<section class="index-about-sect container"<?php echo $section_id ?>>
  <hr class="sect-separator">
  <h2 class="index-about-sect__title"><?php echo $section['title'] ?></h2>
  <div class="index-about-sect__wrap has-decor-text" data-decor-text="<?php echo $section['decor_text'] ?>"> <?php
    cretae_picture_form_img_field( 'index-about-sect', $section['img'] ) ?>
    <div class="index-about-sect__text">
      <span class="index-about-sect__decor-title sect-decor-title">fortross</span> <?php
      foreach ( $section['descr'] as $p ) : ?>
        <p class="index-about-sect__p"><?php echo $p['p'] ?></p> <?php
      endforeach ?>
    </div>
  </div>
</section>