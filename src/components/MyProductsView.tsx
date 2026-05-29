import React from 'react';
import { 
  Search, 
  Sparkles, 
  Wallet, 
  CreditCard, 
  CalendarDays, 
  KeyRound, 
  HandCoins, 
  HeartPulse,
  Percent,
  Coins,
  PiggyBank,
  ShoppingBag,
  Plane,
  Pill,
  Award,
  TrendingUp,
  Home,
  Gift,
  Tv,
  Fingerprint,
  UploadCloud,
  LayoutDashboard,
  Bell,
  Building2,
  HelpCircle
} from 'lucide-react';
import { UnionMember } from '../types';

interface MyProductsViewProps {
  member: UnionMember;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  triggerToast: (msg: string) => void;
  onOpenOverlay: (overlayTab: 'credencial' | 'soporte' | 'financiera' | 'convenios' | 'documentos') => void;
  onToggleAdmin?: () => void;
}

export function MyProductsView({
  member,
  searchQuery,
  setSearchQuery,
  triggerToast,
  onOpenOverlay,
  onToggleAdmin
}: MyProductsViewProps) {

  // All 17 Affiliate Category services precisely mapped
  const affiliateCategories = [
    {
      label: 'créditos',
      icon: <Percent className="h-4 w-4" />,
      bgColor: 'bg-emerald-500/10 dark:bg-emerald-500/15',
      textColor: 'text-emerald-500 dark:text-emerald-400',
      onClick: () => {
        onOpenOverlay('financiera');
        triggerToast("Cargando simulaciones de créditos SUTI...");
      }
    },
    {
      label: 'préstamos',
      icon: <Coins className="h-4 w-4" />,
      bgColor: 'bg-rose-500/10 dark:bg-rose-500/15',
      textColor: 'text-[#FF2B54] dark:text-[#ff4d3b]',
      onClick: () => {
        onOpenOverlay('financiera');
        triggerToast("Abriendo calculadora de préstamo quincenal...");
      }
    },
    {
      label: 'ahorro',
      icon: <PiggyBank className="h-4 w-4" />,
      bgColor: 'bg-indigo-500/10 dark:bg-indigo-500/15',
      textColor: 'text-indigo-500 dark:text-indigo-400',
      onClick: () => {
        onOpenOverlay('financiera');
        triggerToast("Portal de planes de ahorro SUTI...");
      }
    },
    {
      label: 'marketplace',
      icon: <ShoppingBag className="h-4 w-4" />,
      bgColor: 'bg-purple-500/10 dark:bg-purple-500/15',
      textColor: 'text-purple-500 dark:text-purple-400',
      onClick: () => {
        onOpenOverlay('convenios');
        triggerToast("Abriendo catálogo de comercios y marketplace...");
      }
    },
    {
      label: 'viajes',
      icon: <Plane className="h-4 w-4" />,
      bgColor: 'bg-sky-500/10 dark:bg-sky-500/15',
      textColor: 'text-sky-500 dark:text-sky-400',
      onClick: () => {
        onOpenOverlay('convenios');
        triggerToast("Explorando convenios de turismo y viajes SUTISSSTESON...");
      }
    },
    {
      label: 'farmacia',
      icon: <Pill className="h-4 w-4" />,
      bgColor: 'bg-teal-500/10 dark:bg-teal-500/15',
      textColor: 'text-teal-500 dark:text-teal-400',
      onClick: () => {
        onOpenOverlay('convenios');
        triggerToast("Mostrando convenios farmacias, ópticas y salud...");
      }
    },
    {
      label: 'membresías',
      icon: <Award className="h-4 w-4" />,
      bgColor: 'bg-fuchsia-500/10 dark:bg-fuchsia-500/15',
      textColor: 'text-fuchsia-500 dark:text-fuchsia-400',
      onClick: () => {
        onOpenOverlay('credencial');
        triggerToast("Verificando membresía activa SUTI...");
      }
    },
    {
      label: 'financiamientos',
      icon: <TrendingUp className="h-4 w-4" />,
      bgColor: 'bg-violet-500/10 dark:bg-violet-500/15',
      textColor: 'text-violet-500 dark:text-violet-400',
      onClick: () => {
        onOpenOverlay('financiera');
        triggerToast("Abriendo opciones de financiamiento especial...");
      }
    },
    {
      label: 'bienes raíces',
      icon: <Home className="h-4 w-4" />,
      bgColor: 'bg-amber-500/10 dark:bg-amber-500/15',
      textColor: 'text-amber-500 dark:text-amber-400',
      onClick: () => {
        onOpenOverlay('financiera');
        triggerToast("Simulaciones para créditos de adquisición de vivienda SUTI...");
      }
    },
    {
      label: 'rifas',
      icon: <Gift className="h-4 w-4" />,
      bgColor: 'bg-orange-500/10 dark:bg-orange-500/15',
      textColor: 'text-orange-500 dark:text-orange-400',
      onClick: () => {
        triggerToast("🎯 Sorteos SUTI: Participas con tu folio. ¡Próxima rifa quincenal!");
      }
    },
    {
      label: 'productos para el hogar',
      icon: <Tv className="h-4 w-4" />,
      bgColor: 'bg-slate-500/10 dark:bg-slate-500/15',
      textColor: 'text-slate-500 dark:text-slate-450',
      onClick: () => {
        onOpenOverlay('convenios');
        triggerToast("Convenios de línea blanca y hogar...");
      }
    },
    {
      label: 'identidad sindical',
      icon: <Fingerprint className="h-4 w-4" />,
      bgColor: 'bg-rose-600/10 dark:bg-rose-600/15',
      textColor: 'text-rose-600 dark:text-rose-450',
      onClick: () => {
        onOpenOverlay('credencial');
        triggerToast("Consultando constancia de identidad sindical...");
      }
    },
    {
      label: 'credencial digital',
      icon: <CreditCard className="h-4 w-4" />,
      bgColor: 'bg-pink-500/10 dark:bg-pink-500/15',
      textColor: 'text-pink-500 dark:text-pink-400',
      onClick: () => {
        onOpenOverlay('credencial');
        triggerToast("Abriendo tu Credencial Digital de Afiliado...");
      }
    },
    {
      label: 'carga de documentos',
      icon: <UploadCloud className="h-4 w-4" />,
      bgColor: 'bg-cyan-500/10 dark:bg-cyan-500/15',
      textColor: 'text-cyan-500 dark:text-cyan-400',
      onClick: () => {
        onOpenOverlay('documentos');
        triggerToast("Entrando a carga de expediente digital...");
      }
    },
    {
      label: 'dashboard administrativo',
      icon: <LayoutDashboard className="h-4 w-4" />,
      bgColor: 'bg-blue-600/10 dark:bg-blue-600/15',
      textColor: 'text-blue-600 dark:text-blue-400',
      onClick: () => {
        if (onToggleAdmin) {
          onToggleAdmin();
          triggerToast("Redireccionando a Consola SaaS Administrativa...");
        } else {
          triggerToast("Buzón Administrativo de Sorteos y Préstamos.");
        }
      }
    },
    {
      label: 'notificaciones',
      icon: <Bell className="h-4 w-4" />,
      bgColor: 'bg-yellow-500/10 dark:bg-yellow-500/15',
      textColor: 'text-yellow-600 dark:text-yellow-400',
      onClick: () => {
        onOpenOverlay('soporte');
        triggerToast("Buzón de avisos y alertas institucionales...");
      }
    },
    {
      label: 'convenios empresariales',
      icon: <Building2 className="h-4 w-4" />,
      bgColor: 'bg-emerald-600/10 dark:bg-emerald-600/15',
      textColor: 'text-emerald-600 dark:text-emerald-400',
      onClick: () => {
        onOpenOverlay('convenios');
        triggerToast("Buscando convenios institucionales...");
      }
    },
    {
      label: 'soporte comité',
      icon: <HelpCircle className="h-4 w-4" />,
      bgColor: 'bg-zinc-500/10 dark:bg-zinc-500/15',
      textColor: 'text-zinc-500 dark:text-zinc-400',
      onClick: () => {
        onOpenOverlay('soporte');
        triggerToast("Canales de atención directa del Comité Técnico...");
      }
    }
  ];

  // Optional: inline input search text filter inside categories
  const filteredCategories = affiliateCategories.filter(cat => 
    cat.label.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );
  return (
    <div className="flex-1 flex flex-col pt-0">
      
      {/* RED PANEL WITH DISPLAY HEADINGS "What are you interested in?" */}
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
              triggerToast("Notificaciones y centro de ayuda.");
            }}
            className="h-9.5 w-9.5 bg-white/12 hover:bg-white/20 border border-white/20 rounded-[14px] flex items-center justify-center relative transition-all cursor-pointer text-white backdrop-blur-md shadow-md active:scale-95"
          >
            <svg className="h-5.5 w-5.5 fill-none stroke-current stroke-[2]" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 19v-8.93a2 2 0 01.89-1.664l8-5.333a2 2 0 012.22 0l8 5.333A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-2.25-1.5a2 2 0 00-2.22 0l-2.25 1.5" />
            </svg>
            <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-[#FF2B54] border border-white animate-pulse" />
          </button>
        </div>

        {/* Display headline identical to Mockup 2 */}
        <div className="relative z-10 text-left pt-3 px-1">
          <h2 className="text-lg font-black tracking-tight text-white leading-tight font-sans max-w-[220px]">¿Qué te interesa hoy?</h2>
          <p className="text-[8.5px] text-pink-100 font-sans mt-1.5 opacity-80 uppercase tracking-widest leading-none">Explora programas sindicales</p>
        </div>
      </div>

      {/* LOWER AREA CONTAINER - SCROLLABLE FLOOR FOR 2X2 GRID */}
      <div className="flex-1 overflow-y-auto pt-7 pb-20 px-4.5 scrollbar-none relative z-10 bg-[#F0F0F3] dark:bg-zinc-950">
        
        {/* Search tool for products */}
        <div className="relative mb-5.5">
          <div className="flex items-center gap-2.5 bg-white dark:bg-zinc-900 border border-white/60 dark:border-zinc-850 rounded-[18px] px-3.5 py-1.5 shadow-neomorph-light">
            <Search className="h-4.5 w-4.5 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Buscar productos..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-xs font-sans text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 outline-none border-none py-1"
            />
          </div>
        </div>

        {/* Categorías de Servicios para Afiliados */}
        <div className="mb-6 text-left">
          <div className="flex justify-between items-center mb-3 px-1">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-550">Servicios para Afiliados ({filteredCategories.length})</h3>
            <span className="text-[7.5px] font-mono bg-rose-500/10 text-[#FF2B54] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wide">SUTI Club</span>
          </div>

          <div className="grid grid-cols-3 gap-2 px-0.5">
            {filteredCategories.map((cat, idx) => (
              <button
                key={idx}
                onClick={cat.onClick}
                className="bg-white dark:bg-zinc-900 rounded-[20px] p-2 border border-white/60 dark:border-zinc-800/60 shadow-neomorph-light hover:shadow-neomorph-lift hover:scale-[1.03] active:scale-97 transition-all flex flex-col items-center justify-center text-center cursor-pointer min-h-[76px] relative group overflow-hidden"
              >
                <div className={`h-8 w-8 rounded-xl ${cat.bgColor} ${cat.textColor} flex items-center justify-center border border-transparent mb-1 transition-transform group-hover:scale-110`}>
                  {cat.icon}
                </div>
                <span className="text-[7px] sm:text-[7.5px] font-black text-zinc-700 dark:text-zinc-300 uppercase tracking-tight leading-none px-0.5 break-words group-hover:text-[#FF2B54] transition-colors">
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Programas Destacados Header */}
        <div className="mb-3 px-1 text-left">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-450 dark:text-zinc-550">Trámites y Programas Destacados</h3>
        </div>

        {/* 2X2 Neomorphic grid modeled directly after Mockup 2 */}
        <div className="grid grid-cols-2 gap-4">
          
          {/* Card 1: Open current account -> leads to Documentos डिजिटल expediente */}
          <div 
            onClick={() => {
              onOpenOverlay('documentos');
              triggerToast("Abriendo Carga de Expediente Digital SUTISSSTESON...");
            }}
            className="bg-white dark:bg-zinc-900 rounded-[28px] p-5 shadow-neomorph-lift border border-white/60 dark:border-zinc-800/60 flex flex-col justify-between h-[155px] cursor-pointer hover:scale-[1.02] active:scale-99 text-left"
          >
            <div className="h-9.5 w-9.5 rounded-2xl bg-[#FF2B54]/10 text-[#FF2B54] border border-[#FF2B54]/15 flex items-center justify-center flex-shrink-0">
              <Wallet className="h-5.5 w-5.5 stroke-[2]" />
            </div>
            <div>
              <h4 className="font-extrabold text-[12px] text-zinc-900 dark:text-zinc-100 leading-tight">Abrir cuenta corriente</h4>
              <p className="text-[8.5px] text-zinc-450 dark:text-zinc-400 leading-tight mt-1">para una gestión de dinero más fácil</p>
            </div>
          </div>

          {/* Card 2: Order a card -> leads to digital union credential with QR */}
          <div 
            onClick={() => {
              onOpenOverlay('credencial');
              triggerToast("Abriendo Credencial Digital SUTISSSTESON...");
            }}
            className="bg-white dark:bg-zinc-900 rounded-[28px] p-5 shadow-neomorph-lift border border-white/60 dark:border-zinc-800/60 flex flex-col justify-between h-[155px] cursor-pointer hover:scale-[1.02] active:scale-99 text-left"
          >
            <div className="h-9.5 w-9.5 rounded-2xl bg-[#FF2B54]/10 text-[#FF2B54] border border-[#FF2B54]/15 flex items-center justify-center flex-shrink-0">
              <CreditCard className="h-5.5 w-5.5 stroke-[2]" />
            </div>
            <div>
              <h4 className="font-extrabold text-[12px] text-zinc-900 dark:text-zinc-100 leading-tight">Solicitar credencial</h4>
              <p className="text-[8.5px] text-zinc-450 dark:text-zinc-400 leading-tight mt-1">para disfrutar ofertas y beneficios especiales</p>
            </div>
          </div>

          {/* Card 3: Divide purchase in installments -> leads to agreements marketplaces */}
          <div 
            onClick={() => {
              onOpenOverlay('convenios');
              triggerToast("Abriendo Convenios Comerciales y Descuentos...");
            }}
            className="bg-white dark:bg-zinc-900 rounded-[28px] p-5 shadow-neomorph-lift border border-white/60 dark:border-zinc-800/60 flex flex-col justify-between h-[155px] cursor-pointer hover:scale-[1.02] active:scale-99 text-left"
          >
            <div className="h-9.5 w-9.5 rounded-2xl bg-[#FF2B54]/10 text-[#FF2B54] border border-[#FF2B54]/15 flex items-center justify-center flex-shrink-0">
              <CalendarDays className="h-5.5 w-5.5 stroke-[2]" />
            </div>
            <div>
              <h4 className="font-extrabold text-[12px] text-zinc-900 dark:text-zinc-100 leading-tight">Pagar a plazos</h4>
              <p className="text-[8.5px] text-zinc-450 dark:text-zinc-400 leading-tight mt-1">para mantener tus finanzas en equilibrio</p>
            </div>
          </div>

          {/* Card 4: Apply to a loan -> leads to credito simulator */}
          <div 
            onClick={() => {
              onOpenOverlay('financiera');
              triggerToast("Abriendo Simulador de Créditos Directos SUTI...");
            }}
            className="bg-white dark:bg-zinc-900 rounded-[28px] p-5 shadow-neomorph-lift border border-white/60 dark:border-zinc-800/60 flex flex-col justify-between h-[155px] cursor-pointer hover:scale-[1.02] active:scale-99 text-left"
          >
            <div className="h-9.5 w-9.5 rounded-2xl bg-[#FF2B54]/10 text-[#FF2B54] border border-[#FF2B54]/15 flex items-center justify-center flex-shrink-0">
              <HandCoins className="h-5.5 w-5.5 stroke-[2]" />
            </div>
            <div>
              <h4 className="font-extrabold text-[12px] text-zinc-900 dark:text-zinc-100 leading-tight">Solicitar un préstamo</h4>
              <p className="text-[8.5px] text-zinc-450 dark:text-zinc-400 leading-tight mt-1">para cumplir tus sueños quincenales</p>
            </div>
          </div>

        </div>

        {/* Featured Premium Program banner block */}
        <div className="mt-5.5">
          <div className="bg-gradient-to-tr from-[#1E293B] to-[#0F172A] rounded-[24px] p-4.5 text-white border border-slate-800 shadow-md flex justify-between items-center text-left">
            <div className="space-y-1">
              <span className="text-[7px] text-rose-450 tracking-widest font-mono font-extrabold uppercase block leading-none">PLAN EXCLUSIVO SUTI</span>
              <h4 className="text-[11.5px] font-black tracking-tight leading-snug">EcoEnergía Solar 4.5%</h4>
              <p className="text-[8.5px] text-slate-400 leading-none">Reduce hasta 95% tu recibo CFE</p>
            </div>
            <button 
              onClick={() => {
                onOpenOverlay('financiera');
                triggerToast("Cargando simulador especializado de EcoEnergía Solar...");
              }}
              className="px-3.5 py-2 bg-[#FF2B54] font-sans text-[8.5px] font-black uppercase tracking-widest text-white rounded-md hover:bg-[#ff4369] transition-all cursor-pointer shrink-0 shadow-sm active:scale-95"
            >
              Simular
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
