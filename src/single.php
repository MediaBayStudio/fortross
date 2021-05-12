<?php

/*
  Template name: single
*/

$preload = get_field( 'preload', 453 );

get_header();

print_breadcrumbs( get_queried_object() );

$sections = get_field( 'sections', 453 );

foreach ( $sections as $section ) {
  require 'template-parts/' . $section['acf_fc_layout'] . '.php';
}

get_footer();