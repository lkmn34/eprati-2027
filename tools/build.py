#!/usr/bin/env python3
"""Eprati sitesini tools/parts içindeki parçalardan üretir.
Kullanım: python3 tools/build.py   (depo kök klasöründen)
Alan adı değişince yalnızca BASE değiştirilir (ör. https://www.eprati.com/)."""
import json, os, sys, datetime, time
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import pages as PG
VER = str(int(time.time()))

BASE = 'https://lkmn34.github.io/eprati-2027/'
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = os.path.join(ROOT, 'tools', 'parts')
def part(n): return open(os.path.join(P, n), encoding='utf-8').read()
PD = json.load(open(os.path.join(P, 'products.json'), encoding='utf-8'))
CATS, PRODS = PD['cats'], PD['products']
def purl(p): return f"urunler/{p['cat']}/{p['id']}/"
NOTICE = '<div class="pnote" role="note"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 8h.01M11 12h1v5h1"/></svg><span><b>Bu bir önizlemedir.</b> Görseller temsilidir; nihai tasarım, renk tonları ve baskı yerleşimi sipariş aşamasında tasarım ekibimizle birlikte netleştirilir.</span></div>'

ORG = {
  "@context": "https://schema.org", "@type": "Organization", "@id": BASE + "#org",
  "name": "Eprati Plastik ve Ambalaj San. Tic. A.Ş.", "alternateName": "Eprati Plastik",
  "url": BASE, "logo": BASE + "logo.svg", "foundingDate": "2000",
  "email": "satis@eprati.com", "telephone": "+90-212-651-66-69",
  "address": {"@type": "PostalAddress", "streetAddress": "Beylikdüzü OSB Mah. Mermerciler Sanayi Sitesi 8. Cadde No:10/5",
              "addressLocality": "Beylikdüzü", "addressRegion": "İstanbul", "postalCode": "34209", "addressCountry": "TR"},
  "contactPoint": [{"@type": "ContactPoint", "telephone": "+90-212-651-66-69", "contactType": "sales", "areaServed": "TR", "availableLanguage": ["tr", "en", "de"]},
                   {"@type": "ContactPoint", "telephone": "+90-535-718-35-98", "contactType": "customer service", "availableLanguage": ["tr"]}],
  "sameAs": ["https://www.facebook.com/epratiplastikofficial/", "https://www.instagram.com/epratiplastikofficial/",
             "https://www.youtube.com/channel/UC_Hg5Dj8rEe2AiyAkmrdrwg", "https://epratiplastic.trustpass.alibaba.com"]
}
FAQ = [
  ("Ürünleriniz gıdaya uygun mu?", "Evet. Gıda ambalajlarımız TR-34-K-282635 kayıt numaralı belgeyle üretilir."),
  ("Standart dışı ölçü ve baskı yapıyor musunuz?", "Evet. Özel ölçü ve kalınlıkta üretim yapıyor, logo veya tasarımınızı fotoğraf baskı dahil tüm renklerde basabiliyoruz."),
  ("Atlet poşet ölçüleri nelerdir?", "20+7+7 x 35 cm ile 30+10+10 x 60 cm arasında altı standart ölçümüz var. Özel ölçü de üretilir."),
  ("Halı poşeti nasıl satılıyor?", "Halı poşetleri ortalama 30 kg ağırlığında sonsuz rulo olarak sunulur."),
  ("Sipariş süreci nasıl işliyor?", "İhtiyaç ve ölçüyü belirliyor, tasarım ve baskı talebinizi alıyor, ardından üretim ve teslimatı planlıyoruz."),
]
def crumbs(items):
  return {"@context": "https://schema.org", "@type": "BreadcrumbList",
          "itemListElement": [{"@type": "ListItem", "position": i + 1, "name": n, "item": BASE + u} for i, (n, u) in enumerate(items)]}

