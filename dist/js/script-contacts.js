var mask,lazy,menu,burger,hdr,overlay,body,fakeScrollbar,mobileMenu,mediaQueries={s:"(min-width:575.98px)",m:"(min-width:767.98px)",lg:"(min-width:1023.98px)",xl:"(min-width:1439.98px)"},SLIDER={nextArrow:'<button type="button" class="arrow"></button>',prevArrow:'<button type="button" class="arrow"></button>',dot:'<button type="button" class="dot"></button>',hasSlickClass:function(e){return e.hasClass("slick-slider")},unslick:function(e){e.slick("unslick")},createArrow:function(e,t){return'<button type="button" class="arrow arrow_'+(e=(-1===e.indexOf("prev")?"next ":"prev ")+e)+'">'+t+"</button>"},setImages:function(e){for(var t=0,n=e.length;t<n;t++){var o=q("img",e[t]);o&&o.offsetParent&&(o.src=o.getAttribute("data-lazy")||o.getAttribute("data-src"))}}},windowFuncs={load:[],resize:[],scroll:[],call:function(e){for(var t=windowFuncs[e.type]||e,n=t.length-1;0<=n;n--)t[n]()}},q=function(e,t){return(t=t||document.body).querySelector(e)},qa=function(e,t,n){return t=t||document.body,n?Array.prototype.slice.call(t.querySelectorAll(e)):t.querySelectorAll(e)},id=function(e){return document.getElementById(e)},setVh=function(){var e=.01*window.innerHeight;document.documentElement.style.setProperty("--vh",e+"px")},media=function(e){return window.matchMedia(e).matches},scrollToTarget=function(e,t){var n,o,r,a;e.preventDefault(),_=this===window?e.target:this,(t=(t=!(t=0==t?body:t||_.getAttribute("data-scroll-target"))&&"A"===_.tagName?q(_.getAttribute("href")):t).constructor===String?q(t):t)&&(menu&&menu.close(),n=window.pageYOffset,e=getComputedStyle(t),o=t.getBoundingClientRect().top-+e.paddingTop.slice(0,-2)-+e.marginTop.slice(0,-2),r=null,a=function(e){e-=r=null===r?e:r,e=o<0?Math.max(n-e/.35,n+o):Math.min(n+e/.35,n+o);window.scrollTo(0,e),e!=n+o&&requestAnimationFrame(a)},requestAnimationFrame(a))},pageScroll=function(e){fakeScrollbar.classList.toggle("active",e),document.body.classList.toggle("no-scroll",e),document.body.style.paddingRight=e?fakeScrollbar.offsetWidth-fakeScrollbar.clientWidth+"px":""},sticky=function(e,t,n){e="string"==typeof e?q(e):e,n=n||"fixed",t=t||"bottom";var o=e.getBoundingClientRect()[t]+pageYOffset,r=e.cloneNode(!0),a=e.parentElement,i=function(){!e.classList.contains(n)&&pageYOffset>=o&&(a.appendChild(a.replaceChild(r,e)),e.classList.add(n),window.removeEventListener("scroll",i),window.addEventListener("scroll",s))},s=function(){e.classList.contains(n)&&pageYOffset<=o&&(a.replaceChild(e,r),e.classList.remove(n),window.removeEventListener("scroll",s),window.addEventListener("scroll",i))};r.classList.add("clone"),i(),window.addEventListener("scroll",i)};document.addEventListener("DOMContentLoaded",function(){var t,e,n;for(e in mobileMenu=function(e){function o(e,t){for(var n=[e,t],o=["transform","transition"],r=["translate3d("+e+", 0px, 0px)","transform "+t],a=n.length-1;0<=a;a--)0!==n[a]&&(""===n[a]?n[a]="":n[a]=r[a],u.style[o[a]]=n[a])}function t(e){return e.constructor===String?q(e):e}function n(){N||(d.hasAttribute("style")&&(d.removeAttribute("style"),d.offsetHeight),d.classList.add("active"),p.classList.add("active"),u.scrollTop=0,y||(o("0px",".5s"),I=u.offsetWidth),h||pageScroll(!0))}function r(e,t){var n;N&&(n=e&&e.target,(t||!e||"keyup"===e.type&&27===e.keyCode||n===d||n===f)&&(d.classList.remove("active"),p.classList.remove("active"),y||o(L,".5s")))}function a(e){F&&(e=e.touches[0]||window.e.touches[0],O=z=!1,$=P=e.clientX,D=e.clientY,m=Date.now(),u.addEventListener("touchend",E),u.addEventListener("touchmove",w),o(0,""))}function i(e){e.target!==d||e.pseudoElement||(y?"width"===e.propertyName&&k():"transform"===e.propertyName&&k(),F=!0)}function s(){d=t(e.menu),u=t(e.menuCnt),p=t(e.openBtn),f=t(e.closeBtn),h=x.allowPageScroll,g=x.toRight,b=x.toLeft,L=b?"100%":g?"-100%":0,y=x.fade,_("add"),y?g=b=!1:(o(L,0),d.addEventListener("touchstart",a)),d.isOpened=!1}function l(){N&&r(),y?g=b=!1:(o("",""),d.removeEventListener("touchstart",a)),_("remove"),f=p=u=d=null}function c(){if(S){for(var e in C=null,S)media(e)&&(C=e);C!==B&&function(){if(C){for(var e in S[C])x[e]=S[C][e];B=C}else{for(var t in A)x[t]=A[t];B=null}d&&(l(),s())}()}d||s()}var d,u,p,f,m,v,h,g,b,L,y,w=function(e){var t;F&&(t=e.touches[0]||window.e.touches[0],e=+u.style.transform.match(M)[0],R=P-t.clientX,P=t.clientX,Y=D-t.clientY,D=t.clientY,O||z||(t=Math.abs(Y),Math.abs(R),7<t||0===R?z=!0:t<7&&(O=!0)),O&&o(b&&P<$||g&&$<P?"0px":e-R+"px",0))},E=function(e){H=$-P;var t=Math.abs(H);v=Date.now(),1<t&&O&&((b&&H<0||g&&0<H)&&(I*T<=t||v-m<300?r(e,!0):(N=!1,n())),F=!1),d.removeEventListener("touchend",E),d.removeEventListener("touchmove",w)},k=function(){N?(d.isOpened=N=!1,p.addEventListener("click",n),f.removeEventListener("click",r),h||pageScroll(!1),sticky(hdr),d.classList.add("closed"),d.classList.remove("opened")):(d.isOpened=N=!0,p.removeEventListener("click",n),f.addEventListener("click",r),d.classList.add("opened"),d.classList.remove("closed"))},_=function(e){p[e+"EventListener"]("click",n),d[e+"EventListener"]("click",r),d[e+"EventListener"]("transitionend",i),document[e+"EventListener"]("keyup",r)},x=JSON.parse(JSON.stringify(e)),A=JSON.parse(JSON.stringify(e)),S=e.responsive,C=null,B=null,T=.5,M=(pageYOffset,/([-0-9.]+(?=px))/),O=!1,z=!1,F=!1,N=!1,P=0,R=0,D=0,Y=0,$=0,H=0,I=0;if(e.menu)return c(),windowFuncs.resize.push(c),{options:x,menu:d,menuCnt:u,openBtn:p,closeBtn:f,open:n,close:r,destroy:l,opened:N}},body=document.body,function(){mask=function(){var e="+7(___)___-__-__",t=0,n=e.replace(/\D/g,""),o=this.value.replace(/\D/g,"");n.length>=o.length&&(o=n),this.value=e.replace(/./g,function(e){return/[_\d]/.test(e)&&t<o.length?o.charAt(t++):t>=o.length?"":e}),"blur"===event.type?2===this.value.length&&(this.value="",this.classList.remove("filled")):(n=this.value.length,(e=this).focus(),e.setSelectionRange?e.setSelectionRange(n,n):e.createTextRange&&((e=e.createTextRange()).collapse(!0),e.moveEnd("character",n),e.moveStart("character",n),e.select()))};for(var e=qa("[name=tel]"),t=0;t<e.length;t++)e[t].addEventListener("input",mask),e[t].addEventListener("focus",mask),e[t].addEventListener("blur",mask)}(),function(){function e(e){var u=e.form,t=e.formBtn,l=e.uploadFilesBlock,c="invalid",p=(e.filesInput,{name:{required:!0},tel:{required:!0,pattern:/\+7\([0-9]{3}\)[0-9]{3}\-[0-9]{2}\-[0-9]{2}/,or:"email"},email:{required:!0,pattern:/^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z])+$/,or:"tel"},msg:{pattern:/[^\<\>\[\]%\&'`]+$/},policy:{required:!0}}),f={tel:{required:"Введите ваш телефон или E-mail",pattern:"Укажите верный телефон"},name:{required:"Введите ваше имя"},email:{required:"Введите ваш E-mail или телефон",pattern:"Введите верный E-mail"},msg:{required:"Введите ваше сообщение",pattern:"Введены недопустимые символы"},policy:{required:"Согласитель с политикой обработки персональных данных"}},m=function(e){var t,n={},o=u,r=function(e){var t,n=e.elements,o={};for(t in p){var r=n[t];r&&(o[t]=r.value)}return o}(o);for(t in r){var a=p[t],i=o[t],s=r[t],l=a.or,c=o[l];if(a&&(i.hasAttribute("required")||!0===a.required)){var d=i.type,a=a.pattern;if(("checkbox"===d||"radio"===d)&&!i.checked||""===s){if(!l||!c){n[t]=f[t].required;continue}if(""===c.value){n[t]=f[t].required;continue}}"cehckbox"!==d&&"radio"!==d&&a&&""!==s&&!1===a.test(s)?n[t]=f[t].pattern:h(i)}}0==Object.keys(n).length?(o.removeEventListener("change",m),o.removeEventListener("input",m),u.validatie=!0):(o.addEventListener("change",m),o.addEventListener("input",m),v(o,n),u.validatie=!1)},v=function(e,t){var n,o=e.elements;for(n in t){var r=t[n],a='<label class="'+c+'">'+r+"</label>",i=o[n],s=i.nextElementSibling;s&&s.classList.contains(c)?s.textContent!==r&&(s.textContent=r):(i.insertAdjacentHTML("afterend",a),i.classList.add(c))}},h=function(e){var t=e.nextElementSibling;e.classList.remove(c),t&&t.classList.contains(c)&&t.parentElement.removeChild(t)};u.setAttribute("novalidate",""),u.validatie=!1,t.addEventListener("click",function(){m(),!1===u.validatie?event.preventDefault():u.classList.add("loading")}),document.wpcf7mailsent||(document.addEventListener("wpcf7mailsent",function(e){var t=q("#"+e.detail.id+">form");if("wpcf7mailsent"===e.type){for(var n=t.elements,o=0;o<n.length;o++)h(n[o]),n[o].classList.remove("filled");t.reset(),l&&(l.innerHTML="")}t.classList.remove("loading"),setTimeout(function(){t.classList.remove("sent")},3e3),thanksPopup.openPopup(),thanksPopupTimer=setTimeout(function(){thanksPopup.closePopup()},3e3)}),document.wpcf7mailsent=!0),u.addEventListener("input",function(){var e=event.target,t=e.type,n=e.files,o=e.classList,r=e.value;if("text"===t||"TEXTAREA"===e.tagName)""===r?o.remove("filled"):o.add("filled");else if("file"===t){for(var a="",i=0,s=n.length;i<s;i++)a+='<span class="uploadedfiles__file"><span class="uploadedfiles__file-text">'+n[i].name+"</span></span>";l.innerHTML=a}})}for(var t=qa(".contacts-sect__form, .contacts-us-sect__form, #product-popup-form"),n=t.length-1;0<=n;n--)t[n]&&e({form:t[n],formBtn:q("button",t[n]),uploadFilesBlock:q(".uploadedfiles",t[n]),filesInput:q('input[type="file"]',t[n])})}(),NodeList.prototype.forEach||(NodeList.prototype.forEach=Array.prototype.forEach),HTMLCollection.prototype.forEach||(HTMLCollection.prototype.forEach=Array.prototype.forEach),fakeScrollbar=id("fake-scrollbar"),burger=q(".hdr__burger"),hdr=q(".hdr"),menu=mobileMenu({menu:q(".menu"),menuCnt:q(".menu__cnt"),openBtn:burger,closeBtn:burger,fade:!0,allowPageScroll:!1}),sticky(hdr),thanksPopup=new Popup(".thanks-popup",{closeButtons:".thanks-popup__close"}),mapBlock=id("contacts-hero-sect-map"),mapBlock&&(t=function(){var e=document.createElement("script");e.setAttribute("src","https://api-maps.yandex.ru/2.1/?apikey=82596a7c-b060-47f9-9fb6-829f012a9f04&lang=ru_RU&onload=ymapsOnload"),body.appendChild(e),mapBlock.removeEventListener("lazyloaded",t)},mapBlock.addEventListener("lazyloaded",t)),lazy=new lazyload({clearSrc:!0,clearMedia:!0}),windowFuncs.resize.push(setVh),windowFuncs)"call"===e||0<(n=windowFuncs[e]).length&&(windowFuncs.call(n),window.addEventListener(e,windowFuncs.call));$(".slick-list.draggable").on("mousedown",function(){$(this).addClass("grabbing")}),$(".slick-list.draggable").on("beforeChange",function(){$(this).removeClass("grabbing")}),$(document).on("mouseup",function(){$(".slick-list.draggable").removeClass("grabbing")})});