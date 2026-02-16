import React from 'react';
import { motion } from 'framer-motion';
import silvanaImage from '../assets/silvana.jpg';

const Founder: React.FC = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-16">

                    {/* Silvana Image (Left) */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="md:w-1/2 flex justify-center"
                    >
                        <div className="relative w-full max-w-sm mx-auto">
                            {/* Image Frame Effect (Orange Wrapper) */}
                            <div className="absolute -inset-4 rounded-[2rem] border border-brand-orange transform -rotate-2 scale-105 pointer-events-none z-0" />

                            <div className="relative rounded-[1.5rem] overflow-hidden shadow-2xl w-full aspect-[3/4] z-10 bg-slate-900">
                                <img
                                    src={silvanaImage}
                                    alt="Silvana Moura - Fundadora"
                                    className="w-full h-full object-cover opacity-90 grayscale hover:grayscale-0 transition-all duration-500"
                                />
                                {/* Floating Badge */}
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white px-6 py-2 rounded-full shadow-lg text-center min-w-[180px]">
                                    <p className="font-bold text-slate-900 text-base">Silvana Moura</p>
                                    <p className="text-[10px] text-brand-orange uppercase tracking-widest font-bold">Fundadora</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Founder Bio (Right) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="md:w-1/2 space-y-6"
                    >
                        {/* Title Realigned Here */}
                        <div className="mb-6">
                            <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 leading-tight">
                                Mais de 18 anos de paixão por <span className="text-brand-orange relative inline-block">
                                    transformar
                                    <svg className="absolute w-full h-3 -bottom-1 left-0 text-brand-orange opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                                    </svg>
                                </span> a educação.
                            </h2>
                            <p className="text-sm text-slate-500 mt-4 leading-relaxed">
                                A Alegrando nasceu do encantamento por proporcionar experiências inesquecíveis fora da sala de aula.
                                Nossa fundadora iniciou sua trajetória em 2007, e o comprometimento em despertar a confiança dos educadores nos levou a voos mais altos.
                            </p>
                        </div>

                        <h3 className="text-2xl md:text-3xl font-heading font-bold text-slate-900">
                            Uma virada de chave
                        </h3>

                        <div className="space-y-4 text-lg text-slate-600 leading-relaxed font-light">
                            <p>
                                Com mais de 15 anos de experiência na área de educação e turismo, Silvana fundou a Alegrando Eventos com o propósito de transformar viagens escolares em verdadeiras jornadas de aprendizado e alegria.
                            </p>
                            <div className="border-l-4 border-brand-orange pl-6 py-2 mt-6">
                                <p className="font-medium text-slate-800 italic text-xl">
                                    "Nossa missão é proporcionar experiências seguras, educativas e inesquecíveis, que contribuam para o desenvolvimento integral dos alunos."
                                </p>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Founder;