PAGES = [
  dict(path='index.html', url='', root='', main='home.html',
       title='Eprati Plastik | Plastik Poşet ve Ambalaj Üreticisi — İstanbul',
       desc='2000\'den beri İstanbul Beylikdüzü\'nde entegre üretim: atlet, el geçmeli, kulplu, kargo, gıda ve endüstriyel poşetler. Özel ölçü ve baskılı poşet için hemen teklif alın.',
       ld=[ORG, {"@context": "https://schema.org", "@type": "WebSite", "name": "Eprati Plastik", "url": BASE, "inLanguage": "tr"},
           {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
             {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in FAQ]}]),
  dict(path='poset-asistani/index.html', url='poset-asistani/', root='../', main='asistan.html',
       title='Poşet Asistanı: Size Uygun Poşeti 1 Dakikada Bulun | Eprati Plastik',
       desc='Sektörünüzü, ürününüzü ve baskı tercihinizi seçin; size en uygun poşeti önerelim ve teklif talebinizi hazırlayalım.',
       ld=[crumbs([("Ana sayfa", ""), ("Poşet Asistanı", "poset-asistani/")])]),
]

def esc(t): return str(t).replace('&','&amp;').replace('<','&lt;').replace('>','&gt;').replace('"','&quot;')
for p in PRODS:
  cat = CATS[p['cat']]
  PAGES.append(dict(path=purl(p)+'index.html', url=purl(p), root='../../../', main='urun.html', prod=p,
    title=f"{p['name']} — {cat['short']} Ambalajları | Eprati Plastik",
    desc=(p['desc'][:150] + ' Özel ölçü ve baskı için teklif alın.')[:300],
    ld=[crumbs([("Ana sayfa", ""), ("Ürünler", "urunler/"), (cat['name'], "#urunler"), (p['name'], purl(p))]),
        {"@context": "https://schema.org", "@type": "Product", "name": p['name'], "category": cat['name'], "description": p['desc'],
         "brand": {"@type": "Brand", "name": "Eprati"}, "manufacturer": {"@id": BASE + "#org"}, "image": BASE + "og-image.png", "url": BASE + purl(p)}]))

CATDESC={'magaza-ambalajlari':'Marketten butiğe, eczaneden e-ticarete: mağazanızın adını her müşterinizle birlikte dışarı taşıyan poşetler.',
 'gida-ambalajlari':'Gıdaya uygun hammaddeden, TR-34-K-282635 kayıt numaralı belgeyle üretilen ekmek, manav, bakliyat ve buz poşetleri.',
 'tekstil-ve-temizlik-ambalajlari':'Kuru temizlemeden halı yıkamaya, hazır giyimden ürün paketlemeye: ürünlerinizi toz ve kirden koruyan ambalajlar.',
 'endustriyel-ambalajlar':'Beyaz eşya, hırdavat, otomotiv ve seri üretim için dayanıklı torba, kilitli torba ve film çözümleri.'}
for k,c in CATS.items():
  PAGES.append(dict(path=f'urunler/{k}/index.html', url=f'urunler/{k}/', root='../../', main='kategori.html', catk=k,
    title=f"{c['name']} | Eprati Plastik", desc=CATDESC[k],
    ld=[crumbs([("Ana sayfa", ""), ("Ürünler", "urunler/"), (c['name'], f'urunler/{k}/')])]))


