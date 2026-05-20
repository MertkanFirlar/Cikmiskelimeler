import React, { useState, useEffect } from 'react';
import './App.css';

// Screens
import HomeScreen from './screens/HomeScreen';
import PrivacyScreen from './screens/PrivacyScreen';
import TermsScreen from './screens/TermsScreen';

const VALID_SCREENS = ['home', 'privacy', 'terms'];

const screenFromHash = () => {
  const h = (window.location.hash || '').replace('#', '');
  return VALID_SCREENS.includes(h) ? h : 'home';
};

function App() {
  const [currentScreen, setCurrentScreen] = useState(screenFromHash());

  // URL hash değişince ekranı güncelle (#privacy, #terms direkt link verir)
  useEffect(() => {
    const onHashChange = () => setCurrentScreen(screenFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = (screen) => {
    window.location.hash = screen === 'home' ? '' : screen;
    setCurrentScreen(screen);
    window.scrollTo(0, 0);
  };

  const Header = () => (
    <header className="header">
      <div className="container">
        <button
          onClick={() => navigate('home')}
          className="logo"
        >
          📚 Çıkmış Kelimeler
        </button>
        <nav className="nav">
          <button
            onClick={() => navigate('home')}
            className={`nav-link ${currentScreen === 'home' ? 'active' : ''}`}
          >
            Ana Sayfa
          </button>
          <button
            onClick={() => navigate('privacy')}
            className={`nav-link ${currentScreen === 'privacy' ? 'active' : ''}`}
          >
            Gizlilik
          </button>
          <button
            onClick={() => navigate('terms')}
            className={`nav-link ${currentScreen === 'terms' ? 'active' : ''}`}
          >
            Kullanım Şartları
          </button>
        </nav>
      </div>
    </header>
  );

  const Footer = () => (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>📚 Çıkmış Kelimeler</h3>
            <p>YÖKDİL başarınız için en kapsamlı kelime uygulaması.</p>
          </div>
          <div className="footer-section">
            <h4>Hızlı Bağlantılar</h4>
            <button onClick={() => navigate('home')} className="footer-link">Ana Sayfa</button>
            <button onClick={() => navigate('privacy')} className="footer-link">Gizlilik</button>
            <button onClick={() => navigate('terms')} className="footer-link">Kullanım Şartları</button>
          </div>
          <div className="footer-section">
            <h4>İletişim</h4>

            <a href="mailto:destekcikmis@gmail.com" className="footer-link">
              destekcikmis@gmail.com
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Çıkmış Kelimeler. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );

  const renderScreen = () => {
    switch(currentScreen) {
      case 'home':
        return <HomeScreen />;
      case 'privacy':
        return <PrivacyScreen />;
      case 'terms':
        return <TermsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        {renderScreen()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
