<?php
  
// Подключаем свой шаблон для каждого тега (post_tag)
// который переименован в бренды
add_filter( 'template_include', function( $template ) {
  global $template_dir;

  if ( is_tag() ) {
    $tag = get_queried_object();

    if ( $tag->parent ) {
      $template_name = '/tag-brand-child.php';
    } else {
      $template_name = '/tag-brand.php';
    }

    $template = $template_dir . $template_name;
  } 
  else if ( is_category() ) {
    $category = get_queried_object();

    if ( $category->parent ) {
      $template_name = '/category.php';

      $template = $template_dir . $template_name;
    }
  }
  $GLOBALS['current_template'] = basename( $template );
  return $template;
} );

// add_action( 'edited_post_tag', function( $term_id, $tt_id ){
  
// }, 10, 2 );

add_action( 'init', function() {

  register_taxonomy( 'post_tag', ['post'], [
    'label'                 => '',
    'labels'                => [
      'name'              => 'Бренды',
      'singular_name'     => 'Бренд',
      'search_items'      => 'Найти',
      'all_items'         => 'Все',
      'view_item '        => 'Показать',
      'parent_item'       => 'Родитель',
      'parent_item_colon' => 'Родитель:',
      'edit_item'         => 'Изменить',
      'update_item'       => 'Обносить',
      'add_new_item'      => 'Добавить',
      'new_item_name'     => 'Добавить',
      'menu_name'         => 'Бренды',
    ],
    'query_var'           => 'tag',
    'hierarchical'        => true,
    'has_archive'         => true
  ] );

});

// Переименовываем записи
add_filter( 'post_type_labels_post', function( $labels ) {
  return [
    'name'                  => 'Товары',
    'singular_name'         => 'Товары',
    'add_new'               => 'Добавить товар',
    'add_new_item'          => 'Добавить товар',
    'edit_item'             => 'Редактировать товар',
    'new_item'              => 'Новый товар',
    'view_item'             => 'Просмотреть товар',
    'search_items'          => 'Поиск товаров',
    'not_found'             => 'Товаров не найдено.',
    'not_found_in_trash'    => 'Товаров в корзине не найдено.',
    'parent_item_colon'     => '',
    'all_items'             => 'Все товары',
    'archives'              => 'Архивы товаров',
    'insert_into_item'      => 'Вставить в товар',
    'uploaded_to_this_item' => 'Загруженные для этого товара',
    'featured_image'        => 'Миниатюра товара',
    'filter_items_list'     => 'Фильтровать список товаров',
    'items_list_navigation' => 'Навигация по списку товаров',
    'items_list'            => 'Список товаров',
    'menu_name'             => 'Товары',
    'name_admin_bar'        => 'Товар', // пункте "добавить"
  ];
} );

// Переименовываем рубрики
add_filter( 'taxonomy_labels_category', function( $labels ) {
  return [
    'name'                  => 'Категории товара',
    'singular_name'         => 'Категория товара',
    'search_items'          => 'Поиск категорий товаров',
    'all_items'             => 'Все категории товаров',
    'parent_item'           => 'Родительская категория товара',
    'parent_item_colon'     => 'Родительская категория товара:',
    'edit_item'             => 'Изменить категорию товара',
    'view_item'             => 'Просмотреть категорию товара',
    'update_item'           => 'Обновить категорию товара',
    'add_new_item'          => 'Добавить новую категорию товара',
    'new_item_name'         => 'Название новой категории товара',
    'not_found'             => 'Категории товара не найдены.',
    'no_terms'              => 'Категорий товара нет',
    'items_list_navigation' => 'Навигация по списку категорий товара',
    'items_list'            => 'Список категорий товара',
    'back_to_items'         => '← Назад к категориям товара',
    'menu_name'             => 'Категории товара'
  ];
} );

// Добавляем колонки в админке

function manage_columns( $columns ) {
  $num = 1; // после какой по счету колонки вставлять новые

  $new_columns = [
    'title' => 'Название',
    'thumbnail' => 'Миниатюра',
    'brand' => 'Бренд',
    'descr' => 'Описание',
    'modified' => 'Дата изменения',
    'date' => 'Дата публикации'
  ];

  return array_slice( $columns, 0, $num ) + $new_columns + array_slice( $columns, $num );
}

function namage_custom_column( $colname, $post_id ) {
  $child_brand = wp_get_post_tags( $post_id )[0];
  $parent_brand = get_term( $child_brand->parent );
  $tag_url = path_join( get_admin_url(), 'edit.php');

  $parent_brand_url = $tag_url . '?tag=' . $parent_brand->slug;
  $child_brand_url = $tag_url . '?tag=' . $child_brand->slug;

  switch ( $colname ) {
    case 'thumbnail':
      echo '<img src="' . get_the_post_thumbnail_url( $post_id ) . '" style="object-fit:contain;width:75px;height:75px">';
      break;
    case 'title':
      echo '<p>' . get_the_title( $post_id ) . '</p>';
      break;
    case 'brand':
      echo '<p><a href="' . $parent_brand_url . '" title="Фильтр по этому бренду">' . $parent_brand->name . '</a> ' . ( is_wp_error( $parent_brand ) || is_wp_error( $child_brand ) ? '' : '->' ) . ' <a href="' . $child_brand_url . '" title="Фильтр по этому бренду">' . $child_brand->name . '</a></p>';
      break;
    case 'modified':
      echo '<p>Изменено<br>' . get_the_modified_date( 'd.m.Y, G:i' ) . '</p>';
      break;
    case 'descr':
      echo '<p>' . mb_substr( get_field( 'descr' , $post_id ), 0, 47 ) . '...</p>';
    break;
  }
}

function namage_sortable_columns( $sortable_columns ) {
  $sortable_columns['modified'] = ['modified_modified', false];
  return $sortable_columns;
}

// Создание новых колонок
add_filter( 'manage_post_posts_columns', 'manage_columns', 4 );

// Заполнение колонок нужными данными
add_action( 'manage_post_posts_custom_column', 'namage_custom_column', 5, 2);

// добавляем возможность сортировать колонку
add_filter( 'manage_edit-post_sortable_columns', 'namage_sortable_columns' );