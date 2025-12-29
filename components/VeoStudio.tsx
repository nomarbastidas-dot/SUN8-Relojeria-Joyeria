import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, Film, Loader2, Download, Play, AlertCircle, Layout } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { Language } from '../types';
import { TRANSLATIONS } from '../utils/i18n';

interface VeoStudioProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

// Define a local interface for type safety when casting
interface AIStudioClient {
    hasSelectedApiKey(): Promise<boolean>;
    openSelectKey(): Promise<void>;
}

export const VeoStudio: React.FC<VeoStudioProps> = ({ isOpen, onClose, language }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = TRANSLATIONS[language].veo;

  useEffect(() => {
    checkApiKey();
  }, [isOpen]);

  const getAIStudio = (): AIStudioClient | undefined => {
      return (window as any).aistudio;
  };

  const checkApiKey = async () => {
    const aistudio = getAIStudio();
    if (aistudio) {
      const hasKey = await aistudio.hasSelectedApiKey();
      setHasApiKey(hasKey);
    } else {
        // Fallback for envs where window.aistudio isn't injected yet or simulated
        setHasApiKey(true);
    }
  };

  const handleSelectKey = async () => {
    const aistudio = getAIStudio();
    if (aistudio) {
      await aistudio.openSelectKey();
      await checkApiKey();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setVideoUrl(null); // Reset previous video
      setError(null);
    }
  };

  const handleGenerate = async () => {
    if (!selectedFile || !hasApiKey) return;
    
    setIsGenerating(true);
    setError(null);
    setVideoUrl(null);
    setLoadingMessage(t.generating);

    // Rotation of loading messages
    const messages = [
        "Initializing Veo creative engine...",
        "Analyzing image composition...",
        "Synthesizing motion vectors...",
        "Rendering high-definition frames...",
        "Applying cinematic lighting...",
        "Finalizing your masterpiece..."
    ];
    let msgIndex = 0;
    const interval = setInterval(() => {
        msgIndex = (msgIndex + 1) % messages.length;
        setLoadingMessage(messages[msgIndex]);
    }, 4000);

    try {
      // Convert file to base64 raw string
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      
      await new Promise((resolve) => {
        reader.onload = resolve;
      });
      
      const base64String = (reader.result as string).split(',')[1];
      const mimeType = selectedFile.type;

      const url = await geminiService.generateVeoVideo(base64String, mimeType, prompt, aspectRatio);
      setVideoUrl(url);
    } catch (err: any) {
      console.error(err);
      // Reset key selection if entity not found
      const aistudio = getAIStudio();
      if (err.message?.includes("Requested entity was not found") && aistudio) {
        setHasApiKey(false);
        setError("API Key session expired. Please select your key again.");
      } else {
        setError(err.message || "Failed to generate video. Please try again.");
      }
    } finally {
      clearInterval(interval);
      setIsGenerating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4 animate-fade-in backdrop-blur-md">
      <div className="bg-sun8-navyLight w-full max-w-5xl rounded-xl overflow-hidden shadow-2xl border border-sun8-gold/20 flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Left Panel: Visuals */}
        <div className="md:w-2/3 bg-black relative flex items-center justify-center p-6 min-h-[300px] md:min-h-[500px]">
          <button 
            onClick={onClose} 
            className="absolute top-4 left-4 text-white/50 hover:text-white z-10 md:hidden"
          >
            <X size={24} />
          </button>

          {isGenerating ? (
            <div className="text-center z-10">
                <Loader2 size={48} className="text-sun8-gold animate-spin mx-auto mb-6" />
                <h3 className="text-sun8-gold font-serif text-xl mb-2 animate-pulse">{t.generating}</h3>
                <p className="text-sun8-ivory/60 text-sm font-light tracking-wider">{loadingMessage}</p>
            </div>
          ) : videoUrl ? (
            <div className={`relative w-full h-full flex items-center justify-center ${aspectRatio === '9:16' ? 'max-w-[360px]' : 'max-w-full'}`}>
              <video 
                src={videoUrl} 
                controls 
                autoPlay 
                loop 
                className="w-full h-full object-contain rounded-lg shadow-2xl border border-sun8-gold/10"
              />
            </div>
          ) : imagePreview ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="max-w-full max-h-full object-contain rounded-lg shadow-xl"
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-4 right-4 bg-black/60 text-white p-2 rounded-full hover:bg-sun8-gold transition-colors backdrop-blur-sm"
              >
                <Upload size={20} />
              </button>
            </div>
          ) : (
            <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-sun8-ivory/10 rounded-xl p-12 text-center cursor-pointer hover:border-sun8-gold/50 hover:bg-white/5 transition-all group"
            >
              <div className="w-20 h-20 bg-sun8-ivory/5 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Upload size={32} className="text-sun8-ivory/40 group-hover:text-sun8-gold" />
              </div>
              <p className="text-sun8-ivory/80 font-medium mb-2">{t.upload}</p>
              <p className="text-xs text-sun8-ivory/40">JPG, PNG (Max 10MB)</p>
            </div>
          )}
          
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            className="hidden"
          />
        </div>

        {/* Right Panel: Controls */}
        <div className="md:w-1/3 bg-sun8-navyLight p-6 md:p-8 flex flex-col border-l border-sun8-gold/10 overflow-y-auto">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h2 className="font-serif text-2xl text-white flex items-center gap-2">
                        <Film className="text-sun8-gold" size={24} />
                        SUN8 <span className="text-sun8-gold font-light">Studio</span>
                    </h2>
                    <p className="text-xs text-sun8-ivory/40 mt-1 uppercase tracking-wider">Powered by Veo</p>
                </div>
                <button onClick={onClose} className="text-sun8-ivory/30 hover:text-white hidden md:block">
                    <X size={24} />
                </button>
            </div>

            {/* API Key Check */}
            {!hasApiKey && (
                <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-4 mb-6">
                    <div className="flex gap-3 items-start">
                        <AlertCircle className="text-amber-500 flex-shrink-0 mt-0.5" size={18} />
                        <div>
                            <h4 className="text-amber-500 text-sm font-bold mb-1">API Key Required</h4>
                            <p className="text-xs text-amber-200/70 mb-3 leading-relaxed">{t.apiKeyRequired}</p>
                            <button 
                                onClick={handleSelectKey}
                                className="text-xs bg-amber-500 text-black px-3 py-2 rounded font-bold hover:bg-amber-400 transition-colors"
                            >
                                {t.selectKey}
                            </button>
                             <div className="mt-2">
                                <a 
                                    href="https://ai.google.dev/gemini-api/docs/billing" 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="text-[10px] text-amber-500/60 hover:text-amber-400 underline"
                                >
                                    {t.billing}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Controls */}
            <div className="space-y-6 flex-1">
                <div>
                    <label className="block text-xs font-bold uppercase text-sun8-ivory/50 mb-2 tracking-wider">Prompt</label>
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder={t.promptPlaceholder}
                        className="w-full bg-black/30 border border-sun8-ivory/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-sun8-gold/50 h-24 resize-none placeholder:text-sun8-ivory/20"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase text-sun8-ivory/50 mb-2 tracking-wider">{t.aspectRatio}</label>
                    <div className="grid grid-cols-2 gap-3">
                        <button 
                            onClick={() => setAspectRatio('16:9')}
                            className={`p-3 rounded-lg border flex flex-col items-center gap-2 transition-all ${aspectRatio === '16:9' ? 'bg-sun8-gold/10 border-sun8-gold text-sun8-gold' : 'bg-black/20 border-transparent text-sun8-ivory/40 hover:bg-black/40'}`}
                        >
                            <Layout size={20} className="rotate-90" />
                            <span className="text-xs font-medium">Landscape (16:9)</span>
                        </button>
                        <button 
                            onClick={() => setAspectRatio('9:16')}
                            className={`p-3 rounded-lg border flex flex-col items-center gap-2 transition-all ${aspectRatio === '9:16' ? 'bg-sun8-gold/10 border-sun8-gold text-sun8-gold' : 'bg-black/20 border-transparent text-sun8-ivory/40 hover:bg-black/40'}`}
                        >
                            <Layout size={20} />
                            <span className="text-xs font-medium">Portrait (9:16)</span>
                        </button>
                    </div>
                </div>

                {error && (
                     <div className="p-3 bg-red-900/20 border border-red-500/30 rounded text-red-200 text-xs flex items-start gap-2">
                        <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
                        {error}
                     </div>
                )}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 space-y-3">
                <button
                    onClick={handleGenerate}
                    disabled={!selectedFile || isGenerating || !hasApiKey}
                    className="w-full bg-gradient-to-r from-sun8-gold to-[#d4af37] text-sun8-navy font-bold py-4 rounded-lg uppercase tracking-widest hover:shadow-[0_0_20px_rgba(182,139,72,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                    {isGenerating ? (
                        <Loader2 size={18} className="animate-spin" />
                    ) : (
                        <Play size={18} className="fill-sun8-navy" />
                    )}
                    {t.generate}
                </button>

                {videoUrl && (
                    <a 
                        href={videoUrl} 
                        download={`sun8-veo-creation-${Date.now()}.mp4`}
                        className="w-full bg-sun8-ivory/10 text-sun8-ivory font-bold py-3 rounded-lg uppercase tracking-widest hover:bg-sun8-ivory/20 transition-all flex items-center justify-center gap-2 text-xs"
                    >
                        <Download size={16} />
                        {t.download}
                    </a>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};