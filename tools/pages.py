# -*- coding: utf-8 -*-
"""Kurumsal ve yasal sayfaların içerikleri. {{R}} = köke göre göreli yol, {{HOME}} = ana sayfa.
[ph]...[/ph] ile işaretlenen yerler gerçek bilgi/fotoğraf/belge geldiğinde doldurulacak alanlardır."""

ELDORA = 'https://www.eldora.com.tr/'
ADDR = 'Beylikdüzü OSB Mah. Mermerciler Sanayi Sitesi 8. Cadde No:10/5, 34209 Beylikdüzü / İstanbul'
MAPQ = 'Eprati+Plastik+Beylikd%C3%BCz%C3%BC+OSB+Mermerciler+Sanayi+Sitesi+8.+Cadde+No:10%2F5+Beylikd%C3%BCz%C3%BC+%C4%B0stanbul'
UPDATED = '6 Kasım 2026'

def ph(t):
  return f'<span class="ph">{t}</span>'

def photo(label, ratio='4/3'):
  return f'<div class="phimg" style="aspect-ratio:{ratio}"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 8"/></svg><span>{label}</span></div>'

DRAFT = ('<div class="draft" role="note"><b>Taslak düzen.</b> Bu sayfanın başlık yapısı ve kapsamı canlı sitedeki metinle aynıdır; '
         'yayına alınırken eprati.com\'daki resmi metin birebir aktarılacaktır. Hukuki metinlerde değişiklik yapılmaz.</div>')

KVKK_NAV = [('kvkk/', 'KVKK'), ('musteri-aydinlatma-metni/', 'Müşteri Aydınlatma Metni'),
            ('veri-sorumlusuna-basvuru-formu/', 'Veri Sorumlusuna Başvuru Formu'),
            ('ticari-ileti-acik-riza-metni/', 'Ticari İleti Açık Rıza Metni'), ('cerez-politikasi/', 'Çerez Politikası')]

def legal_shell(cur, toc, body):
  nav = ''.join(f'<a href="{{{{R}}}}{u}"' + (' aria-current="page"' if u == cur else '') + f'>{n}</a>' for u, n in KVKK_NAV)
  tocs = ''.join(f'<a href="#{i}">{t}</a>' for i, t in toc)
  return f'''<section class="wrap docwrap">
  <aside class="docside"><div class="docnav"><small>Yasal metinler</small>{nav}</div>
    {('<div class="doctoc"><small>Bu sayfada</small>' + tocs + '</div>') if toc else ''}</aside>
  <article class="doc">{DRAFT}<p class="docdate">Son güncelleme: {UPDATED}</p>{body}</article>
</section>'''

CONTROLLER = f'''<div class="dl"><div><span>Unvan</span><b>Eprati Plastik ve Ambalaj San. Tic. A.Ş.</b></div>
<div><span>MERSİS No</span><b>{ph('MERSİS numarası eklenecek')}</b></div>
<div><span>Adres</span><b>{ADDR}</b></div>
<div><span>Telefon</span><b>0212 651 66 69</b></div><div><span>E-posta</span><b>satis@eprati.com</b></div>
<div><span>Web</span><b>www.eprati.com</b></div></div>'''

RIGHTS = '''<ul class="ck">
<li>Kişisel verilerinizin işlenip işlenmediğini öğrenme,</li>
<li>İşlenmişse buna ilişkin bilgi talep etme,</li>
<li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
<li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme,</li>
<li>Eksik veya yanlış işlenmişse düzeltilmesini isteme,</li>
<li>KVKK'da öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme,</li>
<li>Düzeltme, silme ve yok etme işlemlerinin aktarıldığı üçüncü kişilere bildirilmesini isteme,</li>
<li>Münhasıran otomatik sistemlerle analiz edilmesi sonucu aleyhinize bir sonuç çıkmasına itiraz etme,</li>
<li>Kanuna aykırı işleme nedeniyle zarara uğramanız hâlinde zararın giderilmesini talep etme.</li></ul>'''

