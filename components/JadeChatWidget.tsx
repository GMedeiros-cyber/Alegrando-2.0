import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';
import logoUrl from '../assets/logo.webp';

// ─── Configuration ───────────────────────────────────────────────────────────
const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL;
const WEBHOOK_ROUTE = 'general';
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;
const WEBHOOK_FESTA_LEAD = import.meta.env.VITE_WEBHOOK_FESTA_LEAD;

// Cliente Supabase inicializado sob demanda (somente na 1ª consulta), não no load do módulo.
let _supabaseClient: ReturnType<typeof createClient> | null = null;
const getSupabaseClient = () => {
  if (!_supabaseClient) _supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
  return _supabaseClient;
};

// ─── CSS (injected on mount) ─────────────────────────────────────────────────
const WIDGET_CSS = `
/* Pacifico self-hosted via @fontsource (importada em index.tsx) */
/* Container */
#chat-widget-container {
  position: fixed;
  bottom: 96px;
  right: 24px;
  width: 350px;
  height: 520px;
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.15), 0 0 20px rgba(255, 107, 53, 0.05);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 10000;
  animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  border: 1px solid rgba(0, 0, 0, 0.05);
}
#chat-widget-header {
  background: #ffffff;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0,0,0,0.05);
  box-shadow: 0 2px 10px rgba(0,0,0,0.02);
  z-index: 10;
}
.chat-header-info { display: flex; align-items: center; gap: 12px; }
.chat-logo-header { width: 48px; height: 48px; object-fit: contain; border-radius: 50%; background: #f8fafc; padding: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
.chat-title-group { display: flex; flex-direction: column; }
.chat-title { font-family: 'Montserrat', sans-serif; font-weight: 700; color: #0F172A; font-size: 16px; line-height: 1.2; }
.chat-subtitle { font-size: 12px; color: #64748b; font-weight: 500; }
#chat-widget-body { flex: 1; padding: 20px; overflow-y: auto; background: #fafaf9; display: flex; flex-direction: column; gap: 14px; scroll-behavior: smooth; }
#chat-widget-body::-webkit-scrollbar { width: 4px; }
#chat-widget-body::-webkit-scrollbar-thumb { background-color: rgba(0,0,0,0.1); border-radius: 4px; }
.jade-message { padding: 14px 18px; border-radius: 16px; font-size: 15px; line-height: 1.5; max-width: 85%; word-wrap: break-word; position: relative; }
.jade-message.user { background: #FF6B35; color: white; align-self: flex-end; border-bottom-right-radius: 4px; box-shadow: 0 4px 12px rgba(255,107,53,0.2); }
.jade-message.bot { background: #B8D4E3; color: #1e293b; align-self: flex-start; border-bottom-left-radius: 4px; border: none; box-shadow: 0 4px 12px rgba(148,196,220,0.25); }
.jade-message.error { background: #fef2f2; color: #ef4444; border: 1px solid #fecaca; font-size: 13px; align-self: center; }
#chat-widget-footer { padding: 16px 20px; background: #ffffff; border-top: 1px solid rgba(0,0,0,0.05); z-index: 10; }
.jade-input-group { display: flex; gap: 10px; background: #f1f5f9; padding: 6px; border-radius: 16px; border: 1px solid transparent; transition: all 0.2s ease; }
.jade-input-group:focus-within { background: #ffffff; border-color: #FF6B35; box-shadow: 0 0 0 3px rgba(255,107,53,0.1); }
.jade-input-group.input-highlight { background: #fff7ed !important; border-color: #FF6B35 !important; box-shadow: 0 0 0 3px rgba(255,107,53,0.1); }
#chat-widget-input { flex: 1; padding: 10px 12px; border-radius: 10px; border: none; outline: none; background: transparent; font-size: 15px; color: #0F172A; }
#chat-widget-input::placeholder { color: #94a3b8; }
#chat-widget-send { background: #FF6B35; color: white; border: none; padding: 8px; width: 40px; height: 40px; border-radius: 12px; cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(255,107,53,0.3); }
#chat-widget-send:hover { background: #e85d2e; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(255,107,53,0.4); }
#chat-widget-send:disabled { background: #cbd5e1; box-shadow: none; transform: none; cursor: not-allowed; }
#chat-widget-button { position: fixed; bottom: 24px; right: 24px; height: 64px; border-radius: 32px; background: #ffffff; border: 2px solid #FF6B35; cursor: pointer; box-shadow: 0 10px 25px -5px rgba(255,107,53,0.4); display: flex; align-items: center; gap: 12px; transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1); z-index: 10000; padding: 0 20px 0 8px; }
#chat-widget-button:hover { transform: scale(1.05) translateY(-4px); box-shadow: 0 15px 30px -5px rgba(255,107,53,0.5); background: #fff7ed; }
#chat-widget-button.open { width: 56px; height: 56px; border-radius: 50%; padding: 0; justify-content: center; gap: 0; }
#chat-widget-button.open .chat-button-text { display: none; }
#chat-widget-button.open .chat-button-icon-wrapper { box-shadow: none; background: transparent; width: 40px; height: 40px; }
.chat-button-icon-wrapper { width: 48px; height: 48px; background: #ffffff; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
.chat-button-icon { width: 36px; height: 36px; object-fit: contain; }
.chat-button-text { color: #FF6B35; font-family: 'Pacifico', cursive; font-style: normal; font-weight: 400; font-size: 19px; white-space: nowrap; display: flex; align-items: center; gap: 5px; }
.chat-button-jade { font-family: 'Pacifico', cursive; font-style: normal; font-weight: 400; font-size: 19px; color: #FF6B35; line-height: 1; }
@media (max-width: 640px) {
  #chat-widget-container { width: 100vw; height: 100vh; height: 100dvh; bottom: 0; right: 0; border-radius: 0; box-shadow: none; border: none; }
  #chat-widget-button { bottom: 16px; right: 16px; padding: 0; width: 56px; height: 56px; justify-content: center; }
  .chat-button-text { display: none; }
  .chat-button-icon-wrapper { box-shadow: none; background: transparent; }
  .jade-options-grid { grid-template-columns: 1fr; }
  .jade-message { max-width: 90%; }
  #chat-widget-footer { padding-bottom: max(16px, env(safe-area-inset-bottom)); }
}
@keyframes slideIn { from { opacity: 0; transform: translateY(20px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
.jade-whatsapp-cta-button { background-color: #25D366; color: white; text-decoration: none; padding: 12px 18px; border-radius: 12px; font-weight: 600; font-size: 14px; display: inline-flex; align-items: center; gap: 10px; box-shadow: 0 4px 12px rgba(37,211,102,0.2); transition: all 0.2s ease; margin-top: 10px; margin-bottom: 4px; border: none; cursor: pointer; }
.jade-whatsapp-cta-button:hover { background-color: #128C7E; transform: translateY(-2px); box-shadow: 0 6px 16px rgba(37,211,102,0.3); }
.jade-message.bot strong { color: #0F172A; font-weight: 700; }
.jade-message.user strong { color: #ffffff; font-weight: 700; }
.jade-options-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.jade-option-btn { background: #ffffff; border: 1px solid rgba(0,0,0,0.06); padding: 14px 12px; border-radius: 12px; cursor: pointer; font-weight: 600; color: #334155; transition: all 0.2s ease; text-align: center; font-size: 14px; box-shadow: 0 2px 6px rgba(0,0,0,0.02); }
.jade-option-btn:hover:not(:disabled) { border-color: #FF6B35; background: #fff7ed; color: #FF6B35; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(255,107,53,0.1); }
.jade-option-btn.selected { background: #FF6B35; color: white; border-color: #FF6B35; box-shadow: 0 4px 12px rgba(255,107,53,0.2); }
.jade-form-container { display: flex; flex-direction: column; gap: 12px; background: #ffffff; padding: 18px; border-radius: 16px; border: 1px solid rgba(0,0,0,0.05); box-shadow: 0 4px 12px rgba(0,0,0,0.02); }
.jade-form-input { width: 100%; padding: 10px 14px; border: 1px solid #e2e8f0; border-radius: 10px; font-size: 14px; outline: none; transition: all 0.2s; background: #f8fafc; color: #0F172A; box-sizing: border-box; }
.jade-form-input:focus { background: #ffffff; border-color: #FF6B35; box-shadow: 0 0 0 3px rgba(255,107,53,0.1); }
.jade-form-label { font-size: 12px; font-weight: 600; color: #64748b; margin-bottom: 4px; display: block; margin-left: 4px; }
.jade-action-btn { background: #FF6B35; color: white; border: none; padding: 12px; border-radius: 10px; font-weight: 600; cursor: pointer; width: 100%; margin-top: 10px; transition: all 0.2s; box-shadow: 0 4px 12px rgba(255,107,53,0.2); }
.jade-action-btn:hover:not(:disabled) { background: #e85d2e; transform: translateY(-1px); box-shadow: 0 6px 16px rgba(255,107,53,0.3); }
.jade-action-btn:disabled { background: #cbd5e1; box-shadow: none; cursor: not-allowed; }
.jade-secondary-btn { background: #ffffff; border: 1px solid #e2e8f0; color: #475569; padding: 10px; border-radius: 10px; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s; width: 100%; margin-top: 6px; }
.jade-secondary-btn:hover { background: #f8fafc; border-color: #cbd5e1; color: #0F172A; }
.jade-input-wrapper { position: relative; flex: 1; display: flex; }
.jade-input-hint { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); white-space: nowrap; font-size: 14px; color: #94a3b8; pointer-events: none; }
.jade-typing-indicator-container { display: flex; align-items: flex-end; gap: 8px; margin-top: 4px; margin-bottom: 4px; max-width: 85%; }
.jade-typing-logo-wrapper { width: 32px; height: 32px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 6px rgba(0,0,0,0.08); animation: levitate 2s ease-in-out infinite; flex-shrink: 0; border: 1px solid rgba(0,0,0,0.04); }
.jade-typing-logo { width: 20px; height: 20px; object-fit: contain; }
@keyframes levitate { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
.jade-typing-bubble { background: #B8D4E3; border: none; box-shadow: 0 4px 12px rgba(148,196,220,0.25); padding: 10px 14px; border-radius: 16px; border-bottom-left-radius: 4px; display: flex; gap: 4px; align-items: center; height: 36px; }
.jade-typing-dot { width: 6px; height: 6px; background: #64748b; border-radius: 50%; animation: typingBounce 1.4s infinite ease-in-out both; }
.jade-typing-dot:nth-child(1) { animation-delay: -0.32s; }
.jade-typing-dot:nth-child(2) { animation-delay: -0.16s; }
@keyframes typingBounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }
`;

