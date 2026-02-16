import React from 'react';
import { FileText, CheckCircle, AlertCircle } from 'lucide-react';

const TermsOfService: React.FC = () => {
    return (
        <div className="bg-slate-50 min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-4xl">
                <h1 className="text-4xl font-heading font-bold text-slate-900 mb-8">Termos de Uso</h1>

                <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 space-y-8 text-slate-600 leading-relaxed">
                    <p className="text-lg">
                        Bem-vindo à <strong>Alegrando Eventos</strong>. Ao acessar e utilizar nosso site e serviços, você concorda com os termos e condições descritos abaixo.
                    </p>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <FileText className="text-brand-orange" size={24} />
                            1. Serviços Oferecidos
                        </h2>
                        <p>
                            A Alegrando Eventos é especializada em turismo pedagógico, oferecendo roteiros educativos, monitoria especializada e gestão completa de excursões escolares. Nossos serviços são contratados mediante proposta comercial específica.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <CheckCircle className="text-brand-orange" size={24} />
                            2. Responsabilidades
                        </h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Comprometemo-nos a prestar serviços com qualidade, segurança e pontualidade.</li>
                            <li>O contratante é responsável por fornecer informações precisas sobre os alunos e necessidades específicas.</li>
                            <li>Não nos responsabilizamos por itens pessoais perdidos durante os eventos, embora nossa equipe sempre auxilie na busca.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <AlertCircle className="text-brand-orange" size={24} />
                            3. Cancelamentos e Alterações
                        </h2>
                        <p>
                            As políticas de cancelamento, reembolso e remarcação de datas estão detalhadas no contrato de prestação de serviços firmado com a instituição de ensino. Alterações climáticas que afetem a segurança podem ensejar o adiamento do evento.
                        </p>
                    </section>

                    <div className="border-t border-slate-100 pt-8 mt-8">
                        <p className="text-sm text-slate-500">
                            Ao continuar a navegar em nosso site, você declara estar ciente e de acordo com estes termos.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
