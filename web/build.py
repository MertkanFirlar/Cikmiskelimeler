#!/usr/bin/env python3
"""Çıkmış Kelimeler statik site üretici."""
import json, os, shutil, html, datetime

ROOT=os.path.dirname(os.path.abspath(__file__))
REPO=os.path.dirname(ROOT)
DIST=os.path.join(REPO,'dist')
BASE='https://cikmiskelimeler.com.tr'
PLAY='https://play.google.com/store/apps/details?id=com.yokdilappnew'
MAIL='destekcikmis@gmail.com'
TODAY=datetime.date.today().isoformat()
CATS={'health':('Sağlık','🩺'),'science':('Fen','🔬'),'social':('Sosyal','🌍')}
data=json.load(open(os.path.join(ROOT,'data.json'),encoding='utf-8'))
def esc(s): return html.escape(s or '',quote=True)

# ---- ortak parçalar ----
def head(title,desc,canonical,withNotes=False):
    libs=('<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>'
          '<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>') if withNotes else ''
    return f'''<!doctype html><html lang="tr"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>{esc(title)}</title>
<meta name="description" content="{esc(desc)}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="{canonical}">
<meta property="og:title" content="{esc(title)}"><meta property="og:description" content="{esc(desc)}">
<meta property="og:type" content="website"><meta property="og:url" content="{canonical}">
<meta property="og:image" content="{BASE}/logo512.png"><meta property="og:locale" content="tr_TR">
<meta property="og:site_name" content="Çıkmış Kelimeler">
<link rel="icon" type="image/png" href="/favicon.png"><link rel="manifest" href="/manifest.json">
<link rel="stylesheet" href="/assets/style.css">
<script>(function(){{try{{if(localStorage.getItem('cktheme')==='dark')document.documentElement.setAttribute('data-theme','dark');}}catch(e){{}}}})();</script>
{libs}</head>'''

LAVA='''<svg width="0" height="0" style="position:absolute"><defs>
<filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="20" result="b"/><feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9" result="g"/><feBlend in="SourceGraphic" in2="g"/></filter>
<filter id="liquid" x="-40%" y="-40%" width="180%" height="180%"><feTurbulence type="fractalNoise" baseFrequency="0.007 0.010" numOctaves="2" seed="11" result="n"/><feGaussianBlur in="n" stdDeviation="1.1" result="nb"/><feDisplacementMap in="SourceGraphic" in2="nb" scale="95" xChannelSelector="R" yChannelSelector="G"/></filter>
</defs></svg>
<div class="lava"><span class="ball b1"></span><span class="ball b2"></span><span class="ball b3"></span><span class="ball b4"></span><span class="ball b5"></span></div>'''

ANIM="<script>(function(){try{if(localStorage.getItem('ckanim')==='off')document.body.classList.add('no-anim');}catch(e){}})();</script>"

def header(active=''):
    def lk(href,label,key):
        return f'<a class="{"on" if key==active else ""}" href="{href}">{label}</a>'
    return f'''<header><div class="nav">
<a class="brand" href="/"><img class="dot" src="/logo192.png" alt=""> Çıkmış Kelimeler</a>
<nav class="links">{lk("/kelimeler.html","Kelimeler","kelimeler")}{lk("/baglaclar.html","Bağlaçlar","baglaclar")}<a href="#" onclick="openNotes();return false">Notlarım</a>{lk("/#premium","Premium","")}</nav>
<div class="nav-right">
<button class="iconbtn" id="animBtn" onclick="toggleAnim()" title="Arka plan hareketi">✨</button>
<button class="iconbtn" id="themeBtn" onclick="toggleTheme()" title="Koyu / açık tema">🌙</button>
<a class="hbtn" href="{PLAY}" target="_blank" rel="noopener">İndir</a>
<button class="iconbtn menubtn" onclick="toggleMenu()" title="Menü">☰</button>
</div></div>
<div class="mobmenu" id="mobmenu">
<a href="/kelimeler.html">Kelimeler</a><a href="/baglaclar.html">Bağlaçlar</a>
<a href="#" onclick="openNotes();toggleMenu();return false">Notlarım</a><a href="/#premium" onclick="toggleMenu()">Premium</a>
</div></header>'''

