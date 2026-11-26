#!/usr/bin/env python3
"""Eprati sitesini tools/parts içindeki parçalardan üretir.
Kullanım: python3 tools/build.py   (depo kök klasöründen)
Alan adı değişince yalnızca BASE değiştirilir (ör. https://www.eprati.com/)."""
import json, os, datetime, time
VER = str(int(time.time()))

BASE = 'https://lkmn34.github.io/eprati-2027/'
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = os.path.join(ROOT, 'tools', 'parts')
def part(n): return open(os.path.join(P, n), encoding='utf-8').read()

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
  dict(path='urunler/magaza-ambalajlari/atlet-poset/index.html', url='urunler/magaza-ambalajlari/atlet-poset/', root='../../../', main='urun.html',
       title='Atlet Poşet — Baskılı ve Baskısız, Özel Ölçü | Eprati Plastik',
       desc='Market ve mağazalar için atlet poşet: 6 standart ölçü, özel ölçü, 1–3 renk ve CMYK baskı, gıdaya uygun üretim. Renk ve logonuzu önizleyin, teklif alın.',
       ld=[crumbs([("Ana sayfa", ""), ("Ürünler", "#urunler"), ("Mağaza Ambalajları", "#urunler"), ("Atlet Poşet", "urunler/magaza-ambalajlari/atlet-poset/")]),
           {"@context": "https://schema.org", "@type": "Product", "name": "Atlet Poşet", "category": "Mağaza Ambalajları",
            "description": "Körüklü yapısıyla geniş iç hacim sunan, baskılı veya baskısız üretilebilen atlet poşet. Özel ölçü ve gıdaya uygun üretim.",
            "brand": {"@type": "Brand", "name": "Eprati"}, "manufacturer": {"@id": BASE + "#org"},
            "image": BASE + "logo.svg", "url": BASE + "urunler/magaza-ambalajlari/atlet-poset/"}]),
]

ICON_PHONE = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>'
ICON_WA = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2s.2-1.1.2-1.2-.2-.2-.5-.3z"/></svg>'
ICON_MAIL = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></svg>'

def header(R, H, skip):
  return f'''<a class="skip" href="#{skip}">İçeriğe geç</a>
<div class="top"><div class="wrap">
  <a class="ico" href="tel:+902126516669">{ICON_PHONE}0212 651 66 69</a>
  <a class="ico" href="https://wa.me/905357183598">{ICON_WA}<span class="hide-m">WhatsApp&nbsp;</span>0535 718 35 98</a>
  <a class="ico hide-m" href="mailto:satis@eprati.com">{ICON_MAIL}satis@eprati.com</a>
  <span class="lang"><b>TR</b><a href="#" hreflang="en">EN</a><a href="#" hreflang="de">DE</a></span>
</div></div>
<header class="hdr"><div class="wrap">
  <a class="logo" href="{H}" aria-label="Eprati Plastik ana sayfa"><img src="{R}logo.svg" alt="Eprati Plastik ve Ambalaj San. Tic. A.Ş." width="190" height="78"></a>
  <nav class="menu" aria-label="Ana menü">
    <a href="{H}#urunler">Ürünler</a><a href="{H}#sektorler">Sektörler</a><a href="{R}poset-asistani/">Poşet Asistanı</a><a href="{H}#kurumsal">Kurumsal</a><a href="{H}#sss">SSS</a><a href="{H}#iletisim">İletişim</a>
  </nav>
  <div class="navbtns">
    <a class="btn ghost" href="https://eprati.com/wp-content/uploads/2022/12/EPRAT%C4%B0-PLAST%C4%B0K-%C3%9CR%C3%9CN-KATALO%C4%9EU-2022.pdf" target="_blank" rel="noopener">Katalog İndir</a><a class="btn" href="{R}poset-asistani/">Teklif Al</a>
    <button type="button" id="menubtn" aria-label="Menüyü aç" aria-expanded="false" aria-controls="mobilemenu"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
  </div>
</div></header>
<div class="mmenu" id="mobilemenu" hidden role="dialog" aria-modal="true" aria-label="Menü">
  <div class="mtop"><img src="{R}logo.svg" alt="Eprati Plastik" width="140" height="58"><button type="button" class="mclose" data-close aria-label="Menüyü kapat">×</button></div>
  <nav aria-label="Mobil menü">
    <a href="{H}#urunler">Ürünler</a><a href="{H}#sektorler">Sektörünüze göre</a><a href="{R}urunler/magaza-ambalajlari/atlet-poset/">Atlet Poşet</a><a href="{H}#kurumsal">Kurumsal</a><a href="{H}#sss">Sıkça sorulanlar</a><a href="{H}#iletisim">İletişim</a>
  </nav>
  <div class="mcta"><a class="btn" href="{R}poset-asistani/">Poşet Asistanı ile teklif al</a><a class="btn ghost" href="https://eprati.com/wp-content/uploads/2022/12/EPRAT%C4%B0-PLAST%C4%B0K-%C3%9CR%C3%9CN-KATALO%C4%9EU-2022.pdf" target="_blank" rel="noopener">Katalog İndir (PDF)</a></div>
  <div class="mcontact"><a href="tel:+902126516669">0212 651 66 69</a> · <a href="tel:+902126511799">0212 651 17 99</a><br><a href="https://wa.me/905357183598">WhatsApp 0535 718 35 98</a><br><a href="mailto:satis@eprati.com">satis@eprati.com</a><br>Beylikdüzü OSB, İstanbul</div>
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

def page(p):
  R = p['root']; H = R or './'
  canon = BASE + p['url']
  ld = ''.join('<script type="application/ld+json">' + json.dumps(x, ensure_ascii=False) + '</script>\n' for x in p['ld'])
  main = part(p['main']).replace('{{R}}', R).replace('{{HOME}}', H)
  pgid = {'home.html': 'pg-home', 'asistan.html': 'pg-asistan', 'urun.html': 'pg-urun'}[p['main']]
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
{quick(R, p['main']!='asistan.html')}
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
