import React, { useState, useEffect } from 'react';
import { 
  ApplicationTx, 
  UnionMember 
} from './types';
import { 
  CURRENT_MEMBER_MOCK, 
  COMMITTEE_MEMBERS, 
  NEWS_FEED_MOCK, 
  INITIAL_TRANSACTIONS_MOCK,
  FINANCIAL_PROGRAMS
} from './mockData';
import { CredencialDigital } from './components/CredencialDigital';
import { FinancieraSimulator } from './components/FinancieraSimulator';
import { CargaDocumentos } from './components/CargaDocumentos';
import { ConveniosMarketplace } from './components/ConveniosMarketplace';
import { AdminSaaSView } from './components/AdminSaaSView';
import { TutorialsOnboarding } from './components/TutorialsOnboarding';
import { MyFinanceView } from './components/MyFinanceView';
import { MyPaymentsView } from './components/MyPaymentsView';
import { MyProductsView } from './components/MyProductsView';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Smartphone, 
  LayoutDashboard, 
  Coins, 
  Clock, 
  FileText, 
  HelpCircle, 
  Sparkles, 
  CreditCard,
  TrendingUp,
  AlertCircle,
  Bell,
  Sun,
  Moon,
  Building,
  ArrowUpRight,
  ShieldCheck,
  ChevronRight,
  MapPin,
  Check,
  Zap,
  Gift
} from 'lucide-react';

