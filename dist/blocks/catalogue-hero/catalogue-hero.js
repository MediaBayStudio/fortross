(function() {
  let catalogueHero = q('.catalogue-hero-sect');

  if (catalogueHero) {
    let catalogueRight = q('.catalogue-hero-sect__catalogue-right', catalogueHero),
      catalogueLeft = q('.catalogue-hero-sect__catalogue-left', catalogueHero),
      buttons = qa('.catalogue-hero-sect__category', catalogueHero),
      line = q('.catalogue-hero-sect__catalogue-left-line', catalogueHero),
      switchTab = function(e) {
        let target = e && e.target || q('a.active', catalogueHero);
        if (target.classList.contains('catalogue-hero-sect__category')) {
          e && e.preventDefault();
          let termID = target.getAttribute('data-term-id'),
            targetHeight = target.offsetHeight,
            activeButton = q('.catalogue-hero-sect__category.active', catalogueHero),
            rightTarget = q('.catalogue-hero-sect__right-item[data-term-id="' + termID + '"]'),
            rightActive = q('.catalogue-hero-sect__right-item.active');

          [activeButton, rightActive].forEach(el => el.classList.remove('active'));

          [target, rightTarget].forEach(el => el.classList.add('active'));

          line.style.transform = 'translateY(' + (targetHeight / 2 + target.offsetTop - 1) + 'px)';

          // history.pushState('', target.textContent, target.href);

        }
      };

    if (catalogueRight && catalogueLeft) {
      catalogueHero.addEventListener('click', switchTab);

      switchTab();
    }
  }
}())