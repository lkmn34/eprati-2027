(function(){
function $(s){return document.querySelector(s)}
function esc(t){return String(t).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function low(s){return s.toLocaleLowerCase('tr')}
var R=document.body.getAttribute('data-root')||'',HOME=R||'./',ASIST=R+'poset-asistani/',URUN=R+'urunler/magaza-ambalajlari/atlet-poset/';

/* ---------- mobil menü ---------- */
var mb=$('#menubtn'),mm=$('#mobilemenu');
if(mb&&mm){
  function setMenu(o){mm.hidden=!o;mb.setAttribute('aria-expanded',o);document.documentElement.style.overflow=o?'hidden':''}
  mb.addEventListener('click',function(){setMenu(mm.hidden)});
  mm.addEventListener('click',function(e){if(e.target.closest&&(e.target.closest('a')||e.target.closest('[data-close]')))setMenu(false)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!mm.hidden){setMenu(false);mb.focus()}});
}
function find(arr,k){for(var i=0;i<arr.length;i++)if(arr[i][0]===k)return arr[i];return null}
/* ---------- ölçü çizimi (ortak) ---------- */
function dimSvg(w,g,h,label){
  var sc=Math.min(130/((w+2*g)||1),150/(h||1)),bw=Math.max(20,(w+2*g)*sc),bh=Math.max(20,h*sc),gw=Math.max(0,g*sc),bx=(170-bw)/2,by=(170-bh)/2;
  return '<svg width="170" height="190" viewBox="0 0 170 190" role="img" aria-label="Ölçü çizimi"><rect x="'+bx+'" y="'+by+'" width="'+bw+'" height="'+bh+'" rx="4" fill="#E8F3E3" stroke="#24803A" stroke-width="2"/><rect x="'+bx+'" y="'+by+'" width="'+gw+'" height="'+bh+'" fill="#CFE6C8" stroke="#24803A"/><rect x="'+(bx+bw-gw)+'" y="'+by+'" width="'+gw+'" height="'+bh+'" fill="#CFE6C8" stroke="#24803A"/><text x="85" y="186" text-anchor="middle" font-size="12" font-family="Inter" fill="#191B45">'+esc(label)+'</text></svg>';
}
var COLS=[['Şeffaf','#EEF3F0'],['Beyaz','#FFFFFF'],['Krem','#F3E9D2'],['Sarı','#F6D34A'],['Yeşil','#5FAE6E'],['Diğer','#BFD6FA']];
function swatches(cur){return '<div class="swatches">'+COLS.map(function(c){return '<button type="button" data-color="'+c[0]+'" class="'+(cur===c[0]?'on':'')+'" aria-pressed="'+(cur===c[0])+'"><i style="background:'+c[1]+'"></i>'+c[0]+'</button>'}).join('')+'</div>'}

function sizeStr(o){return o.w+'+'+o.g+'+'+o.g+' x '+o.h+' cm'}
var PHOTOS={atlet:null};
var INKS=[['Lacivert','#2B3787'],['Siyah','#1E1E1E'],['Kırmızı','#C62828'],['Yeşil','#2E7D32'],['Mavi','#1565C0'],['Altın','#B08A2E']];
var BAG='M40 30Q40 18 52 18L88 18Q96 18 96 30L96 92Q96 128 150 128Q204 128 204 92L204 30Q204 18 212 18L248 18Q260 18 260 30L265 352Q265 368 249 368L51 368Q35 368 35 352Z';
function bagRender(hex,clear,ink,logo,showPrint){
  if(PHOTOS.atlet){ // gerçek fotoğraf modu
    var m='-webkit-mask-image:url('+PHOTOS.atlet+');mask-image:url('+PHOTOS.atlet+');-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center';
    return '<img src="'+PHOTOS.atlet+'" alt="" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:contain">'+
      '<div style="position:absolute;top:0;left:0;background:'+hex+';mix-blend-mode:multiply;opacity:'+(clear?0.25:1)+';'+m+'"></div>'+
      (logo?'<img src="'+logo+'" alt="Logonuz" style="position:absolute;left:33%;top:50%;width:34%;height:28%;object-fit:contain;mix-blend-mode:multiply">':'');
  }
  var o=clear?0.42:1, fill=clear?'#DDEBF2':hex;
  var s='<svg width="100%" height="100%" viewBox="0 0 300 380" role="img" aria-label="Atlet poşet önizlemesi"><defs>'+
   '<clipPath id="bc"><path d="'+BAG+'"/></clipPath>'+
   '<linearGradient id="sheen" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".16"/><stop offset=".14" stop-color="#000" stop-opacity=".02"/><stop offset=".38" stop-color="#fff" stop-opacity=".38"/><stop offset=".55" stop-color="#fff" stop-opacity=".06"/><stop offset=".86" stop-color="#000" stop-opacity=".03"/><stop offset="1" stop-color="#000" stop-opacity=".18"/></linearGradient>'+
   '<linearGradient id="vsh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".25"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".12"/></linearGradient>'+
   '<filter id="bl"><feGaussianBlur stdDeviation="2.2"/></filter><filter id="bl2"><feGaussianBlur stdDeviation="6"/></filter></defs>'+
   '<ellipse cx="150" cy="372" rx="120" ry="8" fill="#191B45" opacity=".12" filter="url(#bl2)"/>'+
   '<path d="'+BAG+'" fill="'+fill+'" fill-opacity="'+o+'"/>'+
   '<g clip-path="url(#bc)">'+
     '<rect x="0" y="0" width="300" height="380" fill="url(#sheen)"/><rect x="0" y="0" width="300" height="380" fill="url(#vsh)"/>'+
     '<rect x="35" y="0" width="22" height="380" fill="#000" opacity=".07"/><rect x="243" y="0" width="22" height="380" fill="#000" opacity=".07"/>'+
     '<g fill="none" stroke-linecap="round" filter="url(#bl)">'+
       '<path d="M60 40Q70 80 64 120M236 40Q228 82 238 124M110 150Q140 210 120 300M190 160Q170 230 196 330M70 250Q120 270 150 330M232 220Q210 270 220 350" stroke="#000" stroke-opacity=".10" stroke-width="5"/>'+
       '<path d="M66 44Q76 82 70 120M230 44Q222 84 232 122M116 150Q146 212 126 300M196 160Q176 232 202 330M74 246Q124 266 154 326" stroke="#fff" stroke-opacity=".45" stroke-width="3"/>'+
     '</g>'+
     '<path d="M35 354L265 354" stroke="#000" stroke-opacity=".12" stroke-width="2" stroke-dasharray="3 3"/>'+
   '</g>'+
   '<path d="'+BAG+'" fill="none" stroke="#000" stroke-opacity=".16" stroke-width="1.5"/>';
  if(logo) s+='<image href="'+logo+'" xlink:href="'+logo+'" x="95" y="180" width="110" height="110" preserveAspectRatio="xMidYMid meet" style="mix-blend-mode:multiply"/>';
  else if(showPrint) s+='<g opacity=".92"><path d="M128 238c0-26 16-40 42-40 0 26-16 40-42 40z" fill="'+ink+'"/><path d="M130 236c10-12 20-22 34-32" stroke="#fff" stroke-width="2" fill="none" opacity=".6"/><text x="150" y="272" text-anchor="middle" font-family="Plus Jakarta Sans,Inter,sans-serif" font-weight="800" font-size="19" fill="'+ink+'">FİRMA ADI</text><text x="150" y="292" text-anchor="middle" font-family="Inter,sans-serif" font-size="10" fill="'+ink+'">0212 000 00 00</text></g>';
  return s+'</svg>';
}
/* Ürün ikonları (48x48, çizgi) — gerçek ürün fotoğrafları gelince bunların yerini alabilir */
var IC={
 atlet:'<path d="M13 8h7v8c0 3 2 5 4 5s4-2 4-5V8h7v32a2 2 0 0 1-2 2H15a2 2 0 0 1-2-2z"/><path d="M13 13h7M28 13h7" opacity=".5"/>',
 elgecme:'<rect x="12" y="7" width="24" height="35" rx="2"/><rect x="19" y="12" width="10" height="4" rx="2"/>',
 kulplu:'<rect x="10" y="18" width="28" height="24" rx="2"/><path d="M17 18c0-9 14-9 14 0"/>',
 kargo:'<rect x="7" y="12" width="34" height="26" rx="2"/><path d="M7 14l17 12 17-12"/><path d="M30 33h6" opacity=".5"/>',
 rulo:'<ellipse cx="15" cy="24" rx="5" ry="12"/><path d="M15 12h16M15 36h16"/><path d="M31 12a5 12 0 0 1 0 24"/><path d="M31 36v6h10V28" opacity=".6"/>',
 ekmek:'<path d="M17 5h14v38H17z"/><path d="M17 11h14" opacity=".5"/><path d="M21 20c2-2 4-2 6 0M21 27c2-2 4-2 6 0M21 34c2-2 4-2 6 0" opacity=".6"/>',
 bakliyat:'<path d="M15 14c-4 9-4 19 0 28h18c4-9 4-19 0-28z"/><path d="M15 14l3-6h12l3 6"/><circle cx="21" cy="30" r="1.6"/><circle cx="27" cy="26" r="1.6"/><circle cx="26" cy="34" r="1.6"/>',
 buz:'<rect x="12" y="10" width="24" height="32" rx="3"/><path d="M18 22l4 4-4 4M30 22l-4 4 4 4M24 18v16" opacity=".6"/>',
 aski:'<path d="M24 11a3 3 0 1 1 3-3"/><path d="M24 11v3L9 23h30L24 14"/><path d="M11 23v19h26V23"/>',
 hali:'<circle cx="15" cy="30" r="7"/><circle cx="15" cy="30" r="2.5"/><path d="M15 23h24v14H15"/>',
 opp:'<rect x="10" y="14" width="28" height="28" rx="2"/><path d="M10 14l4-6h20l4 6"/><path d="M19 24l5 4 5-4" opacity=".6"/>',
 kilitli:'<rect x="10" y="9" width="28" height="33" rx="2"/><path d="M10 16h28"/><path d="M13 12.5h22" stroke-dasharray="2 2" opacity=".6"/>',
 bardak:'<path d="M14 10h20l-3 32H17z"/><path d="M13 10h22" stroke-width="3"/><path d="M16 22h16" opacity=".5"/>',
 lastik:'<circle cx="24" cy="24" r="16"/><circle cx="24" cy="24" r="7"/><path d="M24 8v5M24 35v5M8 24h5M35 24h5" opacity=".5"/>',
 bobin:'<ellipse cx="24" cy="12" rx="13" ry="4"/><path d="M11 12v24c0 2 6 4 13 4s13-2 13-4V12"/><ellipse cx="24" cy="12" rx="4" ry="1.3"/>'
};
function icon(k,size,col){return '<svg width="'+(size||28)+'" height="'+(size||28)+'" viewBox="0 0 48 48" fill="none" stroke="'+(col||'#2B3787')+'" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+IC[k]+'</svg>'}

/* ---------- hafif hareketler: kaydırınca belirme, sayaçlar ---------- */
var calm=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if('IntersectionObserver' in window&&!calm){
  var rv=document.querySelectorAll('.sec .h2, .sec .eyebrow, .card, .cat, .dcard, .mapwrap, .faq, .cta, .dstage, .dctl, .qform, .sz');
  Array.prototype.forEach.call(rv,function(el){var sib=el.parentNode?Array.prototype.indexOf.call(el.parentNode.children,el):0;el.classList.add('rv');el.style.transitionDelay=Math.min(sib,6)*60+'ms'});
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});
  Array.prototype.forEach.call(rv,function(el){io.observe(el)});
  var co=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;co.unobserve(e.target);var el=e.target,to=+el.getAttribute('data-to'),fr=+(el.getAttribute('data-from')||0),t0=null;
    function step(ts){if(!t0)t0=ts;var p=Math.min(1,(ts-t0)/1400);p=1-Math.pow(1-p,3);el.textContent=Math.round(fr+(to-fr)*p);if(p<1)requestAnimationFrame(step)}requestAnimationFrame(step)})},{threshold:.6});
  Array.prototype.forEach.call(document.querySelectorAll('.count'),function(el){co.observe(el)});
}
if($('#pg-home')){
/* ---------- ana sayfa ---------- */
var P=[['Atlet Poşet','Mağaza','market, hışır, alışveriş, bakkal'],['El Geçmeli Poşet','Mağaza','butik, giyim, mağaza'],['Kulplu Poşet','Mağaza','ayakkabı, kutu, tekstil'],['Kargo Poşeti','Mağaza','e-ticaret, gönderi, kurye'],
['Rulo Manav Poşeti','Gıda','manav, meyve, sebze, pazar'],['Bakliyat Poşeti','Gıda','pirinç, mercimek, kuru gıda'],['Plast Kağıt','Gıda','kasap, şarküteri, peynir'],['Koli-Kasa Poşeti','Gıda','kasa, koli içi, toptan'],['Ekmek Poşeti','Gıda','fırın, pastane, simit'],['Dondurma-Buz Poşeti','Gıda','buz, dondurma, soğuk'],
['Kuru Temizleme Poşeti','Tekstil ve Temizlik','askı, elbise, ütü'],['Halı Poşeti','Tekstil ve Temizlik','halı yıkama, rulo'],['OPP-CPP Torba','Tekstil ve Temizlik','şeffaf, gömlek, ürün paketleme'],['OPP-CPP Bantlı Torba','Tekstil ve Temizlik','yapışkan, bantlı, şeffaf'],['OPP-Film Bobin','Tekstil ve Temizlik','bobin, makine'],['Jelatin','Tekstil ve Temizlik','ambalaj, sarma'],['Taşıma Torbası','Tekstil ve Temizlik','çamaşır, büyük torba'],
['Torba','Endüstriyel','sanayi, depo'],['Bantlı Torba','Endüstriyel','yapışkan kapama'],['Bardak Poşeti','Endüstriyel','karton bardak, tek kullanımlık'],['Fermuarlı Kilitli Torba','Endüstriyel','ziplock, fermuar'],['Kilitli Torba','Endüstriyel','buzdolabı, kilitli, numune'],['Oto Lastik Poşeti','Endüstriyel','lastik, otomotiv, depolama'],['Film (Bobin)','Endüstriyel','streç, bobin']];
var ara=$('#ara'), sres=$('#sres');
function doSearch(){
  var q=low(ara.value.trim()); if(!q){sres.hidden=true;return}
  var words=q.split(' ').filter(function(w){return w.length>2});
  var r=P.filter(function(p){var t=low(p[0]+' '+p[2]);return t.indexOf(q)>=0||words.some(function(w){return t.indexOf(w)>=0})}).slice(0,5);
  sres.innerHTML=r.length?r.map(function(p){return '<a href="'+URUN+'"><span><b style="font-weight:600">'+esc(p[0])+'</b><small>'+esc(p[1])+' · '+esc(p[2].split(',')[0])+'</small></span><span style="color:#24803A;font-weight:600;font-size:13px">Gör →</span></a>'}).join('')
    :'<div style="padding:12px;font-size:14px;color:#4D5170">Tam eşleşme bulamadık. <a href="'+ASIST+'">Poşet Asistanı</a> birkaç soruyla size uygun olanı önersin.</div>';
  sres.hidden=false;
}
ara.addEventListener('input',doSearch);
document.addEventListener('click',function(e){if(!e.target.closest||!e.target.closest('.search'))sres.hidden=true});
['Market poşeti','Ekmek poşeti','Kargo poşeti','Kilitli torba'].forEach(function(l){
  var b=document.createElement('button');b.type='button';b.textContent=l;
  b.onclick=function(e){e.stopPropagation();ara.value=l.split(' ')[0];doSearch();ara.focus()};$('#chips').appendChild(b)});
$('#minigrid').innerHTML=[['market','atlet','Market ve mağaza'],['firin','ekmek','Fırın ve pastane'],['manav','rulo','Manav ve pazar'],['eticaret','kargo','E-ticaret ve kargo'],['kt','aski','Kuru temizleme ve halı'],['sanayi','lastik','Sanayi ve otomotiv']].map(function(s){return '<a href="'+ASIST+'?sektor='+s[0]+'"><span class="mi">'+icon(s[1],22)+'</span>'+s[2]+'</a>'}).join('');
$('#sectors').innerHTML=[['atlet','#E8F3E3','Market ve Mağaza','Atlet, el geçmeli, kulplu poşet'],['ekmek','#F3EFE6','Fırın ve Pastane','Ekmek poşeti, plast kağıt'],['rulo','#E6EAF7','Manav ve Pazar','Rulo manav poşeti, atlet poşet'],['bakliyat','#E8F3E3','Gıda Üreticisi','Bakliyat, koli-kasa, dondurma-buz poşeti'],['kargo','#F3EFE6','E-ticaret ve Kargo','Kargo poşeti, bantlı torba'],['aski','#E6EAF7','Kuru Temizleme ve Halı','Kuru temizleme poşeti, halı poşeti'],['opp','#E8F3E3','Tekstil ve Hazır Giyim','OPP-CPP torba, jelatin, taşıma torbası'],['lastik','#F3EFE6','Sanayi ve Otomotiv','Kilitli torba, oto lastik poşeti, film bobin']]
  .map(function(s,i){return '<a class="card sector" href="'+ASIST+'?sektor='+['market','firin','manav','gida','eticaret','kt','tekstil','sanayi'][i]+'"><span class="badge" style="background:'+s[1]+'">'+icon(s[0],34)+'</span><b>'+s[2]+'</b><span class="muted" style="font-size:14px">'+s[3]+'</span></a>'}).join('');
$('#cats').innerHTML=[['Mağaza Ambalajları','mağaza','#E8F3E3',['Atlet Poşet','El Geçmeli Poşet','Kulplu Poşet','Kargo Poşeti'],['atlet','elgecme','kulplu','kargo']],['Gıda Ambalajları','gıda','#F3EFE6',['Rulo Manav','Bakliyat','Plast Kağıt','Koli-Kasa','Ekmek','Dondurma-Buz'],['rulo','bakliyat','ekmek','buz']],['Tekstil ve Temizlik','tekstil','#E6EAF7',['Kuru Temizleme','Halı Poşeti','OPP-CPP Torba','OPP-CPP Bantlı','OPP-Film Bobin','Jelatin','Taşıma Torbası'],['aski','hali','opp','bobin']],['Endüstriyel Ambalajlar','endüstriyel','#EEF1EC',['Torba','Bantlı Torba','Bardak Poşeti','Fermuarlı Kilitli','Kilitli Torba','Oto Lastik','Film (Bobin)'],['kilitli','bardak','lastik','bobin']]]
  .map(function(c){return '<div class="cat" style="background:'+c[2]+'"><h3 style="font-size:20px;margin:0 0 14px">'+c[0]+'</h3><div class="tags">'+c[3].map(function(p){return '<a href="'+URUN+'">'+p+'</a>'}).join('')+'</div><a href="'+URUN+'" style="margin:10px 0 18px;font-weight:600;font-size:14px">Tüm '+c[1]+' ürünleri →</a><div class="collage" aria-hidden="true">'+c[4].map(function(k,i){return '<span style="transform:rotate('+[-6,4,-3,6][i]+'deg)">'+icon(k,40)+'</span>'}).join('')+'</div></div>'}).join('');
/* Referanslar: gerçek logolar gelince {ad:'THY', img:'logolar/thy.png'} şeklinde eklenir */
var REFS=[{ad:'THY'},{ad:'Koçtaş'},{ad:'Volvo'},{ad:'ŞOK'},{ad:'Garanti Bankası'},{ad:'Seyidoğlu'},{ad:'Sultanbacı'},{ad:'Çiğköftem'},{ad:'Zırhlı'}];
function tile(r){return '<div class="logo-tile" title="'+esc(r.ad)+'">'+(r.img?'<img src="'+r.img+'" alt="'+esc(r.ad)+'">':esc(r.ad))+'</div>'}
var r1=REFS.map(tile).join(''), r2=REFS.slice(4).concat(REFS.slice(0,4)).map(tile).join('');
$('#mrow1').innerHTML=r1+r1+r1+r1; $('#mrow2').innerHTML=r2+r2+r2+r2;
var FAQ=[['Ürünleriniz gıdaya uygun mu?','Evet. Gıda ambalajlarımız TR-34-K-282635 kayıt numaralı belgeyle üretilir.'],['Standart dışı ölçü ve baskı yapıyor musunuz?','Evet. Özel ölçü ve kalınlıkta üretim yapıyor, logo veya tasarımınızı fotoğraf baskı dahil tüm renklerde basabiliyoruz.'],['Atlet poşet ölçüleri nelerdir?','20+7+7 x 35 cm ile 30+10+10 x 60 cm arasında altı standart ölçümüz var. Özel ölçü de üretilir.'],['Halı poşeti nasıl satılıyor?','Halı poşetleri ortalama 30 kg ağırlığında sonsuz rulo olarak sunulur.'],['Sipariş süreci nasıl işliyor?','İhtiyaç ve ölçüyü belirliyor, tasarım ve baskı talebinizi alıyor, ardından üretim ve teslimatı planlıyoruz.']];
var openF=0;
function drawFaq(){$('#faqs').innerHTML=FAQ.map(function(f,i){var o=i===openF;return '<div class="faq"><button type="button" data-f="'+i+'" aria-expanded="'+o+'">'+f[0]+'<span>'+(o?'−':'+')+'</span></button>'+(o?'<p>'+f[1]+'</p>':'')+'</div>'}).join('')}
$('#faqs').addEventListener('click',function(e){var b=e.target.closest('[data-f]');if(!b)return;var i=+b.getAttribute('data-f');openF=openF===i?-1:i;drawFaq()});
drawFaq();



/* ihracat haritası: ülke noktaları */
var PINS=[{"ad": "ABD", "x": 21.61, "y": 30.87}, {"ad": "Birleşik Krallık", "x": 48.71, "y": 19.72}, {"ad": "İsveç", "x": 53.49, "y": 13.85}, {"ad": "Fransa", "x": 47.56, "y": 27.88}, {"ad": "Almanya", "x": 52.23, "y": 21.86}, {"ad": "Polonya", "x": 54.64, "y": 21.09}, {"ad": "Macaristan", "x": 54.78, "y": 24.73}, {"ad": "Romanya", "x": 56.38, "y": 25.71}, {"ad": "Bulgaristan", "x": 56.55, "y": 28.02}, {"ad": "Sırbistan", "x": 55.26, "y": 26.94}, {"ad": "Gürcistan", "x": 61.75, "y": 28.47}, {"ad": "Azerbaycan", "x": 63, "y": 29.9}, {"ad": "Irak", "x": 62.29, "y": 35.44}, {"ad": "Libya", "x": 54.84, "y": 40.02}, {"ad": "Moğolistan", "x": 77.9, "y": 24.89}, {"ad": "Kırgızistan", "x": 70.58, "y": 29}, {"ad": "İstanbul — üretim tesisimiz", "x": 59.97, "y": 30.29, "ev": 1}];
$('#pins').innerHTML=PINS.map(function(p,i){return '<button type="button" class="pin'+(p.ev?' ev':'')+'" data-i="'+i+'" style="left:'+p.x+'%;top:'+p.y+'%;animation-delay:'+(i*0.12)+'s" aria-label="'+esc(p.ad)+'"><span class="tip">'+esc(p.ad)+'</span></button>'}).join('');
function hl(i,on){var b=$('#pins').querySelector('[data-i="'+i+'"]');if(b)b.classList.toggle('on',on)}
$('#pins').addEventListener('click',function(e){var b=e.target.closest('.pin');if(!b)return;var was=b.classList.contains('on');Array.prototype.forEach.call(document.querySelectorAll('.pin.on'),function(x){x.classList.remove('on')});if(!was)b.classList.add('on')});
var cc=$('#countries');
['mouseover','focusin'].forEach(function(ev){cc.addEventListener(ev,function(e){var b=e.target.closest('[data-p]');if(b)hl(b.getAttribute('data-p'),true)})});
['mouseout','focusout'].forEach(function(ev){cc.addEventListener(ev,function(e){var b=e.target.closest('[data-p]');if(b)hl(b.getAttribute('data-p'),false)})});
cc.addEventListener('click',function(e){var b=e.target.closest('[data-p]');if(!b)return;Array.prototype.forEach.call(document.querySelectorAll('.pin.on'),function(x){x.classList.remove('on')});hl(b.getAttribute('data-p'),true)});
/* poşetinizi tasarlayın */
var D={color:'Beyaz',ink:'Lacivert',logo:null};
function drawD(){
  $('#dbag').innerHTML=bagRender(find(COLS,D.color)[1],D.color==='Şeffaf',find(INKS,D.ink)[1],D.logo,true);
  $('#dstage').className='dstage'+(D.color==='Şeffaf'?' checker':'');
  $('#dcname').textContent='· '+D.color; $('#diname').textContent=D.logo?'· logonuz':'· '+D.ink;
  $('#dcol').innerHTML=COLS.map(function(c){return '<button type="button" data-dc="'+c[0]+'" class="'+(D.color===c[0]?'on':'')+'" aria-pressed="'+(D.color===c[0])+'" aria-label="Zemin '+c[0]+'" title="'+c[0]+'" style="background:'+c[1]+'"></button>'}).join('');
  $('#dink').innerHTML=INKS.map(function(c){return '<button type="button" data-di="'+c[0]+'" class="'+(D.ink===c[0]?'on':'')+'" aria-pressed="'+(D.ink===c[0])+'" aria-label="Baskı '+c[0]+'" title="'+c[0]+'" style="background:'+c[1]+'"></button>'}).join('');
  $('#dgo').href=URUN+'?renk='+encodeURIComponent(D.color)+'&baski='+encodeURIComponent(D.ink)+'#teklif';
}
$('#tasarla').addEventListener('click',function(e){var t=e.target.closest?e.target.closest('button'):null;if(!t)return;
  if(t.hasAttribute('data-dc'))D.color=t.getAttribute('data-dc');if(t.hasAttribute('data-di')){D.ink=t.getAttribute('data-di');D.logo=null}drawD()});
$('#dlogo').addEventListener('change',function(){var f=this.files&&this.files[0];if(!f||!/^image\//.test(f.type))return;var fr=new FileReader();fr.onload=function(){D.logo=fr.result;drawD()};fr.readAsDataURL(f)});
drawD();
}
if($('#pg-asistan')){
/* ---------- asistan ---------- */
var A={step:0,sector:null,content:null,handle:null,size:null,print:null,color:null,unit:'adet',w:30,g:10,h:60,name:'',phone:'',file:'',tried:false};
var SEC=[['market','Market ve Mağaza','Bakkal, market, butik','Atlet Poşet'],['firin','Fırın ve Pastane','Ekmek, simit, pasta','Ekmek Poşeti'],['manav','Manav ve Pazar','Meyve, sebze','Rulo Manav Poşeti'],['gida','Gıda Üreticisi','Bakliyat, kuru gıda, buz','Bakliyat Poşeti'],['eticaret','E-ticaret ve Kargo','Online satış, gönderi','Kargo Poşeti'],['kt','Kuru Temizleme','Askılı kıyafet','Kuru Temizleme Poşeti'],['hali','Halı Yıkama','Halı ve kilim','Halı Poşeti'],['tekstil','Tekstil ve Hazır Giyim','Ürün paketleme','OPP-CPP Torba'],['sanayi','Sanayi ve Otomotiv','Parça, lastik, depolama','Kilitli Torba']];
var CON=[['hafif','Hafif ürünler','Giyim, aksesuar, kozmetik'],['orta','Günlük alışveriş','Market ürünleri, karışık'],['agir','Ağır ürünler','Şişe, konserve, bakliyat'],['gida','Doğrudan gıda','Ekmek, meyve, açık gıda'],['soguk','Soğuk veya donuk','Buz, dondurma, donuk ürün'],['parca','Parça veya büyük eşya','Halı, lastik, yedek parça']];
var HAN=[['atlet','Atlet','M14 8v12M50 8v12M14 20c0 8 8 10 10 10h16c2 0 10-2 10-10M10 20h44v46H10z'],['el','El geçmeli','M10 8h44v58H10zM24 18h16v6H24z'],['kulp','Kulplu','M10 22h44v44H10zM22 22c0-14 20-14 20 0'],['sapsiz','Sapsız torba','M12 10h40v56H12zM12 18h40'],['rulo','Rulo / bobin','M16 16h32v40H16zM16 16c-6 0-6 40 0 40M48 16c6 0 6 40 0 40'],['oneri','Siz önerin','M26 22a6 6 0 1 1 8 6c-2 1-2 3-2 6M32 42v2']];
var SIZ=[['kucuk','Küçük','Eczane, butik, tek ürün'],['orta','Orta','Günlük alışveriş'],['buyuk','Büyük','Battal, toplu taşıma'],['ozel','Özel ölçü','Ölçüyü ben gireceğim'],['bilmiyorum','Bilmiyorum','Siz önerin']];
var PRI=[['yok','Baskısız','En hızlı ve ekonomik'],['logo','1–3 renk logo','Logonuz ve iletişim bilgileriniz'],['foto','Çok renkli / fotoğraf','CMYK, tam renkli tasarım']];
var KEYS=['sector','content','handle','size','print'];
function opts(arr,key,icon){return '<div class="opts">'+arr.map(function(o){var on=A[key]===o[0];return '<button type="button" class="opt'+(icon?' icon':'')+(on?' on':'')+'" aria-pressed="'+on+'" data-k="'+key+'" data-v="'+o[0]+'">'+(icon?'<svg width="64" height="72" viewBox="0 0 64 72" fill="none" stroke="#24803A" stroke-width="2.5" stroke-linejoin="round" aria-hidden="true"><path d="'+o[2]+'"/></svg>'+o[1]:o[1]+'<small>'+o[2]+'</small>')+'</button>'}).join('')+'</div>'}
function recommend(){
  var sec=find(SEC,A.sector),rec=sec?sec[3]:'Henüz seçim yok';
  var byH={atlet:'Atlet Poşet',el:'El Geçmeli Poşet',kulp:'Kulplu Poşet'};
  var sap={firin:'Ekmek Poşeti',gida:'Bakliyat Poşeti',eticaret:'Kargo Poşeti',kt:'Kuru Temizleme Poşeti',tekstil:'OPP-CPP Torba',sanayi:'Kilitli Torba',manav:'Rulo Manav Poşeti',market:'Atlet Poşet',hali:'Halı Poşeti'};
  var rul={manav:'Rulo Manav Poşeti',hali:'Halı Poşeti',tekstil:'OPP-Film Bobin',sanayi:'Film (Bobin)'};
  if(A.handle&&byH[A.handle])rec=byH[A.handle];
  else if(A.handle==='sapsiz'&&sec)rec=sap[A.sector];
  else if(A.handle==='rulo'&&sec)rec=rul[A.sector]||'Film (Bobin)';
  if(A.content==='soguk'&&(!A.handle||A.handle==='sapsiz'||A.handle==='oneri'))rec='Dondurma-Buz Poşeti';
  if(A.sector==='sanayi'&&A.content==='parca'&&(!A.handle||A.handle==='oneri'))rec='Oto Lastik Poşeti';
  return rec;
}
function drawSide(){
  var sec=find(SEC,A.sector);
  $('#rec').textContent=recommend();var mr=$('#mrec');if(mr)mr.innerHTML='<span>Önerimiz</span><b>'+esc(recommend())+'</b><a href="#oneri">Özet ↓</a>';
  $('#why').textContent=sec?sec[1]+' işletmelerinin en çok tercih ettiği çözümlerden biri. Seçimlerinize göre ölçü, kalınlık ve baskıyı birlikte netleştiririz.':'Sektörünüzü seçtiğinizde size en uygun poşeti burada göstereceğiz.';
  function lab(arr,k){var f=find(arr,A[k]);return f?f[1]:'—'}
  var rows=[['Sektör',sec?sec[1]:'—'],['İçerik',lab(CON,'content')],['Tutma şekli',lab(HAN,'handle')],['Boyut',A.size==='ozel'?sizeStr(A):lab(SIZ,'size')],['Baskı',lab(PRI,'print')+(A.color?' · '+A.color:'')]];
  $('#summary').innerHTML=rows.map(function(r){return '<li><span>'+r[0]+'</span><b style="font-weight:600;text-align:right">'+esc(r[1])+'</b></li>'}).join('');
  var n=[];
  if(A.content==='agir')n.push('Kalın ve dayanıklı film önerilir');
  if(A.content==='gida'||['firin','manav','gida'].indexOf(A.sector)>=0)n.push('Gıdaya uygun · TR-34-K-282635');
  if(A.print&&A.print!=='yok')n.push('Firmanıza özel tasarım');
  if(A.size==='ozel')n.push('Özel ölçü üretim');
  $('#notes').innerHTML=n.map(function(x){return '<span class="note">'+x+'</span>'}).join('');
}
function drawSteps(){
  var L6=['Sektör','İçerik','Tutma şekli','Boyut','Baskı','İletişim'];var st=$('#steptxt');if(st)st.textContent=A.step<6?'Adım '+(A.step+1)+' / 6 · '+L6[A.step]:'Tamamlandı';
  $('#steps').innerHTML=['Sektör','İçerik','Tutma','Boyut','Baskı','İletişim'].map(function(l,i){return '<li class="'+(i<A.step?'done':i===A.step?'cur':'')+'"><span></span>'+(i+1)+'. '+l+'</li>'}).join('');
}
function drawQ(){
  var s=A.step,h='';
  if(s===0)h='<h2 class="qh">Merhaba! Hangi işle uğraşıyorsunuz?</h2><p class="muted" style="margin:0 0 24px">Sektörünüzü seçin, size en çok kullanılan poşetlerden başlayalım.</p>'+opts(SEC,'sector');
  if(s===1)h='<h2 class="qh">Poşete ne koyacaksınız?</h2><p class="muted" style="margin:0 0 24px">Ağırlık ve içerik, poşetin kalınlığını ve malzemesini belirler.</p>'+opts(CON,'content');
  if(s===2)h='<h2 class="qh">Nasıl taşınacak?</h2><p class="muted" style="margin:0 0 24px">Emin değilseniz "Siz önerin" deyin, sektörünüze göre seçelim.</p>'+opts(HAN,'handle',true);
  if(s===3){h='<h2 class="qh">Hangi boyutta olsun?</h2><p class="muted" style="margin:0 0 24px">Kabaca seçmeniz yeterli. Kesin ölçüyü teklif aşamasında birlikte netleştiririz.</p>'+opts(SIZ,'size');
    if(A.size==='ozel')h+='<div class="dims"><div class="f3"><label class="fld">En (cm)<input type="number" data-dim="w" value="'+A.w+'"></label><label class="fld">Körük (cm)<input type="number" data-dim="g" value="'+A.g+'"></label><label class="fld">Boy (cm)<input type="number" data-dim="h" value="'+A.h+'"></label><p class="muted full" style="font-size:13px;margin:0">Körük, poşetin yan kıvrımıdır. Ölçü "en + körük + körük × boy" şeklinde yazılır.</p></div><div id="adim">'+dimSvg(A.w,A.g,A.h,sizeStr(A))+'</div></div>';}
  if(s===4){h='<h2 class="qh">Baskı olsun mu?</h2><p class="muted" style="margin:0 0 24px">Logonuz poşetinizi reklam aracına çevirir. Fotoğraf baskı dahil tüm renkler mümkün.</p>'+opts(PRI,'print')+'<p style="font-weight:600;font-size:14px;margin:24px 0 10px">Poşet zemin rengi</p>'+swatches(A.color);
    if(A.print==='logo'||A.print==='foto')h+='<label class="drop"><b>'+(A.file?'Yüklendi: '+esc(A.file):'Logonuzu veya tasarımınızı buraya bırakın')+'</b><span class="muted" style="font-size:13px">PDF, AI, PNG veya JPG. Elinizde yoksa sonra da gönderebilirsiniz.</span><input type="file" data-file="a"></label>';}
  if(s===5){var e=A.tried;h='<h2 class="qh">Son adım: size nasıl ulaşalım?</h2><p class="muted" style="margin:0 0 24px">Sadece iki alan zorunlu. Gerisini telefonda konuşabiliriz.</p><div class="f2">'+
    '<label class="fld">Ad soyad<em class="req">Zorunlu</em><input data-in="name" autocomplete="name" value="'+esc(A.name)+'" class="'+(e&&!A.name.trim()?'err':'')+'"></label>'+
    '<label class="fld">Telefon<em class="req">Zorunlu</em><input type="tel" data-in="phone" placeholder="05xx xxx xx xx" value="'+esc(A.phone)+'" class="'+(e&&A.phone.trim().length<7?'err':'')+'"></label>'+
    '<label class="fld">Firma adı<em>İsteğe bağlı</em><input autocomplete="organization"></label><label class="fld">E-posta<em>İsteğe bağlı</em><input type="email"></label>'+
    '<div class="full"><span style="font-size:14px;font-weight:600">Yaklaşık miktar</span><div style="display:flex;flex-wrap:wrap;align-items:center"><input type="number" aria-label="Miktar" placeholder="ör. 5000" style="flex:1 1 200px;min-height:50px;border:2px solid #DDE1EA;border-radius:12px;padding:0 14px;margin:6px 10px 0 0"><div class="seg" role="group" aria-label="Birim"><button type="button" data-unit="adet" class="'+(A.unit==='adet'?'on':'')+'">Adet</button><button type="button" data-unit="kg" class="'+(A.unit==='kg'?'on':'')+'">Kg</button></div></div><p class="muted" style="font-size:13px;margin:6px 0 0">Adet ya da kilogram, hangisi kolayınıza gelirse. Emin değilseniz tahmini yazın, biz hesaplarız.</p></div></div>'+
    (e&&(!A.name.trim()||A.phone.trim().length<7)?'<p class="errmsg" role="alert">Size dönebilmemiz için ad soyad ve telefon gerekli.</p>':'');}
  if(s===6){h='<div class="ok"><span class="circ"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#24803A" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg></span><h2 class="qh" style="margin:18px 0 8px">Teşekkürler '+esc(A.name.trim().split(' ')[0])+', talebiniz bize ulaştı.</h2><p class="muted" style="max-width:480px;margin:0 auto 24px">Satış ekibimiz en kısa sürede '+esc(A.phone)+' numarasından size dönecek. Acele ediyorsanız WhatsApp\'tan da yazabilirsiniz.</p><a class="btn ghost" href="'+HOME+'" style="margin:4px">Ana sayfaya dön</a> <a class="btn" href="'+URUN+'" style="margin:4px">'+esc(recommend())+' sayfasına git</a></div>';}
  if(s<6){var can=s>=5||!!A[KEYS[s]];
    h+='<div class="qnav"><button type="button" class="btn ghost" data-nav="back" style="visibility:'+(s===0?'hidden':'visible')+'">← Geri</button><div>'+(s===5?'<a class="btn ghost" href="https://wa.me/905357183598" style="border-color:#24803A;color:#24803A">WhatsApp ile gönder</a>':'')+'<button type="button" class="btn" data-nav="next"'+(can?'':' disabled')+'>'+(s===5?'Teklif iste':'Devam et →')+'</button></div></div>';}
  $('#qpanel').innerHTML=h; drawSteps(); drawSide();
}
var qs=location.search.match(/[?&]sektor=([a-z]+)/);if(qs&&find(SEC,qs[1])){A.sector=qs[1];A.step=1}
var qp=$('#qpanel');
qp.addEventListener('click',function(e){
  var t=e.target.closest?e.target.closest('button'):null; if(!t)return;
  if(t.hasAttribute('data-k')){var k=t.getAttribute('data-k');A[k]=t.getAttribute('data-v');drawQ();
    if(A.step<3&&k===KEYS[A.step]){var cur=A.step;setTimeout(function(){if(A.step===cur){A.step++;drawQ();var top=$('#steptxt');var y=(top&&top.offsetParent?top:$('#steps')).getBoundingClientRect().top+window.pageYOffset-90;if(window.pageYOffset>y)window.scrollTo(0,y)}},280)}
    return}
  if(t.hasAttribute('data-color')){A.color=t.getAttribute('data-color');drawQ();return}
  if(t.hasAttribute('data-unit')){A.unit=t.getAttribute('data-unit');Array.prototype.forEach.call(qp.querySelectorAll('[data-unit]'),function(b){b.className=b===t?'on':''});return}
  var n=t.getAttribute('data-nav');
  if(n==='back'){A.step=Math.max(0,A.step-1);drawQ()}
  if(n==='next'){if(A.step===5){if(!A.name.trim()||A.phone.trim().length<7){A.tried=true;drawQ();return}A.step=6;drawQ();return}
    if(A[KEYS[A.step]]){A.step++;drawQ()}}
});
qp.addEventListener('input',function(e){
  var t=e.target;
  if(t.hasAttribute('data-dim')){A[t.getAttribute('data-dim')]=Math.max(0,+t.value||0);$('#adim').innerHTML=dimSvg(A.w,A.g,A.h,sizeStr(A));drawSide()}
  if(t.hasAttribute('data-in')){A[t.getAttribute('data-in')]=t.value;if(A.tried&&t.value.trim())t.className=''}
});
qp.addEventListener('change',function(e){var t=e.target;if(t.hasAttribute('data-file')){A.file=t.files&&t.files[0]?t.files[0].name:'';drawQ()}});
drawQ();

}
if($('#pg-urun')){
/* ---------- ürün sayfası ---------- */
var U={color:'Beyaz',print:'yok',w:30,g:10,h:60,sel:6,fs:0,unit:'adet',name:'',phone:'',file:'',tried:false};
var PP=[['yok','Baskısız'],['1','1 renk'],['3','2–3 renk'],['cmyk','CMYK / fotoğraf']];
var SZ=[[1,20,7,35,'Küçük alışveriş, eczane'],[2],[3],[4],[5],[6,30,10,60,'Battal, toplu alışveriş']];
function pname(){return find(PP,U.print)[1]}
/* ---- Ürün önizleme motoru ----
   Gerçek fotoğraf gelince: beyaz poşetin şeffaf zeminli PNG fotoğrafı PHOTOS'a eklenir,
   örn. PHOTOS.atlet='urunler/atlet-beyaz.png'. Renk, fotoğrafın üzerine "multiply" ile
   ve fotoğrafın kendi şekli maske olarak kullanılarak boyanır; kırışıklık ve gölgeler korunur. */
U.ink='Lacivert'; U.logo=null;
function drawBag(){
  var hex=find(COLS,U.color)[1], ink=find(INKS,U.ink)[1];
  $('#bagstage').innerHTML=bagRender(hex,U.color==='Şeffaf',ink,U.logo,U.print!=='yok');
  $('#viewer').className='viewer'+(U.color==='Şeffaf'?' checker':'');
  $('#vlabel').textContent='Önizleme · '+U.color+(U.logo?' · Logonuz':U.print!=='yok'?' · '+U.ink+' baskı':'');
  $('#cname').textContent=U.color; $('#inkname').textContent=U.print==='yok'&&!U.logo?'Önce baskı türü seçin (aşağıda) ya da logonuzu yükleyin':U.ink;
  $('#dots').innerHTML=COLS.map(function(c){return '<button type="button" data-pc="'+c[0]+'" class="'+(U.color===c[0]?'on':'')+'" aria-label="Zemin '+c[0]+'" aria-pressed="'+(U.color===c[0])+'" title="'+c[0]+'" style="background:'+c[1]+'"></button>'}).join('');
  $('#inks').innerHTML=INKS.map(function(c){return '<button type="button" data-ink="'+c[0]+'" class="'+(U.ink===c[0]?'on':'')+'" aria-label="Baskı '+c[0]+'" aria-pressed="'+(U.ink===c[0])+'" title="'+c[0]+'" style="background:'+c[1]+'"></button>'}).join('');
  $('#logoclr').hidden=!U.logo;
}
function readLogo(file){
  if(!file||!/^image\//.test(file.type))return;
  var fr=new FileReader(); fr.onload=function(){U.logo=fr.result;U.file=file.name;if(U.print==='yok')U.print='1';drawBag();drawForm()}; fr.readAsDataURL(file);
}
$('#logoin').addEventListener('change',function(){readLogo(this.files&&this.files[0])});
$('#logoclr').addEventListener('click',function(){U.logo=null;U.file='';$('#logoin').value='';drawBag();drawForm()});
function drawTable(){
  $('#sztable').innerHTML=SZ.map(function(r){var k=r.length>1,on=U.sel===r[0];return '<tr class="'+(on?'on':'')+'"><td style="font-weight:600">'+r[0]+'</td><td style="font-weight:600">'+(k?r[1]+'+'+r[2]+'+'+r[2]+' x '+r[3]+' cm':'[ÖLÇÜ]')+'</td><td class="muted">'+(k?r[4]:'[KULLANIM]')+'</td><td style="text-align:right"><button type="button" data-sz="'+r[0]+'" style="border-color:'+(on?'#24803A':'#DDE1EA')+'">'+(on?'Seçildi ✓':'Bu ölçüyü seç')+'</button></td></tr>'}).join('');
}
function drawSum(){
  $('#psum').innerHTML=[['Ürün','Atlet Poşet'],['Ölçü',sizeStr(U)],['Zemin',U.color],['Baskı',pname()]].map(function(r){return '<li style="display:flex;justify-content:space-between;margin-bottom:8px"><span style="color:#CDD0EC">'+r[0]+'</span><b style="font-weight:600">'+esc(r[1])+'</b></li>'}).join('');
}
function drawForm(){
  var s=U.fs,h='';
  $('#fsteps').innerHTML=['Ölçü','Renk ve baskı','İletişim'].map(function(l,i){return '<li class="'+(i<s?'done':i===s?'cur':'')+'"><span></span>'+(i+1)+'. '+l+'</li>'}).join('');
  if(s===0)h='<div class="dims" style="margin-top:0;background:#fff;padding:0"><div class="f3"><label class="fld">En (cm)<input type="number" data-ud="w" value="'+U.w+'"></label><label class="fld">Körük (cm)<input type="number" data-ud="g" value="'+U.g+'"></label><label class="fld">Boy (cm)<input type="number" data-ud="h" value="'+U.h+'"></label><p class="muted full" style="font-size:13px;margin:0">Seçili ölçü: <b style="color:#191B45" id="ustr">'+sizeStr(U)+'</b>. Körük, poşetin yanlardaki kıvrımıdır.</p></div><div id="udim">'+dimSvg(U.w,U.g,U.h,sizeStr(U))+'</div></div>';
  if(s===1){h='<p style="font-weight:600;font-size:14px;margin:0 0 10px">Baskı</p><div class="popts">'+PP.map(function(p){return '<button type="button" data-pp="'+p[0]+'" class="'+(U.print===p[0]?'on':'')+'">'+p[1]+'</button>'}).join('')+'</div><p style="font-weight:600;font-size:14px;margin:22px 0 10px">Zemin rengi</p>'+swatches(U.color);
    if(U.print!=='yok')h+='<label class="drop"><b>'+(U.file?'Yüklendi: '+esc(U.file):'Logonuzu veya tasarımınızı buraya bırakın')+'</b><span class="muted" style="font-size:13px">PDF, AI, PNG veya JPG</span><input type="file" data-file="u"></label>';}
  if(s===2){var e=U.tried;h='<div class="f2"><label class="fld">Ad soyad<em class="req">Zorunlu</em><input data-uin="name" value="'+esc(U.name)+'" class="'+(e&&!U.name.trim()?'err':'')+'"></label><label class="fld">Telefon<em class="req">Zorunlu</em><input type="tel" data-uin="phone" placeholder="05xx xxx xx xx" value="'+esc(U.phone)+'" class="'+(e&&U.phone.trim().length<7?'err':'')+'"></label><label class="fld">Firma<em>İsteğe bağlı</em><input></label><label class="fld">Şehir<em>İsteğe bağlı</em><input></label><label class="fld">Miktar<em>Tahmini yeterli</em><input type="number" placeholder="ör. 5000"></label><div><span style="font-size:14px;font-weight:600;display:block">Birim</span><div class="seg"><button type="button" data-unit="adet" class="'+(U.unit==='adet'?'on':'')+'">Adet</button><button type="button" data-unit="kg" class="'+(U.unit==='kg'?'on':'')+'">Kg</button></div></div><label class="fld full">Eklemek istedikleriniz<em>İsteğe bağlı</em><textarea rows="3"></textarea></label></div>'+(e&&(!U.name.trim()||U.phone.trim().length<7)?'<p class="errmsg" role="alert">Size dönebilmemiz için ad soyad ve telefon gerekli.</p>':'');}
  if(s===3)h='<div class="ok"><h3 style="font-size:24px;margin-bottom:8px">Teşekkürler, talebiniz alındı.</h3><p class="muted" style="margin:0">Atlet Poşet · '+sizeStr(U)+' · '+U.color+' · '+pname()+'. En kısa sürede size dönüyoruz.</p></div>';
  if(s<3)h+='<div class="qnav"><button type="button" class="btn ghost" data-unav="back" style="visibility:'+(s===0?'hidden':'visible')+'">← Geri</button><button type="button" class="btn" data-unav="next">'+(s===2?'Teklif iste':'Devam et →')+'</button></div>';
  $('#fbody').innerHTML=h; drawSum();
}
var pu=$('#pg-urun');
pu.addEventListener('click',function(e){
  var t=e.target.closest?e.target.closest('button'):null; if(!t)return;
  if(t.hasAttribute('data-pc')||(t.hasAttribute('data-color')&&pu.contains(t))){U.color=t.getAttribute('data-pc')||t.getAttribute('data-color');drawBag();drawForm();return}
  if(t.hasAttribute('data-ink')){U.ink=t.getAttribute('data-ink');if(U.print==='yok'&&!U.logo)U.print='1';drawBag();drawForm();return}
  if(t.hasAttribute('data-sz')){var r=SZ[+t.getAttribute('data-sz')-1];U.sel=r[0];if(r.length>1){U.w=r[1];U.g=r[2];U.h=r[3];U.fs=0}drawTable();drawForm();return}
  if(t.hasAttribute('data-pp')){U.print=t.getAttribute('data-pp');drawBag();drawForm();return}
  if(t.hasAttribute('data-unit')){U.unit=t.getAttribute('data-unit');drawForm();return}
  var n=t.getAttribute('data-unav');
  if(n==='back'){U.fs=Math.max(0,U.fs-1);drawForm()}
  if(n==='next'){if(U.fs===2){if(!U.name.trim()||U.phone.trim().length<7){U.tried=true;drawForm();return}U.fs=3}else U.fs++;drawForm()}
});
pu.addEventListener('input',function(e){
  var t=e.target;
  if(t.hasAttribute('data-ud')){U[t.getAttribute('data-ud')]=Math.max(0,+t.value||0);U.sel=0;$('#udim').innerHTML=dimSvg(U.w,U.g,U.h,sizeStr(U));$('#ustr').textContent=sizeStr(U);drawTable();drawSum()}
  if(t.hasAttribute('data-uin'))U[t.getAttribute('data-uin')]=t.value;
});
pu.addEventListener('change',function(e){var t=e.target;if(t.getAttribute('data-file')==='u'){var f=t.files&&t.files[0];U.file=f?f.name:'';if(f&&/^image\//.test(f.type))readLogo(f);else drawForm()}});
var pr=location.search;function qv(k){var m=pr.match(new RegExp('[?&]'+k+'=([^&#]+)'));return m?decodeURIComponent(m[1]):null}
if(qv('renk')&&find(COLS,qv('renk')))U.color=qv('renk');if(qv('baski')&&find(INKS,qv('baski'))){U.ink=qv('baski');U.print='1'}
drawBag();drawTable();drawForm();
}
})();
