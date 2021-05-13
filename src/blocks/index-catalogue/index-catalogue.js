(function() {
  let indexCatalogueClassName = '.index-catalogue',
    indexCatalogue = q(indexCatalogueClassName);

  if (indexCatalogue) {
    let activeButtonClassName = indexCatalogueClassName + '__category.active',
      fig1 = q(indexCatalogueClassName + '__fig > img:first-of-type', indexCatalogue),
      fig2 = q(indexCatalogueClassName + '__fig > img:last-of-type', indexCatalogue),
      buttons = qa(indexCatalogueClassName + '__category', indexCatalogue),
      initialActiveButton = q(activeButtonClassName, indexCatalogue),
      figcaption = q(indexCatalogueClassName + '__figcaption', indexCatalogue),
      pic = q(indexCatalogueClassName + '__pic > img', indexCatalogue),
      line = q(indexCatalogueClassName + '__left-line', indexCatalogue),
      link = q('.index-catalogue__right', indexCatalogue),
      cache = {
        [initialActiveButton.getAttribute('data-term-id')]: {
          'fig1': fig1.getAttribute('data-src') || fig1.src,
          'fig2': fig2.getAttribute('data-src') || fig2.src,
          'pic': pic.getAttribute('data-src') || pic.src,
          'url': link.href,
          'figcaption': figcaption.innerHTML
        }
      },
      setData = function(from) {
        fig1.src = from.fig1;
        fig2.src = from.fig2;
        pic.src = from.pic;
        link.href = from.url;
        fig1.lazyObject = null;
        fig2.lazyObject = null;
        pic.lazyObject = null;
        figcaption.innerHTML = from.figcaption;
      };

    indexCatalogue.addEventListener('click', function(e) {
      let target = e.target;
      if (target.tagName === 'BUTTON' && !target.classList.contains('active')) {
         target.blur();
         target.setAttribute('tabindex', '-1');

        let termID = target.getAttribute('data-term-id'),
          targetHeight = target.offsetHeight,
          activeButton = q(activeButtonClassName, indexCatalogue),
          url = siteUrl + '/wp-admin/admin-ajax.php',
          data = 'action=getcatalogueterm&term_id=' + termID;

        if (activeButton) {
          activeButton.removeAttribute('tabindex');
          activeButton.classList.remove('active');
        }

        indexCatalogue.classList.add('loading');
        target.classList.add('active');
        line.style.transform = 'translateY(' + (targetHeight / 2 + target.offsetTop - 1) + 'px)';

        if (cache[termID]) {
          setTimeout(function() {
            setData(cache[termID]);
            indexCatalogue.classList.remove('loading');
          }, 500);
        } else {
          let xhr = new XMLHttpRequest();
          xhr.open('POST', url);
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          xhr.send(data);

          xhr.addEventListener('readystatechange', function() {
            if (xhr.status === 200 && xhr.readyState === 4) {
              let response = JSON.parse(xhr.response),
                onloadCount = 0;

              [response.fig1, response.fig2, response.pic].forEach(function(src, i) {
                img = new Image();

                img.onload = function() {
                  onloadCount++;
                  if (onloadCount === 2) {
                    indexCatalogue.classList.remove('loading');
                  }
                }

                img.src = src;
              });

              setData(response);
              cache[termID] = {
                'fig1': response.fig1,
                'fig2': response.fig2,
                'pic': response.pic,
                'url': response.url,
                'figcaption': response.figcaption
              };
            } // end addeventlistener readystatechange
          });
        } // endif cache[TermID]
      } // endif target.tagName === 'BUTTON'
    }); // end addeventlistener click
  } // endif indexCatalogue
})()