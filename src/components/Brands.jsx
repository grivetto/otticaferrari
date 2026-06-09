import React from 'react';

export default function Brands() {
  const brandsList = [
    'Varilux',
    'Transitions',
    'Zeiss',
    'Ray-Ban',
    'Persol',
    'Oakley',
    'Vogue Eyewear',
    'Hoya',
    'Essilor'
  ];

  const doubleBrands = [...brandsList, ...brandsList, ...brandsList];

  return (
    <section id="marchi" className="brands-v2-marquee">
      <div className="brands-v2-track">
        <div className="brands-v2-group">
          {doubleBrands.map((brand, index) => (
            <span key={index} className="brand-v2-name">
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