// ─── Types ───────────────────────────────────────────────────────────────────
type ChatStep = 'start' | 'categoria' | 'cooperativa_destinos' | 'destino' | 'dados' | 'confirmacao' | 'duvida_input' | 'duvida_encerrada' | 'duvidas' | 'encerrado' | 'festa_opcao' | 'festa_pacote' | 'festa_dados' | 'festa_confirmacao';

interface FlowState {
  currentStep: ChatStep;
  tipoOrganizacao: string | null;
  categoria: string | null;
  destino: string | null;
  nome: string | null;
  cargo: string | null;
  grupo: string | null;
  qtd: string | null;
  data: string | null;
  offset: number;
  searchMode: boolean;
  finalizado: boolean;
  festaOpcao: string | null;
  nomeResponsavel: string | null;
  telefone: string | null;
  nomeCrianca: string | null;
  dataNascimento: string | null;
  nomeEscolaInstituicao: string | null;
}

type ChatItem =
  | { kind: 'bot'; id: string; html: string }
  | { kind: 'user'; id: string; text: string }
  | { kind: 'error'; id: string; html: string }
  | { kind: 'options'; id: string; options: { label: string; value: string }[]; selectedValue: string | null; onSelect: (v: string) => void }
  | { kind: 'actions'; id: string; buttons: { label: string; isHtml?: boolean; onClick: () => void }[] }
  | { kind: 'form'; id: string; tipoOrganizacao: string; onSubmit: (d: { nome: string; cargo?: string; grupo: string; qtd: string; data: string }) => void }
  | { kind: 'typing'; id: string }
  | { kind: 'standalone-btn'; id: string; label: string; isHtml?: boolean; onClick: () => void }
  | { kind: 'festa_form'; id: string; onSubmit: (d: { nomeResponsavel: string; telefone: string; nomeCrianca: string; dataNascimento: string }) => void };

// ─── Helpers ─────────────────────────────────────────────────────────────────
let _uid = 0;
function uid() { return 'j' + (++_uid) + '_' + Math.random().toString(36).slice(2, 6); }

function getChatId() {
  let chatId = sessionStorage.getItem('chatId');
  if (!chatId) {
    chatId = 'chat_' + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('chatId', chatId);
  }
  return chatId;
}

function parseMarkdown(text: string) {
  if (!text) return text;
  let parsed = text;
  parsed = parsed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  parsed = parsed.replace(/\n/g, '<br>');
  return parsed;
}

const WHATSAPP_SVG = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>`;

function parseWhatsAppLinks(text: string) {
  if (!text) return text;
  const whatsappRegex = /(https:\/\/wa\.me\/\d+[^\s<]*)/g;
  return text.replace(whatsappRegex, (url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="jade-whatsapp-cta-button">${WHATSAPP_SVG} Finalizar Orçamento no WhatsApp</a>`;
  });
}

