import React from 'react';
import { useAppStore } from '../../App';

export const Wardrobe: React.FC = () => {
  const { wardrobe } = useAppStore();

  return (
    <div className="p-6">
       <div className="flex justify-between items-end mb-6">
           <h2 className="text-2xl font-bold text-gray-900">My Wardrobe</h2>
           <button className="bg-gray-900 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
                <i className="fa-solid fa-plus"></i>
           </button>
       </div>

       {/* Tabs */}
       <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar">
           {['All', 'Tops', 'Bottoms', 'Dresses', 'Shoes'].map((tab, i) => (
               <button key={tab} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${i === 0 ? 'bg-brand-600 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}>
                   {tab}
               </button>
           ))}
       </div>

       {/* Grid */}
       <div className="grid grid-cols-2 gap-4">
           {wardrobe.map((item) => (
               <div key={item.id} className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
                   <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 mb-3 relative">
                       <img src={item.imageUrl} alt={item.type} className="w-full h-full object-cover" />
                       <div className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full text-xs font-bold shadow-sm">
                           <i className="fa-solid fa-tag text-brand-600"></i>
                       </div>
                   </div>
                   <h4 className="font-bold text-gray-800 text-sm">{item.type}</h4>
                   <div className="flex flex-wrap gap-1 mt-1">
                       {item.tags.map(tag => (
                           <span key={tag} className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">#{tag}</span>
                       ))}
                   </div>
               </div>
           ))}
       </div>
    </div>
  );
};
