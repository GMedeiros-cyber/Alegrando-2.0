import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import {
    MessageCircle, Map,
    Landmark, Bus, Leaf, Tent, GraduationCap, Drama,
    FerrisWheel, Cpu, Calculator, Rocket, Star, ArrowRight,
    Quote, Bot
} from 'lucide-react';
import DestinationCard from './DestinationCard';

// Import assets
import historiaImg from '../assets/historia.jpeg';
import fazendaImg from '../assets/fazenda.jpeg';
import agriculturaImg from '../assets/agricultura.jpeg';
import museuImg from '../assets/museu.jpg';
import autenticoImg from '../assets/autentico.png';
import viniciusImg from '../assets/vinicius.png';

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
                    "Teatro Infantil (Cigarra e Formiga)",
                    "Teatro Juvenil (Dom Casmurro)",
                    "Teatro Musical (O Mágico de Oz)",
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

    return (
        <div id="destinos" className="bg-slate-50 min-h-screen">

            {/* --- HEADER SECTION --- */}
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
                    <h1 className="text-3xl md:text-5xl font-heading font-bold text-slate-800 mb-6 relative z-10">
                        Destinos <span className="text-brand-orange font-expressive italic font-medium">Inesquecíveis</span>
                    </h1>
                    <p className="text-slate-500 text-lg md:text-xl font-light leading-relaxed">
                        Explore nossa seleção de roteiros pedagógicos e de lazer, projetados para encantar e educar.
                    </p>
                </motion.div>
            </div>

            {/* --- CATEGORIES NAVIGATION --- */}
            <div className="container mx-auto px-6 mb-16">
                <div className="flex overflow-x-auto gap-6 md:gap-8 pb-6 justify-start md:justify-center hide-scrollbar px-4">
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

            {/* --- DESTINATIONS CAROUSEL --- */}
            <div className="relative w-full pb-20">
                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory gap-8 px-6 md:px-12 items-stretch pb-8
                    [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-brand-orange hover:[&::-webkit-scrollbar-thumb]:bg-orange-600"
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
            </div>

            {/* --- 1. JORNADA 360 + PARCERIAS (Dark Full Width Section) --- */}
            <section className="w-full bg-slate-900 text-white py-24 relative overflow-hidden">
                {/* Background Texture */}
                <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-brand-orange/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                        {/* LEFT: JORNADA 360 (Methodology) */}
                        <div className="flex flex-col items-start">
                            <div className="inline-flex items-center gap-3 mb-8 bg-white/5 backdrop-blur-sm px-6 py-2 rounded-full border border-white/10">
                                <Rocket size={18} className="text-brand-orange" />
                                <span className="text-sm font-bold tracking-widest uppercase text-slate-300">Metodologia Exclusiva</span>
                            </div>

                            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">Jornada <span className="text-brand-orange font-expressive italic">360°</span></h2>

                            <blockquote className="text-xl md:text-2xl font-serif italic leading-relaxed text-slate-300 border-l-4 border-brand-orange pl-6 mb-12">
                                "A proposta é entregar um produto <span className="text-white font-medium">planejado e completo</span>, que vai muito além do passeio. Cuidamos de cada detalhe, do início ao fim."
                            </blockquote>

                            <div className="flex flex-wrap gap-3 mb-12">
                                {["Consultoria", "Planejamento", "Logística", "Execução"].map((step, i) => (
                                    <div key={i} className="px-5 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-white text-xs font-bold uppercase tracking-wider">
                                        {step}
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center gap-5 pt-8 border-t border-white/10 w-full">
                                <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-br from-brand-orange to-orange-600 shadow-lg overflow-hidden shrink-0">
                                    <img src={camisaImg} alt="Silvana Moura" className="w-full h-full object-cover object-top rounded-full" />
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-white">Silvana Moura</p>
                                    <p className="text-brand-orange font-expressive italic text-base font-medium tracking-wide opacity-90">Fundadora e Diretora</p>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: PARCERIAS (Testimonials) */}
                        <div className="flex flex-col gap-8 lg:pt-8">
                            <div className="mb-4">
                                <h3 className="text-sm font-bold text-brand-orange uppercase tracking-widest mb-2">Quem confia</h3>
                                <h2 className="text-3xl font-heading font-bold text-white">Parcerias duradouras</h2>
                            </div>

                            {/* Review 1 */}
                            <div className="p-8 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                                <div className="flex items-center gap-1 mb-4 text-brand-orange">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                                </div>
                                <p className="text-slate-300 text-lg leading-relaxed italic mb-6">
                                    "A Alegrando sempre demonstrou um trabalho extremamente sério, organizado e comprometido com a segurança."
                                </p>
                                <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                                    <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 p-0.5 bg-white">
                                        <img src={autenticoImg} alt="Colégio" className="w-full h-full object-contain" />
                                    </div>
                                    <div>
                                        <p className="text-white font-bold text-sm">Caroline Freire</p>
                                        <p className="text-slate-400 text-xs">Colégio Autêntico</p>
                                    </div>
                                </div>
                            </div>

                            {/* Review 2 */}
                            <div className="p-8 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                                <div className="flex items-center gap-1 mb-4 text-brand-orange">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                                </div>
                                <p className="text-slate-300 text-lg leading-relaxed italic mb-6">
                                    "As vivências vão muito além do passeio. A empresa zela pela segurança em cada detalhe do processo."
                                </p>
                                <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                                    <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 p-0.5 bg-white">
                                        <img src={viniciusImg} alt="Colégio" className="w-full h-full object-contain" />
                                    </div>
                                    <div>
                                        <p className="text-white font-bold text-sm">Juliana Beltran</p>
                                        <p className="text-slate-400 text-xs">Colégio Vinicius de Moraes</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* --- 2. CTA JADE (Minimalist) --- */}
            <section className="py-24 bg-orange-50/30 relative overflow-hidden">
                <div className="container mx-auto px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl mx-auto"
                    >
                        <div className="flex justify-center mb-6">
                            <div className="p-4 bg-white rounded-full shadow-lg border border-slate-100 relative">
                                <Bot size={40} className="text-brand-orange" />
                                <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
                            </div>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-4 animate-fade-in-up">
                            Ainda com dúvidas?
                        </h2>
                        <p className="text-xl text-slate-600 font-light mb-10 leading-relaxed">
                            A <strong className="text-brand-orange font-bold">Jade</strong>, nossa inteligência artificial, está pronta para te ajudar a encontrar o roteiro perfeito agora mesmo.
                        </p>

                        <button
                            onClick={() => window.openJadeWidget("Olá Jade! Não encontrei o destino ideal no site e gostaria de ver mais opções de passeios para minha escola.")}
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
