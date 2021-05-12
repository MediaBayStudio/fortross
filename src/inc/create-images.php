<?php
// add_filter( 'acf/load_field/name=create_images', function ( $field ) {
//   global $post;

//   if ( !$post ) {
//     // не будет показано на странице редактирования группы полей
//     echo '<div class="create-images-block"><button type="button" id="create-images" class="button button-small" onclick="createImages()">Создать адаптивные изобаржения</button><span class="spinner"></span><span class="success hidden" aria-hidden="true" style="text-align:left;color:#008a20">Создано!</span></div>';

//   }
//   return $field;

// } );


add_filter('acf/load_value/name=create_images', function ( $value, $post_id, $field ) {
  if ( !is_single() ) {
    echo '<div class="create-images-block"><button type="button" id="create-images" class="button button-small" onclick="createImages()">Создать адаптивные изобаржения</button><span class="spinner"></span><span class="success hidden" aria-hidden="true" style="text-align:left;color:#008a20">Создано!</span></div>';
  }
  return $value;
}, 10, 3);

function compressImage( $source_url, $destination_url = null, $quality = 75 ) {
  if ( is_null( $destination_url ) ) {
    $destination_url = $source_url;
  }

  $info = getimagesize( $source_url );

  if ( $info['mime'] === 'image/jpeg' ) $image = imagecreatefromjpeg( $source_url );
  elseif ( $info['mime'] === 'image/gif' ) $image = imagecreatefromgif( $source_url );
  elseif ( $info['mime'] === 'image/png' ) $image = imagecreatefrompng( $source_url );

  imagejpeg( $image, $destination_url, $quality );

  return $destination_url;
}

function create_images() {
  $img_id = (int) $_POST['id'];
  $img = get_post( $img_id );
  $img_filepath = get_attached_file( $img_id );
  $upload_dir = preg_replace( '/[^\/]+$/', '', $img_filepath );
  $img_filename = $img->post_title;                           // image
  $img_basename = wp_basename( $img_filepath );               // image.jpg
  $img_extname = preg_replace( '/.*\./', '', $img_basename ); // jpg
  $img_mime_type = $img->post_mime_type;

  $site_url = site_url();

  if ( $_POST['webp_i'] ) {
    delete_field( 'webp_i', $img_id );

    $webp_filepath = $upload_dir . $img_filename . '.webp';
    $webp_end_url = preg_replace( '/.*(?=wp-content)/', '', $webp_filepath );
    $webp_url = path_join( $site_url, $webp_end_url );

    // Проверка существования файла в той же папке
    if ( !file_exists( $webp_filepath ) ) {
      $cwebp = '/usr/local/bin/cwebp ' . $img_basename . ' -o ' . $img_filename . '.webp';
      chdir( $upload_dir ); // переход в папку
      exec( $cwebp ); // создание webp
    }

    update_field( 'webp_i', $webp_end_url, $img_id );

  }

  if ( $_POST['2x_i'] ) {
    $filepath_2x = $upload_dir . $img_filename . '@2x.jpg';
    $img_2x_basename = $img_filename . '@2x.jpg';

    if ( file_exists( $filepath_2x ) ) {
      delete_field( '2x_i', $img_id );
      $filepath_2x_end_url = preg_replace( '/.*(?=wp-content)/', '', $filepath_2x );
      $filepath_2x_url = path_join( $site_url, $filepath_2x_end_url );
      update_field( '2x_i', $filepath_2x_end_url, $img_id );
      compressImage( $filepath_2x, $filepath_2x );
    }

  }

  if ( $_POST['2x_webp_i'] && file_exists( $filepath_2x ) ) {
    delete_field( '2x_webp_i', $img_id );

    $webp_2x_filepath = $upload_dir . $img_filename . '@2x.webp';
    $webp_2x_end_url = preg_replace( '/.*(?=wp-content)/', '', $webp_2x_filepath );
    $webp_2x_url = path_join( $site_url, $webp_2x_end_url );

    // Проверка существования файла в той же папке
    if ( !file_exists( $webp_2x_filepath ) ) {
      $cwebp = '/usr/local/bin/cwebp ' . $img_2x_basename . ' -o ' . $img_filename . '@2x.webp';
      chdir( $upload_dir ); // переход в папку
      exec( $cwebp ); // создание webp
    }

    update_field( '2x_webp_i', $webp_2x_end_url, $img_id );
  }

  if ( $_POST['large'] ) {
    $filepath_large = $upload_dir . $img_filename . '-large.jpg';
    $img_large_basename = $img_filename . '-large.jpg';

    if ( file_exists( $filepath_large ) ) {
      delete_field( 'large', $img_id );
      $filepath_large_end_url = preg_replace( '/.*(?=wp-content)/', '', $filepath_large );
      $filepath_large_url = path_join( $site_url, $filepath_large_end_url );
      update_field( 'large', $filepath_large_end_url, $img_id );

      compressImage( $filepath_large, $filepath_large );
    }
  }

  if ( $_POST['large_webp'] && file_exists( $filepath_large ) ) {
    delete_field( 'large_webp', $img_id );
    $webp_large_filepath = $upload_dir . $img_filename . '-large.webp';
    $webp_large_end_url = preg_replace( '/.*(?=wp-content)/', '', $webp_large_filepath );
    $webp_large_url = path_join( $site_url, $webp_large_end_url );

    // Проверка существования файла в той же папке
    if ( !file_exists( $webp_large_filepath ) ) {
      $cwebp = '/usr/local/bin/cwebp ' . $img_large_basename . ' -o ' . $img_filename . '-large.webp';
      chdir( $upload_dir ); // переход в папку
      exec( $cwebp ); // создание webp
    }

    update_field( 'large_webp', $webp_large_end_url, $img_id );
  }


  $response = [
    'webp_i'        => $webp_end_url,
    '2x_i'          => $filepath_2x_end_url,
    '2x_webp_i'     => $webp_2x_end_url,
    'large'       => $filepath_large_end_url,
    'large_webp'  => $webp_large_end_url
  ];

  compressImage( $img_filepath, $img_filepath );

  echo json_encode( $response );

  die();
}

add_action( 'wp_ajax_nopriv_create_images', 'create_images' ); 
add_action( 'wp_ajax_create_images', 'create_images' );