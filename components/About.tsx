import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import silvanaImage from '../assets/silvana.jpg';

const About: React.FC = () => {
  return (
    <section id="sobre" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-orange-50/50 skew-x-12 transform translate-x-20 z-0 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">

        {/* Pain Points Section (Dores dos Professores) */}
        <div className="max-w-6xl mx-auto mb-32 relative pt-12">

          {/* Header Title - Top Left */}
          <div className="absolute top-0 left-0 md:left-10 z-20 max-w-md">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 leading-tight">
              Entendemos as <span className="text-brand-orange">dores</span> de professores e coordenadores!
            </h2>
          </div>

          <div className="relative flex flex-col items-center justify-center min-h-[600px] md:min-h-[700px] mt-16 md:mt-0">

            {/* Central Image - Stressed Teacher */}
            <div className="relative z-10 w-full max-w-md mx-auto">
              <img
                src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600&auto=format&fit=crop"
                alt="Professora sobrecarregada"
                className="w-full h-auto object-contain rounded-2xl relative z-20"
              />
            </div>

            {/* Pain Points - Absolute Positioning for Desktop, Stacked for Mobile */}

            {/* 1. Top Right - Teoria */}
            <div className="md:absolute md:top-20 md:right-0 max-w-xs text-center md:text-left mt-8 md:mt-0">
              <div className="hidden md:block absolute -left-16 top-4 w-16 h-12">
                <svg viewBox="0 0 100 50" fill="none" className="text-brand-orange w-full h-full transform -scale-x-100">
                  <path d="M0 40 C 30 40, 30 10, 60 10 S 90 40, 100 20" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </div>
              <p className="text-slate-700 font-medium text-lg">
                Sentem falta de complemento educativo com a <span className="font-bold">teoria em sala.</span>
              </p>
            </div>

            {/* 2. Middle Right - Engajar */}
            <div className="md:absolute md:top-1/2 md:-translate-y-1/2 md:right-0 max-w-xs text-center md:text-left mt-8 md:mt-0">
              <div className="hidden md:block absolute -left-20 top-0 w-20 h-8">
                <svg viewBox="0 0 100 20" fill="none" className="text-brand-orange w-full h-full">
                  <path d="M0 10 Q 50 -10 100 10" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </div>
              <p className="text-slate-700 font-medium text-lg">
                Possuem grande desafio em <span className="font-bold">engajar</span> os alunos nos conteúdos.
              </p>
            </div>

            {/* 3. Bottom Right - Retenção */}
            <div className="md:absolute md:bottom-20 md:right-10 max-w-xs text-center md:text-left mt-8 md:mt-0">
              <div className="hidden md:block absolute -left-16 top-0 w-16 h-12">
                <svg viewBox="0 0 100 50" fill="none" className="text-brand-orange w-full h-full">
                  <path d="M0 10 C 20 40, 50 0, 100 20" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </div>
              <p className="text-slate-700 font-medium text-lg">
                Necessitam de uma didática inovadora com foco em <span className="font-bold">retenção de alunos.</span>
              </p>
            </div>

            {/* 4. Left Top - Segurança */}
            <div className="md:absolute md:top-1/3 md:left-0 max-w-xs text-center md:text-right mt-8 md:mt-0">
              <div className="hidden md:block absolute -right-24 top-4 w-24 h-12">
                <svg viewBox="0 0 100 50" fill="none" className="text-brand-orange w-full h-full">
                  <path d="M0 20 C 30 0, 60 40, 100 10" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </div>
              <p className="text-slate-700 font-medium text-lg">
                Preocupações com a <span className="font-bold">segurança dos alunos</span> fora da escola.
              </p>
            </div>

            {/* 5. Left Bottom - Tempo */}
            <div className="md:absolute md:bottom-32 md:left-10 max-w-xs text-center md:text-right mt-8 md:mt-0">
              <div className="hidden md:block absolute -right-20 top-0 w-20 h-12">
                <svg viewBox="0 0 100 50" fill="none" className="text-brand-orange w-full h-full">
                  <path d="M0 30 Q 50 50 100 10" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </div>
              <p className="text-slate-700 font-medium text-lg">
                <span className="font-bold">Não ter tempo</span> para organizar excursões e atividades além das demandas comuns.
              </p>
            </div>

          </div>
        </div>

        {/* Founder Section */}
        <div className="flex flex-col md:flex-row items-center gap-16 mb-24">

          {/* Silvana Image (Left) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:w-1/2 flex justify-center"
          >
            <div className="relative w-full max-w-sm mx-auto">
              {/* Image Frame Effect (Orange Wrapper) */}
              <div className="absolute -inset-4 rounded-[2rem] border border-brand-orange transform -rotate-2 scale-105 pointer-events-none z-0" />

              <div className="relative rounded-[1.5rem] overflow-hidden shadow-2xl w-full aspect-[3/4] z-10 bg-slate-900">
                <img
                  src={silvanaImage}
                  alt="Silvana Moura - Fundadora"
                  className="w-full h-full object-cover opacity-90 grayscale hover:grayscale-0 transition-all duration-500"
                />
                {/* Floating Badge */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white px-6 py-2 rounded-full shadow-lg text-center min-w-[180px]">
                  <p className="font-bold text-slate-900 text-base">Silvana Moura</p>
                  <p className="text-[10px] text-brand-orange uppercase tracking-widest font-bold">Fundadora</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Founder Bio (Right) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:w-1/2 space-y-6"
          >
            {/* Title Realigned Here */}
            <div className="mb-6">
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 leading-tight">
                Mais de 18 anos de paixão por <span className="text-brand-orange relative inline-block">
                  transformar
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-brand-orange opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                  </svg>
                </span> a educação.
              </h2>
              <p className="text-sm text-slate-500 mt-4 leading-relaxed">
                A Alegrando nasceu do encantamento por proporcionar experiências inesquecíveis fora da sala de aula.
                Nossa fundadora iniciou sua trajetória em 2007, e o comprometimento em despertar a confiança dos educadores nos levou a voos mais altos.
              </p>
            </div>

            <h3 className="text-2xl md:text-3xl font-heading font-bold text-slate-900">
              Uma virada de chave
            </h3>

            <div className="space-y-4 text-lg text-slate-600 leading-relaxed font-light">
              <p>
                Com mais de 15 anos de experiência na área de educação e turismo, Silvana fundou a Alegrando Eventos com o propósito de transformar viagens escolares em verdadeiras jornadas de aprendizado e alegria.
              </p>
              <div className="border-l-4 border-brand-orange pl-6 py-2 mt-6">
                <p className="font-medium text-slate-800 italic text-xl">
                  "Nossa missão é proporcionar experiências seguras, educativas e inesquecíveis, que contribuam para o desenvolvimento integral dos alunos."
                </p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Jade Chatbot CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] p-8 md:p-12 text-center relative overflow-hidden shadow-2xl"
        >
          {/* Decorative Background Circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange rounded-full blur-[100px] opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500 rounded-full blur-[80px] opacity-20 transform -translate-x-1/2 translate-y-1/2"></div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 bg-white rounded-full p-1 shadow-lg mb-6 relative">
              <div className="w-full h-full bg-slate-100 rounded-full flex items-center justify-center overflow-hidden">
                {/* Placeholder for Jade Avatar - Using a bot icon for now or generic avatar */}
                <img
                  src="https://api.dicebear.com/7.x/bottts/svg?seed=Jade"
                  alt="Jade IA"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 border-4 border-slate-900 rounded-full"></div>
            </div>

            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Está com dúvidas?
            </h2>
            <p className="text-slate-300 text-lg mb-8 max-w-lg mx-auto">
              Experimente conversar com a <span className="text-brand-orange font-bold">Jade</span>, nossa assistente virtual especialista em turismo pedagógico!
            </p>

            <button className="bg-brand-orange hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-full shadow-lg shadow-orange-500/30 transition-all hover:scale-105 flex items-center gap-3 group">
              <span>Conversar com Jade</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;