# ---------------------------------------------------------------- HAKKIMIZDA
HAKKIMIZDA = f'''<section class="wrap shero"><div>
  <span class="eyebrow">HAKKIMIZDA</span>
  <h1>2000'den beri dürüst ticaretle poşet üretiyoruz.</h1>
  <p>Eprati Plastik, Beylikdüzü Organize Sanayi Bölgesi'ndeki fabrikasında market poşetinden endüstriyel torbaya kadar
  standart ve özel ambalaj çözümleri üretir; yurt içinde ve 16 ülkeye ihracatta binlerce kuruma hizmet verir.</p></div>
  {photo('Fabrika dış cephe fotoğrafı', '5/4')}
</section>
<section class="wrap"><div class="stats">
  <div><b>2000</b><span>Kuruluş yılı</span></div><div><b>27 yıl</b><span>Üretim ve satış deneyimi</span></div>
  <div><b>16</b><span>İhracat yapılan ülke</span></div><div><b>Binlerce</b><span>Farklı sektörden müşteri</span></div>
</div></section>
<section class="wrap sec2 split">
  <div><span class="eyebrow">HİKÂYEMİZ</span><h2 class="h2">Teknolojiyi takip ederek büyüyen bir aile</h2>
  <p class="lead2">Eprati Plastik A.Ş. 2000 yılında faaliyete başladı. O günden bu yana sektördeki teknolojik gelişmeleri yakından
  izleyerek makine parkını ve ürün yelpazesini sürekli genişletti.</p>
  <p class="muted">Bugün Beylikdüzü OSB'deki üretim tesisimizde, alanında deneyimli kadromuzla; mağaza, gıda, tekstil-temizlik ve
  endüstriyel olmak üzere dört ürün grubunda üretim yapıyoruz. Farklı sektörlerden binlerce kurumun bizi tercih etmesinin
  sebebi, yıllardır değişmeyen iki şey: istikrarlı kalite ve verilen sözün tutulması.</p>
  <p class="muted">Mahalle fırınından ulusal market zincirine kadar her müşterimize aynı özenle yaklaşıyor; ihtiyaca göre standart ya
  da tamamen özel ölçü ve baskıda çözüm üretiyoruz.</p></div>
  {photo('Üretim hattı fotoğrafı', '4/5')}
</section>
<section class="band"><div class="wrap sec2">
  <span class="eyebrow">ÜRETİM SÜRECİMİZ</span><h2 class="h2">Hammaddeden teslimata tek çatı altında</h2>
  <div class="steps5">
    <div>{photo('Hammadde', '1/1')}<b>1 · Hammadde</b><p>Ürüne ve kullanım alanına uygun, gıda ürünlerinde gıdaya uygun hammadde seçimi.</p></div>
    <div>{photo('Film çekimi', '1/1')}<b>2 · Film üretimi</b><p>İstenen kalınlık ve renkte film çekimi.</p></div>
    <div>{photo('Baskı', '1/1')}<b>3 · Baskı</b><p>1–3 renk, CMYK ve fotoğraf baskı seçenekleri.</p></div>
    <div>{photo('Kesim ve konfeksiyon', '1/1')}<b>4 · Kesim ve konfeksiyon</b><p>Ölçüye göre kesim, kulp, körük, bant ve cep işlemleri.</p></div>
    <div>{photo('Paketleme ve sevkiyat', '1/1')}<b>5 · Paketleme ve sevkiyat</b><p>Adet veya kilogram bazında paketleme, yurt içi ve ihracat sevkiyatı.</p></div>
  </div>
  <p class="muted" style="font-size:13px;margin:14px 0 0">{ph('Süreç adımları fabrikadaki gerçek akışa göre kontrol edilecek')}</p>
</div></section>
<section class="wrap sec2">
  <div class="vm">
    <div class="card vmc"><span class="eyebrow">VİZYONUMUZ</span><h3>Sektörü yurt içinde ve dünyada temsil etmek</h3>
      <p class="muted">Türkiye'de ve dünyada teknolojiye ayak uydurarak üretim kapasitemizi ve ihracat potansiyelimizi artırmak;
      ülke ekonomisine ve istihdama katkı sağlamak.</p></div>
    <div class="card vmc"><span class="eyebrow">MİSYONUMUZ</span><h3>Ahlaki değerlere dayalı, dürüst ticaret</h3>
      <p class="muted">Etik değerlere bağlı, dürüst ticareti esas alan bir şirket olmak ve bu anlayışın Türkiye'de ve dünyada
      yaygınlaşmasına katkıda bulunmak.</p></div>
  </div>
  <div class="vals">
    <div><b>Dürüst ticaret</b><p>Teklifte ne yazıyorsa teslimatta o vardır.</p></div>
    <div><b>İstikrarlı kalite</b><p>İlk siparişte de yüzüncü siparişte de aynı ürün.</p></div>
    <div><b>Çözüm odaklılık</b><p>Standart ölçü yetmediğinde özel ölçü ve baskıyla üretim.</p></div>
    <div><b>Gıda güvenliği</b><p>Gıda ambalajlarında TR-34-K-282635 kayıt numaralı belge.</p></div>
  </div>
</section>
<section class="wrap sec2" style="padding-top:0">
  <div class="links3">
    <a class="card" href="{{{{R}}}}sertifikalarimiz/"><b>Sertifikalarımız →</b><span class="muted">Gıda tescil ve kalite belgelerimiz</span></a>
    <a class="card" href="{{{{R}}}}referanslar/"><b>Referanslarımız →</b><span class="muted">Bize güvenen markalar ve örnek işler</span></a>
    <a class="card" href="https://www.youtube.com/watch?v=Y5AYxRgwYEs" target="_blank" rel="noopener"><b>Fabrikamızı izleyin ↗</b><span class="muted">Üretimden kısa bir video</span></a>
  </div>
</section>'''

# ---------------------------------------------------------------- SERTİFİKALAR
# (ad, veren kurum / kapsam, no·tarih, kategori, görsel dosyası [assets/sertifikalar/...] ya da None)
CERTS = [
  ('Gıda Tescil Belgesi', 'T.C. Tarım ve Orman Bakanlığı', 'TR-34-K-282635 · 2025', 'Gıda', None),
  ('ISO 45001', 'İş Sağlığı ve Güvenliği Yönetim Sistemi', None, 'İş güvenliği', None),
  (None, None, None, 'Kalite', None),
  (None, None, None, 'Kalite', None),
  (None, None, None, 'Diğer', None),
  (None, None, None, 'Diğer', None),
  (None, None, None, 'Diğer', None),
]
DOC_ICON = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></svg>'
SEAL = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="9" r="6"/><path d="M9 14.2 7.5 22 12 19.5 16.5 22 15 14.2"/><path d="m9.5 9 1.8 1.8L14.8 7.3"/></svg>'

def _thumb(img, big=False):
  if img:
    return f'<img src="{{{{R}}}}assets/sertifikalar/{img}" alt="" loading="lazy">'
  return f'<span class="cthumb-ph">{DOC_ICON}<small>{"Belge görseli eklenecek" if big else "Görsel"}</small></span>'

