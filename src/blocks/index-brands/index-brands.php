<section class="catalogue-items-sect index-brands-sect container"<?php echo $section_id ?>>
  <div class="catalogue-items-sect__heading">
    <h2 class="catalogue-items-sect__title"><?php echo $section['title'] ?></h2>
    <div class="catalogue-items-sect__nav">
      
    </div>
  </div>
  <div class="catalogue-items lazy" data-src="#"> <?php
    foreach ( $section['brands'] as $brand ) :
      $brand = $brand['brand'] ?>
      <div class="catalogue-items__item">
        <a href="<?php echo get_tag_link( $brand->term_id ) ?>" class="catalogue-item__link">
          <span class="catalogue-item__title"><?php echo $brand->name ?></span>
          <span class="catalogue-item__descr"><?php the_field( 'brand_country', $brand ) ?></span>
          <img src="#" alt="<?php echo $brand->name ?>" data-src="<?php echo get_field( 'brand_preview', $brand )['url'] ?>" class="catalogue-item__img lazy">
        </a>
      </div> <?php
      unset ( $brand );
    endforeach ?>
  </div>
</section> <?php
unset( $section_id ) ?>