<?php
 /* Настройка контактов в панели настройки->общее */
// Функции вывода нужных полей
  function options_inp_html ( $id ) {
    echo "<input type='text' name='{$id}' value='" . esc_attr( get_option( $id ) ) . "'>";
  }

  add_action( 'admin_init', function() {
    $options = [
      'tel_1'            =>  'Телефон 1',
      'tel_2'            =>  'Телефон 2',
      'address'          =>  'Адрес',
      'address_link'     =>  'Ссылка на карту',
      'email'            =>  'E-mail',
      'facebook'         =>  'Facebook',
      'instagram'        =>  'Instagram',
      'coords'           =>  'Координаты маркера на карте',
      'zoom'             =>  'Увеличение карты'
    ];

    foreach ($options as $id => $name) {
      $my_id = "contacts_{$id}";

      add_settings_field( $id, $name, 'options_inp_html', 'general', 'default', $my_id );
      register_setting( 'general', $my_id );
    }
  } );