def sertifika_html(PRODS, purl, esc):
  n, by, no, cat, img = CERTS[0]
  food = ''.join(f'<a href="{{{{R}}}}{purl(q)}">{esc(q["name"])}</a>' for q in PRODS if q.get('food'))
  data = lambda i, c: f'data-lb="{i}" data-t="{esc(c[0] or "Sertifika")}" data-s="{esc(c[1] or "")}" data-img="{c[4] or ""}"'
  feat = f'''<article class="cfeat">
    <button type="button" class="cthumb big" {data(0, CERTS[0])} aria-label="{n} belgesini büyüt">{_thumb(img, True)}<span class="zoomi" aria-hidden="true">⤢</span></button>
    <div class="cfbody">
      <span class="eyebrow">ÖNE ÇIKAN BELGE · GIDA</span>
      <h2>{n}</h2>
      <p class="cby">{by}</p>
      <div class="cno"><span>Kayıt no</span><b id="cnoval">TR-34-K-282635</b><button type="button" class="copyb" data-copy="TR-34-K-282635">Kopyala</button></div>
      <p class="muted">Gıda ile doğrudan temas eden poşetlerimizin, gıdaya uygun hammaddeden ve kayıtlı bir işletmede üretildiğini gösterir.
      Fırın, manav, şarküteri ve gıda üreticileri bu numarayı denetimlerde ve tedarikçi dosyalarında kullanabilir.</p>
      <p class="cfl">Bu belgeyle üretilen ürünler</p>
      <div class="cfood">{food}</div>
      <div class="cfbtn"><button type="button" class="btn" {data(0, CERTS[0])}>Belgeyi görüntüle</button><a class="btn ghost" href="mailto:satis@eprati.com?subject=G%C4%B1da%20tescil%20belgesi%20talebi">Kopyasını iste</a></div>
    </div></article>'''
  items = ''
  for i, c in enumerate(CERTS[1:], 1):
    name = c[0] or ph('Belge adı')
    sub = c[1] or ph('Kuruluş')
    meta = c[2] or ph('No · tarih')
    items += (f'<button type="button" class="citem" {data(i, c)}><span class="cthumb">{_thumb(c[4])}</span>'
              f'<span class="cibody"><em class="ccat">{c[3]}</em><b>{name}</b><span>{sub}</span><small>{meta}</small></span>'
              f'<span class="ciarr" aria-hidden="true">→</span></button>')
  return f'''<section class="wrap shero chero"><div>
  <span class="eyebrow">SERTİFİKALARIMIZ</span><h1>Belgeli üretim, içiniz rahat.</h1>
  <p>Gıdaya temas eden ambalajlardan iş güvenliğine kadar üretimimizi belgelendiriyoruz.
  Tedarikçi dosyanız için tüm belgelerin güncel kopyasını tek e-postayla gönderiyoruz.</p>
  <div class="ctrust"><span>{SEAL}<b>Gıdaya uygun</b>TR-34-K-282635</span><span>{SEAL}<b>ISO 45001</b>İş sağlığı ve güvenliği</span><span>{SEAL}<b>{len(CERTS)} belge</b>Kopyası talep üzerine</span></div></div>
  <div class="docfan" aria-hidden="true"><i></i><i></i><i><span class="dseal">{SEAL}</span><span class="dl1"></span><span class="dl2"></span><span class="dl3"></span><span class="dl4"></span><span class="dl5"></span></i></div>
</section>
<section class="wrap" style="padding-bottom:20px">{feat}</section>
<section class="wrap" style="padding-top:28px;padding-bottom:56px">
  <div class="ugh"><h2>Diğer belgelerimiz</h2><span class="muted" style="font-size:14px">Büyütmek için dokunun</span></div>
  <div class="clist">{items}</div>
</section>
<section class="band"><div class="wrap sec2">
  <span class="eyebrow">BELGELER SİZİN İÇİN NE İFADE EDİYOR?</span><h2 class="h2">Her müşteri için ayrı bir güvence</h2>
  <div class="aud">
    <div><span class="audi" data-ic="ekmek"></span><b>Fırın, manav ve gıda işletmeleri</b><p>Ürününüzle doğrudan temas eden poşetin gıdaya uygun olduğunu belgeleyebilir, denetimde kayıt numarasını gösterebilirsiniz.</p></div>
    <div><span class="audi" data-ic="atlet"></span><b>Zincir mağazalar ve kurumsal satın alma</b><p>Tedarikçi onay süreçleriniz için gereken belgeleri tek seferde, güncel hâliyle alırsınız.</p></div>
    <div><span class="audi" data-ic="kargo"></span><b>İhracat müşterileri</b><p>Belgelerimizin kopyalarını sipariş öncesinde paylaşıyoruz; ihtiyaç duyulan ek belgeler için birlikte çalışırız.</p></div>
  </div></div></section>
<section class="wrap sec2"><div class="cta2"><div><h2>Tedarikçi dosyanız için belge mi lazım?</h2><p>Tüm belgelerin güncel kopyalarını e-postanıza gönderelim.</p></div>
  <div class="cta2b"><a class="btn green" href="mailto:satis@eprati.com?subject=Tedarik%C3%A7i%20belge%20talebi">E-postayla iste</a><a class="btn outline" href="https://wa.me/905357183598">WhatsApp</a></div></div></section>
<div class="lb" id="lb" hidden role="dialog" aria-modal="true" aria-labelledby="lbt">
  <div class="lbbox">
    <div class="lbhead"><div><b id="lbt"></b><span id="lbs"></span></div><span class="lbn" id="lbn"></span><button type="button" class="lbx" data-lbclose aria-label="Kapat">×</button></div>
    <div class="lbimg" id="lbimg"></div>
    <div class="lbnav"><button type="button" class="lbp" data-lbgo="-1" aria-label="Önceki belge">← Önceki</button><button type="button" class="lbp" data-lbgo="1" aria-label="Sonraki belge">Sonraki →</button></div>
  </div><div class="lbbg" data-lbclose></div></div>'''

