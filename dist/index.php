<?php
get_header();

/*
	Template name: index
*/
$sections = get_field( 'sections' );

foreach ( $sections as $section ) {
  $section_id = $section['id'] ? ' id="' . $section['id'] . '"' : '';
	require 'template-parts/' . $section['acf_fc_layout'] . '.php';
}
?>

<?php

// $folderpath = get_home_path() . 'alpin';

// // sort_images( $folderpath );

// // Функция сортировки изображений по размерам (широкие и высокие)
// // Нужно для массового обрезания по размерам
// function sort_images( $folderpath, $wide_folder_name = '/wide/', $heigh_folder_name = '/heigh/', $small_wide_folder_name = '/wide-s/', $small_heigh_folder_name = '/heigh-s/' ) {

//   $images = scandir( $folderpath );

//   $wide_folder_path = $folderpath . $wide_folder_name;
//   $small_wide_folder_path = $folderpath . $small_wide_folder_name;

//   $heigh_folder_path = $folderpath . $heigh_folder_name;
//   $small_heigh_folder_path = $folderpath . $small_heigh_folder_name;

//   $folders = [
//     $wide_folder_path,
//     $small_wide_folder_path,
//     $heigh_folder_path,
//     $small_heigh_folder_path
//   ];

//   foreach ( $folders as $folder ) {
//     if ( !is_dir( $folder) ) {
//       mkdir( $folder );
//     }
//   }

//   array_walk( $images, function( $img_name, $key, $path ) {
//     $img_src = $path['folderpath'] . '/' . $img_name;

//     if ( exif_imagetype( $img_src ) !== false ) {

//       $img_size = getimagesize( $img_src );
//       $img_width = $img_size[0];
//       $img_height = $img_size[1];

//       if ( $img_width >= $img_height ) {
//         if ( $img_width <= 1400 ) {
//           $img_dest = $path['wide_small_path'] . $img_name;
//         } else {
//           $img_dest = $path['wide_path'] . $img_name;
//         }
//       } else {
//         if ( $img_height <= 1800 ) {
//           $img_dest = $path['heigh_small_path'] . $img_name;
//         } else {
//           $img_dest = $path['heigh_path'] . $img_name;
//         }
//       }

//       if ( !file_exists( $img_dest ) ) {
//         copy( $img_src, $img_dest );
//       }

//     }
//   }, [
//     'folderpath' => $folderpath,
//     'wide_path' => $wide_folder_path,
//     'wide_small_path' => $small_wide_folder_path,
//     'heigh_path' => $heigh_folder_path,
//     'heigh_small_path' => $small_heigh_folder_path
//   ] ); // end array_walk

// } // end sort_images


get_footer();