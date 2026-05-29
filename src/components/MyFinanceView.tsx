import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Coins, TrendingUp, CreditCard, Sparkles, Zap, Gift, Clock, Search, ChevronDown, ListFilter } from 'lucide-react';
import { UnionMember, ApplicationTx, CommitteeMember } from '../types';

interface MyFinanceViewProps {
  member: UnionMember;
  transactions: ApplicationTx[];
  committeeMembers: CommitteeMember[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  triggerToast: (msg: string) => void;
  onOpenOverlay: (overlayTab: 'credencial' | 'soporte' | 'financiera' | 'convenios' | 'documentos') => void;
}

export function MyFinanceView({
  member,
  transactions,
  committeeMembers,
  searchQuery,
  setSearchQuery,
  triggerToast,
  onOpenOverlay
}: MyFinanceViewProps) {
  const [bktTopTab, setBktTopTab] = useState<'overview' | 'transactions' | 'budget'>('overview');
  const [activeCategory, setActiveCategory] = useState<'all' | 'briefcase' | 'savings' | 'card'>('all');
  const [showPending, setShowPending] = useState(true);

  // Filter transactions based on search is done in the views
  const filteredTxs = transactions.filter(tx => {
    const term = searchQuery.toLowerCase().trim();
    if (activeCategory === 'savings' && tx.type !== 'ahorro') return false;
    if (activeCategory === 'briefcase' && tx.type !== 'prestamo') return false;
    if (activeCategory === 'card' && tx.type !== 'adelanto') return false;
    return tx.title.toLowerCase().includes(term) || tx.id.toLowerCase().includes(term);
  });

  return (
    <div className="flex-1 flex flex-col pt-0">
      
      {/* RED HEADER PANEL WITH AVATAR, NOTIFICATIONS & TABS */}
      <div className="bg-gradient-to-br from-[#FF2B54] to-[#DF162C] pt-6 pb-9 px-5 text-white flex-shrink-0 relative overflow-hidden select-none shadow-[inset_0_-2px_6px_rgba(0,0,0,0.06)] rounded-b-[38px] z-20">
        <div className="absolute top-0 right-0 w-36 h-36 bg-white/[0.04] rounded-full blur-xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-44 h-44 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />
        
        {/* Top bar with Profile Left, Notifications Right, Title Center */}
        <div className="flex justify-between items-center relative z-10 pb-5">
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
              triggerToast("Abrirte el centro de soporte sindical.");
            }}
            className="h-9.5 w-9.5 bg-white/12 hover:bg-white/20 border border-white/20 rounded-[14px] flex items-center justify-center relative transition-all cursor-pointer text-white backdrop-blur-md shadow-md active:scale-95"
          >
            <svg className="h-5.5 w-5.5 fill-none stroke-current stroke-[2]" viewBox="0 0 24 24">
              {/* Mail list icon with red notification bubble */}
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 19v-8.93a2 2 0 01.89-1.664l8-5.333a2 2 0 012.22 0l8 5.333A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-2.25-1.5a2 2 0 00-2.22 0l-2.25 1.5" />
            </svg>
            <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-[#FF2B54] border border-white animate-pulse" />
          </button>
        </div>

        {/* Overview, Transactions, Budget top sub-tabs row */}
        <div className="flex justify-around items-center relative z-10 pt-1.5 px-1 pb-1">
          <button 
            onClick={() => { setBktTopTab('overview'); setSearchQuery(''); }}
            className={`text-xs font-sans tracking-tight cursor-pointer transition-all duration-300 py-1 ${
              bktTopTab === 'overview' ? 'text-white font-black scale-105' : 'text-white/60 hover:text-white/80 font-semibold'
            }`}
          >
            Overview
          </button>
          <button 
            onClick={() => { setBktTopTab('transactions'); setSearchQuery(''); }}
            className={`text-xs font-sans tracking-tight cursor-pointer transition-all duration-300 py-1 ${
              bktTopTab === 'transactions' ? 'text-white font-black scale-105' : 'text-white/60 hover:text-white/80 font-semibold'
            }`}
          >
            Transactions
          </button>
          <button 
            onClick={() => { setBktTopTab('budget'); setSearchQuery(''); }}
            className={`text-xs font-sans tracking-tight cursor-pointer transition-all duration-300 py-1 ${
              bktTopTab === 'budget' ? 'text-white font-black scale-105' : 'text-white/60 hover:text-white/80 font-semibold'
            }`}
          >
            Budget
          </button>
        </div>

        {/* DYNAMIC SHIFTING HIGHLIGHT NOTCH pointing up into red background with a little red indicator dot */}
        <div 
          className="absolute bottom-0 z-30 transition-all duration-350 ease-out pointer-events-none"
          style={{
            left: bktTopTab === 'overview' ? 'calc(16.6% - 30px)' : bktTopTab === 'transactions' ? 'calc(50% - 30px)' : 'calc(83.3% - 30px)',
            width: '60px',
            height: '14px'
          }}
        >
          <svg viewBox="0 0 60 14" fill="none" className="w-full h-full text-[#F0F0F3] dark:text-zinc-950">
            <path d="M0 14 C15 14, 12 0, 30 0 C48 0, 45 14, 60 14 Z" fill="currentColor" />
          </svg>
          <div className="absolute top-[2px] left-1/2 -translate-x-1/2 h-1.5 w-1.5 bg-[#FF2B54] rounded-full shadow-md" />
        </div>
      </div>

      {/* LOWER AREA CONTAINER - SCROLLABLE FLOOR IN GRAPHITE/PORCELAIN */}
      <div className="flex-1 overflow-y-auto pt-7 pb-20 px-4.5 scrollbar-none relative z-10 bg-[#F0F0F3] dark:bg-zinc-950">
        <AnimatePresence mode="wait">
          
          {/* ======================= SUBVIEW: OVERVIEW (Mockup 5) ======================= */}
          {bktTopTab === 'overview' && (
            <motion.div
              key="finance-overview"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-5 text-left"
            >
              {/* Action Pending Horizontal Scroll Row */}
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory">
                {/* Scroll card 1: Agnes Cela requests money */}
                <div 
                  onClick={() => triggerToast("Solicitud de Agnes Cela: pendiente de aprobación en comité.")}
                  className="bg-white dark:bg-zinc-900 rounded-[22px] p-4.5 shadow-neomorph-light border border-white/60 dark:border-zinc-800/60 min-w-[215px] max-w-[215px] flex flex-col gap-3 cursor-pointer snap-start hover:scale-[1.01] transition-transform"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9.5 w-9.5 rounded-full overflow-hidden border border-zinc-150 shadow-xs flex-shrink-0">
                      <img 
                        src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&auto=format&fit=crop" 
                        alt="Agnes Cela" 
                        className="h-full w-full object-cover" 
                      />
                    </div>
                    <div>
                      <h5 className="font-extrabold text-[11px] text-zinc-900 dark:text-zinc-100 leading-tight">Agnes Cela</h5>
                      <p className="text-[8px] text-zinc-400 font-sans mt-0.5 leading-none">requests money</p>
                    </div>
                  </div>
                  <h4 className="font-mono text-sm font-black text-zinc-900 dark:text-white mt-1 leading-none">1,500.00 ALL</h4>
                </div>

                {/* Scroll card 2: New traffic fine */}
                <div 
                  onClick={() => triggerToast("Multa de Tránsito: Autorizable con retención en nómina Hermosillo.")}
                  className="bg-white dark:bg-zinc-900 rounded-[22px] p-4.5 shadow-neomorph-light border border-white/60 dark:border-zinc-800/60 min-w-[215px] max-w-[215px] flex flex-col gap-3 cursor-pointer snap-start hover:scale-[1.01] transition-transform"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9.5 w-9.5 rounded-full bg-blue-50 dark:bg-blue-950/20 text-blue-500 flex items-center justify-center border border-blue-100 dark:border-blue-900/40 flex-shrink-0">
                      <svg className="h-5 w-5 stroke-current fill-none stroke-[2]" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-extrabold text-[11px] text-zinc-900 dark:text-zinc-100 leading-tight">New traffic fine</h5>
                      <p className="text-[8px] text-zinc-400 font-sans mt-0.5 leading-none">to pay for</p>
                    </div>
                  </div>
                  <h4 className="font-mono text-sm font-black text-zinc-900 dark:text-white mt-1 leading-none">4,952.73 ALL</h4>
                </div>
              </div>

              {/* Exact Mockup 5 aligned balances */}
              <div className="bg-transparent py-1 px-1 flex justify-between items-center select-none border-b border-zinc-200/40 pb-4">
                <div className="text-left">
                  <span className="text-[9px] text-zinc-450 dark:text-zinc-400 uppercase tracking-wider font-extrabold block">My balance</span>
                  <h3 className="text-xl font-black text-zinc-900 dark:text-white leading-tight mt-1.5 font-mono">
                    175,160<span className="text-xs font-bold font-mono">.03</span> <span className="text-[10px] text-zinc-400 font-bold ml-0.5">ALL</span>
                  </h3>
                </div>
                <div className="text-left border-l border-zinc-250/50 dark:border-zinc-800 pl-5.5">
                  <span className="text-[9px] text-[#FF2B54] uppercase tracking-wider font-extrabold block">Available balance</span>
                  <h3 className="text-xl font-black text-[#FF2B54] leading-tight mt-1.5 font-mono">
                    375,160<span className="text-xs font-bold font-mono">.03</span> <span className="text-[10px] text-zinc-400 font-bold ml-0.5">ALL</span>
                  </h3>
                </div>
              </div>

              {/* Accounts Sections containing elegant Silver Credit Card Representation */}
              <div className="space-y-3.5">
                <h4 className="font-extrabold text-[11px] text-zinc-400 uppercase tracking-widest px-0.5">Accounts</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Account Card 1: Salary Account */}
                  <div className="bg-white dark:bg-zinc-900 rounded-[26px] p-5.5 shadow-neomorph border border-white/60 dark:border-zinc-800/60 flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-[#FF2B54]/10 text-[#FF2B54] flex items-center justify-center border border-[#FF2B54]/20">
                          <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                            <path d="M21 18H3V6h18v12zm-9-2c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z" />
                          </svg>
                        </div>
                        <div>
                          <span className="text-[11.5px] font-extrabold text-zinc-850 dark:text-zinc-100">Salary account</span>
                          <span className="text-[8px] text-zinc-400 block font-mono font-bold leading-none mt-0.5">SUTI-98842-active</span>
                        </div>
                      </div>
                      <h5 className="font-mono text-sm font-black text-zinc-900 dark:text-white">100,400.25 ALL</h5>
                    </div>

                    {/* Highly-Elegant credit card graphic */}
                    <div className="h-[95px] w-full rounded-2xl bg-gradient-to-tr from-zinc-800 via-rose-950 to-zinc-900 p-3.5 text-white flex flex-col justify-between relative overflow-hidden shadow-md">
                      <div className="absolute right-0 top-0 w-24 h-24 bg-white/[0.03] rounded-full blur-lg" />
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[7.5px] font-mono tracking-widest text-white/50 block leading-none">PREMIUM SUTI CARD</span>
                          <span className="text-[11.5px] font-extrabold text-rose-300 block tracking-tight leading-none mt-1">Hermosillo Salud</span>
                        </div>
                        <div className="h-4.5 w-7 bg-yellow-500/70 rounded-md border border-white/10 flex items-center justify-center">
                          <div className="grid grid-cols-2 gap-0.5 w-full h-full p-0.5">
                            <span className="bg-zinc-850/50 rounded-xs" />
                            <span className="bg-zinc-850/50 rounded-xs" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="font-mono text-xs tracking-wider text-rose-200">•••• •••• •••• 3584</p>
                          <span className="text-[7.5px] text-white/40 font-mono block mt-0.5">EXPIRES: 09/2029</span>
                        </div>
                        <span className="text-xs font-black tracking-tight italic font-mono text-zinc-100">VISA</span>
                      </div>
                    </div>

                    <div className="text-left pt-1 flex justify-between border-t border-zinc-100 dark:border-zinc-800 mt-1">
                      <span className="text-[9px] text-zinc-400 font-sans font-bold uppercase">Available overdraft</span>
                      <span className="text-[10px] font-mono text-zinc-500 font-extrabold">200,000.00 ALL</span>
                    </div>
                  </div>

                  {/* Account Card 2: Travel EUR Account */}
                  <div className="bg-white dark:bg-zinc-900 rounded-[26px] p-5.5 shadow-neomorph border border-white/60 dark:border-zinc-800/60 flex flex-col justify-between h-[190px]">
                    <div className="flex items-center gap-3">
                      <div className="h-9.5 w-9.5 rounded-xl bg-[#FF2B54]/10 text-[#FF2B54] flex items-center justify-center border border-[#FF2B54]/20 flex-shrink-0">
                        <svg className="h-5.5 w-5.5 fill-current" viewBox="0 0 24 24">
                          <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-10-2h4v2h-4V4zm10 15H4V8h16v11z" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-[11.5px] font-extrabold text-zinc-850 dark:text-zinc-100 block">Travel EUR account</span>
                        <span className="text-[8px] text-zinc-400 font-mono font-bold uppercase block leading-none mt-0.5">SITI-FACS-920</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <h4 className="font-mono text-lg font-black text-zinc-900 dark:text-white leading-none">403.82 EUR</h4>
                      <p className="text-[11.5px] font-mono text-zinc-400 font-black mt-2 leading-none">50,000.00 ALL</p>
                    </div>

                    <div className="text-[9px] text-zinc-400 italic leading-snug border-t border-zinc-100 dark:border-zinc-800 pt-3">
                      Fondo Vacacional Sindical para viajes nacionales aprobados quincenalmente.
                    </div>
                  </div>
                </div>

                {/* Add new plan dashed box button */}
                <button 
                  onClick={() => onOpenOverlay('financiera')}
                  className="w-full bg-slate-100/50 dark:bg-zinc-950 rounded-[22px] p-4 border border-dashed border-zinc-300 dark:border-zinc-800 flex items-center justify-center gap-2.5 hover:bg-zinc-200/40 transition-all cursor-pointer h-14"
                >
                  <div className="h-7 w-7 rounded-full bg-white dark:bg-zinc-900 flex items-center justify-center shadow-xs text-zinc-550 border border-zinc-200/50">
                    <span className="text-base font-black leading-none">+</span>
                  </div>
                  <span className="text-[10.5px] text-zinc-500 font-extrabold uppercase tracking-widest">Add new saving plan</span>
                </button>
              </div>

            </motion.div>
          )}

