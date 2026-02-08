import React from 'react';
import { useAppStore } from '../../App';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { user } = useAppStore();
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-2xl font-bold text-gray-900">Hello, {user?.name || 'Guest'}! 👋</h1>
            <p className="text-sm text-gray-500">Sunny, 24°C in New York</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-brand-100 overflow-hidden border-2 border-brand-500">
            {user?.photoBase64 ? (
                <img src={user.photoBase64} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-brand-500">?</div>
            )}
        </div>
      </div>

      {/* OOTD Card - Gemini Generated */}
      <div className="relative overflow-hidden bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-6 text-white shadow-xl">
        <div className="absolute top-0 right-0 p-4 opacity-10">
            <i className="fa-solid fa-wand-magic-sparkles text-6xl"></i>
        </div>
        <div className="relative z-10">
            <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium mb-4 border border-white/20">
                ✨ Gemini Suggestion
            </span>
            <h2 className="text-xl font-bold mb-2">Outfit of the Day</h2>
            <p className="text-gray-300 text-sm mb-6 max-w-[80%]">
                Based on your casual style and today's weather, try the white linen shirt with denim jeans.
            </p>
            <button 
                onClick={() => navigate('/try-on')}
                className="bg-white text-gray-900 px-5 py-2 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors"
            >
                Visualize This Look
            </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button onClick={() => navigate('/try-on')} className="bg-brand-50 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-brand-100 transition-colors">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-600 shadow-sm">
                <i className="fa-solid fa-shirt"></i>
            </div>
            <span className="font-semibold text-gray-800 text-sm">New Try-On</span>
        </button>
        <button onClick={() => navigate('/stylist')} className="bg-orange-50 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-orange-100 transition-colors">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-orange-600 shadow-sm">
                <i className="fa-solid fa-comments"></i>
            </div>
            <span className="font-semibold text-gray-800 text-sm">AI Stylist</span>
        </button>
      </div>

      {/* Trending */}
      <div>
        <h3 className="font-bold text-lg mb-4">Trending for You</h3>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {[1,2,3,4].map((i) => (
                <div key={i} className="min-w-[140px] rounded-xl overflow-hidden shadow-sm relative group">
                    <img 
                        src={`https://picsum.photos/300/400?random=${i}`} 
                        alt="Trend" 
                        className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button className="bg-white/90 p-2 rounded-full text-gray-900">
                            <i className="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};
