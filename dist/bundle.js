!function(t){var e={};function r(o){if(e[o])return e[o].exports;var n=e[o]={i:o,l:!1,exports:{}};return t[o].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=t,r.c=e,r.d=function(t,e,o){r.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:o})},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=3)}([function(t,e,r){"use strict";e.c=class{constructor(t,e,r){this.x=t,this.y=e,this.g=0,this.h=0,this.f=0,this.distance=Number.MAX_SAFE_INTEGER,this.obstacle=!1,this.visited=!1,this.el=r,this.parent=null}heuristic(t){const e=Math.abs(this.x-t.x),r=Math.abs(this.y-t.y),o=start.x-t.x,n=start.y-t.y;return e+r+.001*Math.abs(e*n-o*r)}};e.b=20;e.a=1},function(t,e,r){"use strict";e.c=async function(){if(lastPath.length){document.getElementById("generatePathBtn").classList.add("disabled");const t=performance.now();for(let t=0,e=drawOrder.length;t<e;t++)grid[drawOrder[t].x][drawOrder[t].y].el.style.backgroundColor=n.visitedNode,grid[drawOrder[t].x][drawOrder[t].y].distance=Number.MAX_SAFE_INTEGER,await a(2);for(let t=lastPath.length-1;t>=0;t--)lastPath[t].el.style.backgroundColor=n.path,lastPath[t].el.style.border="none",await a(2);const e=performance.now();document.getElementById("generatePathBtn").classList.remove("disabled");let r=0;for(let t=0;t<h;t++)for(let e=0;e<w;e++)grid[t][e].parent=null,grid[t][e].el.style.backgroundColor!=n.visitedNode&&grid[t][e].el.style.backgroundColor!=n.path||r++;start.visited=!1,start.distance=Number.MAX_SAFE_INTEGER,goal.visited=!1,goal.distance=Number.MAX_SAFE_INTEGER,i.pathInfo(r,lastPath.length,((e-t)/1e3).toFixed(2))}},e.e=function(){for(let t=0;t<lastPath.length;t++)lastPath[t].el.style.backgroundColor==n.path&&(lastPath[t].el.style.backgroundColor=n.clearNode,lastPath[t].el.style.border=n.nodeBorder);for(let t=0;t<drawOrder.length;t++)grid[drawOrder[t].x][drawOrder[t].y].el.style.backgroundColor==n.visitedNode&&(grid[drawOrder[t].x][drawOrder[t].y].el.style.backgroundColor=n.clearNode)},e.f=function(){let t=[],e=0;for(let e=0;e<h;e++)for(let r=0;r<w;r++)grid[e][r].obstacle=!1,grid[e][r].el.style.backgroundColor=n.clearNode,grid[e][r].el.style.border=n.nodeBorder,t.push(grid[e][r]);for(;e<1e3;){let r=Math.floor(Math.random(t.length)*t.length);t[r].obstacle=!0,t[r].el.style.backgroundColor=n.obstacle,t[r].el.style.border="none",t.splice(r,1),e++}},e.d=function(t){for(let e=0,r=lastPath.length;e<r;e++)if(Object(o.c)(lastPath[e],t))return!0;return!1};var o=r(2);const n={visitedNode:"rgb(224, 242, 241)",path:"rgb(179, 229, 252)",obstacle:"rgb(128, 128, 128)",start:"rgb(147, 202, 59)",goal:"rgb(235, 73, 96)",clearNode:"rgb(255, 255, 255)",nodeBorder:"1px solid rgb(230, 230, 230)"};e.b=n;const i={start:()=>Materialize.toast("Please set the start spot!",1500,"red lighten-1"),goal:()=>Materialize.toast("Please set the finish spot!",1500,"red lighten-1"),both:()=>Materialize.toast("Please set the initial spots!",1500,"red lighten-1"),notFound:()=>Materialize.toast("Path not found!",1500,"red lighten-1"),pathInfo:(t,e,r)=>Materialize.toast(`Visited nodes: ${t}\nPath length: ${e}\nTime: ${r}s`,1e5,"green lighten-2")};function a(t){return new Promise(e=>setTimeout(e,t))}e.a=i},function(t,e,r){"use strict";e.b=function(){!function(){const t=document.getElementById("menu").clientHeight,e=document.getElementById("grid");let r=document.body.clientHeight-t;r-=r%o.b,r+=o.b,e.style.height=r+"px",h=r/o.b,w=Math.floor(document.body.clientWidth/o.b)}();const t=document.getElementById("grid");grid=new Array(h);for(let e=0;e<h;e++){grid[e]=new Array(w);for(let r=0;r<w;r++){const n=document.createElement("div");n.className="cell",grid[e][r]=new o.c(e,r,n),grid[e][r].el.style.width=o.b+"px",grid[e][r].el.style.height=o.b+"px",t.appendChild(grid[e][r].el)}}},e.a=function(){for(let t=0;t<h;t++)for(let e=0;e<w;e++)grid[t][e].obstacle=!1,grid[t][e].visited=!1,grid[t][e].parent=null,grid[t][e].distance=Number.MAX_SAFE_INTEGER,grid[t][e].el.style.backgroundColor=n.b.clearNode,grid[t][e].el.style.border=n.b.nodeBorder;goal=start=void 0;const t=$(".toast").first()[0];t&&t.M_Toast.remove()},e.c=function(t,e){return t.x==e.x&&t.y==e.y};var o=r(0),n=r(1)},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(t){r(0);var e=r(2),o=r(5),n=r(6),i=r(1),a=r(8),s=r(9);r.n(s);function l(){const t=$(".toast").first()[0];t&&t.M_Toast.remove(),1==document.getElementById("aStar").checked?(Object(o.a)(start,goal),console.log("A* selected.")):1==document.getElementById("Dijkstra").checked&&(Object(n.a)(start,goal),console.log("Dijkstra selected."))}t.grid=[[]],t.lastPath=[],t.drawOrder=[],t.h=0,t.w=0,t.lastStart=void 0,t.lastStop=void 0,t.start=void 0,t.goal=void 0,window.onload=Object(e.b)(),document.getElementById("grid").addEventListener("click",function(t){if(1==document.getElementById("start").checked){void 0!==lastStart&&(0==lastStart.obstacle&&lastStart.style.backgroundColor==i.b.start&&(lastStart.style.backgroundColor=i.b.clearNode,lastStart.style.border=i.b.nodeBorder),Object(i.e)()),lastStart=t.target,lastStart.style.backgroundColor=i.b.start,lastStart.style.border="none",lastStart.obstacle=!1;for(let t=0;t<h;t++)for(let e=0;e<w;e++)grid[t][e].el==lastStart&&(start=grid[t][e],start.obstacle=!1)}else if(1==document.getElementById("stop").checked){void 0!==lastStop&&(0==lastStop.obstacle&&lastStop.style.backgroundColor==i.b.goal&&(lastStop.style.backgroundColor=i.b.clearNode,lastStop.style.border=i.b.nodeBorder),Object(i.e)()),lastStop=t.target,lastStop.style.backgroundColor=i.b.goal,lastStop.style.border="none",lastStop.obstacle=!1;for(let t=0;t<h;t++)for(let e=0;e<w;e++)grid[t][e].el==lastStop&&(goal=grid[t][e],goal.obstacle=!1)}else if(1==document.getElementById("obst").checked){let e=t.target;e.style.backgroundColor=i.b.obstacle,e.style.border="none";for(let t=0;t<h;t++)for(let r=0;r<w;r++)grid[t][r].el==e&&0==grid[t][r].obstacle?(grid[t][r].obstacle=!0,grid[t][r]==goal?(goal=void 0,Object(i.e)()):grid[t][r]==start&&(start=void 0,Object(i.e)()),Object(i.d)(grid[t][r])&&(Object(i.e)(),l())):grid[t][r].el==e&&1==grid[t][r].obstacle&&(goal=void 0,grid[t][r].obstacle=!1,grid[t][r].el.style.backgroundColor=i.b.clearNode,grid[t][r].el.style.border=i.b.nodeBorder)}}),document.getElementById("generatePathBtn").addEventListener("click",l),document.getElementById("addObstacles").addEventListener("click",i.f),document.getElementById("clearGrid").addEventListener("click",e.a),document.getElementById("saveGrid").addEventListener("click",a.b),document.getElementById("myFile").addEventListener("change",a.a,!1),document.getElementById("getFile").onclick=function(){document.getElementById("myFile").click()},window.addEventListener("keyup",t=>{81!=t.keyCode&&113!=t.keyCode||(1==document.getElementById("start").checked?document.getElementById("stop").checked=!0:document.getElementById("start").checked=!0)})}.call(e,r(4))},function(t,e){var r;r=function(){return this}();try{r=r||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(r=window)}t.exports=r},function(t,e,r){"use strict";e.a=function(t,e){if(void 0==t&&void 0==e)i.a.both();else if(void 0==t)i.a.start();else{if(void 0!=e){lastPath.length>0&&(Object(i.e)(),lastPath=[],drawOrder=[]);let o=[],l=[];for(t.g=0,t.h=t.heuristic(e),t.f=t.g+t.h,l.push(t);l.length>0;){let c=0;for(let t=0,e=l.length;t<e;t++)l[t].f<l[c].f&&(c=t);let d=l[c];if(Object(n.c)(d,e)){let e=d.parent;for(;e.x!=t.x||e.y!=t.y;)e.el=grid[e.x][e.y].el,lastPath.push(e),e=e.parent;return void Object(i.c)()}l.splice(c,1),o.push(d),Object(n.c)(d,t)||(d.visited=!1,drawOrder.push(d));let u=a(d);for(let i=0;i<u.length;i++)if(-1===s(o,u[i])){var r=s(l,u[i]);-1===r?(u[i].f=u[i].g+u[i].heuristic(e),l.push(u[i]),u[i].visited=!0,Object(n.c)(u[i],t)||Object(n.c)(u[i],e)||drawOrder.push(u[i])):u[i].g<l[r].g&&(u[i].f=u[i].g+u[i].heuristic(e),l[r]=u[i])}}return i.a.notFound()}i.a.goal()}};var o=r(0),n=r(2),i=r(1);function a(t){let e=[],r=t.x,n=t.y;if(n>0&&!grid[r][n-1].obstacle){let i=new o.c(r,n-1,t.el);i.g=t.g+o.a,i.parent=t,e.push(i)}if(n<w-1&&!grid[r][n+1].obstacle){let i=new o.c(r,n+1,t.el);i.g=t.g+o.a,i.parent=t,e.push(i)}if(r>0&&!grid[r-1][n].obstacle){let i=new o.c(r-1,n,t.el);i.g=t.g+o.a,i.parent=t,e.push(i)}if(r<h-1&&!grid[r+1][n].obstacle){let i=new o.c(r+1,n,t.el);i.g=t.g+o.a,i.parent=t,e.push(i)}return e}function s(t,e){for(let r=0;r<t.length;r++)if(e.x==t[r].x&&e.y==t[r].y)return r;return-1}},function(t,e,r){"use strict";e.a=function(t,e){if(void 0==t&&void 0==e)o.a.both();else if(void 0==t)o.a.start();else{if(void 0!=e){let r,i;lastPath.length>0&&(Object(o.e)(),lastPath=[],drawOrder=[]),e.visited=!1,e.distance=Number.MAX_SAFE_INTEGER,t.distance=Number.MAX_SAFE_INTEGER,t.visited=!1;t.distance=0;let l=new a.a({comparator:(t,e)=>t.distance-e.distance});for(l.queue(t);l.length>0;){if(r=l.dequeue(),i=new n.c(0,0,r.el),e.distance!=Number.MAX_SAFE_INTEGER){let t=grid[e.x][e.y].parent;for(;null!=t.parent;)t.el=grid[t.x][t.y].el,lastPath.push(t),t=t.parent;for(let t=0,e=drawOrder.length;t<e;t++)drawOrder[t].visited=!1,grid[drawOrder[t].x][drawOrder[t].y].visited=!1;return void Object(o.c)()}r.x-1>=0&&!(i=grid[r.x-1][r.y]).visited&&!i.obstacle&&i.distance>r.distance+n.a&&(i.distance=r.distance+n.a,i.parent=r,Object(s.c)(i,t)||Object(s.c)(i,e)||drawOrder.push(i),l.queue(i)),r.y>0&&!(i=grid[r.x][r.y-1]).visited&&!i.obstacle&&i.distance>r.distance+n.a&&(i.distance=r.distance+n.a,i.parent=r,Object(s.c)(i,t)||Object(s.c)(i,e)||drawOrder.push(i),l.queue(i)),r.y+1<w&&!(i=grid[r.x][r.y+1]).visited&&!i.obstacle&&i.distance>r.distance+n.a&&(i.distance=r.distance+n.a,i.parent=r,Object(s.c)(i,t)||Object(s.c)(i,e)||drawOrder.push(i),l.queue(i)),r.x+1<h&&!(i=grid[r.x+1][r.y]).visited&&!i.obstacle&&i.distance>r.distance+n.a&&(i.distance=r.distance+n.a,i.parent=r,Object(s.c)(i,t)||Object(s.c)(i,e)||drawOrder.push(i),l.queue(i)),r.visited=!0}return o.a.notFound()}o.a.goal()}};var o=r(1),n=r(0),i=r(7),a=r.n(i),s=r(2)},function(t,e,r){var o,n;n=function(){return function t(e,r,n){function i(s,l){if(!r[s]){if(!e[s]){if(!l&&("function"==typeof o&&o))return o(s,!0);if(a)return a(s,!0);var c=new Error("Cannot find module '"+s+"'");throw c.code="MODULE_NOT_FOUND",c}var d=r[s]={exports:{}};e[s][0].call(d.exports,function(t){var r=e[s][1][t];return i(r||t)},d,d.exports,t,e,r,n)}return r[s].exports}for(var a="function"==typeof o&&o,s=0;s<n.length;s++)i(n[s]);return i}({1:[function(t,e,r){var o,n,i,a,s,l={}.hasOwnProperty;o=t("./PriorityQueue/AbstractPriorityQueue"),n=t("./PriorityQueue/ArrayStrategy"),a=t("./PriorityQueue/BinaryHeapStrategy"),i=t("./PriorityQueue/BHeapStrategy"),(s=function(t){function e(t){t||(t={}),t.strategy||(t.strategy=a),t.comparator||(t.comparator=function(t,e){return(t||0)-(e||0)}),e.__super__.constructor.call(this,t)}return function(t,e){for(var r in e)l.call(e,r)&&(t[r]=e[r]);function o(){this.constructor=t}o.prototype=e.prototype,t.prototype=new o,t.__super__=e.prototype}(e,o),e}()).ArrayStrategy=n,s.BinaryHeapStrategy=a,s.BHeapStrategy=i,e.exports=s},{"./PriorityQueue/AbstractPriorityQueue":2,"./PriorityQueue/ArrayStrategy":3,"./PriorityQueue/BHeapStrategy":4,"./PriorityQueue/BinaryHeapStrategy":5}],2:[function(t,e,r){e.exports=function(){function t(t){var e;if(null==(null!=t?t.strategy:void 0))throw"Must pass options.strategy, a strategy";if(null==(null!=t?t.comparator:void 0))throw"Must pass options.comparator, a comparator";this.priv=new t.strategy(t),this.length=(null!=t&&null!=(e=t.initialValues)?e.length:void 0)||0}return t.prototype.queue=function(t){this.length++,this.priv.queue(t)},t.prototype.dequeue=function(t){if(!this.length)throw"Empty queue";return this.length--,this.priv.dequeue()},t.prototype.peek=function(t){if(!this.length)throw"Empty queue";return this.priv.peek()},t.prototype.clear=function(){return this.length=0,this.priv.clear()},t}()},{}],3:[function(t,e,r){var o;o=function(t,e,r){var o,n,i;for(n=0,o=t.length;n<o;)r(t[i=n+o>>>1],e)>=0?n=i+1:o=i;return n},e.exports=function(){function t(t){var e;this.options=t,this.comparator=this.options.comparator,this.data=(null!=(e=this.options.initialValues)?e.slice(0):void 0)||[],this.data.sort(this.comparator).reverse()}return t.prototype.queue=function(t){var e;e=o(this.data,t,this.comparator),this.data.splice(e,0,t)},t.prototype.dequeue=function(){return this.data.pop()},t.prototype.peek=function(){return this.data[this.data.length-1]},t.prototype.clear=function(){this.data.length=0},t}()},{}],4:[function(t,e,r){e.exports=function(){function t(t){var e,r,o,n,i,a,s,l;for(this.comparator=(null!=t?t.comparator:void 0)||function(t,e){return t-e},this.pageSize=(null!=t?t.pageSize:void 0)||512,this.length=0,s=0;1<<s<this.pageSize;)s+=1;if(1<<s!==this.pageSize)throw"pageSize must be a power of two";for(this._shift=s,this._emptyMemoryPageTemplate=e=[],r=0,i=this.pageSize;0<=i?r<i:r>i;0<=i?++r:--r)e.push(null);if(this._memory=[],this._mask=this.pageSize-1,t.initialValues)for(o=0,n=(a=t.initialValues).length;o<n;o++)l=a[o],this.queue(l)}return t.prototype.queue=function(t){this.length+=1,this._write(this.length,t),this._bubbleUp(this.length,t)},t.prototype.dequeue=function(){var t,e;return t=this._read(1),e=this._read(this.length),this.length-=1,this.length>0&&(this._write(1,e),this._bubbleDown(1,e)),t},t.prototype.peek=function(){return this._read(1)},t.prototype.clear=function(){this.length=0,this._memory.length=0},t.prototype._write=function(t,e){var r;for(r=t>>this._shift;r>=this._memory.length;)this._memory.push(this._emptyMemoryPageTemplate.slice(0));return this._memory[r][t&this._mask]=e},t.prototype._read=function(t){return this._memory[t>>this._shift][t&this._mask]},t.prototype._bubbleUp=function(t,e){var r,o,n,i;for(r=this.comparator;t>1&&(o=t&this._mask,t<this.pageSize||o>3?n=t&~this._mask|o>>1:o<2?(n=t-this.pageSize>>this._shift,n+=n&~(this._mask>>1),n|=this.pageSize>>1):n=t-2,!(r(i=this._read(n),e)<0));)this._write(n,e),this._write(t,i),t=n},t.prototype._bubbleDown=function(t,e){var r,o,n,i,a;for(a=this.comparator;t<this.length;)if(t>this._mask&&!(t&this._mask-1)?r=o=t+2:t&this.pageSize>>1?(r=(t&~this._mask)>>1,o=(r=(r|=t&this._mask>>1)+1<<this._shift)+1):o=(r=t+(t&this._mask))+1,r!==o&&o<=this.length)if(n=this._read(r),i=this._read(o),a(n,e)<0&&a(n,i)<=0)this._write(r,e),this._write(t,n),t=r;else{if(!(a(i,e)<0))break;this._write(o,e),this._write(t,i),t=o}else{if(!(r<=this.length))break;if(!(a(n=this._read(r),e)<0))break;this._write(r,e),this._write(t,n),t=r}},t}()},{}],5:[function(t,e,r){e.exports=function(){function t(t){var e;this.comparator=(null!=t?t.comparator:void 0)||function(t,e){return t-e},this.length=0,this.data=(null!=(e=t.initialValues)?e.slice(0):void 0)||[],this._heapify()}return t.prototype._heapify=function(){var t,e,r;if(this.data.length>0)for(t=e=1,r=this.data.length;1<=r?e<r:e>r;t=1<=r?++e:--e)this._bubbleUp(t)},t.prototype.queue=function(t){this.data.push(t),this._bubbleUp(this.data.length-1)},t.prototype.dequeue=function(){var t,e;return e=this.data[0],t=this.data.pop(),this.data.length>0&&(this.data[0]=t,this._bubbleDown(0)),e},t.prototype.peek=function(){return this.data[0]},t.prototype.clear=function(){this.length=0,this.data.length=0},t.prototype._bubbleUp=function(t){for(var e,r;t>0&&(e=t-1>>>1,this.comparator(this.data[t],this.data[e])<0);)r=this.data[e],this.data[e]=this.data[t],this.data[t]=r,t=e},t.prototype._bubbleDown=function(t){var e,r,o,n,i;for(e=this.data.length-1;n=(r=1+(t<<1))+1,o=t,r<=e&&this.comparator(this.data[r],this.data[o])<0&&(o=r),n<=e&&this.comparator(this.data[n],this.data[o])<0&&(o=n),o!==t;)i=this.data[o],this.data[o]=this.data[t],this.data[t]=i,t=o},t}()},{}]},{},[1])(1)},t.exports=n()},function(t,e,r){"use strict";e.a=function(t){const e=t.target.files[0];if(!e)return;if(e.type.includes("image")){const t=new Image,r=window.URL||window.webkitURL,o=r.createObjectURL(e);t.src=o,t.onload=(()=>(function(t){const e=document.createElement("canvas");e.width=t.width,e.height=t.height,e.display="none";const r=e.getContext("2d");r.drawImage(t,0,0),t.style.display="none";const o=r.getImageData(0,0,e.width,e.height),a=o.data,s=o.height,l=o.width;let c=[],d=[],u=0;for(let t=0;t<a.length;t+=4)c.push({r:a[t],g:a[t+1],b:a[t+2],a:a[t+3]}),++u==l&&(d.push(c),c=[],u=0);let h="";for(let t=0;t<s-n.b+1;t+=n.b){for(let e=0;e<l-n.b+1;e+=n.b){let r=0;for(let o=t;o<t+n.b;o++)for(let t=e;t<e+n.b;t++)d[o][t].r/255<=.3&&d[o][t].g/255<=.3&&d[o][t].b/255<=.3&&r++;r>=n.b**2/2?h+="1":h+="0"}h+="\n"}i(h)})(t))}else{const t=new FileReader;t.onload=(t=>{const e=t.target.result;i(e)}),t.onerror=(t=>{alert(t.target.error.name)}),t.readAsText(e)}},e.b=function(){let t="";for(let e=0;e<h;e++){for(let r=0;r<w;r++)1==grid[e][r].obstacle?t+="1":t+="0";t+="\r\n"}const e=new Blob([t],{type:"text/plain"}),r=window.URL.createObjectURL(e),o=document.createElement("a");o.download="savedGrid",o.href=r,o.onclick=a,o.style.display="none",document.body.appendChild(o),o.click()};var o=r(1),n=r(0);function i(t){Object(o.e)();const e=t.split("\n");for(let t=0;t<e.length;t++){const r=e[t].split("");for(let e=0;e<r.length;e++)"1"==r[e]&&(grid[t][e].obstacle=!0,grid[t][e].el.style.backgroundColor="#808080",grid[t][e].el.style.border="0")}}function a(t){document.body.removeChild(t.target)}},function(t,e,r){var o=r(10);"string"==typeof o&&(o=[[t.i,o,""]]);var n={hmr:!0,transform:void 0};r(12)(o,n);o.locals&&(t.exports=o.locals)},function(t,e,r){(t.exports=r(11)(!1)).push([t.i,"body,html{height:100%}#grid,body,html{margin:0;padding:0}#grid{position:absolute}.cell{margin:0;padding:0;float:left;width:20px;height:20px;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;border:1px solid #e6e6e6;background-color:#fff}#menu{font-family:Roboto;font-weight:700;position:absolute;bottom:0;background-color:#27363b;width:100%;display:flex;align-items:center;padding:0}#obstacles{width:10%}#obstacles,#setObstaclesBtn{float:right}#menu ul li{display:inline-block;margin-right:20px}.delimiter{width:2px;background-color:#9a9698;height:35px;margin-right:20px;opacity:.5}#toast-container{top:3%!important;right:2%!important;bottom:auto!important;left:auto!important;white-space:pre;-webkit-transition:opacity .6s ease-in-out;-moz-transition:opacity .6s ease-in-out;-o-transition:opacity .6s ease-in-out;transition:opacity .6s ease-in-out}#toast-container:hover{opacity:.5}.fixed-action-btn{bottom:-8px!important}",""])},function(t,e){t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var r=function(t,e){var r=t[1]||"",o=t[3];if(!o)return r;if(e&&"function"==typeof btoa){var n=(a=o,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"),i=o.sources.map(function(t){return"/*# sourceURL="+o.sourceRoot+t+" */"});return[r].concat(i).concat([n]).join("\n")}var a;return[r].join("\n")}(e,t);return e[2]?"@media "+e[2]+"{"+r+"}":r}).join("")},e.i=function(t,r){"string"==typeof t&&(t=[[null,t,""]]);for(var o={},n=0;n<this.length;n++){var i=this[n][0];"number"==typeof i&&(o[i]=!0)}for(n=0;n<t.length;n++){var a=t[n];"number"==typeof a[0]&&o[a[0]]||(r&&!a[2]?a[2]=r:r&&(a[2]="("+a[2]+") and ("+r+")"),e.push(a))}},e}},function(t,e,r){var o,n,i,a={},s=(o=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===n&&(n=o.apply(this,arguments)),n}),l=(i={},function(t){if(void 0===i[t]){var e=function(t){return document.querySelector(t)}.call(this,t);if(e instanceof window.HTMLIFrameElement)try{e=e.contentDocument.head}catch(t){e=null}i[t]=e}return i[t]}),c=null,d=0,u=[],h=r(13);function p(t,e){for(var r=0;r<t.length;r++){var o=t[r],n=a[o.id];if(n){n.refs++;for(var i=0;i<n.parts.length;i++)n.parts[i](o.parts[i]);for(;i<o.parts.length;i++)n.parts.push(v(o.parts[i],e))}else{var s=[];for(i=0;i<o.parts.length;i++)s.push(v(o.parts[i],e));a[o.id]={id:o.id,refs:1,parts:s}}}}function f(t,e){for(var r=[],o={},n=0;n<t.length;n++){var i=t[n],a=e.base?i[0]+e.base:i[0],s={css:i[1],media:i[2],sourceMap:i[3]};o[a]?o[a].parts.push(s):r.push(o[a]={id:a,parts:[s]})}return r}function g(t,e){var r=l(t.insertInto);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var o=u[u.length-1];if("top"===t.insertAt)o?o.nextSibling?r.insertBefore(e,o.nextSibling):r.appendChild(e):r.insertBefore(e,r.firstChild),u.push(e);else if("bottom"===t.insertAt)r.appendChild(e);else{if("object"!=typeof t.insertAt||!t.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var n=l(t.insertInto+" "+t.insertAt.before);r.insertBefore(e,n)}}function b(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var e=u.indexOf(t);e>=0&&u.splice(e,1)}function y(t){var e=document.createElement("style");return t.attrs.type="text/css",m(e,t.attrs),g(t,e),e}function m(t,e){Object.keys(e).forEach(function(r){t.setAttribute(r,e[r])})}function v(t,e){var r,o,n,i,a,s;if(e.transform&&t.css){if(!(i=e.transform(t.css)))return function(){};t.css=i}if(e.singleton){var l=d++;r=c||(c=y(e)),o=x.bind(null,r,l,!1),n=x.bind(null,r,l,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(a=e,s=document.createElement("link"),a.attrs.type="text/css",a.attrs.rel="stylesheet",m(s,a.attrs),g(a,s),o=function(t,e,r){var o=r.css,n=r.sourceMap,i=void 0===e.convertToAbsoluteUrls&&n;(e.convertToAbsoluteUrls||i)&&(o=h(o));n&&(o+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(n))))+" */");var a=new Blob([o],{type:"text/css"}),s=t.href;t.href=URL.createObjectURL(a),s&&URL.revokeObjectURL(s)}.bind(null,r=s,e),n=function(){b(r),r.href&&URL.revokeObjectURL(r.href)}):(r=y(e),o=function(t,e){var r=e.css,o=e.media;o&&t.setAttribute("media",o);if(t.styleSheet)t.styleSheet.cssText=r;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(r))}}.bind(null,r),n=function(){b(r)});return o(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;o(t=e)}else n()}}t.exports=function(t,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(e=e||{}).attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||"boolean"==typeof e.singleton||(e.singleton=s()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var r=f(t,e);return p(r,e),function(t){for(var o=[],n=0;n<r.length;n++){var i=r[n];(s=a[i.id]).refs--,o.push(s)}t&&p(f(t,e),e);for(n=0;n<o.length;n++){var s;if(0===(s=o[n]).refs){for(var l=0;l<s.parts.length;l++)s.parts[l]();delete a[s.id]}}}};var w,_=(w=[],function(t,e){return w[t]=e,w.filter(Boolean).join("\n")});function x(t,e,r,o){var n=r?"":o.css;if(t.styleSheet)t.styleSheet.cssText=_(e,n);else{var i=document.createTextNode(n),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(i,a[e]):t.appendChild(i)}}},function(t,e){t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var r=e.protocol+"//"+e.host,o=r+e.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(t,e){var n,i=e.trim().replace(/^"(.*)"$/,function(t,e){return e}).replace(/^'(.*)'$/,function(t,e){return e});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(i)?t:(n=0===i.indexOf("//")?i:0===i.indexOf("/")?r+i:o+i.replace(/^\.\//,""),"url("+JSON.stringify(n)+")")})}}]);