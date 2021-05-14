(function() {
  let catalogueHero = q('.catalogue-hero-sect');

  if (catalogueHero) {
    let catalogueItems =  q('.catalogue-hero-sect__catalogue-wrap', catalogueHero),
      catalogueRight = q('.catalogue-hero-sect__catalogue-right', catalogueItems),
      catalogueLeft = q('.catalogue-hero-sect__catalogue-left', catalogueItems),
      buttons = qa('.catalogue-hero-sect__category', catalogueItems),
      line = q('.catalogue-hero-sect__catalogue-left-line', catalogueItems),
      switchTab = function(e) {
        let target = e && e.target || q('a.active', catalogueItems);
        if (target.classList.contains('catalogue-hero-sect__category')) {
          e && e.preventDefault();
          let termID = target.getAttribute('data-term-id'),
            targetHeight = target.offsetHeight,
            activeButton = q('.catalogue-hero-sect__category.active', catalogueItems),
            rightTarget = q('.catalogue-hero-sect__right-item[data-term-id="' + termID + '"]'),
            rightActive = q('.catalogue-hero-sect__right-item.active');

          if (target === activeButton) return;

          catalogueItems.classList.add('loading');
          
          setTimeout(function() {
            [activeButton, rightActive].forEach(el => el.classList.remove('active'));
            catalogueItems.classList.remove('loading');
            [target, rightTarget].forEach(el => el.classList.add('active'));
          }, 500);

          line.style.transform = 'translateY(' + (targetHeight / 2 + target.offsetTop - 1) + 'px)';

          // history.pushState('', target.textContent, target.href);

        }
      };

    if (catalogueRight && catalogueLeft) {
      catalogueItems.addEventListener('click', switchTab);

      switchTab();
    }
  }
}())