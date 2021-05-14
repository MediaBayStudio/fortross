<?php
/*
	Template name: about
*/

get_header();

print_breadcrumbs( get_queried_object() );  

$sections = get_field( 'sections' ); 

foreach ( $sections as $section ) {
  $section_id = $section['id'] ? ' id="' . $section['id'] . '"' : '';
	require 'template-parts/' . $section['acf_fc_layout'] . '.php';
}

get_footer();