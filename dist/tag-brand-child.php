<?php
/*
  Template name: tag brand child
*/

$preload = get_field( 'preload', 369 );

get_header();

print_breadcrumbs( get_queried_object() );

$sections = get_field( 'sections', 369 ); 

foreach ( $sections as $section ) {
  $section_id = $section['id'] ? ' id="' . $section['id'] . '"' : '';
  require 'template-parts/' . $section['acf_fc_layout'] . '.php';
}

get_footer();