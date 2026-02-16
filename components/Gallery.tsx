import React from 'react';
import { motion } from 'framer-motion';

const categories = [
  {
    title: "Aventura",
    // Substitua pelo caminho da sua imagem original: /images/aventura.jpg
    image: "/images/aventura.jpg",
    fallback: "https://images.unsplash.com/photo-1596464716127-f9a862557965?q=80&w=2070&auto=format&fit=crop",
    desc: "Desafios que unem."
  },
  {
    title: "Natureza",
    // Substitua pelo caminho da sua imagem original: /images/natureza.jpg
    image: "/images/natureza.jpg",
    fallback: "https://images.unsplash.com/photo-1544376798-89aa6b82c6cd?q=80&w=1974&auto=format&fit=crop",
    desc: "Aprendizado ao ar livre."
  },
  {
    title: "Cultura",
    // Substitua pelo caminho da sua imagem original: /images/cultura.jpg
    image: "/images/cultura.jpg",
    fallback: "https://images.unsplash.com/photo-1565063878170-c75266c5d9f5?q=80&w=2072&auto=format&fit=crop",
    desc: "História viva."
  }
];

const Gallery: React.FC = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-[600px] md:h-[500px]">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative rounded-3xl overflow-hidden group cursor-pointer h-full shadow-lg"
            >
              {/* Image with fallback handling logic implied (browser will try src first) */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{
                  backgroundImage: `url(${cat.image}), url(${cat.fallback})`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 opacity-80 group-hover:opacity-90" />

              <div className="absolute bottom-0 left-0 p-8 w-full">
                <h3 className="text-4xl font-heading font-bold text-white mb-2 transform translate-y-0 transition-transform duration-300 drop-shadow-lg">
                  {cat.title}
                </h3>
                <p className="text-white/90 text-lg font-light transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  {cat.desc}
                </p>
                <div className="h-1 w-0 bg-gradient-to-r from-orange-500 to-red-600 mt-4 transition-all duration-500 group-hover:w-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;