import { 
  FinancialProgram, 
  BusinessAgreement, 
  ApplicationTx, 
  NewsFeed, 
  CommitteeMember,
  UnionMember
} from './types';

export const CURRENT_MEMBER_MOCK: UnionMember = {
  id: "SUTI-98842",
  name: "Lic. Andrea González Espinoza",
  payrollId: "PAY-2024-550",
  section: "Salud y Prestaciones Hermosillo",
  avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
  membershipDate: "Octubre 2019",
  digitalQrUrl: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=SUTI-98842-ANDREA-GONZALEZ-SUTISSSTESON",
  documents: {
    ine: 'uploaded',
    talon1: 'uploaded',
    talon2: 'pending',
  }
};

export const COMMITTEE_MEMBERS: CommitteeMember[] = [
  {
    name: "Dr. Arturo Ruiz Valenzuela",
    role: "Secretario General SUTISSSTESON",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop",
    department: "Comité Ejecutivo Estatal"
  },
  {
    name: "C.P. Mónica Arana Valdez",
    role: "Secretaria de Finanzas y Préstamos",
    photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&auto=format&fit=crop",
    department: "Comisión de Vigilancia y Auxilio Social"
  },
  {
    name: "Ing. Javier Esquer Maldonado",
    role: "Secretario de Vivienda y Fomento Social",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
    department: "Créditos Hipotecarios e Inmobiliaria"
  }
];

