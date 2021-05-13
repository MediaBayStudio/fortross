<section class="index-catalogue-sect container"<?php echo $section_id ?>> <?php
  $first_category = $section['categories'][0]['category'] ?>
  <div class="index-catalogue-sect__heading">
    <h2 class="index-catalogue-sect__title"><?php echo $section['title'] ?></h2>
    <a href="<?php echo $site_url ?>/catalogue/" class="index-catalogue-sect__link">Весь каталог</a>
  </div>
  <div class="index-catalogue"> <?php
    $i = 0;
    foreach ( $section['categories'] as $category ) {
      $category = $category['category'];
      $categories_left .= '<button type="button" class="index-catalogue__category' . ($i === 0 ? ' active' : '') . '" data-term-id="' . $category->term_id . '">' . $category->name .'</button>';
      $i++;
    }
    $category_descr = $first_category->description;
    $args = [
      'numberposts' => 1,
      'category' => $first_category->term_id
    ];
    $category_preview_img = get_field( 'category_preivew', $first_category );
    $category_extra_img = get_field( 'category_extra_img', $first_category );
    $category_extra_img_2 = get_field( 'category_extra_img_2', $first_category );

    if ( !$category_preview_img ) {
      $category_preview_img['url'] = get_the_post_thumbnail_url( get_posts( $args )[0]->ID );
    }

    if ( !$category_extra_img ) {
      $args['offset'] = 1;
      $category_extra_img['url'] = get_the_post_thumbnail_url( get_posts( $args )[0]->ID );
    }

    if ( !$category_extra_img_2 ) {
      $args['offset'] = 2;
      $category_extra_img_2['url'] = get_the_post_thumbnail_url( get_posts( $args )[0]->ID );
    }

    $categories_right .= '<div class="index-catalogue__figures"><figure class="index-catalogue__fig"><img src="#" alt="#" data-src="' . $category_preview_img['url'] . '" class="index-catalogue__img lazy"><img src="#" alt="#" data-src="' . $category_extra_img['url'] . '" class="index-catalogue__img lazy"><figcaption class="index-catalogue__figcaption">' . $category_descr . '</figcaption></figure></div><picture class="index-catalogue__pic"><img src="#" alt="#" data-src="' . $category_extra_img_2['url'] . '" class="index-catalogue__img lazy"></picture>'; ?>
    <div class="index-catalogue__left">
      <hr class="index-catalogue__left-line"> <?php
      echo $categories_left ?>
    </div>
    <a href="<?php echo get_category_link( $first_category ) ?>" class="index-catalogue__right">
      <div class="loader">
        <div class="loader__circle"></div>
      </div> <?php
      echo $categories_right ?>
    </a>
  </div>
</section> <?php
unset( $section_id, $first_category, $i, $category, $category_descr, $category_extra_img, $category_preview_img, $categories_left, $categories_right, $args ) ?>