(function(){
  var dataEl=document.getElementById('site-data');
  var DATA=dataEl?JSON.parse(dataEl.textContent):{months:[]};
  var months=DATA.months||[];

  /* build plexus nodes: one per contribution, tagged by month (0 = newest) */
  var nodes=[], id=0, TOTAL=0;
  months.forEach(function(m){ TOTAL+=m.count; });
  var scale=TOTAL>120?120/TOTAL:1;
  months.forEach(function(m,mi){ var k=m.count>0?Math.max(1,Math.round(m.count*scale)):0; for(var j=0;j<k;j++) nodes.push({id:id++,month:mi}); });
  while(nodes.length<16){ nodes.push({id:id++,month:Math.floor(Math.random()*Math.max(1,months.length))}); }
  var N=nodes.length;

  /* theme toggle (persisted) */
  var theme=document.documentElement.getAttribute('data-theme')||'dark';
  var bw=document.getElementById('bw');
  if(bw) bw.addEventListener('click',function(e){ e.stopPropagation(); theme=(theme==='dark'?'light':'dark'); document.documentElement.setAttribute('data-theme',theme); try{localStorage.setItem('theme',theme);}catch(_){}; });

  /* contact unfold */
  var contact=document.getElementById('contact');
  if(contact){ var cbtn=document.getElementById('contact-btn'); if(cbtn) cbtn.addEventListener('click',function(e){ e.stopPropagation(); contact.classList.toggle('open'); }); }
  document.addEventListener('click',function(){ if(contact) contact.classList.remove('open'); });

  /* plexus */
  var canvas=document.getElementById('plexus'); if(!canvas) return;
  var ctx=canvas.getContext('2d');
  var DPR=Math.min(window.devicePixelRatio||1,2), W=0, Hh=0, MAXD=215, CURSOR_R=190;
  var mouse={x:-9999,y:-9999,on:false};
  var activeSet=new Set(), activeEl=null, single=false;
  function colors(){ return theme==='dark'?{node:'255,255,255',line:'255,255,255',glow:'#fff',fade:1}:{node:'10,10,9',line:'10,10,9',glow:'#0a0a09',fade:0.38}; }
  function resize(){ W=window.innerWidth; Hh=window.innerHeight; canvas.width=W*DPR; canvas.height=Hh*DPR; ctx.setTransform(DPR,0,0,DPR,0,0); if(nodes[0]&&nodes[0].x===undefined) seed(); }
  function seed(){ nodes.forEach(function(n){ n.bx=n.x=Math.random()*W; n.by=n.y=Math.random()*Hh; n.vx=0; n.vy=0; n.r=2.6+Math.random()*1.6; n.bdx=(Math.random()-0.5)*0.16; n.bdy=(Math.random()-0.5)*0.16; }); }
  window.addEventListener('mousemove',function(e){ mouse.x=e.clientX; mouse.y=e.clientY; mouse.on=true; });
  window.addEventListener('mouseout',function(){ mouse.on=false; });
  window.addEventListener('touchmove',function(e){ if(e.touches[0]){ mouse.x=e.touches[0].clientX; mouse.y=e.touches[0].clientY; mouse.on=true; } },{passive:true});
  function physics(){ nodes.forEach(function(n){ n.bx+=n.bdx; n.by+=n.bdy;
    if(n.bx<40||n.bx>W-40)n.bdx*=-1; if(n.by<40||n.by>Hh-40)n.bdy*=-1;
    var ax=(n.bx-n.x)*0.018, ay=(n.by-n.y)*0.018;
    if(mouse.on){ var dx=mouse.x-n.x,dy=mouse.y-n.y,d=Math.hypot(dx,dy); if(d<CURSOR_R&&d>0.1){ var p=(1-d/CURSOR_R)*0.9; ax+=dx/d*p; ay+=dy/d*p; } }
    n.vx=(n.vx+ax)*0.9; n.vy=(n.vy+ay)*0.9; n.x+=n.vx; n.y+=n.vy; }); }
  function draw(){ var c=colors(); ctx.clearRect(0,0,W,Hh); var dim=activeSet.size>0;
    for(var i=0;i<nodes.length;i++) for(var j=i+1;j<nodes.length;j++){ var a=nodes[i],b=nodes[j],dx=a.x-b.x,dy=a.y-b.y,d=Math.hypot(dx,dy);
      if(d<MAXD){ var al=(1-d/MAXD)*0.42*c.fade; if(dim) al*=(activeSet.has(a.id)||activeSet.has(b.id))?0.6:0.05;
        ctx.strokeStyle='rgba('+c.line+','+al.toFixed(3)+')'; ctx.lineWidth=0.7; ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke(); } }
    nodes.forEach(function(n){ var isA=activeSet.has(n.id); var alpha=(dim?(isA?1:0.12):0.85)*(isA?1:c.fade);
      ctx.beginPath(); ctx.shadowBlur=isA?18:0; if(isA) ctx.shadowColor=c.glow;
      ctx.fillStyle='rgba('+c.node+','+alpha.toFixed(3)+')'; ctx.arc(n.x,n.y,isA?n.r+2.5:n.r,0,Math.PI*2); ctx.fill();
      if(isA){ ctx.shadowBlur=0; ctx.beginPath(); ctx.strokeStyle='rgba('+c.node+',0.4)'; ctx.lineWidth=1; ctx.arc(n.x,n.y,n.r+8,0,Math.PI*2); ctx.stroke(); } });
    if(single&&activeEl){ var arr=Array.from(activeSet); if(arr.length){ var node=nodes[arr[0]]; if(node){ var rr=activeEl.getBoundingClientRect();
      ctx.strokeStyle='rgba('+c.line+',0.35)'; ctx.lineWidth=1; ctx.setLineDash([3,4]);
      ctx.beginPath(); ctx.moveTo(rr.left+rr.width/2,rr.top+rr.height/2); ctx.lineTo(node.x,node.y); ctx.stroke(); ctx.setLineDash([]); } } }
  }
  function loop(){ physics(); draw(); requestAnimationFrame(loop); }

  function setNode(nid,el){ activeSet=new Set([nid]); activeEl=el; single=true; }
  function clearH(){ activeSet=new Set(); activeEl=null; single=false; }

  /* rail (12 months) */
  var rail=document.getElementById('rail'), tip=document.getElementById('tip');
  if(rail){ months.forEach(function(m,mi){ var row=document.createElement('div'); row.className='mrow';
    var lbl=document.createElement('span'); lbl.className='mlbl'+(mi===0?' cur':''); lbl.textContent=m.label;
    var dot=document.createElement('span'); dot.className='dot'; var s=Math.min(32, 6+m.count*2.0); dot.style.width=s+'px'; dot.style.height=s+'px';
    row.appendChild(lbl); row.appendChild(dot);
    var fid=null; for(var qi=0;qi<nodes.length;qi++){ if(nodes[qi].month===mi){ fid=nodes[qi].id; break; } }
    (function(fid,dotEl){ row.addEventListener('mouseenter',function(e){ if(fid!==null) setNode(fid,dotEl); showTip(m.label+' '+m.year+' &middot; <b>'+m.count+'</b> contributions',e); });
      row.addEventListener('mousemove',moveTip);
      row.addEventListener('mouseleave',function(){ clearH(); hideTip(); }); })(fid,dot);
    rail.appendChild(row); }); }

  /* every [data-link] element points a filament to one blob */
  var linkEls=Array.prototype.slice.call(document.querySelectorAll('[data-link]'));
  linkEls.forEach(function(el,idx){ var nid=Math.min(N-1,Math.floor((idx+0.5)/linkEls.length*N));
    el.addEventListener('mouseenter',function(){ setNode(nid,el); });
    el.addEventListener('mouseleave',clearH); });

  function showTip(html,e){ if(!tip) return; tip.innerHTML=html; tip.classList.add('show'); moveTip(e); }
  function moveTip(e){ if(!tip) return; var x=e.clientX-tip.offsetWidth-16, y=e.clientY-8; if(x<8)x=e.clientX+16; tip.style.left=x+'px'; tip.style.top=y+'px'; }
  function hideTip(){ if(tip) tip.classList.remove('show'); }

  window.addEventListener('resize',resize); resize(); loop();
})();
