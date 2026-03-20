import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';
import logoUrl from '../assets/logo.png';

// ─── Configuration (production values) ───────────────────────────────────────
const WEBHOOK_URL = 'https://n8n.alegrando.cloud/webhook/d3845beb-4c23-431b-b9db-5f799f3311e2/chat';
const WEBHOOK_ROUTE = 'general';
const SUPABASE_URL = 'https://mtzlpogvcyhhjaagmlxn.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10emxwb2d2Y3loaGphYWdtbHhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzNjEwODAsImV4cCI6MjA4NjkzNzA4MH0.J5C0gveHh3zFABsBbN7teYVYxWlWcApTElCGmsj_cLA';

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

// ─── CSS (injected on mount) ─────────────────────────────────────────────────
const WIDGET_CSS = `
/* Container */
#chat-widget-container {
  position: fixed;
  bottom: 90px;
  right: 20px;
  width: 380px;
  height: 600px;
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
.jade-message.bot { background: #FF9B73; color: white; align-self: flex-start; border-bottom-left-radius: 4px; border: none; box-shadow: 0 4px 12px rgba(255,107,53,0.2); }
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
.chat-button-icon-wrapper { width: 48px; height: 48px; background: #ffffff; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
.chat-button-icon { width: 36px; height: 36px; object-fit: contain; }
.chat-button-text { color: #FF6B35; font-weight: 700; font-family: 'Playfair Display', serif; font-style: italic; font-size: 20px; white-space: nowrap; padding-top: 2px; }
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
.jade-message strong { color: #FF6B35; font-weight: 700; }
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
.jade-typing-bubble { background: #FF9B73; border: none; box-shadow: 0 4px 12px rgba(255,107,53,0.2); padding: 10px 14px; border-radius: 16px; border-bottom-left-radius: 4px; display: flex; gap: 4px; align-items: center; height: 36px; }
.jade-typing-dot { width: 6px; height: 6px; background: #ffffff; border-radius: 50%; animation: typingBounce 1.4s infinite ease-in-out both; }
.jade-typing-dot:nth-child(1) { animation-delay: -0.32s; }
.jade-typing-dot:nth-child(2) { animation-delay: -0.16s; }
@keyframes typingBounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }
`;

// ─── Types ───────────────────────────────────────────────────────────────────
type ChatStep = 'start' | 'tipoPasseio' | 'categoria' | 'destino' | 'dados' | 'confirmacao' | 'duvida_input' | 'duvida_encerrada' | 'duvidas' | 'encerrado';

interface FlowState {
  currentStep: ChatStep;
  tipoOrganizacao: string | null;
  tipoPasseio: string | null;
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
}

type ChatItem =
  | { kind: 'bot'; id: string; html: string }
  | { kind: 'user'; id: string; text: string }
  | { kind: 'error'; id: string; html: string }
  | { kind: 'options'; id: string; options: { label: string; value: string }[]; selectedValue: string | null; onSelect: (v: string) => void }
  | { kind: 'actions'; id: string; buttons: { label: string; isHtml?: boolean; onClick: () => void }[] }
  | { kind: 'form'; id: string; tipoOrganizacao: string; onSubmit: (d: { nome: string; cargo?: string; grupo: string; qtd: string; data: string }) => void }
  | { kind: 'typing'; id: string }
  | { kind: 'standalone-btn'; id: string; label: string; isHtml?: boolean; onClick: () => void };

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
  const whatsappRegex = /(https:\/\/wa\.me\/5511916032904[^\s<]*)/g;
  return text.replace(whatsappRegex, (url) => {
    return `<a href="${url}" target="_blank" class="jade-whatsapp-cta-button">${WHATSAPP_SVG} Finalizar Orçamento no WhatsApp</a>`;
  });
}

function parseBotContent(text: string) {
  return parseWhatsAppLinks(parseMarkdown(text));
}

