import React from 'react';
import { motion } from 'framer-motion';

// Import logos
import adventista from '../assets/adventista.png';
import autentico from '../assets/autentico.png';
import externato from '../assets/externato.png';
import winner from '../assets/winner.png';
import vinicius from '../assets/vinicius.png';

const schools = [
    { name: 'Colégio Adventista', logo: adventista },
    { name: 'Colégio Autêntico', logo: autentico },
    { name: 'Externato', logo: externato },
    { name: 'Winner School', logo: winner },
    { name: 'Colégio Vinicius de Moraes', logo: vinicius },
];

const TrustedSchools: React.FC = () => {
    return (
        <section className="py-16 bg-white overflow-hidden">
            <div className="container mx-auto px-6 mb-12 text-center">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-slate-800">
                    Veja algumas das escolas que <span className="text-brand-orange">confiam na gente!</span>
                </h2>
                <div className="w-16 h-1 bg-brand-orange mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="relative w-full max-w-7xl mx-auto">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                <div className="flex overflow-hidden">
                    <motion.div
                        className="flex gap-12 md:gap-24 items-center"
                        animate={{
                            x: ["0%", "-50%"],
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 20,
                                ease: "linear",
                            },
                        }}
                    >
                        {/* Double the array to create seamless loop */}
                        {[...schools, ...schools].map((school, index) => (
                            <div
                                key={`${school.name}-${index}`}
                                className="flex-shrink-0 w-32 md:w-48 grayscale hover:grayscale-0 transition-all duration-300 opacity-80 hover:opacity-100"
                            >
                                <img
                                    src={school.logo}
                                    alt={`Logo ${school.name}`}
                                    className="w-full h-auto object-contain max-h-24"
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default TrustedSchools;