# ---------------------------------------------------------------- İLETİŞİM
ILETISIM = f'''<section class="wrap shero sm"><div>
  <span class="eyebrow">İLETİŞİM</span><h1>Bize ulaşmak çok kolay.</h1>
  <p>Teklif, numune, sipariş ya da ihracat; hangi konuda yazarsanız yazın, satış ekibimiz size en kısa sürede döner.</p></div></section>
<section class="wrap" style="padding-bottom:72px"><div class="cgrid">
  <div class="cinfo">
    <a class="ccard" href="tel:+902126516669"><small>Telefon</small><b>0212 651 66 69</b><b>0212 651 17 99</b></a>
    <a class="ccard wa" href="https://wa.me/905357183598"><small>WhatsApp</small><b>0535 718 35 98</b><span>Fotoğraf göndermek en hızlı yol</span></a>
    <a class="ccard" href="mailto:satis@eprati.com"><small>E-posta</small><b>satis@eprati.com</b></a>
    <div class="ccard"><small>Çalışma saatleri</small><b>{ph('Hafta içi saatleri eklenecek')}</b><span>{ph('Cumartesi saatleri eklenecek')}</span></div>
    <div class="ccard"><small>Adres</small><b style="font-size:15px;line-height:1.45">{ADDR}</b>
      <span class="xlocb"><a href="https://www.google.com/maps/search/?api=1&amp;query={MAPQ}" target="_blank" rel="noopener">📍 Haritada aç</a><a href="https://www.google.com/maps/dir/?api=1&amp;destination={MAPQ}" target="_blank" rel="noopener">🧭 Yol tarifi</a></span></div>
    <div class="ccard soc"><small>Bizi takip edin</small><span>
      <a href="https://www.instagram.com/epratiplastikofficial/" target="_blank" rel="noopener">Instagram</a>
      <a href="https://www.facebook.com/epratiplastikofficial/" target="_blank" rel="noopener">Facebook</a>
      <a href="https://www.youtube.com/channel/UC_Hg5Dj8rEe2AiyAkmrdrwg" target="_blank" rel="noopener">YouTube</a>
      <a href="https://epratiplastic.trustpass.alibaba.com" target="_blank" rel="noopener">Alibaba</a></span></div>
  </div>
  <div>
  <form class="card cform" data-demoform novalidate>
    <h2 style="font-size:26px;margin:0 0 4px">Mesaj gönderin</h2>
    <p class="muted" style="margin:0 0 18px;font-size:14px">Fiyat teklifi için <a href="{{{{R}}}}poset-asistani/">Poşet Asistanı</a> daha hızlıdır: poşetinizi seçip tasarımınızı görerek teklif istersiniz.</p>
    <div class="f2">
      <label class="fld">Adınız soyadınız<em class="req">*</em><input name="ad" required autocomplete="name"></label>
      <label class="fld">Firma<em>isteğe bağlı</em><input name="firma" autocomplete="organization"></label>
      <label class="fld">E-posta<em class="req">*</em><input name="eposta" type="email" required autocomplete="email"></label>
      <label class="fld">Telefon<em>isteğe bağlı</em><input name="tel" type="tel" autocomplete="tel"></label>
    </div>
    <p class="dlab" style="margin:16px 0 8px;font-size:14px;font-weight:600">Konu</p>
    <div class="chips" role="radiogroup" aria-label="Konu">
      <label><input type="radio" name="konu" value="Teklif" checked><span>Teklif</span></label>
      <label><input type="radio" name="konu" value="Numune"><span>Numune</span></label>
      <label><input type="radio" name="konu" value="Sipariş durumu"><span>Sipariş durumu</span></label>
      <label><input type="radio" name="konu" value="İhracat"><span>İhracat / Export</span></label>
      <label><input type="radio" name="konu" value="Diğer"><span>Diğer</span></label>
    </div>
    <label class="fld" style="margin-top:14px">Mesajınız<em class="req">*</em><textarea name="mesaj" rows="5" required></textarea></label>
    <label class="cbx"><input type="checkbox" name="kvkk" required><span><a href="{{{{R}}}}musteri-aydinlatma-metni/" target="_blank">Müşteri Aydınlatma Metni</a>'ni okudum.<em class="req">*</em></span></label>
    <label class="cbx"><input type="checkbox" name="iys"><span>Kampanya ve yeni ürünlerden e-posta/SMS ile haberdar olmak istiyorum (<a href="{{{{R}}}}ticari-ileti-acik-riza-metni/" target="_blank">açık rıza metni</a>). İsteğe bağlı.</span></label>
    <p class="ferr" aria-live="polite"></p>
    <button class="btn green" type="submit" style="width:100%;margin-top:6px">Mesajımı gönder</button>
    <div class="fok" hidden><b>✓ Mesajınız alındı.</b><p class="muted" style="margin:4px 0 0">Satış ekibimiz en kısa sürede size dönecek. (Önizleme sürümü: gerçek gönderim WordPress kurulumunda açılacak.)</p></div>
  </form>
  </div>
</div>
<div class="mapbox" id="mapbox"><div class="mapph"><b>Fabrikamızın konumu</b><p class="muted">Harita, Google tarafından yüklenir. Görüntülemek için tıklayın.</p>
  <button type="button" class="btn ghost" data-loadmap="https://www.google.com/maps?q={MAPQ}&amp;output=embed">Haritayı göster</button></div></div>
</section>'''

# ---------------------------------------------------------------- KVKK MERKEZ
KVKK = f'''<section class="wrap shero sm"><div><span class="eyebrow">KVKK</span><h1>Verileriniz gizli tutulur.</h1>
  <p>6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında hazırladığımız aydınlatma metinleri, başvuru formu ve çerez
  politikamız aşağıdadır.</p></div></section>
<section class="wrap" style="padding-bottom:72px"><div class="kgrid">
  <a class="card kdoc" href="{{{{R}}}}musteri-aydinlatma-metni/"><span class="kdi">📄</span><b>Müşteri Aydınlatma Metni</b><p class="muted">Hangi verilerinizi, hangi amaçla ve hangi hukuki sebeple işlediğimiz.</p><i>Oku →</i></a>
  <a class="card kdoc" href="{{{{R}}}}veri-sorumlusuna-basvuru-formu/"><span class="kdi">✍️</span><b>Veri Sorumlusuna Başvuru Formu</b><p class="muted">KVKK 11. madde kapsamındaki haklarınızı kullanmak için.</p><i>Oku →</i></a>
  <a class="card kdoc" href="{{{{R}}}}ticari-ileti-acik-riza-metni/"><span class="kdi">✉️</span><b>Ticari Elektronik İleti Açık Rıza Metni</b><p class="muted">Kampanya ve bilgilendirme e-posta/SMS'leri için onay.</p><i>Oku →</i></a>
  <a class="card kdoc" href="{{{{R}}}}cerez-politikasi/"><span class="kdi">🍪</span><b>Çerez Politikası</b><p class="muted">Sitemizde kullanılan çerezler ve tercihlerinizi nasıl yöneteceğiniz.</p><i>Oku →</i></a>
  <a class="card kdoc" href="{{{{R}}}}musteri-aydinlatma-metni/"><span class="kdi">🛡️</span><b>KVKK Aydınlatma Metni</b><p class="muted">{ph('Canlı sitedeki ayrı KVKK aydınlatma metni buraya bağlanacak')}</p><i>Oku →</i></a>
  <div class="card kdoc kq"><b>Sorunuz mu var?</b><p class="muted">Kişisel verilerinizle ilgili her türlü talep için konu satırına <b>"KVKK Bilgi Talebi"</b> yazarak bize ulaşın.</p><a class="btn ghost" href="mailto:satis@eprati.com?subject=KVKK%20Bilgi%20Talebi">satis@eprati.com</a></div>
</div></section>'''

