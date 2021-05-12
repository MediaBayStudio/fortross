<?php

function print_breadcrumbs( $that ) {
  global $site_url;

  $breadcrumbs = [
    0 => [
      'title' => 'Главная',
      'url' => $site_url . '/'
    ]
  ];

  if ( is_tag() ) {
    $parent = $that->parent;

    $breadcrumbs[] = [
      'title' => 'Бренды',
      'url' => $site_url . '/brands/'
    ];

    if ( $parent ) {
      $parent = get_term( $parent );

      $breadcrumbs[] = [
        'title' => $parent->name,
        'url' => get_tag_link( $parent )
      ];
    }

    $breadcrumbs[] = [
      'title' => $that->name,
      'url' => '#'
    ];

  } else if ( is_category() ) {
    $that_category = get_queried_object();

    if ( $_GET['brand'] ) {
      $breadcrumbs[] = [
        'title' => 'Бренды',
        'url' => $site_url . '/brands/'
      ];

      $brand_slug = $_GET['brand'];
      $term = get_term_by( 'slug', $brand_slug, 'post_tag' );
      $parent_term = get_term( $term->parent );

      if ( !is_wp_error( $parent_term ) ) {
        $breadcrumbs[] = [
          'title' => $parent_term->name,
          'url' => get_tag_link( $parent_term )
        ];
      }

      $breadcrumbs[] = [
        'title' => $term->name,
        'url' => get_tag_link( $term )
      ];

      $breadcrumbs[] = [
        'title' => $that_category->name,
        'url' => '#'
      ];

    } else {
      $breadcrumbs[] = [
        'title' => 'Каталог',
        'url' => $site_url . '/catalogue/'
      ];
      if ( $that_category->parent ) {
        $parent_term = get_term( $that_category->parent );

        $breadcrumbs[] = [
          'title' => $parent_term->name,
          'url' => get_category_link( $parent_term )
        ];
      }
      $breadcrumbs[] = [
        'title' => $that_category->name,
        'url' => '#'
      ];
    }
  } else if ( is_single() ) {
    if ( $_GET['brand'] ) {
      $breadcrumbs[] = [
        'title' => 'Бренды',
        'url' => $site_url . '/brands/'
      ];

      $brand_slug = $_GET['brand'];

      $brand = get_term_by( 'slug', $brand_slug, 'post_tag' );
      $parent_brand = get_term( $brand->parent );
      $categories = get_the_terms( get_the_ID(), 'category' );

      if ( !is_wp_error( $parent_brand ) ) {
        $breadcrumbs[] = [
          'title' => $parent_brand->name,
          'url' => get_tag_link( $parent_brand )
        ];
      }

      $breadcrumbs[] = [
        'title' => $brand->name,
        'url' => get_tag_link( $brand )
      ];

      foreach ( $categories as $category ) {
        if ( $category->parent ) {
          $breadcrumbs[] = [
            'title' => $category->name,
            'url' => get_category_link( $category->term_id ) . '?brand=' . $brand_slug
          ];
          break;
        }
      } // endforeqch $categories
    } else {
      $breadcrumbs[] = [
        'title' => 'Каталог',
        'url' => $site_url . '/catalogue/'
      ];

      $categories = get_the_terms( get_the_ID(), 'category' );

      foreach ( $categories as $category ) {
        if ( $category->parent ) {
          $parent_category = get_term( $category->parent );
          $breadcrumbs[] = [
            'title' => $parent_category->name,
            'url' => get_category_link( $parent_category->term_id )
          ];
          $breadcrumbs[] = [
            'title' => $category->name,
            'url' => get_category_link( $category->term_id )
          ];
          break;
        }
      } // endforeach $categories
    } // endif $_GET['brands']
    $breadcrumbs[] = [
      'title' => get_the_title(),
      'url' => '#'
    ];
  } else {
    $breadcrumbs[] = [
      'title' => $that->post_title,
      'url' => '#'
    ];
  } ?>

  <div class="breadcrumbs container">
    <ul class="breadcrumbs__ul"> <?php
      foreach ( $breadcrumbs as $breadcrumb ) : ?>
        <li class="breadcrumbs__li"><a class="breadcrumbs__link" href="<?php echo $breadcrumb['url'] ?>"><?php echo $breadcrumb['title'] ?></a></li> <?php
      endforeach ?>
    </ul>
  </div> <?php
}