SP = [
  ('hakkimizda/', 'Hakkımızda', PG.HAKKIMIZDA, 'Hakkımızda | Eprati Plastik — 2000\'den Beri Poşet Üretimi', 'Eprati Plastik 2000 yılından beri Beylikdüzü OSB\'deki fabrikasında poşet ve ambalaj üretiyor. Hikâyemiz, üretim sürecimiz, vizyonumuz ve misyonumuz.', []),
  ('sertifikalarimiz/', 'Sertifikalarımız', PG.sertifika_html(PRODS, purl, esc), 'Sertifikalarımız | Eprati Plastik', 'Gıda tescil belgesi (TR-34-K-282635), ISO 45001 ve diğer kalite belgelerimiz.', [('Hakkımızda','hakkimizda/')]),
  ('referanslar/', 'Referanslar', PG.refs_html(), 'Referanslar ve Örnek İşler | Eprati Plastik', 'Eprati Plastik\'i tercih eden markalar ve ürettiğimiz baskılı poşetlerden örnekler.', [('Hakkımızda','hakkimizda/')]),
  ('sss/', 'Sıkça Sorulan Sorular', PG.sss_html(), 'Sıkça Sorulan Sorular | Eprati Plastik', 'Poşet ölçüleri, baskı, gıdaya uygunluk, sipariş süreci ve ihracat hakkında sık sorulan sorular.', []),
  ('iletisim/', 'İletişim', PG.ILETISIM, 'İletişim | Eprati Plastik — Beylikdüzü / İstanbul', 'Eprati Plastik iletişim: 0212 651 66 69, WhatsApp 0535 718 35 98, satis@eprati.com. Beylikdüzü OSB, İstanbul.', []),
  ('kvkk/', 'KVKK', PG.KVKK, 'KVKK | Eprati Plastik', 'Kişisel verilerin korunması: aydınlatma metinleri, başvuru formu ve çerez politikası.', []),
  ('musteri-aydinlatma-metni/', 'Müşteri Aydınlatma Metni', PG.MUSTERI, 'Müşteri Aydınlatma Metni | Eprati Plastik', 'KVKK kapsamında müşterilerimize ait kişisel verilerin işlenmesine ilişkin aydınlatma metni.', [('KVKK','kvkk/')]),
  ('veri-sorumlusuna-basvuru-formu/', 'Veri Sorumlusuna Başvuru Formu', PG.BASVURU, 'Veri Sorumlusuna Başvuru Formu | Eprati Plastik', 'KVKK 11. madde kapsamındaki haklarınızı kullanmak için başvuru formu.', [('KVKK','kvkk/')]),
  ('ticari-ileti-acik-riza-metni/', 'Ticari İleti Açık Rıza Metni', PG.TICARI, 'Ticari Elektronik İleti Açık Rıza Metni | Eprati Plastik', 'E-posta ve SMS ile ticari elektronik ileti gönderimine ilişkin açık rıza metni.', [('KVKK','kvkk/')]),
  ('cerez-politikasi/', 'Çerez Politikası', PG.CEREZ, 'Çerez Politikası | Eprati Plastik', 'Sitemizde kullanılan zorunlu, analiz ve pazarlama çerezleri ve tercihlerinizi nasıl yöneteceğiniz.', [('KVKK','kvkk/')]),
  ('urunler/', 'Ürünler', PG.urunler_html(CATS, PRODS, purl, esc), 'Tüm Ürünler — Poşet ve Ambalaj Çeşitleri | Eprati Plastik', 'Mağaza, gıda, tekstil-temizlik ve endüstriyel ambalajlar: 24 ürün. Özel ölçü ve baskılı üretim.', []),
]
for u, name, html, title, desc, mid in SP:
  depth = '../' * u.count('/')
  cr = [("Ana sayfa", "")] + mid + [(name, u)]
  nav = '<nav class="wrap crumb" aria-label="Sayfa yolu">' + ' › '.join(f'<a href="{{{{R}}}}{x}">{n}</a>' if x else '<a href="{{HOME}}">Ana sayfa</a>' for n, x in cr[:-1]) + f' › <span aria-current="page" style="color:var(--ink);font-weight:600">{name}</span></nav>'
  PAGES.append(dict(path=u + 'index.html', url=u, root=depth, html='<main id="pg-sayfa">' + nav + html + '</main>', main='sayfa', title=title, desc=desc, ld=[crumbs(cr)]))

def cat_fill(html, k, R):
  c=CATS[k]
  cards=''.join(f'<a class="pcard" href="{R}{purl(q)}"><span class="pcic" data-ic="{q["icon"]}"></span><b>{esc(q["name"])}</b><p>{esc(q["use"])}</p>'+('<em>Gıdaya uygun</em>' if q.get('food') else '')+'<i>İncele →</i></a>' for q in PRODS if q['cat']==k)
  other=''.join(f'<a href="{R}urunler/{kk}/">{esc(cc["name"])}</a>' for kk,cc in CATS.items() if kk!=k)
  return html.replace('{{C_NAME}}',esc(c['name'])).replace('{{C_DESC}}',esc(CATDESC[k])).replace('{{C_CARDS}}',cards).replace('{{C_OTHER}}',other).replace('{{C_BG}}',c['bg'])