def footer():
    return f'''<footer><div class="wrap foot">
<span>© 2026 Çıkmış Kelimeler</span>
<span><a href="/kullanim-sartlari.html">Kullanım Şartları</a> · <a href="/gizlilik.html">Gizlilik</a> · <a href="mailto:{MAIL}">{MAIL}</a></span>
</div></footer>'''

NOTES_INNER='''<div class="tabs"><button id="tabW" class="on" onclick="setTab('w')">Yaz</button><button id="tabD" onclick="setTab('d')">Çiz</button></div>
 <div class="tools" id="toolsW">
   <select id="ff" onchange="cmd('fontName',this.value)" title="Yazı tipi"><option value="Nunito">Nunito</option><option value="Baloo 2">Baloo</option><option value="Georgia">Serif</option><option value="Courier New">Mono</option><option value="Comic Sans MS">El yazısı</option></select>
   <select id="blk" onchange="cmd('formatBlock',this.value)" title="Stil / başlık"><option value="P">Normal</option><option value="H1">Başlık 1</option><option value="H2">Başlık 2</option></select>
   <select id="fs" onchange="cmd('fontSize',this.value)" title="Boyut"><option value="2">Küçük</option><option value="3" selected>Orta</option><option value="5">Büyük</option><option value="7">Dev</option></select>
   <span class="sep"></span>
   <button onclick="cmd('bold')" title="Kalın"><b>B</b></button><button onclick="cmd('italic')" title="İtalik"><i>I</i></button>
   <button onclick="cmd('underline')" title="Altı çizili"><u>U</u></button><button onclick="cmd('strikeThrough')" title="Üstü çizili"><s>S</s></button>
   <span class="sep"></span>
   <button onclick="cmd('insertUnorderedList')" title="Madde">•</button><button onclick="cmd('insertOrderedList')" title="Numaralı">1.</button><button onclick="addTodo()" title="Yapılacak">☑</button>
   <span class="sep"></span>
   <button onclick="cmd('justifyLeft')" title="Sola">⯇</button><button onclick="cmd('justifyCenter')" title="Ortala">≡</button><button onclick="cmd('justifyRight')" title="Sağa">⯈</button>
   <span class="sep"></span>
   <span id="swT" title="Yazı rengi"></span><span id="swH" title="Fosforlu vurgu"></span>
   <span class="sep"></span>
   <select id="paper" onchange="setPaper(this.value)" title="Kağıt"><option value="plain">Düz</option><option value="lined">Çizgili</option><option value="grid">Kareli</option><option value="dots">Noktalı</option></select>
   <button onclick="cmd('removeFormat')" title="Biçimi temizle">⌫</button>
 </div>
 <div class="tools" id="toolsD" style="display:none">
   <span id="swD"></span><span class="brush" id="brD"></span><button id="erB" onclick="toggleEraser()">🧽 Silgi</button>
 </div>
 <div class="surface" id="surf"><div class="ed" id="ed" contenteditable="true" data-ph="Çalışırken not al… başlık koy, renklendir, liste yap, çiz"></div><canvas id="cv" style="display:none"></canvas></div>
 <div class="dmeta"><span id="wc">0 kelime</span><span class="saved">✓ kaydedildi</span></div>
 <div class="dfoot"><button class="pdf" onclick="dlPDF()">⬇ PDF indir</button><button class="clr" onclick="clearCur()">Temizle</button></div>'''

