import React, { useState, useEffect } from 'react';
import { FinancialProgram, FinancialRequestType, ApplicationTx } from '../types';
import { FINANCIAL_PROGRAMS } from '../mockData';
import { motion, AnimatePresence } from 'motion/react';
import * as LucideIcons from 'lucide-react';

// Dynamic icon resolver
const iconMap: Record<string, keyof typeof LucideIcons> = {
  FlameKindling: 'Flame',
  TrendingUp: 'TrendingUp',
  Zap: 'Zap',
  Map: 'Map',
  Car: 'Car',
  Sun: 'Sun',
  Compass: 'Compass',
  ShieldAlert: 'ShieldAlert',
  HeartPulse: 'HeartPulse',
  Dumbbell: 'Dumbbell',
  Tv: 'Tv',
  Gift: 'Gift'
};

const RenderIcon = ({ name, className }: { name: string; className?: string }) => {
  const lucideName = iconMap[name] || 'Sparkles';
  const IconComponent = (LucideIcons as any)[lucideName] || LucideIcons.Sparkles;
  return <IconComponent className={className} />;
};

interface Props {
  onAddTransaction: (tx: Omit<ApplicationTx, 'id' | 'date' | 'status' | 'progress'>) => void;
  onRequestClose?: () => void;
}

export const FinancieraSimulator: React.FC<Props> = ({ onAddTransaction, onRequestClose }) => {
  const [selectedProg, setSelectedProg] = useState<FinancialProgram>(FINANCIAL_PROGRAMS[0]);
  const [amount, setAmount] = useState<number>(20000);
  const [months, setMonths] = useState<number>(12);
  const [isSavingsActive, setIsSavingsActive] = useState(false);

  // Multi-step form state
  const [wizardStep, setWizardStep] = useState<'simulate' | 'details' | 'payroll' | 'signature' | 'celebrate'>('simulate');
  const [monthlyLiquidity, setMonthlyLiquidity] = useState<number>(18500); // User average salary
  const [signatureText, setSignatureText] = useState<string>('');
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);

  // Sync variables when selected program changes
  useEffect(() => {
    // Determine typical mid-value for program
    const initialAmount = Math.round(selectedProg.limitAmount * 0.4);
    setAmount(initialAmount < 1000 ? 1000 : initialAmount);
    setMonths(Math.min(12, selectedProg.maxMonths));
    setIsSavingsActive(selectedProg.id === 'ahorro');
    setWizardStep('simulate');
  }, [selectedProg]);

  // Adjust sliders if amount is out of bounds
  useEffect(() => {
    if (amount > selectedProg.limitAmount) {
      setAmount(selectedProg.limitAmount);
    }
  }, [selectedProg, amount]);

  // Amortization math
  const rateAnnual = selectedProg.rate;
  const rateMonthly = rateAnnual / 12 / 100;
  const totalPeriods = months;

  let monthlyPayment = 0;
  let totalInterest = 0;
  let totalPayable = amount;

  if (rateAnnual > 0) {
    monthlyPayment = amount * (rateMonthly / (1 - Math.pow(1 + rateMonthly, -totalPeriods)));
    totalPayable = monthlyPayment * totalPeriods;
    totalInterest = totalPayable - amount;
  } else {
    monthlyPayment = amount / totalPeriods;
    totalInterest = 0;
    totalPayable = amount;
  }

  // Quincenal deduction (most Sonora state payrolls are quincenales, 2 per month)
  const quincenalDeduction = monthlyPayment / 2;
  const payrollImpactPct = (quincenalDeduction / (monthlyLiquidity / 2)) * 100;

  // Handle finalize request
  const handleApplyFinal = () => {
    if (!acceptedTerms || !signatureText.trim()) return;

    onAddTransaction({
      type: selectedProg.id,
      title: selectedProg.title,
      amount: amount,
      notes: `Solicitado digitalmente con firma '${signatureText}'. Descuento quincenal proyectado de $${quincenalDeduction.toLocaleString('es-MX', { maximumFractionDigits: 2 })} MXN.`,
      months: months
    });

    setWizardStep('celebrate');
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Category selector chips */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4">
        {FINANCIAL_PROGRAMS.map((prog) => {
          const isSelected = selectedProg.id === prog.id;
          return (
            <button
              key={prog.id}
              onClick={() => setSelectedProg(prog)}
              className={`flex-shrink-0 px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-all duration-300 flex items-center gap-1.5 ${
                isSelected 
                  ? 'bg-gradient-to-r from-[#ff2a54] to-[#ff4d3b] text-white shadow-md shadow-red-500/15' 
                  : 'bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-350 border border-zinc-200/50 dark:border-zinc-850'
              }`}
            >
              <RenderIcon name={prog.iconName} className="h-3.5 w-3.5" />
              <span>{prog.title.split(' ')[0]} {prog.id === 'ahorro' ? 'Ahorro' : 'SUTI'}</span>
            </button>
          );
        })}
      </div>

      <div className="bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 rounded-2xl overflow-hidden shadow-xl">
        {/* Module Banner */}
        <div className={`bg-gradient-to-r ${selectedProg.color} p-5 text-white relative`}>
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <RenderIcon name={selectedProg.iconName} className="h-24 w-24" />
          </div>
          <div className="flex justify-between items-start">
            <div>
              <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[9px] font-mono tracking-wider uppercase">
                {selectedProg.category}
              </span>
              <h3 className="font-bold text-lg mt-1">{selectedProg.title}</h3>
              <p className="text-white/80 text-xs mt-1 max-w-md">{selectedProg.description}</p>
            </div>
            
            {/* Net promoter eligibility index */}
            <div className="bg-black/25 backdrop-blur-sm rounded-xl p-2.5 text-center flex flex-col items-center">
              <span className="text-[8px] text-zinc-300 uppercase font-mono tracking-wider">Elegibilidad</span>
              <span className={`text-base font-bold font-mono mt-0.5 ${
                selectedProg.eligibilityScore >= 85 
                  ? 'text-emerald-400' 
                  : selectedProg.eligibilityScore >= 75 
                    ? 'text-amber-400' 
                    : 'text-rose-400'
              }`}>
                {selectedProg.eligibilityScore}%
              </span>
            </div>
          </div>
        </div>

        {/* WIZARD VIEWS */}
        <AnimatePresence mode="wait">
          {wizardStep === 'simulate' && (
            <motion.div 
              key="simulate"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-5 flex flex-col gap-6"
            >
              {/* Sliders Container */}
              <div className="space-y-4">
                {/* 1. AMOUNT INPUT */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                      {isSavingsActive ? 'Monto a Depositar' : 'Monto del Beneficio'}
                    </label>
                    <span className="font-mono text-base font-bold text-rose-900 dark:text-red-400">
                      ${amount.toLocaleString('es-MX')} MXN
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max={selectedProg.limitAmount}
                    step="500"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full accent-rose-900 bg-zinc-200 dark:bg-zinc-800 h-2 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-zinc-400 font-mono mt-1">
                    <span>Min: $1,000</span>
                    <span>Max Disp: ${selectedProg.limitAmount.toLocaleString('es-MX')}</span>
                  </div>
                </div>

                {/* 2. TERM DETAILS */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                      Plazo de Reembolso
                    </label>
                    <span className="font-mono text-base font-bold text-zinc-800 dark:text-zinc-200">
                      {months} {months === 1 ? 'Mes' : 'Meses'} {isSavingsActive ? '(Fijo)' : `(${months * 2} Quincenas)`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max={selectedProg.maxMonths}
                    step="1"
                    value={months}
                    onChange={(e) => setMonths(Number(e.target.value))}
                    className="w-full accent-rose-900 bg-zinc-200 dark:bg-zinc-800 h-2 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-zinc-400 font-mono mt-1">
                    <span>1 Mes</span>
                    <span>Máximo: {selectedProg.maxMonths} Meses</span>
                  </div>
                </div>
              </div>

              {/* Financial Metrics Board */}
              <div className="grid grid-cols-2 gap-3.5 bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-200/40 dark:border-zinc-800/80">
                <div className="col-span-2 flex justify-between items-center border-b border-zinc-200/40 dark:border-zinc-800 pb-2">
                  <span className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">Concepto</span>
                  <span className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">Cotización</span>
                </div>

                <div>
                  <span className="text-[10px] text-zinc-400 block uppercase font-mono">
                    {isSavingsActive ? 'Rendimiento Anual' : 'Costo Anual Total'}
                  </span>
                  <span className="font-mono font-bold text-sm text-zinc-800 dark:text-zinc-100 flex items-center gap-1 mt-0.5">
                    {selectedProg.rate}% <span className="text-[9px] text-zinc-400 font-normal">Anual Fijo</span>
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-zinc-400 block uppercase font-mono">Interés Total</span>
                  <span className="font-mono font-bold text-sm text-zinc-800 dark:text-zinc-100 mt-0.5 block">
                    + ${totalInterest.toLocaleString('es-MX', { maximumFractionDigits: 0 })} MXN
                  </span>
                </div>

                <div className="pt-2 border-t border-zinc-200/40 dark:border-zinc-800">
                  <span className="text-[10px] text-zinc-400 block uppercase font-mono">
                    {isSavingsActive ? 'Estimación Retorno' : 'Descuento Quincenal'}
                  </span>
                  <span className="font-mono font-bold text-base text-rose-900 dark:text-red-400 mt-0.5 block">
                    ${quincenalDeduction.toLocaleString('es-MX', { maximumFractionDigits: 2 })} MXN
                  </span>
                  <span className="text-[8px] text-zinc-400 block font-sans">Retenido vía nómina</span>
                </div>

                <div className="pt-2 border-t border-zinc-200/40 dark:border-zinc-800">
                  <span className="text-[10px] text-zinc-400 block uppercase font-mono">Total Liquidación</span>
                  <span className="font-mono font-bold text-base text-zinc-800 dark:text-zinc-100 mt-0.5 block">
                    ${totalPayable.toLocaleString('es-MX', { maximumFractionDigits: 0 })} MXN
                  </span>
                  <span className="text-[8px] text-zinc-400 block font-sans">Diferido en {months * 2} cuotas</span>
                </div>
              </div>

              {/* Bullet info highlights */}
              <div className="space-y-1.5 text-left bg-rose-50/30 dark:bg-rose-950/10 p-3.5 rounded-xl border border-rose-500/10">
                <h4 className="text-[11px] font-bold text-rose-900 dark:text-red-400 uppercase tracking-widest flex items-center gap-1.5">
                  <LucideIcons.ShieldCheck className="h-3.5 w-3.5" /> Beneficios Sindicales SUTISSSTESON
                </h4>
                <ul className="space-y-1 mt-1">
                  {selectedProg.infoBullets.map((bullet, idx) => (
                    <li key={idx} className="text-[10.5px] text-zinc-600 dark:text-zinc-300 flex items-start gap-1.5">
                      <span className="text-rose-900 dark:text-red-500 mt-1">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 mt-2">
                {onRequestClose && (
                  <button
                    onClick={onRequestClose}
                    className="flex-1 py-3 text-xs font-bold font-sans text-zinc-500 hover:text-zinc-650 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 rounded-xl transition-colors cursor-pointer border border-zinc-200/40 dark:border-zinc-800"
                  >
                    Regresar
                  </button>
                )}
                <button
                  onClick={() => setWizardStep('details')}
                  className="flex-[2] py-3 text-xs font-extrabold font-sans text-white bg-gradient-to-r from-[#ff2a54] to-[#ff4d3b] hover:from-[#ea1a43] hover:to-[#ff3a25] rounded-xl shadow-lg shadow-red-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Iniciar Solicitud Directa</span>
                  <LucideIcons.ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {wizardStep === 'details' && (
            <motion.div 
              key="details"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-5 flex flex-col gap-5 text-left"
            >
              <h4 className="font-bold text-sm text-zinc-800 dark:text-zinc-100">Paso 1: Parámetros del Descuento</h4>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Estás aplicando para el programa <strong className="text-zinc-800 dark:text-zinc-200">{selectedProg.title}</strong> con un monto solicitado de <strong>${amount.toLocaleString('es-MX')} MXN</strong> diferido a <strong>{months} meses</strong>.
              </p>

              <div className="space-y-3 bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-200/50">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-500">Monto del Préstamo:</span>
                  <span className="font-mono font-bold text-zinc-800 dark:text-zinc-200">${amount.toLocaleString('es-MX')} MXN</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-500">Tasa de Interés:</span>
                  <span className="font-mono font-bold text-zinc-800 dark:text-zinc-200">{selectedProg.rate}% Anual Fija</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-500">Comisión por Apertura:</span>
                  <span className="font-mono font-bold text-emerald-600">0% (Subsidio Union)</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-500">Garantía Mutua:</span>
                  <span className="font-mono font-bold text-emerald-600">Cubierta (Fondo Sindical)</span>
                </div>
                <div className="border-t border-zinc-200/50 dark:border-zinc-800 pt-2.5 flex justify-between text-sm font-bold">
                  <span className="text-zinc-800 dark:text-zinc-200">Cargo Quincenal Estimado:</span>
                  <span className="font-mono text-rose-900 dark:text-red-400">${quincenalDeduction.toLocaleString('es-MX', { maximumFractionDigits: 2 })} MXN</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">
                <LucideIcons.Info className="h-4 w-4 flex-shrink-0" />
                <p>La autorización definitiva está sujeta a la validación de tus talones de pago del presente mes.</p>
              </div>

              <div className="flex gap-3.5">
                <button
                  onClick={() => setWizardStep('simulate')}
                  className="flex-1 py-3 text-xs font-extrabold text-zinc-550 bg-zinc-100 dark:bg-zinc-900 rounded-xl hover:bg-zinc-200 transition-all cursor-pointer border border-zinc-250/20"
                >
                  Modificar Cotización
                </button>
                <button
                  onClick={() => setWizardStep('payroll')}
                  className="flex-1 py-3 text-xs font-extrabold text-white bg-gradient-to-r from-[#ff2a54] to-[#ff4d3b] hover:from-[#ea1a43] hover:to-[#be123c] rounded-xl shadow-lg shadow-red-500/10 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Siguiente Paso</span>
                  <LucideIcons.ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {wizardStep === 'payroll' && (
            <motion.div 
              key="payroll"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-5 flex flex-col gap-5 text-left"
            >
              <h4 className="font-bold text-sm text-zinc-805 dark:text-zinc-100">Paso 2: Análisis de Capacidad de Nómina</h4>
              <p className="text-xs text-zinc-500">
                Como medida de protección financiera bajo el convenio SUTISSSTESON, evaluamos que la retención no vulnere tu sustento familiar de nómina. (Límite máximo recomendado: 30% de tu sueldo libre).
              </p>

              <div>
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                  Ingreso Libre Mensual Promedio (MXN)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-zinc-500 text-sm">$</span>
                  <input
                    type="number"
                    value={monthlyLiquidity}
                    onChange={(e) => setMonthlyLiquidity(Number(e.target.value) || 0)}
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2 pl-7 pr-3 text-sm font-semibold font-mono text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-rose-900"
                  />
                </div>
              </div>

              {/* Stress impact bar */}
              <div className="bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-200/40">
                <div className="flex justify-between items-center mb-1 text-xs">
                  <span className="text-zinc-600 dark:text-zinc-400">Impacto en Nómina Quincenal:</span>
                  <span className={`font-bold font-mono ${
                    payrollImpactPct > 35 
                      ? 'text-rose-500' 
                      : payrollImpactPct > 20 
                        ? 'text-amber-500' 
                        : 'text-emerald-500'
                  }`}>
                    {payrollImpactPct.toFixed(1)}% {payrollImpactPct > 30 ? '(Alto Riesgo)' : '(Saludable)'}
                  </span>
                </div>
                
                {/* Visual indicator bar */}
                <div className="w-full h-2.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      payrollImpactPct > 35 
                        ? 'bg-rose-500' 
                        : payrollImpactPct > 20 
                          ? 'bg-amber-500' 
                          : 'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.min(100, payrollImpactPct)}%` }}
                  />
                </div>

                <p className="text-[10px] text-zinc-400 mt-2">
                  Deducción quincenal de <strong>${quincenalDeduction.toLocaleString('es-MX', { maximumFractionDigits: 0 })}</strong> sobre ingresos quincenales estimados de <strong>${(monthlyLiquidity/2).toLocaleString('es-MX', { maximumFractionDigits: 0 })}</strong>.
                </p>
              </div>

              {payrollImpactPct > 35 ? (
                <div className="p-3 bg-rose-500/10 rounded-xl border border-rose-500/20 text-xs text-rose-600 flex items-start gap-2">
                  <LucideIcons.ShieldAlert className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <p>Aviso: Tu impacto supera el recomendación sindical del 30%. Recomendamos seleccionar un plazo mayor o reducir el monto para facilitar la aprobación administrativa sin retardos.</p>
                </div>
              ) : (
                <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-xs text-emerald-600 flex items-start gap-2">
                  <LucideIcons.ShieldCheck className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <p>Excelente: Tu capacidad de descuento es idónea. El préstamo cumple con las directrices de fomento social seguro.</p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setWizardStep('details')}
                  className="flex-1 py-3 text-xs font-extrabold text-zinc-550 bg-zinc-100 dark:bg-zinc-900 rounded-xl hover:bg-zinc-200 transition-all cursor-pointer border border-zinc-250/20"
                >
                  Atrás
                </button>
                <button
                  onClick={() => setWizardStep('signature')}
                  className="flex-1 py-3 text-xs font-extrabold text-white bg-gradient-to-r from-[#ff2a54] to-[#ff4d3b] hover:from-[#ea1a43] hover:to-[#be123c] rounded-xl shadow-lg shadow-red-500/10 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Proceder a Firma</span>
                  <LucideIcons.ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {wizardStep === 'signature' && (
            <motion.div 
              key="signature"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-5 flex flex-col gap-4 text-left"
            >
              <h4 className="font-bold text-sm text-zinc-800 dark:text-zinc-100">Paso 3: Firma Electrónica Autógrafa</h4>
              <p className="text-xs text-zinc-500">
                SutiApp utiliza validación criptográfica federada estatal para otorgar validez jurídica a tu firma digital y talones.
              </p>

              {/* Legal checkbox */}
              <label className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 cursor-pointer border border-zinc-200/50">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded text-rose-900 focus:ring-rose-500 border-zinc-300 accent-rose-900"
                />
                <span className="text-[10.5px] text-zinc-600 dark:text-zinc-400 select-none">
                  Acepto el contrato de adhesión sindical, el descuento recurrente vía nómina en mi talón regular de ISSSTESON y el resguardo de estos datos.
                </span>
              </label>

              {/* Interactive signature canvas mockup */}
              <div>
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                  Ingresa tu Nombre Completo como Firma Autógrafa
                </label>
                <input
                  type="text"
                  value={signatureText}
                  onChange={(e) => setSignatureText(e.target.value)}
                  placeholder="Ej: Lic. Andrea González Espinoza"
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 px-3.5 text-sm font-semibold text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-rose-900"
                />
              </div>

              {signatureText.trim() && (
                <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 bg-zinc-100 dark:bg-zinc-900 flex flex-col items-center justify-center relative overflow-hidden">
                  <span className="absolute left-2.5 top-2.5 text-[8px] font-mono text-zinc-400 uppercase tracking-widest">Sello Digital Criptográfico</span>
                  {/* Mock handwritten style signature */}
                  <span className="font-serif italic text-2xl py-3 text-rose-800 dark:text-red-400 font-bold select-none tracking-wide">
                    {signatureText}
                  </span>
                  <div className="text-[8px] font-mono text-zinc-500 text-center mt-1">
                    SHA-256: f8b92b6a7a0ee002c9182236d1b711e6...
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => setWizardStep('payroll')}
                  className="flex-1 py-3 text-xs font-extrabold text-zinc-550 bg-zinc-100 dark:bg-zinc-900 rounded-xl hover:bg-zinc-200 transition-all cursor-pointer"
                >
                  Atrás
                </button>
                <button
                  disabled={!acceptedTerms || !signatureText.trim()}
                  onClick={handleApplyFinal}
                  className={`flex-1 py-3 text-xs font-extrabold text-white rounded-xl shadow-lg transition-all flex items-center justify-center gap-1.5 ${
                    acceptedTerms && signatureText.trim() 
                      ? 'bg-gradient-to-r from-[#ff2a54] to-[#ff4d3b] hover:from-[#ea1a43] hover:to-[#be123c] shadow-red-500/10 cursor-pointer' 
                      : 'bg-zinc-300 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-650 cursor-not-allowed shadow-none'
                  }`}
                >
                  <span>Firmar y Enviar</span>
                  <LucideIcons.CheckSquare className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {wizardStep === 'celebrate' && (
            <motion.div 
              key="celebrate"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 flex flex-col items-center justify-center text-center gap-4 py-8"
            >
              <div className="h-14 w-14 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/30">
                <LucideIcons.Check className="h-7 w-7 text-emerald-500 animate-bounce" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-emerald-600">¡Solicitud Enviada con Éxito!</h4>
                <p className="text-xs text-zinc-500 max-w-sm mt-1.5 leading-relaxed">
                  El Comité de Vigilancia y Finanzas de SUTISSSTESON ha recibido tu firma digital encriptada para el programa <strong>{selectedProg.title}</strong>. El folio asignado quincenal es el <strong>#{Math.floor(Math.random() * 80000) + 10000}</strong>.
                </p>
              </div>

              <div className="w-full bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-200/50 space-y-1.5 text-left text-xs text-zinc-600 dark:text-zinc-400">
                <div className="flex justify-between">
                  <span>Monto:</span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-200">${amount.toLocaleString('es-MX')} MXN</span>
                </div>
                <div className="flex justify-between">
                  <span>Plazo:</span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-200">{months} Meses ({months * 2} Quincenas)</span>
                </div>
                <div className="flex justify-between">
                  <span>Descuento proyectado quincenal:</span>
                  <span className="font-bold text-rose-900 dark:text-red-400">${quincenalDeduction.toLocaleString('es-MX', { maximumFractionDigits: 2 })} MXN</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setWizardStep('simulate');
                  if (onRequestClose) onRequestClose();
                }}
                className="w-full py-3 text-xs font-bold text-white bg-zinc-900 hover:bg-zinc-950 rounded-xl transition-all cursor-pointer"
              >
                Cerrar y Volver al Historial
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
