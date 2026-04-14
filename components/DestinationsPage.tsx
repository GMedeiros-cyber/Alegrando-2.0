import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
    MessageCircle,
    Landmark, Bus, Leaf, Tent, GraduationCap, Drama,
    FerrisWheel, Cpu, Rocket, Star
} from 'lucide-react';
import DestinationCard from './DestinationCard';
import jadeLogoUrl from '../assets/logo.png';

// Import assets
import historiaImg from '../assets/historia.jpeg';
import fazendaImg from '../assets/fazenda.jpeg';
import agriculturaImg from '../assets/agricultura.jpeg';
import museuImg from '../assets/museu.jpg';
import autenticoImg from '../assets/autentico.png';
import viniciusImg from '../assets/vinicius.png';
import externatoImg from '../assets/externato.png';

import escaladaImg from '../assets/escalada.jpg';
import neogeoImg from '../assets/neogeo.jpg';
import playgroundImg from '../assets/playground.jpg';
import aquaticoImg from '../assets/aquatico.jpeg';

import onibusImg from '../assets/onibus.jpeg';
import camisaImg from '../assets/camisa.jpeg';

// Reusing existing images 
const teatroImg = historiaImg;
const naturezaImg = fazendaImg;

const destinationsData = [
    {
        title: "História e cultura",
        whatsappMessage: "Olá! Gostaria de solicitar orçamento para passeios de História e Cultura para minha escola.",
        subtitle: "Os mais buscados em:",
        images: [historiaImg, fazendaImg, agriculturaImg, museuImg],
        categories: [
            {
                title: "Aldeias:",
                items: [
                    "Sítio do Sol (Cabreúva)",
                    "Aldeia Nakana (Morumgaba)",
                    "Abaeté (Mairiporã)",
                    "Toca da Raposa (Juquitiba)"
                ]
            },
            {
                title: "Acampamentos:",
                items: [
                    "Águias da Serra",
                    "Aruanã",
                    "Via dos Leões",
                    "Peraltas"
                ]
            },
            {
                title: "Museus:",
                items: [
                    "Museu do Futebol",
                    "Museu da Língua Portuguesa",
                    "Museu do Ipiranga",
                    "Museu Catavento"
                ]
            }
        ]
    },
    {
        title: "Temáticos",
        whatsappMessage: "Olá! Gostaria de solicitar orçamento para passeios Temáticos e parques para minha escola.",
        subtitle: "Os mais buscados em:",
        images: [escaladaImg, neogeoImg, playgroundImg, aquaticoImg],
        categories: [
            {
                title: "Parques de Diversão:",
                items: [
                    "Hopi Hari",
                    "Wet'n Wild",
                    "Parque da Mônica",
                    "Playcenter Family"
                ]
            },
            {
                title: "Educação e Natureza:",
                items: [
                    "Cidade do Livro",
                    "Cidade das Abelhas",
                    "Aquário de SP",
                    "Animália"
                ]
            },
            {
                title: "Lazer e Jogos:",
                items: [
                    "Salas Escape 60",
                    "Boliche Villa Bowling",
                    "Parque Neo Geo Family",
                    "Cidade da Criança"
                ]
            }
        ]
    },
    {
        title: "Teatros e Natureza",
        whatsappMessage: "Olá! Gostaria de solicitar orçamento para passeios de Teatros e Natureza para minha escola.",
        subtitle: "Cultura e Ar Livre:",
        images: [teatroImg, naturezaImg],
        categories: [
            {
                title: "Teatros:",
                items: [
                    "Teatro Infantil",
                    "Teatro Juvenil",
                    "Teatro Musical",
                    "Teatro de Bonecos"
                ]
            },
            {
                title: "Fauna e Flora:",
                items: [
                    "Zoo de São Paulo",
                    "Zooparque de Itatiba",
                    "Jardim Botânico",
                    "BioParque Macuco"
                ]
            },
            {
                title: "Day Camps:",
                items: [
                    "Bicho Mania",
                    "Cia dos Bichos",
                    "Estância Solazer",
                    "Fazenda do Chocolate"
                ]
            }
        ]
    }
];

const categoriesNav = [
    { icon: <Landmark size={24} />, label: "Museus" },
    { icon: <Bus size={24} />, label: "City Tour" },
    { icon: <Leaf size={24} />, label: "Zoológicos" },
    { icon: <Tent size={24} />, label: "Day Camps" },
    { icon: <GraduationCap size={24} />, label: "Estudos" },
    { icon: <Drama size={24} />, label: "Teatros" },
    { icon: <FerrisWheel size={24} />, label: "Parques" },
    { icon: <Tent size={24} />, label: "Acampamentos" },
    { icon: <Cpu size={24} />, label: "Tecnologia" },
];

