import { useState, useEffect } from 'react';

function ImageUpload({ onAnalyze, scanCount, setScanCount }) {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showTips, setShowTips] = useState(true);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          const next = prev + Math.random() * 15;
          return next > 95 ? 95 : next;
        });
      }, 500);
      return () => {
        clearInterval(interval);
        setUploadProgress(0);
      };
    }
  }, [loading]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setError(null);
    }
  };

  const analyzeImage = async () => {
    if (!image) {
      setError("Please upload an image first");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = async () => {
        const base64Image = reader.result.split(',')[1];
        const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: [
                {
                  role: 'user',
                  parts: [
                    {
                      text: "You are a criminal face verification assistant. A user has uploaded a photo. Analyze the face and determine if this person resembles a famous criminal (like Pablo Escobar, Al Capone, Ted Bundy, etc.). If yes, generate detailed information about the criminal including: Name, Age, Status (e.g., Wanted, Arrested, Deceased), Type of crime, Crime story, Officer assigned, Victims, Notable operations against them, Known associates, and Last known location. If the person doesn't resemble a known criminal, simply reply with 'No criminal match found.' IMPORTANT: Return the data in JSON format with the following structure: { matchFound: boolean, criminalData: { name, age, status, crimeType, story, officerAssigned, victims, notableOperations, knownAssociates, lastKnownLocation } }"
                    },
                    {
                      inline_data: {
                        mime_type: "image/jpeg",
                        data: base64Image
                      }
                    }
                  ]
                }
              ],
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1024,
              }
            })
          }
        );

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        const resultText = data.candidates[0].content.parts[0].text;

        let resultJson;
        try {
          const jsonMatch = resultText.match(/```json([\s\S]*?)```/) || resultText.match(/{[\s\S]*}/);
          const jsonString = jsonMatch ? (jsonMatch[1] ? jsonMatch[1] : jsonMatch[0]) : resultText;
          resultJson = JSON.parse(jsonString.trim());
        } catch (e) {
          console.error("Failed to parse JSON:", e);
          resultJson = { 
            matchFound: resultText.includes("No criminal match found") ? false : true,
            responseText: resultText 
          };
        }

        // Update scan count
        const newScanCount = scanCount + 1;
        setScanCount(newScanCount);
        localStorage.setItem('scanCount', newScanCount.toString());

        setUploadProgress(100);
        setTimeout(() => {
          setLoading(false);
          onAnalyze(resultJson, imagePreview);
        }, 500);
      };
    } catch (err) {
      console.error(err);
      setError("Error analyzing image. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="md:col-span-1 bg-black/20 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
      <h2 className="text-xl font-bold mb-4 relative group inline-flex">
        Upload Image
        <span className="absolute left-0 bottom-0 w-full h-px bg-white transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
      </h2>
      
      <div className="mb-6 flex-grow">
        <div className="relative mb-4 group">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 group-hover:text-white transition-colors duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>

        {imagePreview && (
          <div className="mb-6 flex justify-center">
            <div className="border border-white/20 p-2 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-glow hover:border-white/50 relative group">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-h-48 max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-sm font-medium">Subject Image</span>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={analyzeImage}
          disabled={loading || !image}
          className={`w-full py-3 rounded-lg font-semibold text-base relative overflow-hidden transition-all duration-300 ${
            loading || !image
              ? 'bg-black/30 cursor-not-allowed text-white/50'
              : 'bg-white text-black hover:bg-white/80'
          }`}
        >
          {loading ? (
            <>
              <div
                className="absolute top-0 left-0 h-full bg-white/20"
                style={{ width: `${uploadProgress}%`, transition: 'width 0.5s ease-out' }}
              ></div>
              <div className="relative z-10 flex items-center justify-center">
                <span className="mr-2">Analyzing... {Math.round(uploadProgress)}%</span>
                <div className="flex space-x-1">
                  <div className="h-2 w-2 bg-white rounded-full animate-pulse" style={{ animationDelay: "0ms" }}></div>
                  <div className="h-2 w-2 bg-white rounded-full animate-pulse" style={{ animationDelay: "200ms" }}></div>
                  <div className="h-2 w-2 bg-white rounded-full animate-pulse" style={{ animationDelay: "400ms" }}></div>
                </div>
              </div>
            </>
          ) : (
            <span className="flex items-center justify-center">
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Verify Identity
            </span>
          )}
        </button>
      </div>

      {showTips && (
        <div className="bg-black/30 p-4 rounded-lg border-l-4 border-white/50 relative">
          <button 
            className="absolute top-2 right-2 text-white/50 hover:text-white"
            onClick={() => setShowTips(false)}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h3 className="text-sm font-bold mb-2 relative group inline-flex">
            Tips for Best Results
            <span className="absolute left-0 bottom-0 w-full h-px bg-white transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
          </h3>
          <ul className="text-xs text-white/70 space-y-1 list-disc pl-4">
            <li>Use clear, well-lit facial photographs</li>
            <li>Front-facing poses provide the highest accuracy</li>
            <li>Higher resolution images yield better results</li>
            <li>Avoid heavy filters or edits on photographs</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;