NOTES_DRAWER='''<div class="drawerwrap" id="drawerwrap"><div class="scrim" id="scrim" onclick="closeNotes()"></div>
<aside class="drawer" id="drawer">
 <div class="rz" id="rz"></div>
 <div class="dhead"><span class="t">📝 Not<span class="ac">larım</span></span>
   <div class="dh-actions"><span class="mx" onclick="toggleMax()" title="Büyüt / küçült">⛶</span><span class="x" onclick="closeNotes()">×</span></div></div>
 '''+NOTES_INNER+'''
</aside></div>'''

def page(body,title,desc,canonical,active='',withNotes=True):
    # not çekmecesi + kütüphaneler artık her sayfada (header "Notlarım" yandan açar)
    return (head(title,desc,canonical,True)+'<body>'+ANIM+header(active)+LAVA+body+NOTES_DRAWER+footer()
            +'<script src="/assets/app.js"></script></body></html>')

def write(path,content):
    full=os.path.join(DIST,path); os.makedirs(os.path.dirname(full),exist_ok=True)
    open(full,'w',encoding='utf-8').write(content)

def card(w,withTr=True):
    ex=''
    if w.get('ex_en'):
        etr=f'<div class="etr">{esc(w["ex_tr"])}</div>' if (withTr and w.get("ex_tr")) else ''
        ex=f'<div class="ex"><div class="een">{esc(w["ex_en"])}</div>{etr}</div>'
    return (f'<article class="card" data-en="{esc((w["en"]or"").lower())}" data-tr="{esc((w["tr"]or"").lower())}">'
            f'<div class="ctop"><h3 class="en">{esc(w["en"])}</h3><span class="star">☆</span></div>'
            f'<div class="tr">{esc(w["tr"])}</div>{ex}</article>')

# ---- DIST temizle + asset kopya ----
if os.path.exists(DIST): shutil.rmtree(DIST)
os.makedirs(DIST)
shutil.copytree(os.path.join(ROOT,'assets'),os.path.join(DIST,'assets'))
pub=os.path.join(REPO,'public')
for f in os.listdir(pub):
    if f in ('index.html','manifest.json') or f.startswith('.'):
        if f=='manifest.json': shutil.copy(os.path.join(pub,f),os.path.join(DIST,f))
        continue
    src=os.path.join(pub,f)
    if os.path.isfile(src): shutil.copy(src,os.path.join(DIST,f))
# manifest da kopyalandı; google verification, CNAME, robots, favicon, logo'lar public'ten geldi

urls=[('/',1.0),('/kelimeler.html',0.9),('/baglaclar.html',0.8),('/kullanim-sartlari.html',0.3),('/gizlilik.html',0.3)]

# ---- ANASAYFA ----
prev=[('prevalence','yaygınlık, sıklık','2023 · Sağlık'),('adverse','olumsuz, ters','2022 · Sağlık'),
      ('susceptible','duyarlı, yatkın','2024 · Fen'),('adherence','bağlılık, uyum','2021 · Sosyal')]
prev_html=''.join(f'<div class="wrow"><span class="en">{e}</span><span class="tr">{t}</span><span class="yr">{y}</span></div>' for e,t,y in prev)
feats=[('📊','Yıllara göre','2013–2025 her YÖKDİL oturumunun kelimeleri ayrı, düzenli.'),
       ('🩺','Alan bazlı','Sağlık, Fen ve Sosyal alanlarına özel kategoriler.'),
       ('📝','Notlar + PDF','Rahatça not al, çiz, tek tıkla PDF indir. Her cihazda.'),
       ('🎯','Kelime Avı','Quiz oyunuyla öğrendiğini pekiştir, ilerlemeni gör.'),
       ('🏕️','Kamp modu','Sınav tarihini gir, her gün önüne kelime düşsün.'),
       ('🔗','Bağlaçlar','YÖKDİL\'de sık çıkan bağlaçları örnekleriyle öğren.')]
