<?php

/*
  Template name: category child
*/
get_header();

$sections = get_field( 'sections' );

foreach ( $sections as $section ) {
  $section_id = $section['id'] ? ' id="' . $section['id'] . '"' : '';
  require 'template-parts/' . $section['acf_fc_layout'] . '.php';
}

get_footer();