def prod_fill(html, p, R):
  cat = CATS[p['cat']]
  tags = []
  if p.get('food'): tags.append(('Gıdaya uygun', '#E8F3E3', '#1C6A30'))
  tags += [('Özel ölçü', '#E6EAF7', '#2B3787'), ('Baskılı yapılabilir', '#F3EFE6', '#6A4B12')]
  facts = p.get('facts') or [['Ölçü', 'Standart ve özel ölçü'], ['Baskı', 'Baskısız · 1–3 renk · CMYK']] + ([['Gıda belgesi', 'TR-34-K-282635']] if p.get('food') else []) + [['Kullanım', p['use'].replace(' için', '')]]
  rel = [q for q in PRODS if q['cat'] == p['cat'] and q['id'] != p['id']]
  data = {k: p.get(k) for k in ('id', 'name', 'mock', 'icon', 'sizes', 'works')}
  rep = {
    '{{P_CATK}}': p['cat'], '{{P_NAME}}': esc(p['name']), '{{P_CAT}}': esc(cat['name']), '{{P_CATSHORT}}': esc(cat['short']), '{{P_DESC}}': esc(p['desc']),
    '{{P_TAGS}}': ''.join(f'<span class="tag" style="background:{bg};color:{fg}">{t}</span>' for t, bg, fg in tags),
    '{{P_FACTS}}': ''.join(f'<div><span>{esc(k)}</span><b>{esc(v)}</b></div>' for k, v in facts),
    '{{P_FEATS}}': ('<ul class="feats">' + ''.join(f'<li>{esc(x)}</li>' for x in p.get('feats', [])) + '</ul>') if p.get('feats') else '',
    '{{P_SIZEFMT}}': 'Ölçü formatı: en + körük + körük × boy (cm). Bir ölçü seçin, teklif formuna aktarılsın.' if p['id']=='atlet-poset' else 'Ölçüler cm cinsindendir. Bir ölçü seçin, teklif formuna aktarılsın.',
    '{{P_SIZENOTE}}': esc(p.get('sizenote') or 'Standart ölçü listesi katalogdan aktarılacak. Dilediğiniz ölçüyü teklif formuna yazabilirsiniz.'),
    '{{P_RELATED}}': ''.join(f'<a class="card relc" href="{R}{purl(q)}"><span class="relic" data-ic="{q["icon"]}"></span><b>{esc(q["name"])}</b><p class="muted">{esc(q["use"])}</p></a>' for q in rel),
    '{{NOTICE}}': NOTICE,
  }
  for k, v in rep.items(): html = html.replace(k, v)
  if p['id'] == 'kargo-poseti':
    html = html.replace('<div class="facts">', '<div class="eldmini"><span><b>Hemen satın almak mı istiyorsunuz?</b> Standart ölçülerdeki baskısız kargo poşetleri Eldora mağazamızda, kredi kartıyla.</span><a href="https://www.eldora.com.tr/" target="_blank" rel="noopener">Eldora\'dan al ↗</a></div><div class="facts">', 1)
  return html.replace('<main id="pg-urun">', '<main id="pg-urun" data-product="' + esc(json.dumps(data, ensure_ascii=False)) + '">', 1)

LANGS = '<div class="langsw"><button type="button" class="langbtn" aria-haspopup="true" aria-expanded="false" aria-label="Dil seçimi"><span class="flag f-tr"></span>TR<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button><div class="langmenu" hidden><a href="#" aria-current="true"><span class="flag f-tr"></span>Türkçe</a><a href="#" class="soon" aria-disabled="true"><span class="flag f-en"></span>English <em>yakında</em></a><a href="#" class="soon" aria-disabled="true"><span class="flag f-de"></span>Deutsch <em>yakında</em></a></div></div>'

ICON_PHONE = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>'
ICON_WA = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2s.2-1.1.2-1.2-.2-.2-.5-.3z"/></svg>'
ICON_MAIL = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></svg>'

