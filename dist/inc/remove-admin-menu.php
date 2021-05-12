<?php
add_action( 'admin_menu', function() {
  // remove_menu_page( 'options-general.php' ); // Настройки  
  remove_menu_page( 'tools.php' ); // Инструменты
  // remove_menu_page( 'users.php' ); // Пользователи
  // remove_menu_page( 'plugins.php' ); // Плагины
  // remove_menu_page( 'themes.php' ); // Внешний вид  
  // remove_menu_page( 'edit.php' ); // Записи
  // remove_menu_page( 'upload.php' ); // Медиабиблиотека
  // remove_menu_page( 'edit.php?post_type=page' ); // Страницы
  remove_menu_page( 'edit-comments.php' ); // Комментарии 
  // remove_menu_page( 'link-manager.php' ); // Ссылки
} );