const INITIAL_FLOW: FlowState = {
  currentStep: 'start',
  tipoOrganizacao: null,
  tipoPasseio: null,
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
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function OptionsGrid({ options, selectedValue, onSelect }: {
  options: { label: string; value: string }[];
  selectedValue: string | null;
  onSelect: (v: string) => void;
}) {
  return (
    <div className="jade-options-grid">
      {options.map((opt) => (
        <button
          key={opt.value}
          className={`jade-option-btn${selectedValue === opt.value ? ' selected' : ''}`}
          disabled={selectedValue !== null}
          style={selectedValue !== null && selectedValue !== opt.value ? { opacity: 0.5 } : undefined}
          onClick={() => selectedValue === null && onSelect(opt.value)}
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
        <img src={logoUrl} alt="Jade" className="jade-typing-logo" />
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

  const handleSubmit = () => {
    if (!nome || !qtd || !data || !grupo) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    const qtdInt = parseInt(qtd);
    if (!qtdInt || qtdInt < 1) {
      alert('A quantidade de alunos deve ser maior que 0.');
      return;
    }
    const selectedDate = new Date(data);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    if (selectedDate < now) {
      alert('A data do passeio deve ser hoje ou futura.');
      return;
    }
    onSubmit({ nome, cargo: cargo || undefined, grupo, qtd, data });
  };

  const today = new Date().toISOString().split('T')[0];

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
            <label className="jade-form-label">Nome da Escola</label>
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
        <input type="date" className="jade-form-input" min={today} value={data} onChange={e => setData(e.target.value)} disabled={submitted} />
      </div>
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
          options: [{ label: 'Escola', value: 'escola' }, { label: 'Transportador / Cooperativa', value: 'cooperativa' }],
          selectedValue: null,
          onSelect: (value: string) => {
            setItems(prev => prev.map(it => it.id === gridId ? { ...it, selectedValue: value } as ChatItem : it));
            setItems(prev => [...prev, { kind: 'user', id: uid(), text: `Organizando como: ${value === 'escola' ? 'Escola' : 'Transportador / Cooperativa'}` }]);
            setFlow(prev => ({ ...prev, tipoOrganizacao: value }));
            // Use setTimeout to ensure flow state is updated
            setTimeout(() => executeStep('tipoPasseio', 'append'), 0);
          },
        });
        newItems.push({
          kind: 'actions', id: uid(),
          buttons: [
            { label: 'Tenho uma dúvida', onClick: () => executeStep('duvida_input', 'append') },
            { label: '↺ Recomeçar Opções', isHtml: true, onClick: () => doRestart() },
          ],
        });
        break;
      }

      case 'tipoPasseio': {
        setFlow(prev => ({ ...prev, currentStep: step }));
        // 500ms delay like original
        const t = window.setTimeout(() => {
          const gridId = uid();
          setItems(prev => [
            ...prev,
            { kind: 'bot', id: uid(), html: parseBotContent('Ótimo! E qual é o tipo de passeio que você busca?') },
            {
              kind: 'options', id: gridId,
              options: [{ label: 'Pedagógico', value: 'pedagogico' }, { label: 'Lazer / Diversão', value: 'lazer' }],
              selectedValue: null,
              onSelect: (value: string) => {
                setItems(prev => prev.map(it => it.id === gridId ? { ...it, selectedValue: value } as ChatItem : it));
                setItems(prev => [...prev, { kind: 'user', id: uid(), text: `Tipo de passeio: ${value === 'pedagogico' ? 'Pedagógico' : 'Lazer'}` }]);
                setFlow(prev => ({ ...prev, tipoPasseio: value, offset: 0 }));
                setTimeout(() => executeStep('categoria', 'append'), 0);
              },
            },
          ]);
        }, 500);
        timersRef.current.push(t);
        return; // Don't set items below, handled by timer
      }

      case 'categoria': {
        newItems.push({ kind: 'bot', id: uid(), html: parseBotContent('Qual a categoria de passeio que você prefere?') });

        // Fetch categories from supabase
        setFlow(prev => ({ ...prev, currentStep: step }));
        if (mode === 'replace') { setItems(newItems); } else { setItems(prev => [...prev, ...newItems]); }

        try {
          const { data: catData, error } = await supabaseClient
            .from('documents')
            .select('categoria')
            .eq('tipo_passeio', flowRef.current.tipoPasseio);

          if (error || !catData || catData.length === 0) {
            console.error('Erro ao buscar categorias:', error);
            addBotMsg('Não encontrei categorias específicas. Visualizando todos...');
            executeStep('destino', 'append');
            return;
          }

          const uniqueCats = [...new Set(catData.map((d: any) => d.categoria).filter((c: any) => c))];
          const catOptions = uniqueCats.map(c => ({
            label: c.charAt(0).toUpperCase() + c.slice(1).replace(/_/g, ' '),
            value: c,
          }));

          if (catOptions.length === 0) {
            executeStep('destino', 'append');
            return;
          }

          const gridId = uid();
          setItems(prev => [
            ...prev,
            {
              kind: 'options', id: gridId,
              options: catOptions,
              selectedValue: null,
              onSelect: (value: string) => {
                setItems(prev => prev.map(it => it.id === gridId ? { ...it, selectedValue: value } as ChatItem : it));
                setItems(prev => [...prev, { kind: 'user', id: uid(), text: `Categoria: ${value.charAt(0).toUpperCase() + value.slice(1).replace(/_/g, ' ')}` }]);
                setFlow(prev => ({ ...prev, categoria: value, offset: 0 }));
                setTimeout(() => executeStep('destino', 'append'), 0);
              },
            },
            {
              kind: 'actions', id: uid(),
              buttons: [
                { label: '🔙 Outro tipo de passeio', onClick: () => doGoBackTo('tipoPasseio') },
                { label: '↺ Recomeçar', isHtml: true, onClick: () => doRestart() },
              ],
            },
          ]);
        } catch (err) {
          console.error('Erro categorias:', err);
          executeStep('destino', 'append');
        }
        return; // Already handled items
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
          let query = supabaseClient
            .from('documents')
            .select('id, content, tipo_passeio, categoria, destaque')
            .eq('tipo_passeio', currentFlow.tipoPasseio)
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
            setItems(prev => prev.map(it => it.id === formId ? { ...it, onSubmit: () => {} } as ChatItem : it));
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
            ? `Escola ${f.grupo || ''}`
            : `Transportador / Cooperativa ${f.grupo || ''}`;
          const msg = `Olá! Falei com a Jade. Gostaria de cotar o roteiro *${f.destino}* para *${grupoLabel}* com *${f.qtd}* alunos. Data prevista: *${f.data}*. Responsável: ${f.nome} (${f.cargo || 'Responsável'}).`;
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

      case 'duvida_input': {
        // Input is enabled by configureInput above — nothing else to render
        break;
      }

      case 'duvida_encerrada': {
        const f = flowRef.current;
        const btns: { label: string; isHtml?: boolean; onClick: () => void }[] = [];
        if (f.finalizado) {
          btns.push({ label: '↺ Recomeçar', isHtml: true, onClick: () => doRestart() });
        } else {
          btns.push({ label: '🧭 Montar Roteiro', onClick: () => executeStep('start', 'replace') });
        }
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
    setFlow({ ...INITIAL_FLOW });
    setItems([]);
    setInputValue('');
    // Use setTimeout to ensure flow state is fresh
    setTimeout(() => executeStep('start', 'replace'), 0);
  }, [executeStep]);

  const doGoBackTo = useCallback((step: ChatStep) => {
    setFlow(prev => ({ ...prev, currentStep: step }));
    setItems([]);
    setTimeout(() => executeStep(step, 'replace'), 0);
  }, [executeStep]);

  // ─── Send message (for duvida_input / search / duvidas) ──────────────────

  const sendMessage = useCallback(async (overrideMessage?: string) => {
    const f = flowRef.current;

    if (f.currentStep !== 'duvida_input' && !f.searchMode && f.currentStep !== 'duvidas') {
      console.warn('Blocked message send in step:', f.currentStep);
      return;
    }

    const message = overrideMessage || inputValue.trim();
    if (!message) return;

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
      contexto: { ...f },
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
      addBotMsg('Estamos com problemas técnicos no momento. Por favor, <a href="https://wa.me/5511916032904" target="_blank" class="jade-whatsapp-cta-button" style="display:inline-flex; margin-top:8px;">fale conosco pelo WhatsApp</a>');
      setInputEnabled(true);
    }
  }, [inputValue, addUserMsg, addBotMsg, executeStep]);

  // ─── window.openJadeWidget / closeChatWidget ─────────────────────────────

  useEffect(() => {
    window.openJadeWidget = (initialMessage?: string) => {
      setIsOpen(true);
      sessionStorage.setItem('jade_auto_triggered', 'true');

      if (initialMessage) {
        // Transition to duvidas and send message
        executeStep('duvidas', 'append');
        setTimeout(() => {
          // Set input and send
          setInputValue(initialMessage);
          // Need a small delay for state to settle
          setTimeout(() => {
            // Manually send since inputValue may not be settled
            const f = flowRef.current;
            const typingId = uid();

            setItems(prev => [...prev, { kind: 'user', id: uid(), text: initialMessage }]);
            setItems(prev => [...prev, { kind: 'typing', id: typingId }]);
            sessionStorage.setItem('jade_interaction_started', 'true');

            const payload: any = {
              chatId: getChatId(),
              message: initialMessage,
              route: WEBHOOK_ROUTE,
              contexto: { ...f },
            };

            fetch(WEBHOOK_URL, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
              signal: AbortSignal.timeout(15000),
            }).then(async (res) => {
              setItems(prev => prev.filter(it => it.id !== typingId));
              if (!res.ok) throw new Error(`HTTP ${res.status}`);
              const data = await res.json();
              setItems(prev => [...prev, { kind: 'bot', id: uid(), html: parseBotContent(data.output || 'Desculpe, não entendi.') }]);
              setInputHighlight(false);
              executeStep('duvida_encerrada', 'append');
            }).catch((err) => {
              setItems(prev => prev.filter(it => it.id !== typingId));
              console.error('Erro:', err);
              setItems(prev => [...prev, {
                kind: 'bot', id: uid(),
                html: 'Estamos com problemas técnicos no momento. Por favor, <a href="https://wa.me/5511916032904" target="_blank" class="jade-whatsapp-cta-button" style="display:inline-flex; margin-top:8px;">fale conosco pelo WhatsApp</a>',
              }]);
              setInputEnabled(true);
            });
          }, 100);
        }, 500);
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
        return <OptionsGrid key={item.id} options={item.options} selectedValue={item.selectedValue} onSelect={item.onSelect} />;
      case 'actions':
        return <ExtraActions key={item.id} buttons={item.buttons} />;
      case 'form': {
        const isSubmitted = submittedFormsRef.current.has(item.id);
        return (
          <ChatForm
            key={item.id}
            tipoOrganizacao={item.tipoOrganizacao}
            submitted={isSubmitted}
            onSubmit={(data) => {
              submittedFormsRef.current.add(item.id);
              item.onSubmit(data);
              // Force re-render by updating items
              setItems(prev => [...prev]);
            }}
          />
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
      {!isOpen && (
        <button id="chat-widget-button" onClick={handleOpen}>
          <div className="chat-button-icon-wrapper">
            <img src={logoUrl} alt="Chat" className="chat-button-icon" />
          </div>
          <span className="chat-button-text">Falar com a Jade</span>
        </button>
      )}

      {/* Chat Container */}
      {isOpen && (
        <div id="chat-widget-container">
          {/* Header */}
          <div id="chat-widget-header">
            <div className="chat-header-info">
              <img src={logoUrl} alt="Alegrando" className="chat-logo-header" style={{ width: 55, height: 55, objectFit: 'contain' }} />
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
