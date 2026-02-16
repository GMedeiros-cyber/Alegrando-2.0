import React from 'react';
import { BookOpen, CheckCircle, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <BookOpen className="w-10 h-10 text-brand-orange" />,
    title: "Da Teoria à Prática",
    description: "Transforma conteúdos escolares em experiências vivenciais, tornando o aprendizado mais significativo e memorável."
  },
  {
    icon: <CheckCircle className="w-10 h-10 text-brand-orange" />,
    title: "Logística Sem Esforço",
    description: "A Alegrando assume toda a logística, liberando os educadores para focarem exclusivamente no acompanhamento pedagógico."
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-brand-orange" />,
    title: "Segurança Inquestionável",
    description: "Oferecemos protocolos rígidos, equipe altamente treinada e comunicação ativa com a escola durante todo o roteiro."
  }
];

const Features: React.FC = () => {
  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="bg-slate-50 rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300 border border-slate-100 group"
            >
              <div className="mb-6 bg-white w-20 h-20 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold font-heading text-slate-900 mb-4 group-hover:text-brand-orange transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;