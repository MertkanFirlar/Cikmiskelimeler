import React from 'react';
import '../styles/PrivacyScreen.css';

const PrivacyScreen = () => {
  return (
    <div className="privacy-screen">
      <div className="container">
        <div className="content">
          <h1 className="page-title">Gizlilik Politikası</h1>
          
          <div className="content-section">
            <p className="intro-text">
              <strong>Son Güncelleme:</strong> 12 Ağustos 2025
            </p>
            <p>
              Bu gizlilik politikası, <strong>Çıkmış Kelimeler: YÖKDİL</strong> ("Uygulama") tarafından sunulan hizmetlerin 
              kullanımı sırasında hangi verilerin nasıl işlendiğini ve saklandığını açıklar. 
              Uygulamayı kullanarak bu politikada belirtilen şartları kabul etmiş sayılırsınız.
            </p>
          </div>

          <div className="content-section">
            <h2 className="section-title">1. Toplanan Bilgiler</h2>
            <div className="highlight-box">
              <p>
                <strong>Uygulama, kullanıcılarından herhangi bir kişisel veri talep etmez ve toplamaz.</strong> 
                İsim, e-posta adresi, telefon numarası, konum bilgisi gibi kişisel bilgiler tarafımızca istenmez ve kaydedilmez.
              </p>
            </div>
          </div>

          <div className="content-section">
            <h2 className="section-title">2. Yerel Depolama</h2>
            <p>
              Uygulama, yalnızca cihazınızda <strong>yerel olarak veri depolar</strong>. Bu veriler şunları içerebilir:
            </p>
            <ul className="content-list">
              <li>Uygulama ayarları</li>
              <li>Önbellek bilgileri</li>
              <li>Kullanıcı tercihleri</li>
              <li>Öğrenme ilerlemeniz</li>
              <li>Kaydedilen kelimeler</li>
            </ul>
            <p>
              <strong>Bu bilgiler cihazınızdan dışarıya aktarılmaz ve üçüncü kişilerle paylaşılmaz.</strong>
            </p>
          </div>

          <div className="content-section">
            <h2 className="section-title">3. Reklamlar</h2>
            <div className="ad-info">
              <span className="ad-icon">📱</span>
              <div>
                <p>
                  Uygulama, <strong>Google AdMob</strong> aracılığıyla reklam gösterebilir. Google AdMob, 
                  kullanıcı deneyimini geliştirmek ve ilgi alanına dayalı reklamlar sunmak için çerezler 
                  ve benzeri teknolojiler kullanabilir.
                </p>
                <p>
                  Daha fazla bilgi için: 
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                    Google Gizlilik Politikası
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="content-section">
            <h2 className="section-title">4. Uygulama İçi Satın Alma</h2>
            <div className="purchase-info">
              <span className="purchase-icon">💳</span>
              <div>
                <p>
                  Uygulamada <strong>uygulama içi satın alma</strong> seçenekleri bulunabilir. Bu işlemler 
                  <strong>Google Play Store</strong>'un kendi ödeme sistemi üzerinden güvenli şekilde gerçekleştirilir.
                </p>
                <p>
                  <strong>Geliştirici, kullanıcıların ödeme bilgilerini görmez ve saklamaz.</strong>
                </p>
              </div>
            </div>
          </div>

          <div className="content-section">
            <h2 className="section-title">5. Üyelik Sistemi</h2>
            <div className="membership-info">
              <span className="membership-icon">👤</span>
              <div>
                <p>
                  <strong>Uygulamada herhangi bir üyelik veya hesap oluşturma zorunluluğu bulunmamaktadır.</strong>
                </p>
                <p>
                  Tüm özellikler anonim olarak kullanılabilir ve verileriniz yalnızca cihazınızda saklanır.
                </p>
              </div>
            </div>
          </div>

          <div className="content-section">
            <h2 className="section-title">6. Sorumluluk Reddi</h2>
            <div className="disclaimer-box">
              <p>
                Uygulama "olduğu gibi" sunulur. Kullanım sırasında oluşabilecek doğrudan veya dolaylı 
                zararlardan geliştirici sorumlu tutulamaz. Uygulamanın kullanımı tamamen kullanıcı sorumluluğundadır.
              </p>
            </div>
          </div>

          <div className="content-section">
            <h2 className="section-title">7. Üçüncü Taraf Hizmetler</h2>
            <p>Uygulamada kullanılan üçüncü taraf hizmetler şunlardır:</p>
            <div className="third-party-services">
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
            <p>
              <strong>Bu hizmetlerin kendi gizlilik politikaları geçerlidir.</strong> Kullanıcılar, 
              bu hizmetlerin gizlilik koşullarını incelemekle yükümlüdür.
            </p>
          </div>

          <div className="content-section">
            <h2 className="section-title">8. Değişiklikler</h2>
            <p>
              Gizlilik politikası zaman zaman güncellenebilir. Güncellemeler, bu sayfada yayınlandığı 
              tarihten itibaren geçerlilik kazanır.
            </p>
          </div>

          <div className="content-section">
            <h2 className="section-title">9. İletişim</h2>
            <p>Gizlilik politikası ile ilgili her türlü soru için iletişime geçebilirsiniz:</p>
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

export default PrivacyScreen;