# ---------------------------------------------------------------- MÜŞTERİ AYDINLATMA
MUSTERI = legal_shell('musteri-aydinlatma-metni/', [('m1','Veri sorumlusu'),('m2','İşlenen veriler ve amaçlar'),('m3','Hukuki sebepler'),('m4','Toplama yöntemleri'),('m5','Aktarım'),('m6','Saklama süreleri'),('m7','Haklarınız'),('m8','Başvuru')], f'''
<h2 id="m1">1. Veri sorumlusu</h2>
<p>6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca kişisel verileriniz, veri sorumlusu sıfatıyla aşağıda bilgileri yer alan şirketimiz tarafından işlenmektedir.</p>
{CONTROLLER}
<h2 id="m2">2. İşlenen kişisel veriler ve işleme amaçları</h2>
<table class="dt"><thead><tr><th>Veri kategorisi</th><th>Örnek</th><th>Amaç</th></tr></thead><tbody>
<tr><td>Kimlik</td><td>Ad, soyad, unvan</td><td>Satış, sözleşme ve faturalama süreçleri</td></tr>
<tr><td>İletişim</td><td>Telefon, e-posta, adres</td><td>Teklif, sipariş, müşteri desteği ve sevkiyat</td></tr>
<tr><td>Finans</td><td>IBAN, banka bilgisi</td><td>Ödeme, tahsilat ve yasal muhasebe yükümlülükleri</td></tr>
<tr><td>İşlem güvenliği</td><td>IP adresi, log kayıtları</td><td>Web sitesi ve bilgi güvenliği</td></tr>
<tr><td>Pazarlama</td><td>Çerez kayıtları</td><td>Yalnızca açık rızanız varsa; analiz ve reklam ölçümü</td></tr>
</tbody></table>
<h2 id="m3">3. Hukuki sebepler</h2>
<p>Kişisel verileriniz KVKK m.5/2 kapsamında; bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması, hukuki yükümlülüklerimizin yerine getirilmesi, bir hakkın tesisi, kullanılması veya korunması ve meşru menfaatlerimiz için zorunlu olması hukuki sebeplerine dayanılarak işlenir.</p>
<p>Ticari elektronik ileti gönderimi ayrı bir açık rıza metnine tabidir. Bu onayı vermemeniz ürün veya hizmet almanızı engellemez.</p>
<h2 id="m4">4. Toplama yöntemleri</h2>
<p>Verileriniz sözleşmeler, siparişler, web sitemizdeki formlar, e-ticaret üyelikleri, telefon, e-posta, WhatsApp ve yüz yüze görüşmeler aracılığıyla, otomatik veya kısmen otomatik yollarla toplanır.</p>
<h2 id="m5">5. Aktarım</h2>
<p>Verileriniz yukarıdaki amaçlarla sınırlı olarak; denetçilere, mali müşavirlere, bankalara, kargo ve lojistik firmalarına, iş ortaklarına, tedarikçilere, hizmet sağlayıcılara ve yetkili kamu kurumlarına aktarılabilir.</p>
<p>Analiz veya reklam çerezlerine onay vermeniz hâlinde ilgili veriler, KVKK'nın yurt dışı aktarım kurallarına uygun olarak Google, Microsoft ve Meta'ya aktarılabilir.</p>
<h2 id="m6">6. Saklama süreleri</h2>
<p>Verileriniz ilgili mevzuatta öngörülen süre veya işleme amacının gerektirdiği süre boyunca saklanır. Ticari defter ve faturalar Türk Ticaret Kanunu gereği 10 yıl saklanır. Pazarlama onayına dayanan veriler, onayınızı geri alana kadar saklanır.</p>
<h2 id="m7">7. KVKK m.11 kapsamındaki haklarınız</h2>
{RIGHTS}
<h2 id="m8">8. Başvuru</h2>
<p>Taleplerinizi <a href="{{{{R}}}}veri-sorumlusuna-basvuru-formu/">Veri Sorumlusuna Başvuru Formu</a> ile; posta veya elden, sistemimizde kayıtlı e-posta adresinizden ya da güvenli elektronik imzalı olarak satis@eprati.com adresine iletebilirsiniz. Başvurular en geç 30 gün içinde ücretsiz sonuçlandırılır; işlemin ayrıca bir maliyet gerektirmesi hâlinde Kişisel Verileri Koruma Kurulu'nun belirlediği tarife uygulanabilir.</p>''')

# ---------------------------------------------------------------- BAŞVURU FORMU
BASVURU = legal_shell('veri-sorumlusuna-basvuru-formu/', [('b1','Başvuru yolları'),('b2','Başvuru formu')], f'''
<p>KVKK'nın 11. maddesinde sayılan haklarınıza ilişkin taleplerinizi, Kanun'un 13. maddesi ve Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ uyarınca bu form ile iletebilirsiniz.</p>
{CONTROLLER}
<h2 id="b1">Başvuru yolları</h2>
<div class="ways">
  <div class="card"><b>Şahsen veya noter aracılığıyla</b><p class="muted">Islak imzalı formu yukarıdaki adrese, zarfın üzerine <b>"KVKK Bilgi Talebi"</b> yazarak iletin.</p></div>
  <div class="card"><b>E-posta ile</b><p class="muted">Sistemimizde kayıtlı e-posta adresinizden, konu satırına <b>"KVKK Bilgi Talebi"</b> yazarak satis@eprati.com adresine gönderin.</p></div>
</div>
<p class="muted" style="font-size:14px">Kimliğinizi doğrulamak için kimlik belgenizin bir kopyasını isteyebiliriz. Başvurular en geç 30 gün içinde sonuçlandırılır; işlemin ayrıca bir maliyet gerektirmesi hâlinde Kurul tarifesi uygulanabilir.</p>
<h2 id="b2">Başvuru formu</h2>
<form class="card cform" data-demoform novalidate>
  <div class="f2">
    <label class="fld">Ad soyad<em class="req">*</em><input name="ad" required></label>
    <label class="fld">T.C. kimlik no<em>yabancılar için uyruk ve pasaport no</em><input name="tc" required></label>
    <label class="fld">E-posta<em class="req">*</em><input name="eposta" type="email" required></label>
    <label class="fld">Telefon<input name="tel" type="tel"></label>
  </div>
  <label class="fld" style="margin-top:14px">Tebligata esas adres<em class="req">*</em><input name="adres" required></label>
  <p class="dlab" style="margin:16px 0 8px;font-size:14px;font-weight:600">Şirketimizle ilişkiniz</p>
  <div class="chips"><label><input type="radio" name="iliski" value="Müşteri" checked><span>Müşteri</span></label><label><input type="radio" name="iliski" value="Tedarikçi"><span>Tedarikçi</span></label><label><input type="radio" name="iliski" value="Ziyaretçi"><span>Ziyaretçi</span></label><label><input type="radio" name="iliski" value="Diğer"><span>Diğer</span></label></div>
  <p class="dlab" style="margin:16px 0 8px;font-size:14px;font-weight:600">Talep türü</p>
  <div class="chips"><label><input type="checkbox" name="tur" value="Bilgi"><span>Bilgi talebi</span></label><label><input type="checkbox" name="tur" value="Düzeltme"><span>Düzeltme</span></label><label><input type="checkbox" name="tur" value="Silme"><span>Silme / yok etme</span></label><label><input type="checkbox" name="tur" value="Aktarım"><span>Aktarım bilgisi</span></label><label><input type="checkbox" name="tur" value="İtiraz"><span>İtiraz</span></label><label><input type="checkbox" name="tur" value="Tazminat"><span>Zararın giderilmesi</span></label><label><input type="checkbox" name="tur" value="Diğer"><span>Diğer</span></label></div>
  <label class="fld" style="margin-top:14px">Talebinizin açıklaması<em class="req">*</em><textarea name="mesaj" rows="5" required></textarea></label>
  <p class="dlab" style="margin:16px 0 8px;font-size:14px;font-weight:600">Yanıtı nasıl almak istersiniz?</p>
  <div class="chips"><label><input type="radio" name="yanit" value="E-posta" checked><span>E-posta</span></label><label><input type="radio" name="yanit" value="Posta"><span>Posta</span></label><label><input type="radio" name="yanit" value="Elden"><span>Elden teslim</span></label></div>
  <label class="cbx"><input type="checkbox" name="dogru" required><span>Verdiğim bilgilerin doğru ve güncel olduğunu beyan ederim.<em class="req">*</em></span></label>
  <p class="ferr" aria-live="polite"></p>
  <div class="row" style="gap:10px"><button class="btn green" type="submit">Başvuruyu gönder</button><button class="btn ghost" type="button" onclick="window.print()">Yazdır (ıslak imza için)</button></div>
  <div class="fok" hidden><b>✓ Başvurunuz alındı.</b><p class="muted" style="margin:4px 0 0">En geç 30 gün içinde seçtiğiniz yolla yanıtlanacaktır. (Önizleme sürümü: gerçek gönderim WordPress kurulumunda açılacak.)</p></div>
</form>''')