export default function App() {
  const [viewMode, setViewMode] = useState<'mobile' | 'admin'>('mobile');
  const [isDark, setIsDark] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<ApplicationTx[]>(INITIAL_TRANSACTIONS_MOCK);
  const [member, setMember] = useState<UnionMember>(CURRENT_MEMBER_MOCK);
  const [activeMobileTab, setActiveMobileTab] = useState<'inicio' | 'financiera' | 'convenios' | 'historial' | 'credencial' | 'documentos' | 'soporte'>('inicio');
  const [activeMobileSection, setActiveMobileSection] = useState<'finance' | 'payments' | 'products'>('finance');
  const [bktTopTab, setBktTopTab] = useState<'overview' | 'transactions' | 'budget'>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  // Push Notifications simulation
  const [notifications, setNotifications] = useState<string[]>([
    "¡Nuevo convenio! Recibe 35% de descuento en Ópticas Devlyn con tu SutiApp.",
    "El Comité de Finanzas aprobó tu solicitud previa de Préstamo de Emergencia quincenal.",
    "Por seguridad institucional, recuerda verificar tu Talón de Pago #1 antes del cierre de nómina."
  ]);
  const [showNotificationToast, setShowNotificationToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowNotificationToast(true);
    setTimeout(() => {
      setShowNotificationToast(false);
    }, 4500);
  };

  // Add a new transaction from the simulator
  const handleAddTransaction = (newTx: Omit<ApplicationTx, 'id' | 'date' | 'status' | 'progress'>) => {
    const freshTx: ApplicationTx = {
      ...newTx,
      id: `TX-${Math.floor(Math.random() * 90000) + 10000}`,
      date: new Date().toISOString().split('T')[0],
      status: 'review',
      progress: 30
    };
    setTransactions([freshTx, ...transactions]);
    
    // Simulate smart push notification feedback
    setNotifications(prev => [`Nueva Solicitud ${freshTx.id} enviada al Comité Técnico de Vigilancia.`, ...prev]);
    triggerToast(`¡Tu solicitud de ${newTx.title} por $${newTx.amount.toLocaleString('es-MX')} ha sido enviada para validación del Comité!`);
  };

  // Update administrative transaction status
  const handleUpdateTxStatus = (txId: string, newStatus: ApplicationTx['status']) => {
    setTransactions(prev => prev.map(tx => {
      if (tx.id === txId) {
        let progressVal = 30;
        if (newStatus === 'disbursed' || newStatus === 'active') progressVal = 100;
        if (newStatus === 'missing_docs') progressVal = 60;
        if (newStatus === 'rejected') progressVal = 100;
        return { ...tx, status: newStatus, progress: progressVal };
      }
      return tx;
    }));

    const affectedTx = transactions.find(t => t.id === txId);
    const resolvedTitle = affectedTx ? affectedTx.title : "Trámite";
    
    let statusTextMsg = "";
    if (newStatus === 'disbursed') statusTextMsg = "¡Aprobada y Dispersada en tu Nómina!";
    if (newStatus === 'missing_docs') statusTextMsg = "Falta Documento de Talón Vigente.";
    if (newStatus === 'rejected') statusTextMsg = "Rechazada por exceder límite nominal.";

    setNotifications(prev => [`Tu ${resolvedTitle} (${txId}) cambió a estado: ${newStatus.toUpperCase()}`, ...prev]);
    triggerToast(`Notificación SutiApp: Tu ${resolvedTitle} ${txId} ha sido actualizada a: ${statusTextMsg}`);
  };

  // Update biometric documents uploaded
  const handleUpdateDocuments = (updatedDocs: UnionMember['documents']) => {
    setMember(prev => ({
      ...prev,
      documents: updatedDocs
    }));
    triggerToast("Documento cargado con éxito. Se ha enviado una copia encriptada al buzón del Comité.");
  };

  const getActiveTxCount = () => {
    return transactions.filter(t => t.status === 'review').length;
  };

  return (
    <div className={`${isDark ? 'dark bg-zinc-950' : 'bg-slate-50/50'} min-h-screen text-zinc-900 dark:text-zinc-100 flex flex-col font-sans antialiased pb-12 transition-all duration-300`}>
      
      {/* GLOBAL SYSTEM BAR / MASTER NAVIGATION HEADER */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-zinc-900/95 backdrop-blur-md border-b border-zinc-200/50 dark:border-zinc-850 shadow-sm px-4 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Union Brand Logo */}
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 bg-gradient-to-tr from-rose-950 to-red-650 rounded-xl flex items-center justify-center text-white border border-amber-500/10">
            <Building className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-black tracking-tight text-base text-zinc-850 dark:text-zinc-100">SutiApp</span>
              <span className="px-1.5 py-0.5 rounded-md bg-rose-900 text-[8.5px] font-mono font-bold text-white uppercase tracking-wider">Rediseño UX/UI v2.5</span>
            </div>
            <p className="text-[10px] text-zinc-400 font-medium">Sindicato Único de Trabajadores del ISSTESON</p>
          </div>
        </div>

        {/* Master dual view selector */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Dual Pill toggle button */}
          <div className="bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl flex items-center w-full md:w-auto border border-zinc-200/30">
            <button
              onClick={() => setViewMode('mobile')}
              className={`flex-1 md:flex-initial px-4 py-2 rounded-lg text-xs font-bold font-sans flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
                viewMode === 'mobile'
                  ? 'bg-rose-900 text-white shadow-md shadow-rose-900/10'
                  : 'text-zinc-550 dark:text-zinc-400 hover:text-zinc-800'
              }`}
            >
              <Smartphone className="h-4 w-4" />
              <span>Vista Afiliado (Móvil)</span>
            </button>
            <button
              onClick={() => setViewMode('admin')}
              className={`flex-1 md:flex-initial px-4 py-2 rounded-lg text-xs font-bold font-sans flex items-center justify-center gap-2 transition-all duration-300 relative cursor-pointer ${
                viewMode === 'admin'
                  ? 'bg-rose-900 text-white shadow-md shadow-rose-900/10'
                  : 'text-zinc-550 dark:text-zinc-400 hover:text-zinc-800'
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Consola Administrador (SaaS)</span>
              {getActiveTxCount() > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-amber-500 text-[8px] font-mono text-white flex items-center justify-center animate-bounce font-bold">
                  {getActiveTxCount()}
                </span>
              )}
            </button>
          </div>

          {/* Quick theme toggler */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2.5 rounded-xl border border-zinc-200/40 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-950 text-zinc-400 hover:text-rose-900 bg-white dark:bg-zinc-950 transition-colors cursor-pointer"
            title="Cambiar Contraste Visual SutiApp"
          >
            {isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </header>

      {/* REACTIVE SYSTEM NOTIFICATION TOAST POPUP */}
      <AnimatePresence>
        {showNotificationToast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="fixed bottom-6 right-6 z-55 max-w-sm bg-zinc-900 text-white border border-amber-500/20 p-4 rounded-2xl shadow-2xl flex gap-3.5 items-start"
          >
            <div className="h-8.5 w-8.5 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/30 flex-shrink-0 mt-0.5">
              <Bell className="h-4 w-4 text-amber-400 animate-pulse" />
            </div>
            <div>
              <div className="flex justify-between items-baseline">
                <span className="text-[9px] uppercase font-mono tracking-widest text-amber-400 font-bold">Notificación SUTI</span>
                <span className="text-[8px] font-mono text-zinc-400">Ahora mismo</span>
              </div>
              <p className="text-[11px] text-zinc-200 mt-1 leading-normal font-sans font-medium">
                {toastMessage}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CORE WORKSPACE ROUTE BODY */}
      <main className="max-w-7xl mx-auto w-full px-4 lg:px-8 mt-6">
        <AnimatePresence mode="wait">
          
          {/* ======================= VIEW MODE: MOBILE APP SIMULATOR ======================= */}
          {viewMode === 'mobile' && (
            <motion.div
              key="mobile-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Left column / Smartphone frame inside premium showroom display card */}
              <div className="lg:col-span-5 flex justify-center bg-radial from-[#220220] via-[#0b0412] to-[#04010a] rounded-[48px] p-6 pb-8 border border-violet-950/40 relative overflow-hidden shadow-2xl">
                {/* Immersive background backlight glow spheres to simulate the premium design mockup vibe */}
                <div className="absolute -top-16 -left-16 w-64 h-64 bg-[#ff334b]/12 rounded-full blur-[80px] pointer-events-none" />
                <div className="absolute bottom-12 right-4 w-72 h-72 bg-fuchsia-600/8 rounded-full blur-[90px] pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-pink-500/5 pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full border border-[#ff334b]/5 pointer-events-none" />
                
                {/* Smartphone Device mockup frame with luxurious graphite/titanium bezel */}
                <div className="relative w-full max-w-[365px] h-[720px] rounded-[46px] border-[10px] border-[#18181b] shadow-2xl bg-zinc-50 dark:bg-zinc-950 overflow-hidden flex flex-col justify-between ring-4 ring-zinc-900/40">
                  
                  {/* Smartphone safe notch, camera & speaker bar */}
                  <div className="absolute top-0 inset-x-0 h-6 bg-transparent z-50 flex justify-between items-center px-6">
                    {/* Time indicator */}
                    <span className="text-[10px] font-mono text-zinc-100 font-extrabold select-none">9:41</span>
                    
                    {/* Bezel Notch */}
                    <div className="h-4 w-28 bg-zinc-950 rounded-b-xl flex items-center justify-center">
                      <div className="h-1.5 w-8 bg-zinc-900 rounded-full" />
                      <div className="h-1.5 w-1.5 bg-zinc-900 rounded-full ml-1" />
                    </div>
                    
                    {/* Cellular, Wifi & Battery symbols matching reference */}
                    <div className="flex items-center gap-1.5 text-[9px] font-mono text-zinc-100">
                      <svg className="h-2.5 w-2.5 text-zinc-100" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 3c-1.2 0-2.4.4-3.4 1.2L2.3 9.4c-.4.3-.4.8 0 1.1l1.5 1.5c.3.3.8.3 1.1 0l5.7-4.4c.8-.6 1.8-.6 2.6 0l5.7 4.4c.3.3.8.3 1.1 0l1.5-1.5c.4-.3.4-.8 0-1.1L15.4 4.2C14.4 3.4 13.2 3 12 3z" />
                      </svg>
                      <span className="font-extrabold tracking-tight text-[8px]">Sonora 5G</span>
                      <div className="w-5 h-2.5 bg-white/20 border border-white/40 rounded-sm p-0.2 flex items-center">
                        <div className="bg-emerald-400 h-full w-4/5 rounded-2xs" />
                      </div>
                    </div>
                  </div>

                  {/* SMARTPHONE APP CONTENT */}
                  <div className="flex-1 flex flex-col pt-0 bg-[#F0F0F3] dark:bg-zinc-950 relative overflow-hidden select-none">
                    {/* Immersive head navigation bar for active subpage overlays */}
                    {activeMobileTab !== 'inicio' && (
                      <div className="bg-gradient-to-br from-[#FF2B54] to-[#DF162C] pt-6 pb-4 px-5 text-white flex-shrink-0 relative overflow-hidden select-none z-20">
                        <div className="flex items-center justify-between relative z-10 animate-fade-in">
                          <button 
                            onClick={() => {
                              setActiveMobileTab('inicio');
                              triggerToast("Regresando a Finanzas Personales");
                            }}
                            className="h-8 px-3 bg-white/12 hover:bg-white/20 border border-white/20 rounded-[12px] flex items-center justify-center gap-1.5 transition-all cursor-pointer font-sans text-[10px] font-black shadow-xs active:scale-95 text-white"
                          >
                            <span>← REGRESAR</span>
                          </button>
                          <span className="text-[8px] uppercase tracking-[0.16em] font-mono text-white/85 font-black leading-none bg-black/15 px-2.5 py-1.2 rounded-md">
                            {activeMobileTab === 'financiera' ? 'SIMULADOR DE CREDITO' : activeMobileTab === 'convenios' ? 'CONVENIOS Y DESCUENTOS' : activeMobileTab.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex-1 flex flex-col overflow-hidden relative">
                      <AnimatePresence mode="wait">
                          {/* Tab 1: Inicio de la App incorporating Behance "BKT Smart" modular layouts */}
                          {activeMobileTab === 'inicio' && (
                            <motion.div
                              key="bkt-digital-finance-showroom"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex-1 flex flex-col h-full bg-[#F0F0F3] dark:bg-zinc-950 overflow-hidden"
                            >
                              {activeMobileSection === 'finance' && (
                                <MyFinanceView
                                  member={member}
                                  transactions={transactions}
                                  committeeMembers={COMMITTEE_MEMBERS}
                                  searchQuery={searchQuery}
                                  setSearchQuery={setSearchQuery}
                                  triggerToast={triggerToast}
                                  onOpenOverlay={(tab) => {
                                    setActiveMobileTab(tab);
                                  }}
                                />
                              )}
                              {activeMobileSection === 'payments' && (
                                <MyPaymentsView
                                  member={member}
                                  transactions={transactions}
                                  committeeMembers={COMMITTEE_MEMBERS}
                                  searchQuery={searchQuery}
                                  setSearchQuery={setSearchQuery}
                                  triggerToast={triggerToast}
                                  onOpenOverlay={(tab) => {
                                    setActiveMobileTab(tab);
                                  }}
                                />
                              )}
                              {activeMobileSection === 'products' && (
                                <MyProductsView
                                  member={member}
                                  searchQuery={searchQuery}
                                  setSearchQuery={setSearchQuery}
                                  triggerToast={triggerToast}
                                  onOpenOverlay={(tab) => {
                                    setActiveMobileTab(tab);
                                  }}
                                />
                              )}
                            </motion.div>
                          )}

                          {/* OLD MONOLITH DEPRECATED BY UXDA DESIGN DIRECTION */}
                          {activeMobileTab === 'legacy_inicio' && (
                            <motion.div
                              key="bkt-digital-finance"
                              initial={{ opacity: 0, scale: 0.98 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0 }}
                              className="space-y-4"
                            >
                              
                              {/* OVERVIEW SECTION CONTENT */}
                              {bktTopTab === 'overview' && (
                                <div className="space-y-4 pt-1 text-left">
                                  {/* Action Pending Horizonal scrolling cards */}
                                  <div className="flex gap-3 overflow-x-auto pb-1.5 scrollbar-none snap-x snap-mandatory">
                                    {/* Card 1 */}
                                    <div className="min-w-[245px] max-w-[245px] bg-white dark:bg-zinc-900 rounded-[20px] p-3 shadow-xs border border-zinc-200/20 dark:border-zinc-800 flex items-center justify-between snap-start">
                                      <div className="flex items-center gap-2 text-left">
                                        <div className="w-8.5 h-8.5 rounded-full ring-2 ring-[#B91C1C]/10 overflow-hidden flex-shrink-0">
                                          <img src={COMMITTEE_MEMBERS[0].photo} className="w-full h-full object-cover" alt="Arturo" />
                                        </div>
                                        <div className="text-left">
                                          <h5 className="font-extrabold text-[10px] text-[#0f172a] dark:text-zinc-100 leading-tight">Arturo Ruiz</h5>
                                          <p className="text-[8px] text-zinc-400 mt-0.5 leading-none">Pensión aprobada</p>
                                        </div>
                                      </div>
                                      <span className="font-mono text-[11px] font-black text-[#B91C1C] dark:text-red-400">+$45,000</span>
                                    </div>

                                    {/* Card 2 */}
                                    <div className="min-w-[245px] max-w-[245px] bg-white dark:bg-zinc-900 rounded-[20px] p-3 shadow-xs border border-zinc-200/20 dark:border-zinc-800 flex items-center justify-between snap-start">
                                      <div className="flex items-center gap-2 text-left">
                                        <div className="w-8.5 h-8.5 rounded-full ring-2 ring-amber-500/10 overflow-hidden flex-shrink-0">
                                          <img src={COMMITTEE_MEMBERS[1].photo} className="w-full h-full object-cover" alt="Mónica" />
                                        </div>
                                        <div className="text-left">
                                          <h5 className="font-extrabold text-[10px] text-[#0f172a] dark:text-zinc-100 leading-tight">Mónica Arana</h5>
                                          <p className="text-[8px] text-zinc-400 mt-0.5 leading-none">Falta Talón de Pago #2</p>
                                        </div>
                                      </div>
                                      <span className="font-sans text-[8px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 font-bold uppercase tracking-tight">Pending</span>
                                    </div>

                                    {/* Card 3 */}
                                    <div className="min-w-[245px] max-w-[245px] bg-white dark:bg-zinc-900 rounded-[20px] p-3 shadow-xs border border-zinc-200/20 dark:border-zinc-800 flex items-center justify-between snap-start">
                                      <div className="flex items-center gap-2 text-left">
                                        <div className="w-8.5 h-8.5 rounded-full bg-rose-50 dark:bg-rose-950/20 text-[#be123c] flex items-center justify-center text-xs font-bold ring-2 ring-[#be123c]/10 flex-shrink-0">
                                          %
                                        </div>
                                        <div className="text-left">
                                          <h5 className="font-extrabold text-[10px] text-[#0f172a] dark:text-zinc-100 font-sans leading-tight">Ópticas Devlyn</h5>
                                          <p className="text-[8px] text-zinc-400 mt-0.5 leading-none font-sans">Convenio del Sindicato</p>
                                        </div>
                                      </div>
                                      <span className="font-mono text-[11px] font-black text-emerald-500">-35% Off</span>
                                    </div>
                                  </div>

                                  {/* Main Balance block: Available Balance & My Balance columns */}
                                  <div className="bg-white dark:bg-zinc-900 rounded-[22px] p-4.5 shadow-xs border border-zinc-150 dark:border-zinc-850 text-left">
                                    <div className="grid grid-cols-2 gap-2">
                                      <div className="text-left">
                                        <span className="text-[9px] text-zinc-450 dark:text-zinc-400 uppercase tracking-wider font-bold">My balance</span>
                                        <h3 className="font-mono text-[17px] font-black text-[#0f172a] dark:text-white mt-1 leading-none">
                                          $45,750 <span className="text-[9px] text-zinc-400 font-bold ml-0.5">ALL</span>
                                        </h3>
                                      </div>
                                      <div className="border-l border-zinc-150 dark:border-zinc-850 pl-4 text-left">
                                        <span className="text-[9px] text-zinc-450 dark:text-zinc-400 uppercase tracking-wider font-bold">Available balance</span>
                                        <h3 className="font-mono text-[17px] font-black text-[#B91C1C] dark:text-red-400 mt-1 leading-none">
                                          $28,500 <span className="text-[9px] text-zinc-400 font-bold ml-0.5">ALL</span>
                                        </h3>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Accounts list grid in 2 columns */}
                                  <div className="text-left">
                                    <h4 className="font-extrabold text-[10.5px] text-zinc-400 uppercase tracking-wider mb-2 px-0.5">Accounts</h4>
                                    <div className="grid grid-cols-2 gap-3">
                                      
                                      <div className="bg-white dark:bg-zinc-900 rounded-[20px] p-4 shadow-xs border border-zinc-150 dark:border-zinc-850 flex flex-col justify-between h-[115px]">
                                        <div className="h-9 w-9 bg-[#B91C1C] rounded-[13px] flex items-center justify-center text-white shadow-[#B91C1C]/15 flex-shrink-0">
                                          <Coins className="h-5 w-5 text-white" />
                                        </div>
                                        <div>
                                          <span className="text-[9px] text-zinc-400 font-semibold block leading-none">Savings Account</span>
                                          <h5 className="font-mono text-[12px] font-black text-[#0f172a] dark:text-zinc-150 mt-1.5 leading-none">$22,800 <span className="text-[8px] font-mono text-zinc-400">ALL</span></h5>
                                        </div>
                                      </div>

                                      <div className="bg-white dark:bg-zinc-900 rounded-[20px] p-4 shadow-xs border border-zinc-150 dark:border-zinc-850 flex flex-col justify-between h-[115px]">
                                        <div className="h-9 w-9 bg-[#B91C1C] rounded-[13px] flex items-center justify-center text-white shadow-[#B91C1C]/15 flex-shrink-0">
                                          <CreditCard className="h-5 w-5 text-white" />
                                        </div>
                                        <div>
                                          <span className="text-[9px] text-zinc-400 font-semibold block leading-none">Salary Account</span>
                                          <h5 className="font-mono text-[12px] font-black text-[#0f172a] dark:text-zinc-150 mt-1.5 leading-none">$12,950 <span className="text-[8px] font-mono text-zinc-400">ALL</span></h5>
                                        </div>
                                      </div>

                                      {/* Special "Add new" dashed button */}
                                      <button 
                                        onClick={() => {
                                          setActiveMobileTab('financiera');
                                          triggerToast("Redireccionando al simulador de plan.");
                                        }}
                                        className="bg-transparent dark:bg-zinc-950 rounded-[20px] p-3 border border-dashed border-zinc-300 dark:border-zinc-800 flex flex-col items-center justify-center gap-1.5 h-[115px] hover:bg-zinc-200/20 transition-all cursor-pointer"
                                      >
                                        <div className="h-8.5 w-8.5 rounded-full bg-zinc-200 dark:bg-zinc-900 text-zinc-550 flex items-center justify-center">
                                          <span className="text-base font-black font-sans leading-none">+</span>
                                        </div>
                                        <span className="text-[9px] text-zinc-400 font-extrabold uppercase tracking-tight font-sans">Add new plan</span>
                                      </button>
                                    </div>
                                  </div>

                                  {/* Products & Loans grid */}
                                  <div className="text-left pt-1">
                                    <h4 className="font-extrabold text-[10.5px] text-zinc-400 uppercase tracking-wider mb-2 px-0.5 font-sans">Products & Loans</h4>
                                    <div className="grid grid-cols-2 gap-3">
                                      
                                      {/* Purple Special Promotional Loan Card */}
                                      <div 
                                        onClick={() => {
                                          setActiveMobileTab('financiera');
                                          triggerToast("Detalles de Préstamo SUTI quincenal.");
                                        }}
                                        className="bg-purple-100/50 dark:bg-purple-950/20 rounded-[20px] p-3.5 border border-purple-200/55 dark:border-purple-900/40 flex flex-col justify-between h-[135px] shadow-xs cursor-pointer hover:scale-[1.01] hover:border-purple-300 transition-all"
                                      >
                                        <div>
                                          <div className="h-9 w-9 bg-purple-600 rounded-[11px] flex items-center justify-center text-white shadow-xs">
                                            <Sparkles className="h-5 w-5 text-white animate-pulse" />
                                          </div>
                                          <h5 className="font-extrabold text-[10.5px] text-purple-950 dark:text-purple-300 leading-tight font-sans mt-2.5">Super loan</h5>
                                          <p className="text-[8px] text-purple-800/80 dark:text-purple-400 leading-tight font-sans mt-0.5">Lower quincenal interest rate offer.</p>
                                        </div>
                                        <span className="text-[9.5px] uppercase tracking-wider font-mono text-purple-900 dark:text-purple-300 font-bold block">Apply 8.5% →</span>
                                      </div>

                                      {/* Product 2 */}
                                      <div 
                                        onClick={() => {
                                          setActiveMobileTab('financiera');
                                          triggerToast("Caja de Ahorro Rendimiento.");
                                        }}
                                        className="bg-white dark:bg-zinc-900 rounded-[20px] p-3.5 border border-zinc-150 dark:border-zinc-850 flex flex-col justify-between h-[135px] shadow-2xs cursor-pointer hover:scale-[1.01] hover:border-zinc-300 transition-all"
                                      >
                                        <div>
                                          <div className="h-9 w-9 bg-emerald-600 rounded-[11px] flex items-center justify-center text-white">
                                            <TrendingUp className="h-5 w-5 text-white" />
                                          </div>
                                          <h5 className="font-extrabold text-[10.5px] text-[#0f172a] dark:text-zinc-200 leading-tight mt-2.5 font-sans">Caja de Ahorro</h5>
                                          <p className="text-[8px] text-zinc-500 leading-tight font-sans mt-0.5">Yield 11.2% plus guaranteed.</p>
                                        </div>
                                        <span className="text-[9px] uppercase tracking-wider font-mono text-emerald-650 dark:text-emerald-450 font-bold block">Enroll →</span>
                                      </div>

                                      {/* Product 3 */}
                                      <div 
                                        onClick={() => {
                                          setActiveMobileTab('financiera');
                                          triggerToast("Plan Solar EcoEnergía SUTI.");
                                        }}
                                        className="bg-white dark:bg-zinc-900 rounded-[20px] p-3.5 border border-zinc-150 dark:border-zinc-850 flex flex-col justify-between h-[135px] shadow-2xs cursor-pointer hover:scale-[1.01] hover:border-zinc-300 transition-all"
                                      >
                                        <div>
                                          <div className="h-9 w-9 bg-amber-500 rounded-[11px] flex items-center justify-center text-white">
                                            <Zap className="h-5 w-5 text-white animate-pulse" />
                                          </div>
                                          <h5 className="font-extrabold text-[10.5px] text-[#0f172a] dark:text-zinc-200 leading-tight mt-2.5 font-sans">EcoEnergía</h5>
                                          <p className="text-[8px] text-zinc-500 leading-tight font-sans mt-0.5">Finance high-efficiency panels.</p>
                                        </div>
                                        <span className="text-[9px] uppercase tracking-wider font-mono text-amber-600 font-bold block">Simulate →</span>
                                      </div>

                                      {/* Product 4 */}
                                      <div 
                                        onClick={() => {
                                          setActiveMobileTab('convenios');
                                          setBktTopTab('overview');
                                          triggerToast("Abriendo convenios locales.");
                                        }}
                                        className="bg-white dark:bg-zinc-900 rounded-[20px] p-3.5 border border-zinc-150 dark:border-zinc-850 flex flex-col justify-between h-[135px] shadow-2xs cursor-pointer hover:scale-[1.01] hover:border-zinc-300 transition-all"
                                      >
                                        <div>
                                          <div className="h-9 w-9 bg-[#B91C1C] rounded-[11px] flex items-center justify-center text-white">
                                            <Gift className="h-5 w-5 text-white" />
                                          </div>
                                          <h5 className="font-extrabold text-[10.5px] text-[#0f172a] dark:text-zinc-200 leading-tight mt-2.5 font-sans">Convenios</h5>
                                          <p className="text-[8px] text-zinc-500 leading-tight font-sans mt-0.5">30+ local safety networks.</p>
                                        </div>
                                        <span className="text-[9px] uppercase tracking-wider font-mono text-[#B91C1C] font-bold block">Browse →</span>
                                      </div>

                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* TRANSACTIONS SECTION CONTENT */}
                              {bktTopTab === 'transactions' && (
                                <div className="space-y-4 pt-1 text-left">
                                  {/* Search box on translucent Porcelain background */}
                                  <div className="relative">
                                    <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 rounded-[18px] px-3.5 py-1.5 shadow-xs">
                                      <svg className="h-4.5 w-4.5 text-zinc-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                      </svg>
                                      <input 
                                        type="text" 
                                        placeholder="Search transactions..." 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="flex-1 bg-transparent text-xs font-sans text-zinc-850 dark:text-zinc-200 placeholder-zinc-400 outline-none border-none py-1 h-6"
                                      />
                                      {searchQuery && (
                                        <button onClick={() => setSearchQuery('')} className="p-1 text-zinc-400 hover:text-red-500 font-bold text-xs select-none cursor-pointer">✕</button>
                                      )}
                                    </div>
                                  </div>

                                  {/* Category outline tiny filter selector pills */}
                                  <div className="flex gap-1.5 overflow-x-auto pb-1.5 scrollbar-none justify-start animate-fade-in">
                                    <button 
                                      onClick={() => { setSearchQuery(''); triggerToast("Mostrando todos los logs."); }}
                                      className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider flex-shrink-0 cursor-pointer transition-all ${
                                        !searchQuery ? 'bg-[#B91C1C] text-white' : 'bg-white dark:bg-zinc-900 text-zinc-500 border border-zinc-150'
                                      }`}
                                    >
                                      All logs
                                    </button>
                                    <button 
                                      onClick={() => { setSearchQuery('prestamo'); triggerToast("Filtro: Préstamos."); }}
                                      className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider flex-shrink-0 cursor-pointer transition-all ${
                                        searchQuery === 'prestamo' ? 'bg-[#B91C1C] text-white' : 'bg-white dark:bg-zinc-900 text-zinc-500 border border-zinc-150'
                                      }`}
                                    >
                                      Loans
                                    </button>
                                    <button 
                                      onClick={() => { setSearchQuery('ahorro'); triggerToast("Filtro: Ahorros/Caja."); }}
                                      className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider flex-shrink-0 cursor-pointer transition-all ${
                                        searchQuery === 'ahorro' ? 'bg-[#B91C1C] text-white' : 'bg-white dark:bg-zinc-900 text-zinc-500 border border-zinc-150'
                                      }`}
                                    >
                                      Savings
                                    </button>
                                    <button 
                                      onClick={() => { setSearchQuery('review'); triggerToast("Filtro: Pendiente Comité."); }}
                                      className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider flex-shrink-0 cursor-pointer transition-all ${
                                        searchQuery === 'review' ? 'bg-[#B91C1C] text-white' : 'bg-white dark:bg-zinc-900 text-zinc-500 border border-zinc-150'
                                      }`}
                                    >
                                      Pending
                                    </button>
                                  </div>

                                  {/* Custom transactions listed by date */}
                                  <div className="space-y-4">
                                    <div className="text-left">
                                      <span className="text-[10px] font-extrabold text-zinc-450 dark:text-zinc-400 uppercase tracking-widest px-0.5">Recent history</span>
                                      <div className="space-y-2 mt-2">
                                        {transactions.filter(tx => {
                                          const term = searchQuery.toLowerCase().trim();
                                          return tx.title.toLowerCase().includes(term) || tx.id.toLowerCase().includes(term) || tx.status.toLowerCase().includes(term);
                                        }).map(tx => {
                                          const isGreen = tx.status === 'disbursed' || tx.status === 'active';
                                          return (
                                            <div 
                                              key={tx.id}
                                              className="flex items-center justify-between bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-850 rounded-[20px] p-3 shadow-2xs hover:scale-[1.01] hover:border-zinc-200 transition-all cursor-pointer"
                                              onClick={() => triggerToast(`Detalle: ${tx.title}. Estado: ${tx.status.toUpperCase()}`)}
                                            >
                                              <div className="flex items-center gap-2.5 text-left">
                                                <div className={`h-9 w-9 rounded-full flex items-center justify-center border flex-shrink-0 ${
                                                  isGreen 
                                                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                                                    : tx.status === 'missing_docs'
                                                      ? 'bg-amber-500/10 border-amber-500/20 text-amber-500'
                                                      : 'bg-[#B91C1C]/10 border-[#B91C1C]/20 text-[#B91C1C]'
                                                }`}>
                                                  {tx.type === 'prestamo' ? <Coins className="h-4.5 w-4.5" /> : <TrendingUp className="h-4.5 w-4.5" />}
                                                </div>
                                                <div className="text-left">
                                                  <h5 className="font-extrabold text-[11px] text-[#0f172a] dark:text-zinc-100 leading-tight truncate max-w-[145px] font-sans">{tx.title}</h5>
                                                  <p className="text-[8.5px] text-zinc-400 mt-0.5 font-mono">{tx.date} • {tx.id}</p>
                                                </div>
                                              </div>
                                              <div className="text-right">
                                                <span className={`font-mono text-xs font-black block ${isGreen ? 'text-emerald-500' : 'text-zinc-900 dark:text-zinc-100'}`}>
                                                  {isGreen ? '+' : '-'} ${tx.amount.toLocaleString('es-MX')} ALL
                                                </span>
                                                {!isGreen && (
                                                  <span className="inline-block px-1.5 py-0.5 text-[7.5px] font-black uppercase rounded bg-amber-500/10 text-amber-600 font-sans mt-0.5 tracking-tight scale-90 leading-none">
                                                    {tx.status === 'review' ? 'Comité' : tx.status}
                                                  </span>
                                                )}
                                              </div>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* BUDGET SECTION CONTENT */}
                              {bktTopTab === 'budget' && (
                                <div className="space-y-4 pt-1 text-left">
                                  {/* Months selector scrolling row */}
                                  <div className="flex justify-around items-center bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-full px-2 py-1.5">
                                    <span className="text-[9.5px] text-zinc-405 font-semibold cursor-pointer" onClick={() => triggerToast("Marzo pre-visualizado")}>March</span>
                                    <span className="text-[9.5px] text-zinc-405 font-semibold cursor-pointer" onClick={() => triggerToast("Abril pre-visualizado")}>April</span>
                                    <span className="text-[10px] text-zinc-850 dark:text-white font-extrabold bg-[#F0F0F3] dark:bg-zinc-800 px-3 py-1 rounded-full cursor-pointer">May</span>
                                    <span className="text-[9.5px] text-zinc-405 font-semibold cursor-pointer" onClick={() => triggerToast("Planificación quincenal de Junio")}>Planned</span>
                                  </div>

                                  {/* Radial Central Donut Chart */}
                                  <div className="bg-white dark:bg-zinc-900 rounded-[22px] p-5 shadow-xs border border-zinc-150 dark:border-zinc-800 flex flex-col items-center">
                                    <div className="relative h-28 w-28 flex items-center justify-center">
                                      <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                                        <circle cx="50" cy="50" r="41" fill="transparent" stroke="#E2E8F0" strokeWidth="6.5" className="dark:stroke-zinc-800" />
                                        {/* Available segment: Green (55%) */}
                                        <circle 
                                          cx="50" cy="50" r="41" fill="transparent" 
                                          stroke="#10B981" strokeWidth="6.5" 
                                          strokeDasharray="257.6" 
                                          strokeDashoffset="115.92" 
                                        />
                                        {/* Spendings segment: Red (30%) */}
                                        <circle 
                                          cx="50" cy="50" r="41" fill="transparent" 
                                          stroke="#EF4444" strokeWidth="6.5" 
                                          strokeDasharray="257.6" 
                                          strokeDashoffset="180.32" 
                                          className="transform rotate-[198deg] origin-center"
                                        />
                                        {/* Planned segment: Yellow (15%) */}
                                        <circle 
                                          cx="50" cy="50" r="41" fill="transparent" 
                                          stroke="#F59E0B" strokeWidth="6.5" 
                                          strokeDasharray="257.6" 
                                          strokeDashoffset="218.96" 
                                          className="transform rotate-[306deg] origin-center"
                                        />
                                      </svg>
                                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                        <span className="text-[7.5px] text-zinc-405 uppercase tracking-widest font-semibold leading-none">Available spend</span>
                                        <span className="font-mono text-[11px] font-black text-zinc-850 dark:text-zinc-150 mt-1">$18,320</span>
                                        <span className="text-[7px] text-zinc-400 font-bold tracking-wider mt-0.5">ALL</span>
                                      </div>
                                    </div>

                                    {/* Color representation legs */}
                                    <div className="flex gap-4 mt-4 w-full text-center border-t border-zinc-100 dark:border-zinc-850 pt-3">
                                      <div className="flex-1">
                                        <div className="flex items-center justify-center gap-1 text-[8.5px] text-zinc-400">
                                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                          <span>Available</span>
                                        </div>
                                        <span className="font-mono text-[10.5px] font-black text-zinc-800 dark:text-zinc-200 mt-0.5 block">55%</span>
                                      </div>
                                      <div className="flex-1">
                                        <div className="flex items-center justify-center gap-1 text-[8.5px] text-zinc-400">
                                          <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                                          <span>Spendings</span>
                                        </div>
                                        <span className="font-mono text-[10.5px] font-black text-zinc-800 dark:text-zinc-200 mt-0.5 block">30%</span>
                                      </div>
                                      <div className="flex-1">
                                        <div className="flex items-center justify-center gap-1 text-[8.5px] text-zinc-400">
                                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                                          <span>Planned</span>
                                        </div>
                                        <span className="font-mono text-[10.5px] font-black text-zinc-800 dark:text-zinc-200 mt-0.5 block">15%</span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Double summary cards side-by-side */}
                                  <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-white dark:bg-zinc-900 rounded-[20px] p-3.5 shadow-2xs border border-zinc-100 dark:border-zinc-800">
                                      <span className="text-[8px] uppercase tracking-wider font-semibold text-zinc-400 flex items-center gap-1">Income <span className="text-emerald-500 font-mono">↑</span></span>
                                      <h4 className="font-mono text-[11.5px] font-black text-emerald-500 mt-1 leading-none">+$24,500 ALL</h4>
                                    </div>
                                    <div className="bg-white dark:bg-zinc-900 rounded-[20px] p-3.5 shadow-2xs border border-zinc-100 dark:border-zinc-800">
                                      <span className="text-[8px] uppercase tracking-wider font-semibold text-zinc-400 flex items-center gap-1">Spendings <span className="text-red-500 font-mono">↓</span></span>
                                      <h4 className="font-mono text-[11.5px] font-black text-red-500 mt-1 leading-none">-$8,420 ALL</h4>
                                    </div>
                                  </div>

                                  {/* Planned spendings table layout */}
                                  <div className="space-y-2">
                                    <span className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest px-0.5">Planned spendings</span>
                                    <div className="bg-white dark:bg-zinc-900 rounded-[18px] border border-zinc-100 dark:border-zinc-800 overflow-hidden divide-y divide-zinc-100 dark:divide-zinc-800">
                                      <div className="p-3 flex justify-between items-center text-[10px]/snug">
                                        <div className="text-left">
                                          <span className="font-extrabold text-zinc-800 dark:text-zinc-200">Previsión Social Quincenal</span>
                                          <p className="text-[8.5px] text-zinc-400 font-sans">Abono directo voluntario</p>
                                        </div>
                                        <span className="font-mono text-[10px] font-black text-zinc-800 dark:text-zinc-200">$1,200.00 ALL</span>
                                      </div>
                                      <div className="p-3 flex justify-between items-center text-[10px]/snug">
                                        <div className="text-left">
                                          <span className="font-extrabold text-zinc-800 dark:text-zinc-200">Abono Seguro Emergencia</span>
                                          <p className="text-[8.5px] text-zinc-400 font-sans">Retención autorizada de talón</p>
                                        </div>
                                        <span className="font-mono text-[10px] font-black text-[#B91C1C] dark:text-red-400">$1,820.00 ALL</span>
                                      </div>
                                      <div className="p-3 flex justify-between items-center text-[10px]/snug">
                                        <div className="text-left">
                                          <span className="font-extrabold text-zinc-800 dark:text-zinc-200">Caja de Ahorros Recurrente</span>
                                          <p className="text-[8.5px] text-zinc-400 font-sans">Retención programada quincenal</p>
                                        </div>
                                        <span className="font-mono text-[10px] font-black text-emerald-500">$1,500.00 ALL</span>
                                      </div>
                                    </div>
                                  </div>

                                </div>
                              )}

                            </motion.div>
                          )}
                          
                          {/* Tab 2: Financiera Simulator */}
                          {activeMobileTab === 'financiera' && (
                            <motion.div
                              key="tab-financiera"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="pt-2 px-4 pb-4"
                            >
                              <FinancieraSimulator 
                                onAddTransaction={handleAddTransaction} 
                                onRequestClose={() => setActiveMobileTab('inicio')}
                              />
                            </motion.div>
                          )}

                          {/* Tab 3: Convenios Marketplace */}
                          {activeMobileTab === 'convenios' && (
                            <motion.div
                              key="tab-convenios"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="pt-2 px-4 pb-4"
                            >
                              <ConveniosMarketplace />
                            </motion.div>
                          )}

                        {/* Tab 4: Historial / Trámites Tracker */}
                        {activeMobileTab === 'historial' && (
                          <motion.div
                            key="tab-historial"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-3.5 text-left px-4 pt-3 pb-4"
                          >
                            <div className="flex justify-between items-center pb-2 border-b border-zinc-250/30 dark:border-zinc-900">
                              <h3 className="font-bold text-xs uppercase text-zinc-400 font-mono tracking-wider">Mis Solicitudes de Beneficio</h3>
                              <span className="text-[9.5px] font-mono text-zinc-400">Total: {transactions.length}</span>
                            </div>

                            {transactions.length === 0 ? (
                              <p className="text-zinc-500 text-xs py-8 text-center font-bold">No registras solicitudes en el presente periodo.</p>
                            ) : (
                              <div className="space-y-3">
                                {transactions.map((tx) => (
                                  <div 
                                    key={tx.id} 
                                    className="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-850 flex flex-col gap-2.5 shadow-sm"
                                  >
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <span className="text-[9px] font-mono font-medium text-rose-950 dark:text-rose-400">{tx.id}</span>
                                        <h4 className="font-black text-[11px] text-zinc-900 dark:text-zinc-100">{tx.title}</h4>
                                      </div>
                                      <span className="font-mono text-xs font-bold text-zinc-800 dark:text-zinc-100">${tx.amount.toLocaleString('es-MX')}</span>
                                    </div>

                                    {/* Subtitle status line & Progress bar */}
                                    <div>
                                      <div className="flex justify-between text-[9px] text-zinc-400 mb-1">
                                        <span className="font-mono">{tx.date}</span>
                                        <span className="font-bold uppercase text-amber-500 flex items-center gap-0.5">
                                          {tx.status === 'review' ? 'Comité Técnico' : tx.status === 'disbursed' ? 'Cobrado' : tx.status.toUpperCase()}
                                        </span>
                                      </div>
                                      <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                        <div 
                                          className={`h-full rounded-full ${
                                            tx.status === 'disbursed' 
                                              ? 'bg-emerald-500' 
                                              : tx.status === 'missing_docs' 
                                                ? 'bg-amber-500 animate-pulse' 
                                                : tx.status === 'rejected' 
                                                  ? 'bg-zinc-400' 
                                                  : 'bg-rose-900'
                                          }`} 
                                          style={{ width: `${tx.progress}%` }}
                                        />
                                      </div>
                                    </div>

                                    <div className="text-[9.5px] text-zinc-500 font-mono bg-zinc-50/50 dark:bg-zinc-950/40 p-2 rounded border border-zinc-100 dark:border-zinc-900 leading-normal">
                                      {tx.notes}
                                    </div>
                                    
                                    {/* Helpful actions under historic items */}
                                    {tx.status === 'missing_docs' && (
                                      <button 
                                        onClick={() => setActiveMobileTab('documentos')}
                                        className="w-full py-1.5 bg-amber-500 text-white rounded-lg text-[9.5px] font-bold text-center uppercase tracking-wider block cursor-pointer"
                                      >
                                        Subir Archivo de Talón Pendiente
                                      </button>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        )}

                        {/* Tab 5: Credencial Digital */}
                        {activeMobileTab === 'credencial' && (
                          <motion.div
                            key="tab-credencial"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="px-4 pt-3 pb-4"
                          >
                            <CredencialDigital member={member} />
                          </motion.div>
                        )}

                        {/* Tab 6: Biometric documents upload */}
                        {activeMobileTab === 'documentos' && (
                          <motion.div
                            key="tab-documentos"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="px-4 pt-3 pb-4"
                          >
                            <CargaDocumentos member={member} onUpdateDocuments={handleUpdateDocuments} />
                          </motion.div>
                        )}

                        {/* Tab 7: Tutorials Onboarding assistance with accessible voice-over */}
                        {activeMobileTab === 'soporte' && (
                          <motion.div
                            key="tab-soporte"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="px-4 pt-3 pb-4"
                          >
                            <TutorialsOnboarding />
                          </motion.div>
                        )}
                        
                      </AnimatePresence>
                    </div>

                  </div>

                {/* SMARTPHONE BOTTOM BAR - Custom organic curved curve matching BKT Smart */}
                <div className="absolute bottom-0 inset-x-0 h-16 z-40 select-none bg-transparent">
                  <svg 
                    viewBox="0 0 345 64" 
                    className="absolute inset-x-0 bottom-0 w-full h-15.5 text-white/98 dark:text-zinc-900/98 fill-current drop-shadow-[0_-8px_16px_rgba(0,0,0,0.05)]" 
                    preserveAspectRatio="none"
                  >
                    <path d="M 0 12 L 105 12 Q 120 12 125 15 C 135 17, 138 42, 172.5 42 C 207 42, 210 17, 220 15 Q 225 12 240 12 L 345 12 L 345 64 L 0 64 Z" />
                  </svg>
                  
                  {/* Floating Action Button in the center dip groove */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center z-50">
                    <button
                      onClick={() => {
                        setActiveMobileTab('inicio');
                        setActiveMobileSection('payments');
                        triggerToast("Abriendo módulo de Transferencias y Pagos SUTI...");
                      }}
                      className={`h-11.5 w-11.5 rounded-full flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer border-[3.5px] border-[#F0F0F3] dark:border-zinc-950 ${
                        activeMobileTab === 'inicio' && activeMobileSection === 'payments'
                          ? 'bg-gradient-to-tr from-[#FF2B54] to-[#DF162C] text-white shadow-rose-500/25 scale-105'
                          : 'bg-white dark:bg-zinc-900 text-zinc-400 hover:text-zinc-650'
                      }`}
                    >
                      <svg className="h-5.5 w-5.5 stroke-current fill-none stroke-[2.2]" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    </button>
                    <span className={`text-[7.5px] font-black font-sans mt-0.5 tracking-wider uppercase ${
                      activeMobileTab === 'inicio' && activeMobileSection === 'payments' ? 'text-[#FF2B54] font-black' : 'text-zinc-400 font-semibold'
                    }`}>
                      Transfers
                    </span>
                  </div>

                  {/* Navigation columns */}
                  <div className="absolute inset-x-0 bottom-0 h-13 px-8 flex justify-between items-center bg-transparent z-40">
                    {/* Left button: My Finance */}
                    <button
                      onClick={() => {
                        setActiveMobileTab('inicio');
                        setActiveMobileSection('finance');
                        triggerToast("Cargando balances de nómina...");
                      }}
                      className={`flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-all ${
                        activeMobileTab === 'inicio' && activeMobileSection === 'finance'
                          ? 'text-[#FF2B54] font-black' 
                          : 'text-zinc-400 hover:text-zinc-650'
                      }`}
                    >
                      <Coins className="h-5 w-5" />
                      <span className="text-[7.5px] uppercase font-black tracking-wider font-sans leading-none">My Finance</span>
                    </button>

                    {/* Right button: Products */}
                    <button
                      onClick={() => {
                        setActiveMobileTab('inicio');
                        setActiveMobileSection('products');
                        triggerToast("Catálogo de productos SUTISSSTESON...");
                      }}
                      className={`flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-all ${
                        activeMobileTab === 'inicio' && activeMobileSection === 'products'
                          ? 'text-[#FF2B54] font-black' 
                          : 'text-zinc-400 hover:text-zinc-650'
                      }`}
                    >
                      <svg className="h-5 w-5 stroke-current fill-none stroke-[2]" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                      <span className="text-[7.5px] uppercase font-black tracking-wider font-sans leading-none">Products</span>
                    </button>
                  </div>
                </div>

                </div>

              </div>

              {/* Right Column / Informative Sidebar Dashboard for desktop evaluation - Takes 7 cols on lg */}
              <div className="lg:col-span-7 flex flex-col gap-6 text-left">
                
                {/* 1. WELCOME HERO CAROUSEL ADAPTIVE */}
                <div className="bg-gradient-to-tr from-rose-950 via-rose-900 to-red-800 rounded-3xl p-6 text-white relative overflow-hidden shadow-xl border border-amber-500/10">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <span className="px-2.5 py-1 rounded-full bg-white/10 text-white text-[10px] font-mono uppercase tracking-wider border border-white/10">
                        Bienvenido Servidor Público
                      </span>
                      <h2 className="text-xl md:text-2xl font-black mt-2 leading-tight tracking-tight">
                        Ecosistema SUTISSSTESON Digital
                      </h2>
                      <p className="text-white/80 text-xs mt-1.5 max-w-sm">
                        La ventanilla única virtual para realizar trámites financieros quincenales, consultar tus convenios comerciales y presentar tu credencial QR segura.
                      </p>
                    </div>

                    {/* Quick credential QR visual representation */}
                    <div className="bg-black/30 backdrop-blur-md rounded-2xl p-4 border border-white/5 flex flex-col items-center text-center">
                      <img 
                        src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=SUTI-98842-ANDREA-GONZALEZ-SUTISSSTESON" 
                        className="w-20 h-20 bg-white p-1 rounded-lg"
                        alt="QR Representación"
                      />
                      <span className="text-[9px] font-mono text-zinc-300 mt-2 block">ID: SUTI-98842</span>
                    </div>
                  </div>
                </div>

                {/* 2. REAL UNION DELEGATES & LEADERS COMMITTEE */}
                <div className="bg-white dark:bg-zinc-950 border border-zinc-200/55 dark:border-zinc-900 p-5 rounded-2xl shadow-sm">
                  <h3 className="font-bold text-xs uppercase text-zinc-400 tracking-wider mb-4 flex items-center gap-1.5 font-mono">
                    <ShieldCheck className="h-4 w-4 text-rose-900" /> Sindicato Único SUTISSSTESON Mutualidad
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {COMMITTEE_MEMBERS.map((member, idx) => (
                      <div 
                        key={idx}
                        className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/30 dark:border-zinc-850 flex gap-2.5 items-center hover:border-zinc-320 transition-colors"
                      >
                        <img 
                          src={member.photo} 
                          className="w-10 h-10 rounded-full object-cover bg-zinc-800 border border-zinc-200/30"
                          alt={member.name}
                        />
                        <div className="min-w-0">
                          <h4 className="font-bold text-[10.5px] truncate text-zinc-900 dark:text-zinc-100">{member.name}</h4>
                          <span className="block text-[8.5px] text-zinc-400 uppercase font-mono mt-0.5">{member.role}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="text-[10px] text-zinc-400 mt-4 border-t border-zinc-100 dark:border-zinc-900 pt-3 flex items-center gap-1 font-medium">
                    <AlertCircle className="h-3.5 w-3.5 text-zinc-400" />
                    <strong>Aviso Legal Sonora:</strong> De acuerdo a directrices aprobadas de trasparencia en asamblea, todo cobro se reporta directamente en el talón de egresos estatal para auditoría.
                  </p>
                </div>

                {/* 3. SIMULATED ACTIVE ALERTS / NOTIFICATION LOG */}
                <div className="bg-white dark:bg-zinc-950 border border-zinc-200/55 dark:border-zinc-900 p-5 rounded-2xl shadow-sm">
                  <div className="flex justify-between items-center mb-4 border-b border-zinc-250/30 dark:border-zinc-900 pb-2">
                    <h3 className="font-bold text-xs uppercase text-zinc-400 tracking-wider flex items-center gap-1.5 font-mono">
                      <Bell className="h-4 w-4 text-rose-900" /> Buzón de Notificaciones Federadas
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-zinc-100 text-[9px] font-mono text-zinc-500">Últimas Horas</span>
                  </div>

                  <div className="space-y-3">
                    {notifications.slice(0, 3).map((note, index) => (
                      <div 
                        key={index} 
                        className="p-3 bg-zinc-50/70 dark:bg-zinc-900/30 border border-zinc-200/30 dark:border-zinc-850 rounded-xl flex gap-3 text-xs items-start"
                      >
                        <span className="h-2 w-2 rounded-full bg-rose-900 mt-1.5 flex-shrink-0" />
                        <p className="text-zinc-650 dark:text-zinc-300 leading-normal font-sans font-medium">{note}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* ======================= VIEW MODE: ADMINISTRATIVE EXECUTIVE CONTROL ======================= */}
          {viewMode === 'admin' && (
            <motion.div
              key="admin-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <AdminSaaSView 
                transactions={transactions} 
                onUpdateTxStatus={handleUpdateTxStatus} 
              />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

    </div>
  );
}
