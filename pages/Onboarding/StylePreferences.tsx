import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../App';

export const StylePreferences: React.FC = () => {
  const navigate = useNavigate();
  const { updateUser, user } = useAppStore();
  const [styles, setStyles] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const styleOptions = [
    { id: 'casual', label: 'Casual', emoji: '👟' },
    { id: 'chic', label: 'Chic', emoji: '✨' },
    { id: 'streetwear', label: 'Street', emoji: '🧢' },
    { id: 'formal', label: 'Formal', emoji: '👔' },
    { id: 'boho', label: 'Boho', emoji: '🌿' },
    { id: 'vintage', label: 'Vintage', emoji: '📻' },
  ];

  const toggleStyle = (id: string) => {
    setStyles(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleFinish = async () => {
    setIsGenerating(true);
    // Simulate Gemini Pro Image generating the digital twin
    updateUser({ styles, name: "Fashionista" });
    
    // Simulate delay for "Generation"
    setTimeout(() => {
        setIsGenerating(false);
        navigate('/home');
    }, 2500);
  };

  if (isGenerating) {
    return (
        <div className="min-h-screen bg-brand-600 flex flex-col items-center justify-center text-white p-6 text-center">
            <div className="w-20 h-20 border-4 border-white/30 border-t-white rounded-full animate-spin mb-8"></div>
            <h2 className="text-3xl font-bold mb-4">Gemini is Thinking...</h2>
            <p className="text-brand-100 text-lg">Analyzing your photo...</p>
            <p className="text-brand-200 text-sm mt-2 opacity-75">Generating Digital Twin using Gemini Pro Image</p>
        </div>
    )
  }

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col">
       <div className="flex-1">
        <button onClick={() => navigate(-1)} className="text-gray-400 mb-6">
            <i className="fa-solid fa-arrow-left"></i> Back
        </button>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Style Profile</h2>
        <p className="text-gray-500 mb-8">Pick 3 styles you love.</p>

        <div className="grid grid-cols-2 gap-4">
            {styleOptions.map((option) => (
                <button
                    key={option.id}
                    onClick={() => toggleStyle(option.id)}
                    className={`p-6 rounded-2xl border transition-all text-center
                        ${styles.includes(option.id)
                            ? 'border-brand-500 bg-brand-50 shadow-md transform scale-[1.02]' 
                            : 'border-gray-100 bg-gray-50 hover:bg-gray-100'}`}
                >
                    <div className="text-3xl mb-2">{option.emoji}</div>
                    <div className={`font-medium ${styles.includes(option.id) ? 'text-brand-700' : 'text-gray-600'}`}>
                        {option.label}
                    </div>
                </button>
            ))}
        </div>
      </div>
      
      <button
        onClick={handleFinish}
        disabled={styles.length === 0}
        className="w-full mt-6 bg-gray-900 disabled:bg-gray-300 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-gray-900/20"
      >
        Create My Avatar
      </button>
    </div>
  );
};
