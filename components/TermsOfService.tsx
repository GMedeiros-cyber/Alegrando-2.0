import React from 'react';
import { FileText, CheckCircle, Bot, ShieldAlert, Copyright, Scale } from 'lucide-react';

const TermsOfService: React.FC = () => {
    return (
        <div className="bg-slate-50 min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-4xl">
                <h1 className="text-4xl font-heading font-bold text-slate-900 mb-4">Termos de Uso</h1>
                <p className="text-slate-500 mb-8">Leia atentamente antes de utilizar nosso site e serviços</p>

                <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 space-y-10 text-slate-600 leading-relaxed">
                    <p className="text-lg">
                        Bem-vindo ao site da <strong className="text-slate-800">Alegrando Eventos</strong> (CNPJ: 18.462.884/0001-61). Ao acessar e utilizar nosso site, incluindo a interação com nossa assistente virtual "Jade", você concorda com os termos e condições descritos abaixo.
                    </p>

                    {/* Seção 1 */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                            <FileText className="text-brand-orange shrink-0" size={24} />
                            1. Serviços oferecidos
                        </h2>
                        <p>
                            A Alegrando Eventos é especializada em turismo pedagógico, oferecendo roteiros educativos, monitoria especializada, transporte executivo e gestão completa de excursões escolares. Nossos serviços são contratados mediante proposta comercial específica, sujeita à confirmação e validação pela equipe humana.
                        </p>
                    </section>

                    {/* Seção 2 */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                            <Bot className="text-brand-orange shrink-0" size={24} />
                            2. Uso da Inteligência Artificial — Assistente "Jade"
                        </h2>
                        <p className="mb-4">
                            O site da Alegrando Eventos conta com a <strong>"Jade"</strong>, uma assistente virtual baseada em inteligência artificial. Ao utilizar a Jade, o usuário declara estar ciente dos seguintes pontos:
                        </p>
                        <ul className="list-disc pl-6 space-y-3 text-slate-600">
                            <li>A Jade é uma ferramenta de <strong>atendimento automatizado</strong>. Toda informação, sugestão de roteiro ou estimativa de valor fornecida por ela tem <strong>caráter preliminar e informativo</strong>.</li>
                            <li>Nenhum orçamento, roteiro ou compromisso gerado pela Jade constitui proposta comercial vinculante. Todas as informações estão <strong>sujeitas à confirmação e validação pela equipe humana</strong> da Alegrando Eventos.</li>
                            <li>Valores, disponibilidade e condições apresentados pela Jade podem sofrer alterações sem aviso prévio.</li>
                        </ul>
                    </section>

                    {/* Seção 3 */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                            <ShieldAlert className="text-brand-orange shrink-0" size={24} />
                            3. Aviso de segurança no chat
                        </h2>
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl mb-4">
                            <p className="text-slate-700 font-medium">
                                🚨 <strong>NÃO forneça dados sensíveis</strong> no chat da Jade ou em qualquer interação pelo site.
                            </p>
                        </div>
                        <p className="mb-4">São considerados dados sensíveis e que <strong>não devem ser compartilhados</strong>:</p>
                        <ul className="list-disc pl-6 space-y-2 text-slate-600">
                            <li>CPF, RG ou outros documentos de identificação pessoal;</li>
                            <li>Senhas de qualquer tipo;</li>
                            <li>Dados bancários, número de cartão de crédito ou informações financeiras;</li>
                            <li>Dados de saúde ou informações sobre menores de idade além do estritamente necessário.</li>
                        </ul>
                        <p className="mt-4">
                            A Alegrando Eventos <strong>nunca solicitará</strong> esses dados pelo chat. Caso receba alguma solicitação desse tipo, desconsidere e entre em contato conosco pelos canais oficiais.
                        </p>
                    </section>

                    {/* Seção 4 */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                            <CheckCircle className="text-brand-orange shrink-0" size={24} />
                            4. Responsabilidades
                        </h2>
                        <ul className="list-disc pl-6 space-y-2 text-slate-600">
                            <li>Comprometemo-nos a prestar serviços com qualidade, segurança e pontualidade.</li>
                            <li>O contratante é responsável por fornecer informações precisas sobre os alunos e necessidades específicas.</li>
                            <li>Não nos responsabilizamos por itens pessoais perdidos durante os eventos, embora nossa equipe sempre auxilie na busca.</li>
                        </ul>
                    </section>

                    {/* Seção 5 */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                            <Copyright className="text-brand-orange shrink-0" size={24} />
                            5. Propriedade intelectual
                        </h2>
                        <p>
                            Todo o conteúdo presente neste site — incluindo textos, imagens, fotografias, vídeos, logotipos, marcas ("Alegrando Eventos"), ícones e layout — é de propriedade exclusiva da Alegrando Eventos ou de seus licenciadores, protegido pela legislação brasileira de direitos autorais (Lei nº 9.610/1998) e de propriedade industrial (Lei nº 9.279/1996).
                        </p>
                        <p className="mt-3">
                            É <strong>expressamente proibido</strong> reproduzir, copiar, distribuir, modificar ou utilizar qualquer conteúdo deste site sem autorização prévia e por escrito da Alegrando Eventos.
                        </p>
                    </section>

                    {/* Seção 6 */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                            <Scale className="text-brand-orange shrink-0" size={24} />
                            6. Legislação aplicável
                        </h2>
                        <p>
                            Estes Termos de Uso são regidos pela legislação brasileira. Fica eleito o foro da Comarca de Guarulhos/SP para dirimir quaisquer controvérsias decorrentes deste documento.
                        </p>
                    </section>

                    <div className="border-t border-slate-100 pt-8 mt-8">
                        <p className="text-sm text-slate-500">
                            Ao continuar a navegar em nosso site, você declara estar ciente e de acordo com estes termos.
                        </p>
                        <p className="text-sm text-slate-400 mt-2">
                            Última atualização: 19 de março de 2026 — Alegrando Eventos — CNPJ: 18.462.884/0001-61
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
