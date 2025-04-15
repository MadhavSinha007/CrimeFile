import { useState } from 'react';
import ImageUpload from './ImageUpload';
import ResultDisplay from './ResultDisplay';

function AiDetail() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [scanCount, setScanCount] = useState(
    parseInt(localStorage.getItem('scanCount') || '0')
  );

  const handleAnalyze = (analysisResult, preview) => {
    setResult(analysisResult);
    setImagePreview(preview);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center font-sans">
      <header className="w-full py-6 bg-black border-b border-white/10">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <div className="flex items-center mb-2">
            <svg className="h-8 w-8 mr-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h1 className="text-3xl font-bold text-center">
              <span className="relative group">
                Criminal Face Verification
                <span className="absolute left-0 bottom-0 w-full h-px bg-white transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
              </span>
            </h1>
          </div>
          <p className="text-white/70 text-sm max-w-2xl text-center">
            Advanced facial recognition system for criminal identification. Upload any face photograph for instant verification against our global criminal database.
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between bg-black/30 border border-white/10 rounded-lg px-4 py-2 mb-6">
          <div className="flex items-center">
            <svg className="h-5 w-5 mr-2 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-white/70">
              System Status: <span className="text-white font-medium relative group cursor-pointer">Online
                <span className="absolute left-0 bottom-0 w-full h-px bg-white transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
              </span>
            </span>
          </div>
          <div className="text-sm text-white/70">
            <span>Database Version: <span className="text-white font-medium">2025.4.2</span></span>
          </div>
          <div className="text-sm text-white/70">
            <span>Total Scans: <span className="text-white font-medium">{scanCount}</span></span>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6 flex-grow flex flex-col items-center max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-10">
          <ImageUpload 
            onAnalyze={handleAnalyze} 
            scanCount={scanCount} 
            setScanCount={setScanCount}
          />
          <ResultDisplay 
            result={result} 
            error={error} 
            imagePreview={imagePreview}
          />
        </div>
      </main>

      <footer className="w-full py-6 bg-black border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <h4 className="text-sm font-bold mb-3 text-white relative group inline-flex">
                About This System
                <span className="absolute left-0 bottom-0 w-full h-px bg-white transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
              </h4>
              <p className="text-xs text-white/50 mb-3">
                This advanced facial recognition system uses cutting-edge AI to identify potential matches between uploaded images and known criminal profiles.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold mb-3 text-white relative group inline-flex">
                System Limitations
                <span className="absolute left-0 bottom-0 w-full h-px bg-white transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
              </h4>
              <p className="text-xs text-white/50 mb-3">
                Results are based on probabilistic matching algorithms and should be verified by qualified law enforcement personnel before any action is taken.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold mb-3 text-white relative group inline-flex">
                Security Notice
                <span className="absolute left-0 bottom-0 w-full h-px bg-white transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
              </h4>
              <p className="text-xs text-white/50 mb-3">
                All uploads and searches are logged and monitored. Unauthorized use of this system is prohibited and may result in legal action.
              </p>
            </div>
          </div>
          <div className="text-center text-white/50 text-xs">
            <p className="mb-1">Disclaimer: This is a demonstration application for educational purposes only.</p>
            <p>The AI generates fictional information and should not be used for actual criminal identification.</p>
            <p className="mt-3 text-white/30">© 2025 Criminal Face Verification System | Version 2.4.1</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .shadow-glow {
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
        }
        .backdrop-blur-lg {
          backdrop-filter: blur(10px);
        }
        input::file-selector-button {
          background: #ffffff;
          color: #000000;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s;
        }
        input::file-selector-button:hover {
          background: #ffffffcc;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .animate-pulse {
          animation: pulse 1.5s infinite;
        }
      `}</style>
    </div>
  );
}

export default AiDetail;