feat_html=''.join(f'<div class="feat"><div class="ic">{i}</div><h3>{t}</h3><p>{d}</p></div>' for i,t,d in feats)
total=sum(len(v) for c in ('health','science','social') for v in data[c].values())+len(data['conjunctions'])
home=f'''<script>(function(){{var h=(location.hash||'').replace('#','').toLowerCase();if(h==='privacy'||h==='gizlilik')location.replace('/gizlilik.html');else if(h==='terms'||h==='kullanim'||h==='sartlar'||h==='kullanim-sartlari')location.replace('/kullanim-sartlari.html');}})();</script>
<section class="hero"><div class="wrap"><div class="row">
<div class="hcol"><span class="tag">● 2013–2025 tüm çıkmış kelimeler</span>
<h1>YÖKDİL kelimelerini <span class="ac">sade</span> ve etkili çalış</h1>
<p>Çıkmış kelimeler, anlamları ve örnek cümleleriyle tek yerde. Not al, PDF indir, oyunla pekiştir.</p>
<div class="hbtns"><a class="bp" href="{PLAY}" target="_blank" rel="noopener">Google Play'den indir</a><a class="bg" href="/kelimeler.html">Kelimelere göz at</a></div></div>
<div class="preview"><div class="pv-bar"><i></i><i></i><i></i></div><div>{prev_html}</div></div>
</div>
<div class="statline"><div class="st"><div class="n">{total}+</div><div class="l">çıkmış kelime</div></div><div class="st"><div class="n">13 yıl</div><div class="l">2013–2025 arşivi</div></div><div class="st"><div class="n">3 alan</div><div class="l">Sağlık · Fen · Sosyal</div></div></div>
</div></section>
<section><div class="wrap"><div class="kicker">Özellikler</div><h2 class="h2">Sınava hazırlığın için her şey</h2><p class="lead">Karmaşa yok. Kelimeler düzenli, çalışması kolay.</p>
<div class="feats">{feat_html}</div></div></section>
<div class="pricewrap"><section id="premium"><div class="wrap"><div class="kicker">Premium</div><h2 class="h2">Reklamsız, kendi kartlarınla</h2><p class="lead">Satın alma uygulama içinde, Google Play güvencesiyle.</p>
<div class="prices">
<div class="pc"><h3>Haftalık</h3><div class="amt">₺29.99<small> /hafta</small></div><ul><li>Reklamsız deneyim</li><li>Kendi Kartını Yarat</li><li>Sınırsız kelime ekle</li></ul><a class="pbtn" href="{PLAY}" target="_blank" rel="noopener">Seç</a></div>
<div class="pc pop"><h3>Ömür Boyu</h3><div class="amt">₺249<small> /tek sefer</small></div><ul><li>Tüm özellikler sınırsız</li><li>Reklamsız + Kamp Modu</li><li>Kendi Kartını Yarat</li><li>Tek ödeme, bir daha yok</li></ul><a class="pbtn" href="{PLAY}" target="_blank" rel="noopener">Seç</a></div>
<div class="pc"><h3>Aylık</h3><div class="amt">₺98.99<small> /ay</small></div><ul><li>Tüm haftalık özellikler</li><li>Daha ekonomik</li><li>Kartların kalıcı senin</li></ul><a class="pbtn" href="{PLAY}" target="_blank" rel="noopener">Seç</a></div>
</div></div></section></div>
<section class="cta"><div class="wrap"><h2>Bugün çalışmaya başla</h2><p>Ücretsiz indir, ister web'den ister uygulamadan.</p><a class="bp" href="{PLAY}" target="_blank" rel="noopener">Google Play'den indir</a></div></section>'''
write('index.html',page(home,'Çıkmış Kelimeler: YÖKDİL Çıkmış Kelimeler ve Sınav Hazırlık',
      'YÖKDİL\'de çıkmış kelimeler, bağlaçlar ve örnek cümlelerle sınava hazırlan. Sağlık, Fen, Sosyal — 2013\'ten bugüne tüm çıkmış kelimeler, ücretsiz.',BASE+'/',''))

