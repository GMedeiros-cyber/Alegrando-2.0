import React from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import equipe1 from '../assets/equipe.jpg';
import equipe2 from '../assets/equipe2.jpg';
import shopping1 from '../assets/shopping.jpeg';
import shopping2 from '../assets/shopping2.jpg';
import shopping3 from '../assets/shopping3.jpg';

const Bonfire = ({ scale = 1, delay = 0 }: { scale?: number, delay?: number }) => (
  <div className="relative w-32 h-32 flex items-end justify-center" style={{ transform: `scale(${scale})` }}>
    {/* Logs - SVG */}
    <svg className="absolute bottom-0 w-24 h-12 text-amber-800 z-10" viewBox="0 0 100 50" fill="currentColor">
      {/* Log 1 (Left tilt) */}
      <rect x="10" y="10" width="80" height="12" rx="6" transform="rotate(15 50 25)" />
      {/* Log 2 (Right tilt) */}
      <rect x="10" y="10" width="80" height="12" rx="6" transform="rotate(-15 50 25)" />
      {/* Log 3 (Base) */}
      <rect x="10" y="25" width="80" height="12" rx="6" />
    </svg>

    {/* Fire Animation - Using Lucide Flames */}
    <motion.div
      className="absolute bottom-6 z-20 text-orange-500"
      animate={{ scale: [1, 1.1, 1], y: [0, -5, 0] }}
      transition={{ duration: 0.8, repeat: Infinity, delay: delay }}
    >
      <Flame size={64} fill="currentColor" strokeWidth={0} />
    </motion.div>
    <motion.div
      className="absolute bottom-6 left-6 z-20 text-orange-400 opacity-80"
      animate={{ scale: [0.8, 1, 0.8], y: [0, -8, 0], x: [0, -2, 0] }}
      transition={{ duration: 0.9, repeat: Infinity, delay: delay + 0.1 }}
    >
      <Flame size={48} fill="currentColor" strokeWidth={0} />
    </motion.div>
    <motion.div
      className="absolute bottom-6 right-6 z-20 text-red-500 opacity-80"
      animate={{ scale: [0.9, 1.1, 0.9], y: [0, -6, 0], x: [0, 2, 0] }}
      transition={{ duration: 0.7, repeat: Infinity, delay: delay + 0.2 }}
    >
      <Flame size={48} fill="currentColor" strokeWidth={0} />
    </motion.div>

    {/* Glow */}
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-20 bg-orange-500/40 blur-[40px] rounded-full z-0" />
  </div>
);

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-6 relative inline-block">
              Nossa <span className="text-brand-orange">Equipe</span>
              {/* Decorativo sublinhado "torto" */}
              <svg className="absolute w-full h-4 -bottom-2 left-0 text-brand-orange/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
              </svg>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
              Com uma equipe especializada, seguimos inovando e transformando cada excursão em uma aventura educativa memorável.
            </p>
          </motion.div>
        </div>

        {/* Collage Grid - Restoration of Open Layout */}
        <div className="relative max-w-7xl mx-auto min-h-[900px] hidden md:block">

          {/* Bonfire 1 - Left Side */}
          <div className="absolute top-48 left-20 z-10 pointer-events-none">
            <Bonfire scale={0.9} delay={0} />
          </div>

          {/* Bonfire 2 - Right Side (Background) */}
          <div className="absolute bottom-32 right-32 z-0 pointer-events-none opacity-90">
            <Bonfire scale={1.2} delay={0.5} />
          </div>

          {/* Equipe 1 */}
          <motion.div
            className="absolute left-10 top-10 w-80 h-96 bg-white p-4 shadow-xl border-4 border-slate-50 rotate-[-3deg] z-20 hover:scale-105 transition-transform duration-500 hover:rotate-0 hover:z-50"
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -3 }}
            viewport={{ once: true }}
          >
            <div className="w-full h-full overflow-hidden bg-slate-200">
              <img src={equipe1} alt="Equipe Alegrando" className="w-full h-full object-cover" />
            </div>
            {/* Tape Effect */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-28 h-8 bg-orange-200/80 rotate-2"></div>
          </motion.div>

          {/* Equipe 2 */}
          <motion.div
            className="absolute right-20 top-0 w-80 h-96 bg-white p-4 shadow-lg border-4 border-slate-50 rotate-[4deg] z-10 hover:scale-105 transition-transform duration-500 hover:rotate-0 hover:z-50"
            initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 4 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="w-full h-full overflow-hidden bg-slate-200">
              <img src={equipe2} alt="Equipe em ação" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -top-4 right-10 w-24 h-8 bg-blue-200/80 -rotate-3"></div>
          </motion.div>

          {/* Shopping 1 */}
          <motion.div
            className="absolute left-[420px] top-64 w-80 h-96 bg-white p-4 shadow-lg border-4 border-slate-50 rotate-[2deg] z-15 hover:scale-105 transition-transform duration-500 hover:rotate-0 hover:z-50"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            viewport={{ once: true }}
          >
            <div className="w-full h-full overflow-hidden bg-slate-200">
              <img src={shopping1} alt="Passeio no Shopping" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -top-3 left-10 w-24 h-6 bg-green-200/80 rotate-1"></div>
          </motion.div>

          {/* Shopping 2 */}
          <motion.div
            className="absolute right-40 top-96 w-80 h-96 bg-white p-4 shadow-xl border-4 border-slate-50 rotate-[-6deg] z-30 hover:scale-105 transition-transform duration-500 hover:rotate-0 hover:z-50"
            initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -6 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="w-full h-full overflow-hidden bg-slate-200">
              <img src={shopping2} alt="Alegria e Diversão" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-yellow-300 rounded-full flex items-center justify-center shadow-lg transform rotate-12 z-20">
              <span className="font-bold text-sm text-slate-900 uppercase text-center transform -rotate-12">100%<br />Diversão</span>
            </div>
          </motion.div>

          {/* Shopping 3 */}
          <motion.div
            className="absolute left-10 bottom-10 w-80 h-96 bg-white p-4 shadow-lg border-4 border-slate-50 rotate-[-5deg] z-25 hover:scale-105 transition-transform duration-500 hover:rotate-0 hover:z-50"
            initial={{ opacity: 0, scale: 0.8, x: -50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.35 }}
            viewport={{ once: true }}
          >
            <div className="w-full h-full overflow-hidden bg-slate-200">
              <img src={shopping3} alt="Passeio Shopping" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -top-3 right-8 w-28 h-6 bg-purple-200/80 -rotate-2"></div>
          </motion.div>

        </div>

        {/* Mobile Layout (Stacked) */}
        <div className="md:hidden flex flex-col gap-10 pb-12 relative z-10">
          <div className="flex justify-center mb-4">
            <Bonfire scale={1.2} />
          </div>
          <div className="flex justify-center mb-4">
            <Bonfire scale={1.2} delay={0.5} />
          </div>
          <motion.div className="bg-white p-4 shadow-lg rotate-[-2deg]" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}>
            <img src={equipe1} alt="Equipe" className="w-full h-80 object-cover" />
          </motion.div>
          <motion.div className="bg-white p-4 shadow-lg rotate-[2deg]" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}>
            <img src={equipe2} alt="Equipe" className="w-full h-80 object-cover" />
          </motion.div>
          <motion.div className="bg-white p-4 shadow-lg rotate-[1deg]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
            <img src={shopping1} alt="Shopping" className="w-full h-80 object-cover" />
          </motion.div>
          <motion.div className="bg-white p-4 shadow-lg rotate-[-1deg]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
            <img src={shopping2} alt="Shopping" className="w-full h-80 object-cover" />
          </motion.div>
          <motion.div className="bg-white p-4 shadow-lg rotate-[1deg]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
            <img src={shopping3} alt="Shopping" className="w-full h-80 object-cover" />
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Team;