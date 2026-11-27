(function(){
function $(s){return document.querySelector(s)}
function esc(t){return String(t).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function low(s){return s.toLocaleLowerCase('tr')}
var R=document.body.getAttribute('data-root')||'',HOME=R||'./',ASIST=R+'poset-asistani/',URUN=R+'urunler/magaza-ambalajlari/atlet-poset/';

function find(arr,k){for(var i=0;i<arr.length;i++)if(arr[i][0]===k)return arr[i];return null}
/* ---------- ölçü çizimi (ortak) ---------- */
function dimSvg(w,g,h,label){
  var sc=Math.min(130/((w+2*g)||1),150/(h||1)),bw=Math.max(20,(w+2*g)*sc),bh=Math.max(20,h*sc),gw=Math.max(0,g*sc),bx=(170-bw)/2,by=(170-bh)/2;
  return '<svg width="170" height="190" viewBox="0 0 170 190" role="img" aria-label="Ölçü çizimi"><rect x="'+bx+'" y="'+by+'" width="'+bw+'" height="'+bh+'" rx="4" fill="#E8F3E3" stroke="#24803A" stroke-width="2"/><rect x="'+bx+'" y="'+by+'" width="'+gw+'" height="'+bh+'" fill="#CFE6C8" stroke="#24803A"/><rect x="'+(bx+bw-gw)+'" y="'+by+'" width="'+gw+'" height="'+bh+'" fill="#CFE6C8" stroke="#24803A"/><text x="85" y="186" text-anchor="middle" font-size="12" font-family="Inter" fill="#191B45">'+esc(label)+'</text></svg>';
}
var COLS=[['Şeffaf','#EEF3F0'],['Beyaz','#FFFFFF'],['Krem','#F3E9D2'],['Sarı','#F6D34A'],['Yeşil','#5FAE6E'],['Diğer','#BFD6FA']];

/* ---------- gerçek fotoğraf mockup motoru ----------
   assets/mockup/{id}.png: R=gölge (x2), G=gövde maskesi, B=kulp maskesi, A=şeffaflık */
var MOCK={atlet:{logo:[.5,.56,.62,.27],foot:[.5,.885,.6,.075]},elgecme:{logo:[.5,.47,.72,.27],foot:[.5,.87,.72,.075]},kulplu:{logo:[.5,.5,.58,.3],foot:[.5,.855,.7,.075]}};
var BODY=[['Beyaz','#F6F6F4'],['Krem','#EFE3C8'],['Sarı','#F2CF1D'],['Turuncu','#EE7D22'],['Kırmızı','#D42A2A'],['Yeşil','#3E9B50'],['Mavi','#2A6FC9'],['Lacivert','#2B3787'],['Siyah','#242424']];
var HANDLE=[['Siyah','#1E1E1E'],['Beyaz','#F4F4F2'],['Kırmızı','#D42A2A'],['Sarı','#F2CF1D'],['Lacivert','#2B3787'],['Yeşil','#3E9B50'],['Mavi','#2A6FC9'],['Altın','#C29A45']];
var MC={},MW={};
function loadMock(id,cb){if(MC[id])return cb(MC[id]);(MW[id]=MW[id]||[]).push(cb);if(MW[id].length>1)return;var im=new Image();im.onload=function(){var c=document.createElement('canvas');c.width=im.width;c.height=im.height;var x=c.getContext('2d');x.drawImage(im,0,0);MC[id]={w:im.width,h:im.height,d:x.getImageData(0,0,im.width,im.height).data};MW[id].forEach(function(f){f(MC[id])});MW[id]=[]};im.src=R+'assets/mockup/'+id+'.png'}
function hexRGB(h){var n=parseInt(h.slice(1),16);return[(n>>16)/255,((n>>8)&255)/255,(n&255)/255]}
function placeholderLogo(ink){var c=document.createElement('canvas');c.width=420;c.height=230;var x=c.getContext('2d');x.fillStyle=ink;x.strokeStyle=ink;
  x.save();x.translate(210,62);x.beginPath();x.moveTo(-34,40);x.bezierCurveTo(-34,-10,0,-44,44,-46);x.bezierCurveTo(44,4,10,40,-34,40);x.fill();x.restore();
  x.textAlign='center';x.font='800 58px "Plus Jakarta Sans",Inter,Arial,sans-serif';x.fillText('FİRMA ADI',210,172);x.font='500 26px Inter,Arial,sans-serif';x.fillText('0212 000 00 00',210,214);return c}
function drawMock(cv,id,body,handle,logo){
  var tok=(cv._tok||0)+1;cv._tok=tok;
  loadMock(id,function(M){if(cv._tok!==tok)return;
    cv.width=M.w;cv.height=M.h;var x=cv.getContext('2d'),out=x.createImageData(M.w,M.h),o=out.data,d=M.d,B=hexRGB(body),H=hexRGB(handle||'#1E1E1E'),L=null;
    if(logo){var layers=logo.length!==undefined&&!logo.getContext&&!logo.naturalWidth?logo:[{c:logo,k:'logo'}];var lc=document.createElement('canvas');lc.width=M.w;lc.height=M.h;var lx=lc.getContext('2d');
      layers.forEach(function(Ly){if(!Ly||!Ly.c)return;var p=MOCK[id][Ly.k],im=Ly.c,sw=im.naturalWidth||im.width,sh=im.naturalHeight||im.height,sc=Math.min(M.w*p[2]/sw,M.h*p[3]/sh),dw=sw*sc,dh=sh*sc;lx.drawImage(im,M.w*p[0]-dw/2,M.h*p[1]-dh/2,dw,dh)});
      L=lx.getImageData(0,0,M.w,M.h).data}
    for(var i=0;i<d.length;i+=4){var a=d[i+3];o[i+3]=a;if(!a)continue;var s=d[i]/127.5,bm=d[i+1]/255,hm=d[i+2]/255,sb=s<1?s:1;
      var r=B[0]*sb,g=B[1]*sb,b=B[2]*sb;
      if(L&&L[i+3]&&bm>.5){var la=L[i+3]/255;r=r*(1-la)+L[i]/255*sb*la;g=g*(1-la)+L[i+1]/255*sb*la;b=b*(1-la)+L[i+2]/255*sb*la}
      var hl=(s-1)/.6;hl=hl<0?0:hl>1?1:hl;r=r*(1-hl)+hl;g=g*(1-hl)+hl;b=b*(1-hl)+hl;
      if(hm>0){var h2=(s-1)/.8;h2=h2<0?0:h2>1?1:h2;var hr=H[0]*sb*(1-h2)+h2,hg=H[1]*sb*(1-h2)+h2,hb=H[2]*sb*(1-h2)+h2;r=r*bm+hr*hm;g=g*bm+hg*hm;b=b*bm+hb*hm}
      o[i]=r*255;o[i+1]=g*255;o[i+2]=b*255}
    x.putImageData(out,0,0)})}
/* renk uyumu önerileri (poşet → önerilen kulplar) */
var PAIR={'Beyaz':['Siyah','Lacivert','Kırmızı'],'Krem':['Altın','Siyah','Lacivert'],'Sarı':['Siyah','Kırmızı','Lacivert'],'Turuncu':['Siyah','Beyaz','Lacivert'],'Kırmızı':['Sarı','Beyaz','Siyah'],'Yeşil':['Beyaz','Sarı','Siyah'],'Mavi':['Beyaz','Sarı','Lacivert'],'Lacivert':['Beyaz','Sarı','Altın'],'Siyah':['Altın','Kırmızı','Beyaz']};
var PAIRTXT={'Beyaz':'Beyaz poşette siyah ya da lacivert kulp kurumsal durur; logonuzun rengine uyan bir kulp da çok iyi bir seçim.','Krem':'Krem poşette altın ya da siyah kulp doğal ve şık bir görünüm verir.','Sarı':'Sarı poşette siyah ya da kırmızı kulp enerjik ve dikkat çekici durur.','Turuncu':'Turuncu poşette siyah ya da beyaz kulp rengi dengeler.','Kırmızı':'Kırmızı poşette sarı kulp canlı ve dikkat çekici, beyaz kulp ise ferah durur.','Yeşil':'Yeşil poşette beyaz ya da sarı kulp doğal ve taze bir his verir.','Mavi':'Mavi poşette beyaz ya da sarı kulp net bir kontrast yaratır.','Lacivert':'Lacivert poşette beyaz ya da altın kulp prestijli ve kurumsal görünür.','Siyah':'Siyah poşette altın ya da kırmızı kulp lüks ve güçlü bir görünüm verir.'};
var CLASH={'Kırmızı|Yeşil':1,'Yeşil|Kırmızı':1,'Mavi|Yeşil':1,'Yeşil|Mavi':1,'Turuncu|Kırmızı':1,'Kırmızı|Turuncu':1,'Lacivert|Siyah':1,'Siyah|Lacivert':1};
function nearestOf(pal,hex){var best=pal[0],bd=1e9,a=hexRGB(hex);pal.forEach(function(k){var b=hexRGB(k[1]),dd=Math.pow(a[0]-b[0],2)+Math.pow(a[1]-b[1],2)+Math.pow(a[2]-b[2],2);if(dd<bd){bd=dd;best=k}});return best}
function hexL(h){if(h.charAt(0)!=='#')return .9;var c=[1,3,5].map(function(i){var v=parseInt(h.substr(i,2),16)/255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)});return .2126*c[0]+.7152*c[1]+.0722*c[2]}
function cr(a,b){var x=hexL(a),y=hexL(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)}
function logoColor(src,cb){var im=new Image();im.onload=function(){try{var cv=document.createElement('canvas'),s=48;cv.width=cv.height=s;var x=cv.getContext('2d');x.drawImage(im,0,0,s,s);var d=x.getImageData(0,0,s,s).data,bins={},best=null,bn=0;
  for(var i=0;i<d.length;i+=4){if(d[i+3]<128)continue;var r=d[i],g=d[i+1],b=d[i+2],mx=Math.max(r,g,b),mn=Math.min(r,g,b);if(mx>235&&mn>225)continue;var k=(r>>5)+','+(g>>5)+','+(b>>5);bins[k]=(bins[k]||0)+1;if(bins[k]>bn){bn=bins[k];best=[r,g,b]}}
  cb(best?'#'+best.map(function(v){return ('0'+v.toString(16)).slice(-2)}).join(''):null)}catch(e){cb(null)}};im.src=src}

/* logo hazırlama: kenarlardan tek renk arka planı bul ve şeffaflaştır */
function prepLogo(src,cb){var im=new Image();im.onload=function(){try{
  var W=im.naturalWidth,H=im.naturalHeight,sc=Math.min(1,900/Math.max(W,H));W=Math.round(W*sc);H=Math.round(H*sc);
  var c=document.createElement('canvas');c.width=W;c.height=H;var x=c.getContext('2d');x.drawImage(im,0,0,W,H);var id=x.getImageData(0,0,W,H),d=id.data;
  var edge=[],trans=0,i;function px(xx,yy){var k=(yy*W+xx)*4;return[d[k],d[k+1],d[k+2],d[k+3]]}
  for(i=0;i<W;i+=2){edge.push(px(i,0));edge.push(px(i,H-1))}for(i=0;i<H;i+=2){edge.push(px(0,i));edge.push(px(W-1,i))}
  edge.forEach(function(p){if(p[3]<20)trans++});
  if(trans>edge.length*.5)return cb(im,{bg:'seffaf'});
  var bins={},best=null,bn=0;edge.forEach(function(p){var k=(p[0]>>4)+','+(p[1]>>4)+','+(p[2]>>4);bins[k]=(bins[k]||0)+1;if(bins[k]>bn){bn=bins[k];best=p}});
  if(bn<edge.length*.6)return cb(im,{bg:'karisik'});
  var br=best[0],bg=best[1],bb=best[2],T=46,seen=new Uint8Array(W*H),st=[];
  function near(k){var dr=d[k]-br,dg=d[k+1]-bg,db=d[k+2]-bb;return dr*dr+dg*dg+db*db<T*T*3}
  for(i=0;i<W;i++){st.push(i);st.push((H-1)*W+i)}for(i=0;i<H;i++){st.push(i*W);st.push(i*W+W-1)}
  while(st.length){var p=st.pop();if(seen[p])continue;var k=p*4;if(!near(k))continue;seen[p]=1;d[k+3]=0;var xx=p%W,yy=(p/W)|0;
    if(xx>0)st.push(p-1);if(xx<W-1)st.push(p+1);if(yy>0)st.push(p-W);if(yy<H-1)st.push(p+W)}
  for(p=0;p<W*H;p++){if(seen[p])continue;k=p*4;var xx2=p%W,yy2=(p/W)|0,nb=0;if(xx2>0&&seen[p-1])nb++;if(xx2<W-1&&seen[p+1])nb++;if(yy2>0&&seen[p-W])nb++;if(yy2<H-1&&seen[p+W])nb++;if(nb){var dr=d[k]-br,dg=d[k+1]-bg,db=d[k+2]-bb,dist=Math.sqrt((dr*dr+dg*dg+db*db)/3);if(dist<T*2)d[k+3]=Math.round(255*Math.min(1,(dist-T*.5)/(T*1.5)))}}
  x.putImageData(id,0,0);var mnx=W,mny=H,mxx=0,mxy=0;for(var yy3=0;yy3<H;yy3++)for(var xx3=0;xx3<W;xx3++)if(d[(yy3*W+xx3)*4+3]>16){if(xx3<mnx)mnx=xx3;if(xx3>mxx)mxx=xx3;if(yy3<mny)mny=yy3;if(yy3>mxy)mxy=yy3}
  if(mxx>mnx&&mxy>mny){var cw=mxx-mnx+1,ch=mxy-mny+1,c2=document.createElement('canvas');c2.width=cw;c2.height=ch;c2.getContext('2d').drawImage(c,mnx,mny,cw,ch,0,0,cw,ch);c=c2}
  var out=new Image();out.onload=function(){cb(out,{bg:(br>235&&bg>235&&bb>235)?'beyaz':'renkli',orig:im})};out.src=c.toDataURL('image/png');
}catch(e){cb(im,{bg:'hata'})}};im.src=src}
function logoMsg(info){if(!info)return '';return {seffaf:'Logonuz şeffaf arka planlı, olduğu gibi kullanıldı.',beyaz:'Logonuzun beyaz arka planı otomatik kaldırıldı.',renkli:'Logonuzun renkli arka planı otomatik kaldırıldı. Sonuç beklediğiniz gibi değilse orijinali kullanabilirsiniz.',karisik:'Logonuzun arka planı tek renk olmadığı için kaldıramadık. En iyi sonuç için şeffaf arka planlı PNG yükleyin; şimdilik kutu olarak gösteriyoruz.',hata:''}[info.bg]||''}
function swatches(cur){return '<div class="swatches">'+COLS.map(function(c){return '<button type="button" data-color="'+c[0]+'" class="'+(cur===c[0]?'on':'')+'" aria-pressed="'+(cur===c[0])+'"><i style="background:'+c[1]+'"></i>'+c[0]+'</button>'}).join('')+'</div>'}

function sizeStr(o){return o.w+'+'+o.g+'+'+o.g+' x '+o.h+' cm'}
var PHOTOS={atlet:null};
var INKS=[['Lacivert','#2B3787'],['Siyah','#1E1E1E'],['Beyaz','#FFFFFF'],['Kırmızı','#C62828'],['Yeşil','#2E7D32'],['Mavi','#1565C0'],['Altın','#B08A2E']];
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
 atlet:'<path d="M8 43L9.5 17 11.5 5h7l.7 9c1.3 7 8.3 7 9.6 0l.7-9h7l2 12L38.5 43z"/><path d="M11.5 10h7M29.5 10h7M8.5 39h30" opacity=".5"/>',
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
  var rv=document.querySelectorAll('.sec .h2, .sec .eyebrow, .card, .cat, .dcard, .mapwrap, .faq, .cta, .dstage, .dctl, .qform');
  Array.prototype.forEach.call(rv,function(el){var sib=el.parentNode?Array.prototype.indexOf.call(el.parentNode.children,el):0;el.classList.add('rv');el.style.transitionDelay=Math.min(sib,6)*60+'ms'});
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});
  Array.prototype.forEach.call(rv,function(el){io.observe(el)});
  var co=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;co.unobserve(e.target);var el=e.target,to=+el.getAttribute('data-to'),fr=+(el.getAttribute('data-from')||0),t0=null;
    function step(ts){if(!t0)t0=ts;var p=Math.min(1,(ts-t0)/1400);p=1-Math.pow(1-p,3);el.textContent=Math.round(fr+(to-fr)*p);if(p<1)requestAnimationFrame(step)}requestAnimationFrame(step)})},{threshold:.6});
  Array.prototype.forEach.call(document.querySelectorAll('.count'),function(el){co.observe(el)});
}

