(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{384:function(e,t,n){"use strict";n.r(t);var a=n(2),i=n.n(a),c=n(454),l=n(464);t.default=function(){return i.a.createElement(l.default,{type:"primary",onClick:function(){return c.default.open("这是一条普通message")}},"普通提示")}},463:function(e,t,n){"use strict";var a=n(1),i=n(16),c=n.n(i),l=n(3),u=n(2),r=n.n(u),o=n(8),d=n.n(o),s=n(47),b=n.n(s),f=n(7),m=n(39),p=n(458),v=function(e){var t=e.visible,n=m.default.LoadingIcon,a=Object(u.useState)(t),i=Object(f.a)(a,2),c=i[0],l=i[1],o=Object(u.useState)(t?"show":"hidden"),s=Object(f.a)(o,2),v=s[0],h=s[1],g=Object(u.useRef)(null);return Object(p.a)((function(){return t?(l(!0),g.current=b()((function(){h("show")}),50)):(h("hidden"),g.current=b()((function(){l(!1),h("")}),350)),function(){null!==g.current&&clearTimeout(g.current)}}),[t]),c?r.a.createElement("span",{className:d()("uik-btn-loading-icon",v)},r.a.createElement(n,null)):r.a.createElement(u.Fragment,null)},h=function(e,t){var n=e.className,i=void 0!==n&&n,o=e.children,s=e.disabled,b=void 0!==s&&s,f=e.loading,m=void 0!==f&&f,p=e.htmlType,h=void 0===p?"button":p,g=e.size,j=void 0===g?"middle":g,k=e.type,w=void 0===k?"default":k,E=e.onClick,O=Object(l.a)(e,["className","children","disabled","loading","htmlType","size","type","onClick"]),y=Object(u.useRef)(null),C=t||y;return r.a.createElement("button",Object(a.a)({disabled:b,ref:C,type:h,className:d()("uik-btn",["".concat(w)],["".concat(j)],{loading:m,disabled:b},i),onClick:function(e){m||b||(!function(e){var t=C.current;if(null!==t){var n,a=t.getBoundingClientRect(),i=e.clientX-a.x,l=e.clientY-a.y,u=c()(n="width:10px;height:10px;left:".concat(i-5,"px;top:")).call(n,l-5,"px"),r=document.createElement("div");r.setAttribute("class","uik-btn-animate");var o=document.createElement("div");o.setAttribute("class","uik-btn-animate-ball"),o.setAttribute("style",u),o.addEventListener("animationend",(function(){t.removeChild(r)})),o.addEventListener("animationcancel",(function(){t.removeChild(r)})),r.append(o),t.append(r)}}(e),E&&E(e))}},O),r.a.createElement(v,{visible:m}),o)};t.a=Object(u.forwardRef)(h)},464:function(e,t,n){"use strict";var a=n(463);t.default=a.a}}]);