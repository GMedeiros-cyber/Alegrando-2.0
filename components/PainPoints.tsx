import React from 'react';
import { motion } from 'framer-motion';

// Componente para o Card de Dor
interface PainPointCardProps {
    text: React.ReactNode;
    position: 'left-top' | 'left-bottom' | 'right-top' | 'right-middle' | 'right-bottom';
    delay?: number;
}

const PainPointCard: React.FC<PainPointCardProps> = ({ text, position, delay = 0 }) => {
    const isLeft = position.startsWith('left');

    // Configuração das setas baseado na posição
    const getArrow = () => {
        switch (position) {
            case 'left-top':
                // Seta saindo da direita do card, curvando para baixo em direção à imagem
                return (
                    <svg className="hidden lg:block absolute -right-[80%] top-1/2 w-[80%] h-32 text-brand-orange z-[-1] pointer-events-none transform -translate-y-1/2" viewBox="0 0 100 50" fill="none" preserveAspectRatio="none">
                        <motion.path d="M0 25 C 50 25, 50 60, 100 60" stroke="currentColor" strokeWidth="2" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1, delay: delay + 0.2 }} />
                    </svg>
                );
            case 'left-bottom':
                // Seta saindo da direita, curvando para cima
                return (
                    <svg className="hidden lg:block absolute -right-[80%] top-1/2 w-[80%] h-32 text-brand-orange z-[-1] pointer-events-none transform -translate-y-[60%]" viewBox="0 0 100 50" fill="none" preserveAspectRatio="none">
                        <motion.path d="M0 40 C 50 40, 50 0, 100 0" stroke="currentColor" strokeWidth="2" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1, delay: delay + 0.2 }} />
                    </svg>
                );
            case 'right-top':
                // Seta saindo da esquerda, curvando para baixo (indo para trás da imagem)
                return (
                    <svg className="hidden lg:block absolute -left-[80%] top-1/2 w-[80%] h-32 text-brand-orange z-[-1] pointer-events-none transform -translate-y-1/2" viewBox="0 0 100 50" fill="none" preserveAspectRatio="none">
                        <motion.path d="M100 25 C 50 25, 50 60, 0 60" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1, delay: delay + 0.2 }} />
                    </svg>
                );
            case 'right-middle':
                // Seta reta
                return (
                    <svg className="hidden lg:block absolute -left-[60%] top-1/2 w-[60%] h-4 text-brand-orange z-[-1] pointer-events-none transform -translate-y-1/2" viewBox="0 0 100 10" fill="none" preserveAspectRatio="none">
                        <motion.path d="M100 5 L 0 5" stroke="currentColor" strokeWidth="2" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1, delay: delay + 0.2 }} />
                    </svg>
                );
            case 'right-bottom':
                // Seta saindo da esquerda, curvando para cima
                return (
                    <svg className="hidden lg:block absolute -left-[80%] top-1/2 w-[80%] h-32 text-brand-orange z-[-1] pointer-events-none transform -translate-y-[60%]" viewBox="0 0 100 50" fill="none" preserveAspectRatio="none">
                        <motion.path d="M100 40 C 50 40, 50 0, 0 0" stroke="currentColor" strokeWidth="2" strokeDasharray="7,7" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1, delay: delay + 0.2 }} />
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
            className={`relative group w-full max-w-[20rem] ${isLeft ? 'text-right' : 'text-left'}`}
        >
            {/* O SVG fica 'ancorado' no card, mas com position absolute para sair dele */}
            {getArrow()}

            <div className={`bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-slate-100 relative hover:-translate-y-1 transition-transform z-10 flex items-center ${isLeft ? 'justify-end' : 'justify-start'}`}>
                {/* Micro-detalhe de conexão visual no card */}
                {isLeft && <div className="absolute -right-3 top-1/2 w-6 h-6 bg-white transform -translate-y-1/2 rotate-45 border-r border-t border-slate-100 hidden md:block"></div>}
                {!isLeft && <div className="absolute -left-3 top-1/2 w-6 h-6 bg-white transform -translate-y-1/2 rotate-45 border-l border-b border-slate-100 hidden md:block"></div>}

                <div className="text-slate-700 font-medium text-lg leading-relaxed">
                    {text}
                </div>
            </div>
        </motion.div>
    );
};

const PainPoints: React.FC = () => {
    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="text-center max-w-4xl mx-auto mb-16 md:mb-24">
                    <motion.h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 leading-tight">
                        Entendemos as <span className="text-brand-orange relative inline-block mx-2">
                            dores
                            <svg className="absolute -top-6 -right-8 w-12 h-12 text-brand-orange opacity-80" viewBox="0 0 50 50" fill="none">
                                <motion.path d="M25 0L28 20L48 22L28 28L30 48L22 30L0 28L20 25L25 0Z" fill="currentColor" initial={{ scale: 0 }} whileInView={{ scale: 1 }} />
                            </svg>
                        </span> de professores e coordenadores!
                    </motion.h2>
                </div>

                {/* Layout Grid Robusto */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[600px]">

                    {/* Coluna Esquerda (2 Items) */}
                    <div className="lg:col-span-3 flex flex-col gap-12 lg:gap-32 justify-center items-center lg:items-end order-2 lg:order-1 relative z-10">
                        <PainPointCard
                            position="left-top"
                            delay={0.1}
                            text={<>Preocupações com a <span className="font-bold text-brand-orange">segurança dos alunos</span> fora da escola.</>}
                        />
                        <PainPointCard
                            position="left-bottom"
                            delay={0.3}
                            text={<><span className="font-bold text-brand-orange">Não ter tempo</span> para organizar excursões e atividades.</>}
                        />
                    </div>

                    {/* Coluna Central (Imagem) */}
                    <div className="lg:col-span-6 flex justify-center order-1 lg:order-2 relative z-20">
                        <div className="relative w-full max-w-2xl aspect-video">
                            <img
                                src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop"
                                alt="Professora"
                                className="w-full h-full object-cover rounded-3xl shadow-2xl border-4 border-white relative z-20"
                            />
                            <div className="absolute -inset-3 border-4 border-brand-orange/30 rounded-[2rem] transform rotate-1 z-0 pointer-events-none"></div>
                        </div>
                    </div>

                    {/* Coluna Direita (3 Items) */}
                    <div className="lg:col-span-3 flex flex-col gap-12 justify-center items-center lg:items-start order-3 relative z-0">
                        <PainPointCard
                            position="right-top"
                            delay={0.2}
                            text={<>Sentem falta de complemento educativo com a <span className="font-bold text-brand-orange">teoria em sala.</span></>}
                        />
                        <PainPointCard
                            position="right-middle"
                            delay={0.4}
                            text={<>Possuem grande desafio em <span className="font-bold text-brand-orange">engajar</span> os alunos.</>}
                        />
                        <PainPointCard
                            position="right-bottom"
                            delay={0.6}
                            text={<>Necessitam de uma didática inovadora com foco em <span className="font-bold text-brand-orange">retenção.</span></>}
                        />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default PainPoints;
