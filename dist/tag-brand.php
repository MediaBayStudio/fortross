<?php
/*
  Template name: tag brand
*/

$that_tag = get_queried_object();
$that_tag_preload = get_field( 'brand_img', $that_tag );
$preload = get_field( 'preload', 367 );

get_header();

print_breadcrumbs( $that_tag );

$sections = get_field( 'sections', 367 );

foreach ( $sections as $section ) {
  require 'template-parts/' . $section['acf_fc_layout'] . '.php';
}

get_footer();