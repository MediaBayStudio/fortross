<?php

// Функция подключения стилей
function enqueue_style( $style_name, $widths ) {
  global $template_directory;

  if ( is_string( $widths ) ) {
    if ( $style_name === 'hover' ) {
      wp_enqueue_style( "{$style_name}", $template_directory . "/css/{$style_name}.css", [], null, "(hover), (min-width:1024px)" );
    } else {
      wp_enqueue_style( "{$style_name}", $template_directory . "/css/{$style_name}.css", [], null );
    }
  } else {
    foreach ( $widths as $width ) {
      if ( $width !== "0" ) {
        $media = $width - 0.02;
         // если размер файла равен 0, то не подключаем его
        if ( filesize( get_template_directory() . '/css/' . $style_name . '.' . $width . '.css' ) === 0 ) {
          continue;
        }
        wp_enqueue_style( "{$style_name}-{$width}px", $template_directory . "/css/{$style_name}.{$width}.css", [], null, "(min-width: {$media}px)" );
      } else {
        wp_enqueue_style( "{$style_name}-page", $template_directory . "/css/{$style_name}.css", [], null );
      }
    }
  }
}

// Подключаем свои стили и скрипты
add_action( 'wp_enqueue_scripts', function() {
  global $template_directory;
  $screen_widths = ['0', '576', '768', '1024', '1280']; // на каких экранах подключать css

  wp_enqueue_style( 'theme-style', get_stylesheet_uri(), [], null );        // подключить стиль темы (default)

  // подключаем стили с помощью своей функции
  // enqueue_style( 'style', $screen_widths );

  if ( is_page_template( 'index.php' ) || is_front_page() ) {
		$style_name = 'style-index';
		$script_name = 'script-index';
	} else if ( is_page_template( 'about.php' ) ) {
		$style_name = 'style-about';
		$script_name = 'script-about';
	} else if ( is_page_template( 'category.php' ) ) {
		$style_name = 'style-category';
		$script_name = 'script-category';
	} else if ( is_page_template( 'taxonomy.php' ) ) {
		$style_name = 'style-taxonomy';
		$script_name = 'script-taxonomy';
	} else if ( is_page_template( 'contacts.php' ) ) {
    $style_name = 'style-contacts';
    $script_name = 'script-contacts';
  } else if ( is_page_template( 'tag.php' ) ) {
    $style_name = 'style-tag';
    $script_name = 'script-tag';
  } else if ( is_tag() ) {
    $tag = get_queried_object();

    if ( $tag->parent ) {
      $style_name = 'style-tag-brand-child';
      $script_name = 'script-tag-brand-child';
    } else {
      $style_name = 'style-tag-brand';
      $script_name = 'script-tag-brand';
    }
  } else if ( is_category() ) {
    $style_name = 'style-category';
    $script_name = 'script-category';
  } else if ( is_single() ) {
    $style_name = 'style-single';
    $script_name = 'script-single';
  }

  $GLOBALS['page_script_name'] = $script_name;

	enqueue_style( $style_name, $screen_widths );

  enqueue_style( 'hover', '' ); // подключаем стили для эффектов при наведении

  if ( is_single() ) {
    enqueue_style( 'fancybox.min', '' );
    wp_enqueue_script( "fancybox.min", $template_directory . "/js/fancybox.min.js", [], null );
  }

  // Подключаем скрипты

	$scripts = [ $script_name, 'lazy.min', 'slick.min', 'Popup.min' ];

  foreach ( $scripts as $script_name ) {
    wp_enqueue_script( "{$script_name}", $template_directory . "/js/{$script_name}.js", [], null );
  }

  // Отключаем стандартные jquery, jquery-migrate
  // лучше подключать свой jquery
  wp_deregister_script( 'jquery-core' );
  wp_deregister_script( 'jquery' );

  // Подключаем свой jquery
  wp_register_script( 'jquery-core', $template_directory . '/js/jquery-3.5.1.min.js', false, null, true );
  wp_register_script( 'jquery', false, ['jquery-core'], null, true );
  wp_enqueue_script( 'jquery' );

} );

// Скрипт в админку
add_action( 'admin_enqueue_scripts', function() {
  global $template_directory;
  wp_enqueue_script( "script-admin", $template_directory . "/js/script-admin.js", [], null );
  wp_enqueue_style( "style-admin", $template_directory . "/style-admin.css", [], null );
} );

// Убираем id и type в тегах script, добавляем нужным атрибут defer
  add_filter( 'script_loader_tag',   function( $html, $handle ) {
    if ( !is_super_admin() && !is_admin_bar_showing() ) {
      switch ( $handle ) {
        case 'wp-polyfill':
        case 'wp-hooks':
        case 'wp-i18n':
        case 'lodash':
        case 'wp-url':
        case 'wp-api-fetch':
          return '';
      }
    }

    switch ( $handle ) {
      case $GLOBALS['page_script_name']:
      case 'slick.min':
      case 'lazy.min':
      case 'contact-form-7':
      case 'fancybox.min':
        $html = str_replace( ' src', ' defer src', $html );
        break;
    }

    $html = str_replace( " id='$handle-js' ", '', $html );
    $html = str_replace( " type='text/javascript'", '', $html );

    return $html;
  }, 10, 2);

// Убираем id и type в тегах style
  add_filter( 'style_loader_tag', function( $html, $handle ) {
    // Подключаем стили гутенберга только в админке
    if ( !is_single() && !is_admin() && $handle === 'wp-block-library' ) {
      return '';
    }
    $html = str_replace( " id='$handle-css' ", '', $html );
    $html = str_replace( " type='text/css'", '', $html );
    return $html;
  }, 10, 2 );