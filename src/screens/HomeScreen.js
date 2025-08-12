import React from 'react';
import '../styles/HomeScreen.css';

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
      icon: "🚀",
      title: "Sürekli Güncellemeler",
      description: "Yeni sınav kelimeleri düzenli olarak uygulamaya eklenir."
    }
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
           
            <button className="btn btn-secondary">
              🤖 Google Play'den İndir
            </button>
          </div>
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

      {/* Pricing Section */}
      <section className="pricing">
        <div className="container">
          <h2 className="section-title">Premium Üyelik Avantajları</h2>
          <div className="pricing-grid">
            <div className="pricing-card">
              <h3 className="pricing-title">Haftalık Plan</h3>
              <div className="pricing-price">
                <span className="price">₺19.99</span>
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
                <span className="price">₺59.99</span>
                <span className="period">/ay</span>
              </div>
              <ul className="pricing-features">
                <li>Tüm haftalık özellikler</li>
                <li>%25 daha ekonomik</li>
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