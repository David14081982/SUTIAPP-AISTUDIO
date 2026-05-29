import React, { useState, useMemo } from 'react';
import { BusinessAgreement } from '../types';
import { BUSINESS_AGREEMENTS_MOCK } from '../mockData';
import { motion } from 'motion/react';
import { 
  Search, 
  MapPin, 
  Sparkles, 
  Copy, 
  Check, 
  Heart, 
  Star, 
  Tag, 
  Filter,
  ExternalLink 
} from 'lucide-react';

export const ConveniosMarketplace: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Categories translation table
  const categoriesList = [
    { key: 'all', label: 'Todos' },
    { key: 'salid', label: 'Salud', actual: 'salud' },
    { key: 'compras', label: 'Compras', actual: 'compras' },
    { key: 'entretenimiento', label: 'Turismo', actual: 'entretenimiento' },
    { key: 'educacion', label: 'Educación', actual: 'educacion' },
  ];

  const handleCopyCoupon = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleToggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const filteredAgreements = useMemo(() => {
    return BUSINESS_AGREEMENTS_MOCK.filter((item) => {
      const matchSearch = item.businessName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.couponCode.toLowerCase().includes(searchTerm.toLowerCase());
      
      const realCategoryObj = categoriesList.find(c => c.key === selectedCategory);
      const matchCategory = selectedCategory === 'all' || (realCategoryObj && item.category === realCategoryObj.actual);

      return matchSearch && matchCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="flex flex-col gap-4 text-left">
      {/* Search and Category Quick Filters */}
      <div className="space-y-3">
        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar comercios, marcas o códigos..."
            className="w-full bg-zinc-100 dark:bg-zinc-900 focus:bg-white dark:focus:bg-zinc-950 border border-transparent focus:border-zinc-200 dark:focus:border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-rose-900 transition-all font-sans"
          />
        </div>

        {/* Categories Bar */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4">
          {categoriesList.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-1.5 rounded-full text-xs font-extrabold flex-shrink-0 transition-all ${
                selectedCategory === cat.key
                  ? 'bg-gradient-to-r from-[#ff2a54] to-[#ff4d3b] text-white shadow-sm shadow-red-500/10'
                  : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Promo Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAgreements.length === 0 ? (
          <div className="col-span-full py-12 text-center flex flex-col items-center justify-center gap-2">
            <Tag className="h-8 w-8 text-zinc-300 animate-bounce" />
            <p className="text-zinc-500 font-sans text-xs">No se encontraron beneficios que cumplan con los filtros.</p>
          </div>
        ) : (
          filteredAgreements.map((item) => {
            const isFav = favorites.includes(item.id);
            const isCopied = copiedId === item.id;
            
            return (
              <motion.div
                layout
                key={item.id}
                className="bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800/80 rounded-2xl p-4 flex flex-col justify-between shadow-md hover:shadow-lg hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 relative overflow-hidden"
              >
                {/* Promo Corner Ribbon */}
                {item.isLimitedTime && (
                  <div className="absolute top-0 right-0 bg-red-650 text-white px-2.5 py-0.5 rounded-bl-xl text-[8px] font-mono tracking-widest font-bold uppercase flex items-center gap-1">
                    <Sparkles className="h-2 w-2 animate-pulse" /> Exprira Pronto
                  </div>
                )}

                {/* Card Top section */}
                <div>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      {/* Logo avatar */}
                      <div className="h-10 w-10 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/40 rounded-xl flex items-center justify-center text-xl">
                        {item.logo}
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                          {item.businessName}
                        </h4>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-800 dark:text-red-400 text-[8.5px] font-mono font-bold border border-rose-500/10">
                            {item.discountText}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Favorite Button */}
                    <button
                      onClick={() => handleToggleFavorite(item.id)}
                      className={`p-1.5 rounded-full border transition-colors ${
                        isFav 
                          ? 'bg-rose-50 dark:bg-rose-950/20 text-rose-700 border-rose-200' 
                          : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-400 hover:text-rose-500 border-zinc-200/40 dark:border-zinc-800'
                      }`}
                    >
                      <Heart className={`h-4.5 w-4.5 ${isFav ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Description */}
                  <p className="text-zinc-500 text-[10.5px] mt-3 leading-relaxed font-sans font-medium">
                    {item.description}
                  </p>
                </div>

                {/* Promo Rating and Footer action */}
                <div className="mt-4 pt-3.5 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between gap-3">
                  {/* Rating or location info */}
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-3 w-3 ${i < item.stars ? 'fill-current' : 'text-zinc-200 dark:text-zinc-800'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-[9px] text-zinc-500 font-mono">Hermosillo</span>
                  </div>

                  {/* Coupon Copier action */}
                  <button
                    onClick={() => handleCopyCoupon(item.id, item.couponCode)}
                    className={`px-3 py-1.5 rounded-lg text-[10.5px] font-bold font-mono tracking-wide flex items-center gap-1.5 cursor-pointer transition-all ${
                      isCopied 
                        ? 'bg-emerald-500 text-white shadow-emerald-500/10' 
                        : 'bg-zinc-900 dark:bg-zinc-850 hover:bg-black text-white'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-3 w-3" />
                        <span>¡COPIADO!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>{item.couponCode}</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Convenios extra callouts */}
      <div className="bg-gradient-to-r from-rose-950/30 to-red-950/20 p-4 rounded-xl border border-rose-900/10 flex items-center justify-between gap-4">
        <div>
          <h5 className="text-[11px] font-bold text-rose-900 dark:text-red-400 uppercase tracking-widest font-mono">¿Tienes un comercio afiliado?</h5>
          <p className="text-[10px] text-zinc-500 mt-0.5">Somete tu negocio a votación para formar parte de la Mutualidad SUTI.</p>
        </div>
        <button className="flex-shrink-0 px-3.5 py-2 bg-gradient-to-r from-[#ff2a54] to-[#ff4d3b] hover:from-[#ea1a43] hover:to-[#be123c] text-white rounded-xl text-[10px] font-extrabold tracking-wide flex items-center gap-1 cursor-pointer shadow-md shadow-red-500/15">
          <span>Registrar</span> <ExternalLink className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};
