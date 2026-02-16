import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import {
    MessageCircle, Map, CheckCircle, Shield, ShieldCheck,
    Landmark, Bus, Leaf, Tent, GraduationCap, Drama,
    FerrisWheel, Cpu, Calculator, Rocket, Star, ArrowRight
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
                        Destinos <span className="text-brand-orange italic font-serif">Inesquecíveis</span>
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
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* --- 1. JORNADA 360 (Dark Full Width Section) --- */}
            <section className="w-full bg-slate-900 text-white py-24 relative overflow-hidden">
                {/* Background Texture */}
                <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-brand-orange/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

                <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
                    {/* Header */}
                    <div className="inline-flex items-center gap-3 mb-8 bg-white/5 backdrop-blur-sm px-6 py-2 rounded-full border border-white/10">
                        <Rocket size={18} className="text-brand-orange" />
                        <span className="text-sm font-bold tracking-widest uppercase text-slate-300">Metodologia Exclusiva</span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-bold mb-6">Jornada <span className="text-brand-orange">360°</span></h2>

                    {/* Quote */}
                    <blockquote className="text-2xl md:text-4xl font-serif italic leading-relaxed text-slate-200 max-w-4xl mx-auto mb-16">
                        "A proposta é entregar um produto <span className="text-brand-orange font-light">planejado e completo</span>, que vai muito além do passeio."
                    </blockquote>

                    {/* Steps */}
                    <div className="flex flex-wrap justify-center gap-4 mb-16">
                        {["Consultoria", "Planejamento", "Logística", "Execução"].map((step, i) => (
                            <div key={i} className="px-6 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-colors text-white text-sm font-bold uppercase tracking-wider">
                                {step}
                            </div>
                        ))}
                    </div>

                    {/* Profile */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-br from-brand-orange to-orange-600 shadow-2xl overflow-hidden shrink-0">
                            <img src={camisaImg} alt="Silvana Moura" className="w-full h-full object-cover object-top rounded-full border-2 border-white/20" />
                        </div>
                        <div>
                            <p className="text-xl font-bold text-white">Silvana Moura</p>
                            <p className="text-brand-orange text-sm font-medium tracking-wide opacity-80">Fundadora e Diretora</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 2. FEEDBACKS (Light Full Width Section) --- */}
            <section className="w-full bg-white py-24 border-b border-slate-100 relative">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Depoimentos</h3>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900">O que dizem nossos parceiros</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 max-w-5xl mx-auto">
                        {/* Feedback 1 */}
                        <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow duration-300">
                            <div className="flex items-center gap-1 mb-6 text-brand-orange">
                                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                            </div>
                            <h4 className="text-xl font-bold text-slate-900 mb-4">Mais de 15 anos de parceria</h4>
                            <p className="text-slate-600 text-lg leading-relaxed italic mb-8">
                                "Ao longo de todo esse tempo, a Alegrando sempre demonstrou um trabalho <strong className="text-slate-900">extremamente sério, organizado e comprometido</strong> com a segurança."
                            </p>
                            <div className="flex items-center gap-4 border-t border-slate-200 pt-6">
                                <div className="w-12 h-12 bg-white rounded-full border border-slate-200 p-1 shrink-0">
                                    <img src={autenticoImg} alt="Colégio Autêntico" className="w-full h-full object-contain" />
                                </div>
                                <div>
                                    <p className="text-slate-900 font-bold text-sm">Caroline Freire</p>
                                    <p className="text-slate-500 text-xs">Colégio Autêntico</p>
                                </div>
                            </div>
                        </div>

                        {/* Feedback 2 */}
                        <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow duration-300">
                            <div className="flex items-center gap-1 mb-6 text-brand-orange">
                                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                            </div>
                            <h4 className="text-xl font-bold text-slate-900 mb-4">Parceria de mais de 10 anos</h4>
                            <p className="text-slate-600 text-lg leading-relaxed italic mb-8">
                                "As experiências vão muito além do passeio: são momentos de aprendizado. A Alegrando zela pela <strong className="text-slate-900">segurança em cada detalhe</strong>."
                            </p>
                            <div className="flex items-center gap-4 border-t border-slate-200 pt-6">
                                <div className="w-12 h-12 bg-white rounded-full border border-slate-200 p-1 shrink-0">
                                    <img src={viniciusImg} alt="Colégio Vinicius" className="w-full h-full object-contain" />
                                </div>
                                <div>
                                    <p className="text-slate-900 font-bold text-sm">Juliana Beltran</p>
                                    <p className="text-slate-500 text-xs">Colégio Vinicius de Moraes</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 3. SEGURANÇA E CADASTUR (Clean Section - No Box) --- */}
            <section className="py-24 bg-slate-50 border-b border-slate-200">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start max-w-6xl mx-auto">

                        {/* Left Column: Title & Description */}
                        <div className="lg:w-5/12 sticky top-24">
                            <div className="w-12 h-1 bg-brand-orange mb-8"></div>
                            <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-6 leading-tight">
                                Segurança em <br className="hidden lg:block" /> <span className="text-brand-orange">primeiro lugar</span>
                            </h2>
                            <p className="text-lg text-slate-600 leading-relaxed max-w-md">
                                Para o bem mais precioso que temos: as crianças. Não abrimos mão de ônibus classe executiva com poltronas reclináveis, toalete e ar-condicionado.
                            </p>
                        </div>

                        {/* Right Column: List & Certification */}
                        <div className="lg:w-7/12 w-full">
                            <ul className="space-y-6 mb-12">
                                <li className="group flex items-start gap-6">
                                    <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all shadow-sm">
                                        <CheckCircle size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-slate-900 mb-2">Motoristas Selecionados</h4>
                                        <p className="text-slate-600 leading-relaxed">Profissionais experientes, treinados e com histórico verificado para garantir tranquilidade total.</p>
                                    </div>
                                </li>
                                <li className="group flex items-start gap-6">
                                    <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all shadow-sm">
                                        <ShieldCheck size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-slate-900 mb-2">Protocolos Ativos</h4>
                                        <p className="text-slate-600 leading-relaxed">Monitoramento em tempo real e comunicação constante com a coordenação escolar.</p>
                                    </div>
                                </li>
                                <li className="group flex items-start gap-6">
                                    <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all shadow-sm">
                                        <Bus size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-slate-900 mb-2">Frota Moderna</h4>
                                        <p className="text-slate-600 leading-relaxed">Veículos novos, vistoriados regularmente e com todos os itens de conforto e segurança.</p>
                                    </div>
                                </li>
                            </ul>

                            <div className="flex items-center gap-4 opacity-70 hover:opacity-100 transition-opacity">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Certificação Oficial</span>
                                <div className="h-px bg-slate-300 w-12"></div>
                                <img src={cadasturImg} alt="Cadastur" className="h-8 w-auto grayscale hover:grayscale-0 transition-all" />
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* --- 4. CTA FINAL (Full Width Clean) --- */}
            <section className="py-32 bg-white relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

                <div className="container mx-auto px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-6">
                            Não achou o que procurava?
                        </h2>
                        <p className="text-xl text-slate-500 font-light mb-12 max-w-2xl mx-auto">
                            Não se preocupe! Nossa equipe é especialista em criar roteiros personalizados para as necessidades da sua escola.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                            <a
                                href="https://wa.me/5511916032904?text=Ol%C3%A1!%20Gostaria%20de%20personalizar%20um%20roteiro%20escolar."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-3 bg-brand-orange hover:bg-orange-600 text-white text-lg font-bold py-5 px-10 rounded-full shadow-xl shadow-orange-200 hover:shadow-2xl transition-all hover:-translate-y-1"
                            >
                                <MessageCircle size={24} />
                                Falar com Consultor
                            </a>
                            <a
                                href="#contato"
                                className="inline-flex items-center justify-center gap-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-lg font-bold py-5 px-10 rounded-full border border-slate-200 transition-all hover:-translate-y-1"
                            >
                                <Map size={24} />
                                Roteiro Sob Medida
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
};

export default DestinationsPage;
