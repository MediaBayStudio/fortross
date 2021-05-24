<?php
$section_id = ' data-id="' . $section['id'] . '"';
$section_class = $section['h1'] ? ' with-title' : '';
$title_tag = $section['h1'] ? 'h1' : 'h2';
$items_by_default = $section['items_type'];
$items_from_collection = $section['items_from_collection'];
$selected = $section['select'];
$that = get_queried_object();

$view_class = $section['view'] . '-view';

if ( is_tag() && $that->parent ) {
  $section_title = $section['title'] ? $section['title'] : $that->name;
  $section_descr = get_field( 'brand_descr', $that );
} else {
  $section_title = $section['title'];
  $section_descr = $section['descr'];
}

if ( $selected === 'brands' ) {

  if ( $items_by_default ) {
    // Если бренды по умолчанию
    // то будем выводить либо родительские бренды
    // либо дочерние коллекции

    $args['taxonomy'] = 'post_tag';
    $args['hide_empty'] = false;

    if ( is_page_template( 'tag.php' ) || is_front_page()  ) {
      $args['parent'] = 0;
    } else {
      $args['parent'] = $that->term_id;
    } // endif is_page_template( 'tag.php' ) || is_front_page()

    if ( $that->parent ) {
      $args['parent'] = $that->parent;
      $args['exclude'] = $that->term_id;
    } // endif $that->parent

    $brands = get_terms( $args );

    if ( $that->parent ) {
      shuffle( $brands );
    }
  } else {
    $brands = $section['brands'];
  } // endif $items_by_default


  // Если нет коллекций, то надо выводить товары
  if ( !$brands ) {
    $catalogue_left = '<div class="catalogue-items__left"><hr class="catalogue-items__left-line">';
    $catalogue_right = '<div class="catalogue-items__right lazy" data-src="#"">';

    $section_id = ' data-id="catalogue-items"';

    if ( is_tag() ) {
      // Если бренды
      $posts = get_posts( [
        'numberposts' => -1,
        'tag' => $that->slug
      ] );

      $catalogue = [];

      foreach ( $posts as $post ) {

        $post_terms = get_the_terms( $post, 'category' );

        foreach ( $post_terms as $post_term ) {

          $post_term_parent_id = $post_term->parent;
          $post_term_id = $post_term->term_id;
          $post_term_name = $post_term->name;
          $post_term_thumbnail = get_field( 'category_preivew', $post_term )['url'];
          $post_term_descr = $post_term->$description;

          if ( !$post_term_thumbnail ) {
            $post_term_thumbnail = get_the_post_thumbnail_url( $post->ID );
          }

          if ( $post_term_parent_id ) {
            // Если текущая категория имеет родиетелей (т.е. это подкатегория)
            // получим родителя
            $post_term_parent = get_term( $post_term_parent_id );

            if ( $catalogue[ $post_term_parent_id ] ) {
              // Если родительская категория уже существует в массиве
              // то проверим есть ли там дочерняя категория
              // и вставим ее
              if ( $catalogue[ $post_term_parent_id ]['childs'][ $post_term_name ] ) {
                continue;
              } else {
                $catalogue[ $post_term_parent_id ]['childs'][ $post_term_name ] = [
                  'id' => $post_term_id,
                  // 'thumbnail' => get_field( 'category_preivew', $post_term )['url']
                  'thumbnail' => $post_term_thumbnail
                ];
              }

            } else {
              // Если родительской категории нет в массиве, то создадим ее
              // и вставим текущую дочернуюю категорию
              $catalogue[ $post_term_parent_id ] = [
                'name' => $post_term_parent->name,
                'childs' => [ $post_term_name => [
                  'id' => $post_term_id,
                  // 'thumbnail' => get_field( 'category_preivew', $post_term )['url']
                  'thumbnail' => $post_term_thumbnail
                ] ]
              ];
            } // endif $catalogue[ $post_term_parent_id ]

          } else {
            // Если текущая категория не имеет роидетей (т.е. Столовая или другая категория)
            // то просто пропустим ее
            continue;
          } // endif post_term_parent

        } // endforeach $post_terms

      } // end foreach $posts

      // Переносим спальни в конец
      $mdy = $catalogue[52];
      unset( $catalogue[52] );
      $catalogue[] = $mdy;

      // Переносим мебель для улицы в конец
      $mdy = $catalogue[60];
      unset( $catalogue[60] );
      $catalogue[] = $mdy;

      $i = 0;
      foreach ( $catalogue as $parent_category_id => $parent_category ) {
        $active_class = $i === 0 ? ' active' : '';

        $catalogue_left .= '<button type="button" class="catalogue-items__category' . $active_class . '" data-term-id="' . $parent_category_id . '">' . $parent_category['name'] . '</button>';

        $catalogue_right .= '<div class="catalogue-items__right-item' . $active_class . '" data-term-id="' . $parent_category_id . '">';

        foreach ( $parent_category['childs'] as $child_category_name => $child_category ) {
          $url = get_term_link( $child_category['id'] ) . '?brand=' . $that->slug;
          $img_src = $child_category['thumbnail'];
          $catalogue_right .= print_ctatlogue_item( $url, $child_category_name, false, $img_src, false );

          unset( $url, $img_src, $child_category_name, $child_category );
        } // endforeach $parent_category['childs']

        $catalogue_right .= '</div>';

        $i++;
      } // endforeach $catalogue

      $catalogue_left .= '</div>';
      $catalogue_right .= '</div>';
      $section_items = $catalogue_left . $catalogue_right;
      
    } // endif is_tag()
  } else {

    foreach ( $brands as $brand ) {
      $url = get_tag_link( $brand->term_id );
      $title = $brand->name;
      $descr = get_field( 'brand_country', $brand );
      $img_src = get_field( 'brand_preview', $brand )['url'];

      if ( !$img_src ) {
        $img_src = get_field( 'brand_img', $brand )['url'];
        
        if ( !$img_src ) {
          $item = get_posts( [
            'tag' => $brand->slug,
            'numberposts' => 1
          ] );

          if ( $item ) {
            $img_src = get_the_post_thumbnail_url( $item[0]->ID );
          }
        }
      }

      $section_items .= print_ctatlogue_item( $url, $title, $descr , $img_src, false );

      unset( $url, $title, $descr, $img_src, $item );
    } // endforeach $brands
  } // endif !$brands

} else if ( $selected === 'items' ) {
  $args = ['exclude' => $post->ID];
  $args = ['orderby' => 'rand'];
  // Если товары по умолчанию
  if ( $items_by_default ) {
    if ( is_single() ) {
      $brand = get_the_terms( $post->ID, 'post_tag' )[0];
      $args['category__not_in'][] = $brand->term_id;
    }
    if ( $that->taxonomy === 'category' && $that->parent ) {
      $args['category__not_in'][] = $that->term_id;
    }
    $items = get_posts( $args );
  } else if ( $items_from_collection ) {
    if ( is_single() ) {
      $brand = get_the_terms( $post->ID, 'post_tag' )[0];
      $args['tag'] = $brand->slug;
    }
    $items = get_posts( $args );
  } else {
    $items = $section['items'];
  } // endif $items_by_default

  $i = 0;

  foreach ( $items as $item ) {
    $url = get_post_permalink( $item->ID );
    $title = $item->post_title;
    $descr = get_field( 'material', $item );

    if ( !$items_from_collection ) {
      $item_brands = get_the_terms( $item->ID, 'post_tag' );

      foreach ( $item_brands as $item_brand ) {
        if (  !$item_brand->parent ) {
          $descr .= '<br>' . $item_brand->name;
          break;
        } else {
          $descr .= '<br>' . get_term( $item_brand->parent )->name;
          break;
        }
      }
    }

    $thumbnail = get_the_post_thumbnail_url( $item );

    $styles = $section['view'] === 'loadmore' && $i > 5 ? 'display:none' : '';
    $lazy = $section['view'] === 'loadmore' && $i > 5 ? false : true;

    $i++;

    $section_items .= print_ctatlogue_item( $url, $title, $descr, $thumbnail, false, $lazy, $styles );

    unset( $url, $title, $descr, $thumbnail, $item_brands, $item_brand );
  }
} else if ( $selected === 'categories_items' ) {
  $catalogue_left = '<div class="catalogue-items__left"><hr class="catalogue-items__left-line">';
  $catalogue_right = '<div class="catalogue-items__right lazy" data-src="#"">';

  if ( is_tag() ) {
    // Если бренды
    $posts = get_posts( [
      'numberposts' => -1,
      'tag' => $that->slug
    ] );

    $catalogue = [];

    foreach ( $posts as $post ) {

      $post_terms = get_the_terms( $post, 'category' );

      foreach ( $post_terms as $post_term ) {

        $post_term_parent_id = $post_term->parent;
        $post_term_id = $post_term->term_id;
        $post_term_name = $post_term->name;
        $post_term_thumbnail = get_field( 'category_preivew', $post_term )['url'];
        $post_term_descr = $post_term->$description;

        if ( !$post_term_thumbnail ) {
          $post_term_thumbnail = get_the_post_thumbnail_url( $post->ID );
        }

        if ( $post_term_parent_id ) {
          // Если текущая категория имеет родиетелей (т.е. это подкатегория)
          // получим родителя
          $post_term_parent = get_term( $post_term_parent_id );

          if ( $catalogue[ $post_term_parent_id ] ) {
            // Если родительская категория уже существует в массиве
            // то проверим есть ли там дочерняя категория
            // и вставим ее
            if ( $catalogue[ $post_term_parent_id ]['childs'][ $post_term_name ] ) {
              continue;
            } else {
              $catalogue[ $post_term_parent_id ]['childs'][ $post_term_name ] = [
                'id' => $post_term_id,
                // 'thumbnail' => get_field( 'category_preivew', $post_term )['url']
                'thumbnail' => $post_term_thumbnail
              ];
            }

          } else {
            // Если родительской категории нет в массиве, то создадим ее
            // и вставим текущую дочернуюю категорию
            $catalogue[ $post_term_parent_id ] = [
              'name' => $post_term_parent->name,
              'childs' => [ $post_term_name => [
                'id' => $post_term_id,
                // 'thumbnail' => get_field( 'category_preivew', $post_term )['url']
                'thumbnail' => $post_term_thumbnail
              ] ]
            ];
          } // endif $catalogue[ $post_term_parent_id ]

        } else {
          // Если текущая категория не имеет роидетей (т.е. Столовая или другая категория)
          // то просто пропустим ее
          continue;
        } // endif post_term_parent

      } // endforeach $post_terms

    } // end foreach $posts

    $i = 0;
    foreach ( $catalogue as $parent_category_id => $parent_category ) {
      $active_class = $i === 0 ? ' active' : '';

      $catalogue_left .= '<button type="button" class="catalogue-items__category' . $active_class . '" data-term-id="' . $parent_category_id . '">' . $parent_category['name'] . '</button>';

      $catalogue_right .= '<div class="catalogue-items__right-item' . $active_class . '" data-term-id="' . $parent_category_id . '">';

      foreach ( $parent_category['childs'] as $child_category_name => $child_category ) {
        $url = get_term_link( $child_category['id'] ) . '?brand=' . $that->slug;
        $img_src = $child_category['thumbnail'];
        $catalogue_right .= print_ctatlogue_item( $url, $child_category_name, false, $img_src, false );

        unset( $url, $img_src, $child_category_name, $child_category );
      } // endforeach $parent_category['childs']

      $catalogue_right .= '</div>';

      $i++;
    } // endforeach $catalogue

    $catalogue_left .= '</div>';
    $catalogue_right .= '</div>';
    $section_items = $catalogue_left . $catalogue_right;

  } // endif is_tag()

} else if ( $selected === 'brand_catalogues') {
  $items = get_tags( [
    'hide_empty' => false,
    'child_of' => $that->term_id
  ] );
  
  foreach ( $items as $item ) {
    $catalogue_fields = get_field( 'brand_catalogue', $item );
    
    if ( $catalogue_fields ) {
      $url = $catalogue_fields['file']['url'];
      $title = $item->name;
      $img = $catalogue_fields['img']['url'];

      $section_items .= print_ctatlogue_item( $url, $title, false , $img, false );
    }

    unset( $catalogue_fields, $url, $title, $descr, $img );
  }
}