# ---- KELIMELER HUB ----
cathtml=''
for cat,(label,emoji) in CATS.items():
    years=sorted(data[cat].keys(),reverse=True)
    yrs=''.join(f'<a href="/kelime/{cat}-{y}.html">{y}</a>' for y in years)
    n=sum(len(data[cat][y]) for y in years)
    cathtml+=f'<a class="cat" href="/kelime/{cat}-{years[0]}.html"><div class="e">{emoji}</div><h3>{label}</h3><p>{n} kelime · {len(years)} yıl</p><div class="yrs">{yrs}</div></a>'
cathtml+=f'<a class="cat" href="/baglaclar.html"><div class="e">🔗</div><h3>Bağlaçlar</h3><p>{len(data["conjunctions"])} bağlaç · rehber</p><div class="yrs"><a href="/baglaclar.html">Tümü</a></div></a>'
hub=f'''<div class="wrap"><div class="phead"><div class="crumb"><a href="/">Ana Sayfa</a> › Kelimeler</div>
<h1>YÖKDİL <span class="ac">Çıkmış Kelimeler</span></h1>
<p class="sub">2013'ten bugüne tüm YÖKDİL çıkmış kelimeleri alana ve yıla göre. Ücretsiz çalış, not al, PDF indir.</p></div>
<section style="padding:10px 0 60px"><div class="cats">{cathtml}</div></section></div>'''
write('kelimeler.html',page(hub,'YÖKDİL Çıkmış Kelimeler — Tüm Yıllar ve Alanlar',
      'YÖKDİL çıkmış kelimeler: Sağlık, Fen, Sosyal alanları ve 2013–2025 tüm yıllar. Ücretsiz kelime listeleri, örnek cümleler.',BASE+'/kelimeler.html','kelimeler'))

# ---- HER KELIME SAYFASI ----
def chips(cat,year):
    cs=''.join(f'<a class="{"on" if c==cat else ""}" href="/kelime/{c}-{sorted(data[c].keys(),reverse=True)[0]}.html">{lab}</a>' for c,(lab,_) in CATS.items())
    ys=''.join(f'<a class="{"on" if y==year else ""}" href="/kelime/{cat}-{y}.html">{y}</a>' for y in sorted(data[cat].keys(),reverse=True))
    return f'<div class="chips chipgroups"><div class="chiprow"><span class="cl">Alan</span>{cs}</div><div class="chiprow"><span class="cl">Yıl</span>{ys}</div></div>'

for cat,(label,emoji) in CATS.items():
    for year,words in data[cat].items():
        cards=''.join(card(w) for w in words)
        body=f'''<div class="wrap"><div class="phead">
<div class="crumb"><a href="/">Ana Sayfa</a> › <a href="/kelimeler.html">Kelimeler</a> › {label} › {year}</div>
<h1>YÖKDİL {year} <span class="ac">{label}</span> Çıkmış Kelimeler</h1>
<p class="sub">{year} YÖKDİL {label} oturumunda çıkmış kelimeler, anlamları ve akademik örnek cümleleriyle. Ücretsiz çalış, not al, PDF indir.</p>
{chips(cat,year)}</div>
<div class="toolbar"><input class="search" id="q" placeholder="🔍 Kelime ara…"><div class="toggle"><button id="bg" class="on" onclick="setView('grid')">⊞</button><button id="bl" onclick="setView('list')">☰</button></div><button class="notesbtn" onclick="openNotes()">📝 Notlarım</button></div>
<div class="count" id="cnt">{len(words)} kelime · {year} {label}</div>
<div id="list" class="grid" data-label="{year} {label}">{cards}</div>
<div style="height:50px"></div></div>'''
        t=f'YÖKDİL {year} {label} Çıkmış Kelimeler ve Örnek Cümleler'
        d=f'{year} YÖKDİL {label} sınavında çıkmış {len(words)} kelime, Türkçe anlamları ve akademik örnek cümleleri. Ücretsiz çalış, not al, PDF indir.'
        u=f'{BASE}/kelime/{cat}-{year}.html'
        write(f'kelime/{cat}-{year}.html',page(body,t,d,u,'kelimeler',withNotes=True))
        urls.append((f'/kelime/{cat}-{year}.html',0.8))

