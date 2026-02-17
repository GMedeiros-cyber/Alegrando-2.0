import React from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

const JadeCTA: React.FC = () => {
    return (
        <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center text-center"
                >
                    <div className="w-24 h-24 bg-white rounded-full p-1 shadow-md mb-6 relative">
                        <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
                            {/* Placeholder for Jade Avatar */}
                            <img
                                src={logo}
                                alt="Jade IA"
                                className="w-full h-full object-contain p-2"
                            />
                        </div>
                        <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-4 border-white rounded-full"></div>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
                        Não encontrou o passeio ideal?
                    </h2>
                    <p className="text-slate-600 text-lg mb-8 max-w-lg mx-auto leading-relaxed">
                        Temos muitos outros destinos além dos listados aqui. Converse com a <span className="text-brand-orange font-expressive italic">Jade</span>, nossa inteligência artificial, e descubra o roteiro perfeito para sua escola.
                    </p>

                    <button
                        onClick={() => window.openJadeWidget("Olá Jade! Não encontrei o passeio ideal no site. Vocês possuem outros destinos para minha escola?")}
                        className="bg-brand-orange hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-full shadow-lg shadow-orange-500/30 transition-all hover:scale-105 flex items-center gap-3 group relative z-50 pointer-events-auto cursor-pointer"
                    >
                        <span>Conversar com Jade</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default JadeCTA;
