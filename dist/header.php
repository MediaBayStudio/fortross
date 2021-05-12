<?php
  global
    $preload,
    $that_tag_preload,
    $site_url,
    $is_webp_support,
    $template_directory,
    $logo_url;
    $page_style = str_replace( '.php', '', $GLOBALS['current_template'] ) ?>

<!DOCTYPE html>
<html <?php language_attributes() ?>>
<head>
  <script>
    var // Определяем бразуер пользователя
      browser = {
        // Opera 8.0+
        isOpera: (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0,
        // Firefox 1.0+
        isFirefox: typeof InstallTrigger !== 'undefined',
        // Safari 3.0+ "[object HTMLElementConstructor]"
        isSafari: /constructor/i.test(window.HTMLElement) || (function(p) {
          return p.toString() === "[object SafariRemoteNotification]";
        })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification)),
        // Internet Explorer 6-11
        isIE: /*@cc_on!@*/ false || !!document.documentMode,
        // Edge 20+
        isEdge: !( /*@cc_on!@*/ false || !!document.documentMode) && !!window.StyleMedia,
        // Chrome 1+
        isChrome: !!window.chrome && !!window.chrome.webstore,
        isYandex: !!window.yandex,
        isMac: window.navigator.platform.toUpperCase().indexOf('MAC') >= 0
      };

    (function(){
      // Название полифилла : условие
      let polyfills = {
          'custom-events': typeof window.CustomEvent !== 'function',
          'intersection-observer': 'IntersectionObserver' in window === false,
          'closest': !Element.prototype.closest,
          'svg4everybody': browser.isIE,
          'picturefill': !window.HTMLPictureElement
        },
        scriptText = '',
        url = '<?php echo $template_directory ?>/js-polyfills.php',
        getParams = [];

      for (let name in polyfills) {
        // Проверяем услвоие
        if (polyfills[name]) {
          getParams[getParams.length] = name + '.min.js';
          console.log('Будет загружен ' + name);
        }
      }

      if (getParams.length > 0) {
        let xhr = new XMLHttpRequest();

        xhr.open('GET', url + '?polyfills=' + getParams.join('|'));
        xhr.send();

        xhr.addEventListener('readystatechange', function() {
          if (xhr.readyState === 4 && xhr.status === 200) {
            scriptText = xhr.response;

            let script = document.createElement('script');

            script.text = scriptText;

            document.head.appendChild(script).parentNode.removeChild(script);
          }
        });
      }
    })();
  </script>
  <meta http-equiv="cache-control" content="no-cache, no-store, must-revalidate" />
  <meta http-equiv="pragma" content="no-cache" />
  <meta http-equiv="expires" content="0" />
  <meta charset="<?php bloginfo( 'charset' ) ?>" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no, user-scalable=no, viewport-fit=cover" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <!-- styles preload -->
  <link rel="preload" as="style" href="<?php echo $template_directory ?>/style.css" />
  <link rel="preload" as="style" href="<?php echo $template_directory ?>/css/style-<?php echo $page_style ?>.css" />
  <link rel="preload" as="style" href="<?php echo $template_directory ?>/css/style-<?php echo $page_style ?>.576.css" media="(min-width:575.98px)" />
  <link rel="preload" as="style" href="<?php echo $template_directory ?>/css/style-<?php echo $page_style ?>.768.css" media="(min-width:767.98px)" />
  <link rel="preload" as="style" href="<?php echo $template_directory ?>/css/style-<?php echo $page_style ?>.1024.css" media="(min-width:1024.98px)" />
  <link rel="preload" as="style" href="<?php echo $template_directory ?>/css/style-<?php echo $page_style ?>.1280.css" media="(min-width:1279.98px)" />
  <link rel="preload" as="style" href="<?php echo $template_directory ?>/css/hover.css" media="(hover), (min-width:1024px)" /> <?php
  if ( is_single() ) : ?>

  <link rel="preload" as="style" href="<?php echo $template_directory ?>/css/fancybox.min.css" />
  <?php
  endif ?>
  <!-- fonts preload --> <?php
  $fonts = [
    'Oswald-Regular.woff',
    'OpenSans-Regular.woff',
    'OpenSans-Light.woff',
    'OpenSans-ExtraBold.woff',
    'OpenSans-SemiBold.woff',
    'SegoeUI-SemiBold.woff'
  ];
  foreach ( $fonts as $font ) : ?>

  <link rel="preload" href="<?php echo $template_directory . '/fonts/' . $font ?>" as="font" type="font/woff" crossorigin="anonymous" /> <?php
  endforeach ?>

  <!-- other preload --> <?php
  if ( !$preload ) {
    $preload = get_field( 'preload' );
  }
  if ( $preload ) : 
    $preload[] = [
      'is_file' => false,
      'filepath' => '/img/img-placeholder.svg'
    ];
    foreach ( $preload as $item ) :
      if ( $item['is_file'] ) {
        if ( $is_webp_support ) {
          $webp = get_field( 'webp', $item['file']['ID'] );
        } else {
          $webp = '';
        }

        if ( $webp ) {
          $url = $webp['img']['url'];
        } else {
          $url = $item['file']['url'];
        }
      } else {
        $url = $template_directory . $item['filepath'];
      } // endif $item['is_file']

      if ( $item['media'] ) {
        $media_query = ' media="' . $item['media'] . '"';
      } else {
        $media_query = '';
      } ?>

  <link rel="preload" as="image" href="<?php echo $url ?>"<?php echo $media_query ?> /> <?php
    endforeach;
  endif;
  if ( $that_tag_preload ) {
    $preload = [];
    $image_array = [
      'img' => $that_tag_preload,
      'media' => 0
    ];
    $that_tag_preload = get_fields( $that_tag_preload['ID'] );
    array_unshift( $that_tag_preload, $image_array );

    foreach ( $that_tag_preload as $item ) {
      $preload[ $item['img']['subtype'] ] .= PHP_EOL . '<link rel="preload" as="image" href="' . $item['img']['url'] . '" media="' . $item['media'] . '" />';
    }

    if ( $is_webp_support ) {
      echo $preload['webp'];
    } else {
      echo $preload['jpeg'];
    }

  }
  unset( $preload, $item, $webp, $media_query, $url );

  if ( is_single() ) {
    echo PHP_EOL;
    create_preload_from_img( get_post_thumbnail_id() );
  } ?>

  <!-- favicons -->
  <link rel="apple-touch-icon" sizes="180x180" href="<?php echo $site_url ?>/apple-touch-icon.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="<?php echo $site_url ?>/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="<?php echo $site_url ?>/favicon-16x16.png" />
  <link rel="manifest" href="<?php echo $site_url ?>/site.webmanifest" />
  <link rel="mask-icon" href="<?php echo $site_url ?>/safari-pinned-tab.svg" color="#5bbad5" />
  <meta name="msapplication-TileColor" content="#ff0000" />
  <meta name="theme-color" content="#ffffff" /> <?php
  wp_head() ?>
</head>

<body data-template-directory-uri="<?php echo $template_directory ?>" data-site-url="<?php echo $site_url ?>" <?php body_class(); ?>> <?php
  wp_body_open() ?>
  <noscript>
    <!-- <noindex> -->Для полноценного использования сайта включите JavaScript в настройках вашего браузера.<!-- </noindex> -->
  </noscript>
  <div id="page-wrapper">
    <header class="hdr container">
      <a href="<?php echo $site_url ?>/" class="hdr__logo" title="На главную"><img src="<?php echo $logo_url ?>" alt="Логотип FortRoss" class="hdr__logo-img"></a>
      <button type="button" class="hdr__burger">
        <span class="hdr__burger-box">
          <span class="hdr__burger-inner"></span>
        </span>
      </button> <?php
      require 'template-parts/mobile-menu.php' ?>
    </header>
