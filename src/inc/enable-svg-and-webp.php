<?php

// Расширяем список разрешенных файлов
add_filter( 'upload_mimes', function ( $mimes ) {
  $mimes['svg'] = 'image/svg+xml';
  $mimes['webp'] = 'image/webp';
  return $mimes;
} );


// Исправления mime types
add_filter( 'wp_check_filetype_and_ext', function( $types, $file, $filename, $mimes, $real_mime = '' ) {
  if ( strpos( $filename, '.webp' ) === false ) {
    if ( version_compare( $GLOBALS['wp_version'], '5.1.0', '>=' ) ) {
      $dosvg = in_array( $real_mime, [ 'image/svg', 'image/svg+xml' ] );
    } else {
      $dosvg = ( '.svg' === strtolower( substr( $filename, -4 ) ) );
    }

    // mime тип был обнулен, поправим его
    // а также проверим право пользователя
    if ( $dosvg ) {
      // разрешим
      if ( current_user_can( 'manage_options' ) ) {
        $types['ext']  = 'svg';
        $types['type'] = 'image/svg+xml';
      } else {
        // запретим
        $types['ext'] = $type_and_ext['type'] = false;
      }

    }
  } else {
    $types['ext'] = 'webp';
    $types['type'] = 'image/webp';
  }

  return $types;
}, 10, 5 );



add_filter( 'wp_prepare_attachment_for_js', function( $response ) {
  // Выводим картинку в медиафайлах
  if ( $response['mime'] === 'image/svg+xml' || $response['mime'] === 'image/webp' ) {

    // С выводом названия файла
    $response['image'] = [
      'src' => $response['url']
    ];

    $response['sizes'] = [
      'medium' => [
        'url' => $response['url']
      ],
      // при редактирования картинки
      'full' => [
        'url' => $response['url']
      ]
    ];
  }

  return $response;
} );