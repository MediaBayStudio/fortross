<?php
add_action( 'add_attachment', function( $img_ID ) {
  return;
  $img = get_post( $img_ID );

  if (
    stripos( $img->post_mime_type, 'jpeg' ) === false
    &&
    stripos( $img->post_mime_type, 'jpg' ) === false
    &&
    stripos( $img->post_mime_type, 'png' ) === false
  ) {
    return;
  }

  $find_large_regExp = '/-large(?!\w)/';

  $acf_names = [
    'gallery'       => 'gallery_img',
    'gallery_webp'  => 'gallery_webp',
    '2x'            => '2x',
    '2x_webp'       => '2x_webp',
    'webp'          => 'webp'
  ];

  $img_filepath = get_attached_file( $img_ID );
  $upload_dir = preg_replace( '/[^\/]+$/', '', $img_filepath );
  $img_filename = $img->post_title; // image
  $img_basename = wp_basename( $img_filepath ); // image.jpg
  $img_extname = preg_replace( '/.*\./', '', $img_basename ); // jpg
  $img_mime_type = $img->post_mime_type;

  // Если у загруженного изображения есть префикс large
  // то найдем его оригинал и вставим в поле галереи
  if ( preg_match ( $find_large_regExp, $img_filename ) === 1 ) {
    $original_img_title = str_replace( '-large', '', $img_filename );
    $original_img = get_page_by_title( $original_img_title, OBJECT, 'attachment' );

    // $text = 'original_img_title: ' . $original_img_title;
    // $text .= PHP_EOL;
    // $text .= 'original_img:' . json_encode( $original_img );
    // $text .= 'acf:' . $acf_names['gallery'];
    // $text .= 'img_ID:' . $img_ID;

    // file_put_contents( get_template_directory() . '/file.txt', $text );

    if ( $original_img ) {
      // $text .= 'original_img: true';
      update_field( $acf_names['gallery'], ['img' => $img->ID], $original_img->ID );
    }

  } else {
    // Если у изображения нет префикса large
    // то проверим ACF поле на наличие такого изображения
    // и если его нет то попробуем найти.
    // Будем к названию прибавлять префикс large
    // и искать изображение в бд
    // затем вставлять в ACF
    $large_img = get_page_by_title( $img_filename . '-large', OBJECT, 'attachment' );

    if ( $large_img ) {
      // Теперь если файл существует
      // вставим его в ACF
      update_field( $acf_names['gallery'], ['img' => $large_img->ID], $img_ID );
    }
  }

  // Также поступаем с 2x изображением
  if ( stripos( $img_filename, '@2x' ) !== false ) {
    $original_img = get_page_by_title( preg_replace( '/@2x/', '', $img_filename, 1 ), OBJECT, 'attachment' );

    if ( $original_img ) {
      update_field( $acf_names['2x'], ['img' => $img_ID], $original_img->ID );
    }
  }

  // Названия будущих webp файлов
  $webp_filepath = $upload_dir . $img_filename . '.webp';
  $webp_title = $img_filename . '-webp';

  if ( !file_exists( $webp_filepath ) ) {
    $cwebp = '/usr/local/bin/cwebp ' . $img_basename . ' -o ' . $img_filename . '.webp';
    chdir( $upload_dir ); // переход в папку
    exec( $cwebp ); // создание webp

    // Проверим тип поста, который мы будем использовать в поле 'post_mime_type'.
    $filetype = wp_check_filetype( basename( $webp_filepath ), null );

    // Получим путь до директории загрузок.
    $wp_upload_dir = wp_upload_dir();


    $attachment = [
      'guid'           => $wp_upload_dir['url'] . '/' . basename( $webp_filepath ), 
      'post_mime_type' => $filetype['type'],
      'post_title'     => $webp_title,
      'post_content'   => '',
      'post_status'    => 'inherit'
    ];

    // Вставляем запись в базу данных.
    $attach_id = wp_insert_attachment( $attachment, $webp_filepath, $img_ID );

    // Подключим нужный файл, если он еще не подключен
    // wp_generate_attachment_metadata() зависит от этого файла.
    require_once( ABSPATH . 'wp-admin/includes/image.php' );

    // Создадим метаданные для вложения и обновим запись в базе данных.
    $attach_data = wp_generate_attachment_metadata( $attach_id, $webp_filepath );
    wp_update_attachment_metadata( $attach_id, $attach_data );

    // Проверяем изображение и вставляем в ACF родителя
    if ( stripos( $img_filename, '@2x' ) === false ) {
      // Если это обычное не 2x изображение
      $parent_img_title = $img_filename;
      $acf_field = 'webp';
    } else {
      // Если это 2х изображение
      $parent_img_title = preg_replace( '/@2x/', '', $img_filename, 1 );
      $acf_field = '2x_webp';
    }

    if ( preg_match ( $find_large_regExp, $img_filename ) === 1 ) {
      // Если это изображение для галереи
      $parent_img_title = str_replace( '-large', '', $img_filename );
      $acf_field = 'gallery_webp';
    }

    // Получаем родительское изображение
    // и по его ID будем заполнять ACF
    $parent_img = get_page_by_title( $parent_img_title, OBJECT, 'attachment' );

    if ( $parent_img ) {
      update_field( $acf_names[ $acf_field ], ['img' => $attach_id], $parent_img->ID );
    }


  }

  // Минификация
  // require_once( 'vendor/autoload.php' );
  // Tinify\setKey( 'JqPfklzhmNQ2nkCnRTsXbHsWDJvhrgmW' );
  // Tinify\fromFile( $img_filepath )->toFile( $img_filepath );

} );