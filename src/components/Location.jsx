import React from 'react';

export default function Location() {
  const transitLines = [
    { type: 'tram', label: 'Tram 13', distance: '150 metri (Fermata Fabrizi / Risorgimento)' },
    { type: 'bus', label: 'Bus 2, 22, 85', distance: '200 metri (Fermata Lecce / Fabrizi)' },
    { type: 'metro', label: 'Metro Racconigi', distance: '700 metri (Corso Francia)' },
    { type: 'metro', label: 'Metro Rivoli', distance: '700 metri (Piazza Rivoli)' }
  ];

  return (
    <section id="chi-siamo" className="section">
      <div className="container">
        <div className="asymmetric-title">
          <h2>Dove Trovarci</h2>
          <span>Locatie // Sede & Contatti</span>
        </div>

        <div className="location-v2-grid" style={{ marginBottom: '4rem' }}>
          {/* Contact Details List */}
          <div className="contact-v2-list">
            <div className="contact-v2-item">
              <span className="contact-v2-label">STUDIO PRINCIPALE</span>
              <span className="contact-v2-value">Via Nicola Fabrizi 45, 10143 Torino (TO)</span>
            </div>

            <div className="contact-v2-item">
              <span className="contact-v2-label">TELEFONO DIRETTO</span>
              <span className="contact-v2-value">
                <a href="tel:011748228">011 748228</a>
              </span>
            </div>

            <div className="contact-v2-item">
              <span className="contact-v2-label">EMAIL INFO</span>
              <span className="contact-v2-value">
                <a href="mailto:info@otticaferrari.it">info@otticaferrari.it</a>
              </span>
            </div>

            <div className="contact-v2-item">
              <span className="contact-v2-label">ORARI DI APERTURA</span>
              <span className="contact-v2-value" style={{ fontSize: '1.15rem' }}>
                Martedì – Sabato: 9:00 - 12:30 / 15:30 - 19:30
              </span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Domenica e Lunedì: Chiuso</span>
            </div>
          </div>

          {/* Transit List */}
          <div className="tech-card transit-card" style={{ background: '#050608' }}>
            <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-display)', fontWeight: '800', textTransform: 'uppercase', marginBottom: '2rem', letterSpacing: '-0.5px' }}>
              Collegamenti Pubblici
            </h3>
            <div className="transit-list">
              {transitLines.map((line, idx) => (
                <div key={idx} className="transit-item" style={{ background: '#000000' }}>
                  <span className={`transit-badge badge-${line.type}`}>
                    {line.label}
                  </span>
                  <span className="transit-details" style={{ color: 'var(--text-secondary)' }}>
                    {line.distance}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Elegant vector simulated map */}
        <div className="simulated-map" style={{ minHeight: '450px' }}>
          <div className="map-grid-lines"></div>
          
          {/* Simulated roads */}
          <div className="map-road road-v" style={{ left: '35%' }}></div>
          <div className="map-road road-v" style={{ left: '70%' }}></div>
          <div className="map-road road-h" style={{ top: '35%' }}></div>
          <div className="map-road road-h" style={{ top: '70%' }}></div>
          
          {/* Pin */}
          <div className="map-pin">
            <div className="map-pin-pulse" style={{ borderColor: 'var(--accent-green)', background: 'rgba(57, 255, 20, 0.15)' }}></div>
            <svg className="pin-icon" viewBox="0 0 24 24" width="24" height="24" style={{ fill: 'var(--accent-cyan)' }}>
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <span className="map-label" style={{ borderColor: 'var(--accent-green)' }}>FERRARI // OPTICS</span>
          </div>

          {/* Floating street names */}
          <span style={{ position: 'absolute', top: '22%', left: '10%', fontSize: '0.75rem', color: 'var(--text-muted)', transform: 'rotate(-5deg)', textTransform: 'uppercase', letterSpacing: '1px' }}>Corso Lecce</span>
          <span style={{ position: 'absolute', top: '55%', left: '75%', fontSize: '0.75rem', color: 'var(--text-muted)', transform: 'rotate(15deg)', textTransform: 'uppercase', letterSpacing: '1px' }}>Corso Svizzera</span>
          <span style={{ position: 'absolute', top: '75%', left: '10%', fontSize: '0.75rem', color: 'var(--accent-cyan)', transform: 'rotate(-5deg)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>Via Nicola Fabrizi</span>
        </div>
      </div>
    </section>
  );
}
