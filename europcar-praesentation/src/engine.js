/* Shared step engine for the simple views (People Management, Europcar).
   Each page defines window.VIEW = {steps:[{t,h,render(el), detail:{tag,name,html}}]} before loading this file. */
(function(){
var V=window.VIEW,step=0,bar=document.getElementById('bar'),board=document.getElementById('board');
var IC={full:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 6V2.5H6M10 2.5h3.5V6M13.5 10v3.5H10M6 13.5H2.5V10"/></svg>',
 exit:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2.5V6H2.5M13.5 6H10V2.5M10 13.5V10h3.5M2.5 10H6v3.5"/></svg>'};
var fsB=document.getElementById('fsb');
function updIcons(){var f=!!document.fullscreenElement;fsB.innerHTML=f?IC.exit:IC.full;fsB.title=f?'Vollbild beenden (F)':'Vollbild (F)'}
function fs(){var st=document.getElementById('stage');if(!document.fullscreenElement&&st.requestFullscreen)st.requestFullscreen();else if(document.exitFullscreen)document.exitFullscreen()}
fsB.onclick=fs;document.addEventListener('fullscreenchange',updIcons);updIcons();
var drawer=document.getElementById('drawer'),dh=document.getElementById('dh');
function setDrawer(o){drawer.classList.toggle('open',o);dh.setAttribute('aria-expanded',o);document.getElementById('dHint').textContent=o?'Ausblenden':'Details einblenden';
  if(o)setTimeout(function(){try{drawer.scrollIntoView({behavior:'smooth',block:'nearest'})}catch(e){}},40)}
dh.onclick=function(){setDrawer(!drawer.classList.contains('open'))};
function build(){bar.innerHTML='';V.steps.forEach(function(s,i){var b=document.createElement('button');b.innerHTML='<span class="no">'+(i+1)+'</span>'+s.t;if(i===step)b.className='on';b.onclick=function(){setStep(i)};bar.appendChild(b)})}
function setStep(i){step=Math.max(0,Math.min(V.steps.length-1,i));var s=V.steps[step];
  document.getElementById('capT').textContent='Schritt '+(step+1)+' · '+s.t;document.getElementById('capH').textContent=s.h;
  document.getElementById('capN').textContent=(step+1)+' / '+V.steps.length;
  board.innerHTML='';s.render(board);
  var d=s.detail||{};document.getElementById('dTag').textContent=d.tag||'Details';document.getElementById('dName').textContent=d.name||'';
  document.getElementById('detail').innerHTML=d.html||'';build()}
window.__goto=setStep;
document.getElementById('prev').onclick=function(){setStep(step-1)};document.getElementById('next').onclick=function(){setStep(step+1)};
document.addEventListener('keydown',function(e){if(e.key==='ArrowRight'||e.key===' '||e.key==='PageDown'){e.preventDefault();setStep(step+1)}
  else if(e.key==='ArrowLeft'||e.key==='PageUp'){e.preventDefault();setStep(step-1)}
  else if(e.key==='f'||e.key==='F')fs();else if(e.key==='Escape')setDrawer(false);else if(e.key==='i'||e.key==='I')setDrawer(!drawer.classList.contains('open'))});
setStep(0);
})();
