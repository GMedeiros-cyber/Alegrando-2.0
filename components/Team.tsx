import React from 'react';
import { m } from 'framer-motion';
import { Flame } from 'lucide-react';
import Picture from './Picture';
import equipe1 from '../assets/equipe.webp?w=480;800;1280&format=avif;webp&as=picture';
import equipe2 from '../assets/equipe2.webp?w=480;800;1280&format=avif;webp&as=picture';
import shopping1 from '../assets/shopping.webp?w=480;800;1280&format=avif;webp&as=picture';
import shopping2 from '../assets/shopping2.webp?w=480;800;1280&format=avif;webp&as=picture';
import shopping3 from '../assets/shopping3.webp?w=480;800;1280&format=avif;webp&as=picture';

// Bonfire component removed as requested
const Bonfire = () => null;

const Team: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Texture/Scribbles */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg className="absolute top-10 left-10 w-64 h-64 text-brand-orange/10" viewBox="0 0 200 200" fill="currentColor">
          <path d="M45.7,118.8c-7.3,30.3-26.6,56.4-5.9,80.6c20.7,24.2,64.3,16,92.5-4.6c28.2-20.6,35.6-61.9,18.8-88.7 C134.4,79.3,95.5,74.7,73,88.9C50.5,103.1,53,88.5,45.7,118.8z" />
        </svg>
        <svg className="absolute bottom-10 right-10 w-96 h-96 text-blue-200/20" viewBox="0 0 200 200" fill="currentColor">
          <circle cx="100" cy="100" r="80" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">

        {/* Header Text */}
        <div className="text-center mb-16 relative z-10">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-6 relative inline-block">
              Conheça nossa <span className="text-brand-orange font-expressive italic">Equipe</span>
              {/* Decorativo sublinhado "torto" */}
              <svg className="absolute w-full h-4 -bottom-2 left-0 text-brand-orange/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
              </svg>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
              Com uma equipe especializada, seguimos inovando e transformando cada excursão em uma aventura educativa memorável.
            </p>
          </m.div>
        </div>

        {/* Collage Grid - Restoration of Open Layout */}
        <div className="relative max-w-7xl mx-auto min-h-[900px] hidden md:block">

          {/* Bonfire removed */}

          {/* Equipe 1 */}
          <m.div
            className="absolute left-10 top-10 w-80 h-96 bg-white p-4 shadow-xl border-4 border-slate-50 rotate-[-3deg] z-20 hover:scale-105 transition-transform duration-500 hover:rotate-0 hover:z-50"
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -3 }}
            viewport={{ once: true }}
          >
            <div className="w-full h-full overflow-hidden bg-slate-200">
              <Picture source={equipe1} alt="Equipe Alegrando" width={738} height={748} sizes="320px" className="w-full h-full object-cover" />
            </div>
            {/* Tape Effect */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-28 h-8 bg-orange-200/80 rotate-2"></div>
          </m.div>

          {/* Equipe 2 */}
          <m.div
            className="absolute right-20 top-0 w-80 h-96 bg-white p-4 shadow-lg border-4 border-slate-50 rotate-[4deg] z-10 hover:scale-105 transition-transform duration-500 hover:rotate-0 hover:z-50"
            initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 4 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="w-full h-full overflow-hidden bg-slate-200">
              <Picture source={equipe2} alt="Equipe em ação" width={1080} height={1440} sizes="320px" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -top-4 right-10 w-24 h-8 bg-blue-200/80 -rotate-3"></div>
          </m.div>

          {/* Shopping 1 */}
          <m.div
            className="absolute left-[420px] top-64 w-80 h-96 bg-white p-4 shadow-lg border-4 border-slate-50 rotate-[2deg] z-15 hover:scale-105 transition-transform duration-500 hover:rotate-0 hover:z-50"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            viewport={{ once: true }}
          >
            <div className="w-full h-full overflow-hidden bg-slate-200">
              <Picture source={shopping1} alt="Passeio no Shopping" width={960} height={1280} sizes="320px" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -top-3 left-10 w-24 h-6 bg-green-200/80 rotate-1"></div>
          </m.div>

          {/* Shopping 2 */}
          <m.div
            className="absolute right-40 top-96 w-80 h-96 bg-white p-4 shadow-xl border-4 border-slate-50 rotate-[-6deg] z-30 hover:scale-105 transition-transform duration-500 hover:rotate-0 hover:z-50"
            initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -6 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="w-full h-full overflow-hidden bg-slate-200">
              <Picture source={shopping2} alt="Alegria e Diversão" width={960} height={1280} sizes="320px" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-yellow-300 rounded-full flex items-center justify-center shadow-lg transform rotate-12 z-20">
              <span className="font-bold text-sm text-slate-900 uppercase text-center transform -rotate-12">100%<br />Diversão</span>
            </div>
          </m.div>

          {/* Shopping 3 */}
          <m.div
            className="absolute left-10 bottom-10 w-80 h-96 bg-white p-4 shadow-lg border-4 border-slate-50 rotate-[-5deg] z-25 hover:scale-105 transition-transform duration-500 hover:rotate-0 hover:z-50"
            initial={{ opacity: 0, scale: 0.8, x: -50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.35 }}
            viewport={{ once: true }}
          >
            <div className="w-full h-full overflow-hidden bg-slate-200">
              <Picture source={shopping3} alt="Passeio Shopping" width={1200} height={1600} sizes="320px" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -top-3 right-8 w-28 h-6 bg-purple-200/80 -rotate-2"></div>
          </m.div>

        </div>

        {/* Mobile Layout (Stacked) */}
        <div className="md:hidden flex flex-col gap-10 pb-12 relative z-10">
          {/* Bonfire removed */}
          <m.div className="bg-white p-4 shadow-lg rotate-[-2deg]" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}>
            <Picture source={equipe1} alt="Equipe" width={738} height={748} sizes="100vw" className="w-full h-auto" />
          </m.div>
          <m.div className="bg-white p-4 shadow-lg rotate-[2deg]" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}>
            <Picture source={equipe2} alt="Equipe" width={1080} height={1440} sizes="100vw" className="w-full h-auto" />
          </m.div>
          <m.div className="bg-white p-4 shadow-lg rotate-[1deg]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
            <Picture source={shopping1} alt="Shopping" width={960} height={1280} sizes="100vw" className="w-full h-auto" />
          </m.div>
          <m.div className="bg-white p-4 shadow-lg rotate-[-1deg]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
            <Picture source={shopping2} alt="Shopping" width={960} height={1280} sizes="100vw" className="w-full h-auto" />
          </m.div>
          <m.div className="bg-white p-4 shadow-lg rotate-[1deg]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
            <Picture source={shopping3} alt="Shopping" width={1200} height={1600} sizes="100vw" className="w-full h-auto" />
          </m.div>
        </div>

      </div>
    </section>
  );
};

export default Team;