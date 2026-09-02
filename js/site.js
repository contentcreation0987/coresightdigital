// Coresight Digital — site behaviour. No dependencies.
(function(){
  var d=document;

  // page loader — hide once everything is painted, with a floor so it never flashes
  var t0=Date.now();
  function hideLoader(){
    var wait=Math.max(0,420-(Date.now()-t0));
    setTimeout(function(){d.documentElement.classList.add('is-loaded');},wait);
  }
  if(d.readyState==='complete') hideLoader();
  else window.addEventListener('load',hideLoader);
  setTimeout(function(){d.documentElement.classList.add('is-loaded');},3000); // hard safety net

  // mobile nav
  var burger=d.querySelector('.burger'), mnav=d.querySelector('.mnav');
  if(burger&&mnav){burger.addEventListener('click',function(){
    var open=mnav.classList.toggle('is-open');
    burger.classList.toggle('is-open',open);
    burger.setAttribute('aria-expanded',open?'true':'false');
  });}

  // sticky header shadow
  var hdr=d.querySelector('.hdr');
  if(hdr){var onScroll=function(){hdr.classList.toggle('is-stuck',window.scrollY>8);};
    onScroll();window.addEventListener('scroll',onScroll,{passive:true});}

  // stagger siblings first so above-fold delays are already set
  Array.prototype.forEach.call(d.querySelectorAll('[data-stagger]'),function(group){
    Array.prototype.forEach.call(group.children,function(child,i){
      if(child.classList.contains('reveal')) child.style.setProperty('--d',(i*70)+'ms');
    });
  });

  // scroll reveal
  var items=d.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){
    Array.prototype.forEach.call(items,function(el){el.classList.add('is-in');});
  } else {
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    },{rootMargin:'0px 0px -8% 0px',threshold:.08});
    var vh=window.innerHeight||800;
    Array.prototype.forEach.call(items,function(el){
      // anything already in the first screen reveals immediately — never a blank hero
      if(el.getBoundingClientRect().top<vh*0.95) el.classList.add('is-in');
      else io.observe(el);
    });
  }
  // faq
  Array.prototype.forEach.call(d.querySelectorAll('.faq__q'),function(btn){
    btn.addEventListener('click',function(){
      var item=btn.closest('.faq'), open=item.classList.toggle('is-open');
      btn.setAttribute('aria-expanded',open?'true':'false');
    });
  });

  // work filter
  var chips=d.querySelectorAll('.chip[data-filter]');
  if(chips.length){Array.prototype.forEach.call(chips,function(chip){
    chip.addEventListener('click',function(){
      var f=chip.getAttribute('data-filter');
      Array.prototype.forEach.call(chips,function(c){c.classList.toggle('is-active',c===chip);});
      Array.prototype.forEach.call(d.querySelectorAll('[data-service]'),function(card){
        var show=(f==='all'||card.getAttribute('data-service')===f);
        card.style.display=show?'':'none';
      });
    });
  });}

  // contact form -> thank-you (replace action with your own endpoint)
  var form=d.querySelector('form[data-lead]');
  if(form){form.addEventListener('submit',function(e){
    if(form.getAttribute('action')) return;   // real endpoint set: let it post
    e.preventDefault();
    window.location.href='thank-you.html';
  });}
})();
