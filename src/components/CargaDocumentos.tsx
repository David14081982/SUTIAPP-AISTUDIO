import React, { useState } from 'react';
import { UnionMember } from '../types';
import { motion } from 'motion/react';
import { 
  FileText, 
  Upload, 
  Check, 
  ShieldAlert, 
  Lock, 
  Activity, 
  Clock, 
  Info,
  Eye,
  AlertCircle
} from 'lucide-react';

interface Props {
  member: UnionMember;
  onUpdateDocuments: (updatedDocs: UnionMember['documents']) => void;
}

export const CargaDocumentos: React.FC<Props> = ({ member, onUpdateDocuments }) => {
  const [activeUpload, setActiveUpload] = useState<'ine' | 'talon1' | 'talon2' | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleSimulateSelect = (type: 'ine' | 'talon1' | 'talon2') => {
    setActiveUpload(type);
    setUploading(true);
    
    // Simulate upload progress
    setTimeout(() => {
      const nextDocs = { ...member.documents };
      nextDocs[type] = 'uploaded';
      onUpdateDocuments(nextDocs);
      setUploading(false);
      setActiveUpload(null);
    }, 1800);
  };

  const currentTalonStatus = (status: 'pending' | 'uploaded' | 'rejected' | 'none') => {
    switch(status) {
      case 'uploaded':
        return {
          label: 'Verificado',
          color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
          icon: <Check className="h-4 w-4" />
        };
      case 'pending':
        return {
          label: 'Falta Cargar',
          color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
          icon: <Clock className="h-4 w-4" />
        };
      case 'rejected':
        return {
          label: 'Rechazado (No legible)',
          color: 'bg-rose-500/10 text-rose-550 border-rose-500/20',
          icon: <ShieldAlert className="h-4 w-4" />
        };
      default:
        return {
          label: 'No Requerido',
          color: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border-zinc-200/40',
          icon: <Info className="h-4 w-4" />
        };
    }
  };

  return (
    <div className="flex flex-col gap-5 text-left">
      {/* Privacy lock banner */}
      <div className="bg-gradient-to-r from-zinc-900 to-zinc-950 p-4 rounded-xl border border-zinc-800 text-white flex items-start gap-3">
        <div className="h-9 w-9 bg-amber-500/10 rounded-lg flex items-center justify-center border border-amber-500/20 mt-0.5">
          <Lock className="h-5 w-5 text-amber-500" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5 font-mono uppercase tracking-wider">
            Ley de Datos Personales Acreditada
          </h4>
          <p className="text-[10px] text-zinc-400 mt-1 leading-normal">
            Tus documentos se cifran bajo el protocolo SSL AES-256. El sindicato SUTISSSTESON utiliza estos archivos exclusivamente para validar solvencia nominal con la oficina de egresos gubernamental.
          </p>
        </div>
      </div>

      {/* Uploading indicator */}
      {uploading && (
        <div className="bg-rose-900/10 border border-rose-900/30 p-4 rounded-xl flex items-center gap-3">
          <Activity className="h-4 w-4 text-rose-900 animate-spin" />
          <div className="flex-1">
            <h5 className="text-xs font-bold text-rose-900 dark:text-red-400">Procesando archivo biométrico...</h5>
            <p className="text-[10px] text-zinc-500">Analizando legibilidad y validez de código OCR de agua quincenal.</p>
          </div>
          <span className="text-xs font-mono font-bold text-rose-900">78%</span>
        </div>
      )}

      {/* Interactive document files queue */}
      <div className="space-y-3">
        {/* Document 1: INE */}
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex gap-3">
            <div className="h-10 w-10 bg-rose-500/10 rounded-lg flex items-center justify-center text-rose-900 border border-rose-500/10">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Identificación Oficial INE (Frente y Vuelta)</h5>
              <p className="text-[10px] text-zinc-400 mt-0.5">Comprobante de filiación legal con fotografía. Formato PDF o JPG.</p>
              
              <div className="flex gap-2 mt-2">
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono border ${currentTalonStatus(member.documents.ine).color} flex items-center gap-1`}>
                  {currentTalonStatus(member.documents.ine).icon}
                  {currentTalonStatus(member.documents.ine).label}
                </span>
                {member.documents.ine === 'uploaded' && (
                  <span className="text-[9px] text-zinc-400 font-mono flex items-center gap-0.5 border border-zinc-200 dark:border-zinc-800 px-2 py-0.5 rounded-full bg-zinc-50 dark:bg-zinc-900">
                    <Eye className="h-3 w-3" />ine_andrea_recortes.pdf
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={() => handleSimulateSelect('ine')}
            disabled={uploading}
            className={`px-3 py-2 rounded-lg text-xs font-bold font-sans flex items-center gap-1.5 cursor-pointer ${
              member.documents.ine === 'uploaded'
                ? 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
                : 'bg-rose-900 text-white hover:bg-rose-950 shadow-md shadow-rose-900/10'
            }`}
          >
            <Upload className="h-3.5 w-3.5" />
            <span>{member.documents.ine === 'uploaded' ? 'Reemplazar' : 'Cargar Archivo'}</span>
          </button>
        </div>

        {/* Document 2: Talón 1 */}
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex gap-3">
            <div className="h-10 w-10 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-600 border border-emerald-500/10">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Talón de Pago Quincenal #1 (Vigente)</h5>
              <p className="text-[10px] text-zinc-400 mt-0.5">Comprobante de ingresos para cálculo de capacidad de descuento.</p>
              
              <div className="flex gap-2 mt-2">
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono border ${currentTalonStatus(member.documents.talon1).color} flex items-center gap-1`}>
                  {currentTalonStatus(member.documents.talon1).icon}
                  {currentTalonStatus(member.documents.talon1).label}
                </span>
                {member.documents.talon1 === 'uploaded' && (
                  <span className="text-[9px] text-zinc-400 font-mono flex items-center gap-0.5 border border-zinc-200 dark:border-zinc-800 px-2 py-0.5 rounded-full bg-zinc-50 dark:bg-zinc-900">
                    <Eye className="h-3 w-3" />talon_quincena__09.pdf
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={() => handleSimulateSelect('talon1')}
            disabled={uploading}
            className={`px-3 py-2 rounded-lg text-xs font-bold font-sans flex items-center gap-1.5 cursor-pointer ${
              member.documents.talon1 === 'uploaded'
                ? 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200:bg-zinc-200'
                : 'bg-rose-900 text-white hover:bg-rose-950 shadow-md shadow-rose-900/10'
            }`}
          >
            <Upload className="h-3.5 w-3.5" />
            <span>{member.documents.talon1 === 'uploaded' ? 'Reemplazar' : 'Cargar Archivo'}</span>
          </button>
        </div>

        {/* Document 3: Talón 2 */}
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex gap-3">
            <div className="h-10 w-10 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-500 border border-amber-500/10">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Talón de Pago Quincenal #2 (Opcional)</h5>
              <p className="text-[10px] text-zinc-400 mt-0.5">Opcional para acreditar solvencia extra y maximizar el score financiero.</p>
              
              <div className="flex gap-2 mt-2">
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono border ${currentTalonStatus(member.documents.talon2).color} flex items-center gap-1`}>
                  {currentTalonStatus(member.documents.talon2).icon}
                  {currentTalonStatus(member.documents.talon2).label}
                </span>
                {member.documents.talon2 === 'uploaded' && (
                  <span className="text-[9px] text-zinc-400 font-mono flex items-center gap-0.5 border border-zinc-200 dark:border-zinc-800 px-2 py-0.5 rounded-full bg-zinc-50 dark:bg-zinc-900">
                    <Eye className="h-3 w-3" />talon_quincena_08.pdf
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={() => handleSimulateSelect('talon2')}
            disabled={uploading}
            className={`px-3 py-2 rounded-lg text-xs font-bold font-sans flex items-center gap-1.5 cursor-pointer ${
              member.documents.talon2 === 'uploaded'
                ? 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
                : 'bg-rose-900 text-white hover:bg-rose-950 shadow-md shadow-rose-900/10'
            }`}
          >
            <Upload className="h-3.5 w-3.5" />
            <span>{member.documents.talon2 === 'uploaded' ? 'Reemplazar' : 'Cargar Archivo'}</span>
          </button>
        </div>
      </div>

      {/* Helpful alert tips */}
      <div className="bg-rose-50/50 dark:bg-zinc-900/60 p-4 rounded-xl border border-rose-500/10 text-xs flex gap-2">
        <AlertCircle className="h-4 w-4 text-rose-900 dark:text-red-400 flex-shrink-0 mt-0.5" />
        <div>
          <h6 className="font-bold text-rose-900 dark:text-red-400">¿Por qué es necesario el talón?</h6>
          <p className="text-zinc-500 dark:text-zinc-400 mt-0.5 font-medium">
            El descuento automático a través del talón oficial de ISSSTESON garantiza las mejores tasas de interés de Sonora, ya que reduce a cero el riesgo de morosidad institucional.
          </p>
        </div>
      </div>
    </div>
  );
};
