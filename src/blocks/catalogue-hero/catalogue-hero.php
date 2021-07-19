<?php 
if ( $_GET['brand'] ) {
  // Для формирования хлебных крошек
  $brand_get_query = '?brand=' . $_GET['brand'];
} ?>
<section class="catalogue-hero-sect container"<?php echo $section_id ?>> <?php
  $queried_term = get_queried_object();
  $queried_term_id = $queried_term->term_id;
  $section_title = $queried_term->parent ? $queried_term->name : $section['title'];
  $section_descr = $queried_term->parent ? $queried_term->description : $section['descr'];
  if ( $queried_term->slug === 'sale' ) {
    $section_title = $queried_term->name;
    $section_descr = $queried_term->description;
  } ?>
  <h1 class="catalogue-hero-sect__title"><?php echo $section_title ?></h1> <?php
  if ( $section_descr ) : ?>
    <p class="catalogue-hero-sect__descr"><?php echo $section_descr ?></p> <?php
  endif;
    if ( $queried_term->slug === 'sale' || $queried_term_id && $queried_term->parent ) {
      // Дочерняя страница каталога
      $wrap_class = '';
      $catalogue = '';

      $args = [
        'numberposts' => -1,
        'category' => $queried_term_id,
        'tag' => $_GET['brand']
      ];

      if ( $queried_term->slug === 'sale' ) {
        $args['orderby'] = 'rand'; 
      }

      $posts = get_posts( $args );

      $post_count = 0;
      foreach ( $posts as $post ) {
        $brands = wp_get_post_tags( $post->ID );

        foreach ( $brands as $brand ) {
          if ( $brand->parent ) {
            $brand = get_term( $brand->parent );
            $brand = $brand->name;
            break;
          } else {
            $brand = $brand->name;
          }
        }

        // var_dump( $brand );

        $url = get_permalink( $post->ID ) . $brand_get_query;
        $title = $post->post_title;
        $material = get_field( 'material', $post );
        $descr = $material . '<br>' . $brand;
        $img_src = get_the_post_thumbnail_url( $post->ID );

        if ( $queried_term->slug === 'sale' ) {
          $size = get_field( 'size', $post->ID );
          $descr = $material . '<br>' . $size;
          $price = get_field( 'price', $post->ID );
          $price_sale = get_field( 'price_sale', $post->ID );
          $gallery = get_field( 'gallery', $post->ID );
          $lazy = true;
          $response = '
          <div class="catalogue-items__item' . $img_class . '"' . $styles . '>
            <div class="catalogue-item__title-block">
              <span class="catalogue-item__title">' . $title . '</span>
              <span class="catalogue-item__descr">' . $descr . '</span>
            </div>
            <div class="catalogue-item__price-block">
              <span class="catalogue-item__new-price">' . number_format( $price_sale, 0, 0, ' ' ) . ' &#8381;</span>
              <span class="catalogue-item__old-price">' . number_format( $price, 0, 0, ' ' ) . ' &#8381;</span>
            </div>
            <div class="catalogue-item__gallery-wrap">
            <div class="catalogue-item__gallery" data-slick="slider-' . $post_count . '">';

            foreach ( $gallery as $img ) {
              $img_src = $img['url'];
              if ( $lazy ) {
                $attr = 'src="#" alt="' . $title . '" data-src="' . $img_src . '"';
                $lazy_class = ' lazy';
              } else {
                $attr = 'src="' . $img_src . '" alt="' . $title . '"';
                $lazy_class = '';
              }
              if ( $lazy === 'no-lazy-class') {
                $lazy_class = '';
              }
              $response .= '<a href="' . $img_src . '" class="catalogue-item__fancybox-link" data-fancybox="gallery-' . $post_count . '"><img ' . $attr . ' class="catalogue-item__img' . $lazy_class . '"' . $img_width . $img_height . '></a>';
            }

            $response .= '</div><div class="catalogue-item__nav"><span class="catalogue-item__counter"></span></div><button type="button" class="catalogue-item__btn btn btn_ol">Заказать</button>
            </div>
          </div>';

          $catalogue .= $response;
        } else {
          $catalogue .= print_ctatlogue_item( $url, $title, $descr, $img_src, false );
        }

        unset( $url, $title, $img_src, $descr );
        $post_count++;
      }

    } else {
      // Основная страница каталога
      $wrap_class = ' main-catalogue';
      $catalogue_left = '<div class="catalogue-hero-sect__catalogue-left"><hr class="catalogue-hero-sect__catalogue-left-line">';
      $catalogue_right = '<div class="catalogue-hero-sect__catalogue-right lazy" data-src="#"">';
      $i = 0;
      foreach ( $section['categories'] as $category ) {
        $term = $category['category'];
        $term_url = get_term_link( $term );

        if ( $category['is_subcategories'] ) {
          $subterms = get_term_children( $term->term_id, 'category' );
          foreach ( $subterms as $subterm ) {
            $subcategories[] = get_term( $subterm );
          }
        } else {
          $subcategories = $category['subcategories_repeater'];
        }

        if ( $queried_term_id ) {
          $active_class = $queried_term_id == $term->term_id ? ' active' : '';
        } else {
          $active_class = $i === 0 ? ' active' : '';
        }

        $catalogue_left .= '<a href="' . $term_url . '" class="catalogue-hero-sect__category' . $active_class . '" data-term-id="' . $term->term_id . '">' . $term->name . '</a>';

        $catalogue_right .= '<div class="catalogue-hero-sect__right-item' . $active_class . '" data-term-id="' . $term->term_id . '">';

        if ( $subcategories ) {
          foreach ( $subcategories as $subcategory ) {
            if ( !$category['is_subcategories'] ) {
              $subcategory = $subcategory['subcategories'];
            }

            $url = get_term_link( $subcategory->term_id );
            $title = $subcategory->name;
            $img_src = get_field( 'category_preivew', $subcategory )['url'];

            if ( !$img_src ) {
              $img_src = $template_directory . '/img/img-placeholder.svg';
            }

            $catalogue_right .= print_ctatlogue_item( $url, $title, false, $img_src, false );

            unset( $url, $title, $img_src, $subcategory );
          }
        } else {
          $posts = get_posts( [
            'numberposts' => -1,
            'category_name' => $term->slug,
            'tag' => $_GET['brand']
          ] );

          foreach ( $posts as $p ) {
            $url = get_post_permalink( $p->ID );
            $title = $p->post_title;
            $img_src = get_the_post_thumbnail_url( $p->ID );

            if ( !$img_src ) {
              $img_src = $template_directory . '/img/img-placeholder.svg';
            }

            $catalogue_right .= print_ctatlogue_item( $url, $title, false, $img_src, false );

            unset( $url, $title, $img_src );
          }
        }

        $catalogue_right .= '</div>';
        $i++;

        unset( $subterms, $subterm, $subcategories, $active_class, $term_url );

      }
      $catalogue_left .= '</div>';
      $catalogue_right .= '</div>';
    } ?>
  <div class="catalogue-hero-sect__catalogue-wrap<?php echo $wrap_class ?> lazy" data-src="#"><?php
    echo $catalogue_left . $catalogue_right . $catalogue ?>      
  </div>
</section> <?php
if ( $queried_term->slug === 'sale' ) : ?>
  <div class="product-popup popup lazy" data-src="#">
    <div class="product-popup__cnt popup__cnt">
      <button type="button" class="product-popup__close">
        <svg width="21" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 20" class="product-popup__close-svg"><path stroke="currentColor" d="M20.4455.353553L1.35359 19.4454M19.7384 19.4455L.646481.353591" class="product-popup__close-path"/></svg>
      </button>
      <h2 class="product-popup__title">Заказ товара</h2>
      <input type="text" name="product-name" class="cf7-form-field" id="product-name-inp" form="product-popup-form">
      <!-- <p class="product-popup__descr">Спасибо что написали нам, мы&nbsp;ответим вам в&nbsp;ближайшее время по&nbsp;указаным контактным данным.</p> --> <?php
      echo do_shortcode( '[contact-form-7 id="12" html_class="product-popup__form" html_id="product-popup-form"]' ) ?>
    </div>
  </div> <?php
endif;
unset( $section_id, $category, $catalogue_left, $catalogue_right, $i, $wrap_class ) ?>