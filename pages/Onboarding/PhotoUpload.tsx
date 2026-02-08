import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../App';
import { analyzePhotoQuality } from '../../services/geminiService';

export const PhotoUpload: React.FC = () => {
  const navigate = useNavigate();
  const { updateUser } = useAppStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Convert to base64
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      setImagePreview(base64);
      setError(null);
      
      // Gemini Analysis
      setIsAnalyzing(true);
      try {
        const analysis = await analyzePhotoQuality(base64.split(',')[1]);
        if (!analysis.valid) {
            setError(analysis.feedback);
        } else {
            // Valid photo
            updateUser({ photoBase64: base64 });
        }
      } catch (err) {
        setError("Could not analyze photo. Please try again.");
      } finally {
        setIsAnalyzing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleNext = () => {
    if (imagePreview && !error && !isAnalyzing) {
      navigate('/onboarding/measurements');
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col">
      <div className="flex-1">
        <button onClick={() => navigate(-1)} className="text-gray-400 mb-6">
            <i className="fa-solid fa-arrow-left"></i> Back
        </button>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Create your Digital Twin</h2>
        <p className="text-gray-500 mb-8">Upload a full-body photo for the best AI try-on results.</p>

        <div 
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl aspect-[3/4] flex flex-col items-center justify-center cursor-pointer transition-colors overflow-hidden
            ${error ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-brand-500 bg-gray-50'}`}
        >
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-4 text-brand-500 text-2xl">
                <i className="fa-solid fa-camera"></i>
              </div>
              <p className="text-brand-600 font-medium">Tap to upload</p>
              <p className="text-xs text-gray-400 mt-2">Supports JPG, PNG</p>
            </div>
          )}
          
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
          
          {isAnalyzing && (
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white backdrop-blur-sm">
               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-2"></div>
               <p className="text-sm font-medium">Gemini 3 is analyzing photo...</p>
            </div>
          )}
        </div>

        {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-xl flex items-start gap-3">
                <i className="fa-solid fa-circle-exclamation mt-0.5"></i>
                <p className="text-sm">{error}</p>
            </div>
        )}

        {!error && imagePreview && !isAnalyzing && (
            <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-xl flex items-center gap-3">
                <i className="fa-solid fa-check-circle"></i>
                <p className="text-sm">Great photo! Gemini approved.</p>
            </div>
        )}
      </div>

      <button
        onClick={handleNext}
        disabled={!imagePreview || !!error || isAnalyzing}
        className="w-full mt-6 bg-gray-900 disabled:bg-gray-300 text-white font-bold py-4 rounded-xl transition-all"
      >
        Next Step
      </button>
    </div>
  );
};
