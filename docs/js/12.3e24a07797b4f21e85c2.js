(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{353:function(e,t,n){"use strict";n.r(t);var a=n(6),c=n(2),i=n.n(c),l=n(456),o=n(500),r=n(467);t.default=function(){var e=Object(c.useState)(!1),t=Object(a.a)(e,2),n=t[0],u=t[1];return i.a.createElement(o.default,{content:"确认弹窗，你确认要关闭吗？",visible:n,onConfrim:function(){l.default.open("你点击了确认",{type:"success"}),u(!1)},onCancel:function(){l.default.open("你点击了取消",{type:"error"}),u(!1)},onVisibleChange:function(e){return u(e)}},i.a.createElement(r.default,{type:"primary"},"点击触发弹窗"))}},466:function(e,t,n){"use strict";var a=n(1),c=n(16),i=n.n(c),l=n(3),o=n(2),r=n.n(o),u=n(8),d=n.n(u),s=n(48),f=n.n(s),m=n(6),b=n(32),p=n(461),v=function(e){var t=e.visible,n=b.default.LoadingIcon,a=Object(o.useState)(t),c=Object(m.a)(a,2),i=c[0],l=c[1],u=Object(o.useState)(t?"show":"hidden"),s=Object(m.a)(u,2),v=s[0],k=s[1],j=Object(o.useRef)(null);return Object(p.a)((function(){return t?(l(!0),j.current=f()((function(){k("show")}),50)):(k("hidden"),j.current=f()((function(){l(!1),k("")}),350)),function(){null!==j.current&&clearTimeout(j.current)}}),[t]),i?r.a.createElement("span",{className:d()("uik-btn-loading-icon",v)},r.a.createElement(n,null)):r.a.createElement(o.Fragment,null)},k=function(e,t){var n=e.className,c=void 0!==n&&n,u=e.children,s=e.disabled,f=void 0!==s&&s,m=e.loading,b=void 0!==m&&m,p=e.htmlType,k=void 0===p?"button":p,j=e.size,E=void 0===j?"middle":j,O=e.type,h=void 0===O?"default":O,y=e.onClick,C=Object(l.a)(e,["className","children","disabled","loading","htmlType","size","type","onClick"]),g=Object(o.useRef)(null),w=t||g;return r.a.createElement("button",Object(a.a)({disabled:f,ref:w,type:k,className:d()("uik-btn",["".concat(h)],["".concat(E)],{loading:b,disabled:f},c),onClick:function(e){b||f||(!function(e){var t=w.current;if(null!==t){var n,a=t.getBoundingClientRect(),c=e.clientX-a.x,l=e.clientY-a.y,o=i()(n="width:10px;height:10px;left:".concat(c-5,"px;top:")).call(n,l-5,"px"),r=document.createElement("div");r.setAttribute("class","uik-btn-animate");var u=document.createElement("div");u.setAttribute("class","uik-btn-animate-ball"),u.setAttribute("style",o),u.addEventListener("animationend",(function(){t.removeChild(r)})),u.addEventListener("animationcancel",(function(){t.removeChild(r)})),r.append(u),t.append(r)}}(e),y&&y(e))}},C),r.a.createElement(v,{visible:b}),u)};t.a=Object(o.forwardRef)(k)},467:function(e,t,n){"use strict";var a=n(466);t.default=a.a},480:function(e,t,n){"use strict";var a=n(1),c=n(2),i=n.n(c),l=n(107),o=n(108),r=n(467),u=Object(l.a)({backgroundColor:"#fff",emptyKey:"content",updatePositionProps:["content"]})((function(e){var t=e.content,n=e.okBtnProps,c=void 0===n?{}:n,l=e.cancelBtnProps,o=void 0===l?{}:l,u=e.okBtnText,d=e.cancelBtnText,s=e.onConfrim,f=e.onCancel;return i.a.createElement("div",{className:"uik-confirm"},i.a.createElement("div",{className:"uik-confirm-content"},t),i.a.createElement("div",{className:"uik-confirm-btn"},i.a.createElement(r.default,Object(a.a)({onClick:function(e){f&&f(e)},size:"small"},o),d||"取消"),i.a.createElement(r.default,Object(a.a)({onClick:function(e){s&&s(e)},size:"small",type:"primary"},c),u||"确认")))}));t.a=Object(o.a)({name:"confirm",defaultTrigger:"click",defaultZIndex:1003})(u)},500:function(e,t,n){"use strict";var a=n(480);t.default=a.a}}]);