if ( $section_items ) : ?>
  <section class="catalogue-items-sect container<?php echo $section_class ?>"<?php echo $section_id ?>> <?php
    if ( $section_title ) : ?>
      <div class="catalogue-items-sect__heading">
        <<?php echo $title_tag ?> class="catalogue-items-sect__title"><?php echo $section_title ?></<?php echo $title_tag ?>> <?php
        if ( $section_descr ) :
          $section_descr_class = mb_strlen( $section_descr ) > 200 ? ' long-text' : '' ?>
          <p class="catalogue-items-sect__descr<?php echo $section_descr_class ?>"><?php echo $section_descr ?></p> <?php
        endif ?>
        <div class="catalogue-items-sect__nav"><span class="catalogue-items-sect__counter"></span></div>
      </div> <?php
    endif ?>
    <div class="catalogue-items lazy <?php echo $view_class ?>" data-src="#"> <?php
      echo $section_items ?>
    </div> <?php
    #if ( $section['view'] ) : ?>
      <!-- <button type="button" class="catalogue-items-sect__loadmore btn btn_brown">Загрузить еще</button> --> <?php
    #endif ?>
  </section> <?php
endif;
unset( $section_id, $section_class, $title_tag, $items_by_default, $selected, $section_items, $that, $section_items, $section_descr_class, $section_descr ) ?>