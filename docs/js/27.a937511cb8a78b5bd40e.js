(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{429:function(e,t,n){"use strict";n.r(t);var a=n(2),i=n.n(a),c=n(335),l=n(464);t.default=function(){return i.a.createElement(a.Fragment,null,i.a.createElement(c.default,{title:"tooltip文本"},i.a.createElement(l.default,{type:"primary"},"鼠标移入触发tooltip")))}},463:function(e,t,n){"use strict";var a=n(1),i=n(16),c=n.n(i),l=n(3),r=n(2),u=n.n(r),o=n(8),d=n.n(o),s=n(47),m=n.n(s),b=n(7),f=n(39),p=n(458),v=function(e){var t=e.visible,n=f.default.LoadingIcon,a=Object(r.useState)(t),i=Object(b.a)(a,2),c=i[0],l=i[1],o=Object(r.useState)(t?"show":"hidden"),s=Object(b.a)(o,2),v=s[0],h=s[1],E=Object(r.useRef)(null);return Object(p.a)((function(){return t?(l(!0),E.current=m()((function(){h("show")}),50)):(h("hidden"),E.current=m()((function(){l(!1),h("")}),350)),function(){null!==E.current&&clearTimeout(E.current)}}),[t]),c?u.a.createElement("span",{className:d()("uik-btn-loading-icon",v)},u.a.createElement(n,null)):u.a.createElement(r.Fragment,null)},h=function(e,t){var n=e.className,i=void 0!==n&&n,o=e.children,s=e.disabled,m=void 0!==s&&s,b=e.loading,f=void 0!==b&&b,p=e.htmlType,h=void 0===p?"button":p,E=e.size,g=void 0===E?"middle":E,j=e.type,w=void 0===j?"default":j,O=e.onClick,k=Object(l.a)(e,["className","children","disabled","loading","htmlType","size","type","onClick"]),y=Object(r.useRef)(null),C=t||y;return u.a.createElement("button",Object(a.a)({disabled:m,ref:C,type:h,className:d()("uik-btn",["".concat(w)],["".concat(g)],{loading:f,disabled:m},i),onClick:function(e){f||m||(!function(e){var t=C.current;if(null!==t){var n,a=t.getBoundingClientRect(),i=e.clientX-a.x,l=e.clientY-a.y,r=c()(n="width:10px;height:10px;left:".concat(i-5,"px;top:")).call(n,l-5,"px"),u=document.createElement("div");u.setAttribute("class","uik-btn-animate");var o=document.createElement("div");o.setAttribute("class","uik-btn-animate-ball"),o.setAttribute("style",r),o.addEventListener("animationend",(function(){t.removeChild(u)})),o.addEventListener("animationcancel",(function(){t.removeChild(u)})),u.append(o),t.append(u)}}(e),O&&O(e))}},k),u.a.createElement(v,{visible:f}),o)};t.a=Object(r.forwardRef)(h)},464:function(e,t,n){"use strict";var a=n(463);t.default=a.a}}]);