import React, { useState, useRef } from 'react';
import { useAppStore } from '../../App';
import { generateVirtualTryOn, analyzeFit } from '../../services/geminiService';
import { FitAnalysis } from '../../types';

type Step = 'upload' | 'processing' | 'result';

export const VirtualTryOn: React.FC = () => {
  const { user } = useAppStore();
  const [step, setStep] = useState<Step>('upload');
  const [garmentImage, setGarmentImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [fitData, setFitData] = useState<FitAnalysis | null>(null);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleGarmentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setGarmentImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const startTryOn = async () => {
    if (!user?.photoBase64 || !garmentImage) return;
    
    setStep('processing');
    setProgress(10);
    setStatusText("Initializing Gemini 3 Pipeline...");

    try {
        // Step 1: Pre-flight (Simulated by generic delay, would be Flash call)
        setTimeout(() => {
            setProgress(30);
            setStatusText("Analyzing fabric physics & lighting...");
        }, 1000);

        // Step 2: Generation (Real call or mock fallback if API fails)
        const generated = await generateVirtualTryOn(
            user.photoBase64.split(',')[1], 
            garmentImage.split(',')[1]
        );
        
        setProgress(70);
        setStatusText("Refining photorealism with Gemini Pro Image...");

        // Step 3: Fit Analysis
        const analysis = await analyzeFit(user.photoBase64.split(',')[1], generated);
        
        setFitData(analysis);
        setResultImage(generated);
        setProgress(100);
        
        setTimeout(() => setStep('result'), 500);
    } catch (e) {
        console.error(e);
        // Fallback demo image if API totally fails (network/key issues)
        setResultImage(user.photoBase64); 
        setStep('result');
        alert("Try-On generation failed. Please check API Key. Showing fallback.");
    }
  };

  const renderProcessing = () => (
    <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-8">
        <div className="relative w-64 h-64">
            {/* Spinning rings */}
            <div className="absolute inset-0 border-4 border-brand-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-brand-500 rounded-full border-t-transparent animate-spin"></div>
            
            {/* Center Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
                 <i className="fa-solid fa-wand-magic-sparkles text-4xl text-brand-600 animate-pulse"></i>
            </div>
        </div>
        
        <div className="space-y-2 max-w-xs">
            <h3 className="text-xl font-bold text-gray-900">{Math.round(progress)}% Complete</h3>
            <p className="text-brand-600 font-medium animate-pulse">{statusText}</p>
            <div className="w-full bg-gray-100 rounded-full h-2 mt-4">
                <div className="bg-brand-600 h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>
        </div>
        
        <div className="text-xs text-gray-400 max-w-xs">
            MirrorFit orchestrates 3 Gemini models to generate your look.
        </div>
    </div>
  );

  const renderResult = () => (
    <div className="space-y-6 pb-20">
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg mb-4">The Result</h3>
            <div className="relative rounded-2xl overflow-hidden aspect-[3/4]">
                <img src={resultImage || ''} alt="Result" className="w-full h-full object-cover" />
                <div className="absolute bottom-4 right-4 flex gap-2">
                    <button className="bg-white p-3 rounded-full shadow-lg text-gray-900 hover:text-brand-600">
                        <i className="fa-solid fa-share-nodes"></i>
                    </button>
                    <button className="bg-brand-600 p-3 rounded-full shadow-lg text-white hover:bg-brand-700">
                        <i className="fa-solid fa-download"></i>
                    </button>
                </div>
            </div>
        </div>

        {/* Fit Analysis Card */}
        {fitData && (
            <div className="bg-gray-900 text-white p-6 rounded-3xl shadow-xl">
                <div className="flex items-center gap-2 mb-6">
                    <i className="fa-solid fa-microchip text-brand-400"></i>
                    <h3 className="font-bold">Gemini Fit Analysis</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Overall Fit</p>
                        <p className="text-xl font-bold text-green-400">{fitData.overall_fit}</p>
                    </div>
                    <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Confidence</p>
                        <p className="text-xl font-bold">{fitData.confidence}%</p>
                    </div>
                </div>

                <div className="space-y-4 border-t border-gray-700 pt-4">
                    <div className="flex gap-3 items-start">
                        <i className="fa-solid fa-ruler-combined text-gray-400 mt-1"></i>
                        <div>
                            <p className="font-medium text-sm">Size Recommendation</p>
                            <p className="text-gray-400 text-sm">{fitData.size_recommendation}</p>
                        </div>
                    </div>
                    <div className="flex gap-3 items-start">
                        <i className="fa-solid fa-shirt text-gray-400 mt-1"></i>
                        <div>
                            <p className="font-medium text-sm">Style Advice</p>
                            <p className="text-gray-400 text-sm">{fitData.style_advice}</p>
                        </div>
                    </div>
                </div>
            </div>
        )}
        
        <button 
            onClick={() => { setStep('upload'); setGarmentImage(null); }}
            className="w-full py-4 text-gray-500 font-medium hover:text-gray-900"
        >
            Try Another Item
        </button>
    </div>
  );

  // Upload Step
  return (
    <div className="p-6 h-full min-h-screen bg-gray-50">
        {step === 'processing' ? renderProcessing() : 
         step === 'result' ? renderResult() : (
            <div className="space-y-6">
                 <div>
                    <h2 className="text-2xl font-bold text-gray-900">Virtual Try-On</h2>
                    <p className="text-gray-500 text-sm">See how it fits before you buy.</p>
                </div>

                {/* Avatar Preview */}
                <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                        <img src={user?.photoBase64} className="w-full h-full object-cover" alt="User" />
                    </div>
                    <div>
                        <p className="font-bold text-gray-900">Your Avatar</p>
                        <p className="text-xs text-green-600 flex items-center gap-1">
                            <i className="fa-solid fa-check-circle"></i> Ready for simulation
                        </p>
                    </div>
                </div>

                {/* Garment Upload */}
                <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-3xl aspect-square flex flex-col items-center justify-center bg-white hover:border-brand-500 hover:bg-brand-50 transition-all cursor-pointer relative overflow-hidden group"
                >
                    {garmentImage ? (
                        <img src={garmentImage} className="w-full h-full object-contain p-4" alt="Garment" />
                    ) : (
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl group-hover:scale-110 transition-transform">
                                <i className="fa-solid fa-plus"></i>
                            </div>
                            <p className="font-bold text-gray-900">Add Clothing</p>
                            <p className="text-xs text-gray-400 mt-2">Upload photo of the item</p>
                        </div>
                    )}
                    <input type="file" ref={fileInputRef} onChange={handleGarmentUpload} className="hidden" accept="image/*" />
                </div>

                <button 
                    onClick={startTryOn}
                    disabled={!garmentImage}
                    className="w-full bg-brand-600 disabled:bg-gray-300 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-500/30 transition-all"
                >
                    Generate Try-On
                </button>
            </div>
         )}
    </div>
  );
};
