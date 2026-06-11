import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { LazyMotion, domAnimation } from 'framer-motion';
// Above-the-fold / home: carregados imediatamente
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import TrustedSchools from './components/TrustedSchools';
import Team from './components/Team';
import CTA from './components/CTA';
import Footer from './components/Footer';
import PainPoints from './components/PainPoints';
import Founder from './components/Founder';
import AuthorityManifesto from './components/AuthorityManifesto';

// Rotas secundárias: code-split (saem do bundle inicial)
const DestinationsPage = lazy(() => import('./components/DestinationsPage'));
const BirthdayPage = lazy(() => import('./components/BirthdayPage'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./components/TermsOfService'));

// Widget global (puxa @supabase/supabase-js): code-split + montado após idle
const JadeChatWidget = lazy(() => import('./components/JadeChatWidget'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Adia a montagem do widget (puxa supabase + chat ~215KB) para fora do caminho
// crítico: carrega na 1ª interação do usuário (scroll/toque/clique/tecla), com um
// fallback por tempo para quem nunca interage. Isso tira ~58KB gzip do load inicial.
function DeferredChatWidget() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (show) return;
    const load = () => setShow(true);
    const events: (keyof WindowEventMap)[] = ['scroll', 'pointerdown', 'touchstart', 'keydown', 'mousemove'];
    events.forEach((e) => window.addEventListener(e, load, { once: true, passive: true }));
    // Fallback: garante o widget mesmo sem interação (ex.: aba aberta e parada).
    const timer = window.setTimeout(load, 6000);
    return () => {
      events.forEach((e) => window.removeEventListener(e, load));
      window.clearTimeout(timer);
    };
  }, [show]);

  if (!show) return null;
  return (
    <Suspense fallback={null}>
      <JadeChatWidget />
    </Suspense>
  );
}

export default function App() {
  return (
    <LazyMotion features={domAnimation}>
    <div className="font-sans text-slate-800 antialiased bg-slate-50 selection:bg-brand-orange selection:text-white overflow-x-hidden flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />
      <div className="flex-grow">
        <Suspense fallback={<div className="min-h-screen" />}>
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
                <CTA />
              </>
            } />
            <Route path="/destinos" element={<DestinationsPage />} />
            <Route path="/aniversarios" element={<BirthdayPage />} />
            {/* ContactPage Removed */}
            <Route path="/privacidade" element={<PrivacyPolicy />} />
            <Route path="/termos" element={<TermsOfService />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
      <DeferredChatWidget />
    </div>
    </LazyMotion>
  );
}
