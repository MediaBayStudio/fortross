<?php

function cretae_picture_form_img_field( $section_class, $img_field, $lazy = true, $alt = '', $print = true ) {
  global $is_webp_support, $media_queries;

  $pic_class = $section_class . '__pic';
  $img_class = $section_class . '__img';

  $image_array = [
    'img' => $img_field,
    'media' => 0
  ];
  
  $img_field = get_fields( $img_field['ID'] );
  // $img_field[] = $image_array;


  if ( $lazy ) {
    $pic_class .= ' lazy';
    $img_attr = 'src="#" data-src="';
    $source_attr = 'srcset="#" data-srcset="';
  } else {
    $img_attr = 'src="';
    $source_attr = 'srcset="';
  }


  if ( $img_field['gallery_img'] ) {
    $fancybox_href = ' data-fancybox-href="' . $img_field['gallery_img']['img']['url'] . '"';
  } else if ( $img_field['large'] ) {
    $fancybox_href = ' data-fancybox-href="' . path_join( site_url(), $img_field['large'] ) . '"';
  }

  if ( $is_webp_support ) {
    if ( $img_field['gallery_webp'] ) {
      $fancybox_href = ' data-fancybox-href="' . $img_field['gallery_webp']['img']['url'] . '"';
    } else if ( $img_field['large_webp'] ) {
      $fancybox_href = ' data-fancybox-href="' . path_join( site_url(), $img_field['large_webp'] ) . '"';
    }
  }

  $tag = '<picture class="' . $pic_class . '">';

  // Придется делать массив вручную
  $image_fields = [
    '2x_webp' => $img_field['2x_webp'],
    'webp' => $img_field['webp'],
    '2x' => $img_field['2x']
  ];

  $image_fields[] = $image_array;

  if ( !$image_fields['2x_webp'] && $img_field['2x_webp_i'] ) {
    $image_fields['2x_webp'] = [
      'img' => [
        'url' => path_join( site_url(), $img_field['2x_webp_i'] ),
        'mime_type' => 'image/webp'
      ],
      'media' => $media_queries['2x']
    ];
  }

  if ( !$image_fields['webp'] && $img_field['webp_i'] ) {
    $image_fields['webp'] = [
      'img' => [
        'url' => path_join( site_url(), $img_field['webp_i'] ),
        'mime_type' => 'image/webp'
      ],
      'media' => $media_queries['1x']
    ];
  }

  if ( !$image_fields['2x'] && $img_field['2x_i'] ) {
    $image_fields['2x'] = [
      'img' => [
        'url' => path_join( site_url(), $img_field['2x_i'] ),
        'mime_type' => 'image/webp'
      ],
      'media' => $media_queries['2x']
    ];
  }

  foreach ( $image_fields as $key => $img ) {
    if ( !$img || $key === 'gallery_img' || $key === 'gallery_webp' ) {
      continue;
    }

    $img_url = $img['img']['url'];

    if ( $img['media'] ) {
      $media = ' media="' . $img['media'] . '"';
    } else {
      $media = '';
    }

    if ( $alt ) {
      $img_alt = $alt;
    } else {
      if ( $img['img']['alt'] ) {
        $img_alt = $img['img']['alt'];
      } else {
        $img_alt = '#';
      }
    }

    if ( $img['media'] == '0' ) {
      if ( $img['img']['height'] > $img['img']['width'] ) {
        $img_class .= ' img-horizontal';
      }
      $tag .= '<img ' . $img_attr . $img_url . '" alt="' . $img_alt . '"' . $media . ' class="' . $img_class . '"' . $fancybox_href . '>';
    } else {
      $tag .= '<source ' . $source_attr . $img_url . '" type="' . $img['img']['mime_type'] . '"' . $media . '>';
    }
    
    unset( $img_url, $media, $img_alt );
  }

  $tag .= '</picture>';

  if ( $print ) {
    echo $tag;
  } else {
    return $tag;
  }

}