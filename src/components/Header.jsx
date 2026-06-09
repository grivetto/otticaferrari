import React, { useState, useEffect } from 'react';

export default function Header() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'chi-siamo', 'servizi', 'prodotti', 'marchi', 'contatti'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const offset = 80; // height of sticky header
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="header-v2">
      <div className="container">
        <a href="#home" className="logo" onClick={(e) => handleLinkClick(e, 'home')}>
          FERRARI // <span>OPTICS</span>
        </a>

        {/* Desktop Navigation */}
        <ul className="nav-menu">
          <li>
            <a 
              href="#home" 
              className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
              onClick={(e) => handleLinkClick(e, 'home')}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="#chi-siamo" 
              className={`nav-link ${activeSection === 'chi-siamo' ? 'active' : ''}`}
              onClick={(e) => handleLinkClick(e, 'chi-siamo')}
            >
              Chi Siamo
            </a>
          </li>
          <li>
            <a 
              href="#servizi" 
              className={`nav-link ${activeSection === 'servizi' ? 'active' : ''}`}
              onClick={(e) => handleLinkClick(e, 'servizi')}
            >
              Servizi
            </a>
          </li>
          <li>
            <a 
              href="#prodotti" 
              className={`nav-link ${activeSection === 'prodotti' ? 'active' : ''}`}
              onClick={(e) => handleLinkClick(e, 'prodotti')}
            >
              Prodotti
            </a>
          </li>
          <li>
            <a 
              href="#marchi" 
              className={`nav-link ${activeSection === 'marchi' ? 'active' : ''}`}
              onClick={(e) => handleLinkClick(e, 'marchi')}
            >
              Marchi
            </a>
          </li>
          <li>
            <a 
              href="#contatti" 
              className={`nav-link ${activeSection === 'contatti' ? 'active' : ''}`}
              onClick={(e) => handleLinkClick(e, 'contatti')}
            >
              Contatti
            </a>
          </li>
        </ul>

        <div className="header-actions">
          <a 
            href="#contatti" 
            className="btn btn-secondary"
            style={{ padding: '0.5rem 1.25rem', fontSize: '0.75rem' }}
            onClick={(e) => handleLinkClick(e, 'contatti')}
          >
            PRENOTA APPUNTAMENTO
          </a>
          <button 
            className={`nav-toggle ${isMobileMenuOpen ? 'open' : ''}`}
            style={{ marginLeft: '1rem' }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`nav-menu-mobile-v2 ${isMobileMenuOpen ? 'open' : ''}`}>
        <a 
          href="#home" 
          className="nav-link" 
          onClick={(e) => handleLinkClick(e, 'home')}
        >
          Home
        </a>
        <a 
          href="#chi-siamo" 
          className="nav-link" 
          onClick={(e) => handleLinkClick(e, 'chi-siamo')}
        >
          Chi Siamo
        </a>
        <a 
          href="#servizi" 
          className="nav-link" 
          onClick={(e) => handleLinkClick(e, 'servizi')}
        >
          Servizi
        </a>
        <a 
          href="#prodotti" 
          className="nav-link" 
          onClick={(e) => handleLinkClick(e, 'prodotti')}
        >
          Prodotti
        </a>
        <a 
          href="#marchi" 
          className="nav-link" 
          onClick={(e) => handleLinkClick(e, 'marchi')}
        >
          Marchi
        </a>
        <a 
          href="#contatti" 
          className="nav-link" 
          onClick={(e) => handleLinkClick(e, 'contatti')}
        >
          Contatti
        </a>
        <a 
          href="#contatti" 
          className="btn btn-primary" 
          style={{ display: 'inline-flex', marginTop: '1rem' }}
          onClick={(e) => handleLinkClick(e, 'contatti')}
        >
          PRENOTA Appuntamento
        </a>
      </div>
    </header>
  );
}
