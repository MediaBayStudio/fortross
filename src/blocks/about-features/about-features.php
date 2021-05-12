<section class="about-features-sect container has-decor-text lazy" data-decor-text="<?php echo $section['decor_text'] ?>" data-src="#"<?php echo $section_id ?>>
  <div class="about-features"> <?php
    foreach ( $section['features'] as $feat ) : ?>
      <div class="about-feat">
        <img src="#" alt="#" data-src="<?php echo $feat['img']['url'] ?>" class="about-feat__img lazy">
        <strong class="about-feat__title"><?php echo $feat['p'] ?></strong>
      </div> <?php
    endforeach ?>
  </div>
  <div class="about-features__arrows">
    <div class="about-features__counter"><span class="about-features__counter-current"></span>/<span class="about-features__counter-total"></span></div>
  </div>
</section>