          {/* ======================= SUBVIEW: TRANSACTIONS (Mockup 4) ======================= */}
          {bktTopTab === 'transactions' && (
            <motion.div
              key="finance-transactions"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4 text-left"
            >
              {/* Category Circle Filters Row */}
              <div className="flex gap-4 justify-around py-1 px-1 select-none">
                {/* Button 1: Wallet (Active or Inactive) */}
                <button 
                  onClick={() => { setActiveCategory('all'); triggerToast("Ver todas las transacciones."); }}
                  className={`h-11.5 w-11.5 rounded-[16px] flex items-center justify-center transition-all ${
                    activeCategory === 'all' 
                      ? 'bg-gradient-to-tr from-[#FF2B54] to-[#FF4D3B] text-white shadow-md shadow-[#FF2B54]/20 border border-transparent'
                      : 'bg-white dark:bg-zinc-900 text-[#FF2B54] border border-white/50 dark:border-zinc-850 shadow-sm hover:scale-102'
                  }`}
                >
                  <svg className="h-5.5 w-5.5 fill-current" viewBox="0 0 24 24">
                    <path d="M21 18H3V6h18v12zm-9-2c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z" />
                  </svg>
                </button>
                {/* Button 2: Briefcase */}
                <button 
                  onClick={() => { setActiveCategory('briefcase'); triggerToast("Filtro: Solicitudes de préstamos SUTI."); }}
                  className={`h-11.5 w-11.5 rounded-[16px] flex items-center justify-center transition-all ${
                    activeCategory === 'briefcase' 
                      ? 'bg-gradient-to-tr from-[#FF2B54] to-[#FF4D3B] text-white shadow-md shadow-[#FF2B54]/20 border border-transparent'
                      : 'bg-white dark:bg-zinc-900 text-[#FF2B54] border border-white/50 dark:border-zinc-850 shadow-sm hover:scale-102'
                  }`}
                >
                  <svg className="h-5.5 w-5.5 fill-current" viewBox="0 0 24 24">
                    <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-10-2h4v2h-4V4zm10 15H4V8h16v11z" />
                  </svg>
                </button>
                {/* Button 3: Piggy trust */}
                <button 
                  onClick={() => { setActiveCategory('savings'); triggerToast("Filtro: Depósitos en caja de ahorros."); }}
                  className={`h-11.5 w-11.5 rounded-[16px] flex items-center justify-center transition-all ${
                    activeCategory === 'savings' 
                      ? 'bg-gradient-to-tr from-[#FF2B54] to-[#FF4D3B] text-white shadow-md shadow-[#FF2B54]/20 border border-transparent'
                      : 'bg-white dark:bg-zinc-900 text-[#FF2B54] border border-white/50 dark:border-zinc-850 shadow-sm hover:scale-102'
                  }`}
                >
                  <svg className="h-5.5 w-5.5 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                {/* Button 4: Credit card */}
                <button 
                  onClick={() => { setActiveCategory('card'); triggerToast("Filtro: Adelantos de nómina Hermosillo."); }}
                  className={`h-11.5 w-11.5 rounded-[16px] flex items-center justify-center transition-all ${
                    activeCategory === 'card' 
                      ? 'bg-gradient-to-tr from-[#FF2B54] to-[#FF4D3B] text-white shadow-md shadow-[#FF2B54]/20 border border-transparent'
                      : 'bg-white dark:bg-zinc-900 text-[#FF2B54] border border-white/50 dark:border-zinc-850 shadow-sm hover:scale-102'
                  }`}
                >
                  <svg className="h-5.5 w-5.5 fill-none stroke-current stroke-[2]" viewBox="0 0 24 24">
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2 10h20m-6 4h2" />
                  </svg>
                </button>
              </div>

              {/* Transactions Search Bar */}
              <div className="relative">
                <div className="flex items-center gap-2.5 bg-white dark:bg-zinc-900 border border-white/60 dark:border-zinc-850 rounded-[18px] px-3.5 py-1.5 shadow-neomorph-light">
                  <Search className="h-4.5 w-4.5 text-zinc-400" />
                  <input 
                    type="text" 
                    placeholder="Search transactions..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent text-xs font-sans text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 outline-none border-none py-1"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="p-1 text-zinc-400 hover:text-red-500 font-bold text-xs select-none cursor-pointer">✕</button>
                  )}
                </div>
              </div>