# ---------------------------------------------------------------- TİCARİ İLETİ
TICARI = legal_shell('ticari-ileti-acik-riza-metni/', [], f'''
<h2>Ticari Elektronik İleti Açık Rıza Metni</h2>
<p>Onay vermem hâlinde; adım, soyadım, e-posta adresim ve telefon numaramın, Eprati Plastik ve Ambalaj San. Tic. A.Ş. tarafından ürünler, kampanyalar, yeni ürünler, katalog ve etkinlikler hakkında e-posta ve SMS yoluyla ticari elektronik ileti gönderilmesi amacıyla işlenmesine izin veriyorum.</p>
<p>Bu amaçla verilerimin, şirketin hizmet aldığı e-posta/SMS gönderim firmalarıyla ve İleti Yönetim Sistemi (İYS) ile paylaşılabileceğini biliyorum.</p>
<div class="callout"><b>Onay vermemek hiçbir şeyi değiştirmez.</b> Bu onayı vermemeniz Eprati'den ürün veya hizmet almanızı engellemez.</div>
<h3>Onayınızı nasıl geri alırsınız?</h3>
<ul class="ck"><li>Gelen iletilerdeki "abonelikten çık" bağlantısı ile,</li><li>İleti Yönetim Sistemi (İYS) üzerinden,</li><li>satis@eprati.com adresine yazarak,</li></ul>
<p>istediğiniz zaman, ücretsiz olarak geri alabilirsiniz. Kişisel verilerinizin işlenmesine ilişkin ayrıntılı bilgi için <a href="{{{{R}}}}musteri-aydinlatma-metni/">Müşteri Aydınlatma Metni</a>'ni inceleyebilirsiniz.</p>''')

# ---------------------------------------------------------------- ÇEREZ
COOKIES = [('PHPSESSID','Eprati','Zorunlu','Oturumun çalışması'),('pll_language','Eprati','Zorunlu','Dil tercihinin hatırlanması'),
  ('cmplz_*','Eprati','Zorunlu','Çerez tercihlerinizin saklanması'),('_ga','Google','Analiz','Ziyaretçilerin ayırt edilmesi (Google Analytics)'),
  ('_ga_TJCM4F2WJ1','Google','Analiz','Oturum durumunun saklanması (Google Analytics)'),('_gcl_au','Google','Pazarlama','Reklam dönüşüm ölçümü (Google Ads)'),
  ('_clck','Microsoft','Analiz','Kullanıcı kimliği (Microsoft Clarity)'),('_clsk','Microsoft','Analiz','Oturum kayıtlarının birleştirilmesi (Clarity)'),
  ('MUID','Microsoft','Analiz','Tarayıcı tanımlama (Microsoft)'),('_fbp','Meta','Pazarlama','Reklam ölçümü ve hedefleme (Meta Pixel)')]