# ---- BAGLACLAR ----
cj=''.join(card(w,withTr=True) for w in data['conjunctions'])
body=f'''<div class="wrap"><div class="phead"><div class="crumb"><a href="/">Ana Sayfa</a> › Bağlaçlar</div>
<h1>YÖKDİL <span class="ac">Bağlaçlar</span> Rehberi</h1>
<p class="sub">YÖKDİL ve YDS'de sık çıkan İngilizce bağlaçlar, Türkçe anlamları ve örnek cümleleriyle. Ücretsiz çalış, not al.</p></div>
<div class="toolbar"><input class="search" id="q" placeholder="🔍 Bağlaç ara…"><div class="toggle"><button id="bg" class="on" onclick="setView('grid')">⊞</button><button id="bl" onclick="setView('list')">☰</button></div><button class="notesbtn" onclick="openNotes()">📝 Notlarım</button></div>
<div class="count" id="cnt">{len(data["conjunctions"])} bağlaç</div>
<div id="list" class="grid" data-label="bağlaç">{cj}</div><div style="height:50px"></div></div>'''
write('baglaclar.html',page(body,'YÖKDİL Bağlaçlar Rehberi — Tüm Bağlaçlar ve Örnekler',
      'YÖKDİL ve YDS bağlaçları: anlamları ve örnek cümleleri. Along with, moreover, whereas, unless ve daha fazlası.',BASE+'/baglaclar.html','baglaclar',withNotes=True))

