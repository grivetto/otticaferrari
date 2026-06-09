import React, { useState } from 'react';

export default function Products() {
  const [activeFilter, setActiveFilter] = useState('all');

  const productCategories = [
    { id: 'all', label: 'Tutte' },
    { id: 'vista', label: 'Occhiali da Vista' },
    { id: 'sole', label: 'Occhiali da Sole' },
    { id: 'lenti', label: 'Lenti a Contatto' }
  ];

  const productsList = [
    {
      id: 1,
      name: 'Minimal Titanio',
      category: 'vista',
      meta: 'Frame Collection',
      price: 'Custom Crafted',
      svg: (
        <svg className="product-v2-icon" viewBox="0 0 100 60">
          <circle cx="33" cy="30" r="14" />
          <circle cx="67" cy="30" r="14" />
          <path d="M47 26c2-2 4-2 6 0" />
          <path d="M19 28c-3-4-6-6-10-6M81 28c3-4 6-6 10-6" />
        </svg>
      )
    },
    {
      id: 2,
      name: 'Varilux Progressive',
      category: 'vista',
      meta: 'Ophthalmic Lenses',
      price: 'AI Computed Focus',
      svg: (
        <svg className="product-v2-icon" viewBox="0 0 100 60">
          <circle cx="50" cy="30" r="22" strokeDasharray="3 3"/>
          <circle cx="50" cy="30" r="12" />
          <path d="M28 30h44M50 8v44" strokeWidth="0.8" opacity="0.3"/>
        </svg>
      )
    },
    {
      id: 3,
      name: 'Sport Sunglasses',
      category: 'sole',
      meta: 'Sun Protection',
      price: 'Polarized UV400',
      svg: (
        <svg className="product-v2-icon" viewBox="0 0 100 60">
          <path d="M10 24c15-4 30-5 40-1 10-4 25-3 40 1M14 24c5 13 18 13 25 1M86 24c-5 13-18 13-25 1" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M39 24c5-2 5-2 12 0" />
        </svg>
      )
    },
    {
      id: 4,
      name: 'Acetato Acetate Vintage',
      category: 'sole',
      meta: 'Sun Collection',
      price: 'Classic Silhouette',
      svg: (
        <svg className="product-v2-icon" viewBox="0 0 100 60">
          <circle cx="35" cy="30" r="15" fill="rgba(0, 229, 255, 0.03)" />
          <circle cx="65" cy="30" r="15" fill="rgba(0, 229, 255, 0.03)" />
          <path d="M50 25c2-2 4-2 0 0" />
          <path d="M20 28c-4-4-6-5-10-5M80 28c4-4 6-5 10-5" />
        </svg>
      )
    },
    {
      id: 5,
      name: 'Lenti Giornaliere Hydro',
      category: 'lenti',
      meta: 'Contact Lenses',
      price: 'High Hydration Pack',
      svg: (
        <svg className="product-v2-icon" viewBox="0 0 100 60">
          <ellipse cx="50" cy="32" rx="20" ry="10" />
          <path d="M35 32c0-8 15-8 15 0" opacity="0.6"/>
          <circle cx="50" cy="22" r="1.5" fill="currentColor"/>
          <circle cx="43" cy="26" r="1" fill="currentColor"/>
        </svg>
      )
    },
    {
      id: 6,
      name: 'Ortocheratologia Notturna',
      category: 'lenti',
      meta: 'Contact Lenses',
      price: 'Gas Permeable Sleep',
      svg: (
        <svg className="product-v2-icon" viewBox="0 0 100 60">
          <path d="M16 35c10-15 58-15 68 0" strokeLinecap="round"/>
          <path d="M24 35c8-10 44-10 52 0" strokeLinecap="round" opacity="0.4"/>
          <circle cx="50" cy="24" r="2.5" fill="currentColor"/>
        </svg>
      )
    }
  ];

  const filteredProducts = activeFilter === 'all' 
    ? productsList 
    : productsList.filter(p => p.category === activeFilter);

  return (
    <section id="prodotti" className="section">
      <div className="container">
        <div className="asymmetric-title">
          <h2>Collezioni</h2>
          <span>Collecties // Eyewear Design & Lenses</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4rem' }}>
          <div className="products-filter">
            {productCategories.map((cat) => (
              <button
                key={cat.id}
                className={`filter-btn ${activeFilter === cat.id ? 'active' : ''}`}
                style={{ 
                  borderRadius: '4px', 
                  border: activeFilter === cat.id ? '1px solid var(--accent-green)' : '1px solid var(--border-color)',
                  color: activeFilter === cat.id ? 'var(--accent-green)' : 'var(--text-secondary)',
                  background: activeFilter === cat.id ? 'rgba(57, 255, 20, 0.08)' : 'transparent'
                }}
                onClick={() => setActiveFilter(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="products-v2-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="tech-card product-v2-card accent-cyan">
              <span className="service-v2-badge" style={{ color: 'var(--text-muted)' }}>{product.meta}</span>
              <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem 0 2rem 0' }}>
                {product.svg}
              </div>
              <h3 className="product-v2-title">{product.name}</h3>
              <p className="product-v2-desc" style={{ fontSize: '0.85rem' }}>{product.price}</p>
              <a 
                href="https://otticaferrari.myshopify.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="product-v2-link"
              >
                Shop Online
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
