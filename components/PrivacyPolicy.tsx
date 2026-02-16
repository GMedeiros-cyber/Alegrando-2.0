import React from 'react';
import { Shield, Lock, Eye } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="bg-slate-50 min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-4xl">
                <h1 className="text-4xl font-heading font-bold text-slate-900 mb-8">Política de Privacidade</h1>

                <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 space-y-8 text-slate-600 leading-relaxed">
                    <p className="text-lg">
                        A <strong>Alegrando Eventos</strong> (CNPJ: 18.462.884/0001-61) valoriza a privacidade de seus usuários e está comprometida com a proteção de seus dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
                    </p>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <Shield className="text-brand-orange" size={24} />
                            1. Coleta de Dados
                        </h2>
                        <p>
                            Coletamos apenas os dados necessários para a prestação de nossos serviços de turismo pedagógico, como nome, e-mail, telefone e informações da instituição de ensino. Esses dados podem ser fornecidos diretamente por você ao preencher nossos formulários ou entrar em contato conosco.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <Lock className="text-brand-orange" size={24} />
                            2. Uso das Informações
                        </h2>
                        <p className="mb-4">Utilizamos seus dados para:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Processar solicitações de orçamento e agendamentos;</li>
                            <li>Enviar comunicações sobre nossos roteiros e novidades (mediante consentimento);</li>
                            <li>Melhorar a experiência do usuário em nosso site;</li>
                            <li>Cumprir obrigações legais e regulatórias.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <Eye className="text-brand-orange" size={24} />
                            3. Seus Direitos
                        </h2>
                        <p>
                            Você tem o direito de solicitar o acesso, correção, anonimização ou exclusão de seus dados pessoais a qualquer momento. Para exercer esses direitos, entre em contato conosco através de nossos canais oficiais.
                        </p>
                    </section>

                    <div className="border-t border-slate-100 pt-8 mt-8">
                        <p className="text-sm text-slate-500">
                            Última atualização: {new Date().toLocaleDateString('pt-BR')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
