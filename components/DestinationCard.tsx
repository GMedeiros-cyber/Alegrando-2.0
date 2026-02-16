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
    reverse?: boolean; // Kept for compatibility but not used in new design
}

const DestinationCard: React.FC<DestinationCardProps> = ({ title, subtitle, images, categories }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (images.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 5000); // Slower transition for cinematic feel
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="relative w-full h-[550px] md:h-[600px] rounded-[2rem] overflow-hidden shadow-lg group hover:shadow-2xl transition-all duration-500 ease-out"
        >
            {/* Background Image Carousel */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="popLayout">
                    <motion.img
                        key={currentImageIndex}
                        src={images[currentImageIndex]}
                        alt={title}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="w-full h-full object-cover"
                    />
                </AnimatePresence>
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
            </div>

            {/* Content Container */}
            <div className="absolute inset-0 z-10 p-8 md:p-12 flex flex-col justify-end">

                {/* Top Section: Indicators */}
                <div className="absolute top-8 right-8 flex gap-2">
                    {images.map((_, idx) => (
                        <div
                            key={idx}
                            className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'w-8 bg-white' : 'w-2 bg-white/30'
                                }`}
                        />
                    ))}
                </div>

                <div className="relative z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {subtitle && (
                        <h4 className="text-orange-300 font-medium tracking-widest uppercase mb-3 text-sm md:text-base">
                            {subtitle}
                        </h4>
                    )}

                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-8 shadow-black drop-shadow-lg">
                        {title}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 text-slate-200">
                        {categories.map((cat, idx) => (
                            <div key={idx} className="border-l border-white/20 pl-4">
                                <h3 className="text-lg font-bold text-white mb-2">{cat.title}</h3>
                                <ul className="space-y-1 text-sm md:text-base font-light opacity-90">
                                    {cat.items.map((item, itemIdx) => (
                                        <li key={itemIdx}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-white/10 hover:bg-white text-white hover:text-slate-900 backdrop-blur-md border border-white/30 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider flex items-center gap-3 transition-all duration-300 group/btn w-fit"
                    >
                        Solicitar Orçamento
                        <ArrowUpRight className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default DestinationCard;
