body = document.body;
// templateDir = body.getAttribute('data-template-directory-uri');
// siteUrl = body.getAttribute('data-site-url');
//=include telMask.js
//=include validateForms.js
// setPolyfills();

// В основном для IE
if (!NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

if (!HTMLCollection.prototype.forEach) {
  HTMLCollection.prototype.forEach = Array.prototype.forEach;
}

fakeScrollbar = id('fake-scrollbar');

burger = q('.hdr__burger');

hdr = q('.hdr');

menu = mobileMenu({
  menu: q('.menu'),
  menuCnt: q('.menu__cnt'),
  openBtn: burger,
  closeBtn: burger,
  fade: true,
  allowPageScroll: false
});

sticky(hdr);

thanksPopup = new Popup('.thanks-popup', {
  closeButtons: '.thanks-popup__close'
});