              {/* Translucent "Pending Transactions (2)" Collapsible banner */}
              <div className="bg-white dark:bg-zinc-900 rounded-[20px] p-3.5 border border-white/70 dark:border-zinc-850 shadow-neomorph-light">
                <button 
                  onClick={() => setShowPending(!showPending)}
                  className="w-full flex justify-between items-center cursor-pointer text-left font-sans"
                >
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                    <span className="text-[11.5px] font-extrabold text-zinc-850 dark:text-zinc-150">Pending transactions (2)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs font-black text-rose-500">1,857.28 ALL</span>
                    <ChevronDown className={`h-4.5 w-4.5 text-zinc-400 transition-transform ${showPending ? 'transform rotate-180' : ''}`} />
                  </div>
                </button>

                {showPending && (
                  <div className="mt-3.5 border-t border-zinc-100 dark:border-zinc-800 pt-3 space-y-2.5 animate-fade-in text-left">
                    <div className="flex justify-between items-center text-[10.5px]">
                      <div>
                        <span className="font-extrabold text-zinc-800 dark:text-zinc-200 block leading-none">Comité de Vigilancia SUTI</span>
                        <span className="text-[8px] text-zinc-400 tracking-tight block mt-1 font-mono">Retención provisional por validar</span>
                      </div>
                      <span className="font-mono font-black text-zinc-900 dark:text-zinc-100">1,200.00 ALL</span>
                    </div>
                    <div className="flex justify-between items-center text-[10.5px]">
                      <div>
                        <span className="font-extrabold text-zinc-800 dark:text-zinc-200 block leading-none">Abono Quincenal Emergencia</span>
                        <span className="text-[8px] text-zinc-400 tracking-tight block mt-1 font-mono">Retención pendiente de dispersión</span>
                      </div>
                      <span className="font-mono font-black text-rose-500">-657.28 ALL</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Grouped lists */}
              <div className="space-y-4 pt-1">
                <span className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest px-0.5">Yesterday</span>
                
                <div className="space-y-3">
                  {/* Item 1: OSHEE Sh.a. (Utility payment) */}
                  <div className="bg-white dark:bg-zinc-900 rounded-[22px] p-3.5 border border-white/50 dark:border-zinc-850 shadow-neomorph-light flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="h-9.5 w-9.5 rounded-full bg-orange-100 dark:bg-orange-950/20 text-orange-500 border border-orange-200/50 flex items-center justify-center flex-shrink-0">
                        <svg className="h-5 w-5 stroke-current fill-none stroke-[2]" viewBox="0 0 24 24">
                          <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div>
                        <span className="font-extrabold text-[11.5px] text-zinc-900 dark:text-zinc-100 block leading-none">OSHEE Sh.a.</span>
                        <span className="text-[8px] text-zinc-400 font-mono mt-0.5 block leading-none">SUTI-UTILITY • Hermosillo</span>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-black text-zinc-900 dark:text-white">- 4,952.89 ALL</span>
                  </div>

                  {/* Item 2: Agim Dervishi (profile transfer) */}
                  <div className="bg-white dark:bg-zinc-900 rounded-[22px] p-3.5 border border-white/50 dark:border-zinc-850 shadow-neomorph-light flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="h-9.5 w-9.5 rounded-full overflow-hidden border border-zinc-200 shadow-xs flex-shrink-0">
                        <img 
                          src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" 
                          alt="Agim Dervishi" 
                          className="h-full w-full object-cover" 
                        />
                      </div>
                      <div>
                        <span className="font-extrabold text-[11.5px] text-zinc-900 dark:text-zinc-100 block leading-none">Agim Dervishi</span>
                        <span className="text-[8px] text-zinc-400 font-mono mt-0.5 block leading-none">PRESTAMO SALDO • SutiApp</span>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-black text-emerald-500">+ 2,000.00 ALL</span>
                  </div>
                </div>
              </div>

              {/* Grouped 2 */}
              <div className="space-y-4 pt-1">
                <span className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest px-0.5">20 May</span>
                
                <div className="bg-white dark:bg-zinc-900 rounded-[22px] p-3.5 border border-white/50 dark:border-zinc-850 shadow-neomorph-light flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="h-9.5 w-9.5 rounded-full bg-rose-50 dark:bg-rose-950/20 text-[#FF2B54] border border-rose-200 flex items-center justify-center flex-shrink-0">
                      <svg className="h-5 w-5 stroke-current fill-none stroke-[2]" viewBox="0 0 24 24">
                        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-extrabold text-[11.5px] text-zinc-900 dark:text-zinc-100 block leading-none">Spar Market</span>
                      <span className="text-[8px] text-zinc-400 font-mono mt-0.5 block leading-none">VALE DESCUENTO • SUTISSSTESON</span>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-black text-zinc-900 dark:text-white">- 618.35 ALL</span>
                </div>
              </div>

            </motion.div>
          )}

