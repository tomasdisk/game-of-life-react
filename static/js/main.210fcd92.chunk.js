(this["webpackJsonpgame-of-life-react"]=this["webpackJsonpgame-of-life-react"]||[]).push([[0],{10:function(e,o,n){},13:function(e,o,n){"use strict";n.r(o);var t,r=n(0),i=n.n(r),a=n(3),c=n.n(a),l=(n(10),n(1)),s=n(4),d=n.n(s),u=Math.floor(document.documentElement.clientWidth/20)-1,f=Math.floor(document.documentElement.clientHeight/20)-5,g=function(e){var o,n=u,r=f,i=80,a=!1,c=!0;e.setup=function(){e.createCanvas(20*n,20*r),e.colorMode(e.HSB),t=l(n,r,(function(){return e.floor(e.random(2))})),o=l(n,r)};var l=function(e,o,n){for(var t=[],r=0;r<e;r++)for(var i=0;i<o;i++)t[r*e+i]=n?n(e,o,r,i):0;return t},s=function(e,o,t){return(e[(o+1)*n+t-1]||0)+(e[(o+1)*u+t]||0)+(e[(o+1)*u+t+1]||0)+(e[o*u+t+1]||0)+(e[(o-1)*u+t+1]||0)+(e[(o-1)*u+t]||0)+(e[(o-1)*u+t-1]||0)+(e[o*u+t-1]||0)};e.myCustomRedrawAccordingToNewPropsHandler=function(e){i=e.color,a=e.random,c=e.running},e.draw=function(){e.background(0);for(var l=0;l<n;l++)for(var d=20*l,f=0;f<r;f++){var g=20*f;t[l*u+f]?e.fill(a?e.floor(e.random(256)):i,200,150):e.fill(0,0,50),e.stroke(0),e.rect(d,g,19,19),o[l*u+f]=s(t,l,f)}c&&function(e,o){for(var t=0;t<n;t++)for(var i=0;i<r;i++)3===o[t*u+i]?e[t*u+i]=1:2!==o[t*u+i]&&(e[t*u+i]=0)}(t,o)},e.mouseReleased=function(){var o=e.floor(e.mouseX/20),n=e.floor(e.mouseY/20);console.log(o,n),o>=0&&n>=0&&o<u&&n<f&&function(e,o,n){for(var t=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1,r=o;r<o+t;r++)for(var i=n;i<n+t;i++)e[r*u+i]=1}(t,o,n,1)}};var v=function(){var e=Object(r.useState)(80),o=Object(l.a)(e,2),n=o[0],a=o[1],c=Object(r.useState)(!1),s=Object(l.a)(c,2),u=s[0],f=s[1],v=Object(r.useState)(!0),m=Object(l.a)(v,2),h=m[0],b=m[1];return i.a.createElement("div",{className:"bg-indigo-300 h-screen"},i.a.createElement("nav",{className:"flex items-center justify-between bg-indigo-600 p-3"},i.a.createElement("div",{className:"inline-flex"},i.a.createElement("button",{className:"bg-indigo-600 border-indigo-800 hover:border-yellow-500 text-indigo-200 hover:text-indigo-100 p-2 border-2 rounded-l",onClick:function(){f((function(e){return!e}))}},"Random Color"),i.a.createElement("button",{className:"bg-indigo-600 border-indigo-800 hover:border-yellow-500 text-indigo-200 hover:text-indigo-100 p-2 border-2 border-l-0 ",onClick:function(){f(!1),a(Math.floor(255*Math.random()))}},"Change Color"),i.a.createElement("button",{className:"bg-indigo-600 border-indigo-800 hover:border-yellow-500 text-indigo-200 hover:text-indigo-100 p-2 border-2 border-l-0",onClick:function(){return function(){for(var e=0;e<t.length;e++)t[e]=0}()}},"Clear"),i.a.createElement("button",{className:"bg-indigo-600 border-indigo-800 hover:border-yellow-500 text-indigo-200 hover:text-indigo-100 p-2 border-2 border-l-0 rounded-r",onClick:function(){return b((function(e){return!e}))}},h?"Stop":"Play"))),i.a.createElement("section",{className:"w-full flex justify-center align-middle"},i.a.createElement(d.a,{sketch:g,color:n,random:u,running:h})))},m=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function h(e,o){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),o&&o.onUpdate&&o.onUpdate(e)):(console.log("Content is cached for offline use."),o&&o.onSuccess&&o.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}c.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(v,null)),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/game-of-life-react",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var o="".concat("/game-of-life-react","/service-worker.js");m?(!function(e,o){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var t=n.headers.get("content-type");404===n.status||null!=t&&-1===t.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):h(e,o)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(o,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):h(o,e)}))}}()},5:function(e,o,n){e.exports=n(13)}},[[5,1,2]]]);
//# sourceMappingURL=main.210fcd92.chunk.js.map