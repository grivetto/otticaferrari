import React, { useState } from 'react';

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'analisi-visiva',
    date: '',
    message: '',
    privacyAccepted: false
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle, submitting, success

  const services = [
    { id: 'analisi-visiva', label: 'Analisi Visiva Optometrica' },
    { id: 'contattologia', label: 'Applicazione Lenti a Contatto' },
    { id: 'ortocheratologia', label: 'Ortocheratologia (Lenti Notturne)' },
    { id: 'visual-training', label: 'Visual Training' },
    { id: 'scelta-occhiali', label: 'Scelta Montatura e Lenti' }
  ];

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Il nome è obbligatorio';
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Il numero di telefono è obbligatorio';
    } else if (!/^[0-9+\s-]{8,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Inserisci un numero di telefono valido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'indirizzo email è obbligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Inserisci un indirizzo email valido';
    }

    if (!formData.privacyAccepted) {
      newErrors.privacy = 'Trattamento dati obbligatorio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    
    setTimeout(() => {
      setStatus('success');
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: 'analisi-visiva',
        date: '',
        message: '',
        privacyAccepted: false
      });
    }, 1500);
  };

  return (
    <section id="contatti" className="section section-alt">
      <div className="container booking-grid">
        <div className="booking-text-container">
          <div className="asymmetric-title" style={{ marginBottom: '2rem' }}>
            <h2>Contatti</h2>
            <span>Prenota // Reserveren</span>
          </div>
          <p className="section-desc" style={{ marginBottom: '3rem', fontSize: '0.95rem' }}>
            Richiedi un esame optometrico o una consulenza per lenti a contatto. Scegli il servizio desiderato e indica il giorno di tua preferenza.
          </p>

          <div className="booking-benefits">
            <div className="booking-benefit">
              <div className="benefit-icon-wrapper" style={{ borderColor: 'var(--accent-cyan)' }}>
                <svg className="benefit-icon" viewBox="0 0 24 24" style={{ stroke: 'var(--accent-cyan)' }}>
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <div>
                <h4 className="benefit-title" style={{ color: 'var(--accent-cyan)' }}>Orario Riservato</h4>
                <p className="benefit-desc">Nessuna attesa o coda in negozio, verrai ricevuto esattamente all'orario concordato.</p>
              </div>
            </div>

            <div className="booking-benefit">
              <div className="benefit-icon-wrapper" style={{ borderColor: 'var(--accent-green)' }}>
                <svg className="benefit-icon" viewBox="0 0 24 24" style={{ stroke: 'var(--accent-green)' }}>
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
              </div>
              <div>
                <h4 className="benefit-title" style={{ color: 'var(--accent-green)' }}>Strumentazione 3D</h4>
                <p className="benefit-desc">Diagnosi e controllo visivo effettuati con tecnologie di ultima generazione.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="tech-card form-wrapper" style={{ background: '#000000' }}>
          {status === 'success' ? (
            <div className="success-notification">
              <svg className="success-icon" viewBox="0 0 24 24" style={{ stroke: 'var(--accent-green)' }}>
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <h3 className="section-title text-gradient" style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Richiesta Ricevuta</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '0.9rem' }}>
                Grazie. Il nostro studio verificherà le disponibilità per la data selezionata e ti ricontatterà via telefono o email per confermare l'orario definitivo.
              </p>
              <button className="btn btn-secondary" onClick={() => setStatus('idle')}>
                Invia Nuova Richiesta
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Nome e Cognome *</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nome Cognome"
                  className={`form-input ${errors.name ? 'error' : ''}`}
                />
                {errors.name && <div className="error-message">{errors.name}</div>}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Telefono *</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Telefono"
                    className={`form-input ${errors.phone ? 'error' : ''}`}
                  />
                  {errors.phone && <div className="error-message">{errors.phone}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">Email *</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="nome@esempio.it"
                    className={`form-input ${errors.email ? 'error' : ''}`}
                  />
                  {errors.email && <div className="error-message">{errors.email}</div>}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Esame Richiesto</label>
                  <select 
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="form-select"
                  >
                    {services.map(s => (
                      <option key={s.id} value={s.id}>{s.label}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Data Preferita</label>
                  <input 
                    type="date" 
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="form-input"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Messaggio (Opzionale)</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Scrivi qui eventuali richieste o orari preferiti..."
                  rows="3"
                  className="form-textarea"
                />
              </div>

              <div className="form-group">
                <label className="privacy-checkbox">
                  <input 
                    type="checkbox" 
                    name="privacyAccepted"
                    checked={formData.privacyAccepted}
                    onChange={handleChange}
                  />
                  <span>
                    Acconsento al trattamento dati secondo il GDPR n. 679/2016.
                  </span>
                </label>
                {errors.privacy && <div className="error-message">{errors.privacy}</div>}
              </div>

              <button 
                type="submit" 
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '1rem' }}
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? 'Invio in corso...' : 'INVIA RICHIESTA'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
