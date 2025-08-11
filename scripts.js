window.PROJECTS=[
  {
    id:"crypto-sim",
    titleKey:"project.cryptoSim.title",
    tags:["tag.unity","tag.llm","tag.simulation"],
    thumb:"assets/hero-slide2.png",
    href:"project-crypto-sim.html"
  }
];
let translations={};
let currentLang='ko';
function applyTranslations(){
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key=el.getAttribute('data-i18n');
    if(translations[key]) el.textContent=translations[key];
  });
  document.querySelectorAll('[data-i18n-label]').forEach(el=>{
    const key=el.getAttribute('data-i18n-label');
    if(translations[key]) el.setAttribute('aria-label',translations[key]);
  });
}
function setLang(lang){
  currentLang=lang;
  document.documentElement.setAttribute('lang',lang);
  localStorage.setItem('lang',lang);
  fetch(`i18n/${lang}.json`).then(r=>r.json()).then(json=>{
    translations=json;
    applyTranslations();
    const toggle=document.getElementById('lang-toggle');
    if(toggle) toggle.textContent=translations['lang.button'];
    const note=document.getElementById('lang-note');
    if(note) note.textContent=translations['lang.changed'];
  });
}
function detectLang(){
  const params=new URLSearchParams(window.location.search);
  let lang=params.get('lang')||localStorage.getItem('lang')||'ko';
  if(!['ko','en'].includes(lang)) lang='ko';
  setLang(lang);
}
function renderProjects(){
  const grid=document.getElementById('project-grid');
  if(!grid) return;
  window.PROJECTS.forEach(p=>{
    const card=document.createElement('a');
    card.href=p.href;
    card.className='project-card';
    card.innerHTML=`<img src="${p.thumb}" alt=""><div class="info"><h3 data-i18n="${p.titleKey}"></h3><p class="tags">${p.tags.map(t=>`<span data-i18n="${t}"></span>`).join(' ')}</p></div>`;
    grid.appendChild(card);
  });
  applyTranslations();
}
function setupNav(){
  const toggle=document.getElementById('nav-toggle');
  const links=document.getElementById('nav-links');
  if(toggle&&links){toggle.addEventListener('click',()=>links.classList.toggle('open'));}
}
function setupSlideshow(){
  const container=document.querySelector('.slideshow');
  if(!container) return;
  const imgs=container.querySelectorAll('img');
  const prev=container.querySelector('.prev');
  const next=container.querySelector('.next');
  let idx=0;let interval;
  function show(i){imgs.forEach((img,n)=>img.classList.toggle('active',n===i));}
  function step(d){idx=(idx+d+imgs.length)%imgs.length;show(idx);}
  function start(){if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;interval=setInterval(()=>step(1),6000);}
  function stop(){clearInterval(interval);}
  prev.addEventListener('click',()=>step(-1));
  next.addEventListener('click',()=>step(1));
  container.addEventListener('mouseenter',stop);
  container.addEventListener('mouseleave',start);
  show(0);start();
}
document.addEventListener('DOMContentLoaded',()=>{
  detectLang();
  renderProjects();
  setupNav();
  setupSlideshow();
  const toggle=document.getElementById('lang-toggle');
  if(toggle){toggle.addEventListener('click',()=>setLang(currentLang==='ko'?'en':'ko'));}
});
