import React from 'react';
import { Routes, Route } from 'react-router-dom';
// Force reload comment
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import TrustedSchools from './components/TrustedSchools';
import DestinationsPage from './components/DestinationsPage';
import Gallery from './components/Gallery';
import Team from './components/Team';
import CTA from './components/CTA';
import Footer from './components/Footer';

// New Components split from About
import PainPoints from './components/PainPoints';
import Founder from './components/Founder';
import JadeCTA from './components/JadeCTA';
import ContactPage from './components/ContactPage';
import AuthorityManifesto from './components/AuthorityManifesto';
import BirthdayPage from './components/BirthdayPage';

// Legal Pages
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';

export default function App() {
  return (
    <div className="font-sans text-slate-800 antialiased bg-slate-50 selection:bg-brand-orange selection:text-white overflow-x-hidden flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Features />

              {/* Reordered Sections */}
              <PainPoints />

              <div id="trusted-schools">
                <TrustedSchools />
              </div>

              <Founder />
              <Team />
              <AuthorityManifesto />
            </>
          } />
          <Route path="/destinos" element={<DestinationsPage />} />
          <Route path="/aniversarios" element={<BirthdayPage />} />
          <Route path="/contato" element={<ContactPage />} />
          <Route path="/privacidade" element={<PrivacyPolicy />} />
          <Route path="/termos" element={<TermsOfService />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}