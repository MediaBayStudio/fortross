var mask,lazy,menu,burger,hdr,overlay,body,fakeScrollbar,mobileMenu,mediaQueries={s:"(min-width:575.98px)",m:"(min-width:767.98px)",lg:"(min-width:1023.98px)",xl:"(min-width:1439.98px)"},SLIDER={nextArrow:'<button type="button" class="arrow"></button>',prevArrow:'<button type="button" class="arrow"></button>',dot:'<button type="button" class="dot"></button>',hasSlickClass:function(e){return e.hasClass("slick-slider")},unslick:function(e){e.slick("unslick")},createArrow:function(e,t){return'<button type="button" class="arrow arrow_'+(e=(-1===e.indexOf("prev")?"next ":"prev ")+e)+'">'+t+"</button>"},setImages:function(e){for(var t=0,n=e.length;t<n;t++){var a=q("img",e[t]);a&&a.offsetParent&&(a.src=a.getAttribute("data-lazy")||a.getAttribute("data-src"))}}},windowFuncs={load:[],resize:[],scroll:[],call:function(e){for(var t=windowFuncs[e.type]||e,n=t.length-1;0<=n;n--)t[n]()}},q=function(e,t){return(t=t||document.body).querySelector(e)},qa=function(e,t,n){return t=t||document.body,n?Array.prototype.slice.call(t.querySelectorAll(e)):t.querySelectorAll(e)},id=function(e){return document.getElementById(e)},setVh=function(){var e=.01*window.innerHeight;document.documentElement.style.setProperty("--vh",e+"px")},media=function(e){return window.matchMedia(e).matches},scrollToTarget=function(e,t){var n,a,o,i;e.preventDefault(),_=this===window?e.target:this,(t=(t=!(t=0==t?body:t||_.getAttribute("data-scroll-target"))&&"A"===_.tagName?q(_.getAttribute("href")):t).constructor===String?q(t):t)&&(menu&&menu.close(),n=window.pageYOffset,e=getComputedStyle(t),a=t.getBoundingClientRect().top-+e.paddingTop.slice(0,-2)-+e.marginTop.slice(0,-2),o=null,i=function(e){e-=o=null===o?e:o,e=a<0?Math.max(n-e/.35,n+a):Math.min(n+e/.35,n+a);window.scrollTo(0,e),e!=n+a&&requestAnimationFrame(i)},requestAnimationFrame(i))},pageScroll=function(e){fakeScrollbar.classList.toggle("active",e),document.body.classList.toggle("no-scroll",e),document.body.style.paddingRight=e?fakeScrollbar.offsetWidth-fakeScrollbar.clientWidth+"px":""},sticky=function(e,t,n){e="string"==typeof e?q(e):e,n=n||"fixed",t=t||"bottom";var a=e.getBoundingClientRect()[t]+pageYOffset,o=e.cloneNode(!0),i=e.parentElement,r=function(){!e.classList.contains(n)&&pageYOffset>=a&&(i.appendChild(i.replaceChild(o,e)),e.classList.add(n),window.removeEventListener("scroll",r),window.addEventListener("scroll",s))},s=function(){e.classList.contains(n)&&pageYOffset<=a&&(i.replaceChild(e,o),e.classList.remove(n),window.removeEventListener("scroll",s),window.addEventListener("scroll",r))};o.classList.add("clone"),r(),window.addEventListener("scroll",r)};document.addEventListener("DOMContentLoaded",function(){for(var e in mobileMenu=function(e){function a(e,t){for(var n=[e,t],a=["transform","transition"],o=["translate3d("+e+", 0px, 0px)","transform "+t],i=n.length-1;0<=i;i--)0!==n[i]&&(""===n[i]?n[i]="":n[i]=o[i],d.style[a[i]]=n[i])}function t(e){return e.constructor===String?q(e):e}function n(){F||(u.hasAttribute("style")&&(u.removeAttribute("style"),u.offsetHeight),u.classList.add("active"),f.classList.add("active"),d.scrollTop=0,b||(a("0px",".5s"),Y=d.offsetWidth),g||pageScroll(!0))}function o(e,t){var n;F&&(n=e&&e.target,(t||!e||"keyup"===e.type&&27===e.keyCode||n===u||n===p)&&(u.classList.remove("active"),f.classList.remove("active"),b||a(L,".5s")))}function i(e){z&&(e=e.touches[0]||window.e.touches[0],B=O=!1,H=P=e.clientX,D=e.clientY,m=Date.now(),d.addEventListener("touchend",_),d.addEventListener("touchmove",y),a(0,""))}function r(e){e.target!==u||e.pseudoElement||(b?"width"===e.propertyName&&E():"transform"===e.propertyName&&E(),z=!0)}function s(){u=t(e.menu),d=t(e.menuCnt),f=t(e.openBtn),p=t(e.closeBtn),g=x.allowPageScroll,h=x.toRight,w=x.toLeft,L=w?"100%":h?"-100%":0,b=x.fade,k("add"),b?h=w=!1:(a(L,0),u.addEventListener("touchstart",i)),u.isOpened=!1}function l(){F&&o(),b?h=w=!1:(a("",""),u.removeEventListener("touchstart",i)),k("remove"),p=f=d=u=null}function c(){if(S){for(var e in C=null,S)media(e)&&(C=e);C!==T&&function(){if(C){for(var e in S[C])x[e]=S[C][e];T=C}else{for(var t in A)x[t]=A[t];T=null}u&&(l(),s())}()}u||s()}var u,d,f,p,m,v,g,h,w,L,b,y=function(e){var t;z&&(t=e.touches[0]||window.e.touches[0],e=+d.style.transform.match($)[0],R=P-t.clientX,P=t.clientX,N=D-t.clientY,D=t.clientY,B||O||(t=Math.abs(N),Math.abs(R),7<t||0===R?O=!0:t<7&&(B=!0)),B&&a(w&&P<H||h&&H<P?"0px":e-R+"px",0))},_=function(e){I=H-P;var t=Math.abs(I);v=Date.now(),1<t&&B&&((w&&I<0||h&&0<I)&&(Y*M<=t||v-m<300?o(e,!0):(F=!1,n())),z=!1),u.removeEventListener("touchend",_),u.removeEventListener("touchmove",y)},E=function(){F?(u.isOpened=F=!1,f.addEventListener("click",n),p.removeEventListener("click",o),g||pageScroll(!1),sticky(hdr),u.classList.add("closed"),u.classList.remove("opened")):(u.isOpened=F=!0,f.removeEventListener("click",n),p.addEventListener("click",o),u.classList.add("opened"),u.classList.remove("closed"))},k=function(e){f[e+"EventListener"]("click",n),u[e+"EventListener"]("click",o),u[e+"EventListener"]("transitionend",r),document[e+"EventListener"]("keyup",o)},x=JSON.parse(JSON.stringify(e)),A=JSON.parse(JSON.stringify(e)),S=e.responsive,C=null,T=null,M=.5,$=(pageYOffset,/([-0-9.]+(?=px))/),B=!1,O=!1,z=!1,F=!1,P=0,R=0,D=0,N=0,H=0,I=0,Y=0;if(e.menu)return c(),windowFuncs.resize.push(c),{options:x,menu:u,menuCnt:d,openBtn:f,closeBtn:p,open:n,close:o,destroy:l,opened:F}},body=document.body,function(){mask=function(){var e="+7(___)___-__-__",t=0,n=e.replace(/\D/g,""),a=this.value.replace(/\D/g,"");n.length>=a.length&&(a=n),this.value=e.replace(/./g,function(e){return/[_\d]/.test(e)&&t<a.length?a.charAt(t++):t>=a.length?"":e}),"blur"===event.type?2===this.value.length&&(this.value="",this.classList.remove("filled")):(n=this.value.length,(e=this).focus(),e.setSelectionRange?e.setSelectionRange(n,n):e.createTextRange&&((e=e.createTextRange()).collapse(!0),e.moveEnd("character",n),e.moveStart("character",n),e.select()))};for(var e=qa("[name=tel]"),t=0;t<e.length;t++)e[t].addEventListener("input",mask),e[t].addEventListener("focus",mask),e[t].addEventListener("blur",mask)}(),function(){function e(e){var d=e.form,t=e.formBtn,l=e.uploadFilesBlock,c="invalid",f=(e.filesInput,{name:{required:!0},tel:{required:!0,pattern:/\+7\([0-9]{3}\)[0-9]{3}\-[0-9]{2}\-[0-9]{2}/,or:"email"},email:{required:!0,pattern:/^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z])+$/,or:"tel"},msg:{pattern:/[^\<\>\[\]%\&'`]+$/},policy:{required:!0}}),p={tel:{required:"Введите ваш телефон или E-mail",pattern:"Укажите верный телефон"},name:{required:"Введите ваше имя"},email:{required:"Введите ваш E-mail или телефон",pattern:"Введите верный E-mail"},msg:{required:"Введите ваше сообщение",pattern:"Введены недопустимые символы"},policy:{required:"Согласитель с политикой обработки персональных данных"}},m=function(e){var t,n={},a=d,o=function(e){var t,n=e.elements,a={};for(t in f){var o=n[t];o&&(a[t]=o.value)}return a}(a);for(t in o){var i=f[t],r=a[t],s=o[t],l=i.or,c=a[l];if(i&&(r.hasAttribute("required")||!0===i.required)){var u=r.type,i=i.pattern;if(("checkbox"===u||"radio"===u)&&!r.checked||""===s){if(!l||!c){n[t]=p[t].required;continue}if(""===c.value){n[t]=p[t].required;continue}}"cehckbox"!==u&&"radio"!==u&&i&&""!==s&&!1===i.test(s)?n[t]=p[t].pattern:g(r)}}0==Object.keys(n).length?(a.removeEventListener("change",m),a.removeEventListener("input",m),d.validatie=!0):(a.addEventListener("change",m),a.addEventListener("input",m),v(a,n),d.validatie=!1)},v=function(e,t){var n,a=e.elements;for(n in t){var o=t[n],i='<label class="'+c+'">'+o+"</label>",r=a[n],s=r.nextElementSibling;s&&s.classList.contains(c)?s.textContent!==o&&(s.textContent=o):(r.insertAdjacentHTML("afterend",i),r.classList.add(c))}},g=function(e){var t=e.nextElementSibling;e.classList.remove(c),t&&t.classList.contains(c)&&t.parentElement.removeChild(t)};d.setAttribute("novalidate",""),d.validatie=!1,t.addEventListener("click",function(){m(),!1===d.validatie?event.preventDefault():d.classList.add("loading")}),document.wpcf7mailsent||(document.addEventListener("wpcf7mailsent",function(e){var t=q("#"+e.detail.id+">form");if("wpcf7mailsent"===e.type){for(var n=t.elements,a=0;a<n.length;a++)g(n[a]),n[a].classList.remove("filled");t.reset(),l&&(l.innerHTML=""),"product-popup-form"===t.id&&fbq("track","Contact")}t.classList.remove("loading"),setTimeout(function(){t.classList.remove("sent")},3e3),thanksPopup.openPopup(),thanksPopupTimer=setTimeout(function(){thanksPopup.closePopup()},3e3)}),document.wpcf7mailsent=!0),d.addEventListener("input",function(){var e=event.target,t=e.type,n=e.files,a=e.classList,o=e.value;if("text"===t||"TEXTAREA"===e.tagName)""===o?a.remove("filled"):a.add("filled");else if("file"===t){for(var i="",r=0,s=n.length;r<s;r++)i+='<span class="uploadedfiles__file"><span class="uploadedfiles__file-text">'+n[r].name+"</span></span>";l.innerHTML=i}})}for(var t=qa(".contacts-sect__form, .contacts-us-sect__form, #product-popup-form"),n=t.length-1;0<=n;n--)t[n]&&e({form:t[n],formBtn:q("button",t[n]),uploadFilesBlock:q(".uploadedfiles",t[n]),filesInput:q('input[type="file"]',t[n])})}(),NodeList.prototype.forEach||(NodeList.prototype.forEach=Array.prototype.forEach),HTMLCollection.prototype.forEach||(HTMLCollection.prototype.forEach=Array.prototype.forEach),fakeScrollbar=id("fake-scrollbar"),burger=q(".hdr__burger"),hdr=q(".hdr"),menu=mobileMenu({menu:q(".menu"),menuCnt:q(".menu__cnt"),openBtn:burger,closeBtn:burger,fade:!0,allowPageScroll:!1}),sticky(hdr),thanksPopup=new Popup(".thanks-popup",{closeButtons:".thanks-popup__close"}),function(){qa(".catalogue-items.slider-view"),qa(".catalogue-items.loadmore-view");var i,e,t,n,r,a=q(".catalogue-items-sect");if(a&&(i=q(".catalogue-items",a),e=q(".catalogue-items__right",i),t=q(".catalogue-items__left",i),qa(".catalogue-items__category",i),n=q(".catalogue-items__left-line",i),a=function(e){var t,n,a,o=e&&e.target||q(".catalogue-items__category.active",i);o.classList.contains("catalogue-items__category")&&(e&&e.preventDefault(),e=o.getAttribute("data-term-id"),t=q(".catalogue-items__category.active",i),n=q('.catalogue-items__right-item[data-term-id="'+e+'"]'),a=q(".catalogue-items__right-item.active"),o!==t&&(i.classList.add("loading"),setTimeout(function(){[t,a].forEach(function(e){return e.classList.remove("active")}),i.classList.remove("loading"),[o,n].forEach(function(e){return e.classList.add("active")})},500),r(o)))},r=function(e){e=e||q(".catalogue-items__category.active",i),n.style.transform="translateY("+(e.offsetHeight/2+e.offsetTop-1)+"px)"},e&&t&&(i.addEventListener("click",a),r(),a())),q('[data-id="category-sale"]')){var s=qa('[data-id="category-sale"] .catalogue-items__item'),o=q('[name="product-name"]'),l='<svg class="arrow__svg" width="58" height="8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M57.354 4.354a.5.5 0 000-.708L54.172.464a.5.5 0 10-.707.708L56.293 4l-2.828 2.828a.5.5 0 10.707.708l3.182-3.182zM0 4.5h57v-1H0v1z" fill="currentColor"/></svg>';new Popup(".product-popup",{openButtons:".catalogue-item__btn",closeButtons:".product-popup__close"}).addEventListener("popupbeforeopen",function(){var e=this.caller;e&&(e=e.parentElement.parentElement,e=q(".catalogue-item__title",e),o.value=e.textContent)});for(var c=0,u=s.length;c<u;c++)!function(a){$catalogue=$(s[a]);var o,i=qa(".catalogue-item__fancybox-link",s[a]);$('[data-fancybox="gallery-'+a+'"]').fancybox({beforeClose:function(e,t,n){i.length&&1<i.length&&$('[data-slick="slider-'+a+'"]',$catalogue).slick("slickGoTo",e.currIndex)}}),1<qa(".catalogue-item__fancybox-link").length&&(o=q(".catalogue-item__counter",s[a]),$('[data-slick="slider-'+a+'"]').on("init reInit afterChange",function(e,t,n,a){n=(n||0)+1;o.textContent=n+"/"+(t.slideCount-t.options.slidesToShow+t.options.slidesToScroll)}),$('[data-slick="slider-'+a+'"]').slick({infinite:!1,draggable:!1,appendArrows:$(".catalogue-item__nav",$(s[a])),prevArrow:SLIDER.createArrow("catalogue-item__prev",l),nextArrow:SLIDER.createArrow("catalogue-item__next",l)}))}(c)}}(),lazy=new lazyload({clearSrc:!0,clearMedia:!0}),windowFuncs.resize.push(setVh),windowFuncs){var t;"call"===e||0<(t=windowFuncs[e]).length&&(windowFuncs.call(t),window.addEventListener(e,windowFuncs.call))}$(".slick-list.draggable").on("mousedown",function(){$(this).addClass("grabbing")}),$(".slick-list.draggable").on("beforeChange",function(){$(this).removeClass("grabbing")}),$(document).on("mouseup",function(){$(".slick-list.draggable").removeClass("grabbing")})});