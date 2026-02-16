import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, TrendingUp, Heart, DollarSign, AlertTriangle } from 'lucide-react';
import brasilLogo from '../assets/brasil.webp';

const AuthorityManifesto: React.FC = () => {
    return (
        <section className="py-24 bg-white border-t border-slate-100">
            <div className="container mx-auto px-6">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* Left: Authority Text Block */}
                    <div className="text-left w-full">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-5xl md:text-6xl font-expressive text-brand-orange italic drop-shadow-sm mb-8">
                                é unânime
                            </h2>
                            <p className="text-xl md:text-2xl font-light text-slate-700 leading-relaxed mb-12">
                                "Escolas que implementam os passeios extracurriculares sentem uma <span className="font-expressive text-brand-orange italic text-2xl md:text-3xl">melhor satisfação dos pais</span> e um aumento nas <span className="font-expressive text-brand-orange italic text-2xl md:text-3xl">taxas de retenção</span> dos alunos."
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-all hover:-translate-y-1">
                                    <div className="bg-white p-2 rounded-full text-brand-orange shadow-sm shrink-0">
                                        <ShieldCheck size={24} />
                                    </div>
                                    <span className="text-slate-700 font-medium text-lg self-center">Apresentam mais credibilidade na instituição</span>
                                </div>
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-all hover:-translate-y-1">
                                    <div className="bg-white p-2 rounded-full text-brand-orange shadow-sm shrink-0">
                                        <TrendingUp size={24} />
                                    </div>
                                    <span className="text-slate-700 font-medium text-lg self-center">Melhoram a taxa de retenção e NPS</span>
                                </div>
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-all hover:-translate-y-1">
                                    <div className="bg-white p-2 rounded-full text-brand-orange shadow-sm shrink-0">
                                        <Heart size={24} />
                                    </div>
                                    <span className="text-slate-700 font-medium text-lg self-center">Fidelizam clientes e ganham indicações</span>
                                </div>
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-all hover:-translate-y-1">
                                    <div className="bg-white p-2 rounded-full text-brand-orange shadow-sm shrink-0">
                                        <DollarSign size={24} />
                                    </div>
                                    <span className="text-slate-700 font-medium text-lg self-center">Melhoram a saúde financeira da escola</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: MEC Warning Block (Clean Layout) */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col justify-center h-full pl-0 lg:pl-12"
                    >
                        <div className="flex flex-col items-center text-center gap-6">
                            <div>
                                <h3 className="font-heading font-bold text-slate-900 text-xl mb-4 flex items-center justify-center gap-2">
                                    <AlertTriangle size={24} className="text-yellow-500" />
                                    Ministério da Educação Brasileira Adverte:
                                </h3>
                                <p className="text-slate-600 text-lg leading-relaxed font-medium">
                                    "Escolas que aplicam esse tipo de atividade possuem diversos benefícios para o desenvolvimento educacional e social da criança."
                                </p>
                            </div>

                            <div className="w-24 h-1 bg-slate-100 rounded-full my-2"></div>

                            <div className="w-32 md:w-40 shrink-0 opacity-80 hover:opacity-100 transition-opacity">
                                <img src={brasilLogo} alt="Governo Federal - Brasil" className="w-full h-auto object-contain" />
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default AuthorityManifesto;
