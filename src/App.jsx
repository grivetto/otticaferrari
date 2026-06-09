import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import VisualTest from './components/VisualTest';
import Services from './components/Services';
import Products from './components/Products';
import Brands from './components/Brands';
import BookingForm from './components/BookingForm';
import Location from './components/Location';

export default function App() {
  return (
    <div className="app-root">
      {/* Cinematic entrance Hero (Full screen 100vh) */}
      <Hero />
      
      {/* Sticky header situated below Hero fold */}
      <Header />
      
      <main>
        <VisualTest />
        <Services />
        <Products />
        <Brands />
        <BookingForm />
        <Location />
      </main>
    </div>
  );
}
