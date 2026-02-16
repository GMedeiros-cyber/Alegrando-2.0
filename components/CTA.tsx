import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const CTA: React.FC = () => {
  return (
    <section id="contato" className="py-24 bg-brand-dark relative overflow-hidden">
      {/* Abstract background shapes */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-orange/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-8">
            O Roteiro Perfeito Para os Seus Alunos Começa Aqui!
          </h2>
          <p className="text-xl text-slate-300 mb-10 font-light">
            A nossa equipe está pronta para criar uma experiência única, segura e pedagógica.
            Não deixe para a última hora.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-brand-orange text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/30 flex items-center justify-center gap-2 group">
              Fale com a nossa equipe
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-transparent border-2 border-slate-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-800 hover:border-slate-500 transition-all">
              Ver Catálogo Completo
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;