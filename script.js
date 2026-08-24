const works=[...document.querySelectorAll('.work')];
const lightbox=document.getElementById('lightbox');
const lightboxImage=lightbox.querySelector('img');
const closeBtn=lightbox.querySelector('.lightbox-close');
const prevBtn=lightbox.querySelector('.lightbox-prev');
const nextBtn=lightbox.querySelector('.lightbox-next');
let current=0;

function openWork(index){
  current=index;
  lightboxImage.src=works[current].dataset.image;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
}
function closeWork(){
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}
function move(step){
  current=(current+step+works.length)%works.length;
  lightboxImage.src=works[current].dataset.image;
}
works.forEach((work,index)=>work.addEventListener('click',()=>openWork(index)));
closeBtn.addEventListener('click',closeWork);
prevBtn.addEventListener('click',()=>move(-1));
nextBtn.addEventListener('click',()=>move(1));
lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeWork()});
document.addEventListener('keydown',e=>{
  if(!lightbox.classList.contains('open'))return;
  if(e.key==='Escape')closeWork();
  if(e.key==='ArrowLeft')move(-1);
  if(e.key==='ArrowRight')move(1);
});

const revealTargets=[...document.querySelectorAll('.section-head,.price-card,.work,.reviews-top,.review-grid article,.about-photo,.about-copy,.visit-copy,.visit-info article')];
revealTargets.forEach(el=>el.classList.add('reveal'));
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}
  });
},{threshold:.09,rootMargin:'0px 0px -30px'});
revealTargets.forEach(el=>observer.observe(el));
