<section class="index-hero-sect container has-decor-text" data-decor-text="<?php echo $section['decor_text'] ?>"<?php echo $section_id ?>>
  <span class="index-hero-sect__decor-title sect-decor-title">fortross</span>
  <div class="index-hero-sect__slider"> <?php
    $i = 0;
    $j = 0;
    foreach ( $section['images'] as $slide ) : ?>
      <div class="index-hero-sect__slide">  <?php
        foreach ( $slide['slides'] as $img_sizes ) : 
          $pic_class = $i === 0 ? '' : ' lazy';
          $pic_style = $i === 0 ? '' : ' style="display:none"' ?>
          <picture class="index-hero-sect__pic<?php echo $pic_class ?>"<?php echo $pic_style ?>> <?php
            foreach ( $img_sizes['img'] as $img ) {
              $img_url = $img['img']['url'];

              if ( $img['media'] ) {
                $media = ' media="' . $img['media'] . '"';
              } else {
                $media = '';
              }

              if ( $img['img']['alt'] ) {
                $img_alt = $img['img']['alt'];
              } else {
                $img_alt = '#';
              }

              if ( $j === 0 ) {
                $img_attr = 'src="' . $img_url . '"';
                $source_attr = 'srcset="' . $img_url . '"';
              } else {
                $img_attr = 'src="#" data-src="' . $img_url . '"';
                $source_attr = 'srcset="#" data-srcset="' . $img_url . '"';
              }

              if ( $img['media'] === '0' ) {
                echo '<img ' . $img_attr . ' alt="' . $img_alt . '"' . $media . ' class="index-hero-sect__img">';
              } else {
                echo '<source ' . $source_attr . ' type="' . $img['img']['mime_type'] . '"' . $media . '>';
              }

              $i++;
            }
            $j++;
            unset( $img_url, $img_alt, $media ) ?>
          </picture> <?php
        endforeach ?>
      </div> <?php
    endforeach ?>
  </div>
  <h1 class="index-hero-sect__title"><?php echo $section['title'] ?></h1>
  <a href="<?php echo $section['link']['url'] ?>" class="index-hero-sect__link btn btn_brown"><?php echo $section['link']['title'] ?></a>
  <div class="index-hero-sect__dots"></div>
</section> <?php
unset( $pic_style, $pic_class, $i, $j, $img_attr, $source_attr ) ?>