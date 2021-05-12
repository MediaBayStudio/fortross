(function() {
  let indexCatalogueClassName = '.index-catalogue',
    indexCatalogue = q(indexCatalogueClassName);

  if (indexCatalogue) {
    let activeButtonClassName = indexCatalogueClassName + '__category.active',
      fig = q(indexCatalogueClassName + '__fig > img', indexCatalogue),
      buttons = qa(indexCatalogueClassName + '__category', indexCatalogue),
      initialActiveButton = q(activeButtonClassName, indexCatalogue),
      figcaption = q(indexCatalogueClassName + '__figcaption', indexCatalogue),
      pic = q(indexCatalogueClassName + '__pic > img', indexCatalogue),
      line = q(indexCatalogueClassName + '__left-line', indexCatalogue),
      link = q('.index-catalogue__right', indexCatalogue),
      cache = {
        [initialActiveButton.getAttribute('data-term-id')]: {
          'fig': fig.getAttribute('data-src') || fig.src,
          'pic': pic.getAttribute('data-src') || pic.src,
          'url': link.href,
          'figcaption': figcaption.innerHTML
        }
      },
      setData = function(from) {
        console.log('setData');
        fig.src = from.fig;
        pic.src = from.pic;
        link.href = from.url;
        fig.lazyObject = null;
        pic.lazyObject = null;
        figcaption.innerHTML = from.figcaption;
      };

    indexCatalogue.addEventListener('click', function(e) {
      let target = e.target;
      if (target.tagName === 'BUTTON' && !target.classList.contains('active')) {
        let termID = target.getAttribute('data-term-id'),
          // targetIndex,
          targetHeight = target.offsetHeight,
          activeButton = q(activeButtonClassName, indexCatalogue),
          url = siteUrl + '/wp-admin/admin-ajax.php',
          data = 'action=getcatalogueterm&term_id=' + termID;

        if (activeButton) {
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

              [response.fig, response.pic].forEach(function(src, i) {
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
                'fig': response.fig,
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