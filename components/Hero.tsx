import React from 'react';
import { motion } from 'framer-motion';
import ursinhoVideo from '../assets/ursinho.mp4';

const Hero: React.FC = () => {
  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={ursinhoVideo} type="video/mp4" />
        </video>

        {/* Overlay gradient for readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center text-white mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight mb-6 drop-shadow-lg">
            Momentos que <span className="text-brand-orange">educam</span>,<br />
            divertem e encantam.
          </h1>

          <p className="text-lg md:text-2xl font-light text-gray-100 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            Transformamos conteúdo escolar em experiências vivenciais seguras, divertidas e inesquecíveis.
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <a
              href="#destinos"
              className="inline-block bg-brand-orange hover:bg-orange-600 text-white font-bold text-lg px-8 py-4 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(255,107,53,0.5)] hover:shadow-[0_0_30px_rgba(255,107,53,0.7)] transform hover:-translate-y-1"
            >
              Descubra a Experiência Alegrando
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-1 bg-white rounded-full mb-1"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;