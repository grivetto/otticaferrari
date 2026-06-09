import React from 'react';

export default function Footer() {
  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const offset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="footer-v2">
      <div className="container footer-v2-grid">
        {/* Brand block */}
        <div>
          <a href="#home" className="footer-v2-big-logo" style={{ textDecoration: 'none', color: '#fff' }} onClick={(e) => handleLinkClick(e, 'home')}>
            Ferrari // <span>Optics.</span>
          </a>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '2rem' }}>
            Atelier di optometria clinica e contattologia specialistica a Torino. Soluzioni visive sartoriali progettate su misura con metodologie 3D all'avanguardia.
          </p>
          <div className="footer-v2-socials">
            <a href="https://www.facebook.com/OtticaFerrariTorino" target="_blank" rel="noopener noreferrer" className="social-v2-icon">
              FB
            </a>
            <a href="https://www.instagram.com/_otticaferrari_/" target="_blank" rel="noopener noreferrer" className="social-v2-icon">
              IG
            </a>
          </div>
        </div>

        {/* Links grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div>
            <h4 className="contact-v2-label" style={{ marginBottom: '1.5rem', color: '#fff' }}>Menu</h4>
            <ul className="footer-links">
              <li><a href="#home" className="footer-link" onClick={(e) => handleLinkClick(e, 'home')}>Home</a></li>
              <li><a href="#chi-siamo" className="footer-link" onClick={(e) => handleLinkClick(e, 'chi-siamo')}>Chi Siamo</a></li>
              <li><a href="#servizi" className="footer-link" onClick={(e) => handleLinkClick(e, 'servizi')}>Servizi</a></li>
              <li><a href="#prodotti" className="footer-link" onClick={(e) => handleLinkClick(e, 'prodotti')}>Prodotti</a></li>
              <li><a href="#contatti" className="footer-link" onClick={(e) => handleLinkClick(e, 'contatti')}>Contatti</a></li>
            </ul>
          </div>

          <div>
            <h4 className="contact-v2-label" style={{ marginBottom: '1.5rem', color: '#fff' }}>Servizi</h4>
            <ul className="footer-links">
              <li><a href="#servizi" className="footer-link" onClick={(e) => handleLinkClick(e, 'servizi')}>Analisi Visiva</a></li>
              <li><a href="#servizi" className="footer-link" onClick={(e) => handleLinkClick(e, 'servizi')}>Lenti Notturne</a></li>
              <li><a href="#servizi" className="footer-link" onClick={(e) => handleLinkClick(e, 'servizi')}>Contattologia</a></li>
              <li><a href="#servizi" className="footer-link" onClick={(e) => handleLinkClick(e, 'servizi')}>Visual Training</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container footer-bottom" style={{ borderColor: 'var(--border-color)', paddingTop: '2.5rem' }}>
        <span className="footer-copy">
          &copy; {new Date().getFullYear()} Ferrari Optics. Via Nicola Fabrizi 45, Torino. P.IVA 06981240011.
        </span>
        <div className="footer-legal">
          <a href="#" className="footer-link" style={{ fontSize: '0.8rem' }}>Privacy Policy</a>
          <a href="#" className="footer-link" style={{ fontSize: '0.8rem' }}>Cookie settings</a>
        </div>
      </div>
    </footer>
  );
}
