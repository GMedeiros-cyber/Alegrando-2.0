import React from 'react';

import Picture from './Picture';
// Import logos (AVIF + WebP responsivo)
import adventista from '../assets/adventista.webp?w=192;384&format=avif;webp&as=picture';
import autentico from '../assets/autentico.webp?w=192;384&format=avif;webp&as=picture';
import externato from '../assets/externato.webp?w=192;384&format=avif;webp&as=picture';
import winner from '../assets/winner.webp?w=192;384&format=avif;webp&as=picture';
import vinicius from '../assets/vinicius.webp?w=192;384&format=avif;webp&as=picture';

const schools = [
    { name: 'Colégio Adventista', logo: adventista, w: 420, h: 274 },
    { name: 'Colégio Autêntico', logo: autentico, w: 200, h: 146 },
    { name: 'Externato', logo: externato, w: 225, h: 225 },
    { name: 'Winner School', logo: winner, w: 371, h: 136 },
    { name: 'Colégio Vinicius de Moraes', logo: vinicius, w: 370, h: 102 },
];

const TrustedSchools: React.FC = () => {
    return (
        <section className="py-16 bg-white overflow-hidden">
            <div className="container mx-auto px-6 mb-12 text-center">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-slate-800">
                    Escolas que <span className="text-brand-orange font-expressive italic">confiam na gente</span>
                </h2>
                <div className="w-16 h-1 bg-brand-orange mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="relative w-full max-w-7xl mx-auto">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                <div className="flex overflow-hidden">
                    <div className="flex gap-12 md:gap-24 items-center animate-marquee">
                        {/* Double the array to create seamless loop */}
                        {[...schools, ...schools].map((school, index) => (
                            <div
                                key={`${school.name}-${index}`}
                                className="flex-shrink-0 w-32 md:w-48 grayscale hover:grayscale-0 transition-all duration-300 opacity-80 hover:opacity-100"
                            >
                                <Picture
                                    source={school.logo}
                                    alt={`Logo ${school.name}`}
                                    width={school.w}
                                    height={school.h}
                                    sizes="(max-width: 768px) 128px, 192px"
                                    className="w-full h-auto object-contain max-h-24"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustedSchools;
