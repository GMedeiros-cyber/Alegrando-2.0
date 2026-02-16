import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, CheckCircle, Car, Users, Star, ArrowRight, Sparkles, Ticket, Armchair, Wand2 } from 'lucide-react';

// Import assets
import neogeoHeroImg from '../assets/neogeo.jpg';

import barueriImg from '../assets/barueri.jpeg';
import morumbiImg from '../assets/morumbi.jpeg';
import internacionalImg from '../assets/internacional.jpg';

const BirthdayPage: React.FC = () => {
    return (
        <div id="aniversarios" className="bg-slate-50 min-h-screen">
            {/* 1️⃣ Bloco Hero interno (Redesigned) */}
            <div className="relative h-[85vh] min-h-[600px] flex items-center justify-center text-center text-white overflow-hidden">

                {/* Animated Gradient Background */}
                <style>
                    {`
                    @keyframes gradient-xy {
                        0%, 100% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                    }
                    .animate-gradient-xy {
                        background: linear-gradient(-45deg, #FF6B35, #e85d2e, #1e293b, #0F172A);
                        background-size: 300% 300%;
                        animation: gradient-xy 15s ease infinite;
                    }
                    `}
                </style>
                <div className="absolute inset-0 z-0 animate-gradient-xy">
                    <div className="absolute inset-0 bg-black/30" />
                </div>

                <div className="relative z-10 container mx-auto px-6 max-w-5xl pt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 shadow-sm hover:bg-white/10 transition-colors duration-300">
                            <CheckCircle size={14} className="text-brand-orange" />
                            <span className="text-white/90 font-medium text-xs uppercase tracking-wider">Somos Parceiros Oficiais Neo Geo</span>
                        </div>

                        {/* Main Title */}
                        <div className="flex flex-col items-center justify-center mb-10 leading-none space-y-2 md:space-y-4">
                            <span className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white drop-shadow-xl">
                                Uma festa que vai
                            </span>
                            <span className="text-5xl md:text-7xl lg:text-8xl font-expressive text-brand-orange italic drop-shadow-2xl translate-y-2 md:translate-y-0 block">
                                além do parabéns
                            </span>
                        </div>

                        {/* Subtitle */}
                        <p className="text-lg md:text-2xl text-slate-100 leading-relaxed font-light max-w-3xl mx-auto drop-shadow-md">
                            No Neo Geo Family, o aniversário é uma experiência completa. Salões exclusivos, acesso às atrações do parque, ambiente moderno e segurança em cada detalhe.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* 2️⃣ Post-it Cards Section */}
            <div className="bg-stone-50 py-16">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                        {/* Card 1: Ambientes de Sonho */}
                        <div className="bg-[#F3E9D8] p-8 rounded-xl shadow-md transform -rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-300 relative group cursor-default">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-4 bg-yellow-200/50 blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="flex items-center gap-3 mb-4">
                                <Sparkles className="text-brand-orange" size={24} />
                                <h3 className="font-heading font-bold text-lg text-slate-800">Ambientes de Sonho!</h3>
                            </div>
                            <p className="text-slate-600 leading-relaxed text-sm">
                                Decoração moderna e luzes aconchegantes para criar um cenário de festa inesquecível.
                            </p>
                        </div>

                        {/* Card 2: Cartão da Diversão */}
                        <div className="bg-[#F3E9D8] p-8 rounded-xl shadow-md transform rotate-1 hover:rotate-0 hover:scale-105 transition-all duration-300 relative group cursor-default">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-4 bg-blue-200/50 blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="flex items-center gap-3 mb-4">
                                <Ticket className="text-brand-orange" size={24} />
                                <h3 className="font-heading font-bold text-lg text-slate-800">Cartão da Diversão!</h3>
                            </div>
                            <p className="text-slate-600 leading-relaxed text-sm">
                                Seus convidados ganham acesso livre (exceto máquinas de prêmios) às atrações do Neo Geo Family.
                            </p>
                        </div>

                        {/* Card 3: Conforto para Todos */}
                        <div className="bg-[#F3E9D8] p-8 rounded-xl shadow-md transform -rotate-1 hover:rotate-0 hover:scale-105 transition-all duration-300 relative group cursor-default">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-4 bg-green-200/50 blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="flex items-center gap-3 mb-4">
                                <Armchair className="text-brand-orange" size={24} />
                                <h3 className="font-heading font-bold text-lg text-slate-800">Conforto para Todos!</h3>
                            </div>
                            <p className="text-slate-600 leading-relaxed text-sm">
                                Salões espaçosos, móveis confortáveis e tudo preparado para a alegria de todas as idades.
                            </p>
                        </div>

                        {/* Card 4: Como a Magia Acontece? */}
                        <div className="bg-[#F3E9D8] p-8 rounded-xl shadow-md transform rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-300 relative group cursor-default">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-4 bg-purple-200/50 blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="flex items-center gap-3 mb-4">
                                <Wand2 className="text-brand-orange" size={24} />
                                <h3 className="font-heading font-bold text-lg text-slate-800">Como a Magia Acontece?</h3>
                            </div>
                            <p className="text-slate-600 leading-relaxed text-sm">
                                Escolha sua unidade, fale conosco pelo WhatsApp e organizamos o roteiro com você.
                            </p>
                        </div>

                    </div>
                </div>
            </div>

            {/* 2️⃣ Seção narrativa dividida em 3 blocos verticais */}
            <div className="container mx-auto px-6 py-20 space-y-24 md:space-y-32">

                {/* Bloco 1: Parque Shopping Barueri */}
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full md:w-1/2 relative group"
                    >
                        <div className="absolute -inset-4 bg-brand-orange/10 rounded-[3rem] -rotate-2 group-hover:rotate-0 transition-transform duration-500" />
                        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl h-[400px] md:h-[500px]">
                            <img src={barueriImg} alt="Parque Shopping Barueri" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent">
                                <span className="inline-block px-4 py-1 bg-brand-orange text-white text-xs font-bold rounded-full mb-2">Novo Salão</span>
                                <h3 className="text-white text-2xl font-bold">Parque Shopping Barueri</h3>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full md:w-1/2 space-y-6"
                    >
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-brand-orange font-bold">
                                <MapPin size={20} />
                                <span className="uppercase tracking-wider text-sm">Região Alphaville</span>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-heading font-bold text-slate-800">
                                Modernidade e Conforto
                            </h3>
                        </div>

                        <p className="text-slate-600 leading-relaxed text-lg">
                            Localizado strategicamente para atender Alphaville e Barueri, nossa unidade oferece um salão novíssimo com ambiente moderno e espaços amplos.
                        </p>

                        <div className="space-y-4 pt-4">
                            <div className="flex items-start gap-3">
                                <CheckCircle className="text-brand-orange shrink-0 mt-1" size={20} />
                                <div>
                                    <h4 className="font-bold text-slate-800">Estrutura Premium</h4>
                                    <p className="text-slate-500 text-sm">Novo salão de festas com design contemporâneo e espaços amplos.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Car className="text-brand-orange shrink-0 mt-1" size={20} />
                                <div>
                                    <h4 className="font-bold text-slate-800">Fácil Acesso</h4>
                                    <p className="text-slate-500 text-sm">Estacionamento amplo e localização privilegiada no shopping.</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
                            <a href="https://wa.me/5511976520957?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20festas%20no%20Parque%20Shopping%20Barueri"
                                target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-orange transition-colors shadow-lg hover:shadow-orange-200"
                            >
                                Agendar festa nesta unidade
                                <ArrowRight size={18} />
                            </a>
                            <p className="text-slate-400 text-xs mt-3 flex items-center gap-1">
                                <MapPin size={12} />
                                Rua General de Divisão Pedro Rodrigues da Silva, 400
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Bloco 2: Morumbi Town Shopping (Inverted Layout) */}
                <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full md:w-1/2 relative group"
                    >
                        <div className="absolute -inset-4 bg-blue-100 rounded-[3rem] rotate-2 group-hover:rotate-0 transition-transform duration-500" />
                        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl h-[400px] md:h-[500px]">
                            <img src={morumbiImg} alt="Morumbi Town Shopping" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent">
                                <div className="flex gap-2 mb-2">
                                    <span className="inline-block px-4 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full">Salão Premium</span>
                                    <span className="inline-block px-4 py-1 bg-yellow-400 text-white text-xs font-bold rounded-full">Salão Gold</span>
                                </div>
                                <h3 className="text-white text-2xl font-bold">Morumbi Town Shopping</h3>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full md:w-1/2 space-y-6"
                    >
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-brand-orange font-bold">
                                <Star size={20} />
                                <span className="uppercase tracking-wider text-sm">Região Nobre</span>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-heading font-bold text-slate-800">
                                Sofisticação e Exclusividade
                            </h3>
                        </div>

                        <p className="text-slate-600 leading-relaxed text-lg">
                            No coração do Morumbi, oferecemos opções de salões Premium e Gold, perfeitos para quem busca exclusividade e atendimento diferenciado.
                        </p>

                        <div className="space-y-4 pt-4">
                            <div className="flex items-start gap-3">
                                <Users className="text-brand-orange shrink-0 mt-1" size={20} />
                                <div>
                                    <h4 className="font-bold text-slate-800">Espaços Versáteis</h4>
                                    <p className="text-slate-500 text-sm">Ideal para festas maiores, personalizadas e com ticket médio mais elevado.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPin className="text-brand-orange shrink-0 mt-1" size={20} />
                                <div>
                                    <h4 className="font-bold text-slate-800">Logística Estratégica</h4>
                                    <p className="text-slate-500 text-sm">Fácil acesso para Morumbi, Panamby e Vila Andrade.</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
                            <a href="https://wa.me/5511988962790?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20festas%20no%20Morumbi%20Town"
                                target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-orange transition-colors shadow-lg hover:shadow-orange-200"
                            >
                                Agendar festa nesta unidade
                                <ArrowRight size={18} />
                            </a>
                            <p className="text-slate-400 text-xs mt-3 flex items-center gap-1">
                                <MapPin size={12} />
                                Av. Giovanni Gronchi, 5930 – Vila Andrade
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Bloco 3: Shopping Internacional de Guarulhos */}
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full md:w-1/2 relative group"
                    >
                        <div className="absolute -inset-4 bg-green-100 rounded-[3rem] -rotate-2 group-hover:rotate-0 transition-transform duration-500" />
                        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl h-[400px] md:h-[500px]">
                            <img src={internacionalImg} alt="Shopping Internacional de Guarulhos" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent">
                                <div className="flex gap-2 mb-2">
                                    <span className="inline-block px-4 py-1 bg-brand-orange text-white text-xs font-bold rounded-full">Neofestas 1, 2 e 3</span>
                                </div>
                                <h3 className="text-white text-2xl font-bold">Shopping Internacional</h3>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full md:w-1/2 space-y-6"
                    >
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-brand-orange font-bold">
                                <Users size={20} />
                                <span className="uppercase tracking-wider text-sm">Forte Público Local</span>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-heading font-bold text-slate-800">
                                Grande Capacidade
                            </h3>
                        </div>

                        <p className="text-slate-600 leading-relaxed text-lg">
                            A maior estrutura da rede, com três salões exclusivos (Neofestas 1, 2 e 3) e grande fluxo de famílias, ideal para eventos de médio e grande porte.
                        </p>

                        <div className="space-y-4 pt-4">
                            <div className="flex items-start gap-3">
                                <ArrowRight className="text-brand-orange shrink-0 mt-1" size={20} />
                                <div>
                                    <h4 className="font-bold text-slate-800">Acesso Dutra</h4>
                                    <p className="text-slate-500 text-sm">Localização estratégica com fácil acesso pela Rodovia Dutra.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Users className="text-brand-orange shrink-0 mt-1" size={20} />
                                <div>
                                    <h4 className="font-bold text-slate-800">Versatilidade</h4>
                                    <p className="text-slate-500 text-sm">Estrutura preparada para atender diferentes perfis e tamanhos de festas.</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
                            <a href="https://wa.me/5511994457767?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20festas%20no%20Shopping%20Internacional"
                                target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-orange transition-colors shadow-lg hover:shadow-orange-200"
                            >
                                Agendar festa nesta unidade
                                <ArrowRight size={18} />
                            </a>
                            <p className="text-slate-400 text-xs mt-3 flex items-center gap-1">
                                <MapPin size={12} />
                                Rua Engº Camilo Olivetti, 295 – Vila Endres
                            </p>
                        </div>
                    </motion.div>
                </div>

            </div>

            {/* Final CTA Section */}
            <div className="bg-brand-orange py-20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-8">
                        Garanta sua data agora
                    </h2>
                    <p className="text-white/90 text-xl max-w-2xl mx-auto mb-10">
                        Não deixe para a última hora. As agendas das nossas unidades são concorridas. Entre em contato e reserve o dia perfeito.
                    </p>
                    <a
                        href="https://wa.me/5511916032904"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-white text-brand-orange px-10 py-5 rounded-full font-bold text-xl shadow-2xl hover:scale-105 transition-transform duration-300"
                    >
                        Solicitar Orçamento
                    </a>
                </div>
            </div>

        </div>
    );
};

export default BirthdayPage;