const DestinationsPage: React.FC = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [activeSlide, setActiveSlide] = useState(0);
    const totalSlides = destinationsData.length;

    const scrollToSlide = useCallback((index: number) => {
        const container = scrollContainerRef.current;
        if (!container) return;
        const children = container.children;
        if (children[index]) {
            children[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }, []);

    const handleNext = useCallback(() => {
        const next = Math.min(activeSlide + 1, totalSlides - 1);
        setActiveSlide(next);
        scrollToSlide(next);
    }, [activeSlide, totalSlides, scrollToSlide]);

    const handlePrev = useCallback(() => {
        const prev = Math.max(activeSlide - 1, 0);
        setActiveSlide(prev);
        scrollToSlide(prev);
    }, [activeSlide, scrollToSlide]);

    // Track scroll position to update active dot
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;
        const onScroll = () => {
            const scrollLeft = container.scrollLeft;
            const scrollWidth = container.scrollWidth - container.clientWidth;
            if (scrollWidth <= 0) return;
            const progress = scrollLeft / scrollWidth;
            const idx = Math.round(progress * (totalSlides - 1));
            setActiveSlide(idx);
        };
        container.addEventListener('scroll', onScroll, { passive: true });
        return () => container.removeEventListener('scroll', onScroll);
    }, [totalSlides]);

    return (
        <div id="destinos" className="bg-slate-50 min-h-screen">
            {/* ═══════════════════════════════════════════════════════════
                SEÇÃO 1 — HERO: DESTINOS INESQUECÍVEIS
            ═══════════════════════════════════════════════════════════ */}
            <div className="pt-40 pb-12 container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto"
                >
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="h-[1px] w-12 bg-orange-300"></span>
                        <span className="text-orange-500 font-bold tracking-widest uppercase text-xs">Nossos Roteiros</span>
                        <span className="h-[1px] w-12 bg-orange-300"></span>
                    </div>
                    <div className="mb-6 z-10">
                        <h1 className="text-3xl md:text-5xl font-heading font-bold text-slate-800 relative inline-block">
                            Destinos <span className="text-brand-orange font-expressive italic font-medium">Inesquecíveis</span>
                            {/* Decorativo sublinhado "torto" */}
                            <svg className="absolute w-full h-4 -bottom-2 left-0 text-brand-orange/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                            </svg>
                        </h1>
                    </div>
                    <p className="text-slate-500 text-lg md:text-xl font-light leading-relaxed">
                        Explore nossa seleção de roteiros pedagógicos e de lazer, projetados para encantar e educar.
                    </p>
                </motion.div>
            </div>

            {/* ═══════════════════════════════════════════════════════════
                SEÇÃO 2 — CAROUSEL DE DESTINOS
            ═══════════════════════════════════════════════════════════ */}
            <div className="relative w-full pb-6">
                {/* Carousel Container — scrollbar escondida */}
                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory gap-8 px-6 md:px-12 items-stretch
                    [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                    style={{ scrollBehavior: 'smooth' }}
                >
                    {destinationsData.map((dest, index) => (
                        <div
                            key={index}
                            className="snap-center shrink-0 w-[90vw] md:w-[85vw] lg:w-[1200px] first:ml-auto last:mr-auto h-auto flex"
                        >
                            <DestinationCard
                                title={dest.title}
                                subtitle={dest.subtitle}
                                images={dest.images}
                                categories={dest.categories}
                                reverse={false}
                                whatsappMessage={dest.whatsappMessage}
                            />
                        </div>
                    ))}
                </div>


                {/* Indicadores de Progresso */}
                <div className="flex items-center justify-center gap-3 mt-8">
                    {destinationsData.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => { setActiveSlide(idx); scrollToSlide(idx); }}
                            className={`rounded-full transition-all duration-500 cursor-pointer ${idx === activeSlide
                                    ? 'w-14 h-4 bg-brand-orange shadow-md shadow-orange-200'
                                    : 'w-4 h-4 bg-slate-300 hover:bg-slate-400'
                                }`}
                            aria-label={`Ir para destino ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════
                SEÇÃO 3 — ÍCONES DE CATEGORIAS
            ═══════════════════════════════════════════════════════════ */}
            <div className="container mx-auto px-6 pt-16 pb-12 overflow-hidden">
                <div className="flex overflow-x-auto gap-6 md:gap-8 pt-2 pb-6 justify-start md:justify-center hide-scrollbar px-4">
                    {categoriesNav.map((cat, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ scale: 1.05 }}
                            className="flex flex-col items-center gap-3 min-w-[100px] cursor-pointer group"
                        >
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-transparent rounded-full flex items-center justify-center text-slate-400 border border-slate-200 group-hover:border-brand-orange group-hover:text-brand-orange group-hover:bg-orange-50/50 transition-all duration-300">
                                {cat.icon}
                            </div>
                            <span className="text-sm md:text-base font-medium text-slate-500 group-hover:text-slate-800 transition-colors whitespace-nowrap">
                                {cat.label}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════
                SEÇÃO 4 — JORNADA 360° + SILVANA (Por que nos escolher)
            ═══════════════════════════════════════════════════════════ */}
            <section className="w-full bg-gradient-to-br from-orange-50/60 to-slate-50 py-24 relative overflow-hidden">
                {/* Decoração sutil de fundo */}
                <div className="absolute -bottom-20 -left-20 w-[30rem] h-[30rem] bg-brand-orange/5 blur-[100px] rounded-full pointer-events-none"></div>

                <div className="container mx-auto px-6 max-w-6xl relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

                        {/* LEFT: Silvana — a pessoa por trás */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="flex flex-col items-center lg:items-start gap-6"
                        >
                            <div className="inline-flex items-center gap-3 bg-slate-900 px-5 py-2.5 rounded-full border border-slate-700 shadow-lg">
                                <Rocket size={16} className="text-brand-orange" />
                                <span className="text-xs font-bold tracking-widest uppercase text-slate-300">Metodologia Exclusiva</span>
                            </div>

                            <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 w-full max-w-sm">
                                <div className="flex flex-col items-center text-center gap-4">
                                    <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-br from-brand-orange to-orange-600 shadow-xl overflow-hidden">
                                        <img src={camisaImg} alt="Silvana Moura" className="w-full h-full object-cover object-top rounded-full" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-slate-900">Silvana Moura</p>
                                        <p className="text-brand-orange font-expressive italic text-lg font-medium tracking-wide">Fundadora</p>
                                        <p className="text-slate-400 text-sm mt-2">+ de 15 anos transformando passeios escolares em experiências inesquecíveis</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* RIGHT: Jornada 360 — conteúdo */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.15 }}
                            className="flex flex-col items-start"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-slate-900">
                                Jornada <span className="text-brand-orange font-expressive italic">360°</span>
                            </h2>

                            <blockquote className="text-lg md:text-xl font-serif italic leading-relaxed text-slate-500 border-l-4 border-brand-orange pl-6 mb-8">
                                "A proposta é entregar um produto <span className="text-slate-800 font-medium">planejado e completo</span>, que vai muito além do passeio. Cuidamos de cada detalhe, do início ao fim."
                            </blockquote>

                            <p className="text-slate-600 leading-relaxed mb-8">
                                Cada excursão passa por um processo completo que garante <strong className="text-slate-800">segurança</strong>, <strong className="text-slate-800">qualidade pedagógica</strong> e <strong className="text-slate-800">tranquilidade</strong> para escolas e famílias.
                            </p>

                            <div className="flex flex-wrap gap-3">
                                {["Consultoria", "Planejamento", "Logística", "Execução"].map((step, i) => (
                                    <div key={i} className="px-5 py-2.5 rounded-full border border-slate-200 bg-white hover:bg-orange-50 hover:border-brand-orange transition-all text-slate-700 text-xs font-bold uppercase tracking-wider shadow-sm">
                                        {step}
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                SEÇÃO 5 — PARCERIAS DURADOURAS (Social Proof)
            ═══════════════════════════════════════════════════════════ */}
            <section className="w-full bg-slate-900 text-white py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-brand-orange/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

                <div className="container mx-auto px-6 relative z-10 max-w-6xl">
                    <div className="mb-10 text-center">
                        <h3 className="text-sm font-bold text-brand-orange uppercase tracking-widest mb-2">Quem confia</h3>
                        <h2 className="text-3xl font-heading font-bold text-white">Parcerias duradouras</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Review 1 — Colégio Autêntico */}
                        <div className="p-8 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm flex flex-col">
                            <div className="flex items-center gap-1 mb-4 text-brand-orange">
                                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                            </div>
                            <p className="text-slate-300 text-base leading-relaxed italic mb-6 flex-1">
                                "Parceiros há 15 anos, a Alegrando sempre demonstrou um trabalho sério, organizado e comprometido com a segurança. A equipe de monitores é incrível: atenciosa, preparada e carinhosa. Recomendamos com total confiança."
                            </p>
                            <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                                <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 p-0.5 bg-white shrink-0">
                                    <img src={autenticoImg} alt="Colégio Autêntico" className="w-full h-full object-contain" />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm">Caroline Freire</p>
                                    <p className="text-slate-400 text-xs">Colégio Autêntico</p>
                                </div>
                            </div>
                        </div>

                        {/* Review 2 — Colégio Vinicius de Moraes */}
                        <div className="p-8 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm flex flex-col">
                            <div className="flex items-center gap-1 mb-4 text-brand-orange">
                                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                            </div>
                            <p className="text-slate-300 text-base leading-relaxed italic mb-6 flex-1">
                                "Há mais de 10 anos contamos com a Alegrando. Os roteiros são cuidadosamente escolhidos e as vivências vão muito além do passeio. Os monitores são atenciosos, animados e zelam pela segurança em cada detalhe."
                            </p>
                            <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                                <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 p-0.5 bg-white shrink-0">
                                    <img src={viniciusImg} alt="Colégio Vinicius de Moraes" className="w-full h-full object-contain" />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm">Juliana Beltran</p>
                                    <p className="text-slate-400 text-xs">Colégio Vinicius de Moraes</p>
                                </div>
                            </div>
                        </div>

                        {/* Review 3 — Externato Parque Continental */}
                        <div className="p-8 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm flex flex-col">
                            <div className="flex items-center gap-1 mb-4 text-brand-orange">
                                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                            </div>
                            <p className="text-slate-300 text-base leading-relaxed italic mb-6 flex-1">
                                "Contamos com a Alegrando há anos em passeios como Hopi Hari, Parque da Mônica e Zooparque Itatiba. Os monitores são animados, atenciosos e preparados — não apenas acompanham, mas interagem e transformam cada momento."
                            </p>
                            <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                                <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 p-0.5 bg-white shrink-0">
                                    <img src={externatoImg} alt="Externato Parque Continental" className="w-full h-full object-contain" />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm">Vívian Testone</p>
                                    <p className="text-slate-400 text-xs">Colégio Externato Parque Continental</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                SEÇÃO 6 — CTA JADE (Conversão Final)
            ═══════════════════════════════════════════════════════════ */}
            <section className="py-24 bg-orange-50/30 relative overflow-hidden">
                <div className="container mx-auto px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl mx-auto"
                    >
                        <div className="flex justify-center mb-6">
                            <div className="p-3 bg-white rounded-full shadow-lg border border-slate-100 relative">
                                <img src={jadeLogoUrl} alt="Jade" className="w-14 h-14 object-contain" />
                                <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
                            </div>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-4 animate-fade-in-up">
                            Ainda com dúvidas?
                        </h2>
                        <p className="text-xl text-slate-600 font-light mb-4 leading-relaxed">
                            A <strong className="text-brand-orange font-bold">Jade</strong>, nossa inteligência artificial, está pronta para te ajudar a encontrar o roteiro perfeito agora mesmo.
                        </p>
                        <p className="text-base text-slate-500 mb-10">
                            Clique no botão abaixo para <strong className="text-slate-700">montar seu roteiro</strong> de passeio passo a passo, ou selecione <strong className="text-slate-700">"Tenho uma dúvida"</strong> para conversar diretamente com a Jade.
                        </p>

                        <button
                            onClick={() => window.openJadeWidget()}
                            className="inline-flex items-center justify-center gap-3 bg-brand-orange hover:bg-orange-600 text-white text-lg font-bold py-5 px-12 rounded-full shadow-xl shadow-orange-200 hover:shadow-2xl transition-all hover:-translate-y-1 group relative z-50 pointer-events-auto cursor-pointer"
                        >
                            <MessageCircle size={24} className="group-hover:animate-bounce" />
                            Conversar com a Jade
                        </button>
                        <p className="mt-6 text-xs text-slate-400 font-medium uppercase tracking-widest">
                            Disponível 24h
                        </p>
                    </motion.div>
                </div>
            </section>

        </div>
    );
};

export default DestinationsPage;