function sanitizeHtml(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/on\w+\s*=\s*[^\s>]*/gi, '')
    .replace(/<iframe\b[^>]*>/gi, '')
    .replace(/<object\b[^>]*>/gi, '')
    .replace(/<embed\b[^>]*>/gi, '')
    .replace(/javascript\s*:/gi, '')
    .replace(/data\s*:\s*text\/html/gi, '')
    .replace(/<svg\b[^>]*onload[^>]*>/gi, '')
    .replace(/href\s*=\s*["']\s*javascript/gi, 'href="');
}

function parseBotContent(text: string) {
  return sanitizeHtml(parseWhatsAppLinks(parseMarkdown(text)));
}

function formatDateBR(dateStr: string): string {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
  return dateStr;
}

const INITIAL_FLOW: FlowState = {
  currentStep: 'start',
  tipoOrganizacao: null,
  categoria: null,
  destino: null,
  nome: null,
  cargo: null,
  grupo: null,
  qtd: null,
  data: null,
  offset: 0,
  searchMode: false,
  finalizado: false,
  festaOpcao: null,
  nomeResponsavel: null,
  telefone: null,
  nomeCrianca: null,
  dataNascimento: null,
  nomeEscolaInstituicao: null,
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function OptionsGrid({ options, selectedValue, onSelect }: {
  options: { label: string; value: string }[];
  selectedValue: string | null;
  onSelect: (v: string) => void;
}) {
  const [localSelected, setLocalSelected] = useState<string | null>(selectedValue);

  useEffect(() => { setLocalSelected(selectedValue); }, [selectedValue]);

  const handleClick = (value: string) => {
    if (localSelected !== null) return;
    setLocalSelected(value);
    onSelect(value);
  };

  return (
    <div className="jade-options-grid">
      {options.map((opt) => (
        <button
          key={opt.value}
          className={`jade-option-btn${localSelected === opt.value ? ' selected' : ''}`}
          disabled={localSelected !== null}
          style={localSelected !== null && localSelected !== opt.value ? { opacity: 0.5 } : undefined}
          onClick={() => handleClick(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function ExtraActions({ buttons }: { buttons: { label: string; isHtml?: boolean; onClick: () => void }[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
      {buttons.map((btn, i) => (
        <button
          key={i}
          className="jade-secondary-btn"
          onClick={btn.onClick}
          {...(btn.isHtml ? { dangerouslySetInnerHTML: { __html: btn.label } } : { children: btn.label })}
        />
      ))}
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="jade-typing-indicator-container">
      <div className="jade-typing-logo-wrapper">
        <img src={logoUrl} alt="Jade" width={256} height={206} loading="lazy" decoding="async" className="jade-typing-logo" />
      </div>
      <div className="jade-typing-bubble">
        <div className="jade-typing-dot" />
        <div className="jade-typing-dot" />
        <div className="jade-typing-dot" />
      </div>
    </div>
  );
}

function ChatForm({ tipoOrganizacao, onSubmit, submitted }: {
  tipoOrganizacao: string;
  onSubmit: (d: { nome: string; cargo?: string; grupo: string; qtd: string; data: string }) => void;
  submitted: boolean;
}) {
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [grupo, setGrupo] = useState('');
  const [qtd, setQtd] = useState('');
  const [data, setData] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    setError('');
    if (!nome || !qtd || !data || !grupo) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    const qtdInt = parseInt(qtd);
    if (!qtdInt || qtdInt < 1) {
      setError('A quantidade de alunos deve ser maior que 0.');
      return;
    }
    const selectedDate = new Date(data);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    if (selectedDate < now) {
      setError('A data do passeio deve ser hoje ou futura.');
      return;
    }
    onSubmit({ nome, cargo: cargo || undefined, grupo, qtd, data });
  };

  return (
    <div className="jade-form-container">
      <div>
        <label className="jade-form-label">Seu Nome</label>
        <input type="text" className="jade-form-input" placeholder="Nome completo" value={nome} onChange={e => setNome(e.target.value)} disabled={submitted} />
      </div>
      {tipoOrganizacao === 'escola' && (
        <>
          <div>
            <label className="jade-form-label">Cargo</label>
            <select className="jade-form-input" value={cargo} onChange={e => setCargo(e.target.value)} disabled={submitted}>
              <option value="">Selecione...</option>
              <option value="Diretor">Diretor</option>
              <option value="Coordenador">Coordenador</option>
              <option value="Professor">Professor</option>
              <option value="Outro">Outro</option>
            </select>
          </div>
          <div>
            <label className="jade-form-label">Nome da Escola/Instituição</label>
            <input type="text" className="jade-form-input" placeholder="Ex: Escola Viver" value={grupo} onChange={e => setGrupo(e.target.value)} disabled={submitted} />
          </div>
        </>
      )}
      {tipoOrganizacao !== 'escola' && (
        <div>
          <label className="jade-form-label">Nome do Transportador / Cooperativa</label>
          <input type="text" className="jade-form-input" placeholder="Ex: Transportadora ABC" value={grupo} onChange={e => setGrupo(e.target.value)} disabled={submitted} />
        </div>
      )}
      <div>
        <label className="jade-form-label">Quantidade de Alunos (Aprox.)</label>
        <input type="number" className="jade-form-input" min={1} step={1} placeholder="Ex: 40" value={qtd} onChange={e => setQtd(e.target.value)} disabled={submitted} />
      </div>
      <div>
        <label className="jade-form-label">Data Prevista</label>
        <DatePicker value={data} onChange={setData} disabled={submitted} futureOnly={true} />
      </div>
      {error && (
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '10px 14px', borderRadius: 10, fontSize: 13, fontWeight: 500, textAlign: 'center', marginTop: 4 }}>
          {error}
        </div>
      )}
      <button className="jade-action-btn" disabled={submitted} onClick={handleSubmit}>
        {submitted ? 'Dados Enviados' : 'Continuar'}
      </button>
    </div>
  );
}

function DatePicker({ value, onChange, disabled, futureOnly = false }: {
  value: string;
  onChange: (date: string) => void;
  disabled: boolean;
  futureOnly?: boolean;
}) {
  const today = new Date();
  const defaultYear = futureOnly ? today.getFullYear() : today.getFullYear() - 7;
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(() => value ? parseInt(value.split('-')[0]) : defaultYear);
  const [viewMonth, setViewMonth] = useState(() => value ? parseInt(value.split('-')[1]) - 1 : today.getMonth());
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handle = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [open]);

  const displayValue = value ? value.split('-').reverse().join('/') : '';
  const MONTH_FULL = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  const DAYS = ['D','S','T','Q','Q','S','S'];
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let i = 1; i <= daysInMonth; i++) cells.push(i);

  const prevMonth = () => viewMonth === 0 ? (setViewYear(y => y - 1), setViewMonth(11)) : setViewMonth(m => m - 1);
  const nextMonth = () => viewMonth === 11 ? (setViewYear(y => y + 1), setViewMonth(0)) : setViewMonth(m => m + 1);
  const selectDay = (day: number) => {
    const m = String(viewMonth + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    onChange(`${viewYear}-${m}-${d}`);
    setOpen(false);
  };
  const btnBase: React.CSSProperties = { border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8 };

  return (
    <div ref={pickerRef} style={{ position: 'relative' }}>
      <button type="button" disabled={disabled} onClick={() => !disabled && setOpen(o => !o)}
        style={{ width: '100%', padding: '10px 14px', border: `1px solid ${open ? '#FF6B35' : '#e2e8f0'}`, borderRadius: 10, fontSize: 14, background: open ? '#fff' : '#f8fafc', color: value ? '#0F172A' : '#94a3b8', cursor: disabled ? 'default' : 'pointer', display: 'flex', alignItems: 'center', gap: 8, textAlign: 'left', boxShadow: open ? '0 0 0 3px rgba(255,107,53,0.1)' : 'none', transition: 'all 0.2s', boxSizing: 'border-box' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.4, flexShrink: 0 }}>
          <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        {displayValue || 'Selecione a data'}
      </button>
      {open && (
        <div style={{ position: 'absolute', bottom: 'calc(100% + 8px)', left: 0, right: 0, background: '#fff', borderRadius: 16, boxShadow: '0 8px 32px rgba(0,0,0,0.14)', border: '1px solid #f1f5f9', padding: 16, zIndex: 200 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <button type="button" onClick={prevMonth} style={{ ...btnBase, padding: '4px 10px', color: '#64748b', fontSize: 20 }}>‹</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontWeight: 600, fontSize: 14, color: '#334155' }}>{MONTH_FULL[viewMonth]}</span>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <button type="button" onClick={() => setViewYear(y => y + 1)} style={{ ...btnBase, padding: '0 6px', color: '#94a3b8', fontSize: 10, lineHeight: 1.2 }}>▲</button>
                <span style={{ fontWeight: 700, fontSize: 15, color: '#FF6B35', lineHeight: 1.4 }}>{viewYear}</span>
                <button type="button" onClick={() => setViewYear(y => y - 1)} style={{ ...btnBase, padding: '0 6px', color: '#94a3b8', fontSize: 10, lineHeight: 1.2 }}>▼</button>
              </div>
            </div>
            <button type="button" onClick={nextMonth} style={{ ...btnBase, padding: '4px 10px', color: '#64748b', fontSize: 20 }}>›</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, marginBottom: 4 }}>
            {DAYS.map((d, i) => <div key={i} style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: '#94a3b8', padding: '2px 0' }}>{d}</div>)}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
            {cells.map((day, i) => {
              if (!day) return <div key={i} />;
              const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const isSel = value === dateStr;
              const todayStr = today.toISOString().split('T')[0];
              const isPast = futureOnly && dateStr < todayStr;
              return (
                <button key={i} type="button" onClick={() => !isPast && selectDay(day)} disabled={isPast}
                  style={{ border: 'none', borderRadius: 8, padding: '6px 0', cursor: isPast ? 'default' : 'pointer', fontSize: 13, fontWeight: isSel ? 700 : 400, background: isSel ? '#FF6B35' : 'transparent', color: isSel ? '#fff' : isPast ? '#cbd5e1' : '#334155', transition: 'background 0.1s' }}>
                  {day}
                </button>
              );
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', marginTop: 10, paddingTop: 10 }}>
            <button type="button" onClick={() => { onChange(''); setOpen(false); }} style={{ ...btnBase, padding: '4px 8px', fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>Limpar</button>
            <button type="button" onClick={() => { setViewYear(today.getFullYear()); setViewMonth(today.getMonth()); }} style={{ ...btnBase, padding: '4px 8px', fontSize: 12, color: '#FF6B35', fontWeight: 600 }}>Hoje</button>
          </div>
        </div>
      )}
    </div>
  );
}

function FestaForm({ onSubmit, submitted }: {
  onSubmit: (d: { nomeResponsavel: string; telefone: string; nomeCrianca: string; dataNascimento: string }) => void;
  submitted: boolean;
}) {
  const [nomeResponsavel, setNomeResponsavel] = useState('');
  const [telefone, setTelefone] = useState('');
  const [nomeCrianca, setNomeCrianca] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    setError('');
    if (!nomeResponsavel || !telefone || !nomeCrianca || !dataNascimento) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    onSubmit({ nomeResponsavel, telefone, nomeCrianca, dataNascimento });
  };

  return (
    <div className="jade-form-container">
      <div>
        <label className="jade-form-label">Nome do Responsável</label>
        <input type="text" className="jade-form-input" placeholder="Nome completo" value={nomeResponsavel} onChange={e => setNomeResponsavel(e.target.value)} disabled={submitted} />
      </div>
      <div>
        <label className="jade-form-label">Telefone de Contato</label>
        <input type="tel" className="jade-form-input" placeholder="(11) 99999-9999" value={telefone} onChange={e => setTelefone(e.target.value)} disabled={submitted} />
      </div>
      <div>
        <label className="jade-form-label">Nome da Criança</label>
        <input type="text" className="jade-form-input" placeholder="Nome da criança" value={nomeCrianca} onChange={e => setNomeCrianca(e.target.value)} disabled={submitted} />
      </div>
      <div>
        <label className="jade-form-label">Data de Nascimento da Criança</label>
        <DatePicker value={dataNascimento} onChange={setDataNascimento} disabled={submitted} />
      </div>
      {error && (
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '10px 14px', borderRadius: 10, fontSize: 13, fontWeight: 500, textAlign: 'center', marginTop: 4 }}>
          {error}
        </div>
      )}
      <button className="jade-action-btn" disabled={submitted} onClick={handleSubmit}>
        {submitted ? 'Dados Enviados' : 'Continuar'}
      </button>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function JadeChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [flow, setFlow] = useState<FlowState>({ ...INITIAL_FLOW });
  const [items, setItems] = useState<ChatItem[]>([]);
  const [inputEnabled, setInputEnabled] = useState(false);
  const [inputPlaceholder, setInputPlaceholder] = useState('Selecione uma opção acima...');
  const [inputHighlight, setInputHighlight] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [hintVisible, setHintVisible] = useState(false);

  const chatBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const flowRef = useRef<FlowState>(flow);
  const itemsRef = useRef<ChatItem[]>(items);
  const isOpenRef = useRef(false);
  const timersRef = useRef<number[]>([]);
  const handleSendRef = useRef<((msg?: string) => void) | null>(null);

  // Keep refs in sync
  useEffect(() => { flowRef.current = flow; }, [flow]);
  useEffect(() => { itemsRef.current = items; }, [items]);
  useEffect(() => { isOpenRef.current = isOpen; }, [isOpen]);

  // Inject CSS
  useEffect(() => {
    const style = document.createElement('style');
    style.setAttribute('data-jade-widget', '');
    style.textContent = WIDGET_CSS;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  // ScrollToBottom
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [items]);

  // Focus input when enabled
  useEffect(() => {
    if (inputEnabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputEnabled]);

  // Hint visibility derived from showHint
  useEffect(() => {
    setHintVisible(showHint);
  }, [showHint]);

  // Cleanup timers
  useEffect(() => {
    return () => { timersRef.current.forEach(t => clearTimeout(t)); };
  }, []);

  // ─── Flow helpers ────────────────────────────────────────────────────────

  const addBotMsg = useCallback((html: string) => {
    const item: ChatItem = { kind: 'bot', id: uid(), html: parseBotContent(html) };
    setItems(prev => [...prev, item]);
  }, []);

  const addUserMsg = useCallback((text: string) => {
    setItems(prev => [...prev, { kind: 'user', id: uid(), text }]);
  }, []);

  const configureInput = useCallback((step: ChatStep, searchMode: boolean) => {
    const enabled = step === 'duvida_input' || searchMode;
    setInputEnabled(enabled);
    if (enabled) {
      if (searchMode) {
        setInputPlaceholder('Digite o nome do destino...');
        setInputHighlight(false);
        setShowHint(false);
      } else if (step === 'duvida_input') {
        setInputPlaceholder('');
        setInputHighlight(true);
        setShowHint(true);
      } else {
        setInputPlaceholder('Digite sua dúvida...');
        setInputHighlight(false);
        setShowHint(false);
      }
    } else {
      setInputPlaceholder('Selecione uma opção acima...');
      setInputHighlight(false);
      setShowHint(false);
    }
  }, []);

  // ─── Core step execution (replaces renderStep + transitionTo + goBackTo) ──

  const executeStep = useCallback(async (step: ChatStep, mode: 'append' | 'replace') => {
    const f = flowRef.current;
    const newFlow = { ...f, currentStep: step };

    configureInput(step, newFlow.searchMode);

    const newItems: ChatItem[] = [];

    switch (step) {
      case 'start': {
        // start always clears
        mode = 'replace';
        newItems.push({ kind: 'bot', id: uid(), html: parseBotContent('Olá! 👋 Bem-vindo à Alegrando Eventos.<br><br>Eu sou a Jade. Para começarmos, você está organizando o passeio como:') });

        const gridId = uid();
        newItems.push({
          kind: 'options', id: gridId,
          options: [
            { label: 'Escola/Instituição', value: 'escola' },
            { label: 'Transportador / Cooperativa', value: 'cooperativa' },
            { label: 'Festas Neo Geo', value: 'festa' },
          ],
          selectedValue: null,
          onSelect: (value: string) => {
            setItems(prev => prev.map(it => it.id === gridId ? { ...it, selectedValue: value } as ChatItem : it));

            if (value === 'festa') {
              setItems(prev => [...prev, { kind: 'user', id: uid(), text: 'Festas Neo Geo' }]);
              setFlow(prev => ({ ...prev, tipoOrganizacao: value }));
              setTimeout(() => executeStep('festa_opcao', 'append'), 0);
            } else if (value === 'escola') {
              setItems(prev => [...prev, { kind: 'user', id: uid(), text: 'Organizando como: Escola/Instituição' }]);
              setFlow(prev => ({ ...prev, tipoOrganizacao: value }));
              setTimeout(() => executeStep('categoria', 'append'), 0);
            } else {
              setItems(prev => [...prev, { kind: 'user', id: uid(), text: 'Organizando como: Transportador / Cooperativa' }]);
              setFlow(prev => ({ ...prev, tipoOrganizacao: value }));
              setTimeout(() => executeStep('cooperativa_destinos', 'append'), 0);
            }
          },
        });
        newItems.push({
          kind: 'actions', id: uid(),
          buttons: [
            { label: 'Tenho uma dúvida', onClick: () => executeStep('duvida_input', 'append') },
            { label: '🎉 Dúvidas sobre Festas Neo Geo', onClick: () => window.open('https://wa.me/5511978976354?text=Ol%C3%A1!%20Gostaria%20de%20tirar%20d%C3%BAvidas%20sobre%20as%20festas%20de%20anivers%C3%A1rio%20nas%20unidades%20Neo%20Geo.', '_blank') },
            { label: '↺ Recomeçar Opções', isHtml: true, onClick: () => doRestart() },
          ],
        });
        break;
      }

      case 'categoria': {
        newItems.push({ kind: 'bot', id: uid(), html: parseBotContent('Qual a categoria de passeio que você prefere?') });

        const catOptions = [
          { label: 'Estudos do Meio', value: 'estudos_do_meio' },
          { label: 'História e Cultura', value: 'historia_e_cultura' },
          { label: 'Institutos de Pesquisa', value: 'institutos_de_pesquisa' },
          { label: 'Museus', value: 'museus' },
          { label: 'Natureza', value: 'natureza' },
          { label: 'Teatros', value: 'teatros' },
          { label: 'Temáticos', value: 'tematicos' },
        ];

        const gridId = uid();
        newItems.push({
          kind: 'options', id: gridId,
          options: catOptions,
          selectedValue: null,
          onSelect: (value: string) => {
            setItems(prev => prev.map(it => it.id === gridId ? { ...it, selectedValue: value } as ChatItem : it));
            setItems(prev => [...prev, { kind: 'user', id: uid(), text: `Categoria: ${catOptions.find(c => c.value === value)?.label || value}` }]);
            setFlow(prev => ({ ...prev, categoria: value, offset: 0 }));
            setTimeout(() => executeStep('destino', 'append'), 0);
          },
        });

        newItems.push({
          kind: 'actions', id: uid(),
          buttons: [
            { label: 'Tenho uma dúvida', onClick: () => executeStep('duvida_input', 'append') },
            { label: '↺ Recomeçar', isHtml: true, onClick: () => doRestart() },
          ],
        });
        break;
      }

      case 'destino': {
        const currentFlow = flowRef.current;
        const offset = currentFlow.offset;

        if (offset === 0) {
          newItems.push({ kind: 'bot', id: uid(), html: parseBotContent('Buscando as melhores opções para você...') });
        } else {
          newItems.push({ kind: 'bot', id: uid(), html: parseBotContent('Carregando mais opções...') });
        }

        setFlow(prev => ({ ...prev, currentStep: step }));
        if (mode === 'replace') { setItems(newItems); } else { setItems(prev => [...prev, ...newItems]); }

        try {
          const limit = 6;
          let query = getSupabaseClient()
            .from('documents')
            .select('id, content, categoria, destaque')
            .order('destaque', { ascending: false })
            .range(offset, offset + limit - 1);

          if (currentFlow.categoria) {
            query = query.eq('categoria', currentFlow.categoria);
          }

          const { data: destData, error } = await query;
          if (error) throw error;

          if (!destData || destData.length === 0) {
            if (offset === 0) {
              setItems(prev => [
                ...prev,
                { kind: 'bot', id: uid(), html: parseBotContent('Não encontrei opções nesta categoria. Quer ver outras categorias ou falar com a Jade?') },
                {
                  kind: 'actions', id: uid(),
                  buttons: [
                    { label: '🔙 Ver outras categorias', onClick: () => doGoBackTo('categoria') },
                    { label: 'Tenho uma dúvida', onClick: () => executeStep('duvida_input', 'append') },
                    { label: '↺ Recomeçar', isHtml: true, onClick: () => doRestart() },
                  ],
                },
              ]);
            } else {
              setItems(prev => [
                ...prev,
                { kind: 'bot', id: uid(), html: parseBotContent('Essas são todas as opções que encontrei por enquanto.') },
                ...buildSearchButtons(false),
              ]);
            }
            return;
          }

          if (offset === 0) {
            setItems(prev => [...prev, { kind: 'bot', id: uid(), html: parseBotContent('Aqui estão algumas opções incríveis:') }]);
          }

          const uniqueTitles = new Set<string>();
          const destinationOptions: { label: string; value: string }[] = [];

          destData.forEach((d: any) => {
            const content = d.content || '';
            const firstLine = content.split('\n')[0] || '';
            let title = firstLine.replace(/^#\s*/, '').replace('Passeio', '').trim();
            title = title.replace(/\(\d+\)$/, '').trim();
            if (title && title.length > 2 && !uniqueTitles.has(title)) {
              uniqueTitles.add(title);
              destinationOptions.push({ label: title, value: title });
            }
          });

          if (destinationOptions.length === 0 && offset === 0) {
            addBotMsg('Encontrei registros mas sem títulos claros. Pode descrever o que busca?');
            executeStep('duvidas', 'append');
            return;
          }

          const gridId = uid();
          const hasMore = destData.length === limit;

          setItems(prev => [
            ...prev,
            {
              kind: 'options', id: gridId,
              options: destinationOptions,
              selectedValue: null,
              onSelect: (value: string) => {
                setItems(prev => prev.map(it => it.id === gridId ? { ...it, selectedValue: value } as ChatItem : it));
                // Remove extra-actions containers
                setItems(prev => prev.filter(it => it.kind !== 'actions'));
                setItems(prev => [...prev, { kind: 'user', id: uid(), text: `Tenho interesse em: ${value}` }]);
                setFlow(prev => ({ ...prev, destino: value }));
                setTimeout(() => executeStep('dados', 'append'), 0);
              },
            },
            ...buildSearchButtons(hasMore),
          ]);
        } catch (err) {
          console.error('Erro Supabase:', err);
          addBotMsg('Tive um problema para carregar os destinos. Pode me dizer qual você procura?');
          executeStep('duvidas', 'append');
        }
        return; // Already handled
      }

      case 'cooperativa_destinos': {
        newItems.push({ kind: 'bot', id: uid(), html: parseBotContent('Estes são os destinos disponíveis para Transportadores e Cooperativas:') });

        const destinos = [
          { label: 'Aquário de São Paulo', value: 'Aquário de São Paulo' },
          { label: 'Park Neo Geo', value: 'Park Neo Geo' },
          { label: 'Sitiolândia', value: 'Sitiolândia' },
          { label: 'Zoológico de São Paulo', value: 'Zoológico de São Paulo' },
        ];

        const coopGridId = uid();
        newItems.push({
          kind: 'options', id: coopGridId,
          options: destinos,
          selectedValue: null,
          onSelect: (value: string) => {
            setItems(prev => prev.map(it => it.id === coopGridId ? { ...it, selectedValue: value } as ChatItem : it));
            setItems(prev => [...prev, { kind: 'user', id: uid(), text: `Tenho interesse em: ${value}` }]);
            setFlow(prev => ({ ...prev, destino: value }));
            setTimeout(() => executeStep('dados', 'append'), 0);
          },
        });

        newItems.push({
          kind: 'actions', id: uid(),
          buttons: [
            { label: 'Tenho uma dúvida', onClick: () => executeStep('duvida_input', 'append') },
            { label: '↺ Recomeçar', isHtml: true, onClick: () => doRestart() },
          ],
        });
        break;
      }

      case 'dados': {
        const currentFlow = flowRef.current;
        const formId = uid();
        newItems.push({ kind: 'bot', id: uid(), html: parseBotContent('Para agilizar seu orçamento, preciso de alguns dados:') });
        newItems.push({
          kind: 'form', id: formId,
          tipoOrganizacao: currentFlow.tipoOrganizacao || 'escola',
          onSubmit: (formData) => {
            setFlow(prev => ({
              ...prev,
              nome: formData.nome,
              cargo: formData.cargo || null,
              grupo: formData.grupo,
              qtd: formData.qtd,
              data: formData.data,
            }));
            // Mark form as submitted by replacing it
            setItems(prev => prev.map(it => it.id === formId ? { ...it, onSubmit: () => { } } as ChatItem : it));
            setTimeout(() => executeStep('confirmacao', 'append'), 0);
          },
        });
        break;
      }

      case 'confirmacao': {
        setFlow(prev => ({ ...prev, currentStep: step }));
        const t = window.setTimeout(() => {
          const f = flowRef.current;
          const baseUrl = 'https://wa.me/5511916032904';
          const grupoLabel = f.tipoOrganizacao === 'escola'
            ? `Escola/Instituição ${f.grupo || ''}`
            : `Transportador / Cooperativa ${f.grupo || ''}`;
          const msg = `Olá! Falei com a Jade. Gostaria de cotar o roteiro *${f.destino}* para *${grupoLabel}* com *${f.qtd}* alunos. Data prevista: *${formatDateBR(f.data || '')}*. Responsável: ${f.nome} (${f.cargo || 'Responsável'}).`;
          const fullUrl = `${baseUrl}?text=${encodeURIComponent(msg)}`;

          setItems(prev => [
            ...prev,
            { kind: 'bot', id: uid(), html: parseBotContent('Clique abaixo para finalizar no WhatsApp:') },
            { kind: 'bot', id: uid(), html: parseBotContent(fullUrl) },
          ]);
          setFlow(prev => ({ ...prev, finalizado: true }));
          setTimeout(() => executeStep('duvida_encerrada', 'append'), 0);
        }, 800);
        timersRef.current.push(t);
        return;
      }

      case 'festa_opcao': {
        newItems.push({
          kind: 'bot', id: uid(), html: parseBotContent(
            '🎉 Bem-vindo ao melhor ambiente preparado para sua celebração e diversão! Escolha a unidade desejada:'
          )
        });

        const gridId = uid();
        newItems.push({
          kind: 'options', id: gridId,
          options: [
            { label: 'Parque Shopping Barueri', value: 'barueri' },
            { label: 'Morumbi Town Shopping', value: 'morumbi' },
            { label: 'Shopping Internacional Guarulhos', value: 'guarulhos' },
          ],
          selectedValue: null,
          onSelect: (value: string) => {
            setItems(prev => prev.map(it => it.id === gridId ? { ...it, selectedValue: value } as ChatItem : it));
            const labels: Record<string, string> = {
              barueri: 'Parque Shopping Barueri',
              morumbi: 'Morumbi Town Shopping',
              guarulhos: 'Shopping Internacional Guarulhos',
            };
            setItems(prev => [...prev, { kind: 'user', id: uid(), text: labels[value] }]);
            setFlow(prev => ({ ...prev, festaOpcao: value }));
            setTimeout(() => executeStep('festa_pacote', 'append'), 0);
          },
        });

        newItems.push({
          kind: 'actions', id: uid(),
          buttons: [
            { label: 'Tenho uma dúvida', onClick: () => executeStep('duvida_input', 'append') },
            { label: '↺ Recomeçar', isHtml: true, onClick: () => doRestart() },
          ],
        });
        break;
      }

      case 'festa_pacote': {
        newItems.push({
          kind: 'bot', id: uid(), html: parseBotContent(
            'Ótimo! Agora escolha o pacote:\n\n' +
            '**Opção 1 — Cartão + Salão**\n' +
            'Acesso livre às atrações do Neo Geo + salão exclusivo. Mín. 20 cartões.\n\n' +
            '**Opção 2 — Menu Encanto**\n' +
            'Opção 1 + buffet completo: bolo, docinhos, salgadinhos e bebidas. Parceria Cristalino Bistrô. Mín. 30 convidados.\n\n' +
            '**Opção 3 — Menu Diversão**\n' +
            'Como o Menu Encanto, mas com variedade premium de sabores e bebidas. Mín. 30 convidados.'
          )
        });

        const pacoteGridId = uid();
        newItems.push({
          kind: 'options', id: pacoteGridId,
          options: [
            { label: 'Cartão + Salão', value: 'opcao1' },
            { label: 'Cartão + Salão + Buffet Menu Encanto', value: 'opcao2' },
            { label: 'Cartão + Salão + Buffet Menu Diversão', value: 'opcao3' },
          ],
          selectedValue: null,
          onSelect: (value: string) => {
            setItems(prev => prev.map(it => it.id === pacoteGridId ? { ...it, selectedValue: value } as ChatItem : it));
            const labels: Record<string, string> = {
              opcao1: 'Cartão + Salão',
              opcao2: 'Buffet Menu Encanto',
              opcao3: 'Buffet Menu Diversão',
            };
            setItems(prev => [...prev, { kind: 'user', id: uid(), text: labels[value] }]);
            setFlow(prev => ({ ...prev, festaOpcao: `${prev.festaOpcao} | ${labels[value]}` }));
            setTimeout(() => executeStep('festa_dados', 'append'), 0);
          },
        });

        newItems.push({
          kind: 'actions', id: uid(),
          buttons: [
            { label: 'Tenho uma dúvida', onClick: () => executeStep('duvida_input', 'append') },
            { label: '↺ Recomeçar', isHtml: true, onClick: () => doRestart() },
          ],
        });
        break;
      }

      case 'festa_dados': {
        const formId = uid();
        newItems.push({ kind: 'bot', id: uid(), html: parseBotContent('Para preparar o orçamento da festa, preciso de alguns dados:') });
        newItems.push({
          kind: 'festa_form', id: formId,
          onSubmit: (formData) => {
            setFlow(prev => ({
              ...prev,
              nomeResponsavel: formData.nomeResponsavel,
              telefone: formData.telefone,
              nomeCrianca: formData.nomeCrianca,
              dataNascimento: formData.dataNascimento,
            }));
            setItems(prev => prev.map(it => it.id === formId ? { ...it, onSubmit: () => { } } as ChatItem : it));
            setTimeout(() => executeStep('festa_confirmacao', 'append'), 0);
          },
        });
        break;
      }

      case 'festa_confirmacao': {
        setFlow(prev => ({ ...prev, currentStep: step }));
        const t = window.setTimeout(async () => {
          const f = flowRef.current;

          const baseUrl = 'https://wa.me/5511978976354';

          const msg = `Olá! Falei com a Jade no site. Gostaria de cotar uma *festa de aniversário*.\n\n` +
            `*Unidade/Pacote:* ${f.festaOpcao}\n` +
            `*Responsável:* ${f.nomeResponsavel}\n` +
            `*Telefone:* ${f.telefone}\n` +
            `*Criança:* ${f.nomeCrianca}\n` +
            `*Nascimento:* ${formatDateBR(f.dataNascimento || '')}`;

          // Salvar lead no n8n → Google Sheets
          try {
            await fetch(WEBHOOK_FESTA_LEAD, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                nomeResponsavel: f.nomeResponsavel,
                telefone: f.telefone,
                nomeCrianca: f.nomeCrianca,
                dataNascimento: formatDateBR(f.dataNascimento || ''),
                pacote: f.festaOpcao,
                dataHora: new Date().toISOString(),
              }),
            });
          } catch (_) { /* silencioso — não bloqueia o fluxo */ }

          const fullUrl = `${baseUrl}?text=${encodeURIComponent(msg)}`;

          setItems(prev => [
            ...prev,
            { kind: 'bot', id: uid(), html: parseBotContent('Clique abaixo para finalizar no WhatsApp:') },
            { kind: 'bot', id: uid(), html: `<a href="${fullUrl}" target="_blank" rel="noopener noreferrer" class="jade-whatsapp-cta-button">${WHATSAPP_SVG} Finalizar Orçamento de Festa no WhatsApp</a>` },
          ]);
          setFlow(prev => ({ ...prev, finalizado: true }));
          setTimeout(() => executeStep('duvida_encerrada', 'append'), 0);
        }, 800);
        timersRef.current.push(t);
        return;
      }

      case 'duvida_input': {
        // Input is enabled by configureInput above — nothing else to render
        break;
      }

      case 'duvida_encerrada': {
        const btns: { label: string; isHtml?: boolean; onClick: () => void }[] = [];
        btns.push({ label: '🧭 Montar Roteiro', onClick: () => doRestart() });
        btns.push({ label: 'Tenho outra dúvida', onClick: () => executeStep('duvida_input', 'append') });
        newItems.push({ kind: 'actions', id: uid(), buttons: btns });
        break;
      }

      case 'duvidas': {
        newItems.push({
          kind: 'standalone-btn', id: uid(),
          label: '🧭 Montar Roteiro', isHtml: true,
          onClick: () => executeStep('start', 'replace'),
        });
        break;
      }

      case 'encerrado':
        break;
    }

    setFlow(prev => ({ ...prev, currentStep: step }));

    if (newItems.length > 0) {
      const botMessages = newItems.filter(i => i.kind === 'bot' || i.kind === 'options');
      if (botMessages.length > 0) {
        const typingId = uid();
        setItems(prev => [...prev, { kind: 'typing', id: typingId }]);
        await new Promise(res => setTimeout(res, 500));
        setItems(prev => prev.filter(i => i.id !== typingId));
      }
      if (mode === 'replace') {
        setItems(newItems);
      } else {
        setItems(prev => [...prev, ...newItems]);
      }
    }
  }, [addBotMsg, configureInput]);

  // Build search buttons helper (returns items, doesn't set state)
  function buildSearchButtons(hasMore: boolean): ChatItem[] {
    const btns: { label: string; isHtml?: boolean; onClick: () => void }[] = [];
    if (hasMore) {
      btns.push({
        label: '➕ Mais opções',
        onClick: () => {
          setFlow(prev => ({ ...prev, offset: prev.offset + 6 }));
          setTimeout(() => executeStep('destino', 'append'), 0);
        },
      });
    }
    btns.push({ label: '🔙 Quero outro destino', onClick: () => doGoBackTo('categoria') });
    btns.push({ label: '↺ Recomeçar', isHtml: true, onClick: () => doRestart() });
    return [{ kind: 'actions' as const, id: uid(), buttons: btns }];
  }

  const doRestart = useCallback(() => {
    timersRef.current.forEach(t => clearTimeout(t));
    timersRef.current = [];
    setFlow({ ...INITIAL_FLOW });
    setItems([]);
    setInputValue('');
    setInputEnabled(false);
    setInputHighlight(false);
    setShowHint(false);
    submittedFormsRef.current.clear();
    setTimeout(() => executeStep('start', 'replace'), 50);
  }, [executeStep]);

  const doGoBackTo = useCallback((step: ChatStep) => {
    setFlow(prev => ({ ...prev, currentStep: step }));
    setItems([]);
    setTimeout(() => executeStep(step, 'replace'), 0);
  }, [executeStep]);

  // ─── Rate limiting ─────────────────────────────────────────────────────
  const lastSendRef = useRef(0);
  const SEND_COOLDOWN = 3000;

  // ─── Send message (for duvida_input / search / duvidas) ──────────────────

  const sendMessage = useCallback(async (overrideMessage?: string) => {
    const f = flowRef.current;

    if (f.currentStep !== 'duvida_input' && !f.searchMode && f.currentStep !== 'duvidas') {
      console.warn('Blocked message send in step:', f.currentStep);
      return;
    }

    const message = overrideMessage || inputValue.trim();
    if (!message) return;

    // Rate limiting
    const now = Date.now();
    if (now - lastSendRef.current < SEND_COOLDOWN) return;
    lastSendRef.current = now;

    // Message length limit
    if (message.length > 500) {
      addBotMsg('Sua mensagem é muito longa. Pode resumir sua dúvida em poucas palavras?');
      setInputEnabled(true);
      return;
    }

    // Frontend guardrails — block prompt injection attempts
    const BLOCKED_PATTERNS = [
      /ignore\s+(your|suas?|as)\s+(instru|regras?|rules)/i,
      /system\s*prompt/i,
      /atue?\s+como/i,
      /finja\s+que/i,
      /pretend\s+(you|to\s+be)/i,
      /jailbreak/i,
      /DAN\s+mode/i,
      /ignore\s+previous/i,
      /override/i,
      /reveal\s+(your|the)\s+(prompt|instructions)/i,
    ];
    if (BLOCKED_PATTERNS.some(p => p.test(message))) {
      addBotMsg('Sou a Jade, assistente da Alegrando Eventos! Posso te ajudar com informações sobre nossos passeios pedagógicos ou festas de aniversário.');
      setTimeout(() => executeStep('duvida_encerrada', 'append'), 0);
      return;
    }

    addUserMsg(message);
    setInputValue('');
    setInputEnabled(false);

    sessionStorage.setItem('jade_interaction_started', 'true');

    // Typing indicator
    const typingId = uid();
    setItems(prev => [...prev, { kind: 'typing', id: typingId }]);

    const payload: any = {
      chatId: getChatId(),
      message,
      route: WEBHOOK_ROUTE,
      contexto: {
        currentStep: f.currentStep,
        tipoOrganizacao: f.tipoOrganizacao,
        categoria: f.categoria,
        destino: f.destino,
      },
    };
    if (f.searchMode) {
      payload.tipo = 'verificar_destino';
      payload.texto = message;
    }

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(15000),
      });

      // Remove typing
      setItems(prev => prev.filter(it => it.id !== typingId));

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      if (f.searchMode) {
        if (data.encontrado && data.nome) {
          setFlow(prev => ({ ...prev, searchMode: false, destino: data.nome }));
          addBotMsg(`Encontrei! O destino é: <strong>${data.nome}</strong>`);
          setTimeout(() => executeStep('dados', 'append'), 0);
        } else {
          addBotMsg(data.output || 'Não encontrei esse destino exato. Pode tentar outro nome ou verificar a lista?');
          setInputEnabled(true);
        }
      } else {
        addBotMsg(data.output || 'Desculpe, não entendi.');
        setInputHighlight(false);
        setTimeout(() => executeStep('duvida_encerrada', 'append'), 0);
      }
    } catch (err) {
      setItems(prev => prev.filter(it => it.id !== typingId));
      console.error('Erro na comunicação com o assistente:', err);
      addBotMsg('Estamos com problemas técnicos no momento. Por favor, <a href="https://wa.me/5511916032904" target="_blank" rel="noopener noreferrer" class="jade-whatsapp-cta-button" style="display:inline-flex; margin-top:8px;">fale conosco pelo WhatsApp</a>');
      setInputEnabled(true);
    }
  }, [inputValue, addUserMsg, addBotMsg, executeStep]);

  // ─── window.openJadeWidget / closeChatWidget ─────────────────────────────

  useEffect(() => {
    window.openJadeWidget = (initialMessage?: string) => {
      setIsOpen(true);
      sessionStorage.setItem('jade_auto_triggered', 'true');

      if (initialMessage) {
        executeStep('duvidas', 'append');
        setTimeout(() => {
          setInputValue(initialMessage);
          setTimeout(() => handleSendRef.current?.(), 50);
        }, 300);
      } else {
        if (flowRef.current.currentStep === 'start' && itemsRef.current.length === 0) {
          executeStep('start', 'replace');
        }
      }
    };

    window.closeChatWidget = () => {
      setIsOpen(false);
    };

    return () => {
      delete (window as any).openJadeWidget;
      delete (window as any).closeChatWidget;
    };
  }, [executeStep]);

  // ─── Auto-trigger (8 seconds) ────────────────────────────────────────────

  useEffect(() => {
    if (sessionStorage.getItem('jade_auto_triggered') === 'true') return;

    const timer = setTimeout(() => {
      if (sessionStorage.getItem('jade_auto_triggered') === 'true') return;
      if (isOpenRef.current) return;

      setIsOpen(true);
      sessionStorage.setItem('jade_auto_triggered', 'true');
      executeStep('start', 'replace');
    }, 8000);

    return () => clearTimeout(timer);
  }, [executeStep]);

  // ─── Event handlers ──────────────────────────────────────────────────────

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    sessionStorage.setItem('jade_auto_triggered', 'true');
    if (flowRef.current.currentStep === 'start' && itemsRef.current.length === 0) {
      executeStep('start', 'replace');
    }
  }, [executeStep]);

  const handleSend = useCallback(() => { sendMessage(); }, [sendMessage]);

  useEffect(() => {
    handleSendRef.current = (msg?: string) => {
      if (msg) setInputValue(msg);
      handleSend();
    };
  }, [handleSend]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') sendMessage();
  }, [sendMessage]);

  const handleInputFocus = useCallback(() => { setHintVisible(false); }, []);

  const handleInputBlur = useCallback(() => {
    if (!inputValue && flowRef.current.currentStep === 'duvida_input' && !flowRef.current.searchMode) {
      setHintVisible(true);
    }
  }, [inputValue]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setHintVisible(false);
  }, []);

  // ─── Form submitted tracking ─────────────────────────────────────────────
  const submittedFormsRef = useRef(new Set<string>());

  // ─── Render items ────────────────────────────────────────────────────────

  const renderItem = (item: ChatItem) => {
    switch (item.kind) {
      case 'bot':
        return <div key={item.id} className="jade-message bot" dangerouslySetInnerHTML={{ __html: item.html }} />;
      case 'user':
        return <div key={item.id} className="jade-message user">{item.text}</div>;
      case 'error':
        return <div key={item.id} className="jade-message error" dangerouslySetInnerHTML={{ __html: item.html }} />;
      case 'options':
        return <React.Fragment key={item.id}><OptionsGrid options={item.options} selectedValue={item.selectedValue} onSelect={item.onSelect} /></React.Fragment>;
      case 'actions':
        return <React.Fragment key={item.id}><ExtraActions buttons={item.buttons} /></React.Fragment>;
      case 'form': {
        const isSubmitted = submittedFormsRef.current.has(item.id);
        return (
          <React.Fragment key={item.id}>
            <ChatForm
              tipoOrganizacao={item.tipoOrganizacao}
              submitted={isSubmitted}
              onSubmit={(data) => {
                submittedFormsRef.current.add(item.id);
                item.onSubmit(data);
                // Force re-render by updating items
                setItems(prev => [...prev]);
              }}
            />
          </React.Fragment>
        );
      }
      case 'festa_form': {
        const isSubmitted: boolean = submittedFormsRef.current.has(item.id);
        const festaFormOnSubmit = item.onSubmit;
        return (
          <React.Fragment key={item.id}>
            <FestaForm
              submitted={isSubmitted}
              onSubmit={(data) => {
                submittedFormsRef.current.add(item.id);
                festaFormOnSubmit(data);
                setItems(prev => [...prev]);
              }}
            />
          </React.Fragment>
        );
      }
      case 'typing':
        return <TypingIndicator key={item.id} />;
      case 'standalone-btn':
        return (
          <button key={item.id} className="jade-secondary-btn" style={{ marginTop: '8px' }} onClick={item.onClick}
            {...(item.isHtml ? { dangerouslySetInnerHTML: { __html: item.label } } : { children: item.label })}
          />
        );
      default:
        return null;
    }
  };

  // ─── JSX ─────────────────────────────────────────────────────────────────

  return (
    <>
      {/* FAB Button */}
      <button id="chat-widget-button" className={isOpen ? 'open' : ''} onClick={isOpen ? () => setIsOpen(false) : handleOpen}>
        <div className="chat-button-icon-wrapper">
          <img src={logoUrl} alt="Chat" width={256} height={206} loading="lazy" decoding="async" className="chat-button-icon" />
        </div>
        {!isOpen && <span className="chat-button-text">Falar com a <span className="chat-button-jade">Jade</span></span>}
      </button>

      {/* Chat Container */}
      {isOpen && (
        <div id="chat-widget-container">
          {/* Header */}
          <div id="chat-widget-header">
            <div className="chat-header-info">
              <img src={logoUrl} alt="Alegrando" width={55} height={55} loading="lazy" decoding="async" className="chat-logo-header" style={{ width: 55, height: 55, objectFit: 'contain' }} />
              <div className="chat-title-group">
                <span className="chat-title">Jade</span>
                <span className="chat-subtitle">Alegrando Eventos</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <button onClick={doRestart} title="Recomeçar"
                style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
              </button>
              <button onClick={() => setIsOpen(false)} title="Fechar"
                style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Body */}
          <div id="chat-widget-body" ref={chatBodyRef}>
            {items.map(renderItem)}
          </div>

          {/* Footer */}
          <div id="chat-widget-footer">
            <div className={`jade-input-group${inputHighlight ? ' input-highlight' : ''}`}>
              <div className="jade-input-wrapper">
                <input
                  ref={inputRef}
                  type="text"
                  id="chat-widget-input"
                  placeholder={inputPlaceholder}
                  disabled={!inputEnabled}
                  value={inputValue}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  onKeyDown={handleKeyPress}
                />
                {hintVisible && showHint && (
                  <div className="jade-input-hint">Pode escrever sua dúvida aqui!</div>
                )}
              </div>
              <button id="chat-widget-send" disabled={!inputEnabled} onClick={handleSend}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
