import React, { useState } from 'react';
import './App.css';

// Screens
import HomeScreen from './screens/HomeScreen';
import PrivacyScreen from './screens/PrivacyScreen';
import TermsScreen from './screens/TermsScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');

  const Header = () => (
    <header className="header">
      <div className="container">
        <button 
          onClick={() => setCurrentScreen('home')} 
          className="logo"
        >
          📚 Çıkmış Kelimeler
        </button>
        <nav className="nav">
          <button 
            onClick={() => setCurrentScreen('home')} 
            className={`nav-link ${currentScreen === 'home' ? 'active' : ''}`}
          >
            Ana Sayfa
          </button>
          <button 
            onClick={() => setCurrentScreen('privacy')} 
            className={`nav-link ${currentScreen === 'privacy' ? 'active' : ''}`}
          >
            Gizlilik
          </button>
          <button 
            onClick={() => setCurrentScreen('terms')} 
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
            <button onClick={() => setCurrentScreen('home')} className="footer-link">Ana Sayfa</button>
            <button onClick={() => setCurrentScreen('privacy')} className="footer-link">Gizlilik</button>
            <button onClick={() => setCurrentScreen('terms')} className="footer-link">Kullanım Şartları</button>
          </div>
          <div className="footer-section">
            <h4>İletişim</h4>
            
            <a href="mailto:destek@cikmiskelimeler.com" className="footer-link">
              destek@cikmiskelimeler.com
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Çıkmış Kelimeler. Tüm hakları saklıdır.</p>
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