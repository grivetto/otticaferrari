import React from 'react';

export default function Services() {
  const servicesList = [
    {
      id: 'analisi-visiva',
      badge: '01 / DIAGNOSTIC',
      title: 'Analisi Visiva Optometrica',
      desc: 'Esame approfondito dell\'efficienza visiva e della coordinazione binoculare. Rileviamo difetti visivi (miopia, astigmatismo, presbiopia) con centratura e calibrazione computerizzata di precisione.',
    },
    {
      id: 'lenti-contatto',
      badge: '02 / CONTACT LENSES',
      title: 'Applicazione Lenti a Contatto',
      desc: 'Contattologia specialistica su misura per lenti morbide, gas-permeabili, toriche e multifocali. Monitoraggio della superficie corneale ed esame avanzato del film lacrimale.',
    },
    {
      id: 'ortocheratologia',
      badge: '03 / NIGHT THERAPY',
      title: 'Ortocheratologia (Lenti Notturne)',
      desc: 'Correzione non chirurgica della miopia. Utilizziamo speciali lenti a contatto da indossare esclusivamente durante le ore di sonno, che rimodellano la cornea per darti una visione nitida di giorno.',
    },
    {
      id: 'visual-training',
      badge: '04 / TRAINING',
      title: 'Visual Training Optometrico',
      desc: 'Esercizi visivi personalizzati per rieducare e potenziare le abilità visive. Indicato per alleviare l\'astenopia (affaticamento da computer), migliorare la lettura e coordinazione motoria.',
    },
    {
      id: 'occhiali-misura',
      badge: '05 / CUSTOM MADE',
      title: 'Occhiali Personalizzati 3D',
      desc: 'Adattamento geometrico tridimensionale della montatura e delle lenti. Rilevamento dei parametri del viso tramite videocentratura digitale per eliminare qualsiasi aberrazione visiva.',
    }
  ];

  const handleBookingScroll = (e) => {
    e.preventDefault();
    const el = document.getElementById('contatti');
    if (el) {
      const offset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section id="servizi" className="section-alt">
      <div className="container">
        <div className="asymmetric-title">
          <h2>Servizi</h2>
          <span>Diensten // 360˚ Optometry & Contattologia</span>
        </div>

        <div className="services-v2-grid">
          {servicesList.map((service) => (
            <div key={service.id} className="tech-card service-v2-card">
              <span className="service-v2-badge">{service.badge}</span>
              <h3 className="service-v2-title">{service.title}</h3>
              <p className="service-v2-desc">{service.desc}</p>
              <a 
                href="#contatti" 
                className="product-v2-link" 
                style={{ marginTop: '2rem', display: 'inline-flex' }}
                onClick={handleBookingScroll}
              >
                Prenota Analisi
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
