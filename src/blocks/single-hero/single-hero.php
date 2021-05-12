<?php 

$title = get_the_title();
$post_id = $post->ID;
$child_brand = wp_get_post_tags( $post_id )[0];
$parent_brand = get_term( $child_brand->parent );
$fields = get_fields( $post_id );
$other_images = $fields['other_images'];
$thumbnail = [
  'url' => get_the_post_thumbnail_url( $post_id ),
  'ID' => get_post_thumbnail_id( $post_id )
];

// Массив с "прочими" изображения нужно разбить на 2 части по 2 картинки
// и поместить по 2 шт в разные блоки
// для удобства адаптирования
if ( $other_images ) {
  $other_images = array_chunk( $other_images, 2 );

  $i = 0;
  $html = '';
  foreach ( $other_images as $two_images ) {

    foreach ( $two_images as $img ) {
      $html .= cretae_picture_form_img_field( 'single-hero-sect', $img, true, $title, false );
    }

    if ( $i === 0 ) {
      $first_sect = $html;
      $html = '';
    } else if ( $i === 1 ) {
      $second_sect = $html;
      $html = '';
    }
    $i++;
  }
} ?>
<section class="single-hero-sect container"<?php echo $section_id ?>>
  <div class="single-hero-sect__top">
    <div class="single-hero-sect__slider-wrap">
      <div class="single-hero-sect__slider"> <?php
        if ( $fields['gallery'] ) {
          // Если галерея есть, то будем ее выводить так:
          // первый слайд будет без lazyload,
          // т.к. для него есть <link rel="preload" /> в header.php
          // остальные фото с lazyload
          for ( $i = 0, $len = count( $fields['gallery'] ); $i < $len; $i++) { 
            if ( $i === 0 ) {
              $first_pic_html = cretae_picture_form_img_field( 'single-hero-sect', $fields['gallery'][ $i ], false, $title );
            } else {
              $gallery_html .= str_replace( ' lazy"', ' lazy" style="display:none"', cretae_picture_form_img_field( 'single-hero-sect', $fields['gallery'][ $i ], true, $title, false ) );
            }
          }
          echo $first_pic_html . $gallery_html;
        } else {
          // Если галерея пустая, то показываем на ее месте миниатюру
          cretae_picture_form_img_field( 'single-hero-sect', $thumbnail, false, $title );
        } // endif $gallery_len

        unset( $first_pic_html, $gallery_html ) ?>
      </div>
      <div class="single-hero-sect__nav"><span class="single-hero-sect__counter"></span></div>
    </div>
    <div class="single-hero-sect__text">
      <h1 class="single-hero-sect__title"><?php echo preg_replace( '/(?<=\w|\d)-(?=\w|\d)/', '&#8209;', $title ) ?></h1>
      <span class="single-hero-sect__parent-brand"><?php echo $parent_brand->name ?></span>
      <span class="single-hero-sect__child-brand"><?php echo $child_brand->name ?></span>
      <p class="single-hero-sect__descr"><?php the_field( 'descr', $post_id ) ?></p>
    </div>
  </div>
  <div class="single-hero-sect__bottom"> <?php
    $class = $fields['props'] ? '' : ' no-text' ?>
    <div class="single-hero-sect__bottom-first-sect<?php echo $class ?>"> <?php
      if ( $fields['props'] ) : ?>
        <div class="single-hero-sect__props"> <?php
          foreach ( $fields['props'] as $prop ) : ?>
            <div class="single-hero-sect__prop"> <?php
              if ( $prop['select'] === 'material' ) {
                // Если выбран материал, то устанавливаем заголовок
                $prop_title = 'Материал';
                if ( $prop['material_by_default'] ) {
                  // Если выбрано по умолчанию, то берем из другого поля
                  $prop_descr = $fields['material'];
                } else {
                  // Если не по умолчанию, то берем материал из этого поля
                  $prop_descr = $prop['text'];
                }
              } else {
                // Если выбрано "другое"
                // то берем поля с заголовком и тектом
                $prop_title = $prop['title'];
                $prop_descr = $prop['text'];
              } ?>
              <span class="single-hero-sect__prop-title"><?php echo $prop_title ?></span>
              <p class="single-hero-sect__prop-text"><?php echo $prop_descr ?></p>
            </div> <?php
          endforeach ?>
        </div> <?php
      endif;
      echo $first_sect ?>
    </div> <?php
    if ( $fields['descr_opt'] || $second_sect ) :
      $class = $fields['descr_opt'] ? '' : ' no-text' ?>
      <div class="single-hero-sect__bottom-second-sect<?php echo $class ?>"> <?php
        echo $second_sect;
        if ( $fields['descr_opt'] ) : ?>
          <p class="single-hero-sect__descr-opt"><?php echo $fields['descr_opt'] ?></p> <?php
        endif ?>
      </div> <?php
    endif ?>
  </div>
</section> <?php
unset( $title, $post_id, $child_brand, $parent_brand, $fields, $other_images, $thumbnail );