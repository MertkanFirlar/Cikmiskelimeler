import React from 'react';
import '../styles/TermsScreen.css';

const TermsScreen = () => {
  return (
    <div className="terms-screen">
      <div className="container">
        <div className="content">
          <h1 className="page-title">Kullanım Şartları</h1>
          
          <div className="content-section">
            <p className="intro-text">
              <strong>Son Güncelleme:</strong> 12 Ağustos 2025
            </p>
            <p>
              Bu kullanım şartları, <strong>Çıkmış Kelimeler: YÖKDİL</strong> ("Uygulama") tarafından sunulan hizmetlerin 
              kullanımını düzenler. Uygulamayı indirerek veya kullanarak, bu şartları okuduğunuzu, anladığınızı ve kabul ettiğinizi beyan etmiş olursunuz.
            </p>
          </div>

          <div className="content-section">
            <h2 className="section-title">1. Hizmetin Tanımı</h2>
            <p>
              Çıkmış Kelimeler: YÖKDİL, kullanıcılara YÖKDİL sınavı hazırlık sürecinde yardımcı olmak amacıyla hazırlanmış bir mobil uygulamadır. 
              Uygulama; kelime listeleri, alıştırmalar, testler ve ek özellikler sunabilir.
            </p>
          </div>

          <div className="content-section">
            <h2 className="section-title">2. Kullanım Koşulları</h2>
            <ul className="content-list">
              <li>Uygulama yalnızca <strong>kişisel ve ticari olmayan amaçlar</strong> için kullanılabilir.</li>
              <li>Kullanıcılar, uygulama içeriklerini kopyalayamaz, çoğaltamaz, satamaz veya dağıtamaz.</li>
              <li>Uygulama içeriğinde değişiklik yapmaya, tersine mühendislik uygulamaya veya kaynak kodunu elde etmeye çalışmak yasaktır.</li>
              <li>Uygulamanın kullanımında yürürlükteki tüm yasa ve yönetmeliklere uyulması zorunludur.</li>
            </ul>
          </div>

          <div className="content-section">
            <h2 className="section-title">3. Uygulama İçi Satın Alma</h2>
            <p>
              Uygulamada ek özellikler, reklam kaldırma gibi avantajlar sağlayan <strong>uygulama içi satın alma</strong> seçenekleri bulunabilir.
            </p>
            <div className="purchase-terms">
              <ul className="content-list">
                <li>Satın alma işlemleri Google Play Store üzerinden gerçekleştirilir.</li>
                <li>Geliştirici, kullanıcıların ödeme bilgilerini görmez veya saklamaz.</li>
                <li>Satın alma işlemleri, Google Play İade Politikası'na tabidir.</li>
              </ul>
            </div>
          </div>

          <div className="content-section">
            <h2 className="section-title">4. Reklamlar</h2>
            <div className="ads-info">
              <p>
                Uygulamada Google AdMob veya benzeri reklam ağları aracılığıyla reklam gösterilebilir. 
                Reklam içerikleri üçüncü taraf sağlayıcılar tarafından yönetilir.
              </p>
            </div>
          </div>

          <div className="content-section">
            <h2 className="section-title">5. Fikri Mülkiyet Hakları</h2>
            <div className="ip-rights">
              <ul className="content-list">
                <li>Uygulama içeriği, tasarımı, metinleri, görselleri, logoları ve yazılım kodları geliştiriciye aittir.</li>
                <li>İzinsiz kopyalama, çoğaltma veya ticari amaçla kullanma yasaktır.</li>
              </ul>
            </div>
          </div>

          <div className="content-section">
            <h2 className="section-title">6. Sorumluluk Reddi</h2>
            <div className="disclaimer-section">
              <ul className="content-list">
                <li>Uygulama "olduğu gibi" sunulur, herhangi bir açık veya zımni garanti verilmez.</li>
                <li>Kullanım sırasında oluşabilecek doğrudan veya dolaylı zararlardan geliştirici sorumlu tutulamaz.</li>
                <li>Uygulamanın kesintisiz veya hatasız çalışacağı garanti edilmez.</li>
              </ul>
            </div>
          </div>

          <div className="content-section">
            <h2 className="section-title">7. Üçüncü Taraf Hizmetler</h2>
            <p>
              Uygulamada kullanılan üçüncü taraf hizmetler (Google AdMob, Google Play Faturalandırma vb.) kendi hizmet şartlarına tabidir. 
              Kullanıcılar bu şartları incelemekle yükümlüdür.
            </p>
            <div className="third-party-list">
              <div className="service-item">
                <span className="service-icon">📢</span>
                <div>
                  <h4>Google AdMob</h4>
                  <p>Reklam gösterimi</p>
                </div>
              </div>
              <div className="service-item">
                <span className="service-icon">💰</span>
                <div>
                  <h4>Google Play Faturalandırma</h4>
                  <p>Uygulama içi satın alma</p>
                </div>
              </div>
            </div>
          </div>

          <div className="content-section">
            <h2 className="section-title">8. Değişiklikler</h2>
            <p>
              Geliştirici, kullanım şartlarını önceden bildirimde bulunmadan değiştirme hakkını saklı tutar. 
              Güncellemeler bu sayfada yayımlandığı andan itibaren geçerli olur.
            </p>
          </div>

          <div className="content-section">
            <h2 className="section-title">9. İletişim</h2>
            <p>Her türlü soru ve talepleriniz için iletişime geçebilirsiniz:</p>
            <div className="contact-info">
              <p>
                💬 Destek: 
                <a href="mailto:destekcikmis@gmail.com"> destekcikmis@gmail.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsScreen;