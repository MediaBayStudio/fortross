<section class="contacts-delivery-sect container"<?php echo $section_id ?>>
  <div class="contacts-delivery-sect__wrap lazy" data-src="#">
    <h2 class="contacts-delivery-sect__title"><?php echo $section['title'] ?></h2>
    <div class="contacts-delivery-sect__text"> <?php
      foreach ( $section['text'] as $p ) : ?>
        <p class="contacts-delivery-sect__p"><?php echo $p['p'] ?></p> <?php
      endforeach ?>
    </div>
  </div>
</section>