CEREZ = legal_shell('cerez-politikasi/', [('c1','Çerez nedir?'),('c2','Kullandığımız çerez türleri'),('c3','Çerez listesi'),('c4','Hukuki sebep ve aktarım'),('c5','Tercihlerinizi yönetin'),('c6','Haklarınız')], f'''
<h2 id="c1">Çerez nedir?</h2>
<p>Çerezler, bir web sitesini ziyaret ettiğinizde tarayıcınıza kaydedilen küçük metin dosyalarıdır. Eprati Plastik ve Ambalaj San. Tic. A.Ş., KVKK kapsamında veri sorumlusu olarak sitemizde aşağıdaki çerezleri kullanır.</p>
<h2 id="c2">Kullandığımız çerez türleri</h2>
<div class="ctypes">
  <div class="card"><b>Zorunlu</b><span class="tagx on">Her zaman aktif</span><p class="muted">Sitenin çalışması ve dil tercihinizin hatırlanması için gereklidir.</p></div>
  <div class="card"><b>Analiz</b><span class="tagx">Onayınızla</span><p class="muted">Google Analytics ve Microsoft Clarity. Clarity tıklama, kaydırma ve fare hareketlerini kaydeder.</p></div>
  <div class="card"><b>Pazarlama</b><span class="tagx">Onayınızla</span><p class="muted">Google Ads ve Meta (Facebook/Instagram) Pixel ile reklam ölçümü ve hedefleme.</p></div>
</div>
<h2 id="c3">Çerez listesi</h2>
<div style="overflow-x:auto"><table class="dt"><thead><tr><th>Çerez</th><th>Sağlayıcı</th><th>Tür</th><th>Amaç</th><th>Süre</th></tr></thead><tbody>
{''.join(f'<tr><td><code>{a}</code></td><td>{b}</td><td>{c}</td><td>{d}</td><td>{ph("aktarılacak")}</td></tr>' for a,b,c,d in COOKIES)}
</tbody></table></div>
<p class="muted" style="font-size:13px">Çerezlerin süreleri oturum sonundan 13 aya kadar değişir. İşlenen veriler: IP adresi, tarayıcı ve cihaz bilgileri, çerez kimlikleri, ziyaret edilen sayfalar, tıklamalar ve ziyaret zamanları.</p>
<h2 id="c4">Hukuki sebep ve aktarım</h2>
<p>Zorunlu çerezler KVKK m.5/2-c ve m.5/2-f hükümlerine; analiz ve pazarlama çerezleri açık rızanıza dayanır. Bu çerezleri reddetmeniz siteyi kullanmanızı engellemez. Analiz ve pazarlama çerezleriyle toplanan veriler, sunucuları ağırlıklı olarak ABD ve AB'de bulunan Google, Microsoft ve Meta ile paylaşılır.</p>
<h2 id="c5">Tercihlerinizi yönetin</h2>
<p>İlk ziyaretinizde çıkan bilgilendirme ile tüm çerezleri kabul edebilir, reddedebilir veya kategori bazında seçim yapabilirsiniz. Onayınızı daha sonra "İzinleri yönet" bağlantısından değiştirebilir veya geri alabilir, tarayıcı ayarlarınızı kullanabilir ya da Google Analytics için Google'ın devre dışı bırakma eklentisini kurabilirsiniz.</p>
<button type="button" class="btn ghost" disabled>İzinleri yönet {ph('çerez paneli WordPress kurulumunda')}</button>
<h2 id="c6">Haklarınız</h2>
<p>KVKK m.11 kapsamındaki haklarınız için <a href="{{{{R}}}}veri-sorumlusuna-basvuru-formu/">başvuru formunu</a> kullanabilir, şahsen veya noter aracılığıyla başvurabilir ya da satis@eprati.com adresine yazabilirsiniz. Başvurular 30 gün içinde yanıtlanır. Kullandığımız çerezler değiştikçe bu politika güncellenir; güncel sürüm her zaman bu sayfadadır.</p>''')

# ---------------------------------------------------------------- SSS
SSS_GROUPS = [
 ('Ürün ve ölçü', [
  ('Hangi poşetleri üretiyorsunuz?', 'Mağaza, gıda, tekstil-temizlik ve endüstriyel olmak üzere dört grupta 24 ürün üretiyoruz: atlet, el geçmeli, kulplu ve kargo poşetinden ekmek, bakliyat, halı ve kuru temizleme poşetine, kilitli torbadan film bobine kadar. <a href="{{R}}urunler/">Tüm ürünler →</a>'),
  ('Standart dışı ölçü yapıyor musunuz?', 'Evet. Standart ölçülerin yanında özel en, boy, körük ve kalınlıkta üretim yapıyoruz. Ölçüyü teklif formuna yazmanız yeterli.'),
  ('Atlet poşet ölçüleri nelerdir?', '20+7+7 × 35 cm ile 30+10+10 × 60 cm arasında altı standart ölçümüz var. Özel ölçü de üretilir.'),
  ('Halı poşeti nasıl satılıyor?', 'Halı poşetleri ortalama 30 kg ağırlığında sonsuz rulo olarak sunulur.'),
  ('Hangi ürün bana uygun, emin değilim.', '<a href="{{R}}poset-asistani/">Poşet Asistanı</a> sektörünüze göre en çok tercih edilen poşetleri önerir; isterseniz bir fotoğraf gönderin, ekibimiz yardımcı olsun.')]),
 ('Baskı ve tasarım', [
  ('Logomu basabilir misiniz?', 'Evet. 1–3 renk, CMYK (4+renk) ve fotoğraf baskı seçeneklerimiz var. Logonuz yoksa firma adınızı, telefonunuzu ve adresinizi de basabiliriz.'),
  ('Logo dosyam hangi formatta olmalı?', 'Önizleme için PNG veya JPG yeterli. Baskı aşamasında mümkünse vektörel (PDF, AI, EPS, SVG) dosya isteriz; yoksa tasarım ekibimiz yardımcı olur.'),
  ('Sitedeki önizleme birebir baskıyı mı gösteriyor?', 'Hayır, önizleme temsilidir. Nihai tasarım, renk tonları ve baskı yerleşimi sipariş aşamasında tasarım ekibimizle birlikte netleştirilir.'),
  ('Poşetin iki yüzüne farklı baskı yapılabilir mi?', 'Evet. Tek yüz, iki yüz aynı ya da ön ve arka yüze farklı baskı yapılabilir.')]),
 ('Sipariş ve teslimat', [
  ('Sipariş süreci nasıl işliyor?', 'İhtiyaç ve ölçüyü belirliyor, tasarım ve baskı talebinizi alıyor, onayınızın ardından üretim ve teslimatı planlıyoruz.'),
  ('Teklif almak için üye olmam gerekiyor mu?', 'Hayır. Teklif formunu doldurmanız yeterli; e-posta adresinizi doğrulamak için tek kullanımlık bir kod göndeririz.'),
  ('Az adette hazır kargo poşeti alabilir miyim?', f'Evet. Standart ölçülerdeki baskısız kargo poşetlerini e-ticaret mağazamız <a href="{ELDORA}" target="_blank" rel="noopener">Eldora</a> üzerinden kredi kartıyla hemen satın alabilirsiniz.'),
  ('Minimum sipariş miktarı ve teslim süresi nedir?', 'Ürüne, ölçüye ve baskıya göre değişir; teklifinizde açıkça belirtiriz. ' + ph('Genel bilgi eklenecek'))]),
 ('Gıda ve belgeler', [
  ('Ürünleriniz gıdaya uygun mu?', 'Evet. Gıda ambalajlarımız TR-34-K-282635 kayıt numaralı belgeyle, gıdaya uygun hammaddeden üretilir.'),
  ('Tedarikçi dosyamız için belge gönderir misiniz?', 'Evet. <a href="{{R}}sertifikalarimiz/">Sertifikalarımızın</a> güncel kopyalarını e-posta ile gönderiyoruz.')]),
 ('İhracat', [
  ('Yurt dışına satış yapıyor musunuz?', '16 ülkeye ihracat yapıyoruz. Yurt dışındaki alıcılar <a href="https://epratiplastic.trustpass.alibaba.com" target="_blank" rel="noopener">Alibaba.com mağazamız</a> üzerinden de bize ulaşabilir.')]),
]
def sss_html():
  g = ''.join(f'<a href="#g{i}">{n}</a>' for i, (n, _) in enumerate(SSS_GROUPS))
  body = ''
  for i, (n, qs) in enumerate(SSS_GROUPS):
    body += f'<h2 id="g{i}" class="sssh">{n}</h2>' + ''.join(f'<details class="qa"><summary>{q}<span aria-hidden="true"></span></summary><div>{a}</div></details>' for q, a in qs)
  return f'''<section class="wrap shero sm"><div><span class="eyebrow">SIKÇA SORULAN SORULAR</span><h1>Aklınıza takılan her şey</h1>
  <p>Cevabını bulamadığınız bir soru varsa WhatsApp'tan yazın ya da arayın.</p></div></section>
<section class="wrap docwrap" style="padding-bottom:72px"><aside class="docside"><div class="doctoc"><small>Konular</small>{g}</div>
  <div class="card" style="margin-top:14px;font-size:14px"><b>Hâlâ sorunuz mu var?</b><p class="muted" style="margin:6px 0 12px">Satış ekibimiz hafta içi yanıt verir.</p><a class="btn green" style="width:100%" href="https://wa.me/905357183598">WhatsApp</a></div></aside>
  <div class="doc">{body}</div></section>'''

