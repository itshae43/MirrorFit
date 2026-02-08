import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-white flex flex-col justify-center px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-brand-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 text-center space-y-8">
        <div className="space-y-2">
            <div className="inline-flex items-center justify-center p-3 bg-white rounded-2xl shadow-lg mb-4">
                <i className="fa-solid fa-shirt text-brand-600 text-3xl"></i>
            </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Mirror<span className="text-brand-600">Fit</span>
          </h1>
          <p className="text-gray-500 text-lg">
            Your personal AI stylist and virtual fitting room.
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-white/50 shadow-sm">
            <p className="text-sm font-semibold text-gray-600 mb-3">POWERED BY</p>
            <div className="flex justify-center items-center gap-2">
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded border border-gray-200">Gemini 3 Flash</span>
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded border border-gray-200">Pro Vision</span>
            </div>
        </div>

        <div className="space-y-4 pt-4">
          <button
            onClick={() => navigate('/onboarding/upload')}
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-brand-500/30 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Get Started
          </button>
          <p className="text-xs text-gray-400">
            By continuing, you agree to our Terms & Privacy Policy
          </p>
        </div>
      </div>
      
      {/* Demo Cards */}
      <div className="mt-12 flex gap-4 overflow-x-auto no-scrollbar pb-4 opacity-70 pointer-events-none select-none">
         <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&h=300&fit=crop" className="rounded-lg shadow-md w-32 h-48 object-cover" alt="Fashion 1" />
         <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=200&h=300&fit=crop" className="rounded-lg shadow-md w-32 h-48 object-cover" alt="Fashion 2" />
         <img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=200&h=300&fit=crop" className="rounded-lg shadow-md w-32 h-48 object-cover" alt="Fashion 3" />
      </div>
    </div>
  );
};