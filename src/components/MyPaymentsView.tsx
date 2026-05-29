import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Plus, ShieldCheck, ChevronDown, Check, Aperture, AlertTriangle } from 'lucide-react';
import { UnionMember, ApplicationTx, CommitteeMember } from '../types';

interface MyPaymentsViewProps {
  member: UnionMember;
  transactions: ApplicationTx[];
  committeeMembers: CommitteeMember[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  triggerToast: (msg: string) => void;
  onOpenOverlay: (overlayTab: 'credencial' | 'soporte' | 'financiera' | 'convenios' | 'documentos') => void;
}

export function MyPaymentsView({
  member,
  transactions,
  committeeMembers,
  searchQuery,
  setSearchQuery,
  triggerToast,
  onOpenOverlay
}: MyPaymentsViewProps) {
  const [showApproval, setShowApproval] = useState(true);
  const [scanning, setScanning] = useState(false);

  const handleScanPay = () => {
    setScanning(true);
    triggerToast("Iniciando Escáner de Código QR SUTISSSTESON...");
    setTimeout(() => {
      setScanning(false);
      triggerToast("¡Código QR leído con éxito! Referencia de Pago Autorizada.");
    }, 3000);
  };

  return (
    <div className="flex-1 flex flex-col pt-0">
      
      {/* RED HEADER PANEL WITH "Payments & Transfers" TITLE */}
      <div className="bg-gradient-to-br from-[#FF2B54] to-[#DF162C] pt-6 pb-9 px-5 text-white flex-shrink-0 relative overflow-hidden select-none shadow-[inset_0_-2px_6px_rgba(0,0,0,0.06)] rounded-b-[38px] z-20">
        <div className="absolute top-0 right-0 w-36 h-36 bg-white/[0.04] rounded-full blur-xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-44 h-44 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />
        
        {/* Top bar with Profile Left, Notifications Right, Title Center */}
        <div className="flex justify-between items-center relative z-10 pb-4">
          <button 
            onClick={() => {
              onOpenOverlay('credencial');
              triggerToast("Desplegando credencial digital desde tu avatar.");
            }}
            className="h-9.5 w-9.5 bg-white/12 hover:bg-white/20 border border-white/20 rounded-[14px] flex items-center justify-center transition-all cursor-pointer overflow-hidden backdrop-blur-md shadow-md active:scale-95"
          >
            <img 
              src={member.avatar} 
              alt={member.name} 
              className="w-full h-full object-cover rounded-[14px]"
            />
          </button>
          
          <div className="text-center">
            <span className="text-[8px] uppercase tracking-[0.16em] font-mono text-white/70 font-black block">SUTI DIGITAL</span>
            <span className="text-[11.5px] font-extrabold text-white block tracking-tight leading-none mt-0.5">{member.name.split(' ')[1]} {member.name.split(' ')[2]}</span>
          </div>

          <button 
            onClick={() => {
              onOpenOverlay('soporte');
              triggerToast("Centro de soporte y notificaciones.");
            }}
            className="h-9.5 w-9.5 bg-white/12 hover:bg-white/20 border border-white/20 rounded-[14px] flex items-center justify-center relative transition-all cursor-pointer text-white backdrop-blur-md shadow-md active:scale-95"
          >
            <svg className="h-5.5 w-5.5 fill-none stroke-current stroke-[2]" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 19v-8.93a2 2 0 01.89-1.664l8-5.333a2 2 0 012.22 0l8 5.333A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-2.25-1.5a2 2 0 00-2.22 0l-2.25 1.5" />
            </svg>
            <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-[#FF2B54] border border-white animate-pulse" />
          </button>
        </div>

        {/* Big center title for Payments section inside red header */}
        <div className="relative z-10 text-center py-2.5">
          <h2 className="text-lg font-black tracking-tight text-white font-sans leading-none">Payments & Transfers</h2>
          <p className="text-[8.5px] text-pink-100 font-sans mt-1.5 opacity-80 uppercase tracking-wider">Módulo de Retención y Dispersión Sindical</p>
        </div>
      </div>

      {/* LOWER AREA CONTAINER - SCROLLABLE FLOOR */}
      <div className="flex-1 overflow-y-auto pt-7 pb-20 px-4.5 scrollbar-none relative z-10 bg-[#F0F0F3] dark:bg-zinc-950">
        
        {/* Mockup 3 structure - Top 4 neat quick action circular buttons */}
        <div className="grid grid-cols-4 gap-2 text-center select-none pt-0.5">
          {/* Action 1 */}
          <div className="flex flex-col items-center gap-1.5 cursor-pointer hover:scale-103 transition-transform" onClick={() => triggerToast("Abriendo transferencia inmediata SutiApp.")}>
            <div className="h-11 w-11 rounded-full bg-white dark:bg-zinc-900 shadow-neomorph-button border border-white/60 dark:border-zinc-800 flex items-center justify-center text-[#FF2B54]">
              <svg className="h-5 w-5 stroke-current fill-none stroke-[2.2]" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <span className="text-[9px] text-zinc-650 dark:text-zinc-300 font-extrabold font-sans">Transfer</span>
          </div>

          {/* Action 2 */}
          <div className="flex flex-col items-center gap-1.5 cursor-pointer hover:scale-103 transition-transform" onClick={() => triggerToast("Abriendo catálogo de pagos autorizados.")}>
            <div className="h-11 w-11 rounded-full bg-white dark:bg-zinc-900 shadow-neomorph-button border border-white/60 dark:border-zinc-800 flex items-center justify-center text-[#FF2B54]">
              <svg className="h-5 w-5 stroke-current fill-none stroke-[2]" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <span className="text-[9px] text-zinc-650 dark:text-zinc-300 font-extrabold font-sans">Payment</span>
          </div>

          {/* Action 3 */}
          <div className="flex flex-col items-center gap-1.5 cursor-pointer hover:scale-103 transition-transform" onClick={() => triggerToast("Abriendo Vales de Farmacia y Recibos Sindicales.")}>
            <div className="h-11 w-11 rounded-full bg-white dark:bg-zinc-900 shadow-neomorph-button border border-white/60 dark:border-zinc-800 flex items-center justify-center text-[#FF2B54]">
              <svg className="h-5 w-5 stroke-current fill-none stroke-[2]" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-[9px] text-zinc-650 dark:text-zinc-300 font-extrabold font-sans">Bills</span>
          </div>

          {/* Action 4 */}
          <div className="flex flex-col items-center gap-1.5 cursor-pointer hover:scale-103 transition-transform" onClick={() => triggerToast("Abriendo simulador de tipo de cambio.")}>
            <div className="h-11 w-11 rounded-full bg-white dark:bg-zinc-900 shadow-neomorph-button border border-white/60 dark:border-zinc-800 flex items-center justify-center text-[#FF2B54]">
              <svg className="h-5 w-5 stroke-current fill-none stroke-[2]" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8M16 8h5V3" />
              </svg>
            </div>
            <span className="text-[9px] text-zinc-650 dark:text-zinc-300 font-extrabold font-sans">Exchange</span>
          </div>
        </div>

        {/* Scan & Pay Beautiful neomorphic button block */}
        <div className="pt-5 pb-1">
          <button 
            onClick={handleScanPay}
            className="w-full bg-white dark:bg-zinc-900 border border-white/60 dark:border-zinc-850 rounded-[22px] py-4 px-5 shadow-neomorph flex items-center justify-center gap-3.5 cursor-pointer hover:scale-[1.01] transition-transform relative overflow-hidden"
          >
            {scanning ? (
              <div className="flex items-center gap-2 text-rose-500 font-extrabold text-xs animate-pulse">
                <Aperture className="h-5 w-5 animate-spin" />
                <span>SCANNING CODE...</span>
              </div>
            ) : (
              <>
                <div className="h-7 w-7 rounded-lg bg-rose-500/10 text-rose-500 border border-rose-500/20 flex items-center justify-center">
                  <svg className="h-4.5 w-4.5 stroke-current fill-none stroke-[2]" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-16v.01M4 12H2m10 4v4m4-4h.01M4 4h4v4H4V4zm12 0h4v4h-4V4zM4 16h4v4H4v-4z" />
                  </svg>
                </div>
                <span className="text-[11.5px] text-[#FF2B54] font-black uppercase tracking-widest leading-none">Scan & Pay</span>
              </>
            )}
          </button>
        </div>

        {/* QR Scan Camera Overlay Simulation */}
        <AnimatePresence>
          {scanning && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-black/90 rounded-[28px] p-6 text-white text-center flex flex-col items-center justify-center gap-5 border border-white/10 my-4"
            >
              <div className="relative h-36 w-36 border-2 border-dashed border-rose-500 flex items-center justify-center rounded-xl animate-pulse">
                <div className="absolute inset-2 border border-white/25 flex items-center justify-center">
                  <span className="h-0.5 w-full bg-rose-500 absolute top-1/2 -translate-y-1/2 animate-bounce" />
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#FF4D3B]">Camera Activated</h4>
                <p className="text-[9px] text-zinc-400 mt-1">Coloque el código QR oficial de SUTISSSTESON o Comercio Aliado</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Payments for approval card exactly matching Mockup 3 */}
        <div className="bg-white dark:bg-zinc-900 rounded-[26px] p-5.5 border border-white/60 dark:border-zinc-850 shadow-neomorph mt-4.5 text-left">
          <button 
            onClick={() => setShowApproval(!showApproval)}
            className="w-full flex justify-between items-baseline cursor-pointer text-left font-sans"
          >
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
              <span className="text-[12px] font-black text-zinc-850 dark:text-zinc-150">Payments for approval (2)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[12px] font-black text-rose-500">6,452.73 ALL</span>
              <ChevronDown className={`h-4.5 w-4.5 text-zinc-400 transition-transform ${showApproval ? 'transform rotate-180' : ''}`} />
            </div>
          </button>

          {showApproval && (
            <div className="mt-4 border-t border-zinc-100 dark:border-zinc-800 pt-3.5 space-y-3.5 animate-fade-in text-left">
              {/* Approval 1: Agnes Cela requests money */}
              <div className="flex justify-between items-center text-[11px] bg-slate-50/50 dark:bg-zinc-950/40 p-3 rounded-2xl border border-zinc-100/50 dark:border-zinc-850">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full overflow-hidden border border-zinc-100 shadow-xs flex-shrink-0">
                    <img 
                      src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&auto=format&fit=crop" 
                      alt="Agnes Cela" 
                      className="h-full w-full object-cover" 
                    />
                  </div>
                  <div>
                    <span className="font-extrabold text-zinc-850 dark:text-zinc-200 block leading-none">Agnes Cela</span>
                    <span className="text-[8.5px] text-zinc-400 block tracking-tight mt-1">requests money • SutiApp</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono font-black text-rose-500 block leading-none">- 1,500.00 ALL</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      triggerToast("¡Aprobando solicitud por $1,500.00 de Agnes Cela!");
                    }}
                    className="inline-block mt-1.5 px-2.5 py-0.8 bg-emerald-500 text-white font-sans text-[8px] uppercase tracking-wide rounded-sm font-bold active:scale-95 cursor-pointer"
                  >
                    Aprobar
                  </button>
                </div>
              </div>

              {/* Approval 2: New traffic fine */}
              <div className="flex justify-between items-center text-[11px] bg-slate-50/50 dark:bg-zinc-950/40 p-3 rounded-2xl border border-zinc-100/50 dark:border-zinc-850">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-blue-50 dark:bg-blue-950/20 text-blue-500 flex items-center justify-center border border-blue-100 dark:border-blue-900/40 flex-shrink-0">
                    <svg className="h-4.5 w-4.5 stroke-current fill-none stroke-[2.2]" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-extrabold text-zinc-850 dark:text-zinc-200 block leading-none">New traffic fine</span>
                    <span className="text-[8.5px] text-zinc-400 block tracking-tight mt-1">to pay for • Capi Hermosillo</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono font-black text-rose-500 block leading-none">- 4,952.73 ALL</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenOverlay('documentos');
                      triggerToast("Solicitando subir el comprobante de infracción para trámite del sindicato.");
                    }}
                    className="inline-block mt-1.5 px-2.5 py-0.8 bg-[#FF2B54] text-white font-sans text-[8px] uppercase tracking-wide rounded-sm font-bold active:scale-95 cursor-pointer"
                  >
                    Cargar
                  </button>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Search & Add Beneficiary rows */}
        <div className="space-y-3.5 mt-5 text-left">
          
