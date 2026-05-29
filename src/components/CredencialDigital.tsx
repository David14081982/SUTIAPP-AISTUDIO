import React, { useState } from 'react';
import { UnionMember } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  QrCode, 
  ShieldCheck, 
  Copy, 
  Check, 
  RotateCw, 
  Tv, 
  CreditCard,
  Building,
  Calendar,
  Contact2
} from 'lucide-react';

interface Props {
  member: UnionMember;
}

export const CredencialDigital: React.FC<Props> = ({ member }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showRealQr, setShowRealQr] = useState(false);

  const handleCopyId = () => {
    navigator.clipboard.writeText(member.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Container 3D flipped */}
      <div className="w-full max-w-sm h-64 [perspective:1000px] cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
        <motion.div 
          className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d]"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* CARA FRONTAL - Tarjeta Roja Fintech de Alta Gama */}
          <div className="absolute w-full h-full rounded-[24px] p-6 text-white overflow-hidden shadow-2xl [backface-visibility:hidden] flex flex-col justify-between bg-gradient-to-br from-[#ff2a54] via-[#e11d48] to-[#991b1b] border-2 border-white/15 shadow-red-500/10">
            {/* Ambient Shine & Diagonal Glossy Ribbon */}
            <div className="absolute top-[-50%] left-[-20%] w-[150%] h-[50%] bg-gradient-to-r from-transparent via-white/12 to-transparent rotate-[32deg] pointer-events-none transition-transform duration-1000" />
            <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-[#ffd15c]/10 rounded-full blur-2xl pointer-events-none" />
            
            {/* Header Credencial */}
            <div className="flex justify-between items-start z-10">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 shadow-inner">
                  <Building className="h-5 w-5 text-zinc-100" />
                </div>
                <div>
                  <h3 className="font-sans font-black text-[13px] tracking-wide text-white uppercase">SUTISSSTESON</h3>
                  <p className="text-[9px] text-[#ffd15c] font-mono tracking-widest font-black">CREDENCIAL DE AFILIADO</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="px-2 py-0.5 rounded-full bg-[#ffd15c] text-rose-950 text-[9px] font-mono font-black border border-white/20">
                  ACTIVO 2026
                </span>
                <span className="text-[8px] text-white/70 mt-1 font-mono tracking-wider font-extrabold">HERMOSILLO</span>
              </div>
            </div>

            {/* Chip de Alta Fidelidad & NFC symbol */}
            <div className="flex justify-between items-center z-10 py-1">
              <div className="w-10 h-7.5 rounded-md bg-gradient-to-tr from-[#ead28d]/90 via-[#f9e0a0]/95 to-[#dfc072]/90 border border-white/20 p-1 shadow-inner relative flex items-center justify-center">
                {/* Embedded chip lines */}
                <div className="w-full h-full border border-amber-950/20 rounded-md grid grid-cols-3 grid-rows-3 opacity-90">
                  <div className="border-r border-b border-amber-950/15"></div>
                  <div className="border-r border-b border-amber-950/15"></div>
                  <div className="border-b border-amber-950/15"></div>
                  <div className="border-r border-b border-amber-950/15"></div>
                  <div className="border-r border-b border-amber-950/15"></div>
                  <div className="border-b border-amber-950/15"></div>
                  <div className="border-r border-amber-950/15"></div>
                  <div className="border-r border-amber-950/15"></div>
                  <div></div>
                </div>
              </div>
              <div className="text-[#ffd05b] font-mono text-[10px] tracking-widest flex items-center gap-1.5">
                <span className="opacity-95 font-black uppercase text-[10px] tracking-wide">SUTI Gold</span>
                <span className="text-[12px] rotate-90 inline-block animate-pulse">•)))</span>
              </div>
            </div>

            {/* Member Info */}
            <div className="flex gap-4 items-end z-10 mt-auto">
              <img 
                src={member.avatar} 
                className="w-14 h-14 rounded-xl object-cover border-2 border-white/30 bg-zinc-800 shadow-md"
                alt={member.name}
              />
              <div className="flex-1 min-w-0">
                <p className="text-[#ffd15c] text-[8.5px] font-mono uppercase tracking-wider font-black">Servidor Público</p>
                <h4 className="font-extrabold text-sm truncate text-white leading-tight">{member.name}</h4>
                <p className="text-zinc-200 text-[10px] truncate">{member.section}</p>
                
                {/* ID with Copy */}
                <div className="flex items-center gap-2 mt-1" onClick={(e) => e.stopPropagation()}>
                  <span className="text-xs font-mono text-zinc-300 font-bold">{member.id}</span>
                  <button 
                    onClick={handleCopyId}
                    className="p-1 rounded hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
                  >
                    {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* CARA TRASERA */}
          <div className="absolute w-full h-full rounded-2xl p-6 text-white overflow-hidden shadow-2xl [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-between bg-zinc-950 border border-zinc-800">
            {/* Magnetic Stripe representation */}
            <div className="absolute top-4 left-0 w-full h-8 bg-zinc-900" />
            <div className="absolute top-24 right-4 w-24 h-24 bg-white/5 rounded-full blur-2xl pointer-events-none" />

            <div className="mt-8 flex justify-between gap-4 z-10 items-center">
              <div>
                <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-mono">Validación Biométrica</span>
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs mt-1 font-mono">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Criptografía Segura</span>
                </div>
                <div className="text-[10px] text-zinc-400 mt-2">
                  <span className="block font-bold">Afiliado Desde:</span>
                  <span className="font-mono text-zinc-300">{member.membershipDate}</span>
                </div>
              </div>
              
              {/* QR Code container */}
              <div 
                className="bg-white p-2 rounded-lg relative overflow-hidden"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowRealQr(!showRealQr);
                }}
              >
                <img 
                  src={member.digitalQrUrl} 
                  alt="QR Sindical" 
                  className="w-20 h-20"
                />
                <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-white/95">
                  <QrCode className="h-5 w-5 text-rose-900" />
                </div>
              </div>
            </div>

            {/* Disclaimer & Back notes */}
            <div className="mt-auto border-t border-zinc-800 pt-2 text-[8px] text-zinc-500 leading-normal flex justify-between items-end">
              <div>
                <p>Uso intransferible para promociones y créditos SutiApp.</p>
                <p>© 2026 SUTISSSTESON Hermosillo, Sonora.</p>
              </div>
              <div className="flex items-center gap-1 font-mono text-zinc-400">
                <RotateCw className="h-2.5 w-2.5" /> GIRA
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <p className="text-xs text-zinc-500 mt-3 flex items-center gap-1.5 font-medium">
        <RotateCw className="h-3.5 w-3.5 text-zinc-400" />
        Toca la credencial para visualizar el reverso y el código QR
      </p>

      {/* NFC Scanner simulation */}
      <div className="mt-4 w-full bg-zinc-50 dark:bg-zinc-900/50 rounded-xl p-3 border border-zinc-200/50 dark:border-zinc-800/80 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
            <CreditCard className="h-4 w-4 text-orange-500" />
          </div>
          <div className="text-left">
            <h5 className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Terminales / Convenios</h5>
            <p className="text-[10px] text-zinc-500">Muestra este código o QR en caja física para recibir descuentos.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
