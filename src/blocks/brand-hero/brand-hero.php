<?php
$current_brand = get_queried_object();
$hero_descr = get_field( 'brand_descr', $current_brand );
$hero_sect_class = $hero_descr ? '' : ' no-text' ?>
<section class="brand-hero-sect container<?php echo $hero_sect_class ?>"> <?php
  $hero_images = get_field( 'brand_img', $current_brand );
  $section_title = $current_brand->name ?>
  <div class="brand-hero-sect__left">
    <h1 class="brand-hero-sect__title"><?php echo $section_title ?></h1> <?php
    cretae_picture_form_img_field( 'brand-hero-sect', $hero_images, false ) ?>
  </div> <?php
  if ( $hero_descr ) : ?>
    <p class="brand-hero-sect__descr"><?php echo $hero_descr ?></p> <?php
  endif ?>
</section> <?php
unset( $hero_images, $hero_descr, $hero_sect_class, $current_brand, $section_title );