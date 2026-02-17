import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation, Link } from 'react-router-dom';

import logo from '../assets/alegrando.png';

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
    { name: 'Sobre', href: '/#sobre' },
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
      }
    } else {
      navigate(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 w-[95%] max-w-7xl rounded-full border border-white/20 ${isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-lg py-3'
          : 'bg-white/70 backdrop-blur-sm py-4'
          }`}
      >
        <div className="px-8 flex justify-between items-center">
          {/* Logo Area */}
          <a href="/" onClick={handleLogoClick} className="flex items-center gap-2 group">
            <img
              src={logo}
              alt="Alegrando Eventos"
              className="h-12 w-auto transition-all duration-300"
            />
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavigation(e, link.href)}
                className="text-sm font-semibold uppercase tracking-wider text-slate-600 hover:text-brand-orange transition-colors cursor-pointer"
              >
                {link.name}
              </a>
            ))}
            <Link to="/aniversarios" className="text-sm font-semibold uppercase tracking-wider text-slate-600 hover:text-brand-orange transition-colors cursor-pointer">
              Aniversários
            </Link>
            <a
              href="/#contato"
              onClick={(e) => handleNavigation(e, '/#contato')}
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
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-xl shadow-lg overflow-hidden border-t fixed top-[72px] left-0 right-0 z-40"
          >
            <div className="flex flex-col p-6 gap-6 items-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavigation(e, link.href)}
                  className="text-slate-700 font-semibold text-lg hover:text-brand-orange cursor-pointer w-full text-center py-2 border-b border-slate-100 last:border-0"
                >
                  {link.name}
                </a>
              ))}
              <Link to="/aniversarios" className="text-slate-700 font-semibold text-lg hover:text-brand-orange cursor-pointer w-full text-center py-2 border-b border-slate-100 last:border-0" onClick={() => setIsMobileMenuOpen(false)}>
                Aniversários
              </Link>
              <a
                href="/#contato"
                onClick={(e) => handleNavigation(e, '/#contato')}
                className="w-full bg-brand-orange text-white text-center py-3 rounded-xl font-bold uppercase tracking-wider shadow-md"
              >
                Fale Conosco
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;