/* ---------- her an erişilebilen Teklif Al paneli ---------- */
(function(){var qt=$('#qtab'),qp=$('#qpop');if(!qt||!qp)return;
  var hero=$('.asist'),closed=false;try{closed=sessionStorage.getItem('eprQ')==='0'}catch(e){}
  function open(v){qp.classList.toggle('show',v);qt.setAttribute('aria-expanded',v);qt.classList.toggle('hide',v);if(window.innerWidth<=760)document.documentElement.style.overflow=v?'hidden':''}
  function vis(){var past=!hero||hero.getBoundingClientRect().bottom<0;qt.classList.toggle('in',past);if(window.innerWidth>760){if(!past){qp.classList.remove('show');qt.classList.remove('hide')}else if(!closed&&window.innerWidth>=1880&&!qp.classList.contains('show')&&!qp._shown){qp._shown=1;open(true)}}}
  qt.addEventListener('click',function(){open(true)});
  document.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('[data-qclose]')){open(false);closed=true;try{sessionStorage.setItem('eprQ','0')}catch(x){}}});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&qp.classList.contains('show'))open(false)});
  window.addEventListener('scroll',vis,{passive:true});window.addEventListener('resize',vis);vis();
  Array.prototype.forEach.call(document.querySelectorAll('.mbar .pri'),function(a){a.addEventListener('click',function(e){e.preventDefault();open(true)})});
})();

var EP=window.EPR_P||[];var EMRE=/^\S+@\S+\.\S+$/;var NOTICE='<div class="pnote" role="note"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 8h.01M11 12h1v5h1"/></svg><span><b>Bu bir önizlemedir.</b> Görseller temsilidir; nihai tasarım, renk tonları ve baskı yerleşimi sipariş aşamasında tasarım ekibimizle birlikte netleştirilir.</span></div>';function purlOf(name){for(var i=0;i<EP.length;i++)if(EP[i][0]===name)return R+EP[i][1];return R+'urunler/'}
/* dil seçici */
Array.prototype.forEach.call(document.querySelectorAll('.langsw'),function(w){var b=w.querySelector('.langbtn'),m=w.querySelector('.langmenu');
  b.addEventListener('click',function(e){e.stopPropagation();m.hidden=!m.hidden;b.setAttribute('aria-expanded',!m.hidden)});
  m.addEventListener('click',function(e){var a=e.target.closest('a');if(a){e.preventDefault();if(a.classList.contains('soon')){a.classList.add('flash');setTimeout(function(){a.classList.remove('flash')},900)}else m.hidden=true}});
  document.addEventListener('click',function(){m.hidden=true;b.setAttribute('aria-expanded',false)})});
/* yatay kaydırıcı (ok + sürükleme) */
function slider(root){if(!root||root._s)return;root._s=1;var tr=root.querySelector('.strack'),pv=root.querySelector('.sprev2'),nx=root.querySelector('.snext');
  function step(){var c=tr.querySelector('.sitem');return c?c.getBoundingClientRect().width+16:300}
  function upd(){if(pv)pv.disabled=tr.scrollLeft<4;if(nx)nx.disabled=tr.scrollLeft+tr.clientWidth>=tr.scrollWidth-4}
  pv&&pv.addEventListener('click',function(){tr.scrollBy({left:-step(),behavior:'smooth'})});nx&&nx.addEventListener('click',function(){tr.scrollBy({left:step(),behavior:'smooth'})});
  var dn=false,sx=0,sl=0,moved=false;tr.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;dn=true;moved=false;sx=e.clientX;sl=tr.scrollLeft;tr.classList.add('drag')});
  window.addEventListener('pointermove',function(e){if(!dn)return;var d=e.clientX-sx;if(Math.abs(d)>4)moved=true;tr.scrollLeft=sl-d});
  window.addEventListener('pointerup',function(){if(!dn)return;dn=false;tr.classList.remove('drag')});
  tr.addEventListener('click',function(e){if(moved){e.preventDefault();e.stopPropagation();moved=false}},true);
  tr.addEventListener('scroll',upd,{passive:true});window.addEventListener('resize',upd);root._upd=upd;upd()}
Array.prototype.forEach.call(document.querySelectorAll('.relic'),function(el){var k=el.getAttribute('data-ic');if(IC[k])el.innerHTML=icon(k,30)});
var P=[['Atlet Poşet','Mağaza','market, hışır, alışveriş, bakkal'],['El Geçmeli Poşet','Mağaza','butik, giyim, mağaza'],['Kulplu Poşet','Mağaza','ayakkabı, kutu, tekstil'],['Kargo Poşeti','Mağaza','e-ticaret, gönderi, kurye'],
['Rulo Manav Poşeti','Gıda','manav, meyve, sebze, pazar'],['Bakliyat Poşeti','Gıda','pirinç, mercimek, kuru gıda'],['Plast Kağıt','Gıda','kasap, şarküteri, peynir'],['Koli-Kasa Poşeti','Gıda','kasa, koli içi, toptan'],['Ekmek Poşeti','Gıda','fırın, pastane, simit'],['Dondurma-Buz Poşeti','Gıda','buz, dondurma, soğuk'],
['Kuru Temizleme Poşeti','Tekstil ve Temizlik','askı, elbise, ütü'],['Halı Poşeti','Tekstil ve Temizlik','halı yıkama, rulo'],['OPP-CPP Torba','Tekstil ve Temizlik','şeffaf, gömlek, ürün paketleme'],['OPP-CPP Bantlı Torba','Tekstil ve Temizlik','yapışkan, bantlı, şeffaf'],['OPP-Film Bobin','Tekstil ve Temizlik','bobin, makine'],['Jelatin','Tekstil ve Temizlik','ambalaj, sarma'],['Taşıma Torbası','Tekstil ve Temizlik','çamaşır, büyük torba'],
['Torba','Endüstriyel','sanayi, depo'],['Bantlı Torba','Endüstriyel','yapışkan kapama'],['Bardak Poşeti','Endüstriyel','karton bardak, tek kullanımlık'],['Fermuarlı Kilitli Torba','Endüstriyel','ziplock, fermuar'],['Kilitli Torba','Endüstriyel','buzdolabı, kilitli, numune'],['Oto Lastik Poşeti','Endüstriyel','lastik, otomotiv, depolama'],['Film (Bobin)','Endüstriyel','streç, bobin']];
/* ---------- menü (niyete göre) ---------- */
(function(){var xb=$('#xbtn'),xm=$('#xmenu');if(!xb||!xm)return;
  Array.prototype.forEach.call(xm.querySelectorAll('[data-ic]'),function(el){var k=el.getAttribute('data-ic');if(IC[k])el.innerHTML=icon(k,26)});
  function open(o){if(o){var wide=window.innerWidth>900,its=xm.querySelectorAll('.xi');Array.prototype.forEach.call(its,function(x,i){var on=wide&&(i===0||x.classList.contains('on'))&&(i===0?!xm.querySelector('.xi.on:not([data-xi="0"])'):true);x.classList.toggle('on',!!on);x.querySelector('.xh').setAttribute('aria-expanded',!!on)});if(wide&&!xm.querySelector('.xi.on')){its[0].classList.add('on');its[0].querySelector('.xh').setAttribute('aria-expanded',true)}}xm.hidden=!o;xb.setAttribute('aria-expanded',o);document.documentElement.style.overflow=o?'hidden':'';document.body.classList.toggle('xopen',o);if(o){var f=xm.querySelector('.xclose');f&&f.focus({preventScroll:true})}else xb.focus()}
  xb.addEventListener('click',function(){open(xm.hidden)});
  xm.addEventListener('click',function(e){if(e.target.closest('[data-xclose]')){open(false);return}var a=e.target.closest('a');if(a&&a.getAttribute('href')!=='#'){open(false);return}if(a)e.preventDefault();
    var h=e.target.closest('.xh');if(!h)return;var it=h.parentNode,wide=window.innerWidth>900;
    Array.prototype.forEach.call(xm.querySelectorAll('.xi'),function(x){var on=x===it?(wide?true:!x.classList.contains('on')):false;x.classList.toggle('on',on);x.querySelector('.xh').setAttribute('aria-expanded',on)})});
  xm.addEventListener('mouseover',function(e){if(window.innerWidth<=900)return;var h=e.target.closest('.xh');if(!h||h.parentNode.classList.contains('on'))return;var it=h.parentNode;
    Array.prototype.forEach.call(xm.querySelectorAll('.xi'),function(x){x.classList.toggle('on',x===it);x.querySelector('.xh').setAttribute('aria-expanded',x===it)})});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!xm.hidden)open(false)});
})();
/* ---------- site içi arama ---------- */
(function(){var q=$('#gq'),res=$('#gres'),box=$('.gsearch'),sb=$('#gsbtn');if(!q)return;
  var SECN=[['market','Market ve mağaza'],['firin','Fırın ve pastane'],['manav','Manav ve pazar'],['gida','Gıda üreticisi'],['eticaret','E-ticaret ve kargo'],['kt','Kuru temizleme'],['hali','Halı yıkama'],['tekstil','Tekstil ve hazır giyim'],['sanayi','Sanayi ve otomotiv']];
  var PAGES=[['Poşet Asistanı','teklif al fiyat öneri tasarım',ASIST,'Sayfa'],['Ürün kataloğu','pdf katalog indir','https://eprati.com/wp-content/uploads/2022/12/EPRAT%C4%B0-PLAST%C4%B0K-%C3%9CR%C3%9CN-KATALO%C4%9EU-2022.pdf','Sayfa'],['Sıkça sorulan sorular','sss soru ölçü gıda belge minimum teslim',R+'sss/','Sayfa'],['Hakkımızda','hakkımızda kurumsal vizyon misyon tarihçe fabrika üretim',R+'hakkimizda/','Kurumsal'],['Sertifikalarımız','sertifika belge iso 45001 gıda tescil kalite',R+'sertifikalarimiz/','Kurumsal'],['Referanslar','referans müşteri marka örnek iş',R+'referanslar/','Kurumsal'],['İletişim','iletişim adres harita konum yol tarifi form mesaj çalışma saatleri',R+'iletisim/','İletişim'],['Tüm ürünler','ürünler liste hepsi katalog',R+'urunler/','Sayfa'],['KVKK','kvkk kişisel veri gizlilik aydınlatma',R+'kvkk/','Yasal'],['Çerez politikası','çerez cookie',R+'cerez-politikasi/','Yasal'],['Kargo poşeti satın al (Eldora)','kargo poşeti satın al online sipariş mağaza eldora hazır stok e-ticaret','https://www.eldora.com.tr/','Mağaza ↗'],['Fabrikamız','tesis üretim fabrika',HOME+'#kurumsal','Sayfa'],['İhracat','yurt dışı ihracat ülke alibaba export',HOME+'#ihracat','Sayfa'],['WhatsApp','whatsapp mesaj iletişim','https://wa.me/905357183598','İletişim'],['Telefon','telefon ara iletişim','tel:+902126516669','İletişim']];
  var CATN={'magaza-ambalajlari':'Mağaza','gida-ambalajlari':'Gıda','tekstil-ve-temizlik-ambalajlari':'Tekstil ve Temizlik','endustriyel-ambalajlar':'Endüstriyel'};
  var IDX=EP.map(function(e){var kw=(find(P,e[0])||[0,0,''])[2];return {t:e[0],k:low(e[0]+' '+kw+' '+CATN[e[2]]),u:R+e[1],g:'Ürün · '+CATN[e[2]],ic:e[3]}})
    .concat(SECN.map(function(x){return {t:x[1],k:low(x[1]+' sektör'),u:ASIST+'?sektor='+x[0],g:'Sektör · asistanla başla',ic:null}}))
    .concat(PAGES.map(function(x){return {t:x[0],k:low(x[0]+' '+x[1]),u:x[2],g:x[3],ic:null}}));
  var sel=-1,cur=[];
  function run(){var v=low(q.value.trim());if(!v){res.hidden=true;return}var ws=v.split(/\s+/).filter(function(w){return w.length>1});
    cur=IDX.map(function(it){var n=low(it.t),sc=0;if(n.indexOf(v)===0)sc+=100;else if(n.indexOf(v)>=0)sc+=60;else if(it.k.indexOf(v)>=0)sc+=30;ws.forEach(function(w){if(n.indexOf(w)>=0)sc+=10;else if(it.k.indexOf(w)>=0)sc+=4});return [sc,it]}).filter(function(x){return x[0]>0}).sort(function(a,b){return b[0]-a[0]}).slice(0,7).map(function(x){return x[1]});
    sel=-1;res.innerHTML=cur.length?cur.map(function(it,i){return '<a href="'+it.u+'" data-gi="'+i+'"><span class="gric">'+(it.ic&&IC[it.ic]?icon(it.ic,22):'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>')+'</span><span><b>'+esc(it.t)+'</b><small>'+esc(it.g)+'</small></span></a>'}).join('')+'<a class="gall" href="'+ASIST+'">Aradığınızı bulamadınız mı? <b>Poşet Asistanı size önersin →</b></a>'
      :'<div class="gnone">Sonuç bulunamadı. <a href="'+ASIST+'">Poşet Asistanı</a> birkaç soruyla size uygun olanı önersin.</div>';res.hidden=false}
  function mark(){Array.prototype.forEach.call(res.querySelectorAll('[data-gi]'),function(a,i){a.classList.toggle('sel',i===sel)})}
  q.addEventListener('input',run);q.addEventListener('focus',function(){if(q.value)run()});
  q.addEventListener('keydown',function(e){if(e.key==='ArrowDown'){sel=Math.min(cur.length-1,sel+1);mark();e.preventDefault()}else if(e.key==='ArrowUp'){sel=Math.max(0,sel-1);mark();e.preventDefault()}else if(e.key==='Enter'){var it=cur[sel<0?0:sel];if(it)location.href=it.u}else if(e.key==='Escape'){res.hidden=true;q.blur();document.body.classList.remove('sopen')}});
  document.addEventListener('click',function(e){if(!e.target.closest('.gsearch')&&!e.target.closest('#gsbtn')){res.hidden=true;document.body.classList.remove('sopen')}});
  document.addEventListener('keydown',function(e){if(e.key==='/'&&!/input|textarea|select/i.test(document.activeElement.tagName)){e.preventDefault();q.focus()}});
  sb&&sb.addEventListener('click',function(){document.body.classList.toggle('sopen');if(document.body.classList.contains('sopen'))setTimeout(function(){q.focus()},50)});
})();
/* demo formlar + harita */
Array.prototype.forEach.call(document.querySelectorAll('form[data-demoform]'),function(fm){
  fm.addEventListener('submit',function(e){e.preventDefault();var bad=[],first=null;
    Array.prototype.forEach.call(fm.querySelectorAll('[required]'),function(el){var ok=el.type==='checkbox'?el.checked:(el.value.trim()!==''&&(el.type!=='email'||/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value.trim())));
      if(el.type==='checkbox')el.closest('.cbx').classList.toggle('err',!ok);else el.classList.toggle('err',!ok);if(!ok){bad.push(el);if(!first)first=el}});
    var er=fm.querySelector('.ferr');if(bad.length){er.textContent='Lütfen işaretli alanları kontrol edin.';first.focus();return}
    er.textContent='';var b=fm.querySelector('button[type=submit]');if(b){b.disabled=true;b.textContent='Gönderildi ✓'}var ok=fm.querySelector('.fok');if(ok){ok.hidden=false;ok.scrollIntoView({block:'nearest',behavior:'smooth'})}});
  fm.addEventListener('input',function(e){var t=e.target;if(t.classList.contains('err'))t.classList.remove('err');var c=t.closest('.cbx');if(c)c.classList.remove('err')});
});
Array.prototype.forEach.call(document.querySelectorAll('[data-loadmap]'),function(b){b.addEventListener('click',function(){var box=b.closest('.mapbox');box.innerHTML='<iframe title="Eprati Plastik konum haritası" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="'+b.getAttribute('data-loadmap')+'"></iframe>'})});
Array.prototype.forEach.call(document.querySelectorAll('.audi'),function(el){var k=el.getAttribute('data-ic');if(IC[k])el.innerHTML=icon(k,34)});
Array.prototype.forEach.call(document.querySelectorAll('[data-copy]'),function(b){b.addEventListener('click',function(){var v=b.getAttribute('data-copy'),done=function(){b.textContent='Kopyalandı ✓';setTimeout(function(){b.textContent='Kopyala'},1800)};
  if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(v).then(done,function(){})}else{var t=document.createElement('textarea');t.value=v;document.body.appendChild(t);t.select();try{document.execCommand('copy');done()}catch(e){}document.body.removeChild(t)}})});