          {/* ======================= SUBVIEW: BUDGET (Mockup 1) ======================= */}
          {bktTopTab === 'budget' && (
            <motion.div
              key="finance-budget"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-5 text-left"
            >
              {/* Month tabs select bar */}
              <div className="flex justify-around items-center bg-white dark:bg-zinc-900 border border-white/60 dark:border-zinc-850 rounded-full px-2 py-1.5 shadow-neomorph-light select-none">
                <span className="text-[9.5px] text-zinc-400 font-bold cursor-pointer hover:text-zinc-650" onClick={() => triggerToast("March historical data loaded.")}>March</span>
                <span className="text-[9.5px] text-zinc-400 font-bold cursor-pointer hover:text-zinc-650" onClick={() => triggerToast("April historical data loaded.")}>April</span>
                <span className="text-[10px] text-zinc-900 dark:text-white font-extrabold bg-[#F0F0F3] dark:bg-zinc-800 px-4 py-1.2 rounded-full cursor-pointer shadow-neomorph-inset">May</span>
                <span className="text-[9.5px] text-zinc-400 font-bold cursor-pointer hover:text-zinc-650" onClick={() => triggerToast("Planned June forecast loaded.")}>Planned</span>
              </div>

              {/* High-Fidelity Donut Progress ring container */}
              <div className="bg-white dark:bg-zinc-900 rounded-[28px] p-5.5 shadow-neomorph border border-white/60 dark:border-zinc-800/60 flex flex-col items-center">
                
                <div className="flex flex-col sm:flex-row items-center gap-6 w-full justify-around pt-1">
                  
                  {/* Concentric Gauge SVG */}
                  <div className="relative h-28 w-28 flex items-center justify-center flex-shrink-0 bg-transparent rounded-full select-none">
                    <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                      {/* Grey Base */}
                      <circle cx="50" cy="50" r="38" fill="transparent" stroke="#E2E8F0" strokeWidth="7" className="dark:stroke-zinc-800" />
                      
                      {/* Available segment: Green (55%) */}
                      <circle 
                        cx="50" cy="50" r="38" fill="transparent" 
                        stroke="#10B981" strokeWidth="7" 
                        strokeDasharray="131.3 238.76" 
                        strokeDashoffset="0" 
                        strokeLinecap="round"
                      />
                      
                      {/* Spendings segment: Orange (30%) */}
                      <circle 
                        cx="50" cy="50" r="38" fill="transparent" 
                        stroke="#FF4F3B" strokeWidth="7" 
                        strokeDasharray="71.6 238.76" 
                        strokeDashoffset="-131.3" 
                        strokeLinecap="round"
                      />
                      
                      {/* Planned segment: Yellow (15%) */}
                      <circle 
                        cx="50" cy="50" r="38" fill="transparent" 
                        stroke="#F59E0B" strokeWidth="7" 
                        strokeDasharray="35.8 238.76" 
                        strokeDashoffset="-202.9" 
                        strokeLinecap="round"
                      />
                    </svg>
                    
                    {/* Inner Center Text labels */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
                      <span className="text-[7px] text-zinc-400 uppercase tracking-widest font-black leading-none">Available to spend</span>
                      <span className="font-mono text-[12px] font-black text-zinc-850 dark:text-zinc-100 mt-1 leading-none">69,950.00</span>
                      <span className="text-[7.5px] text-zinc-450 font-black tracking-wider mt-0.5">ALL</span>
                    </div>
                  </div>

                  {/* Vertical legend aligned identical to Mockup 1 */}
                  <div className="flex flex-col gap-2.5 text-left flex-shrink-0 min-w-[105px]">
                    <div className="flex items-center gap-2">
                      <span className="h-1.8 w-1.8 rounded-full bg-[#10B981] border border-white" />
                      <div>
                        <span className="text-[9px] text-zinc-400 font-extrabold block leading-none">Available</span>
                        <span className="font-mono text-[10.5px] font-bold text-zinc-700 dark:text-zinc-300 block mt-0.5">115,000.00 ALL</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-1.8 w-1.8 rounded-full bg-[#FF4F3B] border border-white" />
                      <div>
                        <span className="text-[9px] text-zinc-400 font-extrabold block leading-none">Spendings</span>
                        <span className="font-mono text-[10.5px] font-bold text-zinc-700 dark:text-zinc-300 block mt-0.5">150,050.00 ALL</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-1.8 w-1.8 rounded-full bg-[#F59E0B] border border-white" />
                      <div>
                        <span className="text-[9px] text-zinc-400 font-extrabold block leading-none">Planned</span>
                        <span className="font-mono text-[10.5px] font-bold text-zinc-700 dark:text-zinc-300 block mt-0.5">13,366.89 ALL</span>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="text-center w-full pt-3.5 border-t border-zinc-100 dark:border-zinc-800 mt-3.5">
                  <span className="text-[8px] text-zinc-400 font-extrabold uppercase tracking-widest block leading-none">MY BUDGET 200,000.00 ALL</span>
                </div>
              </div>

              {/* Multi-tier Income and spendings columns */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-zinc-900 rounded-[22px] p-4 shadow-neomorph-light border border-white/60 dark:border-zinc-850 flex justify-between items-center">
                  <div>
                    <span className="text-[8.5px] uppercase tracking-wider font-extrabold text-zinc-400 block leading-none">Income</span>
                    <h4 className="font-mono text-[11px] font-black text-zinc-905 dark:text-zinc-150 mt-2 block leading-none">250,000.00 ALL</h4>
                  </div>
                  <div className="h-6.5 w-6.5 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 flex-shrink-0">
                    <span className="font-sans font-bold text-xs">↑</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-zinc-900 rounded-[22px] p-4 shadow-neomorph-light border border-white/60 dark:border-zinc-850 flex justify-between items-center">
                  <div>
                    <span className="text-[8.5px] uppercase tracking-wider font-extrabold text-zinc-400 block leading-none">Spendings</span>
                    <h4 className="font-mono text-[11px] font-black text-zinc-905 dark:text-zinc-150 mt-2 block leading-none">150,050.00 ALL</h4>
                  </div>
                  <div className="h-6.5 w-6.5 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 flex-shrink-0">
                    <span className="font-sans font-bold text-xs">↓</span>
                  </div>
                </div>
              </div>

              {/* Planned Spendings details list */}
              <div className="space-y-3">
                <div className="flex justify-between items-baseline px-0.5">
                  <span className="text-[10px] font-extrabold text-[#5c6880] uppercase tracking-widest block leading-none">Planned spendings</span>
                  <span className="font-mono text-xs font-black text-zinc-800 dark:text-zinc-200">13,366.89 ALL</span>
                </div>

                <div className="bg-white dark:bg-zinc-900 rounded-[22px] border border-white/60 dark:border-zinc-850 shadow-neomorph-light overflow-hidden divide-y divide-zinc-100 dark:divide-zinc-800 text-left text-[10.5px]">
                  <div className="p-3.5 flex justify-between items-center">
                    <div>
                      <span className="font-extrabold text-zinc-800 dark:text-zinc-200 block">Previsión Social Quincenal</span>
                      <span className="text-[8px] text-zinc-400 block tracking-tight mt-0.5 font-sans">Retención voluntaria directa</span>
                    </div>
                    <span className="font-mono font-black text-zinc-900 dark:text-zinc-100">$1,200.00 ALL</span>
                  </div>

                  <div className="p-3.5 flex justify-between items-center">
                    <div>
                      <span className="font-extrabold text-zinc-800 dark:text-zinc-200 block">Abono Seguro Emergencia</span>
                      <span className="text-[8px] text-zinc-400 block tracking-tight mt-0.5 font-sans">Retención autorizada de talón</span>
                    </div>
                    <span className="font-mono font-black text-zinc-900 dark:text-zinc-100">$1,820.00 ALL</span>
                  </div>

                  <div className="p-3.5 flex justify-between items-center">
                    <div>
                      <span className="font-extrabold text-zinc-800 dark:text-zinc-200 block">Caja de Ahorros Recurrente</span>
                      <span className="text-[8px] text-zinc-400 block tracking-tight mt-0.5 font-sans">Retención programada quincenal</span>
                    </div>
                    <span className="font-mono font-black text-emerald-500">$1,500.00 ALL</span>
                  </div>
                </div>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
