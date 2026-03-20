import React, { useRef, useState, useCallback } from 'react';
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
            className={`relative group w-full max-w-[22rem] text-left ${isLeft ? 'lg:text-right' : 'lg:text-left'}`}
        >
            {/* O SVG fica 'ancorado' no card, mas com position absolute para sair dele */}
            {getArrow()}

            <div className={`bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-100 relative hover:-translate-y-1 transition-transform z-10 flex flex-col justify-center min-h-[140px] border-l-[6px] border-l-brand-orange lg:border-l-slate-100`}>

                {/* Desktop Decoration */}
                {isLeft && <div className="absolute -right-3 top-1/2 w-6 h-6 bg-white transform -translate-y-1/2 rotate-45 border-r border-t border-slate-100 hidden lg:block"></div>}
                {!isLeft && <div className="absolute -left-3 top-1/2 w-6 h-6 bg-white transform -translate-y-1/2 rotate-45 border-l border-b border-slate-100 hidden lg:block"></div>}

                <div className="text-slate-700 font-medium text-lg leading-snug w-full">
                    {text}
                </div>
            </div>
        </motion.div>
    );
};

const painPoints = [
    <>Preocupações com a <span className="font-bold text-brand-orange">segurança dos alunos</span> fora da escola.</>,
    <><span className="font-bold text-brand-orange">Não ter tempo</span> para organizar excursões e atividades.</>,
    <>Sentem falta de complemento educativo com a <span className="font-bold text-brand-orange">teoria em sala.</span></>,
    <>Possuem grande desafio em <span className="font-bold text-brand-orange">engajar</span> os alunos.</>,
    <>Necessitam de uma didática inovadora com foco em <span className="font-bold text-brand-orange">retenção.</span></>,
];

const PAIN_IMAGE = "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop";

const PainPoints: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = useCallback(() => {
        const el = scrollRef.current;
        if (!el) return;
        const scrollLeft = el.scrollLeft;
        const cardWidth = el.scrollWidth / painPoints.length;
        const index = Math.round(scrollLeft / cardWidth);
        setActiveIndex(Math.min(index, painPoints.length - 1));
    }, []);

    const scrollTo = useCallback((index: number) => {
        const el = scrollRef.current;
        if (!el) return;
        const cardWidth = el.scrollWidth / painPoints.length;
        el.scrollTo({ left: cardWidth * index, behavior: 'smooth' });
    }, []);

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10 max-w-7xl">

                {/* Header */}
                <div className="text-center max-w-4xl mx-auto mb-16 md:mb-24">
                    <motion.h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 leading-tight">
                        Entendemos as <span className="text-brand-orange relative inline-block mx-2">
                            <span className="font-expressive italic">dores</span>
                            <svg className="absolute -top-6 -right-8 w-12 h-12 text-brand-orange opacity-80" viewBox="0 0 50 50" fill="none">
                                <motion.path d="M25 0L28 20L48 22L28 28L30 48L22 30L0 28L20 25L25 0Z" fill="currentColor" initial={{ scale: 0 }} whileInView={{ scale: 1 }} />
                            </svg>
                        </span> de professores e coordenadores!
                    </motion.h2>
                </div>

                {/* Desktop Layout (lg+) — unchanged */}
                <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-center lg:min-h-[600px]">

                    {/* Coluna Esquerda (2 Items) */}
                    <div className="lg:col-span-3 flex flex-col gap-6 md:gap-12 lg:gap-32 justify-center items-center lg:items-end order-2 lg:order-1 relative z-10 w-full">
                        <PainPointCard
                            position="left-top"
                            delay={0.1}
                            text={painPoints[0]}
                        />
                        <PainPointCard
                            position="left-bottom"
                            delay={0.3}
                            text={painPoints[1]}
                        />
                    </div>

                    {/* Coluna Central (Imagem) */}
                    <div className="lg:col-span-6 flex justify-center order-1 lg:order-2 relative z-20">
                        <div className="relative w-full max-w-2xl aspect-video">
                            <img
                                src={PAIN_IMAGE}
                                alt="Professora"
                                className="w-full h-full object-cover rounded-3xl shadow-2xl border-4 border-white relative z-20"
                            />
                            <div className="absolute -inset-3 border-4 border-brand-orange/30 rounded-[2rem] transform rotate-1 z-0 pointer-events-none"></div>
                        </div>
                    </div>

                    {/* Coluna Direita (3 Items) */}
                    <div className="lg:col-span-3 flex flex-col gap-6 md:gap-12 justify-center items-center lg:items-start order-3 relative z-0 w-full">
                        <PainPointCard
                            position="right-top"
                            delay={0.2}
                            text={painPoints[2]}
                        />
                        <PainPointCard
                            position="right-middle"
                            delay={0.4}
                            text={painPoints[3]}
                        />
                        <PainPointCard
                            position="right-bottom"
                            delay={0.6}
                            text={painPoints[4]}
                        />
                    </div>

                </div>

                {/* Mobile Layout (below lg) — carousel */}
                <div className="lg:hidden">
                    {/* Compact Image */}
                    <div className="h-48 rounded-2xl overflow-hidden mb-8">
                        <img
                            src={PAIN_IMAGE}
                            alt="Professora"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Carousel */}
                    <div
                        ref={scrollRef}
                        onScroll={handleScroll}
                        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide"
                        style={{ WebkitOverflowScrolling: 'touch' }}
                    >
                        {painPoints.map((text, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="snap-center shrink-0 w-[85vw] max-w-[320px]"
                            >
                                <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-100 border-l-[6px] border-l-brand-orange min-h-[140px] flex flex-col justify-center">
                                    <div className="text-slate-700 font-medium text-lg leading-snug">
                                        {text}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Dot Indicators */}
                    <div className="flex justify-center gap-2 mt-4">
                        {painPoints.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => scrollTo(i)}
                                className={`rounded-full transition-all duration-300 ${
                                    activeIndex === i
                                        ? 'w-6 h-2 bg-brand-orange'
                                        : 'w-2 h-2 bg-slate-300'
                                }`}
                                aria-label={`Ir para card ${i + 1}`}
                            />
                        ))}
                    </div>

                    {/* Swipe Hint */}
                    <p className="text-center text-sm text-slate-400 mt-3">
                        Deslize para ver mais →
                    </p>
                </div>

            </div>
        </section>
    );
};

export default PainPoints;
