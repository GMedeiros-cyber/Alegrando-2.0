import React from 'react';
import { Facebook, Instagram, Mail } from 'lucide-react';
import logo from '../assets/alegrando.png';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">

          {/* Column 1: Brand */}
          <div className="flex flex-col gap-6">
            <img
              src={logo}
              alt="Alegrando Eventos"
              className="h-16 w-auto max-w-[180px] object-contain"
            />
            <p className="text-sm leading-relaxed max-w-xs">
              Transformando viagens escolares em jornadas de aprendizado e alegria desde 2007.
            </p>
          </div>

          {/* Column 2: Contact Info */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-bold text-lg mb-2">Contato</h3>
            <div className="space-y-3 text-sm">
              <p>Rua Antonieta Aguirre de Moraes Barros, 59 - Sala 06</p>
              <p>Vila Augusta - Guarulhos/SP</p>
              <div className="flex items-center gap-2 pt-2">
                <Mail size={16} className="text-brand-orange" />
                <a href="mailto:contato@alegrando.com.br" className="hover:text-white transition-colors">contato@alegrando.com.br</a>
              </div>
            </div>
          </div>

          {/* Column 3: Redes Sociais */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-bold text-lg mb-2">Redes Sociais</h3>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/alegrando.eventos"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-900 p-3 rounded-full hover:bg-brand-orange hover:text-white transition-all duration-300 group"
                title="Instagram"
              >
                <Instagram size={20} className="group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://www.facebook.com/photo/?fbid=546620127500824&set=a.546620107500826"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-900 p-3 rounded-full hover:bg-brand-orange hover:text-white transition-all duration-300 group"
                title="Facebook"
              >
                <Facebook size={20} className="group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="mailto:contato@alegrando.com.br"
                className="bg-slate-900 p-3 rounded-full hover:bg-brand-orange hover:text-white transition-all duration-300 group"
                title="E-mail"
              >
                <Mail size={20} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Column 4: Legal Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-bold text-lg mb-2">Legal</h3>
            <div className="flex flex-col gap-2 text-sm">
              <a href="/privacidade" className="hover:text-brand-orange transition-colors">Política de Privacidade</a>
              <a href="/termos" className="hover:text-brand-orange transition-colors">Termos de Uso</a>
            </div>
          </div>

        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs gap-4 text-center md:text-left">
          <div className="flex flex-col md:flex-row gap-2 md:gap-4">
            <p>© {new Date().getFullYear()} Alegrando Eventos. Todos os direitos reservados.</p>
            <span className="hidden md:inline text-slate-700">|</span>
            <p className="font-mono text-slate-500">CNPJ: 18.462.884/0001-61</p>
          </div>

          <a
            href="https://wa.me/5511951553538"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-50 hover:opacity-100 transition-opacity cursor-pointer hover:text-brand-orange"
          >
            Desenvolvido por Tribus Labs
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;