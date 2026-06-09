import React, { useState, useEffect } from 'react';
import CanvasParticles from './CanvasParticles';

export default function Hero() {
  const phrases = [
    '360˚ optometria clinica',
    'ortocheratologia notturna',
    'applicazione lenti a contatto',
    'centratura 3d personalizzata'
  ];

  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(80);

  useEffect(() => {
    let timer;
    const handleType = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      if (isDeleting) {
        setText(fullText.substring(0, text.length - 1));
        setTypingSpeed(40); // Erase faster
      } else {
        setText(fullText.substring(0, text.length + 1));
        setTypingSpeed(100); // Normal typing speed
      }

      // Check transitions
      if (!isDeleting && text === fullText) {
        timer = setTimeout(() => setIsDeleting(true), 2500); // Wait on complete phrase
        return;
      }

      if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(200); // Pause before next word
        return;
      }
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  const handleScrollDown = () => {
    const headerEl = document.querySelector('.header-v2');
    if (headerEl) {
      headerEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero-v2">
      {/* Interactive canvas background */}
      <CanvasParticles />
      
      {/* Dark gradient visual layer */}
      <div className="hero-v2-overlay"></div>

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div className="hero-v2-content">
          <div className="hero-badge" style={{ borderColor: 'var(--accent-cyan)', color: 'var(--accent-cyan)' }}>
            <span className="hero-badge-dot" style={{ backgroundColor: 'var(--accent-cyan)', boxShadow: '0 0 10px var(--accent-cyan)' }}></span>
            <span>TORINO // VIA NICOLA FABRIZI 45</span>
          </div>
          <h1 className="hero-v2-title">
            Ferrari<br />
            <span>Optics.</span>
          </h1>
          <p className="hero-v2-tagline">
            {text}
            <span className="cursor-blink"></span>
          </p>
          <div className="hero-cta">
            <a 
              href="#contatti" 
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contatti')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              PRENOTA APPUNTAMENTO
            </a>
            <a 
              href="#visual-test" 
              className="btn btn-secondary"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('visual-test')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              SCREENING ONLINE
            </a>
          </div>
        </div>
      </div>

      <div className="hero-v2-scroll-down" onClick={handleScrollDown}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 5v14M19 12l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  );
}
