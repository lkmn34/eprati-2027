# Eprati 2027

Eprati Plastik yeni site prototipi. Canlı: https://lkmn34.github.io/eprati-2027/

## Yapı
- `index.html` — ana sayfa
- `poset-asistani/` — Poşet Asistanı
- `urunler/magaza-ambalajlari/atlet-poset/` — örnek ürün sayfası (mevcut sitedeki URL yapısıyla aynı)
- `assets/` — ortak CSS, JS, ihracat haritası
- `sitemap.xml`, `robots.txt`, `404.html`

## Düzenleme
Sayfalar `tools/parts/` içindeki parçalardan üretilir: `python3 tools/build.py`
Alan adı değişince `tools/build.py` içindeki `BASE` güncellenir.