export const FINANCIAL_PROGRAMS: FinancialProgram[] = [
  {
    id: "prestamo",
    title: "Crédito de Emergencia SUTI",
    description: "Financiamiento inmediato para imprevistos con descuento automático de nómina.",
    category: "directo",
    limitAmount: 45000,
    rate: 8.5,
    maxMonths: 24,
    iconName: "FlameKindling",
    color: "from-rose-600 to-red-700",
    eligibilityScore: 92,
    infoBullets: [
      "Tasa anual preferente fija del 8.5%",
      "Aprobación express en menos de 2 horas",
      "Descuento quincenal automático en talón de pago",
      "Sin aval requerido para montos menores a $25,000"
    ]
  },
  {
    id: "ahorro",
    title: "Caja de Ahorro Rendimiento Plus",
    description: "Multiplica tu capital con tasas de interés superiores a la banca tradicional comercial.",
    category: "directo",
    limitAmount: 180000,
    rate: 11.2,
    maxMonths: 12,
    iconName: "TrendingUp",
    color: "from-emerald-600 to-green-700",
    eligibilityScore: 100,
    infoBullets: [
      "Tasa de rendimiento anualizada de hasta el 11.2%",
      "Retiros programados en períodos quincenales",
      "Aportaciones voluntarias desde $100 MXN quincenales",
      "Garantía sindical total sobre tu saldo acumulado"
    ]
  },
  {
    id: "adelanto",
    title: "Adelanto de Nómina Activo",
    description: "Dispones del hasta el 50% de tu quincena de manera anticipada sin comisiones ocultas.",
    category: "directo",
    limitAmount: 8500,
    rate: 0,
    maxMonths: 1,
    iconName: "Zap",
    color: "from-amber-500 to-orange-600",
    eligibilityScore: 85,
    infoBullets: [
      "0% de interés, cobro único por gestión de $50 MXN (fijo)",
      "Depósito directo quincenal en tu cuenta registrada",
      "Solicitud online express, sin papeleo",
      "Límite renovable de forma quincenal"
    ]
  },
  {
    id: "terreno",
    title: "Crédito Terreno Patrimonial SUTI",
    description: "Adquiere solares habitacionales con urbanización completa bajo plan especial de facilidades.",
    category: "vivienda",
    limitAmount: 320000,
    rate: 6.2,
    maxMonths: 72,
    iconName: "Map",
    color: "from-teal-600 to-emerald-700",
    eligibilityScore: 78,
    infoBullets: [
      "Terrenos con servicios (agua, luz, pavimentación)",
      "Financiamiento sindical de hasta el 90% del valor total",
      "Mensualidades congeladas con aportaciones directas",
      "Ceremonia anual de entrega de títulos notariales"
    ]
  },
  {
    id: "auto",
    title: "Financiamiento Automotriz SUTI-Vite",
    description: "Programa de adquisición para vehículos compactos seminuevos garantizados.",
    category: "vivienda",
    limitAmount: 250000,
    rate: 9.8,
    maxMonths: 48,
    iconName: "Car",
    color: "from-indigo-600 to-blue-700",
    eligibilityScore: 65,
    infoBullets: [
      "Vehículos revisados por peritos certificados del sindicato",
      "Enganche flexible desde el 15% del valor comercial",
      "Incluye seguro automotriz con cobertura amplia financiado",
      "Plazo extendido hasta 48 meses con tasa fija preferencial"
    ]
  },
  {
    id: "paneles",
    title: "EcoEnergía Paneles Solares",
    description: "Disminución radical en tarifas de CFE. Financiamiento de equipamiento solar inteligente.",
    category: "vivienda",
    limitAmount: 65000,
    rate: 4.5,
    maxMonths: 36,
    iconName: "Sun",
    color: "from-yellow-500 to-amber-600",
    eligibilityScore: 82,
    infoBullets: [
      "Ahorro de hasta el 95% en recibo bimestral de luz",
      "Instalación profesional certificada con póliza de 5 años",
      "Subsidio sindical de la tasa regular bancaria",
      "Trámite de interconexión con CFE gestionado por el sindicato"
    ]
  },
  {
    id: "tour",
    title: "Fondo de Viajes y Recreación Turística",
    description: "Paquetes vacacionales todo incluido nacionales con financiamiento deducible en 12 quincenas.",
    category: "social",
    limitAmount: 35000,
    rate: 5.0,
    maxMonths: 12,
    iconName: "Compass",
    color: "from-sky-500 to-indigo-600",
    eligibilityScore: 90,
    infoBullets: [
      "Destinos nacionales premium (Cancún, Mazatlán, Vallarta)",
      "Vuelos, hotelería buffet e impuestos incluidos",
      "Sin intereses moratorios en caso de incapacidad laboral",
      "Aplica para el núcleo familiar directo del agremiado"
    ]
  },
  {
    id: "farmacia",
    title: "Vales de Farmacia y Medicamentos",
    description: "Accede quincenalmente a medicamentos de patente en farmacias aliadas a precio preferencial.",
    category: "salud-bienestar",
    limitAmount: 6000,
    rate: 0,
    maxMonths: 4,
    iconName: "ShieldAlert",
    color: "from-cyan-600 to-teal-700",
    eligibilityScore: 100,
    infoBullets: [
      "Descuento automático recurrente del 25% en medicamentos",
      "Surtido inmediato a través de código QR en ventanilla",
      "Se descuenta diferido a 4 quincenas sin tasa de interés",
      "Válido en la red farmacéutica estatal autorizada"
    ]
  },
  {
    id: "cirugia",
    title: "Apoyo para Cirugías Estéticas y Dental Especializado",
    description: "Financiamiento de copagos médicos y tratamientos no contemplados por ISSSTESON regular.",
    category: "salud-bienestar",
    limitAmount: 95000,
    rate: 7.0,
    maxMonths: 36,
    iconName: "HeartPulse",
    color: "from-pink-600 to-rose-700",
    eligibilityScore: 75,
    infoBullets: [
      "Tratamientos oftalmológicos, ortodoncia avanzada y cirugías",
      "Clínicas con convenios de prestigio y certificación médica",
      "Pago directo a la cuenta del prestador del servicio",
      "A tasa sindical protegida para evitar usura bancaria"
    ]
  },
  {
    id: "membresia",
    title: "Club Deportivo & Fitness SUTI",
    description: "Suscripción preferencial a complejos deportivos y de bienestar familiar afiliados.",
    category: "salud-bienestar",
    limitAmount: 4800,
    rate: 0,
    maxMonths: 6,
    iconName: "Dumbbell",
    color: "from-purple-600 to-indigo-700",
    eligibilityScore: 95,
    infoBullets: [
      "Gimnasio de pesas, disciplinas aeróbicas y pistas polideportivas",
      "Acceso ilimitado quincenal deduciendo costo mínimo",
      "Clases gratuitas para hijos de afiliados menores de 12 años",
      "Evaluación fitomédica sin cargo adicional"
    ]
  },
  {
    id: "hogar",
    title: "Línea Blanca y Enseres para el Hogar",
    description: "Adopta tecnología de vanguardia y electrodomésticos eficientes con crédito directo.",
    category: "comercial",
    limitAmount: 38000,
    rate: 8.0,
    maxMonths: 18,
    iconName: "Tv",
    color: "from-blue-600 to-cyan-700",
    eligibilityScore: 80,
    infoBullets: [
      "Refrigeración inverter, estufas ecológicas, lavadoras inteligentes",
      "Entrega a domicilio sin cargo adicional en todo Sonora",
      "Garantía extendida por 2 años avalada por el sindicato",
      "Sin enganche o pie de casa para afiliados activos"
    ]
  },
  {
    id: "rifa",
    title: "Gran Sorteo Anual SUTISSSTESON",
    description: "Participa con boletos de nómina en rifas de automóviles, electrodomésticos y bonos en efectivo.",
    category: "social",
    limitAmount: 1500,
    rate: 0,
    maxMonths: 3,
    iconName: "Gift",
    color: "from-fuchsia-600 to-pink-700",
    eligibilityScore: 100,
    infoBullets: [
      "Costo de boleto financiado en cómodas microcuotas de $50",
      "Sorteo certificado ante notario público estatal",
      "Premios mayores libres de impuestos federales",
      "Fondo recaudado íntegramente destinado al Seguro Escolar"
    ]
  }
];

