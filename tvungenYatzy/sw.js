if(!self.define){let e,d={};const i=(i,s)=>(i=new URL(i+".js",s).href,d[i]||new Promise((d=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=d,document.head.appendChild(e)}else e=i,importScripts(i),d()})).then((()=>{let e=d[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(s,r)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(d[c])return;let a={};const n=e=>i(e,c),o={module:{uri:c},exports:a,require:n};d[c]=Promise.all(s.map((e=>o[e]||n(e)))).then((e=>(r(...e),a)))}}define(["./workbox-d5691418"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"css/yatzy.css",revision:"a8d0ad9f66774e4c78be36a90b22c209"},{url:"js/categories.js",revision:"d274be69bad222dbee5a167a080d25d2"},{url:"js/Dice.js",revision:"9d1dcf783d460adeb13c8368d796573f"},{url:"js/generalFunctions.js",revision:"c05c5110ce7e4dc0a957fa7e5fafc208"},{url:"js/probabilityCalculations.js",revision:"69d20b5b641fc3736bef2824782798f2"},{url:"media/d1.svg",revision:"b1d26395f0bbd8faa5927a00b97176e6"},{url:"media/d2.svg",revision:"7ccf4acb9bcc15655d2c74bd0dae318e"},{url:"media/d3.svg",revision:"9794e5ef7895b2f188490a8172998d41"},{url:"media/d4.svg",revision:"5772765b0998e02deb5a071a9da9427c"},{url:"media/d5.svg",revision:"3ed5154fdd8fbd9ff52b3d21fdd9ab26"},{url:"media/d6.svg",revision:"571dea8bf50daadca1dd37040f78df21"},{url:"media/icon.png",revision:"3a8f2ce665c92fcb852d60bb25b6c1d9"},{url:"index.html",revision:"65a05429401c49adf796d616978bd964"},{url:"manifest.json",revision:"1f3888433be3d9c922d0800ac659f8e5"}],{})}));
//# sourceMappingURL=sw.js.map
