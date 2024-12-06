window.flixJsCallbacks.pageSpecific={price:function(){var
bread=document.querySelector('.wd-single-price .woocommerce-Price-amount')||null,crumbs=null;try{if(!!bread){crumbs=bread.textContent.match(/[\d\.\,]+/)[0].replace(/\./g,"");;return crumbs||false;}}
catch(e){}},br:function(){var
bread=document.querySelector("h1")||null,crumbs=null;try{if(!!bread){crumbs=bread.textContent.trim().split(" ")[0];return crumbs||false;}}
catch(e){}}};;(function(){try{if(!!window.flixJsCallbacks&&!!window.flixJsCallbacks.flixCartClick){var
ticks=5,a2cTest=null,query=null,skipTest=null,dist='18496',lang='in',a2c=['.cart'],skip=[],retailerSpecificTest=function(){window.flixJsCallbacks.flixCartClick('skip',dist,lang);return false;};if(!String.prototype.trim){String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,'');};}
(function domTest(){A2CCHECK:for(var i=0,l=a2c.length;i<l;i++){a2cTest=document.querySelector(a2c[i]);if(a2cTest instanceof HTMLElement){query=a2c[i];break A2CCHECK;}}
if(!a2cTest&&ticks){setTimeout(function(){ticks--;domTest();},5000);}
else if(!!query){window.flixJsCallbacks.flixCartClick(query,dist,lang);}
else if(!ticks&&skip.length){SKIPCHECK:for(var i=0,l=skip.length;i<l;i++){skipTest=document.querySelector(skip[i]);if(skipTest){retailerSpecificTest(skipTest);break SKIPCHECK;}};}
else{window.flixJsCallbacks.flixCartClick('alert',dist,lang);}}());}}catch(ignore){}}());