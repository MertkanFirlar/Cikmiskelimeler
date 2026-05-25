/* Çıkmış Kelimeler — paylaşılan davranışlar */
(function(){
'use strict';

/* ---- tema + animasyon ---- */
function updThemeBtn(){var b=document.getElementById('themeBtn');if(b)b.textContent=document.documentElement.getAttribute('data-theme')==='dark'?'☀️':'🌙';}
function updAnimBtn(){var b=document.getElementById('animBtn');if(!b)return;var off=document.body.classList.contains('no-anim');b.textContent=off?'⏸':'✨';b.classList.toggle('off',off);}
window.toggleTheme=function(){var dark=document.documentElement.getAttribute('data-theme')==='dark';if(dark){document.documentElement.removeAttribute('data-theme');localStorage.setItem('cktheme','light');}else{document.documentElement.setAttribute('data-theme','dark');localStorage.setItem('cktheme','dark');}updThemeBtn();};
window.toggleAnim=function(){var off=document.body.classList.toggle('no-anim');localStorage.setItem('ckanim',off?'off':'on');updAnimBtn();if(!off)startLava();};
updThemeBtn();updAnimBtn();

/* ---- lav lambasi (sivi dokunus) ---- */
var lavaOn=false;
function startLava(){
  if(lavaOn||document.body.classList.contains('no-anim'))return;
  var els=document.querySelectorAll('.lava .ball');if(!els.length)return;lavaOn=true;
  var balls=[].map.call(els,function(el){return{el:el,w:el.offsetWidth,bx:el.offsetLeft,by:el.offsetTop,ax:16+Math.random()*22,ay:55+Math.random()*55,sx:0.00022+Math.random()*0.0003,sy:0.0003+Math.random()*0.0003,ph:Math.random()*6.28,rx:0,ry:0,sc:0};});
  var mX=-9999,mY=-9999;
  addEventListener('mousemove',function(e){mX=e.clientX;mY=e.clientY;},{passive:true});
  addEventListener('mouseout',function(){mX=-9999;mY=-9999;});
  var R=320,F=120,SW=0.65;
  function frame(t){balls.forEach(function(b){var ax=Math.sin(t*b.sx+b.ph)*b.ax,ay=Math.cos(t*b.sy+b.ph)*b.ay,cx=b.bx+b.w/2+ax,cy=b.by+b.w/2+ay,tx=0,ty=0,sc=0,dx=cx-mX,dy=cy-mY,d=Math.hypot(dx,dy)||1;if(d<R){var k=1-d/R,p=k*k*F,nx=dx/d,ny=dy/d;tx=nx*p-ny*p*SW;ty=ny*p+nx*p*SW;sc=k*0.16;}b.rx+=(tx-b.rx)*0.06;b.ry+=(ty-b.ry)*0.06;b.sc+=(sc-b.sc)*0.07;b.el.style.transform='translate('+(ax+b.rx)+'px,'+(ay+b.ry)+'px) scale('+(1+b.sc)+')';});requestAnimationFrame(frame);}
  requestAnimationFrame(frame);
}
startLava();

/* ---- kelimeler: grid/liste, arama, yildiz ---- */
window.setView=function(v){var l=document.getElementById('list');if(!l)return;l.className=v;var g=document.getElementById('bg'),b=document.getElementById('bl');if(g)g.classList.toggle('on',v==='grid');if(b)b.classList.toggle('on',v==='list');localStorage.setItem('ckview',v);};
(function(){var saved=localStorage.getItem('ckview');if(saved&&document.getElementById('list'))window.setView(saved);})();
var q=document.getElementById('q');
if(q){q.addEventListener('input',function(){var v=q.value.toLowerCase().trim(),n=0,list=document.getElementById('list');
  list.querySelectorAll('.card').forEach(function(c){var ok=!v||(c.dataset.en||'').indexOf(v)>=0||(c.dataset.tr||'').indexOf(v)>=0;c.style.display=ok?'':'none';if(ok)n++;});
  var cnt=document.getElementById('cnt');if(cnt)cnt.textContent=n+' kelime'+(list.dataset.label?' · '+list.dataset.label:'');});}
document.addEventListener('click',function(e){var s=e.target.closest&&e.target.closest('.star');if(s){e.preventDefault();s.classList.toggle('on');s.textContent=s.classList.contains('on')?'★':'☆';}});

/* ---- NOTLAR (zengin editor + cizim) ---- */
var ed=document.getElementById('ed');
if(ed){
  var cv=document.getElementById('cv'),surf=document.getElementById('surf'),dr=document.getElementById('drawer');
  ed.innerHTML=localStorage.getItem('cknote_html')||'';
  function nsave(){localStorage.setItem('cknote_html',ed.innerHTML);var w=ed.innerText.trim();var wc=document.getElementById('wc');if(wc)wc.textContent=(w?w.split(/\s+/).length:0)+' kelime';}
  window.cmd=function(c,v){ed.focus();try{document.execCommand(c,false,v||null);}catch(e){}nsave();};
  window.addTodo=function(){ed.focus();document.execCommand('insertHTML',false,'<div class="todo"><input type="checkbox" contenteditable="false"><span>&nbsp;yapılacak</span></div><div><br></div>');nsave();};
  window.setPaper=function(v){ed.className='ed'+(v&&v!=='plain'?' '+v:'');localStorage.setItem('cknote_paper',v);};
  var pap=localStorage.getItem('cknote_paper')||'plain';window.setPaper(pap);var ps=document.getElementById('paper');if(ps)ps.value=pap;
  ed.addEventListener('input',nsave);nsave();
  var PAL=['#000000','#444444','#888888','#cccccc','#5b4be0','#3a1f8f','#0e7fd6','#00b8d4','#1aa251','#8bc34a','#f5b301','#e08a00','#e0364f','#d61f9b','#9c27b0','#795548','#2a2348','#ffffff'];
  var HL=['#fff59d','#ffe0b2','#ffccbc','#ffcdd2','#f8bbd0','#e1bee7','#d1c4e9','#c5cae9','#bbdefb','#b2ebf2','#b2dfdb','#c8e6c9'];
  function colorPicker(host,palette,quick,onPick){if(!host)return;host.classList.add('cp');host.innerHTML='';
    var q=document.createElement('div');q.className='quick';quick.forEach(function(c){var i=document.createElement('i');i.style.background=c;i.title=c;i.onclick=function(){onPick(c);};q.appendChild(i);});
    var more=document.createElement('button');more.type='button';more.className='more';more.textContent='▾';
    var pop=document.createElement('div');pop.className='pop';var grid=document.createElement('div');grid.className='grid';
    palette.forEach(function(c){var i=document.createElement('i');i.style.background=c;i.title=c;i.onclick=function(){onPick(c);host.classList.remove('open');};grid.appendChild(i);});
    var cust=document.createElement('div');cust.className='custom';var inp=document.createElement('input');inp.type='color';inp.value='#5b4be0';inp.oninput=function(){onPick(inp.value);};
    var lbl=document.createElement('span');lbl.textContent='Özel renk oluştur';cust.appendChild(inp);cust.appendChild(lbl);pop.appendChild(grid);pop.appendChild(cust);
    host.appendChild(q);host.appendChild(more);host.appendChild(pop);
    more.onclick=function(e){e.stopPropagation();document.querySelectorAll('.cp.open').forEach(function(x){if(x!==host)x.classList.remove('open');});host.classList.toggle('open');};}
  document.addEventListener('click',function(e){if(!(e.target.closest&&e.target.closest('.cp')))document.querySelectorAll('.cp.open').forEach(function(x){x.classList.remove('open');});});
  colorPicker(document.getElementById('swT'),PAL,['#2a2348','#5b4be0','#e0364f','#1aa251'],function(c){window.cmd('foreColor',c);});
  colorPicker(document.getElementById('swH'),HL,['#fff59d','#b9f6ca','#ffcdd2','#bbdefb'],function(c){window.cmd('hiliteColor',c);});
  // cizim
  var ctx=cv.getContext('2d'),drawing=false,dcolor='#5b4be0',dsize=5,erase=false,last=null;
  function fit(){var r=surf.getBoundingClientRect();if(!r.width)return;var old=cv.width?cv.toDataURL():null;cv.width=r.width;cv.height=r.height;if(old){var im=new Image();im.onload=function(){ctx.drawImage(im,0,0);};im.src=old;}else restore();}
  function pos(e){var r=cv.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top};}
  cv.addEventListener('pointerdown',function(e){drawing=true;last=pos(e);cv.setPointerCapture(e.pointerId);});
  cv.addEventListener('pointermove',function(e){if(!drawing)return;var p=pos(e);ctx.lineCap='round';ctx.lineJoin='round';ctx.lineWidth=erase?dsize*4:dsize;ctx.globalCompositeOperation=erase?'destination-out':'source-over';ctx.strokeStyle=dcolor;ctx.beginPath();ctx.moveTo(last.x,last.y);ctx.lineTo(p.x,p.y);ctx.stroke();last=p;});
  addEventListener('pointerup',function(){if(drawing){drawing=false;dsave();}});
  function dsave(){try{localStorage.setItem('ckdraw',cv.toDataURL());}catch(e){}}
  function restore(){var d=localStorage.getItem('ckdraw');if(d){var im=new Image();im.onload=function(){ctx.drawImage(im,0,0);};im.src=d;}}
  colorPicker(document.getElementById('swD'),PAL,['#5b4be0','#2a2348','#e0364f','#1aa251'],function(c){dcolor=c;erase=false;var e=document.getElementById('erB');if(e)e.classList.remove('on');});
  var brD=document.getElementById('brD');if(brD)[3,5,11].forEach(function(s,i){var e=document.createElement('i');e.style.width=e.style.height=(8+i*5)+'px';if(i===1)e.className='on';e.onclick=function(){dsize=s;erase=false;document.getElementById('erB').classList.remove('on');[].forEach.call(brD.children,function(x){x.classList.remove('on');});e.classList.add('on');};brD.appendChild(e);});
  window.toggleEraser=function(){erase=!erase;document.getElementById('erB').classList.toggle('on',erase);};
  // sekmeler
  var tab='w';
  window.setTab=function(t){tab=t;document.getElementById('tabW').classList.toggle('on',t==='w');document.getElementById('tabD').classList.toggle('on',t==='d');document.getElementById('toolsW').style.display=t==='w'?'flex':'none';document.getElementById('toolsD').style.display=t==='d'?'flex':'none';ed.style.display=t==='w'?'block':'none';cv.style.display=t==='d'?'block':'none';if(t==='d')requestAnimationFrame(fit);};
  // resize + max
  var rz=document.getElementById('rz'),rzon=false;
  if(rz){rz.addEventListener('pointerdown',function(e){rzon=true;e.preventDefault();});
    addEventListener('pointermove',function(e){if(!rzon)return;var w=Math.max(320,Math.min(innerWidth*0.96,innerWidth-e.clientX));dr.style.width=w+'px';if(tab==='d')fit();});
    addEventListener('pointerup',function(){rzon=false;});}
  window.toggleMax=function(){dr.classList.toggle('max');if(tab==='d')setTimeout(fit,60);};
  window.clearCur=function(){if(tab==='w'){if(confirm('Yazı silinsin mi?')){ed.innerHTML='';nsave();}}else{if(confirm('Çizim silinsin mi?')){ctx.clearRect(0,0,cv.width,cv.height);dsave();}}};
  window.dlPDF=function(){var J=window.jspdf;if(!J){alert('PDF hazırlanıyor…');return;}var doc=new J.jsPDF('p','mm','a4'),W=180,y=16;doc.setFontSize(16);doc.text('Notlarim - Cikmis Kelimeler',14,y);y=26;
    function addDraw(){var d=localStorage.getItem('ckdraw');if(d){if(y>150){doc.addPage();y=16;}try{doc.addImage(d,'PNG',14,y,W,W*0.6);}catch(e){}}doc.save('cikmis-kelimeler-notlarim.pdf');}
    if(ed.innerText.trim()&&window.html2canvas){html2canvas(ed,{backgroundColor:'#ffffff',scale:2,height:ed.scrollHeight,windowHeight:ed.scrollHeight}).then(function(c){var h=c.height*W/c.width;doc.addImage(c.toDataURL('image/png'),'PNG',14,y,W,Math.min(h,250));y+=Math.min(h,250)+8;addDraw();}).catch(addDraw);}else addDraw();};
  // drawer ac/kapa (cekmece varsa)
  var dwr=document.getElementById('drawer');
  window.openNotes=function(){if(dwr){dwr.classList.add('open');var s=document.getElementById('scrim');if(s)s.classList.add('open');if(tab==='d')setTimeout(fit,360);}};
  window.closeNotes=function(){if(dwr){dwr.classList.remove('open');var s=document.getElementById('scrim');if(s)s.classList.remove('open');}};
  // tam-sayfa not (notlarim) icin tuvali hemen olcekle
  if(!dwr)requestAnimationFrame(function(){fit();});
}
})();
