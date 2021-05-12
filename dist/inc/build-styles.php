<?php
add_action( 'post_updated', function( $post_ID, $post_after, $post_before ) {
  if ( !function_exists( 'get_field' ) ) {
    return;
  }
  global $template_dir;

  $screen_widths = ['0', '576', '768', '1024', '1280'];

  // Пролучаем секции для страницы
  $sections = get_field( 'sections', $post_ID );

  if ( $sections ) {

    // Вставляем в начало блоков шапку и мобильное меню
    array_unshift( $sections, ['acf_fc_layout' => 'header'], ['acf_fc_layout' => 'mobile-menu'] );

    // Вставляем в конец блоков футер
    array_push( $sections, ['acf_fc_layout' => 'footer'] );

    // Получаем ярлык шаблона и убираем .php в нем (будет index, about и т.д.)
    $template_slug = str_replace( '.php', '', get_page_template_slug( $post_ID ) );

    foreach ( $screen_widths as $width ) {
      $cnt = ''; // Делаем чистую переменную с контентом

      if ( $width === '0') {
        $slug = $template_slug;
      } else {
        $slug = $template_slug . '.' . $width;
      }

      foreach ( $sections as $section ) {
        $section_name = $section['acf_fc_layout'];

        // Собираем в массив значения секций
        // $page_info_cnt[ $template_slug ][] = $section_name;

        if ( $width === '0' ) {
          $filename = $section_name . '.css';
        } else {
          $filename = $section_name . '.' . $width . '.css';
        }
        
        $filepath = $template_dir . '/blocks/' . $section_name . '/' . $filename;
        
        if ( file_exists( $filepath ) ) {
          $cnt .= file_get_contents( $filepath );
        }
      }

      // Делаем массив с информацией секций уникальным
      // $page_info_cnt[ $template_slug ] = array_unique( $page_info_cnt[ $template_slug ] );

      $dest = $template_dir . '/css/style-' . $slug . '.css';

      if ( file_exists( $dest ) ) {
        unlink( $dest );
      }
 
      file_put_contents( $dest, $cnt );
    }

    $page_info_cnt[ $template_slug ] = [];

    foreach ( $sections as $section ) {
      $section_name = $section['acf_fc_layout'];
      if ( !in_array( $section_name, $page_info_cnt[ $template_slug ] ) ) {
        $page_info_cnt[ $template_slug ][] = $section_name;
      }
    }

    // Создаем файл с информацией для gulp
    build_pages_info( $page_info_cnt );

  }
}, 10, 3 );