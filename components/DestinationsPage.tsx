import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    MessageCircle, Map, CheckCircle, Shield,
    Landmark, Bus, Leaf, Tent, GraduationCap, Drama,
    FerrisWheel, Cpu, Calculator, Rocket, Star
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

import cadasturImg from '../assets/cadastur.png';
import onibusImg from '../assets/onibus.jpeg';
import camisaImg from '../assets/camisa.jpeg';

// Reusing existing images 
const teatroImg = historiaImg;
const naturezaImg = fazendaImg;

const destinationsData = [
    {
        title: "História e cultura",
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
            {/* MANIFESTO & FEEDBACK SECTION - Combined Layout */}
            <section className="relative pt-40 pb-24 px-6 bg-slate-50 overflow-hidden">
                <div className="container mx-auto relative z-10">
                    <div className="bg-white rounded-[4rem] shadow-2xl overflow-hidden border border-slate-100 flex flex-col lg:flex-row min-h-[600px]">

                        {/* LEFT COLUMN: Manifesto / Jornada / Profile */}
                        <div className="lg:w-5/12 bg-slate-900 text-white p-10 md:p-14 relative flex flex-col justify-between overflow-hidden">
                            {/* Texture/Decoration */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange opacity-20 blur-[80px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500 opacity-10 blur-[60px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

                            {/* Top Content */}
                            <div className="relative z-10 space-y-8">
                                {/* Jornada 360 Title */}
                                <div className="flex items-center gap-4">
                                    <div className="relative w-12 h-12 flex items-center justify-center bg-white/10 rounded-full border border-white/20">
                                        <Rocket size={20} className="text-brand-orange" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold leading-none">Jornada <span className="text-brand-orange">360°</span></h3>
                                        <p className="text-slate-400 text-xs tracking-widest uppercase">Metodologia Exclusiva</p>
                                    </div>
                                </div>

                                {/* 4 Steps - Visual Representation */}
                                <div className="flex flex-wrap gap-2">
                                    {["Consultoria", "Planejamento", "Logística", "Execução"].map((step, i) => (
                                        <div key={i} className="px-3 py-1 rounded-full border border-brand-orange/30 bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-wide">
                                            {step}
                                        </div>
                                    ))}
                                </div>

                                <blockquote className="text-2xl md:text-3xl font-serif italic leading-loose text-slate-200">
                                    "A proposta é entregar um produto <span className="text-brand-orange">planejado e completo</span>, que vai muito além do passeio."
                                </blockquote>
                            </div>

                            {/* Bottom Content: Director Profile */}
                            <div className="relative z-10 flex items-center gap-5 pt-8 mt-auto border-t border-slate-800/50">
                                <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-br from-brand-orange to-orange-600 shadow-lg overflow-hidden shrink-0">
                                    <img
                                        src={camisaImg}
                                        alt="Silvana Moura"
                                        className="w-full h-full object-cover object-top rounded-full border-2 border-white/20"
                                    />
                                </div>
                                <div>
                                    <p className="text-xl font-bold text-white">Silvana Moura</p>
                                    <p className="text-brand-orange text-sm font-medium tracking-wide opacity-90">Fundadora e Diretora</p>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Feedbacks / Testimonials List */}
                        <div className="lg:w-7/12 bg-white p-10 md:p-16 relative">
                            {/* Oversized Quote Background */}
                            <div className="absolute top-8 left-8 text-[12rem] text-slate-50 font-serif leading-none select-none pointer-events-none -translate-y-12 -translate-x-8">“</div>

                            <div className="relative z-10 flex flex-col gap-12 h-full justify-center">

                                {/* Item 01 */}
                                <div className="group">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                                        </div>
                                        <h4 className="text-xl font-bold text-slate-900 group-hover:text-brand-orange transition-colors">
                                            Mais de 15 anos de parceria
                                        </h4>
                                    </div>
                                    <div className="pl-6 border-l-4 border-slate-100 group-hover:border-brand-orange transition-colors py-1">
                                        <p className="text-slate-600 mb-6 leading-relaxed italic text-lg">
                                            "Ao longo de todo esse tempo, a Alegrando sempre demonstrou um trabalho <strong className="text-slate-800 font-bold">extremamente sério, organizado e comprometido</strong> com a segurança."
                                        </p>
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 bg-slate-50 rounded-full p-1 overflow-hidden shrink-0 border border-slate-200">
                                                <img src={autenticoImg} alt="Colégio Autêntico" className="w-full h-full object-contain" />
                                            </div>
                                            <div>
                                                <p className="text-slate-900 font-bold text-sm">Caroline Freire</p>
                                                <p className="text-slate-500 text-xs">Coordenadora Fund I • Colégio Autêntico</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Item 02 */}
                                <div className="group">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                                        </div>
                                        <h4 className="text-xl font-bold text-slate-900 group-hover:text-brand-orange transition-colors">
                                            Parceria de mais de 10 anos
                                        </h4>
                                    </div>
                                    <div className="pl-6 border-l-4 border-slate-100 group-hover:border-brand-orange transition-colors py-1">
                                        <p className="text-slate-600 mb-6 leading-relaxed italic text-lg">
                                            "As experiências vão muito além do passeio: são momentos de aprendizado. A Alegrando zela pela <strong className="text-slate-800 font-bold">segurança em cada detalhe</strong>."
                                        </p>
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 bg-slate-50 rounded-full p-1 overflow-hidden shrink-0 border border-slate-200">
                                                <img src={viniciusImg} alt="Colégio Vinicius" className="w-full h-full object-contain" />
                                            </div>
                                            <div>
                                                <p className="text-slate-900 font-bold text-sm">Juliana Beltran</p>
                                                <p className="text-slate-500 text-xs">Diretora • Colégio Vinicius de Moraes</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <div className="pt-8 pb-8 container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative inline-block"
                >
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-brand-orange mb-2 flex items-center justify-center gap-4 relative z-10">
                        Conheça alguns de nossos destinos
                        <motion.div
                            animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="inline-block"
                        >
                            <Rocket size={48} className="text-brand-orange drop-shadow-lg" />
                        </motion.div>
                    </h1>
                    <div className="absolute -bottom-2 right-12 w-48 h-4 bg-orange-200/50 -rotate-2 rounded-full blur-sm -z-0 hidden md:block" />
                    <svg className="w-64 h-4 mx-auto text-brand-orange mt-2" viewBox="0 0 200 10" preserveAspectRatio="none">
                        <path d="M0 5 Q 100 15 200 5" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
                    </svg>
                </motion.div>
            </div>

            {/* Categories Navigation Bar */}
            <div className="container mx-auto px-6 mb-16">
                <div className="flex overflow-x-auto gap-6 md:gap-8 pb-6 justify-start md:justify-center hide-scrollbar px-4">
                    {categoriesNav.map((cat, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ scale: 1.1 }}
                            className="flex flex-col items-center gap-3 min-w-[100px] cursor-pointer group"
                        >
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-orange-50 rounded-full flex items-center justify-center text-brand-orange shadow-sm border border-orange-100 group-hover:bg-brand-orange group-hover:text-white transition-all duration-300">
                                {cat.icon}
                            </div>
                            <span className="text-sm md:text-base font-bold text-slate-600 group-hover:text-brand-orange transition-colors whitespace-nowrap">
                                {cat.label}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Horizontal Scroll Carousel - Full Width Feel */}
            <div className="relative w-full pb-20">

                {/* Scroll Container */}
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
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Safety & Comfort Section */}
            <section className="py-24 bg-slate-50 relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="bg-white rounded-[3rem] shadow-xl p-8 md:p-16 border border-slate-100 relative overflow-hidden">
                        {/* Decorative Doodles */}
                        <div className="absolute top-10 left-0 w-32 h-32 border-4 border-dashed border-orange-200 rounded-full opacity-50 -translate-x-1/2 pointer-events-none" />
                        <div className="absolute bottom-10 right-0 w-48 h-12 bg-orange-100 -rotate-12 rounded-full opacity-50 translate-x-12 pointer-events-none" />

                        <div className="flex flex-col md:flex-row items-center gap-16 text-left">
                            {/* Text Content */}
                            <div className="md:w-1/2 space-y-8 z-10">
                                <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 leading-none">
                                    Segurança e conforto
                                </h2>
                                <h3 className="text-2xl md:text-3xl font-light text-slate-600">
                                    Para o bem <span className="text-brand-orange font-bold relative inline-block">
                                        mais precioso
                                        <svg className="absolute w-full h-3 -bottom-1 left-0 text-brand-orange opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                                            <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                                        </svg>
                                    </span> que temos: as crianças!
                                </h3>

                                <div className="space-y-4 text-lg text-slate-600">
                                    <p>
                                        Não abrimos mão dos nossos ônibus de <span className="font-bold text-slate-800">classe executiva</span>, que são equipados com poltronas reclináveis, toalete e ar-condicionado.
                                    </p>
                                    <p>
                                        Garantimos um rigoroso processo de seleção para nossos motoristas, assegurando <span className="font-bold text-slate-800">qualidade e segurança</span> em cada trajeto.
                                    </p>
                                </div>

                                <div className="flex items-center gap-4 pt-4">
                                    <img
                                        src={cadasturImg}
                                        alt="Cadastur Certificação"
                                        className="h-16 w-auto object-contain"
                                    />
                                </div>
                            </div>

                            {/* Image/Visual Content */}
                            <div className="md:w-1/2 relative z-10">
                                <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
                                    <img
                                        src={onibusImg}
                                        alt="Interior Ônibus Executivo"
                                        className="w-full h-[400px] object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 bg-brand-orange text-white px-8 py-4 rounded-tr-3xl">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle size={20} />
                                            <span className="font-bold tracking-wider">CLASSE EXECUTIVA</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <div className="py-20 relative z-20">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 text-center relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-red-500" />

                        <h3 className="text-3xl md:text-4xl font-heading font-bold text-slate-800 mb-4">
                            Não achou o destino que gostaria?
                        </h3>
                        <p className="text-slate-600 text-lg mb-10 max-w-2xl mx-auto">
                            Não se preocupe, temos muitas outras opções! Nossa equipe pode personalizar o roteiro ideal.
                        </p>

                        <div className="flex flex-col md:flex-row justify-center gap-6">
                            <a
                                href="https://wa.me/5511916032904?text=Ol%C3%A1!%20Tenho%20interesse%20nos%20passeios%20escolares%20da%20Alegrando%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group bg-orange-50 hover:bg-orange-100 p-6 rounded-2xl border border-orange-100 transition-all duration-300 flex items-center gap-4 min-w-[280px]"
                            >
                                <div className="w-12 h-12 bg-white text-brand-orange rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                    <MessageCircle size={24} />
                                </div>
                                <div className="text-left">
                                    <p className="text-xs text-orange-600 font-bold uppercase tracking-wider">Whatsapp</p>
                                    <p className="font-bold text-slate-900 text-lg">Falar com Consultor</p>
                                </div>
                            </a>

                            <a href="#contato" className="group bg-slate-50 hover:bg-slate-100 p-6 rounded-2xl border border-slate-200 transition-all duration-300 flex items-center gap-4 min-w-[280px]">
                                <div className="w-12 h-12 bg-white text-green-600 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                    <Map size={24} />
                                </div>
                                <div className="text-left">
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Personalizado</p>
                                    <p className="font-bold text-slate-900 text-lg">Roteiro Personalizado</p>
                                </div>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default DestinationsPage;
