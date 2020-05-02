var app=function(){"use strict";function t(){}function n(t){return t()}function e(){return Object.create(null)}function o(t){t.forEach(n)}function r(t){return"function"==typeof t}function c(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function s(n,e,o){n.$$.on_destroy.push(function(n,...e){if(null==n)return t;const o=n.subscribe(...e);return o.unsubscribe?()=>o.unsubscribe():o}(e,o))}const i="undefined"!=typeof window;let u=i?()=>window.performance.now():()=>Date.now(),f=i?t=>requestAnimationFrame(t):t;const l=new Set;function a(t){l.forEach(n=>{n.c(t)||(l.delete(n),n.f())}),0!==l.size&&f(a)}function d(t,n,e){t.insertBefore(n,e||null)}function p(t){t.parentNode.removeChild(t)}function g(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function m(t){return document.createTextNode(t)}function h(t,n,e){null==e?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function $(t,n,e,o){t.style.setProperty(n,e,o?"important":"")}let b;function y(t){b=t}const w=[],x=[],v=[],_=[],A=Promise.resolve();let E=!1;function N(t){v.push(t)}let j=!1;const M=new Set;function O(){if(!j){j=!0;do{for(let t=0;t<w.length;t+=1){const n=w[t];y(n),C(n.$$)}for(w.length=0;x.length;)x.pop()();for(let t=0;t<v.length;t+=1){const n=v[t];M.has(n)||(M.add(n),n())}v.length=0}while(w.length);for(;_.length;)_.pop()();E=!1,j=!1,M.clear()}}function C(t){if(null!==t.fragment){t.update(),o(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(N)}}const D=new Set;let P;function S(t,n){t&&t.i&&(D.delete(t),t.i(n))}function L(t,n,e,o){if(t&&t.o){if(D.has(t))return;D.add(t),P.c.push(()=>{D.delete(t),o&&(e&&t.d(1),o())}),t.o(n)}}function k(t){t&&t.c()}function q(t,e,c){const{fragment:s,on_mount:i,on_destroy:u,after_update:f}=t.$$;s&&s.m(e,c),N(()=>{const e=i.map(n).filter(r);u?u.push(...e):o(e),t.$$.on_mount=[]}),f.forEach(N)}function z(t,n){const e=t.$$;null!==e.fragment&&(o(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function B(t,n){-1===t.$$.dirty[0]&&(w.push(t),E||(E=!0,A.then(O)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function T(n,r,c,s,i,u,f=[-1]){const l=b;y(n);const a=r.props||{},d=n.$$={fragment:null,ctx:null,props:u,update:t,not_equal:i,bound:e(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(l?l.$$.context:[]),callbacks:e(),dirty:f};let g=!1;if(d.ctx=c?c(n,a,(t,e,...o)=>{const r=o.length?o[0]:e;return d.ctx&&i(d.ctx[t],d.ctx[t]=r)&&(d.bound[t]&&d.bound[t](r),g&&B(n,t)),e}):[],d.update(),g=!0,o(d.before_update),d.fragment=!!s&&s(d.ctx),r.target){if(r.hydrate){const t=(m=r.target,Array.from(m.childNodes));d.fragment&&d.fragment.l(t),t.forEach(p)}else d.fragment&&d.fragment.c();r.intro&&S(n.$$.fragment),q(n,r.target,r.anchor),O()}var m;y(l)}class F{$destroy(){z(this,1),this.$destroy=t}$on(t,n){const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n),()=>{const t=e.indexOf(n);-1!==t&&e.splice(t,1)}}$set(){}}function I(t,n,e){let o,r,c,{color:s="red"}=n;function i(t){o=t.clientX,r=t.clientY}return window.onpointermove=function(t){i(t)},window.onpointerdown=function(t){i(t)},document.addEventListener("DOMContentLoaded",(function(){const t=firebase.database().ref("A"+s);setInterval((function(){r!=c&&(t.update({x:o,y:r}),console.log("updating firebase","mouseloc:",o,r),c=r)}),20)})),t.$set=t=>{"color"in t&&e(0,s=t.color)},[s]}class X extends F{constructor(t){super(),T(this,t,I,null,c,{color:0})}}const Y=[];function G(t){return"[object Date]"===Object.prototype.toString.call(t)}function H(n,e={}){const o=function(n,e=t){let o;const r=[];function s(t){if(c(n,t)&&(n=t,o)){const t=!Y.length;for(let t=0;t<r.length;t+=1){const e=r[t];e[1](),Y.push(e,n)}if(t){for(let t=0;t<Y.length;t+=2)Y[t][0](Y[t+1]);Y.length=0}}}return{set:s,update:function(t){s(t(n))},subscribe:function(c,i=t){const u=[c,i];return r.push(u),1===r.length&&(o=e(s)||t),c(n),()=>{const t=r.indexOf(u);-1!==t&&r.splice(t,1),0===r.length&&(o(),o=null)}}}}(n),{stiffness:r=.15,damping:s=.8,precision:i=.01}=e;let d,p,g,m=n,h=n,$=1,b=0,y=!1;function w(t,e={}){h=t;const r=g={};if(null==n||e.hard||x.stiffness>=1&&x.damping>=1)return y=!0,d=u(),m=t,o.set(n=h),Promise.resolve();if(e.soft){const t=!0===e.soft?.5:+e.soft;b=1/(60*t),$=0}return p||(d=u(),y=!1,p=function(t){let n;return 0===l.size&&f(a),{promise:new Promise(e=>{l.add(n={c:t,f:e})}),abort(){l.delete(n)}}}(t=>{if(y)return y=!1,p=null,!1;$=Math.min($+b,1);const e={inv_mass:$,opts:x,settled:!0,dt:60*(t-d)/1e3},r=function t(n,e,o,r){if("number"==typeof o||G(o)){const t=r-o,c=(o-e)/(n.dt||1/60),s=(c+(n.opts.stiffness*t-n.opts.damping*c)*n.inv_mass)*n.dt;return Math.abs(s)<n.opts.precision&&Math.abs(t)<n.opts.precision?r:(n.settled=!1,G(o)?new Date(o.getTime()+s):o+s)}if(Array.isArray(o))return o.map((c,s)=>t(n,e[s],o[s],r[s]));if("object"==typeof o){const c={};for(const s in o)c[s]=t(n,e[s],o[s],r[s]);return c}throw new Error(`Cannot spring ${typeof o} values`)}(e,m,n,h);return d=t,m=n,o.set(n=r),e.settled&&(p=null),!e.settled})),new Promise(t=>{p.promise.then(()=>{r===g&&t()})})}const x={set:w,update:(t,e)=>w(t(h,n),e),subscribe:o.subscribe,stiffness:r,damping:s,precision:i};return x}function J(n){let e,o,r,c;return{c(){e=g("svg"),o=g("circle"),$(o,"fill",n[0]),h(o,"cx",r=n[1].x),h(o,"cy",c=n[1].y),h(o,"r","10"),h(e,"class","svelte-h81ojf")},m(t,n){d(t,e,n),function(t,n){t.appendChild(n)}(e,o)},p(t,[n]){1&n&&$(o,"fill",t[0]),2&n&&r!==(r=t[1].x)&&h(o,"cx",r),2&n&&c!==(c=t[1].y)&&h(o,"cy",c)},i:t,o:t,d(t){t&&p(e)}}}function K(t,n,e){let o,{color:r="red"}=n,c=H({x:50,y:50},{stiffness:.8,damping:.8});return s(t,c,t=>e(1,o=t)),document.addEventListener("DOMContentLoaded",(function(){firebase.database().ref("A"+r).on("value",t=>{console.log("receiving from firebase",r),c.set({x:Number(t.child("x").val()),y:Number(t.child("y").val())})})})),t.$set=t=>{"color"in t&&e(0,r=t.color)},[r,o,c]}class Q extends F{constructor(t){super(),T(this,t,K,J,c,{color:0})}}function R(t,n,e){const o=t.slice();return o[1]=n[e],o}function U(n){let e;const o=new Q({props:{color:n[1]}});return{c(){k(o.$$.fragment)},m(t,n){q(o,t,n),e=!0},p:t,i(t){e||(S(o.$$.fragment,t),e=!0)},o(t){L(o.$$.fragment,t),e=!1},d(t){z(o,t)}}}function V(t){let n,e,r;const c=new X({props:{color:W}});let s=t[0],i=[];for(let n=0;n<s.length;n+=1)i[n]=U(R(t,s,n));const u=t=>L(i[t],1,1,()=>{i[t]=null});return{c(){k(c.$$.fragment),n=m(" ");for(let t=0;t<i.length;t+=1)i[t].c();e=m("")},m(t,o){q(c,t,o),d(t,n,o);for(let n=0;n<i.length;n+=1)i[n].m(t,o);d(t,e,o),r=!0},p(t,[n]){if(1&n){let r;for(s=t[0],r=0;r<s.length;r+=1){const o=R(t,s,r);i[r]?(i[r].p(o,n),S(i[r],1)):(i[r]=U(o),i[r].c(),S(i[r],1),i[r].m(e.parentNode,e))}for(P={r:0,c:[],p:P},r=s.length;r<i.length;r+=1)u(r);P.r||o(P.c),P=P.p}},i(t){if(!r){S(c.$$.fragment,t);for(let t=0;t<s.length;t+=1)S(i[t]);r=!0}},o(t){L(c.$$.fragment,t),i=i.filter(Boolean);for(let t=0;t<i.length;t+=1)L(i[t]);r=!1},d(t){z(c,t),t&&p(n),function(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}(i,t),t&&p(e)}}}let W="gold";function Z(t){return[["red","blue","green"]]}return new class extends F{constructor(t){super(),T(this,t,Z,V,c,{})}}({target:document.body})}();
//# sourceMappingURL=yellowb.js.map
