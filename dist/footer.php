      <?php
        global
          $logo_url,
          $site_url,
          $template_directory ?>
      <footer class="ftr container lazy" data-src="#"> <?php
        wp_nav_menu( [
          'theme_location'  => 'header_menu',
          'container'       => 'nav',
          'container_class' => 'ftr__nav',
          'menu_class'      => 'ftr__nav-list',
          'items_wrap'      => '<ul class="%2$s">%3$s</ul>'
        ] ) ?>
        <div class="ftr__bottom">
          <div class="ftr__bottom-left">
            <a href="<?php echo $site_url ?>/policy.pdf" rel="noopener noreferrer nofollow" target="_blank" class="ftr__policy" title="Посмотреть политику конфиденциальности">Политика конфиденциальности</a>
            <div class="ftr__dev">
            Made by <a href="https://media-bay.ru" target="_blank" class="ftr__dev-link" title="Перейти на сайт разработчика">media bay</a>
            </div>
          </div>
          <div class="ftr__bottom-right">
            <a href="<?php echo $site_url ?>/" title="На главную" class="ftr__logo"><img src="<?php echo $logo_url ?>" alt="Логотип FortRoss" class="ftr__logo-img"></a>
            <span class="ftr__copy">Fortross <?php echo date( 'Y' ) ?>&copy;</span>
          </div>
        </div>
        <span class="ftr__decor-title sect-decor-title">fortross</span>
      </footer>
      <div id="fake-scrollbar"></div> <?php
      require 'template-parts/thanks-popup.php';
      wp_footer() ?>
    </div>
  </body>
</html>