# ---- LEGAL ----
TERMS='''<h1>Kullanım Şartları</h1><p class="upd"><strong>Son Güncelleme:</strong> 12 Ağustos 2025</p>
<p>Bu kullanım şartları, <strong>Çıkmış Kelimeler: YÖKDİL</strong> ("Uygulama") tarafından sunulan hizmetlerin kullanımını düzenler. Uygulamayı indirerek veya kullanarak, bu şartları okuduğunuzu, anladığınızı ve kabul ettiğinizi beyan etmiş olursunuz.</p>
<h2>1. Hizmetin Tanımı</h2><p>Çıkmış Kelimeler: YÖKDİL, kullanıcılara YÖKDİL sınavı hazırlık sürecinde yardımcı olmak amacıyla hazırlanmış bir uygulamadır. Kelime listeleri, alıştırmalar, testler ve ek özellikler sunabilir.</p>
<h2>2. Kullanım Koşulları</h2><ul><li>Uygulama yalnızca kişisel ve ticari olmayan amaçlar için kullanılabilir.</li><li>İçerikler kopyalanamaz, çoğaltılamaz, satılamaz veya dağıtılamaz.</li><li>Tersine mühendislik veya kaynak kodu elde etmeye çalışmak yasaktır.</li><li>Yürürlükteki tüm yasalara uyulması zorunludur.</li></ul>
<h2>3. Uygulama İçi Satın Alma</h2><ul><li>Satın alma işlemleri Google Play Store üzerinden gerçekleştirilir.</li><li>Geliştirici, kullanıcıların ödeme bilgilerini görmez veya saklamaz.</li><li>Satın almalar Google Play İade Politikası'na tabidir.</li></ul>
<h2>4. Reklamlar</h2><p>Uygulamada Google AdMob veya benzeri reklam ağları aracılığıyla reklam gösterilebilir.</p>
<h2>5. Fikri Mülkiyet</h2><p>Uygulama içeriği, tasarımı, metinleri ve yazılım kodları geliştiriciye aittir. İzinsiz kullanım yasaktır.</p>
<h2>6. Sorumluluk Reddi</h2><ul><li>Uygulama "olduğu gibi" sunulur, garanti verilmez.</li><li>Oluşabilecek zararlardan geliştirici sorumlu tutulamaz.</li></ul>
<h2>7. Üçüncü Taraf Hizmetler</h2><p>Google AdMob ve Google Play Faturalandırma kendi şartlarına tabidir.</p>
<h2>8. Değişiklikler</h2><p>Geliştirici şartları önceden bildirmeden değiştirebilir.</p>
<h2>9. İletişim</h2><p>💬 Destek: <a href="mailto:%s">%s</a></p>''' % (MAIL,MAIL)
PRIV='''<h1>Gizlilik Politikası</h1><p class="upd"><strong>Son Güncelleme:</strong> 12 Ağustos 2025</p>
<p>Bu gizlilik politikası, <strong>Çıkmış Kelimeler: YÖKDİL</strong> tarafından hangi verilerin nasıl işlendiğini açıklar.</p>
<h2>1. Toplanan Bilgiler</h2><div class="notice"><strong>Uygulama, kullanıcılardan herhangi bir kişisel veri talep etmez ve toplamaz.</strong> İsim, e-posta, telefon, konum gibi bilgiler istenmez ve kaydedilmez.</div>
<h2>2. Yerel Depolama</h2><p>Veriler yalnızca cihazınızda yerel olarak saklanır:</p><ul><li>Uygulama ayarları</li><li>Kullanıcı tercihleri</li><li>Öğrenme ilerlemeniz</li><li>Kaydedilen kelimeler ve notlar</li></ul><p><strong>Bu bilgiler cihazınızdan dışarı aktarılmaz.</strong></p>
<h2>3. Reklamlar</h2><p>Uygulama Google AdMob aracılığıyla reklam gösterebilir. Daha fazla bilgi: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google Gizlilik Politikası</a>.</p>
<h2>4. Uygulama İçi Satın Alma</h2><p>Satın almalar Google Play Store üzerinden güvenle yapılır. Geliştirici ödeme bilgilerini görmez ve saklamaz.</p>
<h2>5. Üyelik</h2><p>Üyelik veya hesap oluşturma zorunluluğu yoktur. Tüm özellikler anonim kullanılabilir.</p>
<h2>6. Sorumluluk Reddi</h2><p>Uygulama "olduğu gibi" sunulur. Kullanım kullanıcı sorumluluğundadır.</p>
<h2>7. Üçüncü Taraf Hizmetler</h2><p>Google AdMob ve Google Play Faturalandırma'nın kendi gizlilik politikaları geçerlidir.</p>
<h2>8. Değişiklikler</h2><p>Gizlilik politikası zaman zaman güncellenebilir.</p>
<h2>9. İletişim</h2><p>💬 Destek: <a href="mailto:%s">%s</a></p>''' % (MAIL,MAIL)
write('kullanim-sartlari.html',page(f'<div class="wrap"><div class="legal">{TERMS}</div></div>',
      'Kullanım Şartları — Çıkmış Kelimeler','Çıkmış Kelimeler YÖKDİL uygulaması kullanım şartları.',BASE+'/kullanim-sartlari.html'))
write('gizlilik.html',page(f'<div class="wrap"><div class="legal">{PRIV}</div></div>',
      'Gizlilik Politikası — Çıkmış Kelimeler','Çıkmış Kelimeler YÖKDİL uygulaması gizlilik politikası. Kişisel veri toplanmaz.',BASE+'/gizlilik.html'))

# ---- SITEMAP ----
sm='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
for u,p in urls:
    sm+=f'  <url><loc>{BASE}{u}</loc><lastmod>{TODAY}</lastmod><priority>{p}</priority></url>\n'
sm+='</urlset>\n'
write('sitemap.xml',sm)
open(os.path.join(DIST,'robots.txt'),'w').write(f'User-agent: *\nAllow: /\n\nSitemap: {BASE}/sitemap.xml\n')

print('OK — üretilen sayfa:',sum(len(files) for _,_,files in os.walk(DIST)),'dosya')
print('kelime sayfasi:',len(urls)-6,'· toplam kelime:',total+len(data["conjunctions"]))