          <div className="relative">
            <div className="flex items-center gap-2.5 bg-white dark:bg-zinc-900 border border-white/60 dark:border-zinc-850 rounded-[18px] px-3.5 py-1.5 shadow-neomorph-light">
              <Search className="h-4.5 w-4.5 text-zinc-400" />
              <input 
                type="text" 
                placeholder="Search beneficiary..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-xs font-sans text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 outline-none border-none py-1"
              />
            </div>
          </div>

          <button 
            onClick={() => triggerToast("Redireccionando al alta de beneficiario quincenal...")}
            className="w-full bg-white dark:bg-zinc-900 rounded-[20px] p-3.5 shadow-neomorph-light border border-white/60 dark:border-zinc-850 text-zinc-700 dark:text-zinc-200 flex items-center justify-between font-sans hover:scale-[1.01] transition-transform cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="h-6 w-6 rounded-full bg-[#FF2B54]/10 text-[#FF2B54] flex items-center justify-center">
                <span className="text-sm font-black">+</span>
              </div>
              <span className="text-[11.5px] font-black uppercase tracking-wider">Add new beneficiary</span>
            </div>
            <span className="text-[13px] text-zinc-400">→</span>
          </button>
        </div>

        {/* Most frequent listed circle avatars with labels */}
        <div className="space-y-3 mt-6 text-left">
          <h4 className="font-extrabold text-[11px] text-zinc-400 uppercase tracking-widest px-0.5">Most frequent</h4>
          
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none select-none">
            {committeeMembers.map((c, idx) => (
              <div 
                key={idx}
                onClick={() => triggerToast(`Iniciar transferencia directa para ${c.name}`)}
                className="flex flex-col items-center gap-1.5 snap-start cursor-pointer hover:scale-103 transition-transform"
              >
                <div className="h-11 w-11 rounded-full overflow-hidden border border-zinc-200 shadow-sm relative">
                  <img src={c.photo} alt={c.name} className="h-full w-full object-cover" />
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-white" />
                </div>
                <span className="text-[8.5px] text-zinc-500 font-extrabold text-center truncate max-w-[55px] leading-tight block">
                  {c.name.split(' ')[1]}
                </span>
              </div>
            ))}
            
            {/* Added custom frequent member from mockup */}
            <div 
              onClick={() => triggerToast("Iniciar transferencia directa para Agim Dervishi")}
              className="flex flex-col items-center gap-1.5 snap-start cursor-pointer hover:scale-103 transition-transform"
            >
              <div className="h-11 w-11 rounded-full overflow-hidden border border-zinc-200 shadow-sm relative">
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" alt="Agim Dervishi" className="h-full w-full object-cover" />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-white" />
              </div>
              <span className="text-[8.5px] text-zinc-500 font-extrabold text-center truncate max-w-[55px] leading-tight block">Agim</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
