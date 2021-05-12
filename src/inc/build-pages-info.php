<?php
function build_pages_info( $pages_info_cnt ) {
  global $template_dir;
  // Путь к файлу с информацией для gulp
  $pages_info_path = $template_dir . '/pages-info.json';

  // Если существует, то лучше удалить и создать заново
  if ( file_exists( $pages_info_path ) ) {
    $exists_cnt = (array) json_decode( file_get_contents( $pages_info_path ) );
    $page_name = array_keys( $pages_info_cnt )[0];

    if ( $exists_cnt[ $page_name ] ) {
      $exists_cnt[ $page_name ] = $pages_info_cnt[ $page_name ];
    } else {
      $exists_cnt = array_merge( $exists_cnt, $pages_info_cnt );
    }

    $pages_info_cnt = $exists_cnt;

  }

  file_put_contents( $pages_info_path, json_encode( $pages_info_cnt ) );
}