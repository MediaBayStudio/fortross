<section class="hero-404 container has-decor-text" data-decor-text="Страница не найдена">
  <span class="hero-404__decor-title sect-decor-title">fortross</span>
  <picture class="hero-404__pic">
    <source type="image/webp" srcset="<?php echo $template_directory ?>/img/hero-404-img.webp" media="<?php echo $media_queries['1x'] ?>">
    <source type="image/webp" srcset="<?php echo $template_directory ?>/img/hero-404-img@2x.webp" media="<?php echo $media_queries['2x'] ?>">
    <source type="image/jpg" srcset="<?php echo $template_directory ?>/img/hero-404-img@2x.jpg" media="<?php echo $media_queries['2x'] ?>">
    <img src="<?php echo $template_directory ?>/img/hero-404-img.jpg" alt="#" class="hero-404__img">
  </picture>
  <div class="hero-404__text-block">
    <h1 class="hero-404__title">404 ошибка</h1>
    <p class="hero-404__descr">Ой, кажется такой страницы не существует. Но вы можете посмотреть наш каталог.</p>
    <a href="<?php echo $site_url ?>/catalogue/" class="hero-404__link btn btn_brown">Каталог</a>
  </div>
</section>