var mask,lazy,menu,burger,hdr,overlay,body,fakeScrollbar,mobileMenu,mediaQueries={s:"(min-width:575.98px)",m:"(min-width:767.98px)",lg:"(min-width:1023.98px)",xl:"(min-width:1439.98px)"},SLIDER={nextArrow:'<button type="button" class="arrow"></button>',prevArrow:'<button type="button" class="arrow"></button>',dot:'<button type="button" class="dot"></button>',hasSlickClass:function(e){return e.hasClass("slick-slider")},unslick:function(e){e.slick("unslick")},createArrow:function(e,t){return'<button type="button" class="arrow arrow_'+(e=(-1===e.indexOf("prev")?"next ":"prev ")+e)+'">'+t+"</button>"},setImages:function(e){for(var t=0,n=e.length;t<n;t++){var r=q("img",e[t]);r&&r.offsetParent&&(r.src=r.getAttribute("data-lazy")||r.getAttribute("data-src"))}}},windowFuncs={load:[],resize:[],scroll:[],call:function(e){for(var t=windowFuncs[e.type]||e,n=t.length-1;0<=n;n--)t[n]()}},q=function(e,t){return(t=t||document.body).querySelector(e)},qa=function(e,t,n){return t=t||document.body,n?Array.prototype.slice.call(t.querySelectorAll(e)):t.querySelectorAll(e)},id=function(e){return document.getElementById(e)},setVh=function(){var e=.01*window.innerHeight;document.documentElement.style.setProperty("--vh",e+"px")},media=function(e){return window.matchMedia(e).matches},scrollToTarget=function(e,t){var n,r,o,a;e.preventDefault(),_=this===window?e.target:this,(t=(t=!(t=0==t?body:t||_.getAttribute("data-scroll-target"))&&"A"===_.tagName?q(_.getAttribute("href")):t).constructor===String?q(t):t)&&(menu&&menu.close(),n=window.pageYOffset,e=getComputedStyle(t),r=t.getBoundingClientRect().top-+e.paddingTop.slice(0,-2)-+e.marginTop.slice(0,-2),o=null,a=function(e){e-=o=null===o?e:o,e=r<0?Math.max(n-e/.35,n+r):Math.min(n+e/.35,n+r);window.scrollTo(0,e),e!=n+r&&requestAnimationFrame(a)},requestAnimationFrame(a))},pageScroll=function(e){fakeScrollbar.classList.toggle("active",e),document.body.classList.toggle("no-scroll",e),document.body.style.paddingRight=e?fakeScrollbar.offsetWidth-fakeScrollbar.clientWidth+"px":""},sticky=function(e,t,n){e="string"==typeof e?q(e):e,n=n||"fixed",t=t||"bottom";var r=e.getBoundingClientRect()[t]+pageYOffset,o=e.cloneNode(!0),a=e.parentElement,i=function(){!e.classList.contains(n)&&pageYOffset>=r&&(a.appendChild(a.replaceChild(o,e)),e.classList.add(n),window.removeEventListener("scroll",i),window.addEventListener("scroll",s))},s=function(){e.classList.contains(n)&&pageYOffset<=r&&(a.replaceChild(e,o),e.classList.remove(n),window.removeEventListener("scroll",s),window.addEventListener("scroll",i))};o.classList.add("clone"),i(),window.addEventListener("scroll",i)};document.addEventListener("DOMContentLoaded",function(){mobileMenu=function(e){function r(e,t){for(var n=[e,t],r=["transform","transition"],o=["translate3d("+e+", 0px, 0px)","transform "+t],a=n.length-1;0<=a;a--)0!==n[a]&&(""===n[a]?n[a]="":n[a]=o[a],d.style[r[a]]=n[a])}function t(e){return e.constructor===String?q(e):e}function n(){R||(u.hasAttribute("style")&&(u.removeAttribute("style"),u.offsetHeight),u.classList.add("active"),f.classList.add("active"),d.scrollTop=0,L||(r("0px",".5s"),Y=d.offsetWidth),h||pageScroll(!0))}function o(e,t){var n;R&&(n=e&&e.target,(t||!e||"keyup"===e.type&&27===e.keyCode||n===u||n===p)&&(u.classList.remove("active"),f.classList.remove("active"),L||r(b,".5s")))}function a(e){F&&(e=e.touches[0]||window.e.touches[0],O=B=!1,H=D=e.clientX,P=e.clientY,m=Date.now(),d.addEventListener("touchend",E),d.addEventListener("touchmove",y),r(0,""))}function i(e){e.target!==u||e.pseudoElement||(L?"width"===e.propertyName&&k():"transform"===e.propertyName&&k(),F=!0)}function s(){u=t(e.menu),d=t(e.menuCnt),f=t(e.openBtn),p=t(e.closeBtn),h=x.allowPageScroll,g=x.toRight,w=x.toLeft,b=w?"100%":g?"-100%":0,L=x.fade,_("add"),L?g=w=!1:(r(b,0),u.addEventListener("touchstart",a)),u.isOpened=!1}function l(){R&&o(),L?g=w=!1:(r("",""),u.removeEventListener("touchstart",a)),_("remove"),p=f=d=u=null}function c(){if(S){for(var e in C=null,S)media(e)&&(C=e);C!==M&&function(){if(C){for(var e in S[C])x[e]=S[C][e];M=C}else{for(var t in A)x[t]=A[t];M=null}u&&(l(),s())}()}u||s()}var u,d,f,p,m,v,h,g,w,b,L,y=function(e){var t;F&&(t=e.touches[0]||window.e.touches[0],e=+d.style.transform.match(z)[0],N=D-t.clientX,D=t.clientX,$=P-t.clientY,P=t.clientY,O||B||(t=Math.abs($),Math.abs(N),7<t||0===N?B=!0:t<7&&(O=!0)),O&&r(w&&D<H||g&&H<D?"0px":e-N+"px",0))},E=function(e){I=H-D;var t=Math.abs(I);v=Date.now(),1<t&&O&&((w&&I<0||g&&0<I)&&(Y*T<=t||v-m<300?o(e,!0):(R=!1,n())),F=!1),u.removeEventListener("touchend",E),u.removeEventListener("touchmove",y)},k=function(){R?(u.isOpened=R=!1,f.addEventListener("click",n),p.removeEventListener("click",o),h||pageScroll(!1),sticky(hdr),u.classList.add("closed"),u.classList.remove("opened")):(u.isOpened=R=!0,f.removeEventListener("click",n),p.addEventListener("click",o),u.classList.add("opened"),u.classList.remove("closed"))},_=function(e){f[e+"EventListener"]("click",n),u[e+"EventListener"]("click",o),u[e+"EventListener"]("transitionend",i),document[e+"EventListener"]("keyup",o)},x=JSON.parse(JSON.stringify(e)),A=JSON.parse(JSON.stringify(e)),S=e.responsive,C=null,M=null,T=.5,z=(pageYOffset,/([-0-9.]+(?=px))/),O=!1,B=!1,F=!1,R=!1,D=0,N=0,P=0,$=0,H=0,I=0,Y=0;if(e.menu)return c(),windowFuncs.resize.push(c),{options:x,menu:u,menuCnt:d,openBtn:f,closeBtn:p,open:n,close:o,destroy:l,opened:R}},body=document.body,function(){mask=function(){var e="+7(___)___-__-__",t=0,n=e.replace(/\D/g,""),r=this.value.replace(/\D/g,"");n.length>=r.length&&(r=n),this.value=e.replace(/./g,function(e){return/[_\d]/.test(e)&&t<r.length?r.charAt(t++):t>=r.length?"":e}),"blur"===event.type?2===this.value.length&&(this.value="",this.classList.remove("filled")):(n=this.value.length,(e=this).focus(),e.setSelectionRange?e.setSelectionRange(n,n):e.createTextRange&&((e=e.createTextRange()).collapse(!0),e.moveEnd("character",n),e.moveStart("character",n),e.select()))};for(var e=qa("[name=tel]"),t=0;t<e.length;t++)e[t].addEventListener("input",mask),e[t].addEventListener("focus",mask),e[t].addEventListener("blur",mask)}(),function(){function e(e){var d=e.form,t=e.formBtn,l=e.uploadFilesBlock,c="invalid",f=(e.filesInput,{name:{required:!0},tel:{required:!0,pattern:/\+7\([0-9]{3}\)[0-9]{3}\-[0-9]{2}\-[0-9]{2}/,or:"email"},email:{required:!0,pattern:/^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z])+$/,or:"tel"},msg:{pattern:/[^\<\>\[\]%\&'`]+$/},policy:{required:!0}}),p={tel:{required:"Введите ваш телефон или E-mail",pattern:"Укажите верный телефон"},name:{required:"Введите ваше имя"},email:{required:"Введите ваш E-mail или телефон",pattern:"Введите верный E-mail"},msg:{required:"Введите ваше сообщение",pattern:"Введены недопустимые символы"},policy:{required:"Согласитель с политикой обработки персональных данных"}},m=function(e){var t,n={},r=d,o=function(e){var t,n=e.elements,r={};for(t in f){var o=n[t];o&&(r[t]=o.value)}return r}(r);for(t in o){var a=f[t],i=r[t],s=o[t],l=a.or,c=r[l];if(a&&(i.hasAttribute("required")||!0===a.required)){var u=i.type,a=a.pattern;if(("checkbox"===u||"radio"===u)&&!i.checked||""===s){if(!l||!c){n[t]=p[t].required;continue}if(""===c.value){n[t]=p[t].required;continue}}"cehckbox"!==u&&"radio"!==u&&a&&""!==s&&!1===a.test(s)?n[t]=p[t].pattern:h(i)}}0==Object.keys(n).length?(r.removeEventListener("change",m),r.removeEventListener("input",m),d.validatie=!0):(r.addEventListener("change",m),r.addEventListener("input",m),v(r,n),d.validatie=!1)},v=function(e,t){var n,r=e.elements;for(n in t){var o=t[n],a='<label class="'+c+'">'+o+"</label>",i=r[n],s=i.nextElementSibling;s&&s.classList.contains(c)?s.textContent!==o&&(s.textContent=o):(i.insertAdjacentHTML("afterend",a),i.classList.add(c))}},h=function(e){var t=e.nextElementSibling;e.classList.remove(c),t&&t.classList.contains(c)&&t.parentElement.removeChild(t)};d.setAttribute("novalidate",""),d.validatie=!1,t.addEventListener("click",function(){m(),!1===d.validatie?event.preventDefault():d.classList.add("loading")}),document.wpcf7mailsent||(document.addEventListener("wpcf7mailsent",function(e){var t=q("#"+e.detail.id+">form");if("wpcf7mailsent"===e.type){for(var n=t.elements,r=0;r<n.length;r++)h(n[r]),n[r].classList.remove("filled");t.reset(),l&&(l.innerHTML=""),"product-popup-form"===t.id&&fbq("track","Contact")}t.classList.remove("loading"),setTimeout(function(){t.classList.remove("sent")},3e3),thanksPopup.openPopup(),thanksPopupTimer=setTimeout(function(){thanksPopup.closePopup()},3e3)}),document.wpcf7mailsent=!0),d.addEventListener("input",function(){var e=event.target,t=e.type,n=e.files,r=e.classList,o=e.value;if("text"===t||"TEXTAREA"===e.tagName)""===o?r.remove("filled"):r.add("filled");else if("file"===t){for(var a="",i=0,s=n.length;i<s;i++)a+='<span class="uploadedfiles__file"><span class="uploadedfiles__file-text">'+n[i].name+"</span></span>";l.innerHTML=a}})}for(var t=qa(".contacts-sect__form, .contacts-us-sect__form, #product-popup-form"),n=t.length-1;0<=n;n--)t[n]&&e({form:t[n],formBtn:q("button",t[n]),uploadFilesBlock:q(".uploadedfiles",t[n]),filesInput:q('input[type="file"]',t[n])})}(),NodeList.prototype.forEach||(NodeList.prototype.forEach=Array.prototype.forEach),HTMLCollection.prototype.forEach||(HTMLCollection.prototype.forEach=Array.prototype.forEach),fakeScrollbar=id("fake-scrollbar"),burger=q(".hdr__burger"),hdr=q(".hdr"),menu=mobileMenu({menu:q(".menu"),menuCnt:q(".menu__cnt"),openBtn:burger,closeBtn:burger,fade:!0,allowPageScroll:!1}),sticky(hdr),thanksPopup=new Popup(".thanks-popup",{closeButtons:".thanks-popup__close"});var e,t,o,n,r,a,i=q(".about-features");for(r in i&&(e=$(i),t=qa(".about-feat",i),o=q(".about-features__counter-current",i.parentElement),i=q(".about-features__counter-total",i.parentElement),n='<svg class="arrow__svg" width="35" height="8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M34.354 3.646a.5.5 0 010 .708l-3.182 3.182a.5.5 0 11-.707-.708L33.293 4l-2.828-2.828a.5.5 0 11.707-.708l3.182 3.182zM0 3.5h34v1H0v-1z" fill="currentColor"/></svg>',e.on("beforeChange",function(e,t,n,r){o.textContent=1+r}),o.textContent=1,i.textContent=t.length,windowFuncs.resize.push(function(){SLIDER.hasSlickClass(e)||e.slick({appendArrows:$(".about-features__arrows"),nextArrow:SLIDER.createArrow("about-features__next",n),prevArrow:SLIDER.createArrow("about-features__prev",n),infinite:!1,mobileFirst:!0,responsive:[{breakpoint:575.98,settings:"unslick"}]})})),lazy=new lazyload({clearSrc:!0,clearMedia:!0}),windowFuncs.resize.push(setVh),windowFuncs)"call"===r||0<(a=windowFuncs[r]).length&&(windowFuncs.call(a),window.addEventListener(r,windowFuncs.call));$(".slick-list.draggable").on("mousedown",function(){$(this).addClass("grabbing")}),$(".slick-list.draggable").on("beforeChange",function(){$(this).removeClass("grabbing")}),$(document).on("mouseup",function(){$(".slick-list.draggable").removeClass("grabbing")})});