def header(R, H, skip):
  KAT='https://eprati.com/wp-content/uploads/2022/12/EPRAT%C4%B0-PLAST%C4%B0K-%C3%9CR%C3%9CN-KATALO%C4%9EU-2022.pdf'
  secs=[('market','atlet','Market ve mağaza'),('firin','ekmek','Fırın ve pastane'),('manav','rulo','Manav ve pazar'),('gida','bakliyat','Gıda üreticisi'),('eticaret','kargo','E-ticaret ve kargo'),('kt','aski','Kuru temizleme'),('tekstil','opp','Tekstil ve giyim'),('sanayi','lastik','Sanayi ve otomotiv')]
  sec_html=''.join(f'<a class="xsec" href="{R}poset-asistani/?sektor={k}"><span class="xic" data-ic="{ic}"></span>{n}</a>' for k,ic,n in secs)
  cat_html=''.join(f'<a class="xcat" href="{R}urunler/{k}/"><b>{esc(c["name"])}</b><span>{sum(1 for q in PRODS if q["cat"]==k)} ürün →</span></a>' for k,c in CATS.items())
  prod_html='<a class="xpall" href="'+R+'urunler/">Tüm ürünler →</a>'+''.join('<div class="xpc"><a class="xpch" href="'+R+'urunler/'+k+'/">'+esc(c['name'])+'</a>'+''.join(f'<a href="{R}{purl(q)}">{esc(q["name"])}</a>' for q in PRODS if q['cat']==k)+'</div>' for k,c in CATS.items())
  soon='<em class="soon">yakında</em>'
  return f'''<a class="skip" href="#{skip}">İçeriğe geç</a>
<div class="top"><div class="wrap">
  <a class="ico" href="tel:+902126516669">{ICON_PHONE}0212 651 66 69</a>
  <a class="ico" href="https://wa.me/905357183598">{ICON_WA}<span class="hide-m">WhatsApp&nbsp;</span>0535 718 35 98</a>
  <a class="ico hide-m" href="mailto:satis@eprati.com">{ICON_MAIL}satis@eprati.com</a>
  <span class="lang">{LANGS}</span>
</div></div>
<header class="hdr"><div class="wrap">
  <a class="logo" href="{H}" aria-label="Eprati Plastik ana sayfa"><img src="{R}logo.svg" alt="Eprati Plastik ve Ambalaj San. Tic. A.Ş." width="190" height="78"></a>
  <div class="gsearch" role="search">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>
    <input id="gq" type="search" autocomplete="off" placeholder="Ne arıyorsunuz? ör. ekmek poşeti" aria-label="Sitede ara">
    <kbd class="hide-m">/</kbd>
    <div class="gres" id="gres" hidden></div>
  </div>
  <div class="hact">
    <button type="button" class="hbtn hsearch" id="gsbtn" aria-label="Ara"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg></button>
    <a class="btn hquote" href="{R}poset-asistani/">Teklif Al</a>
    <button type="button" class="hbtn hmenu" id="xbtn" aria-expanded="false" aria-controls="xmenu"><span class="hm-l" aria-hidden="true"><i></i><i></i></span><span class="hm-t">Menü</span></button>
  </div>
</div></header>
<div class="xmenu" id="xmenu" hidden role="dialog" aria-modal="true" aria-label="Menü">
  <div class="xtop wrap"><img src="{R}logo-beyaz.svg" alt="Eprati Plastik" width="150" height="62"><button type="button" class="xclose" data-xclose aria-label="Menüyü kapat"><span>Kapat</span>×</button></div>
  <div class="xbody wrap">
    <p class="xq">Ne yapmak istiyorsunuz?</p>
    <div class="xlist">
      <section class="xi on" data-xi="0"><button type="button" class="xh" aria-expanded="true"><span class="xn">01</span>Poşetimi bulmak istiyorum<span class="xar">→</span></button>
        <div class="xp"><p class="xpl">Sektörünüzü seçin, size uygun poşeti birlikte bulalım</p><div class="xsecs">{sec_html}</div>
          <p class="xpl" style="margin-top:22px">ya da poşet tipine göre</p><div class="xcats">{cat_html}</div></div></section>
      <section class="xi" data-xi="1"><button type="button" class="xh" aria-expanded="false"><span class="xn">02</span>Teklif almak istiyorum<span class="xar">→</span></button>
        <div class="xp"><div class="xcards">
          <a class="xcard pri" href="{R}poset-asistani/"><b>Poşet Asistanı</b><span>Poşetinizi seçin, rengini ve yazınızı görün, teklif isteyin. Yaklaşık 1 dakika.</span><i>Başlat →</i></a>
          <a class="xcard" href="https://wa.me/905357183598"><b>WhatsApp'tan yazın</b><span>Bir fotoğraf ya da kısa bir mesaj yeterli; satış ekibimiz dönsün.</span><i>0535 718 35 98 →</i></a>
          <a class="xcard" href="https://www.eldora.com.tr/" target="_blank" rel="noopener"><b>Hazır kargo poşeti</b><span>Standart ölçülerde baskısız kargo poşetini Eldora mağazamızdan hemen satın alın.</span><i>Eldora'ya git ↗</i></a>
          <a class="xcard" href="tel:+902126516669"><b>Bizi arayın</b><span>Hafta içi satış ekibimizle doğrudan görüşün.</span><i>0212 651 66 69 →</i></a>
        </div></div></section>
      <section class="xi" data-xi="2"><button type="button" class="xh" aria-expanded="false"><span class="xn">03</span>Ürünlere göz atmak istiyorum<span class="xar">→</span></button>
        <div class="xp"><div class="xprods">{prod_html}</div></div></section>
      <section class="xi" data-xi="3"><button type="button" class="xh" aria-expanded="false"><span class="xn">04</span>Eprati'yi tanımak istiyorum<span class="xar">→</span></button>
        <div class="xp"><div class="xlinks">
          <a href="{R}hakkimizda/">Hakkımızda<span>2000'den beri entegre poşet ve ambalaj üretimi</span></a>
          <a href="{H}#kurumsal">Fabrikamız<span>Hammaddeden bitmiş ürüne tek çatı altında</span></a>
          <a href="{R}sertifikalarimiz/">Sertifikalarımız<span>Gıdaya uygunluk ve kalite belgeleri</span></a>
          <a href="{R}referanslar/">Referanslar ve örnek işler<span>Bize güvenen markalar</span></a>
          <a href="{H}#ihracat">İhracat<span>Avrupa'dan Amerika'ya</span></a>
          <a href="{R}sss/">Sıkça sorulan sorular<span>Ölçü, baskı, gıda uygunluğu</span></a>
        </div></div></section>
      <section class="xi" data-xi="4"><button type="button" class="xh" aria-expanded="false"><span class="xn">05</span>Size ulaşmak istiyorum<span class="xar">→</span></button>
        <div class="xp"><div class="xcontact">
          <a href="tel:+902126516669"><small>Telefon</small>0212 651 66 69<br>0212 651 17 99</a>
          <a href="https://wa.me/905357183598"><small>WhatsApp</small>0535 718 35 98</a>
          <a href="mailto:satis@eprati.com"><small>E-posta</small>satis@eprati.com</a>
          <a href="https://epratiplastic.trustpass.alibaba.com" target="_blank" rel="noopener"><small>Global alıcılar</small>Alibaba.com mağazamız ↗</a>
          <a href="{R}iletisim/"><small>İletişim sayfası</small>Form, saatler ve harita →</a>
          <div class="xloc"><small>Konum</small><b>Beylikdüzü OSB Mah. Mermerciler San. Sit. 8. Cad. No:10/5, 34209 Beylikdüzü / İstanbul</b>
            <span class="xlocb"><a href="https://www.google.com/maps/search/?api=1&amp;query=Eprati+Plastik+Beylikd%C3%BCz%C3%BC+OSB+Mermerciler+Sanayi+Sitesi+8.+Cadde+No:10%2F5+Beylikd%C3%BCz%C3%BC+%C4%B0stanbul" target="_blank" rel="noopener">📍 Haritada aç</a><a href="https://www.google.com/maps/dir/?api=1&amp;destination=Eprati+Plastik+Beylikd%C3%BCz%C3%BC+OSB+Mermerciler+Sanayi+Sitesi+8.+Cadde+No:10%2F5+Beylikd%C3%BCz%C3%BC+%C4%B0stanbul" target="_blank" rel="noopener">🧭 Yol tarifi al</a><a href="https://yandex.com.tr/harita/?text=Eprati+Plastik+Beylikd%C3%BCz%C3%BC+OSB+Mermerciler+Sanayi+Sitesi+8.+Cadde+No:10%2F5+Beylikd%C3%BCz%C3%BC+%C4%B0stanbul" target="_blank" rel="noopener">Yandex</a></span></div>
        </div></div></section>
    </div>
  </div>
  <div class="xfoot wrap"><a href="{KAT}" target="_blank" rel="noopener">Ürün kataloğu (PDF)</a><a href="https://www.eldora.com.tr/" target="_blank" rel="noopener">Eldora mağaza ↗</a><a href="{R}urunler/">Tüm ürünler</a><a href="{R}kvkk/">KVKK</a><a href="{R}cerez-politikasi/">Çerez politikası</a><span class="xlang"><span class="flag f-tr"></span>TR · <span class="flag f-en"></span>EN · <span class="flag f-de"></span>DE <em class="soon">yakında</em></span></div>
</div>'''

