<?php
function create_preload_from_img( $img, $img_fields = null, $print = true ) {
  global $is_webp_support, $media_queries;

  $template = '<link rel="preload" as="image" href="%href%" media="%media%" />';
  if ( !$img_fields ) {
    if ( is_array( $img ) ) {
      $img_id = $img['ID'];
    } else if ( is_object( $img ) ) {
      $img_id = $img->ID;
      $img = (array) $img;
    } else {
      $img_id = (int) $img;
      $img = (array) get_post( $img_id );
    }

    $img_fields = get_fields( $img_id );
  }

  if ( !$img['url'] ) {
    $img['url'] = wp_get_attachment_url( $img_id );
  }

  $images = array_merge( ['original' => $img], $img_fields );

  if ( $is_webp_support ) {
    if ( !$images['webp'] && $images['webp_i'] ) {
      $webp_url = path_join( site_url(), $images['webp_i'] );
      $webp_media = $media_queries['1x'];
    } else {
      $webp_url = $images['webp']['img']['url'];
      $webp_media = $images['webp']['media'];
    }

    if ( !$images['2x_webp'] && $images['2x_webp_i'] ) {
      $webp_2x_url = path_join( site_url(), $images['2x_webp_i'] );
      $webp_2x_media = $media_queries['2x'];
    } else {
      $webp_2x_url = $images['2x_webp']['img']['url'];
      $webp_2x_media = $images['2x_webp']['media'];
    }

    $tag = str_replace( '%href%', $webp_url, $template );
    $tag = str_replace( '%media%', $webp_media, $tag );
    $html .= $tag . PHP_EOL;
    $tag = str_replace( '%href%', $webp_2x_url, $template );
    $tag = str_replace( '%media%', $webp_2x_media, $tag );
    $html .= $tag . PHP_EOL;
  } else {
    if ( $images['webp_i'] ) {
      $webp_media = $media_queries['1x'];
    } else {
      $webp_media = $images['webp']['media'];
    }

    if ( !$images['2x'] && $images['2x_i'] ) {
      $url_2x = path_join( site_url(), $images['2x_i'] );
      $media_2x = $media_queries['2x'];
    } else {
      $url_2x = $images['2x']['img']['url'];
      $media_2x = $images['2x']['media'];
    }

    $tag = str_replace( '%href%', $images['original']['url'], $template );
    $tag = str_replace( '%media%', $webp_media, $tag );
    $html .= $tag . PHP_EOL;
    $tag = str_replace( '%href%', $url_2x, $template );
    $tag = str_replace( '%media%', $media_2x, $tag );
    $html .= $tag . PHP_EOL;
  }

  if ( $print ) {
    echo $html;
  } else {
    return $html;
  }

}