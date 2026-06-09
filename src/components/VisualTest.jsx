import React, { useState } from 'react';

export default function VisualTest() {
  const [currentStep, setCurrentStep] = useState(0); // 0: Intro, 1: Astigmatism, 2: Contrast, 3: Color, 4: Results
  
  // Test 1: Astigmatism State
  const [astigmatismResult, setAstigmatismResult] = useState(null); // 'uniform' or 'non-uniform'
  const [astigmatismAngle, setAstigmatismAngle] = useState(90);

  // Test 2: Contrast Sensitivity State
  const contrastLetters = [
    { letter: 'E', opacity: 0.8 },
    { letter: 'O', opacity: 0.4 },
    { letter: 'T', opacity: 0.15 },
    { letter: 'X', opacity: 0.05 }
  ];
  const [contrastStep, setContrastStep] = useState(0);
  const [contrastScore, setContrastScore] = useState(0);
  const [contrastSelection, setContrastSelection] = useState(null);

  // Test 3: Color Vision (Ishihara) State
  const [colorInput, setColorInput] = useState('');
  const [colorCorrect, setColorCorrect] = useState(false);

  // --- RENDERING CONSTANTS ---
  const spokeAngles = Array.from({ length: 15 }, (_, i) => i * 12);

  // Generate dynamic Ishihara dots (15x15 grid with circle mask)
  const generateIshiharaDots = () => {
    const dots = [];
    const size = 15;
    const pattern = [
      [0,0,0,1,1,1,1,1,0,0,0],
      [0,0,1,1,0,0,0,1,1,0,0],
      [0,1,1,0,0,0,0,0,1,1,0],
      [0,1,1,0,0,0,0,0,1,1,0],
      [0,0,1,1,0,0,0,1,1,0,0],
      [0,0,0,1,1,1,1,1,0,0,0],
      [0,0,1,1,0,0,0,1,1,0,0],
      [0,1,1,0,0,0,0,0,1,1,0],
      [0,1,1,0,0,0,0,0,1,1,0],
      [0,0,1,1,0,0,0,1,1,0,0],
      [0,0,0,1,1,1,1,1,0,0,0]
    ];

    const redColors = ['#f472b6', '#fb7185', '#fda4af', '#f87171', '#fca5a5', '#ea580c', '#f97316'];
    const greenColors = ['#34d399', '#10b981', '#059669', '#6ee7b7', '#0fb', '#00e676', '#1de9b6'];

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const dx = r - size/2;
        const dy = c - size/2;
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        if (dist < size/2 - 0.2) {
          const pr = r - 2;
          const pc = c - 2;
          let isPattern = false;
          if (pr >= 0 && pr < 11 && pc >= 0 && pc < 11) {
            isPattern = pattern[pr][pc] === 1;
          }

          const jitterX = (Math.random() - 0.5) * 4;
          const jitterY = (Math.random() - 0.5) * 4;
          const radius = 3.5 + Math.random() * 4.5;
          const color = isPattern 
            ? greenColors[Math.floor(Math.random() * greenColors.length)]
            : redColors[Math.floor(Math.random() * redColors.length)];

          dots.push({
            cx: (r * 14) + 20 + jitterX,
            cy: (c * 14) + 20 + jitterY,
            r: radius,
            color: color
          });
        }
      }
    }
    return dots;
  };

  const ishiharaDots = generateIshiharaDots();

  // --- ACTION HANDLERS ---
  const handleContrastAnswer = (selectedLetter) => {
    setContrastSelection(selectedLetter);
    const correctLetter = contrastLetters[contrastStep].letter;
    const isCorrect = selectedLetter === correctLetter;
    
    if (isCorrect) {
      setContrastScore(prev => prev + 1);
    }

    setTimeout(() => {
      setContrastSelection(null);
      if (contrastStep < 3) {
        setContrastStep(prev => prev + 1);
      } else {
        setCurrentStep(3);
      }
    }, 800);
  };

  const handleColorSubmit = (e) => {
    e.preventDefault();
    const isCorrect = colorInput.trim() === '8';
    setColorCorrect(isCorrect);
    setCurrentStep(4);
  };

  const resetTest = () => {
    setCurrentStep(0);
    setAstigmatismResult(null);
    setAstigmatismAngle(90);
    setContrastStep(0);
    setContrastScore(0);
    setContrastSelection(null);
    setColorInput('');
    setColorCorrect(false);
  };

  const getScoreProfile = () => {
    let clarityMsg = "Ottima uniformità retinica.";
    let clarityStatus = "Eccellente";
    if (astigmatismResult === 'non-uniform') {
      clarityMsg = `Rilevata asimmetria visiva sull'asse ${astigmatismAngle}°.`;
      clarityStatus = "Da Approfondire";
    }

    let contrastStatus = "Eccellente";
    let contrastMsg = "Percezione del contrasto perfetta anche in bassa luminosità.";
    if (contrastScore <= 2) {
      contrastStatus = "Moderata";
      contrastMsg = "Difficoltà nei livelli bassi di contrasto. Consigliato approfondimento.";
    }

    let colorStatus = "Normale";
    let colorMsg = "Percezione cromatica corretta nello spettro rosso-verde.";
    if (!colorCorrect) {
      colorStatus = "Anomala";
      colorMsg = "Rilevata potenziale discromatopsia (percezione cromatica ridotta).";
    }

    const overallScore = Math.round(
      ( (astigmatismResult === 'uniform' ? 1 : 0.6) * 35 ) + 
      ( (contrastScore / 4) * 40 ) + 
      ( (colorCorrect ? 1 : 0.4) * 25 )
    );

    return { clarityStatus, clarityMsg, contrastStatus, contrastMsg, colorStatus, colorMsg, overallScore };
  };

  const scrollToContact = () => {
    const el = document.getElementById('contatti');
    if (el) {
      const offset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section id="visual-test" className="section-alt">
      <div className="container">
        <div className="asymmetric-title">
          <h2>Test Visivo</h2>
          <span>Screening // Autovalutazione Rapida</span>
        </div>

        <div className="tech-card screening-v2-card visual-test-card" style={{ background: '#000000', border: '1px solid rgba(0, 229, 255, 0.2)' }}>
          {/* STEP 0: INTRO */}
          {currentStep === 0 && (
            <div className="test-body" style={{ textAlign: 'center', padding: '2rem 0' }}>
              <svg viewBox="0 0 24 24" style={{ width: '80px', height: '80px', marginBottom: '2rem', stroke: 'var(--accent-cyan)', fill: 'none', strokeWidth: 1.5 }}>
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <h3 style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', fontWeight: '800', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '-0.5px' }}>
                Console di Screening Visivo
              </h3>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '550px', marginBottom: '2.5rem', fontSize: '1rem', lineHeight: '1.6' }}>
                Una simulazione interattiva per verificare nitidezza corneale, sensibilità al contrasto e percezione dei colori. Posizionati in una stanza a luminosità media a circa 60cm dallo schermo.
              </p>
              <button className="btn btn-primary" onClick={() => setCurrentStep(1)}>
                AVVIA SIMULATORE
              </button>
            </div>
          )}

          {/* STEP 1: ASTIGMATISM */}
          {currentStep === 1 && (
            <div>
              <div className="test-header">
                <div className="test-title-container">
                  <svg className="test-icon" viewBox="0 0 24 24" style={{ stroke: 'var(--accent-green)' }}>
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="2" x2="12" y2="22" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                  </svg>
                  <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-display)', fontWeight: '700', textTransform: 'uppercase' }}>
                    Test 1: Nitidezza Corneale (Raggi di Green)
                  </h3>
                </div>
                <div className="test-steps-indicator">
                  <div className="step-dot active" style={{ backgroundColor: 'var(--accent-green)' }}></div>
                  <div className="step-dot"></div>
                  <div className="step-dot"></div>
                </div>
              </div>

              <div className="test-body">
                <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '2rem', maxWidth: '600px' }}>
                  Copri un occhio alla volta. Vedi alcune linee del quadrante più marcate, spesse o scure rispetto ad altre?
                </p>

                <div className="astigmatism-wheel" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                  {spokeAngles.map((angle) => (
                    <div 
                      key={angle} 
                      className="astigmatism-spoke" 
                      style={{ 
                        transform: `rotate(${angle}deg)`,
                        ...(astigmatismResult === 'non-uniform' && Math.abs((angle % 180) - (astigmatismAngle % 180)) < 15 ? {
                          background: 'linear-gradient(90deg, transparent 15%, var(--accent-green) 15%, var(--accent-green) 85%, transparent 85%)',
                          height: '3px',
                          opacity: 1
                        } : {})
                      }}
                    />
                  ))}
                </div>

                <div className="dial-controls" style={{ marginTop: '2.5rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
                    <button 
                      className="btn btn-secondary"
                      style={{ flex: 1, borderColor: astigmatismResult === 'uniform' ? 'var(--accent-green)' : 'var(--border-color)', color: astigmatismResult === 'uniform' ? 'var(--accent-green)' : 'var(--text-secondary)' }}
                      onClick={() => setAstigmatismResult('uniform')}
                    >
                      Linee tutte identiche
                    </button>
                    <button 
                      className="btn btn-secondary"
                      style={{ flex: 1, borderColor: astigmatismResult === 'non-uniform' ? 'var(--accent-green)' : 'var(--border-color)', color: astigmatismResult === 'non-uniform' ? 'var(--accent-green)' : 'var(--text-secondary)' }}
                      onClick={() => setAstigmatismResult('non-uniform')}
                    >
                      Vedo disomogeneità
                    </button>
                  </div>

                  {astigmatismResult === 'non-uniform' && (
                    <div style={{ width: '100%', marginTop: '1.5rem', textAlign: 'center' }}>
                      <label className="form-label" style={{ color: 'var(--accent-green)' }}>Seleziona l'asse sfocato: {astigmatismAngle}°</label>
                      <input 
                        type="range" 
                        min="0" 
                        max="180" 
                        step="10"
                        value={astigmatismAngle}
                        onChange={(e) => setAstigmatismAngle(Number(e.target.value))}
                        className="dial-slider"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="test-actions">
                <button className="btn btn-secondary" onClick={() => setCurrentStep(0)}>Indietro</button>
                <button 
                  className="btn btn-primary" 
                  disabled={astigmatismResult === null}
                  onClick={() => setCurrentStep(2)}
                >
                  Procedi
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: CONTRAST */}
          {currentStep === 2 && (
            <div>
              <div className="test-header">
                <div className="test-title-container">
                  <svg className="test-icon" viewBox="0 0 24 24" style={{ stroke: 'var(--accent-green)' }}>
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                  <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-display)', fontWeight: '700', textTransform: 'uppercase' }}>
                    Test 2: Sensibilità al Contrasto ({contrastStep + 1}/4)
                  </h3>
                </div>
                <div className="test-steps-indicator">
                  <div className="step-dot active" style={{ backgroundColor: 'var(--accent-green)' }}></div>
                  <div className="step-dot active" style={{ backgroundColor: 'var(--accent-green)' }}></div>
                  <div className="step-dot"></div>
                </div>
              </div>

              <div className="test-body">
                <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '2rem' }}>
                  Identifica la lettera al centro. Clicca sul tasto corrispondente.
                </p>

                <div className="contrast-test">
                  <span 
                    className="contrast-letter"
                    style={{ 
                      opacity: contrastLetters[contrastStep].opacity, 
                      fontFamily: 'var(--font-display)', 
                      color: 'var(--accent-cyan)',
                      textShadow: `0 0 15px rgba(0, 229, 255, ${contrastLetters[contrastStep].opacity * 0.3})`
                    }}
                  >
                    {contrastLetters[contrastStep].letter}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginTop: '2.5rem', width: '100%', maxWidth: '360px' }}>
                  {['E', 'O', 'T', 'X'].map((letter) => {
                    const isSelected = contrastSelection === letter;
                    const isCorrect = letter === contrastLetters[contrastStep].letter;
                    let btnStyle = {};
                    if (isSelected) {
                      btnStyle = isCorrect 
                        ? { borderColor: 'var(--accent-green)', color: 'var(--accent-green)', background: 'rgba(57, 255, 20, 0.1)' }
                        : { borderColor: '#ef4444', color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)' };
                    }
                    return (
                      <button 
                        key={letter}
                        className="btn btn-secondary"
                        style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)', padding: '0.75rem', borderRadius: '4px', ...btnStyle }}
                        disabled={contrastSelection !== null}
                        onClick={() => handleContrastAnswer(letter)}
                      >
                        {letter}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="test-actions">
                <button className="btn btn-secondary" onClick={() => { setCurrentStep(1); setContrastStep(0); setContrastScore(0); }}>Indietro</button>
                <button className="btn btn-primary" disabled style={{ opacity: 0.3 }}>Procedi</button>
              </div>
            </div>
          )}

          {/* STEP 3: COLOR ISHIHARA */}
          {currentStep === 3 && (
            <div>
              <div className="test-header">
                <div className="test-title-container">
                  <svg className="test-icon" viewBox="0 0 24 24" style={{ stroke: 'var(--accent-green)' }}>
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4M12 8h.01" />
                  </svg>
                  <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-display)', fontWeight: '700', textTransform: 'uppercase' }}>
                    Test 3: Percezione Cromatica (Ishihara Plate)
                  </h3>
                </div>
                <div className="test-steps-indicator">
                  <div className="step-dot active" style={{ backgroundColor: 'var(--accent-green)' }}></div>
                  <div className="step-dot active" style={{ backgroundColor: 'var(--accent-green)' }}></div>
                  <div className="step-dot active" style={{ backgroundColor: 'var(--accent-green)' }}></div>
                </div>
              </div>

              <div className="test-body">
                <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '2rem', maxWidth: '600px' }}>
                  Inserisci il numero che vedi all'interno del disco punteggiato.
                </p>

                <div className="colorblind-plate" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                  <svg viewBox="0 0 240 240">
                    {ishiharaDots.map((dot, index) => (
                      <circle 
                        key={index} 
                        cx={dot.cx} 
                        cy={dot.cy} 
                        r={dot.r} 
                        fill={dot.color} 
                      />
                    ))}
                  </svg>
                </div>

                <form onSubmit={handleColorSubmit} className="color-input-wrapper">
                  <input 
                    type="text" 
                    placeholder="--"
                    maxLength="3"
                    value={colorInput}
                    onChange={(e) => setColorInput(e.target.value.replace(/\D/g, ''))}
                    className="color-input"
                    style={{ borderColor: 'var(--border-color)', borderRadius: '4px' }}
                  />
                  <button type="submit" className="btn btn-primary">
                    Calcola Profilo
                  </button>
                </form>
              </div>

              <div className="test-actions">
                <button className="btn btn-secondary" onClick={() => { setCurrentStep(2); setContrastStep(0); setContrastScore(0); }}>Indietro</button>
                <button className="btn btn-primary" disabled style={{ opacity: 0.3 }}>Procedi</button>
              </div>
            </div>
          )}

          {/* STEP 4: SCORECARD */}
          {currentStep === 4 && (
            <div className="results-scorecard" style={{ padding: '1rem 0' }}>
              <h3 style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', fontWeight: '800', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '-0.5px' }}>
                Profilo Visivo Generato
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>
                Resoconto preliminare di efficienza visiva simulata:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '3.5rem', textAlign: 'left' }}>
                {/* Sharpness */}
                <div className="tech-card accent-cyan" style={{ padding: '2rem 1.5rem', background: '#050608' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-display)', fontWeight: '700', letterSpacing: '1px' }}>NITIDEZZA</span>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '0.75rem 0' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: '800', fontFamily: 'var(--font-display)', textTransform: 'uppercase' }}>Uniformità</span>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: '700', 
                      color: getScoreProfile().clarityStatus === 'Eccellente' ? 'var(--accent-green)' : 'var(--accent-gold)',
                      border: `1px solid ${getScoreProfile().clarityStatus === 'Eccellente' ? 'var(--accent-green)' : 'var(--accent-gold)'}`,
                      padding: '0.2rem 0.6rem',
                      borderRadius: '4px'
                    }}>
                      {getScoreProfile().clarityStatus}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{getScoreProfile().clarityMsg}</p>
                </div>

                {/* Contrast */}
                <div className="tech-card accent-cyan" style={{ padding: '2rem 1.5rem', background: '#050608' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-display)', fontWeight: '700', letterSpacing: '1px' }}>CONTRASTO</span>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '0.75rem 0' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: '800', fontFamily: 'var(--font-display)', textTransform: 'uppercase' }}>Sensibilità</span>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: '700', 
                      color: getScoreProfile().contrastStatus === 'Eccellente' ? 'var(--accent-green)' : 'var(--accent-gold)',
                      border: `1px solid ${getScoreProfile().contrastStatus === 'Eccellente' ? 'var(--accent-green)' : 'var(--accent-gold)'}`,
                      padding: '0.2rem 0.6rem',
                      borderRadius: '4px'
                    }}>
                      {getScoreProfile().contrastStatus}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{getScoreProfile().contrastMsg}</p>
                </div>

                {/* Color */}
                <div className="tech-card accent-cyan" style={{ padding: '2rem 1.5rem', background: '#050608' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-display)', fontWeight: '700', letterSpacing: '1px' }}>CROMATICITÀ</span>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '0.75rem 0' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: '800', fontFamily: 'var(--font-display)', textTransform: 'uppercase' }}>Spettro</span>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: '700', 
                      color: getScoreProfile().colorStatus === 'Normale' ? 'var(--accent-green)' : '#ef4444',
                      border: `1px solid ${getScoreProfile().colorStatus === 'Normale' ? 'var(--accent-green)' : '#ef4444'}`,
                      padding: '0.2rem 0.6rem',
                      borderRadius: '4px'
                    }}>
                      {getScoreProfile().colorStatus}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{getScoreProfile().colorMsg}</p>
                </div>
              </div>

              <div style={{ background: '#050608', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '2.5rem', marginBottom: '3rem' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-display)', fontWeight: '700', letterSpacing: '1px' }}>INDICE CHIAREZZA STIMATO</span>
                <div className="score-badge" style={{ color: 'var(--accent-green)', textShadow: '0 0 20px rgba(57, 255, 20, 0.4)' }}>
                  {getScoreProfile().overallScore}%
                </div>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 2rem auto', lineHeight: '1.6' }}>
                  Questo indice simula la reattività visiva globale. Si consiglia una visita optometrica approfondita in studio per misurazioni diagnostiche complete.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button className="btn btn-primary" onClick={scrollToContact}>
                    PRENOTA VISITA COMPLETA
                  </button>
                  <button className="btn btn-secondary" onClick={resetTest}>
                    Ricomincia
                  </button>
                </div>
              </div>

              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', fontStyle: 'italic', lineHeight: '1.4' }}>
                * Disclaimer: Questo screening visuale online ha unicamente scopo informativo e non costituisce parere medico o diagnosi clinica oculistica.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