def mbar(R):
  return f'''<div class="mbar" role="navigation" aria-label="Hızlı iletişim">
  <a href="tel:+902126516669">{ICON_PHONE}Ara</a>
  <a class="wa" href="https://wa.me/905357183598">{ICON_WA}WhatsApp</a>
  <a class="pri" href="{R}poset-asistani/">Teklif Al</a>
</div>'''


def quick(R, show):
  if not show: return ''
  secs=[('market','Market ve mağaza'),('firin','Fırın ve pastane'),('manav','Manav ve pazar'),('eticaret','E-ticaret ve kargo'),('kt','Kuru temizleme'),('sanayi','Sanayi ve otomotiv')]
  links=''.join(f'<a href="{R}poset-asistani/?sektor={k}">{n}</a>' for k,n in secs)
  return f'''<button type="button" class="qtab" id="qtab" aria-controls="qpop" aria-expanded="false"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>Teklif Al</button>
<div class="qpop" id="qpop" role="dialog" aria-label="Hızlı teklif">
  <button type="button" class="qx" data-qclose aria-label="Kapat">×</button>
  <span class="eyebrow">POŞET ASİSTANI · 1 DAKİKA</span>
  <h3>Nasıl bir poşet istiyorsunuz?</h3><p>İşinizi seçin, size uygun poşeti birlikte bulalım.</p>
  <div class="qs">{links}</div>
  <a class="btn" href="{R}poset-asistani/">Asistanı başlat →</a>
  <div class="qalt"><a href="tel:+902126516669">0212 651 66 69</a><a href="https://wa.me/905357183598">WhatsApp</a></div>
</div><div class="qbg" data-qclose></div>'''

