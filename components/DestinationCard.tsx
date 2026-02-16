import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface Category {
    title: string;
    items: string[];
}

interface DestinationCardProps {
    title: string;
    subtitle?: string;
    images: string[];
    categories: Category[];
    reverse?: boolean;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ title, subtitle, images, categories }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (images.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 4000); // Change image every 4 seconds
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col md:flex-row h-full w-full bg-slate-50 rounded-3xl overflow-hidden shadow-2xl my-4 hover:shadow-[0_20px_50px_rgba(255,107,53,0.15)] transition-shadow duration-300`}
        >
            {/* Image Section (Carousel) - Left Side (50%) */}
            <div className="w-full md:w-1/2 relative overflow-hidden group h-[300px] md:h-auto shrink-0">
                <div className="absolute inset-0 bg-slate-900/10 z-10 transition-opacity group-hover:opacity-0 pointer-events-none" />

                <AnimatePresence mode="popLayout">
                    <motion.img
                        key={currentImageIndex}
                        src={images[currentImageIndex]}
                        alt={title}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </AnimatePresence>

                {/* Carousel Indicators - Orange Bar Style */}
                <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2">
                    {images.map((_, idx) => (
                        <div
                            key={idx}
                            className={`transition-all duration-300 rounded-full border border-white/20 shadow-sm ${idx === currentImageIndex
                                ? 'w-10 h-3 bg-brand-orange border-none'
                                : 'w-3 h-3 bg-white/70 backdrop-blur-sm'
                                }`}
                        />
                    ))}
                </div>

                {/* Decorative elements */}
                <div className="absolute top-6 left-6 z-20 pointer-events-none">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                        <div className="w-3 h-3 bg-brand-orange rounded-full animate-pulse" />
                    </div>
                </div>
            </div>

            {/* Content Section - Right Side (50%) */}
            <div className="w-full md:w-1/2 bg-brand-orange text-white p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                <div className="relative z-10">
                    {subtitle && (
                        <h4 className="text-orange-100 font-fun tracking-widest uppercase mb-2 text-xl md:text-2xl opacity-90">
                            {subtitle}
                        </h4>
                    )}
                    <h2 className="text-4xl md:text-6xl font-fun font-bold mb-6 leading-none tracking-wide">
                        {title}
                    </h2>

                    <div className="space-y-6">
                        {categories.map((cat, idx) => (
                            <div key={idx}>
                                <h3 className="text-xl font-fun tracking-wide mb-2 flex items-center gap-2 text-orange-100">
                                    <span className="w-2 h-6 bg-white/20 rounded-full" />
                                    {cat.title}
                                </h3>
                                <ul className="pl-4 space-y-1">
                                    {cat.items.map((item, itemIdx) => (
                                        <li key={itemIdx} className="flex items-start gap-2 text-orange-50/90 text-base font-medium">
                                            <span className="mt-2 w-1.5 h-1.5 bg-white rounded-full flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-10 bg-white text-brand-orange px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 w-fit shadow-lg hover:shadow-xl transition-all font-heading uppercase tracking-wider"
                    >
                        Solicitar Orçamento
                        <ArrowUpRight className="w-5 h-5" />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default DestinationCard;
