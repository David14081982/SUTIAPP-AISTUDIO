import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Tv, 
  HelpCircle, 
  Check, 
  Sparkles, 
  Smartphone, 
  ChevronRight, 
  Volume2, 
  VolumeX, 
  Settings, 
  Clock, 
  ShieldCheck, 
  Users,
  Eye,
  Gift,
  Bell,
  Coins
} from 'lucide-react';

interface TutorialStep {
  title: string;
  description: string;
  voiceText: string;
}

export const TutorialsOnboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isLargeText, setIsLargeText] = useState(false);

  // Assistance chatbot quiz state
  const [quizStep, setQuizStep] = useState<number>(0);
  const [quizAnswers, setQuizAnswers] = useState<{need: string; amount: string}>({need: '', amount: ''});
  const [quizResult, setQuizResult] = useState<string | null>(null);

  // Notification Preferences states (backed by localStorage)
  const [prefNewAgreement, setPrefNewAgreement] = useState<boolean>(() => {
    return localStorage.getItem('suti_pref_new_agreement') !== 'false';
  });
  const [prefLoanStatus, setPrefLoanStatus] = useState<boolean>(() => {
    return localStorage.getItem('suti_pref_loan_status') !== 'false';
  });
  const [prefTalonReminder, setPrefTalonReminder] = useState<boolean>(() => {
    return localStorage.getItem('suti_pref_talon_reminder') !== 'false';
  });
  const [prefUnionAnnounce, setPrefUnionAnnounce] = useState<boolean>(() => {
    return localStorage.getItem('suti_pref_union_announce') !== 'false';
  });

  const [isAlertSettingsOpen, setIsAlertSettingsOpen] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Custom simulation speech quote
  const [customVoiceNarration, setCustomVoiceNarration] = useState<string | null>(null);

  const handleSavePreferences = () => {
    localStorage.setItem('suti_pref_new_agreement', String(prefNewAgreement));
    localStorage.setItem('suti_pref_loan_status', String(prefLoanStatus));
    localStorage.setItem('suti_pref_talon_reminder', String(prefTalonReminder));
    localStorage.setItem('suti_pref_union_announce', String(prefUnionAnnounce));

    setSaveSuccess(true);
    
    // Simulate smart voice feedback if voice-over features are enabled
    const enabledAlerts: string[] = [];
    if (prefNewAgreement) enabledAlerts.push("nuevos convenios");
    if (prefLoanStatus) enabledAlerts.push("estado de créditos");
    if (prefTalonReminder) enabledAlerts.push("talones de nómina");
    if (prefUnionAnnounce) enabledAlerts.push("anuncios gremiales");

    const feedbackText = enabledAlerts.length > 0 
      ? `Preferencias de alertas actualizadas con éxito. Has activado recibir avisos sobre: ${enabledAlerts.join(', ')}.`
      : "Preferencias guardadas. Has silenciado temporalmente las notificaciones push de SutiApp móvil.";

    setCustomVoiceNarration(feedbackText);
    if (!isVoiceActive) {
      setIsVoiceActive(true); // automatically activate the voice bubble to show response!
    }

    setTimeout(() => {
      setSaveSuccess(false);
      setIsAlertSettingsOpen(false);
    }, 1500);
  };

  const steps: TutorialStep[] = [
    {
      title: "Bienvenido a SutiApp Móvil",
      description: "La herramienta oficial para todos los afiliados de SUTISSSTESON. Aquí puedes solicitar préstamos y ver tus descuentos sin acudir a oficinas.",
      voiceText: "Hola, te damos la bienvenida a SutiApp. Este es tu centro de ayuda digital. Presiona Siguiente para aprender a usar tu aplicación."
    },
    {
      title: "Simulador de Créditos",
      description: "Mueve los controles deslizantes para ajustar la cantidad y el plazo de pago. El sistema calcula en tiempo real tu pago quincenal sin interés moratorio.",
      voiceText: "En la pestaña Financiera, puedes arrastrar los controles para decidir el monto. El pago quincenal se calcula automáticamente de forma transparente."
    },
    {
      title: "Carga Segura de Talones",
      description: "Sube una foto clara de tu credencial INE y tu talón de nómina vigente. Esta validación biométrica protege tu identidad.",
      voiceText: "Cargar tus comprobantes es seguro. Se utiliza cifrado de nivel bancario para resguardar tus datos confidenciales quincenales."
    },
    {
      title: "Tu Credencial en el Bolsillo",
      description: "Presenta el código QR o código de barras directamente desde tu celular en negocios locales con convenios activos para gozar de descuentos.",
      voiceText: "Gira tu credencial tocándola para mostrar el código de barras en comercios afiliados y recibir beneficios automáticos."
    }
  ];

  const handleNextStep = () => {
    setCustomVoiceNarration(null);
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(0); // loop
    }
  };

  const handleVoiceSimulate = () => {
    setIsVoiceActive(!isVoiceActive);
  };

  // Find your loan match quiz
  const handleAnswerNeed = (need: string) => {
    setQuizAnswers(prev => ({ ...prev, need }));
    setQuizStep(1);
  };

  const handleAnswerAmount = (amount: string) => {
    setQuizAnswers(prev => ({ ...prev, amount }));
    
    // Evaluate match
    let match = "Crédito de Emergencia SUTI";
    if (quizAnswers.need === 'vivienda') {
      match = "Crédito Terreno Patrimonial SUTI";
    } else if (quizAnswers.need === 'salud') {
      match = "Vales de Farmacia o Apoyo de Cirugía Especializada";
    } else if (quizAnswers.need === 'compras') {
      match = "Financiamiento de Línea Blanca para el Hogar";
    } else if (amount === 'alto') {
      match = "Financiamiento Automotriz SUTI-Vite";
    } else if (amount === 'bajo') {
      match = "Adelanto de Nómina Activo (Interés 0%)";
    }

    setQuizResult(match);
    setQuizStep(2);
  };

  const handleResetQuiz = () => {
    setQuizStep(0);
    setQuizAnswers({need: '', amount: ''});
    setQuizResult(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
      
      {/* 1. VISUAL ACCESSIBLE TUTORIAL CAROUSEL */}
      <div className="bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-900 rounded-2xl p-5 shadow-md flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-4 pb-2.5 border-b border-zinc-100 dark:border-zinc-900">
            <div className="flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-rose-900" />
              <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-400 font-mono">Guía de Asistencia SUTI</h4>
            </div>
            
            {/* Custom accessibility bar */}
            <div className="flex gap-2">
              <button
                onClick={() => setIsLargeText(!isLargeText)}
                className={`p-1.5 rounded-lg border text-[10px] font-mono font-bold transition-all ${
                  isLargeText 
                    ? 'bg-rose-50 border-rose-200 text-rose-900' 
                    : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-500 border-zinc-200/40 dark:border-zinc-850'
                }`}
                title="Agrandar Letra para Adultos Mayores"
              >
                A A +
              </button>
              <button
                onClick={handleVoiceSimulate}
                className={`p-1.5 rounded-lg border transition-all ${
                  isVoiceActive 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-600 animate-pulse' 
                    : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-400 border-zinc-200/40 dark:border-zinc-850'
                }`}
                title="Lector de Asistencia por Voz"
              >
                {isVoiceActive ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Tutorial Step View */}
          <div className="space-y-3 py-2">
            <span className="font-mono text-[9px] font-bold text-rose-900 dark:text-red-400 uppercase bg-rose-50 px-2 py-0.5 rounded-full dark:bg-rose-950/20">
              Paso {currentStep + 1} de {steps.length}
            </span>
            <h3 className={`font-black text-zinc-850 dark:text-zinc-150 transition-all ${isLargeText ? 'text-lg md:text-xl' : 'text-sm md:text-base'}`}>
              {steps[currentStep].title}
            </h3>
            <p className={`text-zinc-500 leading-relaxed font-sans font-medium transition-all ${isLargeText ? 'text-sm md:text-base' : 'text-[11.5px]'}`}>
              {steps[currentStep].description}
            </p>

            {/* Voice Reader Simulator Bubble */}
            <AnimatePresence>
              {isVoiceActive && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-emerald-500/10 border border-emerald-500/10 rounded-xl p-3 text-xs text-emerald-700 flex items-start gap-2.5 mt-4"
                >
                  <Volume2 className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5 animate-bounce" />
                  <div className="font-sans">
                    <span className="text-[9px] uppercase font-mono tracking-widest block font-bold text-emerald-600 mb-0.5">Asistente de Voz Activo</span>
                    <p className="italic font-medium text-emerald-800 dark:text-emerald-400">
                      &quot;{customVoiceNarration || steps[currentStep].voiceText}&quot;
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Carousel indicator points and controls */}
        <div className="mt-6 pt-3.5 border-t border-zinc-100 dark:border-zinc-950 flex items-center justify-between">
          <div className="flex gap-1.5">
            {steps.map((_, idx) => (
              <span 
                key={idx}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentStep ? 'w-5 bg-rose-900' : 'w-2 bg-zinc-200 dark:bg-zinc-800'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNextStep}
            className="px-4 py-2 bg-zinc-900 hover:bg-black text-white rounded-xl text-xs font-bold font-sans flex items-center gap-1 cursor-pointer transition-all"
          >
            <span>Siguiente</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* 2. FIND IDEAL CREDIT QUIZ SYSTEM */}
      <div className="bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-900 rounded-2xl p-5 shadow-md flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-4 pb-2.5 border-b border-zinc-100 dark:border-zinc-900">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4.5 w-4.5 text-rose-900" />
              <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-400 font-mono">Buscador de Crédito Ideal</h4>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-zinc-100 text-[9px] font-mono text-zinc-500">Asesor Express</span>
          </div>

          {/* QUIZ INTERACTIVE VIEW */}
          <AnimatePresence mode="wait">
            {quizStep === 0 && (
              <motion.div
                key="q0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <h5 className="text-xs font-bold text-zinc-700 dark:text-zinc-300">¿Para qué necesitas que te apoyemos hoy?</h5>
                
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => handleAnswerNeed('urgencia')}
                    className="p-3 bg-zinc-50 hover:bg-rose-50 dark:bg-zinc-900 hover:dark:bg-rose-950/25 border border-zinc-200/40 hover:border-rose-450 dark:border-zinc-850 rounded-xl text-left transition-all cursor-pointer"
                  >
                    <span className="block text-xs font-bold text-zinc-800 dark:text-zinc-200">Urgencia Médica o Personal</span>
                    <span className="text-[10px] text-zinc-500 block mt-0.5">Préstamos rápidos y de salud</span>
                  </button>
                  <button
                    onClick={() => handleAnswerNeed('vivienda')}
                    className="p-3 bg-zinc-50 hover:bg-rose-50 dark:bg-zinc-900 hover:dark:bg-rose-950/25 border border-zinc-200/40 hover:border-rose-450 dark:border-zinc-850 rounded-xl text-left transition-all cursor-pointer"
                  >
                    <span className="block text-xs font-bold text-zinc-800 dark:text-zinc-200">Terrenos o Mejoras</span>
                    <span className="text-[10px] text-zinc-500 block mt-0.5">Créditos de urbanización SUTI</span>
                  </button>
                  <button
                    onClick={() => handleAnswerNeed('compras')}
                    className="p-3 bg-zinc-50 hover:bg-rose-50 dark:bg-zinc-900 hover:dark:bg-rose-950/25 border border-zinc-200/40 hover:border-rose-450 dark:border-zinc-850 rounded-xl text-left transition-all cursor-pointer"
                  >
                    <span className="block text-xs font-bold text-zinc-800 dark:text-zinc-200">Línea Blanca u Hogar</span>
                    <span className="text-[10px] text-zinc-500 block mt-0.5">Equipamiento comercial preferente</span>
                  </button>
                  <button
                    onClick={() => handleAnswerNeed('experiencia')}
                    className="p-3 bg-zinc-50 hover:bg-rose-50 dark:bg-zinc-900 hover:dark:bg-rose-950/25 border border-zinc-200/40 hover:border-rose-450 dark:border-zinc-850 rounded-xl text-left transition-all cursor-pointer"
                  >
                    <span className="block text-xs font-bold text-zinc-800 dark:text-zinc-200">Vacaciones o Rifas</span>
                    <span className="text-[10px] text-zinc-500 block mt-0.5">Fomentos sociales y viajes</span>
                  </button>
                </div>
              </motion.div>
            )}

            {quizStep === 1 && (
              <motion.div
                key="q1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <h5 className="text-xs font-bold text-zinc-700 dark:text-zinc-300">¿Qué rango presupuestal estás contemplando?</h5>
                
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => handleAnswerAmount('bajo')}
                    className="p-3 bg-zinc-50 hover:bg-rose-50 dark:bg-zinc-900 hover:dark:bg-rose-950/25 border border-zinc-200/40 dark:border-zinc-850 rounded-xl text-left transition-all cursor-pointer"
                  >
                    <span className="block text-xs font-bold text-zinc-800 dark:text-zinc-200">Hasta $15,000 MXN</span>
                    <span className="text-[10px] text-zinc-400 block mt-0.5">Monto de menor plazo</span>
                  </button>
                  <button
                    onClick={() => handleAnswerAmount('medio')}
                    className="p-3 bg-zinc-50 hover:bg-rose-50 dark:bg-zinc-900 hover:dark:bg-rose-950/25 border border-zinc-200/40 dark:border-zinc-850 rounded-xl text-left transition-all cursor-pointer"
                  >
                    <span className="block text-xs font-bold text-zinc-800 dark:text-zinc-200">$15,000 a $60,000 MXN</span>
                    <span className="text-[10px] text-zinc-400 block mt-0.5">Préstamos de emergencia y línea blanca</span>
                  </button>
                  <button
                    onClick={() => handleAnswerAmount('alto')}
                    className="p-3 bg-zinc-50 hover:bg-rose-50 dark:bg-zinc-900 hover:dark:bg-rose-950/25 border border-zinc-200/40 dark:border-zinc-850 rounded-xl text-left transition-all cursor-pointer"
                  >
                    <span className="block text-xs font-bold text-zinc-800 dark:text-zinc-200">Más de $100,000 MXN</span>
                    <span className="text-[10px] text-zinc-400 block mt-0.5">Terrenos o financiamiento automotriz</span>
                  </button>
                  <button
                    onClick={() => handleAnswerAmount('ahorro')}
                    className="p-3 bg-zinc-50 hover:bg-rose-50 dark:bg-zinc-900 hover:dark:bg-rose-950/25 border border-zinc-200/40 dark:border-zinc-850 rounded-xl text-left transition-all cursor-pointer"
                  >
                    <span className="block text-xs font-bold text-zinc-800 dark:text-zinc-200">No buscar crédito (Solo Ahorrar)</span>
                    <span className="text-[10px] text-zinc-400 block mt-0.5">Estrategia Rendimiento Plus</span>
                  </button>
                </div>
              </motion.div>
            )}

            {quizStep === 2 && quizResult && (
              <motion.div
                key="q2"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/10 rounded-2xl text-center flex flex-col items-center gap-2">
                  <div className="h-9 w-9 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-mono tracking-widest block font-bold text-emerald-600 mb-0.5">Sugerencia SUTI Recomendada</span>
                    <h4 className="font-bold text-sm text-zinc-800 dark:text-zinc-100">{quizResult}</h4>
                    <p className="text-[10px] text-zinc-505 dark:text-zinc-400 mt-1 max-w-xs mx-auto leading-relaxed">
                      Este beneficio está alineado con tus preferencias financieras y tiene un tiempo de otorgamiento garantizado regular acelerado.
                    </p>
                  </div>
                </div>

                <div className="flex gap-2.5">
                  <button
                    onClick={handleResetQuiz}
                    className="flex-1 py-2.5 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 text-zinc-650 rounded-xl text-xs font-bold cursor-pointer transition-colors"
                  >
                    Reiniciar
                  </button>
                  <button
                    onClick={handleResetQuiz}
                    className="flex-1 py-2.5 bg-zinc-900 hover:bg-black text-white rounded-xl text-xs font-bold cursor-pointer transition-colors"
                  >
                    Aceptar Recomendación
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-4 pt-3 text-[9px] text-zinc-400 font-mono flex items-center gap-1">
          <ShieldCheck className="h-3.5 w-3.5 text-zinc-400" /> Consultor algorítmico libre de buró de crédito estatal.
        </div>
      </div>

      {/* 3. NOTIFICATION PREFERENCES SETTINGS BANNER */}
      <div className="md:col-span-2 bg-[#fdfdfd] dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-900 rounded-2xl p-4.5 shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="h-10 w-10 bg-rose-50 dark:bg-rose-950/20 text-rose-900 dark:text-red-400 rounded-xl flex items-center justify-center flex-shrink-0 border border-rose-100/50 dark:border-zinc-850">
            <Bell className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-xs text-zinc-850 dark:text-zinc-150 tracking-tight leading-snug">Preferencia de Alertas SutiApp</h4>
            <p className="text-[11px] text-zinc-500 leading-relaxed font-sans font-medium mt-0.5">
              Administra tus notificaciones de forma precisa. Elige qué novedades deseas recibir en tiempo real.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAlertSettingsOpen(true)}
          className="w-full sm:w-auto px-4 py-2.5 bg-zinc-900 hover:bg-black text-white rounded-xl text-xs font-bold font-sans flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-98"
        >
          <Settings className="h-4 w-4" />
          <span>Configurar Alertas</span>
        </button>
      </div>

      {/* MODAL DIALOG PREFERENCES */}
      <AnimatePresence>
        {isAlertSettingsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAlertSettingsOpen(false)}
              className="absolute inset-0 bg-black/55 backdrop-blur-xs"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-sm bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200/50 dark:border-zinc-900 p-5 shadow-2xl overflow-hidden"
            >
              <div className="flex justify-between items-center pb-3 border-b border-zinc-100 dark:border-zinc-900 mb-4">
                <div className="flex items-center gap-2">
                  <Bell className="h-4.5 w-4.5 text-rose-955 dark:text-red-400" />
                  <div>
                    <h3 className="font-black text-xs text-zinc-900 dark:text-zinc-100 tracking-tight">Preferencias de Alertas SUTI</h3>
                    <p className="text-[9.5px] text-zinc-400 font-medium font-sans">Controla avisos quincenales e institucionales</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsAlertSettingsOpen(false)}
                  className="h-6 w-6 flex items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-800 transition-colors text-xs font-bold cursor-pointer font-sans"
                >
                  ✕
                </button>
              </div>

              {/* Toggles List */}
              <div className="space-y-2.5">
                {/* 1. New Agreements */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-900/60 transition-all">
                  <div className="flex items-start gap-2 flex-1 mr-2">
                    <div className="h-8 w-8 rounded-lg bg-rose-50 dark:bg-rose-950/20 text-rose-900 dark:text-red-400 flex items-center justify-center mt-0.5 border border-rose-100/50 dark:border-rose-950/40 flex-shrink-0">
                      <Gift className="h-4 w-4" />
                    </div>
                    <div>
                      <h5 className="font-extrabold text-[11px] text-zinc-850 dark:text-zinc-100 leading-tight">Nuevo Convenio Disponible</h5>
                      <p className="text-[9.5px] text-zinc-500 font-medium leading-snug mt-0.5 font-sans">
                        Avisos cuando comercios locales ofrezcan descuentos.
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setPrefNewAgreement(!prefNewAgreement)}
                    className={`w-10 h-6 rounded-full p-0.5 transition-colors cursor-pointer relative ${prefNewAgreement ? 'bg-[#ff2a54]' : 'bg-zinc-200 dark:bg-zinc-800'}`}
                  >
                    <motion.div 
                      layout 
                      className="w-5 h-5 rounded-full bg-white shadow-sm"
                      animate={{ x: prefNewAgreement ? 16 : 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </button>
                </div>

                {/* 2. Loan Status Update */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-900/60 transition-all">
                  <div className="flex items-start gap-2 flex-1 mr-2">
                    <div className="h-8 w-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mt-0.5 border border-emerald-100/50 dark:border-emerald-950/40 flex-shrink-0">
                      <Coins className="h-4 w-4" />
                    </div>
                    <div>
                      <h5 className="font-extrabold text-[11px] text-zinc-850 dark:text-zinc-100 leading-tight">Estado de Créditos (Soli)</h5>
                      <p className="text-[9.5px] text-zinc-500 font-medium leading-snug mt-0.5 font-sans">
                        Alertas del trámite quincenal de préstamos.
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setPrefLoanStatus(!prefLoanStatus)}
                    className={`w-10 h-6 rounded-full p-0.5 transition-colors cursor-pointer relative ${prefLoanStatus ? 'bg-[#ff2a54]' : 'bg-zinc-200 dark:bg-zinc-800'}`}
                  >
                    <motion.div 
                      layout 
                      className="w-5 h-5 rounded-full bg-white shadow-sm"
                      animate={{ x: prefLoanStatus ? 16 : 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </button>
                </div>

                {/* 3. Stub verification reminder */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-900/60 transition-all">
                  <div className="flex items-start gap-2 flex-1 mr-2">
                    <div className="h-8 w-8 rounded-lg bg-amber-50 dark:bg-amber-950/20 text-amber-500 dark:text-amber-400 flex items-center justify-center mt-0.5 border border-amber-100/50 dark:border-amber-950/40 flex-shrink-0">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div>
                      <h5 className="font-extrabold text-[11px] text-zinc-850 dark:text-zinc-100 leading-tight">Recordatorio de Validación</h5>
                      <p className="text-[9.5px] text-zinc-500 font-medium leading-snug mt-0.5 font-sans">
                        Avisos para subir talones antes del cierre.
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setPrefTalonReminder(!prefTalonReminder)}
                    className={`w-10 h-6 rounded-full p-0.5 transition-colors cursor-pointer relative ${prefTalonReminder ? 'bg-[#ff2a54]' : 'bg-zinc-200 dark:bg-zinc-800'}`}
                  >
                    <motion.div 
                      layout 
                      className="w-5 h-5 rounded-full bg-white shadow-sm"
                      animate={{ x: prefTalonReminder ? 16 : 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </button>
                </div>

                {/* 4. Union announcements */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-900/60 transition-all">
                  <div className="flex items-start gap-2 flex-1 mr-2">
                    <div className="h-8 w-8 rounded-lg bg-zinc-50 dark:bg-zinc-900 text-zinc-650 dark:text-zinc-350 flex items-center justify-center mt-0.5 border border-zinc-200/40 dark:border-zinc-800 flex-shrink-0">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div>
                      <h5 className="font-extrabold text-[11px] text-zinc-850 dark:text-zinc-100 leading-tight">Comunicados SUTISSSTESON</h5>
                      <p className="text-[9.5px] text-zinc-500 font-medium leading-snug mt-0.5 font-sans">
                        Circulares institucionales y asambleas.
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setPrefUnionAnnounce(!prefUnionAnnounce)}
                    className={`w-10 h-6 rounded-full p-0.5 transition-colors cursor-pointer relative ${prefUnionAnnounce ? 'bg-[#ff2a54]' : 'bg-zinc-200 dark:bg-zinc-800'}`}
                  >
                    <motion.div 
                      layout 
                      className="w-5 h-5 rounded-full bg-white shadow-sm"
                      animate={{ x: prefUnionAnnounce ? 16 : 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4.5 pt-3 border-t border-zinc-100 dark:border-zinc-900 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsAlertSettingsOpen(false)}
                  className="flex-1 py-2 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-350 rounded-xl text-xs font-bold font-sans cursor-pointer transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSavePreferences}
                  className="flex-1 py-2 bg-[#ff2a54] hover:bg-black text-white hover:text-rose-100 rounded-xl text-xs font-bold font-sans cursor-pointer transition-all flex items-center justify-center gap-1"
                >
                  {saveSuccess ? (
                    <>
                      <Check className="h-3.5 w-3.5 animate-bounce" />
                      <span>¡Guardado!</span>
                    </>
                  ) : (
                    <span>Guardar Cambios</span>
                  )}
                </button>
              </div>

              {/* Success Notification simulation banner */}
              <AnimatePresence>
                {saveSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute inset-x-0 bottom-0 bg-emerald-600 text-white p-2.5 text-center text-[9px] font-sans font-bold uppercase tracking-wider flex items-center justify-center gap-1.5"
                  >
                    <Check className="h-3 w-3" />
                    <span>Ajustes actualizados con éxito</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
