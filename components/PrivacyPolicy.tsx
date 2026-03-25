import React from 'react';
import { Shield, Lock, Eye, MessageSquare, Database, UserCheck } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="bg-slate-50 min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-4xl">
                <h1 className="text-4xl font-heading font-bold text-slate-900 mb-4">Política de Privacidade</h1>
                <p className="text-slate-500 mb-8">Em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018)</p>

                <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 space-y-10 text-slate-600 leading-relaxed">
                    <p className="text-lg">
                        A <strong className="text-slate-800">Alegrando Eventos</strong> (CNPJ: 18.462.884/0001-61) valoriza a privacidade dos seus usuários e está comprometida com a proteção dos seus dados pessoais. Esta política explica, de forma clara e transparente, como tratamos as informações que você compartilha conosco.
                    </p>

                    {/* Seção 1 */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                            <Shield className="text-brand-orange shrink-0" size={24} />
                            1. Como seus dados são coletados
                        </h2>
                        <p className="mb-4">
                            O nosso site <strong>não possui formulários de cadastro tradicionais</strong>. A coleta de dados pessoais ocorre de forma <strong>voluntária</strong>, exclusivamente quando você:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-slate-600">
                            <li>Interage com a <strong>Jade</strong>, nossa assistente virtual de IA, digitando informações como nome, telefone, nome da escola ou e-mail no widget de chat;</li>
                            <li>Clica nos links de redirecionamento para nosso <strong>WhatsApp</strong> e decide fornecer dados durante a conversa;</li>
                            <li>Envia um <strong>e-mail</strong> para nosso endereço de contato.</li>
                        </ul>
                    </section>

                    {/* Seção 2 */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                            <MessageSquare className="text-brand-orange shrink-0" size={24} />
                            2. Dados coletados pelo Chatbot "Jade"
                        </h2>
                        <p className="mb-4">
                            Ao utilizar o widget de chat da Jade no nosso site, as mensagens enviadas são processadas pelo nosso sistema de backend e por inteligência artificial para:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-slate-600">
                            <li>Entender a necessidade da sua escola ou organização;</li>
                            <li>Sugerir roteiros pedagógicos adequados;</li>
                            <li>Fornecer estimativas preliminares de orçamento.</li>
                        </ul>
                        <p className="mt-4">
                            Durante essa interação, você poderá compartilhar dados como nome, cargo, nome da instituição, quantidade de alunos e data prevista. Para festas de aniversário, podem ser coletados adicionalmente: nome do responsável, telefone de contato, nome da criança, data de nascimento da criança e nome da escola ou instituição. Esses dados são tratados <strong>exclusivamente para a finalidade de atendimento comercial</strong>.
                        </p>
                    </section>

                    {/* Seção 3 */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                            <Lock className="text-brand-orange shrink-0" size={24} />
                            3. Finalidade e uso dos dados
                        </h2>
                        <p className="mb-4">Os dados pessoais coletados são utilizados estritamente para:</p>
                        <ul className="list-disc pl-6 space-y-2 text-slate-600">
                            <li>Atendimento comercial e montagem de roteiros personalizados;</li>
                            <li>Elaboração e envio de propostas de orçamento;</li>
                            <li>Comunicação relativa aos serviços contratados ou em negociação;</li>
                            <li>Cumprimento de obrigações legais e regulatórias;</li>
                            <li>Armazenamento em planilhas internas para acompanhamento comercial e follow-up pela equipe de atendimento (tanto para passeios quanto para festas).</li>
                        </ul>
                        <div className="bg-orange-50 border-l-4 border-brand-orange p-4 rounded-r-xl mt-6">
                            <p className="text-slate-700 font-medium">
                                ⚠️ Seus dados <strong>não são vendidos, alugados ou compartilhados com terceiros</strong> para fins publicitários ou comerciais de qualquer natureza.
                            </p>
                        </div>
                    </section>

                    {/* Seção 4 */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                            <Database className="text-brand-orange shrink-0" size={24} />
                            4. Armazenamento e segurança
                        </h2>
                        <p>
                            Adotamos medidas técnicas e organizacionais para proteger os dados pessoais contra acesso não autorizado, perda, alteração ou destruição. As informações são armazenadas em servidores com criptografia e controle de acesso, sendo acessadas apenas por profissionais autorizados para a finalidade descrita nesta política.
                        </p>
                    </section>

                    {/* Seção 5 */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                            <UserCheck className="text-brand-orange shrink-0" size={24} />
                            5. Direitos do titular dos dados
                        </h2>
                        <p className="mb-4">
                            Conforme a LGPD, você tem o direito de, a qualquer momento:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-slate-600">
                            <li><strong>Confirmar</strong> a existência de tratamento dos seus dados pessoais;</li>
                            <li><strong>Acessar</strong> os dados que temos armazenados sobre você;</li>
                            <li><strong>Corrigir</strong> dados incompletos, inexatos ou desatualizados;</li>
                            <li><strong>Solicitar a anonimização, bloqueio ou exclusão</strong> de dados desnecessários ou tratados em desconformidade;</li>
                            <li><strong>Revogar o consentimento</strong> dado anteriormente.</li>
                        </ul>
                        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl mt-6">
                            <p className="text-slate-700">
                                Para exercer qualquer um desses direitos, envie um e-mail para: <a href="mailto:contato@alegrando.com.br" className="text-brand-orange font-bold hover:underline">contato@alegrando.com.br</a>
                            </p>
                        </div>
                    </section>

                    {/* Seção 6 */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                            <Eye className="text-brand-orange shrink-0" size={24} />
                            6. Cookies e tecnologias de rastreamento
                        </h2>
                        <p>
                            Nosso site pode utilizar cookies essenciais para o funcionamento correto da plataforma. Não utilizamos cookies para fins de publicidade direcionada ou rastreamento de perfil comportamental.
                        </p>
                    </section>

                    <div className="border-t border-slate-100 pt-8 mt-8">
                        <p className="text-sm text-slate-500">
                            Última atualização: 25 de março de 2026
                        </p>
                        <p className="text-sm text-slate-400 mt-1">
                            Alegrando Eventos — CNPJ: 18.462.884/0001-61
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
