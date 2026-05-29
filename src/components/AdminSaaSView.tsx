import React, { useState, useMemo } from 'react';
import { ApplicationTx, FinancialProgram } from '../types';
import { FINANCIAL_PROGRAMS, INITIAL_TRANSACTIONS_MOCK } from '../mockData';
import { 
  Building, 
  Search, 
  Filter, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  FileCheck, 
  Eye, 
  Check, 
  X, 
  Clock, 
  AlertTriangle,
  Send,
  Download,
  Users,
  Briefcase,
  ChevronRight,
  Database
} from 'lucide-react';

interface Props {
  transactions: ApplicationTx[];
  onUpdateTxStatus: (txId: string, newStatus: ApplicationTx['status']) => void;
}

export const AdminSaaSView: React.FC<Props> = ({ transactions, onUpdateTxStatus }) => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sectionFilter, setSectionFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTxDetail, setSelectedTxDetail] = useState<ApplicationTx | null>(null);
  
  // Custom states for financial calculations
  const totalFunded = useMemo(() => {
    return transactions
      .filter(tx => tx.status === 'disbursed' || tx.status === 'active')
      .reduce((sum, tx) => sum + tx.amount, 0);
  }, [transactions]);

  const totalInReview = useMemo(() => {
    return transactions
      .filter(tx => tx.status === 'review')
      .reduce((sum, tx) => sum + tx.amount, 0);
  }, [transactions]);

  const activeSolicitorsCount = useMemo(() => {
    return new Set(transactions.map(tx => tx.id)).size;
  }, [transactions]);

  // Sections mock
  const sectionsList = [
    { key: 'all', label: 'Todas las Secciones' },
    { key: 'Hermosillo', label: 'Hermosillo' },
    { key: 'Guaymas', label: 'Guaymas' },
    { key: 'Obregon', label: 'Ciudad Obregón' },
    { key: 'Nogales', label: 'Nogales' }
  ];

  // Map tx id to mock sections for richer table filters
  const getSectionForTx = (txId: string) => {
    const lastDigit = txId.charCodeAt(txId.length - 1);
    if (lastDigit % 3 === 0) return 'Hermosillo';
    if (lastDigit % 3 === 1) return 'Guaymas';
    return 'Nogales';
  };

  // Get status bag
  const getStatusBadge = (status: ApplicationTx['status']) => {
    switch (status) {
      case 'disbursed':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] uppercase font-mono font-bold flex items-center gap-1">
            <Check className="h-3 w-3" /> Dispersado
          </span>
        );
      case 'active':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] uppercase font-mono font-bold flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> Activo
          </span>
        );
      case 'review':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] uppercase font-mono font-bold flex items-center gap-1">
            <Clock className="h-3 w-3 animate-spin" /> En Revisión
          </span>
        );
      case 'missing_docs':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] uppercase font-mono font-bold flex items-center gap-1">
            <AlertTriangle className="h-3 w-3 animate-pulse" /> Faltan Doctos
          </span>
        );
      case 'rejected':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-500 text-[10px] uppercase font-mono font-bold flex items-center gap-1">
            <X className="h-3 w-3" /> Denegado
          </span>
        );
      default:
        return null;
    }
  };

  const filteredTxs = useMemo(() => {
    return transactions.filter(tx => {
      const matchStatus = statusFilter === 'all' || tx.status === statusFilter;
      const matchSection = sectionFilter === 'all' || getSectionForTx(tx.id) === sectionFilter;
      const matchSearch = tx.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          tx.id.toLowerCase().includes(searchTerm.toLowerCase());
      return matchStatus && matchSection && matchSearch;
    });
  }, [transactions, statusFilter, sectionFilter, searchTerm]);

  return (
    <div className="flex flex-col gap-6 text-left">
      {/* Admin Title Block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200/55 dark:border-zinc-900 pb-4">
        <div>
          <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight flex items-center gap-2">
            <Building className="h-5.5 w-5.5 text-rose-900" />
            Control de Finanzas y Auxilio Social SUTI
          </h2>
          <p className="text-xs text-zinc-500 mt-1">
            Consola administrativa federada estatal para otorgamiento de créditos, caja de ahorro y convenios comerciales de la sección general SUTISSSTESON.
          </p>
        </div>

        {/* Database statistics button */}
        <div className="flex gap-2">
          <button className="px-3.5 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-900 font-mono text-[10.5px] font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 shadow-sm">
            <Database className="h-3.5 w-3.5 text-rose-900" /> API: Conectado
          </button>
          <button className="px-3.5 py-2 rounded-xl bg-rose-900 text-white font-mono text-[10.5px] font-bold flex items-center gap-1.5 shadow-sm">
            <Download className="h-3.5 w-3.5" /> Exportar Balances
          </button>
        </div>
      </div>

      {/* KPI METRIC CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-white dark:bg-zinc-950 border border-zinc-250/30 dark:border-zinc-900 p-4.5 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider block">Cartera Total Financiada</span>
              <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-100 mt-1 font-mono">
                ${(totalFunded + 1850000).toLocaleString('es-MX')}
              </h3>
            </div>
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
              <DollarSign className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <div className="mt-3 text-[10px] font-mono text-emerald-600 flex items-center gap-1">
            <TrendingUp className="h-3.5 w-3.5" /> +14.2% del fondo quincenal previo
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white dark:bg-zinc-950 border border-zinc-250/30 dark:border-zinc-900 p-4.5 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider block">Monto Solicitudes Pendientes</span>
              <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-100 mt-1 font-mono">
                ${totalInReview.toLocaleString('es-MX')}
              </h3>
            </div>
            <div className="h-8 w-8 rounded-lg bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
              <Clock className="h-4.5 w-4.5 text-amber-500" />
            </div>
          </div>
          <div className="mt-3 text-[10px] font-mono text-amber-500 flex items-center gap-1">
            <Briefcase className="h-3.5 w-3.5" /> {transactions.filter(t => t.status === 'review').length} solicitudes en cola de firmas
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white dark:bg-zinc-950 border border-zinc-250/30 dark:border-zinc-900 p-4.5 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider block">Afiliados Gestionados</span>
              <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-100 mt-1 font-mono">
                12,854
              </h3>
            </div>
            <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
              <Users className="h-4.5 w-4.5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-3 text-[10px] font-mono text-zinc-400 flex items-center gap-1">
            <Check className="h-3.5 w-3.5 text-emerald-500" /> 100% cotejados biométricamente
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white dark:bg-zinc-950 border border-zinc-250/30 dark:border-zinc-900 p-4.5 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider block">Tasa de Aprobación</span>
              <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-100 mt-1 font-mono">
                94.8%
              </h3>
            </div>
            <div className="h-8 w-8 rounded-lg bg-rose-500/10 flex items-center justify-center border border-rose-500/20">
              <FileCheck className="h-4.5 w-4.5 text-rose-900 dark:text-red-400" />
            </div>
          </div>
          <div className="mt-3 text-[10px] font-mono text-emerald-600 flex items-center gap-1">
            <TrendingUp className="h-3.5 w-3.5" /> Sin mora registrada en Sonora este mes
          </div>
        </div>
      </div>

      {/* CUSTOM REAL-TIME SVG PORTFOLIO CHART */}
      <div className="bg-white dark:bg-zinc-950 border border-zinc-200/55 dark:border-zinc-900 p-5 rounded-2xl shadow-sm">
        <h3 className="font-bold text-xs uppercase text-zinc-400 tracking-wider mb-4 flex items-center gap-1.5 font-mono">
          <TrendingUp className="h-4 w-4 text-rose-900" /> Comportamiento de Solicitudes y Egresos (Préstamos vs Fondos)
        </h3>

        {/* Dynamic SVG chart wrapper */}
        <div className="w-full h-44 relative bg-zinc-50 dark:bg-zinc-900/50 rounded-xl p-2 border border-zinc-100 dark:border-zinc-900">
          <svg className="w-full h-full" viewBox="0 0 800 160" preserveAspectRatio="none">
            {/* Grid background lines */}
            <line x1="0" y1="20" x2="800" y2="20" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" className="dark:stroke-zinc-800" />
            <line x1="0" y1="60" x2="800" y2="60" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" className="dark:stroke-zinc-800" />
            <line x1="0" y1="100" x2="800" y2="100" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" className="dark:stroke-zinc-800" />
            <line x1="0" y1="140" x2="800" y2="140" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" className="dark:stroke-zinc-800" />

            {/* Filled Area Grad */}
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9f1239" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#9f1239" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Chart Area Curve */}
            <path
              d="M 10,130 C 100,110 150,90 200,105 C 300,120 380,50 450,70 C 550,90 650,20 800,40 L 800,150 L 10,150 Z"
              fill="url(#areaGrad)"
            />

            {/* Area Outline */}
            <path
              d="M 10,130 C 100,110 150,90 200,105 C 300,120 380,50 450,70 C 550,90 650,20 800,40"
              fill="none"
              stroke="#9f1239"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Dots over points */}
            <circle cx="200" cy="105" r="4" fill="#9f1239" stroke="#fff" strokeWidth="1.5" />
            <circle cx="450" cy="70" r="4" fill="#9f1239" stroke="#fff" strokeWidth="1.5" />
            <circle cx="800" cy="40" r="4" fill="#9f1239" stroke="#fff" strokeWidth="1.5" />
          </svg>

          {/* Month markers */}
          <div className="absolute bottom-1 left-0 w-full flex justify-between px-3 text-[9px] font-mono text-zinc-400">
            <span>Quicena 06</span>
            <span>Quicena 07</span>
            <span>Quicena 08</span>
            <span>Quicena 09</span>
            <span>Quicena 10 (Actual)</span>
          </div>
        </div>
      </div>

      {/* FILTER CONTROLS BAR */}
      <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-850 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search tool */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filtrar folio quincenal o nombre de programa..."
            className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2 pl-9 pr-3 text-xs text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-rose-900"
          />
        </div>

        {/* Filter drop boxes */}
        <div className="flex gap-2 flex-wrap text-xs font-semibold">
          {/* Section filter */}
          <div className="flex items-center gap-1.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 px-2.5 py-1.5 rounded-lg text-zinc-650 dark:text-zinc-300">
            <Building className="h-3.5 w-3.5 text-zinc-400" />
            <select
              value={sectionFilter}
              onChange={(e) => setSectionFilter(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer text-xs"
            >
              <option value="all">Todas las Secciones</option>
              <option value="Hermosillo">Hermosillo</option>
              <option value="Guaymas">Guaymas</option>
              <option value="Nogales">Nogales</option>
            </select>
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-1.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 px-2.5 py-1.5 rounded-lg text-zinc-650 dark:text-zinc-300">
            <Filter className="h-3.5 w-3.5 text-zinc-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer text-xs"
            >
              <option value="all">Todos los Estados</option>
              <option value="review">En Revisión</option>
              <option value="disbursed">Dispersado</option>
              <option value="active">Activo</option>
              <option value="missing_docs">Faltan Doctos</option>
              <option value="rejected">Denegado</option>
            </select>
          </div>
        </div>
      </div>

      {/* DETAILED LEDGER TABLE */}
      <div className="bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-900 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] border-collapse text-left">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-900/60 border-b border-zinc-200/50 dark:border-zinc-900 text-zinc-400 text-[10.5px] font-mono uppercase tracking-wider">
                <th className="py-3 px-4 font-bold">Folio TX</th>
                <th className="py-3 px-4 font-bold">Programa Solicitado</th>
                <th className="py-3 px-4 font-bold">Monto</th>
                <th className="py-3 px-4 font-bold">Sección Sindical</th>
                <th className="py-3 px-4 font-bold">Fecha Envío</th>
                <th className="py-3 px-4 font-bold">Estado</th>
                <th className="py-3 px-4 font-bold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200/40 dark:divide-zinc-900/80 text-xs">
              {filteredTxs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-zinc-400 font-sans font-medium">
                    No hay solicitudes registradas que cumplan con los filtros de nómina actuales.
                  </td>
                </tr>
              ) : (
                filteredTxs.map((tx) => (
                  <tr 
                    key={tx.id} 
                    className={`hover:bg-zinc-50/50 dark:hover:bg-zinc-900/40 transition-colors ${
                      selectedTxDetail?.id === tx.id ? 'bg-zinc-50/70 dark:bg-zinc-900/70 font-semibold' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4 font-mono font-medium text-rose-950 dark:text-rose-400">{tx.id}</td>
                    <td className="py-3.5 px-4">
                      <div>
                        <span className="font-bold text-zinc-850 dark:text-zinc-200">{tx.title}</span>
                        {tx.months && (
                          <span className="block text-[9.5px] text-zinc-400">{tx.months} meses planeados</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-zinc-800 dark:text-zinc-100">${tx.amount.toLocaleString('es-MX')}</td>
                    <td className="py-3.5 px-4 text-zinc-500 font-sans font-medium">{getSectionForTx(tx.id)}</td>
                    <td className="py-3.5 px-4 text-zinc-400 font-medium font-mono">{tx.date}</td>
                    <td className="py-3.5 px-4">{getStatusBadge(tx.status)}</td>
                    <td className="py-3.5 px-4 text-right">
                      <button 
                        onClick={() => setSelectedTxDetail(selectedTxDetail?.id === tx.id ? null : tx)}
                        className="p-1 px-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 hover:bg-zinc-250 hover:text-rose-950 text-zinc-650 dark:text-zinc-300 font-bold font-sans transition-all inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="h-3.5 w-3.5" /> Evaluar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DRILL-DOWN EVALUATION PANEL */}
      {selectedTxDetail && (
        <div className="bg-gradient-to-tr from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-950 border border-zinc-200 dark:border-zinc-850 rounded-2xl p-5 shadow-xl">
          <div className="flex justify-between items-start mb-4 border-b border-zinc-250/30 dark:border-zinc-900 pb-3">
            <div>
              <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-900 dark:text-red-400 text-[9px] font-mono tracking-wider font-bold uppercase">
                Análisis de Comité Evaluador Estatal
              </span>
              <h4 className="text-sm font-black text-zinc-850 dark:text-zinc-100 mt-1">
                Evaluando Solicitud {selectedTxDetail.id} — {selectedTxDetail.title}
              </h4>
            </div>
            <button 
              onClick={() => setSelectedTxDetail(null)}
              className="p-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 text-zinc-400 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Applicant details */}
            <div className="space-y-2">
              <h5 className="font-bold text-zinc-400 uppercase tracking-wider text-[10px] font-mono">Información del Afiliado</h5>
              <div className="bg-white dark:bg-zinc-900/50 p-3.5 rounded-xl border border-zinc-150 border-zinc-200/40 space-y-2">
                <div>
                  <span className="text-zinc-400 block font-sans">Afiliado Certificado:</span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-100 text-xs">Lic. Andrea González Espinoza</span>
                </div>
                <div>
                  <span className="text-zinc-400 block font-sans">Sección Sindical:</span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-100 text-[11px]">{getSectionForTx(selectedTxDetail.id)}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block font-sans">Antigüedad en Sindicato:</span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-105">6 años y 7 meses (Elegible)</span>
                </div>
              </div>
            </div>

            {/* Document Check audit */}
            <div className="space-y-2">
              <h5 className="font-bold text-zinc-400 uppercase tracking-wider text-[10px] font-mono">Expediente Digital SUTI-Vault</h5>
              <div className="bg-white dark:bg-zinc-900/50 p-3.5 rounded-xl border border-zinc-150 border-zinc-200/40 space-y-2">
                <div className="flex justify-between items-center text-[10.5px]">
                  <span className="text-zinc-500 font-sans">1. INE Identificación:</span>
                  <span className="font-mono font-bold text-emerald-600 flex items-center gap-0.5"><Check className="h-3 w-3" /> VERIFICADO</span>
                </div>
                <div className="flex justify-between items-center text-[10.5px]">
                  <span className="text-zinc-500 font-sans">2. Talón Egresos #1:</span>
                  <span className="font-mono font-bold text-emerald-600 flex items-center gap-0.5"><Check className="h-3 w-3" /> VERIFICADO</span>
                </div>
                <div className="flex justify-between items-center text-[10.5px]">
                  <span className="text-zinc-500 font-sans">3. Talón Egresos #2:</span>
                  <span className={selectedTxDetail.status === 'missing_docs' ? 'font-mono font-bold text-rose-500 flex items-center gap-0.5 animate-pulse' : 'font-mono font-bold text-emerald-600 flex items-center gap-0.5'}><AlertTriangle className="h-3 w-3" /> {selectedTxDetail.status === 'missing_docs' ? 'FALTANTE' : 'VERIFICADO'}</span>
                </div>
              </div>
            </div>

            {/* Decision panel actions */}
            <div className="space-y-2">
              <h5 className="font-bold text-zinc-400 uppercase tracking-wider text-[10px] font-mono">Acciones de Junta Directiva</h5>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      onUpdateTxStatus(selectedTxDetail.id, 'disbursed');
                      setSelectedTxDetail(prev => prev ? { ...prev, status: 'disbursed' } : null);
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-emerald-600/10"
                  >
                    <Check className="h-4 w-4" /> Aprobar y Dispersar
                  </button>
                  <button 
                    onClick={() => {
                      onUpdateTxStatus(selectedTxDetail.id, 'rejected');
                      setSelectedTxDetail(prev => prev ? { ...prev, status: 'rejected' } : null);
                    }}
                    className="p-2.5 rounded-xl bg-zinc-200 dark:bg-zinc-800 hover:bg-rose-500 hover:text-white text-zinc-650 transition-colors cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                
                <button 
                  onClick={() => {
                    onUpdateTxStatus(selectedTxDetail.id, 'missing_docs');
                    setSelectedTxDetail(prev => prev ? { ...prev, status: 'missing_docs' } : null);
                  }}
                  className="w-full py-2 bg-amber-500 text-white font-bold hover:bg-amber-600 rounded-xl transition-colors text-xs flex items-center justify-center gap-1 cursor-pointer"
                >
                  <AlertTriangle className="h-4.5 w-4.5" /> Reclamar Validación de Talón
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3.5 border-t border-zinc-200/50 dark:border-zinc-900 text-[10px] text-zinc-400 bg-zinc-100/50 dark:bg-zinc-900/30 p-2.5 rounded-lg flex items-center gap-1.5 font-mono">
            <Send className="h-3.5 w-3.5 text-zinc-400" />
            <span>Nota Ejecutiva: &quot;{selectedTxDetail.notes}&quot;</span>
          </div>
        </div>
      )}
    </div>
  );
};