# ---------------------------------------------------------------- REFERANSLAR
import json as _json, os as _os
REFG = _json.load(open(_os.path.join(_os.path.dirname(_os.path.abspath(__file__)), 'parts', 'refs.json'), encoding='utf-8'))

def clients_html(key, title):
  L = REFG[key]
  tiles = ''.join(f'<div class="rtile"><img src="{{{{R}}}}assets/refs/{r["f"]}" alt="{r["ad"]}" loading="lazy"></div>' for r in L)
  sub = {'kuru': 'Kuru temizleme poşetlerimiz İstanbul\'dan Ankara\'ya, Körfez\'e kadar kuru temizlemeciler ve otellerde kullanılıyor.',
         'hali': 'Halı poşetlerimiz Türkiye\'nin yanı sıra Almanya, İsveç, Yunanistan ve Körfez ülkelerindeki halı yıkama firmalarında kullanılıyor.'}[key]
  return f'''<section class="wrap" style="padding-bottom:56px"><div class="clients">
    <div class="clh"><span class="eyebrow">BU POŞETİ KULLANANLAR</span><h2>{title} bizi tercih ediyor</h2><p class="muted">{sub}</p></div>
    <div class="rgrid2 cgrid2">{tiles}</div></div></section>'''

def refs_html():
  tiles = ''.join(f'<div class="rtile"><img src="{{{{R}}}}assets/refs/{r["f"]}" alt="{r["ad"]}" loading="lazy"></div>' for r in REFG['genel'])
  works = [('atlet-sari','Atlet poşet','ŞOK Market'),('kulplu-kirmizi','Kulplu poşet','İpek Pişmaniye'),('elgecme-beyaz','El geçmeli poşet','Turkish Support Services')]
  w = ''.join(f'<figure class="rwork"><img src="{{{{R}}}}assets/isler/{f}.webp" alt="{t} örnek iş" loading="lazy"><figcaption><b>{t}</b><span>{d}</span></figcaption></figure>' for f, t, d in works)
  w += ''.join(f'<figure class="rwork">{photo("İş örneği eklenecek", "4/5")}<figcaption><b>{ph("Ürün adı")}</b><span>{ph("Müşteri / sektör")}</span></figcaption></figure>' for _ in range(3))
  return f'''<section class="wrap shero sm"><div><span class="eyebrow">REFERANSLAR</span><h1>Bize güvenen markalar</h1>
  <p>Mahalle fırınından ulusal zincirlere, bankalardan ihracatçı üreticilere; farklı sektörlerden binlerce kurum poşetlerini bize emanet ediyor.</p></div></section>
<section class="wrap" style="padding-bottom:40px"><div class="rgrid2">{tiles}</div></section>
<section class="band"><div class="wrap sec2"><span class="eyebrow">ÖRNEK İŞLER</span><h2 class="h2">Ürettiklerimizden bazıları</h2><div class="rworks">{w}</div></div></section>
<section class="wrap sec2"><div class="cta2"><div><h2>Sıradaki marka sizinki olsun.</h2><p>Poşetinizi seçin, logonuzu ekleyin, nasıl duracağını görün.</p></div><a class="btn green" href="{{{{R}}}}poset-asistani/">Poşetimi tasarla →</a></div></section>'''

def urunler_html(CATS, PRODS, purl, esc):
  out = '''<section class="wrap shero sm"><div><span class="eyebrow">ÜRÜNLER</span><h1>Tüm ürünlerimiz</h1>
  <p>Dört ürün grubunda 24 ürün. Aradığınızı bulamazsanız <a href="{{R}}poset-asistani/">Poşet Asistanı</a> birkaç soruyla size uygun olanı önersin.</p></div></section>'''
  out += '<nav class="wrap ujump" aria-label="Ürün grupları">' + ''.join(f'<a href="#g-{k}">{esc(c["name"])}</a>' for k, c in CATS.items()) + '</nav>'
  for k, c in CATS.items():
    cards = ''.join(f'<a class="pcard" href="{{{{R}}}}{purl(q)}"><span class="pcic" data-ic="{q["icon"]}"></span><b>{esc(q["name"])}</b><p>{esc(q["use"])}</p>' + ('<em>Gıdaya uygun</em>' if q.get('food') else '') + '<i>İncele →</i></a>' for q in PRODS if q['cat'] == k)
    out += f'<section class="wrap" id="g-{k}" style="padding-bottom:40px;scroll-margin-top:150px"><div class="ugh"><h2>{esc(c["name"])}</h2><a href="{{{{R}}}}urunler/{k}/">Gruba git →</a></div><div class="pgrid">{cards}</div></section>'
  out += f'''<section class="wrap" style="padding-bottom:72px"><div class="eldora"><div><span class="eyebrow">HEMEN SATIN AL</span><b>Hazır kargo poşeti mi lazım?</b><p>Standart ölçülerdeki baskısız kargo poşetlerini e-ticaret mağazamız Eldora'dan kredi kartıyla hemen sipariş edin.</p></div><a class="btn" href="{ELDORA}" target="_blank" rel="noopener">Eldora'dan satın al ↗</a></div></section>'''
  return out