export const INITIAL_TRANSACTIONS_MOCK: ApplicationTx[] = [
  {
    id: "TX-33049",
    type: "prestamo",
    title: "Crédito de Emergencia SUTI",
    amount: 18000,
    date: "2026-05-18",
    status: "disbursed",
    progress: 100,
    notes: "Crédito otorgado con éxito y depositado en nómina Banorte quincena 10."
  },
  {
    id: "TX-34012",
    type: "ahorro",
    title: "Caja de Ahorro Rendimiento Plus",
    amount: 12500,
    date: "2026-05-24",
    status: "active",
    progress: 100,
    notes: "Tasa del 11.2% anual quincenalizada activa en tu balance general."
  },
  {
    id: "TX-35118",
    type: "paneles",
    title: "EcoEnergía Paneles Solares",
    amount: 48000,
    date: "2026-05-28",
    status: "review",
    progress: 35,
    notes: "Documentación enviada al Comité Técnico. En espera de análisis físico de recibo CFE."
  },
  {
    id: "TX-32941",
    type: "cirugia",
    title: "Apoyo para Cirugías Estéticas y Dental",
    amount: 32000,
    date: "2026-04-12",
    status: "missing_docs",
    progress: 60,
    notes: "Falta Talón de Pago #2 vigente para finalizar validación de capacidad de descuento."
  }
];

export const BUSINESS_AGREEMENTS_MOCK: BusinessAgreement[] = [
  {
    id: "CONV-01",
    businessName: "Ópticas Devlyn Sonora",
    category: "salud",
    discountText: "35% OFF + Examen Gratis",
    description: "Descuento en armazones, micas de policarbonato graduadas y lentes solares a todo el núcleo familiar directo.",
    logo: "👓",
    isLimitedTime: true,
    couponCode: "DEVLYNSUTI35",
    stars: 5
  },
  {
    id: "CONV-02",
    businessName: "Gimnasios Metro Fitness",
    category: "salud",
    discountText: "Mensualidad de $350 MXN",
    description: "Tarifa preferencial sindicalizada sin cobro de inscripción. Acceso total a cardio, pesas y albercas climatizadas.",
    logo: "💪",
    isLimitedTime: false,
    couponCode: "METROSUTI01",
    stars: 4
  },
  {
    id: "CONV-03",
    businessName: "Hoteles Playas de San Carlos",
    category: "entretenimiento",
    discountText: "25% Fin de Semana",
    description: "Descuento directo en reservaciones de fin de semana en habitaciones sencillas, dobles y condominios familiares.",
    logo: "🌴",
    isLimitedTime: true,
    couponCode: "SANCARLOSSUTI",
    stars: 5
  },
  {
    id: "CONV-04",
    businessName: "Universidad de Sonora (Diplomados)",
    category: "educacion",
    discountText: "40% de Beca Directa",
    description: "Descuento quincenal vía nómina para diplomados, maestrías y certificaciones ejecutivas para el trabajador.",
    logo: "🎓",
    isLimitedTime: false,
    couponCode: "UNISONSUTI40",
    stars: 5
  },
  {
    id: "CONV-05",
    businessName: "Supermercados Ley (Hermosillo)",
    category: "compras",
    discountText: "8% Cashback Electrónico",
    description: "Acumula bonificaciones directas en tu monedero inteligente SUTI de toda tu despensa básica quincenal.",
    logo: "🛒",
    isLimitedTime: false,
    couponCode: "LEYCOOPSUTI",
    stars: 4
  },
  {
    id: "CONV-06",
    businessName: "Farmacias Kino Especialidades",
    category: "salud",
    discountText: "20% en Medicinas Crónicas",
    description: "Beneficio directo de ventanilla para medicamentos para hipertensión, diabetes e inmuno-asistidas.",
    logo: "💊",
    isLimitedTime: false,
    couponCode: "KINOSUTI20",
    stars: 5
  }
];

export const NEWS_FEED_MOCK: NewsFeed[] = [
  {
    id: "NEWS-001",
    title: "Exitosa Asamblea General de Delegados 2026",
    date: "Hoy, 10:30 AM",
    summary: "Se aprueba incremento en el fondo mutualista para créditos del hogar y se extiende el convenio con farmacias locales.",
    category: "asamblea",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "NEWS-002",
    title: "Nueva Convocatoria Becas Escolares para Hijos",
    date: "Ayer, 4:15 PM",
    summary: "Ya se encuentra abierto el portal de registro para el ciclo escolar 2026-2027. Revisa los requisitos de promedio mínimo de 8.5.",
    category: "logro",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "NEWS-003",
    title: "Inauguración de la Plaza Deportiva SUTISSSTESON",
    date: "Hace 3 días",
    summary: "Hermosillo cuenta con un nuevo espacio de esparcimiento para toda la familia sindicalizada. Canchas y alberca techada.",
    category: "evento",
    image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=400&auto=format&fit=crop"
  }
];
