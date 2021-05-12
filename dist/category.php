<?php
/*
	Template name: category
*/

$preload = get_field( 'preload', 140 );

get_header();

$obj = get_queried_object();

print_breadcrumbs( $obj );

$sections = get_field( 'sections', 140 );

foreach ( $sections as $section ) {
  if ( $section['acf_fc_layout'] === 'catalogue-items' && !$obj->parent ) {
    continue;
  }
	require 'template-parts/' . $section['acf_fc_layout'] . '.php';
}

get_footer();