(function(){var lb=$('#lb');if(!lb)return;var items=[],seen={},cur=0,last=null;
  Array.prototype.forEach.call(document.querySelectorAll('[data-lb]'),function(b){var i=+b.getAttribute('data-lb');if(!seen[i]){seen[i]=1;items[i]={t:b.getAttribute('data-t'),s:b.getAttribute('data-s'),img:b.getAttribute('data-img')}}
    b.addEventListener('click',function(){last=b;show(i)})});
  function show(i){cur=(i+items.length)%items.length;var it=items[cur];$('#lbt').textContent=it.t;$('#lbs').textContent=it.s;$('#lbn').textContent=(cur+1)+' / '+items.length;
    $('#lbimg').innerHTML=it.img?'<img src="'+R+'assets/sertifikalar/'+it.img+'" alt="'+esc(it.t)+'">':'<div class="lbph"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/></svg><b>Belge görseli henüz eklenmedi</b><span>Bir kopyasını isterseniz satis@eprati.com adresine yazın.</span></div>';
    if(lb.hidden){lb.hidden=false;document.body.classList.add('lbopen');lb.querySelector('.lbx').focus()}}
  function close(){lb.hidden=true;document.body.classList.remove('lbopen');if(last)last.focus()}
  lb.addEventListener('click',function(e){if(e.target.closest('[data-lbclose]'))close();var g=e.target.closest('[data-lbgo]');if(g)show(cur+(+g.getAttribute('data-lbgo')))});
  document.addEventListener('keydown',function(e){if(lb.hidden)return;if(e.key==='Escape')close();else if(e.key==='ArrowRight')show(cur+1);else if(e.key==='ArrowLeft')show(cur-1)});
})();
Array.prototype.forEach.call(document.querySelectorAll('.pcic'),function(el){var k=el.getAttribute('data-ic');if(IC[k])el.innerHTML=icon(k,40)});

