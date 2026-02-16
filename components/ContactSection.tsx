import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Instagram, Facebook, ShieldCheck, MapPin } from 'lucide-react';

const ContactSection: React.FC = () => {
    // Simple form state
    const [formData, setFormData] = useState({
        name: '',
        whatsapp: '',
        email: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Construct WhatsApp message
        const text = `Olá! Me chamo *${formData.name}*.\n\n*Email:* ${formData.email}\n*Mensagem:* ${formData.message}`;
        const encodedText = encodeURIComponent(text);
        const whatsappUrl = `https://wa.me/5511916032904?text=${encodedText}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <section id="contato" className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-200 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

                    {/* Left Column: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="w-full lg:w-5/12"
                    >
                        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
                            <h3 className="text-2xl font-bold text-slate-800 mb-6">Envie uma mensagem</h3>
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Nome completo</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-orange focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                                        placeholder="Seu nome"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="whatsapp" className="block text-sm font-medium text-slate-700 mb-1">WhatsApp</label>
                                    <input
                                        type="tel"
                                        id="whatsapp"
                                        name="whatsapp"
                                        value={formData.whatsapp}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-orange focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                                        placeholder="(11) 99999-9999"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">E-mail</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-orange focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                                        placeholder="seu@email.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Mensagem</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-orange focus:ring-2 focus:ring-orange-100 outline-none transition-all resize-none"
                                        placeholder="Como podemos ajudar?"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-brand-orange text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-500/20 hover:bg-orange-600 hover:shadow-orange-500/40 hover:-translate-y-1 transition-all duration-300"
                                >
                                    Enviar mensagem
                                </button>
                                <p className="text-center text-xs text-slate-500 mt-4">
                                    Respondemos rapidamente pelo WhatsApp ou e-mail.
                                </p>
                            </form>
                        </div>
                    </motion.div>

                    {/* Right Column: Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-full lg:w-6/12 pt-4"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                            Entre em <span className="font-expressive text-brand-orange italic">Contato</span>
                        </h2>
                        <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-lg">
                            Esclareça dúvidas, solicite orçamentos personalizados ou converse com nossa equipe para organizar seu evento pedagógico.
                        </p>

                        <div className="space-y-8 mb-12">
                            {/* Email Block */}
                            <div className="flex items-start gap-4 group">
                                <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-colors duration-300 shrink-0">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-1">E-mail</h4>
                                    <a href="mailto:contato@alegrando.com.br" className="text-slate-600 hover:text-brand-orange transition-colors">contato@alegrando.com.br</a>
                                </div>
                            </div>

                            {/* WhatsApp Block */}
                            <div className="flex items-start gap-4 group">
                                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300 shrink-0">
                                    <MessageCircle size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-1">WhatsApp</h4>
                                    <a
                                        href="https://wa.me/5511916032904"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-slate-600 hover:text-green-600 transition-colors"
                                    >
                                        (11) 91603-2904
                                    </a>
                                </div>
                            </div>

                            {/* Location Block (Optional based on Footer, keeping it hidden if not requested, but good for completeness. User didn't request explicitly but footer has it.) */}
                            {/* Leaving out Location to strictly follow request "Bloco de contato direto: Email, WhatsApp" */}
                        </div>

                        {/* Social Icons */}
                        <div className="flex gap-4 mb-12">
                            <a
                                href="https://www.instagram.com/alegrando.eventos"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 border border-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:border-brand-orange hover:bg-brand-orange hover:text-white transition-all duration-300"
                                title="Instagram"
                            >
                                <Instagram size={20} />
                            </a>
                            <a
                                href="https://www.facebook.com/photo/?fbid=546620127500824&set=a.546620107500826"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 border border-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
                                title="Facebook"
                            >
                                <Facebook size={20} />
                            </a>
                        </div>

                        {/* Authority Block */}
                        <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-sm border border-slate-100">
                            <ShieldCheck className="text-brand-orange" size={20} />
                            <span className="text-slate-600 font-medium text-sm">Somos parceiros oficiais Neo Geo e especialistas em eventos.</span>
                        </div>

                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