PJS = json.dumps([[q['name'], purl(q), q['cat'], q['icon']] for q in PRODS], ensure_ascii=False)

def page(p):
  R = p['root']; H = R or './'
  canon = BASE + p['url']
  ld = ''.join('<script type="application/ld+json">' + json.dumps(x, ensure_ascii=False) + '</script>\n' for x in p['ld'])
  main = (p['html'] if p.get('html') else part(p['main'])).replace('{{R}}', R).replace('{{HOME}}', H).replace('{{NOTICE}}', NOTICE)
  if p.get('prod'): main = prod_fill(main, p['prod'], R)
  if p.get('catk'): main = cat_fill(main, p['catk'], R)
  pgid = {'home.html': 'pg-home', 'asistan.html': 'pg-asistan', 'urun.html': 'pg-urun', 'kategori.html': 'pg-kat', 'sayfa': 'pg-sayfa'}[p['main']]
  foot = part('footer.html').replace('{{R}}', R).replace('{{HOME}}', H).replace('src="logo-beyaz.svg"', f'src="{R}logo-beyaz.svg"')
  return f'''<!DOCTYPE html>
<html lang="tr" class="no-js">
<head>
<script>document.documentElement.className='js'</script>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{p['title']}</title>
<meta name="description" content="{p['desc']}">
<link rel="canonical" href="{canon}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#2B3787">
<meta property="og:type" content="website">
<meta property="og:locale" content="tr_TR">
<meta property="og:site_name" content="Eprati Plastik">
<meta property="og:title" content="{p['title']}">
<meta property="og:description" content="{p['desc']}">
<meta property="og:url" content="{canon}">
<meta property="og:image" content="{BASE}og-image.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="{R}favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="{R}assets/site.css?v={VER}">
{ld}</head>
<body data-root="{R}">
{header(R, H, pgid)}
{main}
{foot}
{mbar(R)}
{quick(R, p['main'] not in ('asistan.html',))}
<script>window.EPR_P={PJS};</script>
<script src="{R}assets/app.js?v={VER}" defer></script>
</body>
</html>
'''

os.makedirs(os.path.join(ROOT, 'assets'), exist_ok=True)
open(os.path.join(ROOT, 'assets', 'site.css'), 'w', encoding='utf-8').write(part('site.css'))
open(os.path.join(ROOT, 'assets', 'app.js'), 'w', encoding='utf-8').write(part('app.js'))
for p in PAGES:
  out = os.path.join(ROOT, p['path']); os.makedirs(os.path.dirname(out) or ROOT, exist_ok=True)
  open(out, 'w', encoding='utf-8').write(page(p))
today = datetime.date.today().isoformat()
open(os.path.join(ROOT, 'sitemap.xml'), 'w').write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  ''.join(f'  <url><loc>{BASE}{p["url"]}</loc><lastmod>{today}</lastmod></url>\n' for p in PAGES) + '</urlset>\n')
open(os.path.join(ROOT, 'robots.txt'), 'w').write(f'User-agent: *\nAllow: /\nSitemap: {BASE}sitemap.xml\n')
print('ok', [p['path'] for p in PAGES])
