<?php 
if ( $_GET['brand'] ) {
  // Для формирования хлебных крошек
  $brand_get_query = '?brand=' . $_GET['brand'];
} ?>
<section class="catalogue-hero-sect container"<?php echo $section_id ?>> <?php
  $queried_term = get_queried_object();
  $queried_term_id = $queried_term->term_id;
  $section_title = $queried_term->parent ? $queried_term->name : $section['title'];
  $section_descr = $queried_term->parent ? $queried_term->description : $section['descr'] ?>
  <h1 class="catalogue-hero-sect__title"><?php echo $section_title ?></h1> <?php
  if ( $section_descr ) : ?>
    <p class="catalogue-hero-sect__descr"><?php echo $section_descr ?></p> <?php
  endif;
    if ( $queried_term_id && $queried_term->parent ) {
      $catalogue = '';

      $posts = get_posts( [
        'numberposts' => -1,
        'category' => $queried_term_id,
        'tag' => $_GET['brand']
      ] );

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
        $catalogue .= print_ctatlogue_item( $url, $title, $descr, $img_src, false );

        unset( $url, $title, $img_src, $descr );
      }

    } else {
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

        $catalogue_right .= '</div>';
        $i++;

        unset( $subterms, $subterm, $subcategories, $active_class, $term_url );

      }
      $catalogue_left .= '</div>';
      $catalogue_right .= '</div>';
    } ?>
  <div class="catalogue-hero-sect__catalogue-wrap lazy" data-src="#"><?php
    echo $catalogue_left . $catalogue_right . $catalogue ?>      
  </div>
</section> <?php
unset( $section_id, $category, $catalogue_left, $catalogue_right, $i ) ?>