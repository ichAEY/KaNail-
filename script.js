const works=Array.from({length:13},(_,i)=>`${i+1}.png`);
const body=document.body;
const viewport=document.getElementById('worksViewport');
const rail=document.getElementById('worksRail');
const galleryModal=document.getElementById('galleryModal');
const galleryGrid=document.getElementById('galleryGrid');
const openGallery=document.getElementById('openGallery');
const galleryClose=document.getElementById('galleryClose');
const workLightbox=document.getElementById('workLightbox');
const lightboxImage=document.getElementById('lightboxImage');
const lightboxCount=document.getElementById('lightboxCount');
const lightboxClose=document.getElementById('lightboxClose');
const lightboxPrev=document.getElementById('lightboxPrev');
const lightboxNext=document.getElementById('lightboxNext');
const mobileBooking=document.getElementById('mobileBooking');
let selectedWork=0;
let resumeAt=0;
let pointer={active:false,id:-1,startX:0,startY:0,moved:false};

function cardMarkup(index,set){
  const n=String(index+1).padStart(2,'0');
  return `<figure class="workCard"><button class="imageWrap" type="button" data-work="${index}" ${set>0?'tabindex="-1" aria-hidden="true"':''} aria-label="Увеличить работу Карины ${index+1}"><img src="${works[index]}" alt="Работа Карины ${index+1}" ${set>0||index>2?'loading="lazy"':''} draggable="false"></button><figcaption><span>Ka Nail / ${n}</span><span>Маникюр</span></figcaption></figure>`;
}

function buildWorks(){
  rail.innerHTML=[0,1,2].map(set=>`<div class="worksSet" ${set>0?'aria-hidden="true"':''}>${works.map((_,i)=>cardMarkup(i,set)).join('')}</div>`).join('');
  galleryGrid.innerHTML=works.map((src,i)=>`<button class="galleryTile" type="button" data-gallery-work="${i}" aria-label="Увеличить работу Карины ${i+1}"><img src="${src}" alt="Работа Карины ${i+1}" ${i>2?'loading="lazy"':''}><span>${String(i+1).padStart(2,'0')}</span></button>`).join('');
}

function lockBody(){body.dataset.previousOverflow=body.style.overflow;body.style.overflow='hidden'}
function unlockBody(){if(galleryModal.classList.contains('open')||workLightbox.classList.contains('open'))return;body.style.overflow=body.dataset.previousOverflow||''}
function openGalleryModal(){galleryModal.classList.add('open');galleryModal.setAttribute('aria-hidden','false');lockBody()}
function closeGalleryModal(){galleryModal.classList.remove('open');galleryModal.setAttribute('aria-hidden','true');unlockBody()}
function showWork(index){selectedWork=(index+works.length)%works.length;lightboxImage.src=works[selectedWork];lightboxImage.alt=`Работа Карины ${selectedWork+1} в увеличенном виде`;lightboxCount.textContent=`${String(selectedWork+1).padStart(2,'0')} / ${String(works.length).padStart(2,'0')}`;workLightbox.classList.add('open');workLightbox.setAttribute('aria-hidden','false');lockBody()}
function closeWork(){workLightbox.classList.remove('open');workLightbox.setAttribute('aria-hidden','true');unlockBody()}

buildWorks();
requestAnimationFrame(()=>body.classList.add('is-ready'));

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('is-visible')}),{threshold:.14});
document.querySelectorAll('[data-reveal]').forEach(node=>observer.observe(node));

const onScroll=()=>document.documentElement.style.setProperty('--scroll',String(window.scrollY));
onScroll();window.addEventListener('scroll',onScroll,{passive:true});

let previousTime=performance.now();
function animateWorks(time){
  if(viewport&&rail&&window.innerWidth>0){
    const firstSet=rail.querySelector('.worksSet');
    const setWidth=firstSet?firstSet.getBoundingClientRect().width:0;
    if(setWidth>0&&viewport.scrollLeft>=setWidth)viewport.scrollLeft-=setWidth;
    if(!pointer.active&&time>=resumeAt){viewport.scrollLeft+=Math.min(time-previousTime,50)*.032}
  }
  previousTime=time;requestAnimationFrame(animateWorks)
}
requestAnimationFrame(animateWorks);

viewport.addEventListener('pointerdown',event=>{if(event.button!==0)return;pointer={active:true,id:event.pointerId,startX:event.clientX,startY:event.clientY,moved:false};resumeAt=Infinity});
viewport.addEventListener('pointermove',event=>{if(!pointer.active||pointer.id!==event.pointerId)return;if(Math.hypot(event.clientX-pointer.startX,event.clientY-pointer.startY)>8)pointer.moved=true});
function endPointer(event){if(!pointer.active||pointer.id!==event.pointerId)return;pointer.active=false;resumeAt=performance.now()+1400;setTimeout(()=>pointer.moved=false,0)}
viewport.addEventListener('pointerup',endPointer);viewport.addEventListener('pointercancel',endPointer);viewport.addEventListener('pointerleave',event=>{if(pointer.active)endPointer(event)});
viewport.addEventListener('click',event=>{const button=event.target.closest('[data-work]');if(button&&!pointer.moved)showWork(Number(button.dataset.work))});

openGallery.addEventListener('click',openGalleryModal);galleryClose.addEventListener('click',closeGalleryModal);galleryModal.addEventListener('click',event=>{if(event.target===galleryModal)closeGalleryModal()});
galleryGrid.addEventListener('click',event=>{const tile=event.target.closest('[data-gallery-work]');if(tile)showWork(Number(tile.dataset.galleryWork))});
lightboxClose.addEventListener('click',closeWork);lightboxPrev.addEventListener('click',()=>showWork(selectedWork-1));lightboxNext.addEventListener('click',()=>showWork(selectedWork+1));workLightbox.addEventListener('click',event=>{if(event.target===workLightbox)closeWork()});

document.addEventListener('keydown',event=>{if(event.key==='Escape'){if(workLightbox.classList.contains('open'))closeWork();else if(galleryModal.classList.contains('open'))closeGalleryModal()}if(workLightbox.classList.contains('open')&&event.key==='ArrowLeft')showWork(selectedWork-1);if(workLightbox.classList.contains('open')&&event.key==='ArrowRight')showWork(selectedWork+1)});

document.querySelectorAll('[data-tab]').forEach(tab=>tab.addEventListener('click',()=>{const id=tab.dataset.tab;document.querySelectorAll('[data-tab]').forEach(item=>{const active=item.dataset.tab===id;item.classList.toggle('active',active);item.setAttribute('aria-selected',String(active))});document.querySelectorAll('[data-panel]').forEach(panel=>{const active=panel.dataset.panel===id;panel.classList.toggle('active',active);panel.hidden=!active})}));

const footer=document.querySelector('footer');
if(footer&&mobileBooking){const footerObserver=new IntersectionObserver(([entry])=>mobileBooking.classList.toggle('hidden',entry.isIntersecting),{threshold:.05});footerObserver.observe(footer)}
