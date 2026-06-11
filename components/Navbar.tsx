import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { m, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation, Link } from 'react-router-dom';

import Picture from './Picture';
import logo from '../assets/alegrando.webp?w=240;480&format=avif;webp&as=picture';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  const navLinks = [
    { name: 'Sobre', href: '/' },
    { name: 'Destinos', href: '/destinos' },
  ];

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (href.startsWith('/#')) {
      const hash = href.replace('/', '');
      if (location.pathname === '/') {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate('/' + hash);
        window.scrollTo(0, 0);
      }
    } else {
      if (location.pathname === href) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate(href);
        window.scrollTo(0, 0);
      }
    }
  };

  const handleAniversariosClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (location.pathname === '/aniversarios') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/aniversarios');
      window.scrollTo(0, 0);
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 w-[95%] max-w-7xl rounded-full border ${isScrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-md py-3 border-slate-900/25'
          : 'bg-white/50 backdrop-blur-md py-4 border-slate-900/15'
          }`}
      >
        <div className="px-8 flex justify-between items-center">
          {/* Logo Area */}
          <a href="/" onClick={handleLogoClick} className="flex items-center gap-2 group">
            <Picture
              source={logo}
              alt="Alegrando Eventos"
              width={480}
              height={188}
              loading="eager"
              fetchPriority="high"
              sizes="122px"
              className="h-12 w-auto transition-all duration-300"
            />
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavigation(e, link.href)}
                className={`text-sm font-semibold uppercase tracking-wider transition-colors cursor-pointer ${isActive ? 'text-brand-orange' : 'text-slate-600 hover:text-brand-orange'}`}
              >
                {link.name}
              </a>
            )})}
            <a
              href="/aniversarios"
              onClick={handleAniversariosClick}
              className={`text-sm font-semibold uppercase tracking-wider transition-colors cursor-pointer ${location.pathname === '/aniversarios' ? 'text-brand-orange' : 'text-slate-600 hover:text-brand-orange'}`}
            >
              Aniversários
            </a>
            <a
              href="https://wa.me/5511916032904?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Alegrando%20e%20gostaria%20de%20conversar%20sobre%20um%20passeio%20para%20minha%20escola."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 rounded-full font-bold text-xs bg-brand-orange text-white hover:bg-orange-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 uppercase tracking-wider"
            >
              Fale Conosco
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-700 hover:text-brand-orange transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <m.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="md:hidden absolute top-[calc(100%+12px)] left-0 right-0 bg-white/95 backdrop-blur-xl shadow-2xl shadow-slate-900/10 rounded-3xl overflow-hidden border border-slate-100 z-40"
            >
              <div className="flex flex-col p-4 gap-2 items-center">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.href;
                  return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavigation(e, link.href)}
                    className={`font-semibold text-lg cursor-pointer w-full text-center py-3 rounded-xl transition-all ${isActive ? 'text-brand-orange bg-orange-50/50' : 'text-slate-700 hover:text-brand-orange hover:bg-slate-50'}`}
                  >
                    {link.name}
                  </a>
                )})}
                <a
                  href="/aniversarios"
                  onClick={handleAniversariosClick}
                  className={`font-semibold text-lg cursor-pointer w-full text-center py-3 rounded-xl transition-all mb-2 ${location.pathname === '/aniversarios' ? 'text-brand-orange bg-orange-50/50' : 'text-slate-700 hover:text-brand-orange hover:bg-slate-50'}`}
                >
                  Aniversários
                </a>
                <a
                  href="https://wa.me/5511916032904?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Alegrando%20e%20gostaria%20de%20conversar%20sobre%20um%20passeio%20para%20minha%20escola."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-brand-orange text-white text-center py-3 rounded-xl font-bold uppercase tracking-wider shadow-md active:bg-orange-600 transition-colors"
                >
                  Fale Conosco
                </a>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;