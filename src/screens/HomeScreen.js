import React from 'react';
import '../styles/HomeScreen.css';

const PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.yokdilappnew';

const HomeScreen = () => {
  const features = [
    {
      icon: "📊",
      title: "Yıllara Göre Kategoriler",
      description: "Geçmiş YÖKDİL sınavlarında çıkmış kelimeler yıllara göre düzenlenmiş durumda."
    },
    {
      icon: "🏥",
      title: "Alan Bazlı Çalışma",
      description: "Sağlık, Fen ve Sosyal bilimler alanlarına özel kelime kategorileri."
    },
    {
      icon: "🏕️",
      title: "Kamp Modu",
      description: "Sınav tarihini gir; her gün önüne gelen kelimelerle çalış. Geri sayım, hatırlatmalar ve ilerleme takibiyle disiplinli hazırlan."
    },
    {
      icon: "🎯",
      title: "Kelime Avı Oyunu",
      description: "Eğlenceli quiz oyunu ile öğrendiğin kelimeleri pekiştir ve skorunu artır."
    },
    {
      icon: "⭐",
      title: "Kendi Kartını Yarat",
      description: "Premium üyelik ile kendi kelime kategorilerini oluştur ve özelleştir."
    },
    {
      icon: "📝",
      title: "Notlarım",
      description: "Özel notlarını kaydet, hatırlatıcılar oluştur ve çalışma planını organize et."
    },
    {
      icon: "🔗",
      title: "Bağlaçlar Rehberi",
      description: "YÖKDİL'de sıkça çıkan bağlaçları detaylı örneklerle öğren."
    },
    {
      icon: "💾",
      title: "Kaydedilen Kelimeler",
      description: "Zorlandığın kelimeleri kaydet ve daha sonra tekrar et."
    },
    {
      icon: "🔔",
      title: "Günlük Hatırlatmalar",
      description: "Bildirimlerle her gün düzenli çalışmayı unutma."
    }
  ];

  // Sitede sadece KÜÇÜK bir demo — tamamı uygulamada
  const demoWords = [
    { en: "acceptance", tr: "kabul", ex: "Patient acceptance of novel therapeutic regimens remains critical." },
    { en: "acquisition", tr: "edinim, kazanım", ex: "The acquisition of antibiotic resistance genes poses a threat." },
    { en: "adjustment", tr: "ayarlama, uyum", ex: "Dosage adjustment is required in patients with renal impairment." },
    { en: "inadvertent", tr: "kasıtsız, dikkatsiz", ex: "An inadvertent error in dosage calculation can be serious." }
  ];

  const demoConjunctions = [
    { en: "Along with", tr: "yanı sıra, ek olarak" },
    { en: "Besides", tr: "yanı sıra, ayrıca" },
    { en: "Moreover", tr: "dahası" },
    { en: "Neither...nor", tr: "ne...ne de" },
    { en: "For instance", tr: "örneğin" },
    { en: "Lest", tr: "…mesin diye (olumsuz amaç)" }
  ];

  return (
    <div className="home-screen">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">YÖKDİL'de Başarının Anahtarı</h1>
          <p className="hero-description">
            Yıllarca YÖKDİL sınavlarında çıkmış kelimeleri kategorize ederek hazırladık.
            Sağlık, Fen, Sosyal alanlarında yüzlerce kelimeyi öğrenin ve Kelime Avı oyunu ile pekiştirin!
          </p>
          <div className="hero-buttons">
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              🤖 Google Play'den İndir
            </a>
          </div>
          <p className="ios-note">
            iPhone / iPad mı kullanıyorsun? Aşağıdan birkaç kelimeye tarayıcıdan göz atabilirsin 👇
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Neden Çıkmış Kelimeler?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo / Önizleme Section */}
      <section className="demo">
        <div className="container">
          <h2 className="section-title">Kelimelerden Bir Tat 👀</h2>
          <p className="demo-intro">
            İşte YÖKDİL'de çıkmış kelimelerden ve bağlaçlardan küçük bir örnek.
            Binlercesi, örnek cümleleri ve Kelime Avı oyunuyla uygulamada seni bekliyor.
          </p>

          <h3 className="demo-subtitle">📚 Örnek Kelimeler</h3>
          <div className="demo-grid">
            {demoWords.map((w, i) => (
              <div key={i} className="demo-word-card">
                <div className="demo-word-en">{w.en}</div>
                <div className="demo-word-tr">{w.tr}</div>
                <div className="demo-word-ex">"{w.ex}"</div>
              </div>
            ))}
          </div>

          <h3 className="demo-subtitle">🔗 Örnek Bağlaçlar</h3>
          <div className="demo-conj-list">
            {demoConjunctions.map((c, i) => (
              <div key={i} className="demo-conj-item">
                <span className="demo-conj-en">{c.en}</span>
                <span className="demo-conj-arrow">→</span>
                <span className="demo-conj-tr">{c.tr}</span>
              </div>
            ))}
          </div>

          <div className="demo-cta">
            <p className="demo-note">
              Bu yalnızca küçük bir önizleme. <strong>Tüm kelimeler, bağlaçlar, örnek cümleler ve Kamp Modu uygulamada.</strong>
            </p>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              🤖 Tamamı için Google Play'den İndir
            </a>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing">
        <div className="container">
          <h2 className="section-title">Premium Üyelik Avantajları</h2>
          <div className="pricing-grid">
            <div className="pricing-card">
              <h3 className="pricing-title">Haftalık Plan</h3>
              <div className="pricing-price">
                <span className="price">₺29.99</span>
                <span className="period">/hafta</span>
              </div>
              <ul className="pricing-features">
                <li>Reklamsız deneyim</li>
                <li>Kendi Kartını Yarat özelliği</li>
                <li>İstediğin kelimeleri özgürce ekle</li>
                <li>Üyelik bittiğinde kelimeler Kelime Avı'nda süresiz kullanım</li>
              </ul>
            </div>

            <div className="pricing-card pricing-card-popular">
              <div className="popular-badge">EN POPÜLER</div>
              <h3 className="pricing-title">Aylık Plan</h3>
              <div className="pricing-price">
                <span className="price">₺98.99</span>
                <span className="period">/ay</span>
              </div>
              <ul className="pricing-features">
                <li>Tüm haftalık özellikler</li>
                <li>Haftalığa göre daha ekonomik</li>
                <li>Reklamsız deneyim</li>
                <li>Oluşturduğun kartlar kalıcı olarak senin</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact">
        <div className="container">
          <h2 className="section-title">İletişime Geçin</h2>
          <p className="contact-description">
            Sorularınız, önerileriniz veya destek talepleriniz için bizimle iletişime geçebilirsiniz.
          </p>
          <div className="contact-card">
            <div className="contact-item-single">
              <span className="contact-icon">💬</span>
              <div>
                <h4>Destek</h4>
                <a href="mailto:destekcikmis@gmail.com">destekcikmis@gmail.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeScreen;
