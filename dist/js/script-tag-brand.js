var mask,lazy,menu,burger,hdr,overlay,body,fakeScrollbar,mobileMenu,mediaQueries={s:"(min-width:575.98px)",m:"(min-width:767.98px)",lg:"(min-width:1023.98px)",xl:"(min-width:1439.98px)"},SLIDER={nextArrow:'<button type="button" class="arrow"></button>',prevArrow:'<button type="button" class="arrow"></button>',dot:'<button type="button" class="dot"></button>',hasSlickClass:function(e){return e.hasClass("slick-slider")},unslick:function(e){e.slick("unslick")},createArrow:function(e,t){return'<button type="button" class="arrow arrow_'+(e=(-1===e.indexOf("prev")?"next ":"prev ")+e)+'">'+t+"</button>"},setImages:function(e){for(var t=0,n=e.length;t<n;t++){var a=q("img",e[t]);a&&a.offsetParent&&(a.src=a.getAttribute("data-lazy")||a.getAttribute("data-src"))}}},windowFuncs={load:[],resize:[],scroll:[],call:function(e){for(var t=windowFuncs[e.type]||e,n=t.length-1;0<=n;n--)t[n]()}},q=function(e,t){return(t=t||document.body).querySelector(e)},qa=function(e,t,n){return t=t||document.body,n?Array.prototype.slice.call(t.querySelectorAll(e)):t.querySelectorAll(e)},id=function(e){return document.getElementById(e)},setVh=function(){var e=.01*window.innerHeight;document.documentElement.style.setProperty("--vh",e+"px")},media=function(e){return window.matchMedia(e).matches},scrollToTarget=function(e,t){var n,a,i,o;e.preventDefault(),_=this===window?e.target:this,(t=(t=!(t=0==t?body:t||_.getAttribute("data-scroll-target"))&&"A"===_.tagName?q(_.getAttribute("href")):t).constructor===String?q(t):t)&&(menu&&menu.close(),n=window.pageYOffset,e=getComputedStyle(t),a=t.getBoundingClientRect().top-+e.paddingTop.slice(0,-2)-+e.marginTop.slice(0,-2),i=null,o=function(e){e-=i=null===i?e:i,e=a<0?Math.max(n-e/.35,n+a):Math.min(n+e/.35,n+a);window.scrollTo(0,e),e!=n+a&&requestAnimationFrame(o)},requestAnimationFrame(o))},pageScroll=function(e){fakeScrollbar.classList.toggle("active",e),document.body.classList.toggle("no-scroll",e),document.body.style.paddingRight=e?fakeScrollbar.offsetWidth-fakeScrollbar.clientWidth+"px":""},sticky=function(e,t,n){e="string"==typeof e?q(e):e,n=n||"fixed",t=t||"bottom";var a=e.getBoundingClientRect()[t]+pageYOffset,i=e.cloneNode(!0),o=e.parentElement,r=function(){!e.classList.contains(n)&&pageYOffset>=a&&(o.appendChild(o.replaceChild(i,e)),e.classList.add(n),window.removeEventListener("scroll",r),window.addEventListener("scroll",s))},s=function(){e.classList.contains(n)&&pageYOffset<=a&&(o.replaceChild(e,i),e.classList.remove(n),window.removeEventListener("scroll",s),window.addEventListener("scroll",r))};i.classList.add("clone"),r(),window.addEventListener("scroll",r)};document.addEventListener("DOMContentLoaded",function(){for(var e in mobileMenu=function(e){function a(e,t){for(var n=[e,t],a=["transform","transition"],i=["translate3d("+e+", 0px, 0px)","transform "+t],o=n.length-1;0<=o;o--)0!==n[o]&&(""===n[o]?n[o]="":n[o]=i[o],d.style[a[o]]=n[o])}function t(e){return e.constructor===String?q(e):e}function n(){N||(u.hasAttribute("style")&&(u.removeAttribute("style"),u.offsetHeight),u.classList.add("active"),f.classList.add("active"),d.scrollTop=0,w||(a("0px",".5s"),I=d.offsetWidth),g||pageScroll(!0))}function i(e,t){var n;N&&(n=e&&e.target,(t||!e||"keyup"===e.type&&27===e.keyCode||n===u||n===m)&&(u.classList.remove("active"),f.classList.remove("active"),w||a(b,".5s")))}function o(e){F&&(e=e.touches[0]||window.e.touches[0],B=z=!1,H=P=e.clientX,D=e.clientY,p=Date.now(),d.addEventListener("touchend",E),d.addEventListener("touchmove",y),a(0,""))}function r(e){e.target!==u||e.pseudoElement||(w?"width"===e.propertyName&&_():"transform"===e.propertyName&&_(),F=!0)}function s(){u=t(e.menu),d=t(e.menuCnt),f=t(e.openBtn),m=t(e.closeBtn),g=x.allowPageScroll,h=x.toRight,L=x.toLeft,b=L?"100%":h?"-100%":0,w=x.fade,k("add"),w?h=L=!1:(a(b,0),u.addEventListener("touchstart",o)),u.isOpened=!1}function l(){N&&i(),w?h=L=!1:(a("",""),u.removeEventListener("touchstart",o)),k("remove"),m=f=d=u=null}function c(){if(S){for(var e in C=null,S)media(e)&&(C=e);C!==T&&function(){if(C){for(var e in S[C])x[e]=S[C][e];T=C}else{for(var t in A)x[t]=A[t];T=null}u&&(l(),s())}()}u||s()}var u,d,f,m,p,v,g,h,L,b,w,y=function(e){var t;F&&(t=e.touches[0]||window.e.touches[0],e=+d.style.transform.match(O)[0],R=P-t.clientX,P=t.clientX,Y=D-t.clientY,D=t.clientY,B||z||(t=Math.abs(Y),Math.abs(R),7<t||0===R?z=!0:t<7&&(B=!0)),B&&a(L&&P<H||h&&H<P?"0px":e-R+"px",0))},E=function(e){$=H-P;var t=Math.abs($);v=Date.now(),1<t&&B&&((L&&$<0||h&&0<$)&&(I*M<=t||v-p<300?i(e,!0):(N=!1,n())),F=!1),u.removeEventListener("touchend",E),u.removeEventListener("touchmove",y)},_=function(){N?(u.isOpened=N=!1,f.addEventListener("click",n),m.removeEventListener("click",i),g||pageScroll(!1),sticky(hdr),u.classList.add("closed"),u.classList.remove("opened")):(u.isOpened=N=!0,f.removeEventListener("click",n),m.addEventListener("click",i),u.classList.add("opened"),u.classList.remove("closed"))},k=function(e){f[e+"EventListener"]("click",n),u[e+"EventListener"]("click",i),u[e+"EventListener"]("transitionend",r),document[e+"EventListener"]("keyup",i)},x=JSON.parse(JSON.stringify(e)),A=JSON.parse(JSON.stringify(e)),S=e.responsive,C=null,T=null,M=.5,O=(pageYOffset,/([-0-9.]+(?=px))/),B=!1,z=!1,F=!1,N=!1,P=0,R=0,D=0,Y=0,H=0,$=0,I=0;if(e.menu)return c(),windowFuncs.resize.push(c),{options:x,menu:u,menuCnt:d,openBtn:f,closeBtn:m,open:n,close:i,destroy:l,opened:N}},body=document.body,function(){mask=function(){var e="+7(___)___-__-__",t=0,n=e.replace(/\D/g,""),a=this.value.replace(/\D/g,"");n.length>=a.length&&(a=n),this.value=e.replace(/./g,function(e){return/[_\d]/.test(e)&&t<a.length?a.charAt(t++):t>=a.length?"":e}),"blur"===event.type?2===this.value.length&&(this.value="",this.classList.remove("filled")):(n=this.value.length,(e=this).focus(),e.setSelectionRange?e.setSelectionRange(n,n):e.createTextRange&&((e=e.createTextRange()).collapse(!0),e.moveEnd("character",n),e.moveStart("character",n),e.select()))};for(var e=qa("[name=tel]"),t=0;t<e.length;t++)e[t].addEventListener("input",mask),e[t].addEventListener("focus",mask),e[t].addEventListener("blur",mask)}(),function(){function e(e){var d=e.form,t=e.formBtn,l=e.uploadFilesBlock,c="invalid",f=(e.filesInput,{name:{required:!0},tel:{required:!0,pattern:/\+7\([0-9]{3}\)[0-9]{3}\-[0-9]{2}\-[0-9]{2}/,or:"email"},email:{required:!0,pattern:/^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z])+$/,or:"tel"},msg:{pattern:/[^\<\>\[\]%\&'`]+$/},policy:{required:!0}}),m={tel:{required:"Введите ваш телефон или E-mail",pattern:"Укажите верный телефон"},name:{required:"Введите ваше имя"},email:{required:"Введите ваш E-mail или телефон",pattern:"Введите верный E-mail"},msg:{required:"Введите ваше сообщение",pattern:"Введены недопустимые символы"},policy:{required:"Согласитель с политикой обработки персональных данных"}},p=function(e){var t,n={},a=d,i=function(e){var t,n=e.elements,a={};for(t in f){var i=n[t];i&&(a[t]=i.value)}return a}(a);for(t in i){var o=f[t],r=a[t],s=i[t],l=o.or,c=a[l];if(o&&(r.hasAttribute("required")||!0===o.required)){var u=r.type,o=o.pattern;if(("checkbox"===u||"radio"===u)&&!r.checked||""===s){if(!l||!c){n[t]=m[t].required;continue}if(""===c.value){n[t]=m[t].required;continue}}"cehckbox"!==u&&"radio"!==u&&o&&""!==s&&!1===o.test(s)?n[t]=m[t].pattern:g(r)}}0==Object.keys(n).length?(a.removeEventListener("change",p),a.removeEventListener("input",p),d.validatie=!0):(a.addEventListener("change",p),a.addEventListener("input",p),v(a,n),d.validatie=!1)},v=function(e,t){var n,a=e.elements;for(n in t){var i=t[n],o='<label class="'+c+'">'+i+"</label>",r=a[n],s=r.nextElementSibling;s&&s.classList.contains(c)?s.textContent!==i&&(s.textContent=i):(r.insertAdjacentHTML("afterend",o),r.classList.add(c))}},g=function(e){var t=e.nextElementSibling;e.classList.remove(c),t&&t.classList.contains(c)&&t.parentElement.removeChild(t)};d.setAttribute("novalidate",""),d.validatie=!1,t.addEventListener("click",function(){p(),!1===d.validatie?event.preventDefault():d.classList.add("loading")}),document.wpcf7mailsent||(document.addEventListener("wpcf7mailsent",function(e){var t=q("#"+e.detail.id+">form");if("wpcf7mailsent"===e.type){for(var n=t.elements,a=0;a<n.length;a++)g(n[a]),n[a].classList.remove("filled");t.reset(),l&&(l.innerHTML="")}t.classList.remove("loading"),setTimeout(function(){t.classList.remove("sent")},3e3),thanksPopup.openPopup(),thanksPopupTimer=setTimeout(function(){thanksPopup.closePopup()},3e3)}),document.wpcf7mailsent=!0),d.addEventListener("input",function(){var e=event.target,t=e.type,n=e.files,a=e.classList,i=e.value;if("text"===t||"TEXTAREA"===e.tagName)""===i?a.remove("filled"):a.add("filled");else if("file"===t){for(var o="",r=0,s=n.length;r<s;r++)o+='<span class="uploadedfiles__file"><span class="uploadedfiles__file-text">'+n[r].name+"</span></span>";l.innerHTML=o}})}for(var t=qa(".contacts-sect__form, .contacts-us-sect__form, #product-popup-form"),n=t.length-1;0<=n;n--)t[n]&&e({form:t[n],formBtn:q("button",t[n]),uploadFilesBlock:q(".uploadedfiles",t[n]),filesInput:q('input[type="file"]',t[n])})}(),NodeList.prototype.forEach||(NodeList.prototype.forEach=Array.prototype.forEach),HTMLCollection.prototype.forEach||(HTMLCollection.prototype.forEach=Array.prototype.forEach),fakeScrollbar=id("fake-scrollbar"),burger=q(".hdr__burger"),hdr=q(".hdr"),menu=mobileMenu({menu:q(".menu"),menuCnt:q(".menu__cnt"),openBtn:burger,closeBtn:burger,fade:!0,allowPageScroll:!1}),sticky(hdr),thanksPopup=new Popup(".thanks-popup",{closeButtons:".thanks-popup__close"}),function(){qa(".catalogue-items.slider-view"),qa(".catalogue-items.loadmore-view");var o,e,t,n,r,a=q(".catalogue-items-sect");a&&(o=q(".catalogue-items",a),e=q(".catalogue-items__right",o),t=q(".catalogue-items__left",o),qa(".catalogue-items__category",o),n=q(".catalogue-items__left-line",o),a=function(e){var t,n,a,i=e&&e.target||q(".catalogue-items__category.active",o);i.classList.contains("catalogue-items__category")&&(e&&e.preventDefault(),e=i.getAttribute("data-term-id"),t=q(".catalogue-items__category.active",o),n=q('.catalogue-items__right-item[data-term-id="'+e+'"]'),a=q(".catalogue-items__right-item.active"),i!==t&&(o.classList.add("loading"),setTimeout(function(){[t,a].forEach(function(e){return e.classList.remove("active")}),o.classList.remove("loading"),[i,n].forEach(function(e){return e.classList.add("active")})},500),r(i)))},r=function(e){e=e||q(".catalogue-items__category.active",o),n.style.transform="translateY("+(e.offsetHeight/2+e.offsetTop-1)+"px)"},e&&t&&(o.addEventListener("click",a),r(),a()))}(),lazy=new lazyload({clearSrc:!0,clearMedia:!0}),windowFuncs.resize.push(setVh),windowFuncs){var t;"call"===e||0<(t=windowFuncs[e]).length&&(windowFuncs.call(t),window.addEventListener(e,windowFuncs.call))}$(".slick-list.draggable").on("mousedown",function(){$(this).addClass("grabbing")}),$(".slick-list.draggable").on("beforeChange",function(){$(this).removeClass("grabbing")}),$(document).on("mouseup",function(){$(".slick-list.draggable").removeClass("grabbing")})});