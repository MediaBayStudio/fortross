<section class="about-brands-sect container"<?php echo $section_id ?>>
  <div class="about-brands-sect__wrap has-decor-text" data-decor-text="<?php echo $section['decor_text'] ?>"> <?php
    foreach ( $section['brands'] as $brand ) : ?>
      <a href="<?php echo get_term_link( (int)$brand->term_id ) ?>" class="about-brands-sect__brand">
        <img src="#" alt="<?php echo $brand->name ?>" class="about-brands-sect__brand-img lazy" data-src="<?php echo get_field( 'brand_logo', $brand )['url'] ?>">
      </a> <?php
    endforeach ?>
  </div>
</section>