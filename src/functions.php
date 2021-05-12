<?php
$template_directory = get_template_directory_uri();
$template_dir = get_template_directory();
$wp_content_dir = content_url();
$site_url = site_url();
$is_front_page = is_front_page();
$is_404 = is_404();
$is_category = is_category();
$is_admin = is_admin();

$address = get_option( 'contacts_address' );
$address_link = get_option( 'contacts_address_link' );
$tel_1 = get_option( 'contacts_tel_1' );
$tel_1_dry = preg_replace( '/\s/', '', $tel_1 );
$tel_2 = get_option( 'contacts_tel_2' );
$tel_2_dry = preg_replace( '/\s/', '', $tel_2 );
$email = get_option( 'contacts_email' );
$facebook = get_option( 'contacts_facebook' );
$instagram = get_option( 'contacts_instagram' );
$zoom = get_option( 'contacts_zoom' );
$coords = get_option( 'contacts_coords' );

$logo_id = get_theme_mod( 'custom_logo' );
$logo_url = wp_get_attachment_url( $logo_id );

$media_queries = [
  '1x' => '(-webkit-max-device-pixel-ratio:1.99), (max-resolution: 191.04dpi)',
  '2x' => '(-webkit-min-device-pixel-ratio:2), (min-resolution: 192dpi)',
  'w576' => '(max-width:575.98px)'
];


// Выводим url страниц
add_action( 'admin_head', 'print_urls' );
add_action( 'wp_body_open', 'print_urls' );

function print_urls() {
  global $site_url, $template_directory, $template_dir;
  echo '<script id="page">var siteUrl = "' . $site_url . '", templateDirectoryUri = "' . $template_directory . '", templateDirectory = "' . $template_dir . '"</script>';
}

// Дополнительный класс для body
add_filter( 'body_class', function( $classes, $class ) {
  if ( get_queried_object()->parent ) {
    $classes[] = 'category-child';
  }
  return $classes;
}, 10, 2 );


// Татйл у всех категорий (не подкатегорий) будет "Каталог"
add_filter( 'document_title_parts', function( $title ) {
  if ( is_category() && !get_queried_object()->parent ) {
    $title['title'] = 'Каталог';
  }
  return $title;
} );

function get_catalogue_term() {
  $term_id = (int) $_POST['term_id'];

  if ( $term_id ) {
    $term = get_term( $term_id );
    $term_fields = get_fields( $term );

    $fig = $term_fields['category_preivew']['url'];
    $pic = $term_fields['category_extra_img']['url'];

    $args = [
      'numberposts' => 1,
      'category' => $term_id
    ];

    if ( !$fig ) {
      $fig = get_the_post_thumbnail_url( get_posts( $args )[0]->ID );
    }

    if ( !$pic ) {
      $args['offset'] = 1;
      $pic = get_the_post_thumbnail_url( get_posts( $args )[0]->ID );
    }

    $response = [
      'id' => $term_id,
      'fig' => $fig,
      'url' => get_category_link( $term ),
      'figcaption' => $term->description,
      'pic' => $pic
    ];

    echo json_encode( $response );

    die();
  }
}

add_action( 'wp_ajax_nopriv_f', 'f' ); 
add_action( 'wp_ajax_f', 'f' );

add_action( 'wp_ajax_nopriv_getcatalogueterm', 'get_catalogue_term' ); 
add_action( 'wp_ajax_getcatalogueterm', 'get_catalogue_term' );


function print_ctatlogue_item( $url, $title, $descr = '', $img_src, $print = true ) {
  $response = '
  <div class="catalogue-items__item">
    <a href="' . $url . '" class="catalogue-item__link">
      <span class="catalogue-item__title">' . $title . '</span>';
      if ( $descr ) {
        $response .= '<span class="catalogue-item__descr">' . $descr . '</span>';
      }
      $response .= '<img src="#" alt="' . $title . '" data-src="' . $img_src . '" class="catalogue-item__img lazy">
    </a>
  </div>';

  if ( $print ) {
    echo $response;
  } else {
    return $response;
  }
}

// Проверка поддержки webp браузером
if ( strpos( $_SERVER['HTTP_ACCEPT'], 'image/webp' ) !== false || strpos( $_SERVER['HTTP_USER_AGENT'], ' Chrome/' ) !== false ) {
  $is_webp_support = true; // webp поддерживается
} else {
  $is_webp_support = false; // webp не поддерживается
}

// Превращение img в link preload
require $template_dir . '/inc/create-link-preload.php';

// Активируем свг и вебп в админке
require $template_dir . '/inc/enable-svg-and-webp.php';

// Удаление разных скриптов и стилей от wp
// Отключаем гутенберг
// Отключаем emoji
// Отключаем весь css-файл CF7
// Отключаем генерацию некоторых лишнех тегов
require $template_dir . '/inc/disable-wp-scripts-and-styles.php';

// Поддержки темой, настройка thumbnails
require $template_dir . '/inc/theme-support-and-thumbnails.php';

// Подключение стилей и скриптов, чистка лишнего в html-тегах, настройка атрибутов
require $template_dir . '/inc/enqueue-styles-and-scripts.php';

// Создание webp копий изображений
require $template_dir . '/inc/generate-webp.php';

// Настройка доп. полей в панели настройки->общее
require $template_dir . '/inc/options-fields.php';

// Подключение и настройка меню, атрибутов, классов, id
require $template_dir . '/inc/menus.php';

// Функция разбора acf img field в picture > source
require $template_dir . '/inc/create-picture-from-img.php';

// Регистрация новых типов записей (бренды)
require $template_dir . '/inc/register-custom-posts-types-and-taxonomies.php';

// Функция вывода хлебных крошек
require $template_dir . '/inc/print-breadcrumbs.php';

if ( is_super_admin() || is_admin_bar_showing() ) {
  // Создание файлов стилей и скриптов для темы
  require $template_dir . '/inc/build-pages-info.php';
  require $template_dir . '/inc/build-styles.php';
  require $template_dir . '/inc/build-scripts.php';

  // Отключение некоторых пунктов меню
  require $template_dir . '/inc/remove-admin-menu.php';

  // Стили в админку
  // require $template_dir . '/inc/admin-styles.php';

  // Создание адаптивных изображений
  require $template_dir . '/inc/create-images.php';
}

// Автоматическое формирование ссылки для брендов
// работает только при создании бренда (не охота делать для изменения)
// brands/%brand%/
// brands/%brand%/%child_brand%/
add_action( 'created_post_tag', function( $tag_id ) {

  // Получаем данные бренда, который создали
  // формируем slug
  $tag = get_term( $tag_id, 'post_tag' );
  $parent_id = $tag->parent;
  $slug = $tag->slug;

  // Проверяем наличие родителя и формируем его slug
  if ( $parent_id ) {
    $parent = get_term( $parent_id, 'post_tag' );
    $parent_slug = $parent->slug . '/';
  }

  // Формируем нужный нам url (все бренды - название бренда - название коллекции)
  $url = 'brands/' . $parent_slug . $slug . '/';

  // Получаем данные таблицы custom permalinks
  $custom_permalinks_data = get_option( 'custom_permalink_table' );

  // Добавляем новую ссылку с данными созданного бренда
  $custom_permalinks_data[ $url ] = [
    'id' => $tag_id,
    'kind' => 'tag',
    'slug' => $slug
  ];

  // Обновляем поле с ссылками custom permalinks
  update_option( 'custom_permalink_table', $custom_permalinks_data );

} );