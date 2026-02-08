import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../App';

export const Measurements: React.FC = () => {
  const navigate = useNavigate();
  const { updateUser } = useAppStore();
  const [height, setHeight] = useState(170);
  const [bodyType, setBodyType] = useState('average');

  const handleNext = () => {
    updateUser({ height, bodyType: bodyType as any });
    navigate('/onboarding/style');
  };

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col">
       <div className="flex-1">
        <button onClick={() => navigate(-1)} className="text-gray-400 mb-6">
            <i className="fa-solid fa-arrow-left"></i> Back
        </button>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Body Details</h2>
        <p className="text-gray-500 mb-8">Help Gemini adjust the fit perfectly.</p>

        <div className="space-y-8">
            {/* Height Slider */}
            <div>
                <div className="flex justify-between mb-4">
                    <label className="font-medium text-gray-900">Height</label>
                    <span className="text-brand-600 font-bold">{height} cm</span>
                </div>
                <input 
                    type="range" 
                    min="140" 
                    max="210" 
                    value={height} 
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
                />
            </div>

            {/* Body Type Selection */}
            <div>
                <label className="font-medium text-gray-900 block mb-4">Body Shape</label>
                <div className="grid grid-cols-2 gap-4">
                    {['slim', 'average', 'athletic', 'plus'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setBodyType(type)}
                            className={`p-4 rounded-xl border-2 text-left capitalize transition-all
                                ${bodyType === type 
                                    ? 'border-brand-500 bg-brand-50 text-brand-700' 
                                    : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
                        >
                            <span className="block mb-1 text-2xl">
                                {type === 'slim' && '🧍'}
                                {type === 'average' && '🧍‍♂️'}
                                {type === 'athletic' && '🏃'}
                                {type === 'plus' && '🙆'}
                            </span>
                            {type}
                        </button>
                    ))}
                </div>
            </div>
        </div>
      </div>
      
      <button
        onClick={handleNext}
        className="w-full mt-6 bg-gray-900 text-white font-bold py-4 rounded-xl transition-all"
      >
        Next Step
      </button>
    </div>
  );
};
