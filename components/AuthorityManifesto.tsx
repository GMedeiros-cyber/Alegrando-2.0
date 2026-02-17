import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, TrendingUp, Heart, DollarSign, CheckCircle, Bus, Shield } from 'lucide-react';
import cadasturImg from '../assets/cadastur.png';

const AuthorityManifesto: React.FC = () => {
    return (
        <section className="py-24 bg-white border-t border-slate-100">
            <div className="container mx-auto px-6">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

                    {/* Left: Safety First (Moved from Right) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col justify-start h-full"
                    >
                        <h3 className="text-sm font-bold text-brand-orange uppercase tracking-widest mb-3">Tranquilidade Total</h3>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-6 leading-tight">
                            Segurança em <br className="hidden lg:block" /> <span className="text-brand-orange font-expressive italic">primeiro lugar</span>
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed font-light mb-8">
                            Ônibus executivos, motoristas selecionados e protocolos rigorosos. O bem-estar das crianças é nossa prioridade absoluta.
                        </p>

                        <ul className="space-y-4 mb-10 w-full">
                            <li className="flex items-center gap-3 text-slate-700 p-4 rounded-xl bg-slate-50 border border-slate-100 shadow-sm">
                                <CheckCircle size={20} className="text-green-500 shrink-0" />
                                <span className="font-medium text-sm">Motoristas Vistoriados</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-700 p-4 rounded-xl bg-slate-50 border border-slate-100 shadow-sm">
                                <ShieldCheck size={20} className="text-green-500 shrink-0" />
                                <span className="font-medium text-sm">Monitoramento Real-time</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-700 p-4 rounded-xl bg-slate-50 border border-slate-100 shadow-sm">
                                <Bus size={20} className="text-green-500 shrink-0" />
                                <span className="font-medium text-sm">Frota Executiva Nova</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-700 p-4 rounded-xl bg-slate-50 border border-slate-100 shadow-sm">
                                <Shield size={20} className="text-green-500 shrink-0" />
                                <span className="font-medium text-sm">Protocolos de Emergência</span>
                            </li>
                        </ul>

                        <div className="flex items-center gap-6 pt-6 border-t border-slate-100 opacity-80 hover:opacity-100 transition-opacity">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Autorizado por</span>
                            <img src={cadasturImg} alt="Cadastur" className="h-10 w-auto grayscale hovered:grayscale-0 transition-all" />
                        </div>
                    </motion.div>

                    {/* Right: Authority Text Block (Moved from Left) */}
                    <div className="text-left w-full pl-0 lg:pl-12 pt-8 lg:pt-0">
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <h2 className="text-5xl md:text-6xl font-expressive text-brand-orange italic drop-shadow-sm mb-8">
                                É unânime
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

                </div>
            </div>
        </section>
    );
};

export default AuthorityManifesto;