/* ---------- geri bildirim ---------- */
(function(){var K='eprFb';try{if(localStorage.getItem(K))return}catch(e){}
  var shown=false,t0=Date.now();
  var el=document.createElement('div');el.className='fb';el.setAttribute('role','dialog');el.setAttribute('aria-label','Geri bildirim');
  el.innerHTML='<button type="button" class="fbx" aria-label="Kapat">×</button><div class="fb1"><b>Yeni sitemizi beğendiniz mi?</b><div class="fbst" role="radiogroup" aria-label="Puan">'+[1,2,3,4,5].map(function(i){return '<button type="button" role="radio" aria-checked="false" data-r="'+i+'" aria-label="'+i+' yıldız">★</button>'}).join('')+'</div><small>Görüşünüz yeni siteyi geliştirmemize yardımcı olur.</small></div>'+
    '<div class="fb2" hidden><b class="fbt"></b><textarea rows="3" maxlength="500" placeholder="İsterseniz birkaç kelime yazın (isteğe bağlı)" aria-label="Yorumunuz"></textarea><div class="fbr"><button type="button" class="fbskip">Geç</button><button type="button" class="btn fbsend">Gönder</button></div></div>'+
    '<div class="fb3" hidden><b>Teşekkür ederiz!</b><small>Geri bildiriminiz bize ulaştı.</small></div>';
  var rate=0;function done(v){try{localStorage.setItem(K,JSON.stringify(v))}catch(e){}}
  function close(){el.classList.remove('in');setTimeout(function(){el.remove()},300)}
  el.addEventListener('mouseover',function(e){var b=e.target.closest('[data-r]');if(!b)return;var r=+b.getAttribute('data-r');Array.prototype.forEach.call(el.querySelectorAll('[data-r]'),function(x){x.classList.toggle('hv',+x.getAttribute('data-r')<=r)})});
  el.addEventListener('mouseout',function(){Array.prototype.forEach.call(el.querySelectorAll('[data-r]'),function(x){x.classList.remove('hv')})});
  el.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;
    if(b.classList.contains('fbx')){done({dismissed:true,at:Date.now()});close();return}
    if(b.hasAttribute('data-r')){rate=+b.getAttribute('data-r');Array.prototype.forEach.call(el.querySelectorAll('[data-r]'),function(x){var on=+x.getAttribute('data-r')<=rate;x.classList.toggle('on',on);x.setAttribute('aria-checked',+x.getAttribute('data-r')===rate)});
      setTimeout(function(){el.querySelector('.fb1').hidden=true;el.querySelector('.fb2').hidden=false;el.querySelector('.fbt').textContent=rate>=4?'Çok sevindik! Neyi beğendiniz?':rate===3?'Teşekkürler! Neyi geliştirelim?':'Üzgünüz. Neyi daha iyi yapabiliriz?';el.querySelector('textarea').focus()},250);return}
    if(b.classList.contains('fbsend')||b.classList.contains('fbskip')){var txt=b.classList.contains('fbsend')?el.querySelector('textarea').value.trim():'';
      done({rating:rate,comment:txt,page:location.pathname,at:Date.now()});/* gerçek sitede WordPress'e gönderilecek */
      el.querySelector('.fb2').hidden=true;el.querySelector('.fb3').hidden=false;setTimeout(close,2200)}});
  function show(){if(shown)return;shown=true;document.body.appendChild(el);requestAnimationFrame(function(){el.classList.add('in')})}
  function check(){if(shown)return;var sc=(window.pageYOffset+window.innerHeight)/document.documentElement.scrollHeight;if(Date.now()-t0>40000&&sc>.45)show()}
  window.addEventListener('scroll',check,{passive:true});setInterval(check,5000);
  document.addEventListener('epr:done',function(){setTimeout(show,1500)});
})();
if($('#pg-home')){
/* ---------- ana sayfa ---------- */

var ara=$('#ara'), sres=$('#sres');
function doSearch(){
  var q=low(ara.value.trim()); if(!q){sres.hidden=true;return}
  var words=q.split(' ').filter(function(w){return w.length>2});
  var r=P.map(function(p){var n=low(p[0]),t=low(p[0]+' '+p[2]),sc=0;if(n.indexOf(q)===0)sc+=100;else if(n.indexOf(q)>=0)sc+=60;else if(t.indexOf(q)>=0)sc+=30;
      words.forEach(function(w){if(n.indexOf(w)>=0)sc+=10;else if(t.indexOf(w)>=0)sc+=4});return [sc,p]}).filter(function(x){return x[0]>0}).sort(function(a,b){return b[0]-a[0]}).slice(0,5).map(function(x){return x[1]});
  sres.innerHTML=r.length?r.map(function(p){return '<a href="'+purlOf(p[0])+'"><span><b style="font-weight:600">'+esc(p[0])+'</b><small>'+esc(p[1])+' · '+esc(p[2].split(',')[0])+'</small></span><span style="color:#24803A;font-weight:600;font-size:13px">Gör →</span></a>'}).join('')
    :'<div style="padding:12px;font-size:14px;color:#4D5170">Tam eşleşme bulamadık. <a href="'+ASIST+'">Poşet Asistanı</a> birkaç soruyla size uygun olanı önersin.</div>';
  sres.hidden=false;
}
ara.addEventListener('input',doSearch);
document.addEventListener('click',function(e){if(!e.target.closest||!e.target.closest('.search'))sres.hidden=true});
['Market poşeti','Ekmek poşeti','Kargo poşeti','Kilitli torba'].forEach(function(l){
  var b=document.createElement('button');b.type='button';b.textContent=l;
  b.onclick=function(e){e.stopPropagation();ara.value=l.split(' ')[0];doSearch();ara.focus()};$('#chips').appendChild(b)});
$('#minigrid').innerHTML=[['market','atlet','Market ve mağaza'],['firin','ekmek','Fırın ve pastane'],['manav','rulo','Manav ve pazar'],['eticaret','kargo','E-ticaret ve kargo'],['kt','aski','Kuru temizleme ve halı'],['sanayi','lastik','Sanayi ve otomotiv']].map(function(s){return '<a href="'+ASIST+'?sektor='+s[0]+'"><span class="mi">'+icon(s[1],22)+'</span>'+s[2]+'</a>'}).join('');
$('#sectors').innerHTML=[['atlet','#E8F3E3','Market ve Mağaza','Atlet, el geçmeli, kulplu poşet'],['ekmek','#F3EFE6','Fırın ve Pastane','Ekmek, el geçmeli, rulo manav ve kulplu poşet'],['rulo','#E6EAF7','Manav ve Pazar','Rulo manav poşeti, atlet poşet'],['bakliyat','#E8F3E3','Gıda Üreticisi','Bakliyat, koli-kasa, dondurma-buz poşeti'],['kargo','#F3EFE6','E-ticaret ve Kargo','Kargo poşeti, bantlı torba'],['aski','#E6EAF7','Kuru Temizleme ve Halı','Kuru temizleme poşeti, halı poşeti'],['opp','#E8F3E3','Tekstil ve Hazır Giyim','OPP-CPP torba, jelatin, taşıma torbası'],['lastik','#F3EFE6','Sanayi ve Otomotiv','Kilitli torba, oto lastik poşeti, film bobin']]
  .map(function(s,i){return '<a class="card sector" href="'+ASIST+'?sektor='+['market','firin','manav','gida','eticaret','kt','tekstil','sanayi'][i]+'"><span class="badge" style="background:'+s[1]+'">'+icon(s[0],34)+'</span><b>'+s[2]+'</b><span class="muted" style="font-size:14px">'+s[3]+'</span></a>'}).join('');
var CATD=[['magaza-ambalajlari','Mağaza Ambalajları','#E8F3E3'],['gida-ambalajlari','Gıda Ambalajları','#F3EFE6'],['tekstil-ve-temizlik-ambalajlari','Tekstil ve Temizlik','#E6EAF7'],['endustriyel-ambalajlar','Endüstriyel Ambalajlar','#EEF1EC']];
$('#cats').innerHTML=CATD.map(function(c){var ps=EP.filter(function(p){return p[2]===c[0]}),ics=[];ps.forEach(function(p){if(ics.indexOf(p[3])<0&&ics.length<4)ics.push(p[3])});
  return '<div class="cat" style="background:'+c[2]+'"><h3 style="font-size:20px;margin:0 0 14px">'+c[1]+'</h3><div class="tags">'+ps.map(function(p){return '<a href="'+R+p[1]+'">'+esc(p[0])+'</a>'}).join('')+'</div><div class="collage" aria-hidden="true">'+ics.map(function(k,i){return '<span style="transform:rotate('+[-6,4,-3,6][i]+'deg)">'+icon(k,40)+'</span>'}).join('')+'</div></div>'}).join('');
var REFS=(__REFS__).map(function(r){return {ad:r.ad,img:R+'assets/refs/'+r.f}});
function tile(r){return '<div class="logo-tile" title="'+esc(r.ad)+'">'+(r.img?'<img src="'+r.img+'" alt="'+esc(r.ad)+'">':esc(r.ad))+'</div>'}
var h1=REFS.filter(function(r,i){return i%2===0}),h2=REFS.filter(function(r,i){return i%2===1});var r1=h1.map(tile).join(''), r2=h2.map(tile).join('');
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

/* yaptığımız işler + renk ipuçları */
var WORKS=[
 {id:'atlet',ad:'Atlet Poşet',mus:'ŞOK Market',info:'Sarı zemin · 2 renk baskı',lab:'Zemin rengi',alt:'ŞOK Market için üretilen sarı zeminli, 2 renk baskılı atlet poşet',
  v:[['sari','Sarı','#F2CF1D','Sarı zemin üzerinde siyah ve kırmızı baskı uzaktan bile okunur; market poşetinde en dikkat çekici kombinasyonlardan biri.'],
     ['beyaz','Beyaz','#F6F6F4','Beyaz zemin her baskı rengiyle uyumludur; kırmızı baskı daha da canlı görünür.'],
     ['yesil','Yeşil','#46A055','Orta tonlu zeminde siyah baskı biraz kaybolabilir; bu zeminde beyaz baskı daha net okunur.'],
     ['mavi','Mavi','#286EC8','Mavi zeminde siyah yazı zor okunur; beyaz ya da sarı baskı önerilir.']]},
 {id:'kulplu',ad:'Kulplu Poşet',mus:'İpek Pişmaniye',info:'Beyaz zemin · kırmızı kulp · çok renkli baskı',lab:'Kulp rengi',alt:'İpek Pişmaniye için kırmızı kulplu, çizgili baskılı kulplu poşet tasarımı',
  v:[['kirmizi','Kırmızı','#D51F26','Baskınız kırmızı ise kırmızı kulp tasarımı bütünleştirir; markanız daha güçlü görünür.'],
     ['lacivert','Lacivert','#2B3787','Kırmızı baskıyla lacivert kulp kontrast yaratır; kurumsal ve klasik bir görünüm verir.'],
     ['yesil','Yeşil','#33964A','Kırmızı ve yeşil yan yana yorucu durabilir; kulp rengini baskıdaki bir renkle eşlemek daha dengeli olur.'],
     ['altin','Altın','#BE963C','Logodaki altın çerçeveyle uyumlu; tatlı, şarküteri ve hediyelik ürünlerde şık durur.']]},
 {id:'elgecme',ad:'El Geçmeli Poşet',mus:'Turkish Support Services',info:'Beyaz zemin · 2 renk baskı',lab:'Zemin rengi',alt:'Turkish Support Services için beyaz zeminli, 2 renk baskılı el geçmeli poşet',
  v:[['beyaz','Beyaz','#F6F6F4','Beyaz zemin logonuzun renklerini olduğu gibi gösterir; kurumsal işlerde en güvenli seçim.'],
     ['krem','Krem','#F0E4C8','Krem zemin daha sıcak ve doğal bir his verir; siyah baskı rahat okunur.'],
     ['sari','Sarı','#F4D03F','Sarı zemin dikkat çeker; siyah baskıyla çok iyi okunur, kırmızı da canlı kalır.'],
     ['yesil','Açık yeşil','#78BE78','Açık yeşil zemin doğa dostu bir izlenim verir; koyu renkli baskıyla en iyi sonucu alırsınız.']]}
];
var IMG=R+'assets/isler/';
$('#works').innerHTML=WORKS.map(function(w){var v0=w.v[0];return '<article class="work sitem">'+
  '<div class="wimg"><img src="'+IMG+w.id+'-'+v0[0]+'.webp" alt="'+esc(w.alt)+'" loading="lazy" draggable="false"></div>'+
  '<div class="wbody"><span class="wtag">'+esc(w.ad)+'</span><h3>'+esc(w.mus)+'</h3><p class="muted">'+esc(w.info)+'</p></div></article>'}).join('')+
  [['kargo','Kargo Poşeti'],['ekmek','Ekmek Poşeti'],['aski','Kuru Temizleme Poşeti']].map(function(x){return '<article class="work sitem soonw"><div class="wimg">'+icon(x[0],72,'#9AA3C4')+'</div><div class="wbody"><span class="wtag" style="background:#EEF1F8;color:#4D5170">'+x[1]+'</span><h3>Yeni iş örneği</h3><p class="muted">Yakında eklenecek</p></div></article>'}).join('');
slider($('#workslider'));

/* fabrika videosu: yakına gelince yükle, masaüstünde, hareket azaltılmamışsa */
(function(){var bg=$('#fvbg');if(!bg)return;var id=bg.getAttribute('data-vid');
  function load(){if(bg._ok||window.innerWidth<760||calm)return;bg._ok=1;var f=document.createElement('iframe');
    f.src='https://www.youtube-nocookie.com/embed/'+id+'?autoplay=1&mute=1&controls=0&loop=1&playlist='+id+'&playsinline=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1';
    f.title='Eprati fabrika videosu';f.tabIndex=-1;f.setAttribute('allow','autoplay; encrypted-media');f.setAttribute('loading','lazy');f.onload=function(){setTimeout(function(){bg.classList.add('playing')},1200)};bg.appendChild(f)}
  if('IntersectionObserver' in window){var o=new IntersectionObserver(function(es){if(es[0].isIntersecting){load();o.disconnect()}},{rootMargin:'300px'});o.observe(bg)}else load()})();
$('#cvicons')&&($('#cvicons').innerHTML=['atlet','kulplu','elgecme','rulo','kilitli','bobin'].map(function(k){return '<span>'+icon(k,30,'#fff')+'</span>'}).join(''));
/* nasıl teklif alınır: döngüsel önizleme */
(function(){var cv=$('#tkcv');if(!cv)return;var seq=[['atlet','Beyaz',null,'#2B3787'],['atlet','Sarı',null,'#1E1E1E'],['kulplu','Kırmızı','Sarı','#FFFFFF'],['elgecme','Lacivert',null,'#FFFFFF'],['kulplu','Beyaz','Siyah','#2B3787'],['atlet','Yeşil',null,'#FFFFFF']],i=0,tm=null;
  var nm={atlet:'atlet',kulplu:'kulplu',elgecme:'el geçmeli'};
  function show(){var q=seq[i%seq.length];cv.classList.remove('in');setTimeout(function(){drawMock(cv,q[0],find(BODY,q[1])[1],find(HANDLE,q[2]||'Siyah')[1],[{c:placeholderLogo(q[3]),k:'logo'}]);cv.classList.add('in');$('#tkchip').textContent=q[1]+' '+nm[q[0]]+' poşet'+(q[2]?' · '+q[2].toLocaleLowerCase('tr')+' kulp':'')},calm?0:250);i++}
  show();if(calm)return;var run=false;
  if('IntersectionObserver' in window)new IntersectionObserver(function(es){var v=es[0].isIntersecting;if(v&&!run){run=true;tm=setInterval(show,2600)}else if(!v&&run){run=false;clearInterval(tm)}}).observe(cv)})();
}
if($('#pg-asistan')){
/* ---------- asistan ---------- */
var A={au:{tab:'yeni',email:'',pass:'',kvkk:false,sent:false,code:'',demo:'',err:''},step:0,sector:null,content:null,handle:null,size:null,print:null,color:'Beyaz',kulp:'Siyah',logoImg:null,logoCol:null,ink:'Otomatik',pt:{firma:'',slogan:'',tel:'',adres:'',web:''},unit:'adet',w:30,g:10,h:60,name:'',phone:'',file:'',tried:false};
var SEC=[['market','Market ve Mağaza','Bakkal, market, butik','Atlet Poşet'],['firin','Fırın ve Pastane','Ekmek, simit, pasta','Ekmek Poşeti'],['manav','Manav ve Pazar','Meyve, sebze','Rulo Manav Poşeti'],['gida','Gıda Üreticisi','Bakliyat, kuru gıda, buz','Bakliyat Poşeti'],['eticaret','E-ticaret ve Kargo','Online satış, gönderi','Kargo Poşeti'],['kt','Kuru Temizleme','Askılı kıyafet','Kuru Temizleme Poşeti'],['hali','Halı Yıkama','Halı ve kilim','Halı Poşeti'],['tekstil','Tekstil ve Hazır Giyim','Ürün paketleme','OPP-CPP Torba'],['sanayi','Sanayi ve Otomotiv','Parça, lastik, depolama','Kilitli Torba']];
var CON=[['hafif','Hafif ürünler','Giyim, aksesuar, kozmetik'],['orta','Günlük alışveriş','Market ürünleri, karışık'],['agir','Ağır ürünler','Şişe, konserve, bakliyat'],['gida','Doğrudan gıda','Ekmek, meyve, açık gıda'],['soguk','Soğuk veya donuk','Buz, dondurma, donuk ürün'],['parca','Parça veya büyük eşya','Halı, lastik, yedek parça']];
var HAN=[['atlet','Atlet','M8 68L10 28L12 4H22L23 22C24 35 40 35 41 22L42 4H52L54 28L56 68ZM29 33V36H35V33M8 61H56'],['el','El geçmeli','M12 5H52V68H12ZM25 13H39A4 4 0 0 1 39 21H25A4 4 0 0 1 25 13Z'],['kulp','Kulplu','M8 27H56V68H8ZM22 27V17A10 10 0 0 1 42 17V27'],['sapsiz','Sapsız torba','M12 6H52V68H12ZM12 15H52'],['rulo','Rulo / bobin','M16 16h32v40H16zM16 16c-6 0-6 40 0 40M48 16c6 0 6 40 0 40'],['oneri','Siz önerin','M26 22a6 6 0 1 1 8 6c-2 1-2 3-2 6M32 42v2']];
var SIZ=[['kucuk','Küçük','Eczane, butik, tek ürün'],['orta','Orta','Günlük alışveriş'],['buyuk','Büyük','Battal, toplu taşıma'],['ozel','Özel ölçü','Ölçüyü ben gireceğim'],['bilmiyorum','Bilmiyorum','Siz önerin']];
var PRI=[['yok','Baskısız','En hızlı ve ekonomik'],['logo','1–3 renk logo','Logonuz ve iletişim bilgileriniz'],['foto','Çok renkli / fotoğraf','CMYK, tam renkli tasarım']];
var KEYS=['sector','content','handle','size','print'];
var ORDER=[0,2,3,4,5,6,7],VIS={0:0,2:1,3:2,4:3,5:4,6:4,7:5};function nxt(s){var i=ORDER.indexOf(s);return ORDER[Math.min(ORDER.length-1,i+1)]}function prv(s){var i=ORDER.indexOf(s);return ORDER[Math.max(0,i-1)]}
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
function mockId(){var m={atlet:'atlet',el:'elgecme',kulp:'kulplu'};if(m[A.handle])return m[A.handle];if(A.handle==='oneri'||!A.handle){var r=recommend();if(/^Atlet/.test(r))return 'atlet';if(/^El Geçmeli/.test(r))return 'elgecme';if(/^Kulplu/.test(r))return 'kulplu'}return null}
var AINKS=[['Otomatik','auto'],['Lacivert','#2B3787'],['Siyah','#1E1E1E'],['Beyaz','#FFFFFF'],['Kırmızı','#C62828'],['Yeşil','#2E7D32'],['Mavi','#1565C0'],['Altın','#B08A2E'],['Turuncu','#E8731F']];
/* ---- baskı editörü ---- */
var FONTS=[['Montserrat','800','Montserrat'],['Poppins','700','Poppins'],['Oswald','700','Oswald'],['Bebas Neue','400','Bebas Neue'],['Playfair Display','700','Playfair'],['Roboto Slab','700','Roboto Slab'],['Lobster','400','Lobster'],['Inter','600','Inter']];
var fontsAdded=false;function addFonts(){if(fontsAdded)return;fontsAdded=true;var l=document.createElement('link');l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700;800&family=Poppins:wght@500;700&family=Oswald:wght@500;700&family=Bebas+Neue&family=Playfair+Display:wght@700&family=Roboto+Slab:wght@500;700&family=Lobster&display=swap';document.head.appendChild(l)}
function fontW(f){return (find(FONTS,f)||FONTS[7])[1]}
function ensureFont(f,cb){if(!document.fonts||!document.fonts.load)return cb();document.fonts.load(fontW(f)+' 40px "'+f+'"','ŞĞİöç').then(function(){cb()},function(){cb()})}
/* poşet ölçüleri (en × boy, cm) ve fotoğraftaki ön yüz sınırları */
var BAGSZ={atlet:{kucuk:[20,35],orta:[25,45],buyuk:[30,60]},elgecme:{kucuk:[25,35],orta:[35,45],buyuk:[45,55]},kulplu:{kucuk:[40,30],orta:[49,35],buyuk:[54,40]}};
var FACE={atlet:{x0:.075,x1:.925,top:.008,cut:.25,bot:.975},elgecme:{x0:.025,x1:.975,top:.003,cut:.16,bot:.99},kulplu:{x0:.045,x1:.955,top:.185,cut:.31,bot:.965}};
function bagCm(mid){if(A.size==='ozel'&&A.w>0&&A.h>0)return [A.w,A.h];var t=BAGSZ[mid];return t[A.size]||t.orta}
/* güvenli baskı alanı (fotoğraf üzerinde, oransal) */
var SAFE={atlet:[.174,.437,.835,.904],elgecme:[.109,.283,.908,.913],kulplu:[.093,.387,.915,.889]};
function printArea(mid,M){var f=FACE[mid],cm=bagCm(mid),fw=(f.x1-f.x0)*M.w,ppc=fw/cm[0],r=SAFE[mid];
  var x0=r[0]*M.w,x1=r[2]*M.w,y0=r[1]*M.h,y1=r[3]*M.h;
  return {x0:x0,x1:x1,y0:y0,y1:y1,ppc:ppc,wcm:(r[2]-r[0])/(f.x1-f.x0)*cm[0],hcm:(r[3]-r[1])/(f.bot-f.top)*cm[1],cm:cm}}
A.els={logo:{y:.12,size:7,font:'',col:'Otomatik'},firma:{text:'',font:'Montserrat',size:4,col:'Otomatik',y:.33},slogan:{text:'',font:'Montserrat',size:1.5,col:'Otomatik',y:.47},iletisim:{text:'',font:'Inter',size:1.2,col:'Otomatik',y:.82},adres:{text:'',font:'Inter',size:1.3,col:'Otomatik',y:.94}};
A.sel='firma';A.adv=false;A.side='tek';A.face='on';A.showArea=true;A.F={on:A.els,arka:null};A.LG={on:null,arka:null};
function setFace(f){A.LG[A.face]=A.logoImg;A.face=f;if(!A.F[f]){A.F[f]=JSON.parse(JSON.stringify(A.F.on))}A.els=A.F[f];A.logoImg=A.LG[f]||null}
var SIDES=[['tek','Tek yüz','Sadece ön yüze baskı'],['ayni','Çift yüz · aynı','İki yüze aynı baskı'],['ayri','Çift yüz · ayrı','Ön ve arka farklı tasarım']];
var ELN=[['firma','Firma adı','ör. Yıldız Market','FİRMA ADI'],['slogan','Slogan','ör. Her zaman taze','Sloganınız'],['iletisim','Telefon / web','ör. 0212 000 00 00 · www.firma.com','0212 000 00 00 · www.firmaniz.com'],['adres','Adres','ör. Cumhuriyet Mah. Ekin Sk. No:5 Esenyurt / İstanbul','Adresiniz, İlçe / İl']];
var SZR={logo:[2,14],firma:[1.5,9],slogan:[.6,4],iletisim:[.5,3],adres:[.5,2.5]};
function elInk(k){var e=A.els[k];if(e.col!=='Otomatik')return find(AINKS,e.col)[1];var bg=find(BODY,A.color)[1];return ['#2B3787','#1E1E1E','#FFFFFF'].sort(function(a,b){return cr(bg,b)-cr(bg,a)})[0]}
function anyText(){return ELN.some(function(n){return A.els[n[0]].text})}
/* baskı katmanını oluştur: tuval + öğe kutuları */
function buildPrint(mid,M){var ar=printArea(mid,M),c=document.createElement('canvas');c.width=M.w;c.height=M.h;var x=c.getContext('2d'),boxes={},cx=(ar.x0+ar.x1)/2,aw=ar.x1-ar.x0,ah=ar.y1-ar.y0,ph=!anyText()&&!A.logoImg,items=[];
  /* 1) ölç */
  if(A.logoImg){var e=A.els.logo,lh=e.size*ar.ppc,lw=A.logoImg.naturalWidth*lh/A.logoImg.naturalHeight;if(lw>aw){lw=aw;lh=A.logoImg.naturalHeight*lw/A.logoImg.naturalWidth}items.push({k:'logo',w:lw,h:lh,img:true})}
  ELN.forEach(function(n){var k=n[0],e=A.els[k],t=e.text||(ph?n[3]:'');if(!t)return;var px=e.size*ar.ppc/0.72,FN=function(p){return fontW(e.font)+' '+p+'px "'+e.font+'",Inter,Arial,sans-serif'};x.font=FN(px);
    var lines=[t],w=x.measureText(t).width;
    if(((k==='adres'&&w>aw*.7)||(k==='iletisim'&&w>aw))&&t.length>1){var best=null,cands=[];for(var i=1;i<t.length;i++)if(t.charAt(i)===' ')cands.push([t.slice(0,i),t.slice(i+1)]);
      var tryC=function(cs){cs.forEach(function(c){var m=Math.max(x.measureText(c[0]).width,x.measureText(c[1]).width);if(!best||m<best[2])best=[c[0],c[1],m]})};tryC(cands);
      if(!best||best[2]>aw){var cc=[];for(var j=1;j<t.length;j++)cc.push([t.slice(0,j)+(t.charAt(j-1)!==' '&&t.charAt(j)!==' '?'-':''),t.slice(j).replace(/^ /,'')]);var keep=best;best=null;tryC(cc);if(keep&&keep[2]<=best[2]*1.08)best=keep}
      lines=[best[0].replace(/ $/,''),best[1]];w=best[2]}
    if(w>aw){px=px*aw/w;w=aw;e.fit=true}else e.fit=false;
    var lh=px*1.12;items.push({k:k,w:w,h:px*.95+(lines.length-1)*lh,px:px,lh:lh,lines:lines,font:FN(px)})});
  /* 2) yerleştir: istenen konum, sonra çakışmaları çöz, alana sığdır */
  var gap=ar.ppc*.5,tot=items.reduce(function(t,it){return t+it.h},0)+gap*Math.max(0,items.length-1);
  if(tot>ah&&items.length){var sc=ah/tot;items.forEach(function(it){it.h*=sc;it.w*=sc;if(it.px){it.px*=sc;it.lh*=sc;it.font=it.font.replace(/ [\d.]+px /,' '+it.px+'px ')}});gap*=sc}
  items.forEach(function(it){it.cy=ar.y0+A.els[it.k].y*ah});
  items.sort(function(a,b){return a.cy-b.cy});
  for(var p=0;p<items.length;p++){var it=items[p],top=it.cy-it.h/2,min=p?items[p-1].cy+items[p-1].h/2+gap:ar.y0;if(top<min)it.cy=min+it.h/2}
  var over=items.length?items[items.length-1].cy+items[items.length-1].h/2-ar.y1:0;
  if(over>0){for(var q=items.length-1;q>=0;q--){var it2=items[q],maxB=q<items.length-1?items[q+1].cy-items[q+1].h/2-gap:ar.y1;if(it2.cy+it2.h/2>maxB)it2.cy=maxB-it2.h/2}}
  /* 3) çiz */
  items.forEach(function(it){var e=A.els[it.k];if(!A._drag||A._drag!==it.k)e.y=ah>0?(it.cy-ar.y0)/ah:e.y;boxes[it.k]={x:cx-it.w/2,y:it.cy-it.h/2,w:it.w,h:it.h};
    if(it.img){x.drawImage(A.logoImg,cx-it.w/2,it.cy-it.h/2,it.w,it.h);return}
    x.font=it.font;x.globalAlpha=ph?0.55:1;x.fillStyle=elInk(it.k);x.textAlign='center';x.textBaseline='middle';
    it.lines.forEach(function(l,i){x.fillText(l,cx,it.cy-it.h/2+it.px*.475+i*it.lh+it.px*.04)});x.globalAlpha=1});
  return {c:c,boxes:boxes,ar:ar}}
/* poşet tabanı önbelleği */
var BASE={};
function baseData(mid,M,body,handle){var key=mid+body+handle;if(BASE[key])return BASE[key];var d=M.d,o=new Uint8ClampedArray(d.length),B=hexRGB(body),H=hexRGB(handle);
  for(var i=0;i<d.length;i+=4){var a=d[i+3];o[i+3]=a;if(!a)continue;var s=d[i]/127.5,bm=d[i+1]/255,hm=d[i+2]/255,sb=s<1?s:1,hl=(s-1)/.6;hl=hl<0?0:hl>1?1:hl;
    var r=B[0]*sb*(1-hl)+hl,g=B[1]*sb*(1-hl)+hl,b=B[2]*sb*(1-hl)+hl;
    if(hm>0){var h2=(s-1)/.8;h2=h2<0?0:h2>1?1:h2;r=r*bm+(H[0]*sb*(1-h2)+h2)*hm;g=g*bm+(H[1]*sb*(1-h2)+h2)*hm;b=b*bm+(H[2]*sb*(1-h2)+h2)*hm}
    o[i]=r*255;o[i+1]=g*255;o[i+2]=b*255}
  BASE[key]=o;return o}
function renderAst(cv,overlay){var mid=mockId();if(!cv||!mid)return;var tok=(cv._tok||0)+1;cv._tok=tok;
  loadMock(mid,function(M){if(cv._tok!==tok)return;if(cv.width!==M.w){cv.width=M.w;cv.height=M.h}
    var x=cv.getContext('2d'),img=x.createImageData(M.w,M.h),o=img.data;o.set(baseData(mid,M,find(BODY,A.color)[1],find(HANDLE,A.kulp)[1]));
    var pr=(A.print==='logo'||A.print==='foto')?buildPrint(mid,M):null;
    if(pr){var ar=pr.ar,L=pr.c.getContext('2d').getImageData(0,0,M.w,M.h).data,d=M.d,X0=Math.max(0,ar.x0-4|0),X1=Math.min(M.w,ar.x1+4|0),Y0=Math.max(0,ar.y0-4|0),Y1=Math.min(M.h,ar.y1+4|0);
      for(var y=Y0;y<Y1;y++)for(var xx=X0;xx<X1;xx++){var i=(y*M.w+xx)*4,la=L[i+3];if(!la||!d[i+3]||d[i+1]<128)continue;la/=255;var s=d[i]/127.5,sb=s<1?s:1,hl=(s-1)/.6;hl=hl<0?0:hl>1?1:hl;
        for(var c=0;c<3;c++){var v=(L[i+c]/255*sb)*(1-hl)+hl;o[i+c]=o[i+c]*(1-la)+v*255*la}}
      cv._pr=pr}
    x.putImageData(img,0,0);
    if(overlay&&pr&&A.showArea!==false){var ar=pr.ar;x.save();x.setLineDash([10,8]);x.lineWidth=2;x.strokeStyle='rgba(36,128,58,.9)';x.strokeRect(ar.x0,ar.y0,ar.x1-ar.x0,ar.y1-ar.y0);
      x.setLineDash([]);x.font='600 '+Math.max(11,M.w*.024)+'px Inter,sans-serif';var lab='Baskı alanı ≈ '+Math.round(ar.wcm)+' × '+Math.round(ar.hcm)+' cm';var tw=x.measureText(lab).width;x.fillStyle='rgba(36,128,58,.92)';x.fillRect(ar.x0,ar.y0-M.w*.04,tw+16,M.w*.04);x.fillStyle='#fff';x.textBaseline='middle';x.fillText(lab,ar.x0+8,ar.y0-M.w*.02);
      var bx=pr.boxes[A.sel];if(bx){x.strokeStyle='#2B3787';x.setLineDash([5,4]);x.lineWidth=1.5;x.strokeRect(bx.x-6,bx.y-4,bx.w+12,bx.h+8);x.setLineDash([]);x.fillStyle='#2B3787';x.beginPath();x.arc(bx.x+bx.w+6,bx.y+bx.h/2,5,0,7);x.fill()}x.restore()}
  })}
function redrawAst(){if(A._raf)return;A._raf=requestAnimationFrame(function(){A._raf=0;renderAst($('#pvc'),true);renderAst($('#spc'),false)})}
function bindCanvas(){var cv=$('#pvc');if(!cv||cv._bound)return;cv._bound=1;var drag=null;
  function pt(e){var r=cv.getBoundingClientRect();return [(e.clientX-r.left)*cv.width/r.width,(e.clientY-r.top)*cv.height/r.height]}
  cv.addEventListener('pointerdown',function(e){var pr=cv._pr;if(!pr)return;var p=pt(e),hit=null,ha=1e12;Object.keys(pr.boxes).forEach(function(k){var b=pr.boxes[k];if(p[0]>=b.x-10&&p[0]<=b.x+b.w+10&&p[1]>=b.y-8&&p[1]<=b.y+b.h+8){var ar2=k===A.sel?-1:b.w*b.h;if(ar2<ha){ha=ar2;hit=k}}});
    if(!hit)return;e.preventDefault();cv.setPointerCapture&&cv.setPointerCapture(e.pointerId);var ah=pr.ar.y1-pr.ar.y0;drag={k:hit,y0:p[1],e0:A.els[hit].y,ah:ah};A._drag=hit;if(A.sel!==hit){A.sel=hit;syncCards()}redrawAst()});
  cv.addEventListener('pointermove',function(e){var pr=cv._pr;if(!pr)return;var p=pt(e);if(!drag){var over=Object.keys(pr.boxes).some(function(k){var b=pr.boxes[k];return p[0]>=b.x-10&&p[0]<=b.x+b.w+10&&p[1]>=b.y-8&&p[1]<=b.y+b.h+8});cv.style.cursor=over?'ns-resize':'default';return}
    A.els[drag.k].y=Math.max(0,Math.min(1,drag.e0+(p[1]-drag.y0)/drag.ah));redrawAst()});
  ['pointerup','pointercancel'].forEach(function(n){cv.addEventListener(n,function(){drag=null;A._drag=null;redrawAst()})})}
function syncCards(){Array.prototype.forEach.call(document.querySelectorAll('.elcard'),function(c){var k=c.getAttribute('data-card'),on=k===A.sel;c.classList.toggle('on',on);var b=c.querySelector('.elbody');if(b)b.hidden=!(on&&(A.adv||k==='logo'))})}
function elCard(k,label,ph,isLogo){var e=A.els[k],on=A.sel===k,r=SZR[k];
  var cols='<div class="pcolors sm">'+AINKS.map(function(c){var o=e.col===c[0];return '<button type="button" data-elcol="'+k+'|'+c[0]+'" class="'+(o?'on':'')+(c[1]==='auto'?' autoink':'')+'" aria-pressed="'+o+'" aria-label="'+label+' rengi '+c[0]+'" title="'+c[0]+'"'+(c[1]==='auto'?'':' style="background:'+c[1]+'"')+'>'+(c[1]==='auto'?'A':'')+'</button>'}).join('')+'</div>';
  return '<div class="elcard'+(on?' on':'')+'" data-card="'+k+'"><div class="elhead" data-elsel="'+k+'"><b>'+label+'</b>'+(isLogo?'<span class="muted">'+esc(A.file)+'</span>':'<input data-eltext="'+k+'" value="'+esc(e.text)+'" placeholder="'+esc(ph)+'" maxlength="70" aria-label="'+label+'">')+'</div>'+
   '<div class="elbody"'+(on&&(A.adv||isLogo)?'':' hidden')+'>'+(isLogo&&A.logoInfo&&logoMsg(A.logoInfo)?'<p class="elinfo">'+esc(logoMsg(A.logoInfo))+(A.logoInfo.orig?' <button type="button" class="linkbtn" data-logoorig>'+(A.logoImg===A.logoInfo.orig?'Arka planı kaldır':'Orijinali kullan')+'</button>':'')+'</p>':'')+(isLogo?'':'<label class="elrow">Yazı tipi<select data-elfont="'+k+'">'+FONTS.map(function(f){return '<option value="'+f[0]+'"'+(e.font===f[0]?' selected':'')+' style="font-family:\''+f[0]+'\'">'+f[2]+'</option>'}).join('')+'</select></label>')+
   '<label class="elrow">Boyut <span class="szv" data-szv="'+k+'">'+e.size.toFixed(1).replace('.',',')+' cm</span><input type="range" min="'+r[0]+'" max="'+r[1]+'" step="0.1" value="'+e.size+'" data-elsize="'+k+'"></label>'+
   (isLogo?'':'<div class="elrow">Renk'+cols+'</div>')+(e.fit?'<p class="elwarn">Yazı baskı alanına sığması için küçültüldü.</p>':'')+'</div></div>'}

function drawSide(){
  var sec=find(SEC,A.sector);
  $('#rec').textContent=recommend();var mr=$('#mrec');if(mr)mr.innerHTML='<span>Önerimiz</span><b>'+esc(recommend())+'</b><a href="#oneri">Özet ↓</a>';
  $('#why').textContent=sec?sec[1]+' işletmelerinin en çok tercih ettiği çözümlerden biri. Seçimlerinize göre ölçü, kalınlık ve baskıyı birlikte netleştiririz.':'Sektörünüzü seçtiğinizde size en uygun poşeti burada göstereceğiz.';
  function lab(arr,k){var f=find(arr,A[k]);return f?f[1]:'—'}
  var rows=[['Sektör',sec?sec[1]:'—'],['İçerik',lab(CON,'content')],['Tutma şekli',lab(HAN,'handle')],['Boyut',A.size==='ozel'?sizeStr(A):lab(SIZ,'size')],['Poşet rengi',A.color]].concat(mockId()==='kulplu'?[['Kulp rengi',A.kulp]]:[]).concat([['Baskı',lab(PRI,'print')]]).concat((A.print==='logo'||A.print==='foto')?[['Baskı tarafı',find(SIDES,A.side)[1]]]:[]);
  var sp=$('#sprev'),mid=mockId();if(sp){sp.hidden=!mid||A.step<2;if(mid&&A.step>=2)renderAst($('#spc'),false)}
  $('#summary').innerHTML=rows.map(function(r){return '<li><span>'+r[0]+'</span><b style="font-weight:600;text-align:right">'+esc(r[1])+'</b></li>'}).join('');
  var n=[];
  if(A.content==='agir')n.push('Kalın ve dayanıklı film önerilir');
  if(A.content==='gida'||['firin','manav','gida'].indexOf(A.sector)>=0)n.push('Gıdaya uygun · TR-34-K-282635');
  if(A.print&&A.print!=='yok')n.push('Firmanıza özel tasarım');
  if(A.size==='ozel')n.push('Özel ölçü üretim');
  $('#notes').innerHTML=n.map(function(x){return '<span class="note">'+x+'</span>'}).join('');
}

function drawTip(){var el=$('#ctip');if(!el)return;var mid=mockId(),t='',btns=[];
  if(mid==='kulplu'){var rec=PAIR[A.color]||[];
    if(A.kulp===A.color)t='Poşet ve kulp aynı renkte: sade ve bütünlüklü bir görünüm.';
    else if(CLASH[A.color+'|'+A.kulp])t=A.color+' poşet ile '+A.kulp.toLocaleLowerCase('tr')+' kulp yan yana yorucu durabilir. '+PAIRTXT[A.color];
    else if(rec.indexOf(A.kulp)>=0)t='Uyumlu seçim. '+PAIRTXT[A.color];
    else t=PAIRTXT[A.color];
    rec.forEach(function(k){if(k!==A.kulp)btns.push(['data-kulp',k,k+' kulp'])});
    if(A.logoCol){var lk=nearestOf(HANDLE,A.logoCol)[0];if(lk!==A.kulp){t+=' Logonuzun ana rengi '+lk.toLocaleLowerCase('tr')+' tonunda; kulbu bu renkte seçmek tasarımı bütünleştirir.';btns.unshift(['data-kulp',lk,lk+' kulp (logonuzun rengi)'])}}
  }else{
    var dark=hexL(find(BODY,A.color)[1])<.25;
    var bad=(A.print==='logo'||A.print==='foto')?ELN.map(function(n){return n[0]}).filter(function(k){return A.els[k].col!=='Otomatik'&&cr(find(BODY,A.color)[1],elInk(k))<2.2}):[];if(bad.length){var bi=AINKS.slice(1).sort(function(a,b){return cr(find(BODY,A.color)[1],b[1])-cr(find(BODY,A.color)[1],a[1])})[0];t=A.color+' poşet üzerinde '+bad.map(function(k){return find(ELN,k)[1].toLocaleLowerCase('tr')}).join(', ')+' rengi zor okunur. '+bi[0]+' öneririz.';btns.push(['data-elcol',bad[0]+'|'+bi[0],bi[0]+' renk'])}
    else t=dark?A.color+' poşette beyaz ya da açık renkli baskı en iyi okunur.':A.color+' poşette koyu renkli baskı uzaktan net okunur.';
    if(A.logoCol&&cr(find(BODY,A.color)[1],A.logoCol)<2){t='Logonuzun ana rengi bu zemine çok yakın, logonuz kaybolabilir. Daha zıt bir poşet rengi deneyin.';var alt=BODY.slice().sort(function(a,b){return cr(b[1],A.logoCol)-cr(a[1],A.logoCol)});btns.push(['data-body',alt[0][0],alt[0][0]+' poşet']);if(alt[1][0]!=='Siyah')btns.push(['data-body',alt[1][0],alt[1][0]+' poşet'])}
  }
  el.innerHTML='<p><span aria-hidden="true">💡</span>'+esc(t)+'</p>'+(btns.length?'<div class="ctb">'+btns.slice(0,3).map(function(b){return '<button type="button" '+b[0]+'="'+b[1]+'">'+esc(b[2])+' uygula</button>'}).join('')+'</div>':'');
}
function drawSteps(){
  var L5=['Sektör','Poşet tipi','Boyut','Tasarım','İletişim'],v=VIS[A.step];var st=$('#steptxt');if(st)st.textContent=A.step<7?'Adım '+(v+1)+' / 5 · '+L5[v]+(A.step===6?' · e-posta doğrulama':''):'Tamamlandı';
  $('#steps').innerHTML=L5.map(function(l,i){return '<li class="'+(i<v?'done':i===v?'cur':'')+'"><span></span>'+(i+1)+'. '+l+'</li>'}).join('');
}
function drawQ(){
  var s=A.step,h='';
  if(s===0)h='<h2 class="qh">Merhaba! Hangi işle uğraşıyorsunuz?</h2><p class="muted" style="margin:0 0 24px">Sektörünüzü seçin, size en çok kullanılan poşetlerden başlayalım.</p>'+opts(SEC,'sector');
  if(s===1)h='';
  if(s===2){var SP={market:['Atlet Poşet','El Geçmeli Poşet','Kulplu Poşet'],firin:['Ekmek Poşeti','El Geçmeli Poşet','Rulo Manav Poşeti','Kulplu Poşet'],manav:['Rulo Manav Poşeti','Atlet Poşet'],gida:['Bakliyat Poşeti','Koli-Kasa Poşeti','Dondurma-Buz Poşeti'],eticaret:['Kargo Poşeti','Bantlı Torba'],kt:['Kuru Temizleme Poşeti'],hali:['Halı Poşeti'],tekstil:['OPP-CPP Torba','OPP-CPP Bantlı Torba','Jelatin','Taşıma Torbası'],sanayi:['Kilitli Torba','Oto Lastik Poşeti','Film (Bobin)']}[A.sector]||[];h=(A.sector==='eticaret'?'<div class="eldmini"><span><b>Az adette, hazır kargo poşeti mi lazım?</b> Standart ölçüleri Eldora mağazamızdan hemen satın alabilirsiniz.</span><a href="https://www.eldora.com.tr/" target="_blank" rel="noopener">Eldora ↗</a></div>':'')+(SP.length?'<div class="secprod"><span>'+esc(find(SEC,A.sector)[1])+' için en çok tercih edilenler:</span>'+SP.map(function(n){return '<a href="'+purlOf(n)+'">'+esc(n)+'</a>'}).join('')+'</div>':'')+'<h2 class="qh">Nasıl bir poşet istiyorsunuz?</h2><p class="muted" style="margin:0 0 24px">Emin değilseniz "Siz önerin" deyin, sektörünüze göre seçelim.</p>'+opts(HAN,'handle',true);}
  if(s===3&&A.s3==='content'){h='<button type="button" class="s3sum" data-s3="size"><span>Boyut</span><b>'+esc(A.size==='ozel'?sizeStr(A):(find(SIZ,A.size)||[0,'—'])[1])+'</b><i>Değiştir</i></button><h2 class="qh">Poşete ne koyacaksınız?</h2><p class="muted" style="margin:0 0 24px">İsteğe bağlı. Kalınlığı doğru belirlememize yardımcı olur; emin değilseniz atlayabilirsiniz.</p>'+opts(CON,'content')}
  else if(s===3){h='<h2 class="qh">Hangi boyutta olsun?</h2><p class="muted" style="margin:0 0 24px">Kabaca seçmeniz yeterli. Kesin ölçüyü teklif aşamasında birlikte netleştiririz.</p>'+opts(SIZ,'size');
    if(A.size==='ozel')h+='<div class="dims"><div class="f3"><label class="fld">En (cm)<input type="number" data-dim="w" value="'+A.w+'"></label><label class="fld">Körük (cm)<input type="number" data-dim="g" value="'+A.g+'"></label><label class="fld">Boy (cm)<input type="number" data-dim="h" value="'+A.h+'"></label><p class="muted full" style="font-size:13px;margin:0">Körük, poşetin yan kıvrımıdır. Ölçü "en + körük + körük × boy" şeklinde yazılır.</p></div><div id="adim">'+dimSvg(A.w,A.g,A.h,sizeStr(A))+'</div></div>';}
  if(s===4){var mid=mockId(),kul=mid==='kulplu';
    var sw=function(pal,cur,attr){return '<div class="pcolors">'+pal.map(function(c){return '<button type="button" '+attr+'="'+c[0]+'" class="'+(cur===c[0]?'on':'')+'" aria-pressed="'+(cur===c[0])+'" aria-label="'+c[0]+'" title="'+c[0]+'" style="background:'+c[1]+'"></button>'}).join('')+'</div>'};
    h='<h2 class="qh">Rengini seçin, nasıl duracağını görün</h2><p class="muted" style="margin:0 0 20px">'+(mid?'Önizleme gerçek ürün fotoğrafımız üzerinde. ':'')+'Poşet rengini'+(kul?', kulp rengini':'')+' ve baskıyı seçin.</p>'+
      '<div class="pvwrap">'+(mid?'<div class="pv"><canvas id="pvc" role="img" aria-label="Poşet önizlemesi"></canvas><span class="pvnote">Önizleme temsilidir</span>'+((A.print==='logo'||A.print==='foto')?'<button type="button" class="areabtn" id="areabtn">'+(A.showArea===false?'Baskı alanını göster':'Baskı alanını gizle')+'</button>'+(A.side==='ayri'?'<span class="facelab">'+(A.face==='on'?'Ön yüz':'Arka yüz')+'</span>':''):'')+'</div>':'')+
      '<div class="pvctl">'+NOTICE+'<p class="dlab">Poşet rengi <span>· '+A.color+'</span></p>'+sw(BODY,A.color,'data-body')+
      (kul?'<p class="dlab">Kulp rengi <span>· '+A.kulp+'</span></p>'+sw(HANDLE,A.kulp,'data-kulp'):'')+
      '<div class="ctip" id="ctip"></div>'+
      '<p class="dlab" style="margin-top:18px">Baskı</p>'+opts(PRI,'print')+
      ((A.print==='logo'||A.print==='foto')?'<p class="dlab" style="margin-top:16px">Baskı tarafı</p><div class="sides">'+SIDES.map(function(o){var on=A.side===o[0];return '<button type="button" data-side="'+o[0]+'" class="'+(on?'on':'')+'" aria-pressed="'+on+'"><b>'+o[1]+'</b><span>'+o[2]+'</span></button>'}).join('')+'</div>'+
        (A.side==='ayri'?'<div class="faces" role="tablist" aria-label="Yüz seçimi">'+[['on','Ön yüz'],['arka','Arka yüz']].map(function(f){var on=A.face===f[0];return '<button type="button" role="tab" data-face="'+f[0]+'" aria-selected="'+on+'" class="'+(on?'on':'')+'">'+f[1]+'</button>'}).join('')+'</div><p class="muted" style="font-size:13px;margin:6px 0 0">'+(A.face==='on'?'Ön yüzü tasarlıyorsunuz.':'Arka yüzü tasarlıyorsunuz. İlk açılışta ön yüzün kopyası gelir, dilediğiniz gibi değiştirin.')+'</p>':''):'')+
      ((A.print==='logo'||A.print==='foto')?'<div class="ptx"><p class="dlab" style="margin-top:18px">Poşetin üzerine yazılacaklar</p><p class="muted" style="font-size:13px;margin:-4px 0 12px">Firma adınızı ve iletişim bilgilerinizi yazın, poşette anında görün. İsterseniz yazıyı önizlemede <b>sürükleyerek</b> yerini değiştirebilirsiniz.</p>'+
        (A.logoImg?elCard('logo','Logo','',true):'')+ELN.map(function(n){return elCard(n[0],n[1],n[2])}).join('')+'<button type="button" class="advbtn" data-adv aria-expanded="'+A.adv+'">'+(A.adv?'Gelişmiş ayarları gizle ▴':'Yazı tipi, boyut ve renk ayarları ▾')+'</button>'+
        '<label class="drop"><b>'+(A.logoImg?'Logoyu değiştir':'Logonuz varsa yükleyin (isteğe bağlı)')+'</b><span class="muted" style="font-size:13px">PNG, JPG ya da SVG. Logo da sürüklenebilir ve boyutlandırılabilir.</span><input type="file" accept="image/*,.pdf,.ai" data-file="a"></label></div>':'')+
      '</div></div>';}
  if(s===5){var e=A.tried;h='<h2 class="qh">Son adım: size nasıl ulaşalım?</h2><p class="muted" style="margin:0 0 24px">Bilgilerinizi girin; teklifinizi göndermeden önce e-posta adresinizi doğrulayacağız. Üyelik gerekmez.</p><div class="f2">'+
    '<label class="fld">Ad soyad<em class="req">Zorunlu</em><input data-in="name" autocomplete="name" value="'+esc(A.name)+'" class="'+(e&&!A.name.trim()?'err':'')+'"></label>'+
    '<label class="fld">Telefon<em class="req">Zorunlu</em><input type="tel" data-in="phone" placeholder="05xx xxx xx xx" value="'+esc(A.phone)+'" class="'+(e&&A.phone.trim().length<7?'err':'')+'"></label>'+
    '<label class="fld">Firma adı<em>İsteğe bağlı</em><input autocomplete="organization" value="'+esc(A.pt.firma)+'"></label><label class="fld">E-posta<em class="req">Zorunlu</em><input type="email" data-in="email" autocomplete="email" value="'+esc(A.email||'')+'" class="'+(e&&!EMRE.test(A.email||'')?'err':'')+'"></label>'+
    '<div class="full"><span style="font-size:14px;font-weight:600">Yaklaşık miktar</span><div style="display:flex;flex-wrap:wrap;align-items:center"><input type="number" aria-label="Miktar" placeholder="ör. 5000" style="flex:1 1 200px;min-height:50px;border:2px solid #DDE1EA;border-radius:12px;padding:0 14px;margin:6px 10px 0 0"><div class="seg" role="group" aria-label="Birim"><button type="button" data-unit="adet" class="'+(A.unit==='adet'?'on':'')+'">Adet</button><button type="button" data-unit="kg" class="'+(A.unit==='kg'?'on':'')+'">Kg</button></div></div><p class="muted" style="font-size:13px;margin:6px 0 0">Adet ya da kilogram, hangisi kolayınıza gelirse. Emin değilseniz tahmini yazın, biz hesaplarız.</p></div></div>'+
    (e&&(!A.name.trim()||A.phone.trim().length<7||!EMRE.test(A.email||''))?'<p class="errmsg" role="alert">Ad soyad, telefon ve geçerli bir e-posta adresi gerekli.</p>':'')+'<div class="codeinfo"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></svg><span><b>E-postanıza 6 haneli bir doğrulama kodu göndereceğiz.</b> Kodu bir sonraki ekrana girdiğinizde teklifiniz satış ekibimize iletilir. Kod birkaç dakika içinde gelmezse gereksiz (spam) klasörünüzü kontrol edin.</span></div>'+'<label class="chk"><input type="checkbox" data-in2="kvkk"'+(A.kvkk?' checked':'')+'> <span><a href="#" onclick="return false">Aydınlatma metnini</a> okudum; teklif için bilgilerimin işlenmesini kabul ediyorum.</span></label>'+(e&&!A.kvkk?'<p class="errmsg" role="alert">Devam etmek için aydınlatma metnini onaylayın.</p>':'');}
  if(s===6){var V=A.au;h='<h2 class="qh">E-postanızı doğrulayın</h2><p class="muted" style="margin:0 0 18px"><b>'+esc(A.email)+'</b> adresine 6 haneli bir kod gönderdik. Kodu girdiğinizde teklif talebiniz satış ekibimize iletilir.</p>'+
    '<div class="f2"><label class="fld">Doğrulama kodu<input inputmode="numeric" autocomplete="one-time-code" maxlength="6" data-au="code" value="'+esc(V.code)+'" class="'+(V.err?'err':'')+'"></label></div>'+
    '<p class="demo">Prototip notu: gerçek sitede kod e-postayla gelir. Burada denemek için <b>'+V.demo+'</b> girin.</p>'+(V.err?'<p class="errmsg" role="alert">'+esc(V.err)+'</p>':'')+
    '<div class="qnav"><button type="button" class="btn ghost" data-auact="change">← E-postayı değiştir</button><div><button type="button" class="btn ghost" data-auact="resend">Kodu tekrar gönder</button><button type="button" class="btn" data-auact="verify">Doğrula ve teklifi gönder</button></div></div>';}
  if(s===7){h='<div class="ok"><span class="circ"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#24803A" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg></span><h2 class="qh" style="margin:18px 0 8px">Teşekkürler '+esc(A.name.trim().split(' ')[0])+', talebiniz bize ulaştı.</h2><p class="muted" style="margin:0 0 8px">Talebinizin özeti <b>'+esc(A.email)+'</b> adresine de gönderilecek.</p><p class="muted" style="max-width:480px;margin:0 auto 24px">Satış ekibimiz en kısa sürede '+esc(A.phone)+' numarasından size dönecek. Acele ediyorsanız WhatsApp\'tan da yazabilirsiniz.</p><a class="btn ghost" href="'+HOME+'" style="margin:4px">Ana sayfaya dön</a> <a class="btn" href="'+purlOf(recommend())+'" style="margin:4px">'+esc(recommend())+' sayfasına git</a></div>';}
  if(s<6){var can=s>=5||!!A[KEYS[s]];
    h+='<div class="qnav"><button type="button" class="btn ghost" data-nav="back" style="visibility:'+(s===0?'hidden':'visible')+'">← Geri</button><div>'+(s===5?'<a class="btn ghost" href="https://wa.me/905357183598" style="border-color:#24803A;color:#24803A">WhatsApp ile gönder</a>':'')+'<button type="button" class="btn" data-nav="next"'+(can?'':' disabled')+'>'+(s===5?'E-postama kod gönder →':(s===3&&A.s3==='content'&&!A.content?'Bu adımı atla →':'Devam et →'))+'</button></div></div>';}
  $('#qpanel').innerHTML=h; drawSteps(); drawSide(); if(s===4){addFonts();renderAst($('#pvc'),true);bindCanvas();drawTip();FONTS.forEach(function(f){ensureFont(f[0],redrawAst)})}
}
var qs=location.search.match(/[?&]sektor=([a-z]+)/);if(qs&&find(SEC,qs[1])){A.sector=qs[1];A.step=2}
(function(){function q(k){var m=location.search.match(new RegExp('[?&]'+k+'=([^&#]+)'));return m?decodeURIComponent(m[1]):null}
  var tp={atlet:'atlet',elgecme:'el',kulplu:'kulp'}[q('tip')];if(tp)A.handle=tp;if(q('renk')&&find(BODY,q('renk')))A.color=q('renk');if(q('kulp')&&find(HANDLE,q('kulp')))A.kulp=q('kulp');
  if(tp){A.print='logo';A.step=4;if(!A.size)A.size='orta';try{var ls=sessionStorage.getItem('eprLogo');if(ls){prepLogo(ls,function(im,info){A.logoImg=im;A.logoInfo=info;A.LG.on=im;A.file='Ana sayfada yüklediğiniz logo';A.sel='logo';logoColor(ls,function(c){A.logoCol=c;drawQ()})})}}catch(e){}}})();
function s3top(){var top=$('#steptxt');var el=(top&&top.offsetParent?top:$('#steps'));if(!el)return;var y=el.getBoundingClientRect().top+window.pageYOffset-90;if(window.pageYOffset>y)window.scrollTo(0,y)}
var qp=$('#qpanel');
qp.addEventListener('click',function(e){
  var t=e.target.closest?e.target.closest('button'):null; if(!t)return;
  if(t.hasAttribute('data-s3')){A.s3=t.getAttribute('data-s3');drawQ();s3top();return}
  if(t.hasAttribute('data-k')){var k=t.getAttribute('data-k');A[k]=t.getAttribute('data-v');drawQ();
    if(A.step===3&&k==='size'&&A.size!=='ozel'){setTimeout(function(){if(A.step===3&&A.s3!=='content'){A.s3='content';drawQ();s3top()}},280)}
    if(A.step===3&&k==='content'){setTimeout(function(){if(A.step===3&&A.s3==='content'){A.step=nxt(A.step);drawQ();s3top()}},280)}
    if((A.step===0||A.step===2)&&k===KEYS[A.step]){var cur=A.step;setTimeout(function(){if(A.step===cur){A.step=nxt(A.step);drawQ();var top=$('#steptxt');var y=(top&&top.offsetParent?top:$('#steps')).getBoundingClientRect().top+window.pageYOffset-90;if(window.pageYOffset>y)window.scrollTo(0,y)}},280)}
    return}
  if(t.hasAttribute('data-body')){A.color=t.getAttribute('data-body');drawQ();return}
  if(t.hasAttribute('data-kulp')){A.kulp=t.getAttribute('data-kulp');drawQ();return}
  if(t.hasAttribute('data-logoorig')&&A.logoInfo){var o=A.logoInfo.orig;if(!A.logoInfo.clean)A.logoInfo.clean=A.logoImg;A.logoImg=A.logoImg===o?A.logoInfo.clean:o;A.LG[A.face]=A.logoImg;drawQ();return}
  if(t.hasAttribute('data-autab')){A.au.tab=t.getAttribute('data-autab');A.au.err='';drawQ();return}
  if(t.hasAttribute('data-auact')){var V=A.au,act=t.getAttribute('data-auact');V.err='';
    if(act==='send'){if(!/^\S+@\S+\.\S+$/.test(V.email))V.err='Geçerli bir e-posta adresi girin.';else if(V.pass.length<6)V.err='Şifre en az 6 karakter olmalı.';else if(!V.kvkk)V.err='Devam etmek için aydınlatma metnini onaylayın.';else{V.sent=true;V.demo=String(Math.floor(100000+Math.random()*900000))}}
    if(act==='change'){V.code='';A.step=5}
    if(act==='resend'){V.code='';V.demo=String(Math.floor(100000+Math.random()*900000))}
    if(act==='verify'){if(V.code.trim()===V.demo){A.step=7;setTimeout(function(){document.dispatchEvent(new Event('epr:done'))},10)}else V.err='Kod hatalı, tekrar deneyin.'}
    if(act==='login'){if(!/^\S+@\S+\.\S+$/.test(V.email)||!V.pass)V.err='E-posta ve şifrenizi girin.';else A.step=7}
    drawQ();return}
  if(t.hasAttribute('data-adv')){A.adv=!A.adv;drawQ();return}
  if(t.id==='areabtn'){A.showArea=A.showArea===false;t.textContent=A.showArea?'Baskı alanını gizle':'Baskı alanını göster';redrawAst();return}
  if(t.hasAttribute('data-side')){var sd=t.getAttribute('data-side');if(sd!=='ayri'&&A.face!=='on')setFace('on');A.side=sd;drawQ();return}
  if(t.hasAttribute('data-face')){setFace(t.getAttribute('data-face'));A.sel=A.logoImg?'logo':'firma';drawQ();return}
  if(t.hasAttribute('data-elcol')){var kv=t.getAttribute('data-elcol').split('|');A.els[kv[0]].col=kv[1];A.sel=kv[0];if(t.closest('.ctb')){drawQ();return}Array.prototype.forEach.call(t.parentNode.children,function(b){b.classList.toggle('on',b===t)});redrawAst();drawTip();return}
  if(t.hasAttribute('data-unit')){A.unit=t.getAttribute('data-unit');Array.prototype.forEach.call(qp.querySelectorAll('[data-unit]'),function(b){b.className=b===t?'on':''});return}
  var n=t.getAttribute('data-nav');
  if(n==='back'){if(A.step===3&&A.s3==='content'){A.s3='size';drawQ();s3top();return}A.step=prv(A.step);if(A.step===3)A.s3='content';drawQ()}
  if(n==='next'){if(A.step===5){if(!A.name.trim()||A.phone.trim().length<7||!EMRE.test(A.email||'')||!A.kvkk){A.tried=true;drawQ();return}A.au.code='';A.au.err='';A.au.demo=String(Math.floor(100000+Math.random()*900000));A.step=6;drawQ();return}
    if(A.step===3&&A.size&&A.s3!=='content'){A.s3='content';drawQ();s3top();return}
    if(A[KEYS[A.step]]){A.step=nxt(A.step);drawQ();s3top()}}
});
qp.addEventListener('click',function(e){var h=e.target.closest&&e.target.closest('[data-elsel]');if(!h)return;var k=h.getAttribute('data-elsel');if(A.sel!==k){A.sel=k;syncCards();redrawAst()}});
qp.addEventListener('focusin',function(e){var k=e.target.getAttribute&&e.target.getAttribute('data-eltext');if(k&&A.sel!==k){A.sel=k;syncCards();redrawAst()}});
qp.addEventListener('input',function(e){
  var t=e.target;
  if(t.hasAttribute('data-dim')){A[t.getAttribute('data-dim')]=Math.max(0,+t.value||0);$('#adim').innerHTML=dimSvg(A.w,A.g,A.h,sizeStr(A));drawSide()}
  if(t.hasAttribute('data-in2')){A.kvkk=t.checked;return}
  if(t.hasAttribute('data-au')){var f=t.getAttribute('data-au');A.au[f]=t.type==='checkbox'?t.checked:t.value;return}
  if(t.hasAttribute('data-eltext')){var k=t.getAttribute('data-eltext');A.els[k].text=t.value;if(k==='firma')A.pt.firma=t.value;redrawAst();return}
  if(t.hasAttribute('data-elsize')){var k2=t.getAttribute('data-elsize');A.els[k2].size=+t.value;A.sel=k2;var sv=qp.querySelector('[data-szv="'+k2+'"]');if(sv)sv.textContent=(+t.value).toFixed(1).replace('.',',')+' cm';redrawAst();return}
  if(t.hasAttribute('data-in')){A[t.getAttribute('data-in')]=t.value;if(A.tried&&t.value.trim())t.className=''}
});
qp.addEventListener('change',function(e){var t=e.target;if(t.hasAttribute('data-elfont')){var k=t.getAttribute('data-elfont');A.els[k].font=t.value;A.sel=k;ensureFont(t.value,redrawAst);redrawAst();return}if(!t.hasAttribute('data-file'))return;var f=t.files&&t.files[0];A.file=f?f.name:'';if(f&&/^image\//.test(f.type)){var fr=new FileReader();fr.onload=function(){prepLogo(fr.result,function(im,info){A.logoImg=im;A.logoInfo=info;A.LG[A.face]=im;A.sel='logo';logoColor(fr.result,function(c){A.logoCol=c;drawQ()})})};fr.readAsDataURL(f)}else drawQ()});
drawQ();

}
if($('#pg-urun')){
/* ---------- ürün sayfası ---------- */
var PR=JSON.parse($('#pg-urun').getAttribute('data-product')||'{}'),MID=PR.mock||null,PNAME=PR.name||'Ürün';
var U={color:'Beyaz',kulp:'Siyah',print:'yok',w:30,g:10,h:60,sel:0,fs:0,unit:'adet',name:'',phone:'',file:'',tried:false};
var PP=[['yok','Baskısız'],['1','1 renk'],['3','2–3 renk'],['cmyk','CMYK / fotoğraf']];
var SZ=(PR.sizes||[]);(function(){var d=SZ.filter(function(r){return r[3]});if(d.length){var r=d[d.length-1];U.w=r[3][0];U.g=r[3][1];U.h=r[3][2];U.sel=SZ.indexOf(r)+1}else if(MID==='kulplu'){U.w=49;U.g=10;U.h=35}else if(MID==='elgecme'){U.w=35;U.g=0;U.h=45}})();
if(!SZ.length){var os=$('#olcusec');if(os)os.hidden=true}
function pname(){return find(PP,U.print)[1]}
/* ---- Ürün önizleme motoru ----
   Gerçek fotoğraf gelince: beyaz poşetin şeffaf zeminli PNG fotoğrafı PHOTOS'a eklenir,
   örn. PHOTOS.atlet='urunler/atlet-beyaz.png'. Renk, fotoğrafın üzerine "multiply" ile
   ve fotoğrafın kendi şekli maske olarak kullanılarak boyanır; kırışıklık ve gölgeler korunur. */
U.ink='Lacivert'; U.logoImg=null; U.logoSrc=null; U.tab='pv';
function uLayer(){if(U.logoImg)return [{c:U.logoImg,k:'logo'}];if(U.print!=='yok')return [{c:placeholderLogo(find(INKS,U.ink)[1]),k:'logo'}];return null}
function olcuSvg(w,g,h){var sc=Math.min(260/(w+2*g),300/h),W=(w+2*g)*sc,H=h*sc,G=g*sc,x0=(440-W)/2,y0=MID==='kulplu'?80:40,hw=W*.17,cut=MID==='atlet'?Math.min(H*.32,W*.42):0;
  var path=MID==='atlet'?'M'+x0+' '+(y0+H)+'V'+y0+'h'+hw+'v'+(cut*.45)+'q0 '+(cut*.55)+' '+(W/2-hw)+' '+(cut*.55)+'q'+(W/2-hw)+' 0 '+(W/2-hw)+' '+(-cut*.55)+'V'+y0+'h'+hw+'V'+(y0+H)+'Z':'M'+x0+' '+y0+'h'+W+'v'+H+'h'+(-W)+'Z';
  var extra=MID==='elgecme'?'<rect x="'+(x0+W/2-W*.14)+'" y="'+(y0+H*.06)+'" width="'+(W*.28)+'" height="'+(H*.07)+'" rx="'+(H*.035)+'" fill="#fff" stroke="#191B45" stroke-width="2"/>':MID==='kulplu'?'<path d="M'+(x0+W*.35)+' '+y0+'v-24a'+(W*.15)+' 30 0 0 1 '+(W*.3)+' 0v24" fill="none" stroke="#191B45" stroke-width="6" stroke-linecap="round"/>':'';
  function ar(x1,y1,x2,y2){return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="#2B3787" stroke-width="1.5" marker-start="url(#ah)" marker-end="url(#ah)"/>'}
  function tx(x,y,t,rot){return '<text x="'+x+'" y="'+y+'" text-anchor="middle" font-family="Inter,sans-serif" font-size="14" font-weight="700" fill="#2B3787"'+(rot?' transform="rotate(-90 '+x+' '+y+')"':'')+'>'+t+'</text>'}
  return '<svg viewBox="0 0 440 '+(y0+H+70)+'" width="100%" role="img" aria-label="Ölçü çizimi: en '+w+' cm, körük '+g+' cm, boy '+h+' cm"><defs><marker id="ah" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 1L9 5L0 9z" fill="#2B3787"/></marker></defs>'+
   '<path d="'+path+'" fill="#F4F6FB" stroke="#191B45" stroke-width="2" stroke-linejoin="round"/>'+extra+
   '<rect x="'+x0+'" y="'+(y0+cut)+'" width="'+G+'" height="'+(H-cut)+'" fill="#E2E7F3"/><rect x="'+(x0+W-G)+'" y="'+(y0+cut)+'" width="'+G+'" height="'+(H-cut)+'" fill="#E2E7F3"/>'+
   '<line x1="'+(x0+G)+'" y1="'+(y0+cut)+'" x2="'+(x0+G)+'" y2="'+(y0+H)+'" stroke="#9AA3C4" stroke-dasharray="4 4"/><line x1="'+(x0+W-G)+'" y1="'+(y0+cut)+'" x2="'+(x0+W-G)+'" y2="'+(y0+H)+'" stroke="#9AA3C4" stroke-dasharray="4 4"/>'+
   ar(x0+G,y0+H+22,x0+W-G,y0+H+22)+tx(x0+W/2,y0+H+44,'En '+w+' cm')+
   (g>0?ar(x0,y0+H+22,x0+G,y0+H+22)+ar(x0+W-G,y0+H+22,x0+W,y0+H+22)+tx(x0+G/2,y0+H+62,'Körük '+g)+tx(x0+W-G/2,y0+H+62,g):'')+
   ar(x0+W+24,y0,x0+W+24,y0+H)+tx(x0+W+44,y0+H/2,'Boy '+h+' cm',true)+'</svg>'}
function drawBag(){
  var bg=find(BODY,U.color)[1];
  if(MID){drawMock($('#ucv'),MID,bg,find(HANDLE,U.kulp)[1],uLayer())}else{$('#ucv').hidden=true;var np=$('#nophoto');np.hidden=false;if(!np._b){np._b=1;np.innerHTML=(IC[PR.icon]?icon(PR.icon,140,'#2B3787'):'')+'<b>Ürün fotoğrafı yakında</b><span>Bu ürünün fotoğrafları eklenecek. Şimdiden teklif alabilirsiniz.</span>'}}
  $('#vlabel').textContent='Önizleme · '+U.color+(U.logoImg?' · Logonuz':U.print!=='yok'?' · '+U.ink+' baskı':'');
  $('#cname').textContent=U.color; $('#inkname').textContent=U.print==='yok'&&!U.logoImg?'Bir renge tıklayın ya da logonuzu yükleyin':U.ink;
  if(!U._b){U._b=1;$('#dots').innerHTML=BODY.map(function(c){return '<button type="button" data-pc="'+c[0]+'" aria-label="Poşet '+c[0]+'" title="'+c[0]+'" style="background:'+c[1]+'"></button>'}).join('');
    $('#inks').innerHTML=INKS.map(function(c){return '<button type="button" data-ink="'+c[0]+'" aria-label="Baskı '+c[0]+'" title="'+c[0]+'" style="background:'+c[1]+'"></button>'}).join('')}
  Array.prototype.forEach.call(document.querySelectorAll('#dots [data-pc]'),function(b){var on=b.getAttribute('data-pc')===U.color;b.classList.toggle('on',on);b.setAttribute('aria-pressed',on)});
  Array.prototype.forEach.call(document.querySelectorAll('#inks [data-ink]'),function(b){var on=b.getAttribute('data-ink')===U.ink;b.classList.toggle('on',on);b.setAttribute('aria-pressed',on)});
  $('#logoclr').hidden=!U.logoImg;
  if(MID==='kulplu'){$('#ukulpw').hidden=false;var uk=$('#ukulp');if(!uk._b){uk._b=1;uk.innerHTML=HANDLE.map(function(c){return '<button type="button" data-uk="'+c[0]+'" aria-label="Kulp '+c[0]+'" title="'+c[0]+'" style="background:'+c[1]+'"></button>'}).join('')}
    Array.prototype.forEach.call(uk.querySelectorAll('[data-uk]'),function(b){var on=b.getAttribute('data-uk')===U.kulp;b.classList.toggle('on',on);b.setAttribute('aria-pressed',on)});$('#kname').textContent=U.kulp}
  var tip;if(MID==='kulplu')tip=CLASH[U.color+'|'+U.kulp]?U.color+' poşet ile '+U.kulp.toLocaleLowerCase('tr')+' kulp yan yana yorucu durabilir. '+PAIRTXT[U.color]:PAIRTXT[U.color];
  else if((U.print!=='yok'||U.logoImg)&&!U.logoImg&&cr(bg,find(INKS,U.ink)[1])<2.2){var bi=INKS.slice().sort(function(a,b){return cr(bg,b[1])-cr(bg,a[1])})[0];tip=U.color+' poşet üzerinde '+U.ink.toLocaleLowerCase('tr')+' baskı zor okunur; '+bi[0].toLocaleLowerCase('tr')+' baskı daha net olur.'}
  else tip=hexL(bg)<.25?U.color+' poşette beyaz ya da açık renkli baskı en iyi okunur.':U.color+' poşette koyu renkli baskı uzaktan net okunur.';
  $('#utip').innerHTML='<span aria-hidden="true">💡</span>'+esc(tip);
  if(!MID){$('#ucolors').hidden=true;var tc=$('.tasarla-cta');if(tc)tc.hidden=true;Array.prototype.forEach.call(document.querySelectorAll('[data-gt="renk"],.vtools,#vlabel,.gal .pnote'),function(x){x.hidden=true})}
  $('#olcu').innerHTML=olcuSvg(U.w,U.g,U.h);
  $('#utasarla').href=ASIST+'?tip='+(MID||'atlet')+'&renk='+encodeURIComponent(U.color)+'&kulp='+encodeURIComponent(U.kulp);
  if(U.tab==='renk')drawGrid();
}
function drawGrid(){var g=$('#rgrid');if(!g._b){g._b=1;g.innerHTML=BODY.map(function(c){return '<button type="button" data-rg="'+c[0]+'"><canvas></canvas><span>'+c[0]+'</span></button>'}).join('');
    Array.prototype.forEach.call(g.querySelectorAll('[data-rg]'),function(b){var c=find(BODY,b.getAttribute('data-rg'));drawMock(b.querySelector('canvas'),MID,c[1],find(HANDLE,U.kulp)[1],null)})}
  Array.prototype.forEach.call(g.querySelectorAll('[data-rg]'),function(b){b.classList.toggle('on',b.getAttribute('data-rg')===U.color)})}
function drawCar(){var c=$('#ucar');if(c._b)return;c._b=1;var w=(PR.works||[]).map(function(x){return '<figure class="cslide sitem"><img src="'+R+'assets/isler/'+x[0]+'" alt="'+esc(x[1]+' için üretilen '+PNAME)+'" draggable="false"><figcaption><b>'+esc(x[1])+'</b> · '+esc(x[2])+'</figcaption></figure>'});
  w.push('<figure class="cslide sitem soon">'+(IC[PR.icon]?icon(PR.icon,96,'#9AA3C4'):'')+'<figcaption><b>Yeni iş örnekleri</b> · yakında eklenecek</figcaption></figure>');
  c.innerHTML='<div class="strack">'+w.join('')+'</div><button type="button" class="carbtn sprev2" aria-label="Önceki">‹</button><button type="button" class="carbtn snext" aria-label="Sonraki">›</button>';slider(c)}
function setTab(t){U.tab=t;if(t==='is')drawCar();Array.prototype.forEach.call(document.querySelectorAll('[data-gt]'),function(b){var on=b.getAttribute('data-gt')===t;b.classList.toggle('on',on);b.setAttribute('aria-selected',on)});
  Array.prototype.forEach.call(document.querySelectorAll('[data-gp]'),function(p){p.hidden=p.getAttribute('data-gp')!==t});if(t==='renk')drawGrid();if(t==='is'){var c=$('#ucar');c._upd&&c._upd()}}
function readLogo(file){
  if(!file||!/^image\//.test(file.type))return;
  var fr=new FileReader(); fr.onload=function(){prepLogo(fr.result,function(im,info){U.logoImg=im;U.logoSrc=fr.result;U.file=file.name;if(U.print==='yok')U.print='1';setTab('pv');drawBag();drawForm()})}; fr.readAsDataURL(file);
}
$('#logoin').addEventListener('change',function(){readLogo(this.files&&this.files[0])});
$('#logoclr').addEventListener('click',function(){U.logoImg=null;U.logoSrc=null;U.file='';$('#logoin').value='';drawBag();drawForm()});
$('#utasarla').addEventListener('click',function(){try{if(U.logoSrc)sessionStorage.setItem('eprLogo',U.logoSrc);else sessionStorage.removeItem('eprLogo')}catch(e){}});
function drawTable(){
  $('#sztable').innerHTML=SZ.map(function(r,i){var on=U.sel===i+1;return '<tr class="'+(on?'on':'')+'"><td style="font-weight:600">'+esc(r[0])+'</td><td style="font-weight:600">'+esc(r[1])+'</td><td class="muted">'+esc(r[2])+'</td><td style="text-align:right"><button type="button" data-sz="'+(i+1)+'" style="border-color:'+(on?'#24803A':'#DDE1EA')+'">'+(on?'Seçildi ✓':'Bu ölçüyü seç')+'</button></td></tr>'}).join('');
}

function drawSum(){
  $('#psum').innerHTML=[['Ürün',PNAME],['Ölçü',sizeStr(U)]].concat(MID?[['Poşet rengi',U.color]].concat(MID==='kulplu'?[['Kulp rengi',U.kulp]]:[]):[]).concat([['Baskı',pname()]]).map(function(r){return '<li style="display:flex;justify-content:space-between;margin-bottom:8px"><span style="color:#CDD0EC">'+r[0]+'</span><b style="font-weight:600">'+esc(r[1])+'</b></li>'}).join('');
}
function drawForm(){
  var s=U.fs,h='';
  $('#fsteps').innerHTML=['Ölçü','Renk ve baskı','İletişim'].map(function(l,i){return '<li class="'+(i<s?'done':i===s?'cur':'')+'"><span></span>'+(i+1)+'. '+l+'</li>'}).join('');
  if(s===0)h='<div class="dims" style="margin-top:0;background:#fff;padding:0"><div class="f3"><label class="fld">En (cm)<input type="number" data-ud="w" value="'+U.w+'"></label><label class="fld">Körük (cm)<input type="number" data-ud="g" value="'+U.g+'"></label><label class="fld">Boy (cm)<input type="number" data-ud="h" value="'+U.h+'"></label><p class="muted full" style="font-size:13px;margin:0">Seçili ölçü: <b style="color:#191B45" id="ustr">'+sizeStr(U)+'</b>. Körük, poşetin yanlardaki kıvrımıdır.</p></div><div id="udim">'+dimSvg(U.w,U.g,U.h,sizeStr(U))+'</div></div>';
  if(s===1){h='<p style="font-weight:600;font-size:14px;margin:0 0 10px">Baskı</p><div class="popts">'+PP.map(function(p){return '<button type="button" data-pp="'+p[0]+'" class="'+(U.print===p[0]?'on':'')+'">'+p[1]+'</button>'}).join('')+'</div><p style="font-weight:600;font-size:14px;margin:22px 0 10px">Zemin rengi</p>'+'<div class="pcolors">'+BODY.map(function(c){var on=U.color===c[0];return '<button type="button" data-pc="'+c[0]+'" class="'+(on?'on':'')+'" aria-pressed="'+on+'" aria-label="'+c[0]+'" title="'+c[0]+'" style="background:'+c[1]+'"></button>'}).join('')+'</div>';
    if(U.print!=='yok'&&false)h+='<label class="drop"><b>'+(U.file?'Yüklendi: '+esc(U.file):'Logonuzu veya tasarımınızı buraya bırakın')+'</b><span class="muted" style="font-size:13px">PDF, AI, PNG veya JPG</span><input type="file" data-file="u"></label>';}
  if(s===2){var e=U.tried;h='<div class="f2"><label class="fld">Ad soyad<em class="req">Zorunlu</em><input data-uin="name" value="'+esc(U.name)+'" class="'+(e&&!U.name.trim()?'err':'')+'"></label><label class="fld">Telefon<em class="req">Zorunlu</em><input type="tel" data-uin="phone" placeholder="05xx xxx xx xx" value="'+esc(U.phone)+'" class="'+(e&&U.phone.trim().length<7?'err':'')+'"></label><label class="fld">Firma<em>İsteğe bağlı</em><input></label><label class="fld">Şehir<em>İsteğe bağlı</em><input></label><label class="fld">Miktar<em>Tahmini yeterli</em><input type="number" placeholder="ör. 5000"></label><div><span style="font-size:14px;font-weight:600;display:block">Birim</span><div class="seg"><button type="button" data-unit="adet" class="'+(U.unit==='adet'?'on':'')+'">Adet</button><button type="button" data-unit="kg" class="'+(U.unit==='kg'?'on':'')+'">Kg</button></div></div><label class="fld full">Eklemek istedikleriniz<em>İsteğe bağlı</em><textarea rows="3"></textarea></label></div>'+(e&&(!U.name.trim()||U.phone.trim().length<7)?'<p class="errmsg" role="alert">Size dönebilmemiz için ad soyad ve telefon gerekli.</p>':'');}
  if(s===3)h='<div class="ok"><h3 style="font-size:24px;margin-bottom:8px">Teşekkürler, talebiniz alındı.</h3><p class="muted" style="margin:0">'+esc(PNAME)+' · '+sizeStr(U)+' · '+U.color+' · '+pname()+'. En kısa sürede size dönüyoruz.</p></div>';
  if(s<3)h+='<div class="qnav"><button type="button" class="btn ghost" data-unav="back" style="visibility:'+(s===0?'hidden':'visible')+'">← Geri</button><button type="button" class="btn" data-unav="next">'+(s===2?'Teklif iste':'Devam et →')+'</button></div>';
  $('#fbody').innerHTML=h; drawSum();
}
var pu=$('#pg-urun');
pu.addEventListener('click',function(e){
  var t=e.target.closest?e.target.closest('button'):null; if(!t)return;
  if(t.hasAttribute('data-gt')){setTab(t.getAttribute('data-gt'));return}
  if(t.hasAttribute('data-rg')){U.color=t.getAttribute('data-rg');setTab('pv');drawBag();drawForm();return}
  if(t.hasAttribute('data-pc')||(t.hasAttribute('data-color')&&pu.contains(t))){U.color=t.getAttribute('data-pc')||t.getAttribute('data-color');drawBag();if(t.closest('#fbody'))drawForm();else drawSum();return}
  if(t.hasAttribute('data-ink')){U.ink=t.getAttribute('data-ink');if(U.print==='yok'&&!U.logoImg)U.print='1';drawBag();if(t.closest('#fbody'))drawForm();else drawSum();return}
  if(t.hasAttribute('data-sz')){var i=+t.getAttribute('data-sz'),r=SZ[i-1];U.sel=i;if(r[3]){U.w=r[3][0];U.g=r[3][1];U.h=r[3][2];U.fs=0;setTab('olcu');$('#olcu').innerHTML=olcuSvg(U.w,U.g,U.h)}drawTable();drawForm();return}
  if(t.hasAttribute('data-uk')){U.kulp=t.getAttribute('data-uk');drawBag();drawSum();return}
  if(t.hasAttribute('data-cs')){var tr=$('#ucar .strack');tr.scrollBy({left:(+t.getAttribute('data-cs'))*tr.clientWidth,behavior:'smooth'});return}
  if(t.hasAttribute('data-pp')){U.print=t.getAttribute('data-pp');drawBag();drawForm();return}
  if(t.hasAttribute('data-unit')){U.unit=t.getAttribute('data-unit');drawForm();return}
  var n=t.getAttribute('data-unav');
  if(n==='back'){U.fs=Math.max(0,U.fs-1);drawForm()}
  if(n==='next'){if(U.fs===2){if(!U.name.trim()||U.phone.trim().length<7){U.tried=true;drawForm();return}U.fs=3}else U.fs++;drawForm()}
});
pu.addEventListener('input',function(e){
  var t=e.target;
  if(t.hasAttribute('data-ud')){U[t.getAttribute('data-ud')]=Math.max(0,+t.value||0);U.sel=0;$('#udim').innerHTML=dimSvg(U.w,U.g,U.h,sizeStr(U));$('#olcu').innerHTML=olcuSvg(U.w,U.g,U.h);$('#ustr').textContent=sizeStr(U);drawTable();drawSum()}
  if(t.hasAttribute('data-uin'))U[t.getAttribute('data-uin')]=t.value;
});
pu.addEventListener('change',function(e){var t=e.target;if(t.getAttribute('data-file')==='u'){var f=t.files&&t.files[0];U.file=f?f.name:'';if(f&&/^image\//.test(f.type))readLogo(f);else drawForm()}});
var pr=location.search;function qv(k){var m=pr.match(new RegExp('[?&]'+k+'=([^&#]+)'));return m?decodeURIComponent(m[1]):null}
if(qv('renk')&&find(BODY,qv('renk')))U.color=qv('renk');if(!MID&&U.tab!=='is'){}if(qv('baski')&&find(INKS,qv('baski'))){U.ink=qv('baski');U.print='1'}
drawBag();drawTable();drawForm();
}
})();
