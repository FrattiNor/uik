(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{428:function(e,t,c){"use strict";c.r(t);var n=c(2),a=c.n(n),o=c(534);t.default=function(){return a.a.createElement(o.default,{defaultChecked:!0})}},468:function(e,t,c){"use strict";var n=c(106),a=c(6),o=c(2);t.a=function(e,t,c,u){var d,s=Object(o.useState)(c),i=Object(a.a)(s,2),b=i[0],r=i[1];return[void 0!==e?(d=e,u?"function"==typeof u?u(d)?d:b:Object(n.a)(d)===u?d:b:d):b,function(e){t&&t(e),r(e)}]}},526:function(e,t,c){"use strict";var n=c(1),a=c(13),o=c(6),u=c(3),d=c(2),s=c.n(d),i=c(8),b=c.n(i),r=c(468),f=c(461),l=function(e,t){var c,i=Object(d.useRef)(null),l=t||i,h=e.checked,j=e.defaultChecked,k=void 0!==j&&j,O=e.disabled,w=e.onCheckedChange,m=e.onMouseDown,v=e.onMouseUp,p=Object(u.a)(e,["checked","defaultChecked","disabled","onCheckedChange","onMouseDown","onMouseUp"]),C=Object(r.a)(h,w,k,"boolean"),M=Object(o.a)(C,2),E=M[0],D=M[1],N=Object(d.useState)(!1),S=Object(o.a)(N,2),U=S[0],g=S[1],J=Object(d.useState)(""),R=Object(o.a)(J,2),y=R[0],q=R[1];return Object(f.a)((function(){q(E)}),[E]),s.a.createElement("button",Object(n.a)({disabled:O,ref:l,className:b()("uik-switch",(c={disabled:O,checked:E},Object(a.a)(c,"not-checked",!E),Object(a.a)(c,"checked-animate",!0===y),Object(a.a)(c,"not-checked-animate",!1===y),c)),onMouseDown:function(e){m&&m(e),g(!0)},onMouseUp:function(e){v&&v(e),g(!1),D(!E)}},p),s.a.createElement("div",{className:b()("uik-switch-dot",{checked:E})},s.a.createElement("div",{className:b()("uik-switch-dot-content",Object(a.a)({checked:E},"mouse-down",U))})))};t.a=Object(d.forwardRef)(l)},534:function(e,t,c){"use strict";var n=c(526);t.default=n.a}}]);